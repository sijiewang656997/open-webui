import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType } from 'docx';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

// Function to create a Word document from API response data
export async function createWordDocumentFromApiData(apiData: any): Promise<Blob> {
  // Extract content and metadata
  const nodeId = apiData.node_id || 'Analysis';
  const content = apiData.content || '';
  const metadata = apiData.metadata || {};
  const results = apiData.results || {};
  
  try {
    // Try the new Docxtemplater approach first
    console.log("[DOCX DEBUG] Using Docxtemplater for API data export");
    return await createDocxTemplateFromApiData(apiData);
  } catch (error) {
    console.error("[DOCX DEBUG] Docxtemplater failed, falling back to original method:", error);
    
    // Create paragraphs from content (removing markdown)
    const contentText = content.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove markdown bold
    const paragraphs = contentText.split('\n').filter(line => line.trim()).map(line => 
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24
          })
        ]
      })
    );
    
    // Create title
    const title = new Paragraph({
      text: `Analysis for ${metadata.node_name || nodeId}`,
      heading: 'Heading1',
      alignment: AlignmentType.CENTER
    });
    
    // Add metadata section
    const metadataParagraphs = [];
    if (Object.keys(metadata).length > 0) {
      metadataParagraphs.push(
        new Paragraph({
          text: 'Metadata',
          heading: 'Heading2'
        })
      );
      
      Object.entries(metadata).forEach(([key, value]) => {
        if (value) {
          metadataParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${key}: `, bold: true }),
                new TextRun({ text: String(value) })
              ]
            })
          );
        }
      });
    }
    
    // Add results data if available
    const resultsParagraphs = [];
    if (results && results.columns && results.records) {
      resultsParagraphs.push(
        new Paragraph({
          text: 'Data',
          heading: 'Heading2',
          spacing: {
            before: 200,
            after: 100
          }
        })
      );
      
      // Create table from results data
      const table = new Table({
        rows: [
          // Header row
          new TableRow({
            children: results.columns.map(column => 
              new TableCell({
                children: [new Paragraph({ text: String(column), alignment: AlignmentType.CENTER })],
                shading: { color: "E2E2E2" },
                width: { size: 100 / results.columns.length, type: WidthType.PERCENTAGE }
              })
            )
          }),
          // Data rows
          ...results.records.map(record => 
            new TableRow({
              children: results.columns.map((_, index) => 
                new TableCell({
                  children: [new Paragraph({ 
                    text: String(record[index] !== undefined ? record[index] : ''),
                    alignment: typeof record[index] === 'number' ? AlignmentType.RIGHT : AlignmentType.LEFT
                  })],
                  width: { size: 100 / results.columns.length, type: WidthType.PERCENTAGE }
                })
              )
            })
          )
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
      });
      
      resultsParagraphs.push(table);
    }
    
    // Create document without problematic properties
    const doc = new Document({
      sections: [{
        children: [
          title,
          new Paragraph({ text: '' }), // Spacing
          ...paragraphs,
          new Paragraph({ text: '' }), // Spacing
          ...metadataParagraphs,
          ...resultsParagraphs
        ]
      }]
    });

    // Generate blob from the document
    return await Packer.toBlob(doc);
  }
}

// New function using Docxtemplater to create documents from API data
async function createDocxTemplateFromApiData(apiData: any): Promise<Blob> {
  console.log("[DOCX DEBUG] Creating document with Docxtemplater from API data");
  
  // Extract content and metadata
  const nodeId = apiData.node_id || 'Analysis';
  const content = apiData.content || '';
  const metadata = apiData.metadata || {};
  const results = apiData.results || {};
  
  // Format metadata as text
  let metadataText = '';
  if (Object.keys(metadata).length > 0) {
    metadataText = Object.entries(metadata)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
  
  // Create a template string
  const templateContent = `
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading1"/>
            <w:jc w:val="center"/>
          </w:pPr>
          <w:r>
            <w:t>Analysis for {nodeName}</w:t>
          </w:r>
        </w:p>
        
        <w:p><w:r><w:t>{content}</w:t></w:r></w:p>
        
        {#if hasMetadata}
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading2"/>
          </w:pPr>
          <w:r>
            <w:t>Metadata</w:t>
          </w:r>
        </w:p>
        <w:p><w:r><w:t>{metadata}</w:t></w:r></w:p>
        {/if}
        
        {#if hasResults}
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading2"/>
          </w:pPr>
          <w:r>
            <w:t>Data</w:t>
          </w:r>
        </w:p>
        <w:tbl>
          <w:tblPr>
            <w:tblStyle w:val="TableGrid"/>
            <w:tblW w:w="5000" w:type="pct"/>
          </w:tblPr>
          <w:tblGrid>
            {#each columns as column}
            <w:gridCol/>
            {/each}
          </w:tblGrid>
          
          <!-- Header row -->
          <w:tr>
            {#each columns as column}
            <w:tc>
              <w:p>
                <w:r><w:rPr><w:b/></w:rPr><w:t>{column}</w:t></w:r>
              </w:p>
            </w:tc>
            {/each}
          </w:tr>
          
          <!-- Data rows -->
          {#each records as record}
          <w:tr>
            {#each record as cell}
            <w:tc>
              <w:p><w:r><w:t>{cell}</w:t></w:r></w:p>
            </w:tc>
            {/each}
          </w:tr>
          {/each}
        </w:tbl>
        {/if}
      </w:body>
    </w:document>
  `;
  
  // Create a zip object with the template
  const zip = new PizZip(templateContent);
  
  // Create docxtemplater instance
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true
  });
  
  // Set data for template
  doc.setData({
    nodeName: metadata.node_name || nodeId,
    content: content.replace(/\*\*(.*?)\*\*/g, '$1'), // Remove markdown bold
    hasMetadata: Object.keys(metadata).length > 0,
    metadata: metadataText,
    hasResults: !!(results?.columns?.length && results?.records?.length),
    columns: results?.columns || [],
    records: results?.records || []
  });
  
  // Render the document
  doc.render();
  
  // Generate output
  return doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
}

// Create a really minimal document to avoid any docx creator issues
export async function createSimpleWordDocument(content: string, title: string): Promise<Blob> {
  console.log("[DOCX DEBUG] Creating minimal document");
  
  try {
    // Try the new Docxtemplater approach first
    console.log("[DOCX DEBUG] Using Docxtemplater for simple document");
    
    // Default template content - a minimal Word document with placeholders
    const templateContent = `
      <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
        <w:body>
          <w:p>
            <w:pPr>
              <w:pStyle w:val="Heading1"/>
              <w:jc w:val="center"/>
            </w:pPr>
            <w:r>
              <w:t>{title}</w:t>
            </w:r>
          </w:p>
          
          <w:p><w:r><w:t>{content}</w:t></w:r></w:p>
        </w:body>
      </w:document>
    `;
    
    // Create a zip object containing the template
    const zip = new PizZip(templateContent);
    
    // Create a new docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });
    
    // Ensure we have valid strings
    const safeTitle = title ? String(title).trim() : "Analysis Report";
    const safeContent = content ? String(content).trim() : "";
    
    // Set the data for template rendering
    doc.setData({
      title: safeTitle,
      content: safeContent
    });
    
    // Render the document
    doc.render();
    
    // Generate output as a blob
    const outputBlob = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    console.log('[DOCX DEBUG] Document created successfully with size:', outputBlob.size);
    return outputBlob;
  } catch (firstError) {
    console.error("[DOCX DEBUG] Docxtemplater failed, falling back to original method:", firstError);
    
    try {
      // Ensure we have valid strings
      const safeTitle = title ? String(title).trim() : "Analysis Report";
      const safeContent = content ? String(content).trim() : "";
      
      // Split content into paragraphs, making sure to handle empty lines
      const lines = safeContent.split('\n');
      const paragraphs = lines.map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line || " ", // Replace empty lines with space
              size: 24
            })
          ]
        })
      );
      
      // Title paragraph
      const titleParagraph = new Paragraph({
        children: [
          new TextRun({
            text: safeTitle,
            bold: true,
            size: 32
          })
        ],
        spacing: {
          after: 400
        }
      });
      
      // Create the absolutely minimal document with no optional properties
      const doc = new Document({
        sections: [{
          children: [
            titleParagraph,
            ...paragraphs
          ]
        }]
      });
      
      console.log("[DOCX DEBUG] Document created, generating blob");
      const blob = await Packer.toBlob(doc);
      console.log("[DOCX DEBUG] Blob generated, size:", blob.size);
      return blob;
    } catch (secondError) {
      console.error("[DOCX DEBUG] Error creating document:", secondError);
      // Create a simple text file as fallback
      const fallbackText = `${title || "Analysis Report"}\n\n${content || ""}`;
      const blob = new Blob([fallbackText], { type: 'text/plain' });
      console.log("[DOCX DEBUG] Created fallback text blob");
      return blob;
    }
  }
}

// The original methods remain but we'll use the simplest one instead
export function downloadWordDocument(blob: Blob, filename: string): void {
  try {
    console.log("[DOCX DEBUG] Downloading document, blob size:", blob.size);
    saveAs(blob, filename);
    console.log("[DOCX DEBUG] Download initiated");
  } catch (error) {
    console.error("[DOCX DEBUG] Download error:", error);
    throw error;
  }
}

// Keep original function for backward compatibility
export async function createWordDocument(content: string, title: string): Promise<Blob> {
  return await createSimpleWordDocument(content, title);
} 
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType } from 'docx';

// Function to create a Word document from API response data
export async function createWordDocumentFromApiData(apiData: any): Promise<Blob> {
  // Extract content and metadata
  const nodeId = apiData.node_id || 'Analysis';
  const content = apiData.content || '';
  const metadata = apiData.metadata || {};
  const results = apiData.results || {};
  
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

// Create a really minimal document to avoid any docx creator issues
export async function createSimpleWordDocument(content: string, title: string): Promise<Blob> {
  console.log("[DOCX DEBUG] Creating minimal document");
  
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
  } catch (error) {
    console.error("[DOCX DEBUG] Error creating document:", error);
    // Create a simple text file as fallback
    const fallbackText = `${title || "Analysis Report"}\n\n${content || ""}`;
    const blob = new Blob([fallbackText], { type: 'text/plain' });
    console.log("[DOCX DEBUG] Created fallback text blob");
    return blob;
  }
}

// The original methods remain but we'll use the simplest one instead
export function downloadWordDocument(blob: Blob, filename: string): void {
  try {
    console.log("[DOCX DEBUG] Downloading document, blob size:", blob.size);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    console.log("[DOCX DEBUG] Download initiated");
  } catch (error) {
    console.error("[DOCX DEBUG] Download error:", error);
    throw error;
  }
}

// Keep original function for backward compatibility
export async function createWordDocument(content: string, title: string): Promise<Blob> {
  // Create document without creator properties
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          text: title,
          heading: 'Heading1',
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({ text: '' }), // Spacing
        ...content.split('\n').map(line => 
          new Paragraph({
            text: line || " ", // Use space for empty lines
          })
        )
      ]
    }]
  });

  return await Packer.toBlob(doc);
} 
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

/**
 * Create a Word document from analysis data using Docxtemplater
 * @param content The analysis content to include in the document
 * @param title Title of the document
 * @param results Optional results data for tables
 */
export async function createDocxTemplateReport(
  content: string,
  title: string,
  results?: {
    columns?: string[];
    records?: any[][];
  }
): Promise<Blob> {
  console.log('[DOCX DEBUG] Creating document with Docxtemplater');
  
  try {
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
          
          <!-- Table placeholder -->
          {#if hasTable}
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
    
    // Create a zip object containing the template
    const zip = new PizZip(templateContent);
    
    // Create a new docxtemplater instance
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });
    
    // Set the data for template rendering
    doc.setData({
      title: title || 'Analysis Report',
      content: content || '',
      hasTable: !!(results?.columns?.length && results?.records?.length),
      columns: results?.columns || [],
      records: results?.records || []
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
  } catch (error) {
    console.error('[DOCX DEBUG] Error creating document with Docxtemplater:', error);
    
    // Create a simple text file as fallback
    const fallbackText = `${title || "Analysis Report"}\n\n${content || ""}`;
    const blob = new Blob([fallbackText], { type: 'text/plain' });
    console.log('[DOCX DEBUG] Created fallback text blob');
    return blob;
  }
}

/**
 * Download a Word document
 * @param blob The document blob
 * @param filename Filename to use for the download
 */
export function downloadDocxDocument(blob: Blob, filename: string): void {
  try {
    console.log('[DOCX DEBUG] Downloading document, blob size:', blob.size);
    saveAs(blob, filename);
    console.log('[DOCX DEBUG] Download initiated');
  } catch (error) {
    console.error('[DOCX DEBUG] Download error:', error);
    throw error;
  }
} 
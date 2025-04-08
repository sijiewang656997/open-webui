import * as XLSX from 'xlsx';

export interface ExcelData {
  sheets: {
    [sheetName: string]: unknown[][];
  };
  activeSheet: string;
}

/**
 * Read an Excel file and return its content
 * @param file The uploaded Excel file
 */
export async function readExcelFile(file: File): Promise<ExcelData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const result: ExcelData = {
          sheets: {},
          activeSheet: workbook.SheetNames[0]
        };
        
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          result.sheets[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        });
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert Excel data to a downloadable blob
 * @param data Excel data
 * @param filename The name of the file to download
 */
export function downloadExcel(data: ExcelData, filename: string): void {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Add each sheet to the workbook
  Object.entries(data.sheets).forEach(([sheetName, sheetData]) => {
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData as any[][]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, filename);
}

/**
 * Update a cell in Excel data
 * @param data The Excel data to update
 * @param sheetName The name of the sheet containing the cell
 * @param rowIndex The row index of the cell
 * @param colIndex The column index of the cell
 * @param value The new value for the cell
 */
export function updateCell(
  data: ExcelData,
  sheetName: string,
  rowIndex: number,
  colIndex: number,
  value: any
): ExcelData {
  // Create a deep copy to avoid mutation
  const newData = JSON.parse(JSON.stringify(data)) as ExcelData;
  
  // Ensure the sheet exists
  if (!newData.sheets[sheetName]) {
    throw new Error(`Sheet "${sheetName}" does not exist`);
  }
  
  // Ensure the row exists
  while (newData.sheets[sheetName].length <= rowIndex) {
    newData.sheets[sheetName].push([]);
  }
  
  // Ensure the row has enough columns
  const row = newData.sheets[sheetName][rowIndex] as any[];
  while (row.length <= colIndex) {
    row.push(null);
  }
  
  // Update the cell value
  row[colIndex] = value;
  
  return newData;
}

/**
 * Create a new sheet in Excel data
 * @param data The Excel data to update
 * @param sheetName The name of the new sheet
 */
export function addSheet(data: ExcelData, sheetName: string): ExcelData {
  // Create a deep copy to avoid mutation
  const newData = JSON.parse(JSON.stringify(data)) as ExcelData;
  
  // Ensure the sheet name is unique
  if (newData.sheets[sheetName]) {
    throw new Error(`Sheet "${sheetName}" already exists`);
  }
  
  // Add the new sheet
  newData.sheets[sheetName] = [[]];
  
  return newData;
}

/**
 * Convert a CSV string to Excel data
 * @param csvString The CSV string to convert
 * @param sheetName The name of the sheet to create
 */
export function csvToExcel(csvString: string, sheetName: string = "Sheet1"): ExcelData {
  // Parse CSV into rows and columns
  const rows = csvString.split('\n')
    .map(row => row.split(',').map(cell => cell.trim()));
  
  // Create Excel data
  const data: ExcelData = {
    sheets: {
      [sheetName]: rows
    },
    activeSheet: sheetName
  };
  
  return data;
}
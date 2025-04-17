// 导入适当的依赖
import { writable } from 'svelte/store';

// 定义类型
interface SyncState {
  inProgress: boolean;
  progress: number;
  error: string | null;
  result: any | null;
}

interface ColumnTypes {
  [key: string]: 'DATE' | 'INTEGER' | 'DECIMAL' | 'VARCHAR';
}

interface TableData {
  data: any[][];
  columns?: string[];
  columnTypes?: ColumnTypes;
  rowCount?: number;
  encoding?: string;
}

interface SyncData {
  data: {
    supporting_tables: {
      [key: string]: TableData;
    };
    master_table: TableData | null;
    timestamp: string;
  };
}

interface RawDataTable {
  name?: string;
  data: any[][];
  columns?: string[];
  dateColumns?: number[];
  weekEndingColumns?: number[];
}

interface RawData {
  masterTable?: RawDataTable;
  supportingTables?: {
    [key: string]: RawDataTable;
  };
}

// 创建同步状态的store
export const syncState = writable<SyncState>({
  inProgress: false,
  progress: 0,
  error: null,
  result: null
});

/**
 * 获取所有数据
 * 根据您的应用需求自定义
 */
export async function getAllData(): Promise<RawData> {
  try {
    // 这里实现您自己的数据获取逻辑
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`获取数据失败: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error('获取数据失败:', error);
    throw new Error(`获取数据失败: ${error.message}`);
  }
}

/**
 * 处理和清理数据
 * 基于您之前分享的代码，实现数据清理和标准化
 */
export function processData(rawData: RawData): SyncData {
  // 实现从您之前代码中提取的清理逻辑
  // 例如：处理日期格式、列名规范化等
  
  // 根据您的syncExcelData函数来格式化数据
  const formattedData: SyncData = {
    data: {
      supporting_tables: {},
      master_table: null,
      timestamp: new Date().toISOString()
    }
  };
  
  // 处理支持表
  if (rawData.supportingTables) {
    Object.entries(rawData.supportingTables).forEach(([name, table]) => {
      formattedData.data.supporting_tables[name] = {
        data: table.data,
        columns: table.columns || table.data[0],
        columnTypes: detectColumnTypes(table.data),
        rowCount: table.data.length,
        encoding: 'utf-8'
      };
    });
  }
  
  // 处理主表
  if (rawData.masterTable) {
    formattedData.data.master_table = {
      data: rawData.masterTable.data,
      columns: rawData.masterTable.columns || rawData.masterTable.data[0],
      columnTypes: detectColumnTypes(rawData.masterTable.data),
      rowCount: rawData.masterTable.data.length
    };
  }
  
  return formattedData;
}

/**
 * 从您的代码中提取的列类型检测功能
 */
function detectColumnTypes(data: any[][]): ColumnTypes {
  if (!data || data.length < 2) return {};
  
  const columnTypes: ColumnTypes = {};
  const headers = data[0];
  const dateRegex = /^(?:\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})$/;
  
  headers.forEach((header: any, columnIndex: number) => {
    // 确保header是字符串
    const headerStr = String(header || '');
    
    // 检查标题是否包含'date'
    if (headerStr.toLowerCase().includes('date')) {
      columnTypes[headerStr] = 'DATE';
      return;
    }
    
    // 获取第一个非空值
    const dataRows = data.slice(1);
    const firstValidRow = dataRows.find(row => 
      row && row[columnIndex] && String(row[columnIndex]).trim() !== ''
    );
    
    if (firstValidRow) {
      const value = String(firstValidRow[columnIndex]).trim();
      if (dateRegex.test(value)) {
        columnTypes[headerStr] = 'DATE';
        return;
      }
    }
    
    // 检查数据类型
    let isNumber = true;
    let hasDecimals = false;
    
    for (const row of dataRows) {
      if (!row || row.length <= columnIndex) continue;
      
      const value = row[columnIndex];
      if (value && String(value).trim() !== '') {
        const numValue = String(value).replace(/,/g, '');
        
        if (isNaN(Number(numValue))) {
          isNumber = false;
          break;
        }
        if (numValue.includes('.')) {
          hasDecimals = true;
        }
      }
    }
    
    if (isNumber) {
      columnTypes[headerStr] = hasDecimals ? 'DECIMAL' : 'INTEGER';
    } else {
      columnTypes[headerStr] = 'VARCHAR';
    }
  });
  
  return columnTypes;
}

/**
 * 转换日期格式为ISO格式 (YYYY-MM-DD)
 */
export function convertToISODateFormat(dateString: string): string {
  if (!dateString) return dateString;
  
  try {
    // 提取日期部分，处理"WEEK ENDING"格式
    let datePart = dateString;
    if (typeof datePart === 'string' && datePart.toLowerCase().includes('week ending')) {
      datePart = datePart.toLowerCase().replace('week ending', '').trim();
    }
    
    // 检查MM/DD/YYYY格式
    const mmddyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = datePart.match(mmddyyyyRegex);
    
    if (match) {
      const month = match[1].padStart(2, '0');
      const day = match[2].padStart(2, '0');
      const year = match[3];
      return `${year}-${month}-${day}`;
    }
    
    return datePart; // 如果不匹配预期格式，则按原样返回
  } catch (e) {
    console.error(`Error converting date format: ${dateString}`, e);
    return dateString;
  }
}

/**
 * 发送数据到后端
 */
export async function sendToBackend(processedData: SyncData): Promise<any> {
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'zh-CN'
      },
      body: JSON.stringify(processedData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `服务器错误 (${response.status})`);
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('同步数据失败:', error);
    throw error;
  }
}

/**
 * 执行完整的同步流程
 */
export async function performSync(): Promise<any> {
  syncState.update(state => ({ ...state, inProgress: true, progress: 0, error: null, result: null }));
  
  try {
    // 步骤 1: 获取数据
    syncState.update(state => ({ ...state, progress: 10 }));
    const allData = await getAllData();
    
    // 步骤 2: 处理数据
    syncState.update(state => ({ ...state, progress: 40 }));
    const processedData = processData(allData);
    
    // 步骤 3: 发送到后端
    syncState.update(state => ({ ...state, progress: 70 }));
    const response = await sendToBackend(processedData);
    
    // 处理成功响应
    syncState.update(state => ({ 
      ...state, 
      progress: 100,
      result: response
    }));
    
    return response;
    
  } catch (error: any) {
    syncState.update(state => ({ ...state, error: error.message }));
    throw error;
  } finally {
    syncState.update(state => ({ ...state, inProgress: false }));
  }
}

/**
 * 获取当前同步状态
 */
export function getSyncState(): SyncState {
  let currentState: SyncState = {
    inProgress: false,
    progress: 0,
    error: null,
    result: null
  };
  
  const unsubscribe = syncState.subscribe(state => {
    currentState = state;
  });
  
  unsubscribe();
  return currentState;
}
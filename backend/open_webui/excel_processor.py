import os
import pandas as pd
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

class ExcelProcessor:
    @staticmethod
    def process_excel_file(file_path: str, max_rows: int = 200, max_cols: int = 20) -> Dict[str, Any]:
        """Process Excel files and return structured data"""
        try:
            # Detect file extension
            _, ext = os.path.splitext(file_path)
            ext = ext.lower()
            
            # Choose appropriate processing method based on extension
            if ext in ['.xlsx', '.xls', '.xlsm']:
                # Use pandas to read Excel
                xls = pd.ExcelFile(file_path)
                sheet_names = xls.sheet_names
                
                result = {
                    "filename": os.path.basename(file_path),
                    "file_size_mb": round(os.path.getsize(file_path) / (1024 * 1024), 2),
                    "sheet_count": len(sheet_names),
                    "sheets": []
                }
                
                # Process each worksheet
                for sheet_name in sheet_names:
                    # Limit the number of rows/columns for performance
                    df = pd.read_excel(file_path, sheet_name=sheet_name, nrows=max_rows)
                    
                    # Truncate columns if needed
                    if len(df.columns) > max_cols:
                        df = df.iloc[:, :max_cols]
                        truncated_cols = True
                    else:
                        truncated_cols = False
                    
                    # Get basic information
                    sheet_info = {
                        "name": sheet_name,
                        "total_rows": len(df),
                        "total_columns": len(df.columns),
                        "headers": df.columns.tolist(),
                        "truncated_cols": truncated_cols,
                        "sample_rows": min(10, len(df))
                    }
                    
                    # Get sample data
                    sample_data = []
                    for _, row in df.head(10).iterrows():
                        sample_row = {}
                        for col in df.columns:
                            val = row[col]
                            # Convert numpy types to Python native types
                            if pd.isna(val):
                                sample_row[str(col)] = None
                            else:
                                sample_row[str(col)] = str(val)
                        sample_data.append(sample_row)
                    
                    sheet_info["sample_data"] = sample_data
                    
                    # Get statistics for numeric columns
                    numeric_cols = df.select_dtypes(include=['number']).columns
                    stats = {}
                    for col in numeric_cols:
                        if not df[col].empty:
                            stats[str(col)] = {
                                "min": float(df[col].min()),
                                "max": float(df[col].max()),
                                "mean": float(df[col].mean()),
                                "median": float(df[col].median())
                            }
                    
                    sheet_info["stats"] = stats
                    result["sheets"].append(sheet_info)
                
                return result
                
            elif ext == '.csv':
                # Process CSV files
                df = pd.read_csv(file_path, nrows=max_rows)
                
                # Truncate columns if needed
                if len(df.columns) > max_cols:
                    df = df.iloc[:, :max_cols]
                    truncated_cols = True
                else:
                    truncated_cols = False
                
                result = {
                    "filename": os.path.basename(file_path),
                    "file_size_mb": round(os.path.getsize(file_path) / (1024 * 1024), 2),
                    "sheet_count": 1,
                    "sheets": [{
                        "name": "CSV Data",
                        "total_rows": len(df),
                        "total_columns": len(df.columns),
                        "headers": df.columns.tolist(),
                        "truncated_cols": truncated_cols,
                        "sample_rows": min(10, len(df)),
                        "sample_data": df.head(10).to_dict('records')
                    }]
                }
                
                # Add statistics
                numeric_cols = df.select_dtypes(include=['number']).columns
                stats = {}
                for col in numeric_cols:
                    if not df[col].empty:
                        stats[str(col)] = {
                            "min": float(df[col].min()),
                            "max": float(df[col].max()),
                            "mean": float(df[col].mean()),
                            "median": float(df[col].median())
                        }
                
                result["sheets"][0]["stats"] = stats
                return result
            else:
                return {"error": f"Unsupported file format: {ext}"}
        
        except Exception as e:
            logger.error(f"Error processing Excel file: {str(e)}")
            return {"error": f"Error processing Excel file: {str(e)}"}

    @staticmethod
    def format_excel_for_llm(excel_data: Dict[str, Any]) -> str:
        """Convert Excel data into LLM-friendly text format"""
        if "error" in excel_data:
            return f"Excel file processing error: {excel_data['error']}"
        
        text_parts = []
        
        # File basic information
        text_parts.append(f"# Excel File Analysis: {excel_data['filename']}")
        text_parts.append(f"- File size: {excel_data['file_size_mb']} MB")
        text_parts.append(f"- Number of worksheets: {excel_data['sheet_count']}")
        
        # Process each worksheet
        for sheet in excel_data["sheets"]:
            text_parts.append(f"\n## Worksheet: {sheet['name']}")
            text_parts.append(f"- Total rows: {sheet['total_rows']}")
            text_parts.append(f"- Total columns: {sheet['total_columns']}")
            
            # Column headers
            text_parts.append("\n### Column Headers:")
            text_parts.append(", ".join(sheet['headers']))
            
            # Data preview
            text_parts.append("\n### Data Preview:")
            
            # Create Markdown table
            headers = sheet["headers"]
            text_parts.append("| " + " | ".join(str(h) for h in headers) + " |")
            text_parts.append("| " + " | ".join(["---" for _ in headers]) + " |")
            
            for row in sheet["sample_data"]:
                cells = [str(row.get(str(h), "")) for h in headers]
                text_parts.append("| " + " | ".join(cells) + " |")
                
            # Show truncation information
            if sheet.get("truncated_cols", False):
                text_parts.append("\nNote: Due to large number of columns, only the first 20 columns are displayed")
            
            # Show statistics
            if "stats" in sheet and sheet["stats"]:
                text_parts.append("\n### Statistics for Numeric Columns:")
                for col, stat in sheet["stats"].items():
                    text_parts.append(f"- {col}: Min={stat['min']}, Max={stat['max']}, Mean={stat['mean']:.2f}, Median={stat['median']}")
        
        return "\n".join(text_parts)
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import os
import shutil
import uuid
from typing import Dict, Any, List
import logging

from ..excel_processor import ExcelProcessor
from ..utils.auth import get_current_user  # Adjust import based on actual auth implementation

logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

# File upload directory
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "uploads", "excel")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/files/excel/upload")
async def upload_excel_file(file: UploadFile = File(...), user = Depends(get_current_user)):
    """Upload Excel file and return processed data"""
    # Check file type
    filename = file.filename
    file_ext = os.path.splitext(filename)[1].lower()
    
    if file_ext not in ['.xlsx', '.xls', '.csv', '.xlsm']:
        raise HTTPException(status_code=400, detail="Unsupported file format. Only Excel files (.xlsx, .xls, .csv, .xlsm) are supported")
    
    # Generate unique file ID and save path
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_ext}")
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File save failed: {str(e)}")
    
    # Process file
    processor = ExcelProcessor()
    excel_data = processor.process_excel_file(file_path)
    
    if "error" in excel_data:
        # Delete file if processing failed
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=excel_data["error"])
    
    # Return file information and preprocessed data
    return {
        "file_id": file_id,
        "filename": filename,
        "file_path": file_path,
        "excel_data": excel_data
    }

@router.get("/files/excel/{file_id}/text")
async def get_excel_text(file_id: str, user = Depends(get_current_user)):
    """Get the text representation of an Excel file to pass to LLM"""
    # Look for the file
    matching_files = [f for f in os.listdir(UPLOAD_DIR) if f.startswith(file_id)]
    
    if not matching_files:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = os.path.join(UPLOAD_DIR, matching_files[0])
    
    # Process Excel file
    processor = ExcelProcessor()
    excel_data = processor.process_excel_file(file_path)
    
    if "error" in excel_data:
        raise HTTPException(status_code=500, detail=excel_data["error"])
    
    # Convert to LLM-friendly text format
    text_representation = processor.format_excel_for_llm(excel_data)
    
    return {"text": text_representation}
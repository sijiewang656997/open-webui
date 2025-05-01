from fastapi import APIRouter, File, UploadFile, HTTPException, Query
from fastapi.responses import JSONResponse
import httpx
import chardet

router = APIRouter()

EXTERNAL_API_BASE = "http://192.168.200.118:5002/api/excel_to_sql"
AUTH_HEADER = {"Authorization": "Bearer token_59b8b43a_aiurmmm0"}

async def call_external_api(
    method: str,
    endpoint: str,
    params: dict = None,
    files: dict = None
):
    url = f"{EXTERNAL_API_BASE}{endpoint}"
    async with httpx.AsyncClient(timeout=60) as client:
        try:
            if method == "GET":
                response = await client.get(
                    url,
                    params=params,
                    headers=AUTH_HEADER
                )
            elif method == "POST":
                response = await client.post(
                    url,
                    files=files,
                    headers=AUTH_HEADER
                )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            error_detail = f"External API error: {e.response.status_code} - {e.response.text}"
            print(f"[ERROR] API request failed: {error_detail}")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=error_detail
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Internal server error: {str(e)}"
            )

@router.post("/excel-to-sql")
async def proxy_external_api(file: UploadFile = File(...)):
    try:
        raw_data = await file.read()
        encoding = chardet.detect(raw_data)['encoding'] or 'utf-8'
        
        if file.filename.lower().endswith('.csv'):
            try:
                decoded = raw_data.decode(encoding)
            except UnicodeDecodeError:
                decoded = raw_data.decode('gb18030')
            raw_data = decoded.encode('utf-8')
        
        form_data = {
            "file": (file.filename, raw_data, file.content_type)
        }
        
        return await call_external_api(
            "POST",
            "",
            files=form_data
        )

    except UnicodeDecodeError as e:
        raise HTTPException(
            status_code=415,
            detail=f"File encoding error: Please save file with UTF-8 or GBK encoding ({str(e)})"
        )

@router.get("/list-files")
async def list_files(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=200),
    file_type: str = Query(None, description="Filter by file type (excel/csv)"),
    search: str = Query(None, description="Search by filename")
):
    """
    Get paginated list of processed files with optional filters
    """
    params = {
        "page": page,
        "per_page": per_page,
        "file_type": file_type,
        "search": search
    }
    
    return await call_external_api(
        "GET",
        "/list_files",
        params=params
    )
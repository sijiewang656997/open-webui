from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx

router = APIRouter()
print("get import!~~~~~~~~~~~~~~~~")
@router.post("/excel-to-sql")
async def proxy_external_api(request: Request):
    try:
        data = await request.json()
        
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.post(
                "https://192.168.200.118:5002/api/excel_to_sql",
                json=data,
                headers={
                    "Accept-Language": "en",
                    "Authorization": "Bearer token_59b8b43a_aiurmmm0"
                },
                timeout=30
            )
            response.raise_for_status()
 
        return JSONResponse(response.json())
        
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"External API error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
import httpx
import logging

# 配置日志记录
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

router = APIRouter(tags=["Proxy"])

@router.post("/proxy/excel-to-sql")
async def proxy_external_api(request: Request):
    try:
        data = await request.json()
        logger.info(f"Received request data: {data}")
        
        async with httpx.AsyncClient() as client:
            # 发送请求
            response = await client.post(
                "https://192.168.200.118:5002/api/excel_to_sql",
                json=data,
                headers={
                    "Accept-Language": "en",
                    "Authorization": "Bearer token_59b8b43a_aiurmmm0_upload"
                },
                timeout=30
            )
            
            # 记录响应详细信息
            logger.info(f"Response status: {response.status_code}")
            logger.info(f"Response headers: {dict(response.headers)}")
            logger.info(f"Response content: {response.text}")  # 原始响应内容
            
            response.raise_for_status()
            
            # 尝试解析JSON
            try:
                json_response = response.json()
                logger.info(f"Parsed JSON response: {json_response}")
                return JSONResponse(json_response)
            except ValueError:
                logger.error("Failed to parse JSON response")
                return JSONResponse({"error": "Invalid JSON response"}, status_code=500)
                
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error occurred: {str(e)}")
        logger.error(f"Error response content: {e.response.text}")  # 记录错误响应内容
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"External API error: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
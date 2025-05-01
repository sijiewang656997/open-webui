from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import httpx
import chardet

router = APIRouter()

@router.post("/excel-to-sql")
async def proxy_external_api(file: UploadFile = File(...)):
    try:
        # 1. 读取并检测文件编码
        raw_data = await file.read()
        encoding = chardet.detect(raw_data)['encoding'] or 'utf-8'
        
        # 2. 编码转换 (示例仅处理 CSV)
        if file.filename.lower().endswith('.csv'):
            try:
                decoded = raw_data.decode(encoding)
            except UnicodeDecodeError:
                decoded = raw_data.decode('gb18030')  # 中文编码兜底
            raw_data = decoded.encode('utf-8')
        
        # 3. 构造 multipart 数据
        form_data = {
            "file": (file.filename, raw_data, file.content_type)
        }
        
        # 4. 转发请求
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                "http://192.168.200.118:5002/api/excel_to_sql",
                files=form_data,
                headers={"Authorization": "Bearer token_59b8b43a_aiurmmm0"}
            )
            response.raise_for_status()
            
        return JSONResponse(response.json())

    except httpx.HTTPStatusError as e:
        error_detail = f"外部API错误: {e.response.status_code} - {e.response.text}"
        print(f"[ERROR] API 请求失败: {error_detail}")
        raise HTTPException(status_code=502, detail=error_detail)
        
    except UnicodeDecodeError as e:
        raise HTTPException(
            status_code=415,
            detail=f"文件编码错误: 请使用 UTF-8 或 GBK 编码保存文件 ({str(e)})"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")
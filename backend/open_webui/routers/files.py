import logging
import os
import uuid
from fnmatch import fnmatch
from pathlib import Path
from typing import Optional
from urllib.parse import quote
 
import pandas as pd
import sqlite3
from tempfile import NamedTemporaryFile
from open_webui.database import SQLDatabase
 
from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    Request,
    UploadFile,
    status,
    Query,
)
from fastapi.responses import FileResponse, StreamingResponse
from open_webui.constants import ERROR_MESSAGES
from open_webui.env import SRC_LOG_LEVELS
from open_webui.models.files import (
    FileForm,
    FileModel,
    FileModelResponse,
    Files,
)
from open_webui.models.knowledge import Knowledges
 
from open_webui.routers.knowledge import get_knowledge, get_knowledge_list
from open_webui.routers.retrieval import ProcessFileForm, process_file
from open_webui.routers.audio import transcribe
from open_webui.storage.provider import Storage
from open_webui.utils.auth import get_admin_user, get_verified_user
from pydantic import BaseModel
 
log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["MODELS"])
 
 
router = APIRouter()
 
def is_excel_file(content_type: str) -> bool:
    excel_content_types = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel.sheet.macroEnabled.12",
        "application/vnd.oasis.opendocument.spreadsheet",  # ODS格式
    ]
    return content_type in excel_content_types
 
 
def excel_to_sql(file_path: str) -> dict:
    """将Excel文件转换为SQLite数据库"""
    db = SQLDatabase()  # 使用现有的数据库连接
    
    with NamedTemporaryFile(suffix=".db", delete=False) as temp_db:
        db_path = temp_db.name
        
    conn = sqlite3.connect(db_path)
    
    try:
        # 读取Excel文件
        xls = pd.ExcelFile(file_path)
        tables = {}
        
        # 遍历所有工作表
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name=sheet_name)
            
            # 清理列名（替换空格和特殊字符）
            df.columns = [f"col_{i}" if col.strip() == "" else col.replace(" ", "_").replace("-", "_")
                         for i, col in enumerate(df.columns, 1)]
            
            # 转换到SQL
            table_name = f"sheet_{sheet_name}" if sheet_name[0].isdigit() else sheet_name
            table_name = table_name.replace(" ", "_").lower()[:63]  # SQL表名限制
            
            df.to_sql(table_name, conn, index=False, if_exists='replace')
            tables[sheet_name] = {
                "columns": list(df.columns),
                "row_count": len(df),
                "schema": pd.io.sql.get_schema(df, table_name, con=conn)
            }
            
        return {
            "database_path": db_path,
            "tables": tables,
            "original_excel_path": file_path
        }
    except Exception as e:
        conn.close()
        os.remove(db_path)
        raise HTTPException(
            status_code=400,
            detail=f"Excel转换失败: {str(e)}"
        )
    finally:
        conn.close()
 
 
############################
# Check if the current user has access to a file through any knowledge bases the user may be in.
############################
 
 
def has_access_to_file(
    file_id: Optional[str], access_type: str, user=Depends(get_verified_user)
) -> bool:
    file = Files.get_file_by_id(file_id)
    log.debug(f"Checking if user has {access_type} access to file")
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    has_access = False
    knowledge_base_id = file.meta.get("collection_name") if file.meta else None
 
    if knowledge_base_id:
        knowledge_bases = Knowledges.get_knowledge_bases_by_user_id(
            user.id, access_type
        )
        for knowledge_base in knowledge_bases:
            if knowledge_base.id == knowledge_base_id:
                has_access = True
                break
 
    return has_access
 
 
############################
# Upload File
############################
 
 
@router.post("/", response_model=FileModelResponse)
def upload_file(
    request: Request,
    file: UploadFile = File(...),
    user=Depends(get_verified_user),
    file_metadata: dict = {},
    process: bool = Query(True),
    convert_to_sql: bool = Query(False, description="是否转换为SQL数据库")
):
    log.info(f"file.content_type: {file.content_type}")
    try:
        # Excel文件转换处理分支
        if convert_to_sql and is_excel_file(file.content_type):
            return handle_excel_conversion(file, user, file_metadata, process)
 
        # 原始文件处理流程
        unsanitized_filename = file.filename
        filename = os.path.basename(unsanitized_filename)
 
        # 生成唯一ID和文件名
        file_id = str(uuid.uuid4())
        original_filename = filename
        stored_filename = f"{file_id}_{filename}"
 
        # 保存原始文件
        contents, file_path = Storage.upload_file(file.file, stored_filename)
 
        # 构建文件元数据
        meta_data = {
            "name": original_filename,
            "content_type": file.content_type,
            "size": len(contents),
            "data": file_metadata,
            "is_converted": False
        }
 
        # 插入文件记录
        file_item = Files.insert_new_file(
            user.id,
            FileForm(
                **{
                    "id": file_id,
                    "filename": original_filename,
                    "path": file_path,
                    "meta": meta_data,
                }
            ),
        )
 
        # 文件后处理流程
        if process:
            try:
                # 音频文件转录处理
                if file.content_type in [
                    "audio/mpeg",
                    "audio/wav",
                    "audio/ogg",
                    "audio/x-m4a",
                ]:
                    physical_path = Storage.get_file(file_path)
                    result = transcribe(request, physical_path)
 
                    process_file(
                        request,
                        ProcessFileForm(file_id=file_id, content=result.get("text", "")),
                        user=user,
                    )
                # 非图片文件处理
                elif file.content_type not in ["image/png", "image/jpeg", "image/gif"]:
                    process_file(
                        request,
                        ProcessFileForm(file_id=file_id),
                        user=user
                    )
 
                # 更新文件记录
                file_item = Files.get_file_by_id(id=file_id)
            except Exception as e:
                log.exception(e)
                log.error(f"Error processing file: {file_id}")
                file_item = FileModelResponse(
                    **{
                        **file_item.model_dump(),
                        "error": str(e.detail) if hasattr(e, "detail") else str(e),
                    }
                )
 
        if file_item:
            return file_item
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("文件上传失败"),
            )
 
    except Exception as e:
        log.exception(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT(e),
        )
 
def handle_excel_conversion(
    file: UploadFile,
    user,
    metadata: dict,
    process: bool
) -> FileModelResponse:
    """处理Excel到SQL数据库的转换"""
    tmp_excel_path = None
    tmp_db_path = None
    db_file = None
    
    try:
        # 保存临时Excel文件
        with NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
            content = file.file.read()
            tmp.write(content)
            tmp_excel_path = tmp.name
 
        # 执行Excel到SQL转换
        conversion_result = excel_to_sql(tmp_excel_path)
        tmp_db_path = conversion_result["database_path"]
 
        # 准备数据库文件元数据
        db_metadata = {
            **metadata,
            "original_excel": {
                "filename": file.filename,
                "size": len(content),
                "content_type": file.content_type
            },
            "tables": conversion_result["tables"],
            "is_converted": True
        }
 
        # 创建数据库文件记录
        db_filename = f"{Path(file.filename).stem}.db"
        db_file_id = str(uuid.uuid4())
        stored_db_filename = f"{db_file_id}_{db_filename}"
 
        # 保存数据库文件
        with open(tmp_db_path, "rb") as db_file:
            db_contents, db_file_path = Storage.upload_file(db_file, stored_db_filename)
 
        # 插入数据库文件记录
        db_file_item = Files.insert_new_file(
            user.id,
            FileForm(
                **{
                    "id": db_file_id,
                    "filename": db_filename,
                    "path": db_file_path,
                    "meta": {
                        "name": db_filename,
                        "content_type": "application/x-sqlite3",
                        "size": len(db_contents),
                        "data": db_metadata,
                        "database_info": {
                            "original_excel_id": None,  # 可关联原始文件ID
                            "tables": conversion_result["tables"],
                            "schema_version": "1.0"
                        }
                    },
                }
            ),
        )
 
        # 可选的后处理流程
        if process:
            try:
                process_file(
                    request=None,
                    form_data=ProcessFileForm(file_id=db_file_id),
                    user=user
                )
                db_file_item = Files.get_file_by_id(id=db_file_id)
            except Exception as e:
                log.error(f"数据库文件后处理失败: {str(e)}")
 
        return db_file_item
 
    except Exception as e:
        log.error(f"Excel转换失败: {str(e)}")
        # 清理临时文件
        if tmp_excel_path and os.path.exists(tmp_excel_path):
            os.remove(tmp_excel_path)
        if tmp_db_path and os.path.exists(tmp_db_path):
            os.remove(tmp_db_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Excel转换失败: {str(e)}"
        )
    finally:
        # 确保文件句柄关闭
        if db_file and not db_file.closed:
            db_file.close()
        # 清理临时文件
        if tmp_excel_path and os.path.exists(tmp_excel_path):
            os.remove(tmp_excel_path)
 
 
############################
# List Files
############################
 
 
@router.get("/", response_model=list[FileModelResponse])
async def list_files(user=Depends(get_verified_user), content: bool = Query(True)):
    if user.role == "admin":
        files = Files.get_files()
    else:
        files = Files.get_files_by_user_id(user.id)
 
    if not content:
        for file in files:
            del file.data["content"]
 
    return files
 
 
############################
# Search Files
############################
 
 
@router.get("/search", response_model=list[FileModelResponse])
async def search_files(
    filename: str = Query(
        ...,
        description="Filename pattern to search for. Supports wildcards such as '*.txt'",
    ),
    content: bool = Query(True),
    user=Depends(get_verified_user),
):
    """
    Search for files by filename with support for wildcard patterns.
    """
    # Get files according to user role
    if user.role == "admin":
        files = Files.get_files()
    else:
        files = Files.get_files_by_user_id(user.id)
 
    # Get matching files
    matching_files = [
        file for file in files if fnmatch(file.filename.lower(), filename.lower())
    ]
 
    if not matching_files:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No files found matching the pattern.",
        )
 
    if not content:
        for file in matching_files:
            del file.data["content"]
 
    return matching_files
 
 
############################
# Delete All Files
############################
 
 
@router.delete("/all")
async def delete_all_files(user=Depends(get_admin_user)):
    result = Files.delete_all_files()
    if result:
        try:
            Storage.delete_all_files()
        except Exception as e:
            log.exception(e)
            log.error("Error deleting files")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error deleting files"),
            )
        return {"message": "All files deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ERROR_MESSAGES.DEFAULT("Error deleting files"),
        )
 
 
############################
# Get File By Id
############################
 
 
@router.get("/{id}", response_model=Optional[FileModel])
async def get_file_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "read", user)
    ):
        return file
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
############################
# Get File Data Content By Id
############################
 
 
@router.get("/{id}/data/content")
async def get_file_data_content_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "read", user)
    ):
        return {"content": file.data.get("content", "")}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
############################
# Update File Data Content By Id
############################
 
 
class ContentForm(BaseModel):
    content: str
 
 
@router.post("/{id}/data/content/update")
async def update_file_data_content_by_id(
    request: Request, id: str, form_data: ContentForm, user=Depends(get_verified_user)
):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "write", user)
    ):
        try:
            process_file(
                request,
                ProcessFileForm(file_id=id, content=form_data.content),
                user=user,
            )
            file = Files.get_file_by_id(id=id)
        except Exception as e:
            log.exception(e)
            log.error(f"Error processing file: {file.id}")
 
        return {"content": file.data.get("content", "")}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
############################
# Get File Content By Id
############################
 
 
@router.get("/{id}/content")
async def get_file_content_by_id(
    id: str, user=Depends(get_verified_user), attachment: bool = Query(False)
):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "read", user)
    ):
        try:
            file_path = Storage.get_file(file.path)
            file_path = Path(file_path)
 
            # Check if the file already exists in the cache
            if file_path.is_file():
                # Handle Unicode filenames
                filename = file.meta.get("name", file.filename)
                encoded_filename = quote(filename)  # RFC5987 encoding
 
                content_type = file.meta.get("content_type")
                filename = file.meta.get("name", file.filename)
                encoded_filename = quote(filename)
                headers = {}
 
                if attachment:
                    headers["Content-Disposition"] = (
                        f"attachment; filename*=UTF-8''{encoded_filename}"
                    )
                else:
                    if content_type == "application/pdf" or filename.lower().endswith(
                        ".pdf"
                    ):
                        headers["Content-Disposition"] = (
                            f"inline; filename*=UTF-8''{encoded_filename}"
                        )
                        content_type = "application/pdf"
                    elif content_type != "text/plain":
                        headers["Content-Disposition"] = (
                            f"attachment; filename*=UTF-8''{encoded_filename}"
                        )
 
                return FileResponse(file_path, headers=headers, media_type=content_type)
 
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=ERROR_MESSAGES.NOT_FOUND,
                )
        except Exception as e:
            log.exception(e)
            log.error("Error getting file content")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error getting file content"),
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
@router.get("/{id}/content/html")
async def get_html_file_content_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "read", user)
    ):
        try:
            file_path = Storage.get_file(file.path)
            file_path = Path(file_path)
 
            # Check if the file already exists in the cache
            if file_path.is_file():
                log.info(f"file_path: {file_path}")
                return FileResponse(file_path)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=ERROR_MESSAGES.NOT_FOUND,
                )
        except Exception as e:
            log.exception(e)
            log.error("Error getting file content")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error getting file content"),
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
@router.get("/{id}/content/{file_name}")
async def get_file_content_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "read", user)
    ):
        file_path = file.path
 
        # Handle Unicode filenames
        filename = file.meta.get("name", file.filename)
        encoded_filename = quote(filename)  # RFC5987 encoding
        headers = {
            "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"
        }
 
        if file_path:
            file_path = Storage.get_file(file_path)
            file_path = Path(file_path)
 
            # Check if the file already exists in the cache
            if file_path.is_file():
                return FileResponse(file_path, headers=headers)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=ERROR_MESSAGES.NOT_FOUND,
                )
        else:
            # File path doesn’t exist, return the content as .txt if possible
            file_content = file.content.get("content", "")
            file_name = file.filename
 
            # Create a generator that encodes the file content
            def generator():
                yield file_content.encode("utf-8")
 
            return StreamingResponse(
                generator(),
                media_type="text/plain",
                headers=headers,
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
 
############################
# Delete File By Id
############################
 
 
@router.delete("/{id}")
async def delete_file_by_id(id: str, user=Depends(get_verified_user)):
    file = Files.get_file_by_id(id)
 
    if not file:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
 
    if (
        file.user_id == user.id
        or user.role == "admin"
        or has_access_to_file(id, "write", user)
    ):
        # We should add Chroma cleanup here
 
        result = Files.delete_file_by_id(id)
        if result:
            try:
                Storage.delete_file(file.path)
            except Exception as e:
                log.exception(e)
                log.error("Error deleting files")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=ERROR_MESSAGES.DEFAULT("Error deleting files"),
                )
            return {"message": "File deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=ERROR_MESSAGES.DEFAULT("Error deleting file"),
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ERROR_MESSAGES.NOT_FOUND,
        )
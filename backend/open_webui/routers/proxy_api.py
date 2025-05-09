from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import Response, StreamingResponse
import httpx
from open_webui.config import OPENAI_API_BASE_URLS
router = APIRouter()

@router.post("/{endpoint:path}")
@router.get("/{endpoint:path}")
async def proxy_endpoint(endpoint: str, request: Request):
    try:
        # Get the target URL from environment or config
        base_url = OPENAI_API_BASE_URLS.value[0] if isinstance(OPENAI_API_BASE_URLS.value, list) else OPENAI_API_BASE_URLS.value
        target_base_url = base_url[:-3] if base_url.endswith('/v1') else base_url
        
        # Construct the full target URL
        target_url = f"{target_base_url}/{endpoint}"
        
        # Get the request body for POST requests
        body = await request.body() if request.method.upper() == "POST" else None
        
        # Get headers from the original request
        headers = dict(request.headers)
        # Remove host header to avoid conflicts
        headers.pop('host', None)
        
        # Get query parameters for forwarding
        params = dict(request.query_params)
        
        # Detect if this is a streaming endpoint
        is_streaming = "stream" in endpoint or endpoint.endswith("/stream")
        
        # For streaming responses, use StreamingResponse
        if is_streaming:
            async def stream_response():
                async with httpx.AsyncClient(verify=False, timeout=300) as client:
                    async with client.stream(
                        method=request.method,
                        url=target_url,
                        headers=headers,
                        content=body,
                        params=params
                    ) as response:
                        async for chunk in response.aiter_bytes():
                            yield chunk
            
            # Return a StreamingResponse for streaming endpoints
            return StreamingResponse(
                stream_response(),
                media_type="application/x-ndjson"
            )
        else:
            # Make the request to the target endpoint (non-streaming)
            async with httpx.AsyncClient(verify=False) as client:
                response = await client.request(
                    method=request.method,
                    url=target_url,
                    headers=headers,
                    content=body,
                    params=params,
                    timeout=300
                )
                
                # Return the response with the same status code and headers
                return Response(
                    content=response.content,
                    status_code=response.status_code,
                    headers=dict(response.headers)
                )
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
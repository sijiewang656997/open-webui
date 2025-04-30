/**
 * Excel管理相关API
 */

/**
 * 上传Excel文件的API
 * @param token 授权令牌
 * @param file 文件路径或文件对象
 * @returns Promise<any>
 */
export const upload_files_api = async (token: string, file: any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/proxy/excel-to-sql', {
      method: 'POST',
      headers: {
        'Accept-Language': 'en',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Excel转换失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Excel API错误:', error);
    throw error;
  }
}; 
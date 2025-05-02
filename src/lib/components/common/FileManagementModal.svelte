<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { getContext, onMount } from 'svelte';
  import { getFiles, uploadFile, deleteFileById, deleteAllFiles, getFileContentById } from '$lib/apis/files';
  import Spinner from '../common/Spinner.svelte';
  import { createEventDispatcher } from 'svelte';

  import FileItemModal from './FileItemModal.svelte';
  
  const i18n: any = getContext('i18n');
  const dispatch = createEventDispatcher();
  
  export let show: boolean = false;
  
  let files = [];
  let loading = false;
  let confirmingDelete = false;
  let sortBy = 'date';
  let sortDirection = 'desc';

  let selectedFile = null;
  let showFilePreview = false;

  let listingFiles = false;
  let listedFiles = [];
  
  onMount(() => {
    if (show) {
      loadFiles();
    }
  });
  
  $: if (show && !loading && files.length === 0) {
    loadFiles();
  }
  
  $: sortedFiles = [...files].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.filename.localeCompare(b.filename);
    } else if (sortBy === 'date') {
      comparison = new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    } else if (sortBy === 'size') {
      comparison = b.size - a.size;
    }
    
    return sortDirection === 'asc' ? comparison * -1 : comparison;
  });
  
  function handleSort(by) {
    if (sortBy === by) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = by;
      sortDirection = 'desc';
    }
  }

  function handleFileClick(file) {
      selectedFile = {
          id: file.id,
          name: file.filename,
          size: file.size,
          meta: {
          content_type: file.type
          },
          // 其他 FileItemModal 需要的属性
          type: 'file',
          url: file.url || `/files/${file.id}`
      };
      showFilePreview = true;
  }

  function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      
      // 如果年份是1970或日期无效(通常表示时间戳有问题)，使用当前日期
      if (year <= 1970 || isNaN(date.getTime())) {
          const now = new Date();
          // 格式化为 mm/dd/yyyy 格式
          return `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()} ${now.toLocaleTimeString()}`;
      }
      
      // 格式化为 mm/dd/yyyy 格式
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
  }

  const isExcelFile = (file: File) => {
    const excelMimeTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet',
      'text/csv'
    ];
    const excelExtensions = ['.xls', '.xlsx', '.csv', '.ods'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    return excelMimeTypes.includes(file.type) || excelExtensions.includes(extension);
  };

  const handleFileProcessing = async (file: File) => {
    const tempId = Date.now().toString();
    try {
      // 创建临时文件项
      files = [...files, {
        id: tempId,
        filename: file.name,
        type: file.type,
        size: file.size,
        status: 'uploading',
        conversionResult: null,
        error: null,
        updated_at: new Date().toISOString()
      }];

      // 并行处理操作
      const operations = [uploadFile(localStorage.token, file)];
      
      if (isExcelFile(file)) {
        // Excel 双通道处理
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify({
          filename: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }));

        operations.push(
          fetch('http://localhost:8080/proxy/excel-to-sql', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer token_59b8b43a_aiurmmm0',
              'Accept-Language': 'en'
            },
            body: formData
          }).then(async res => {
            if (!res.ok) throw await res.json();
            return res.json();
          })
        );
      }

      // 等待所有操作完成
      const [uploadResult, conversionResult] = await Promise.all(operations);
      
      // 更新文件状态
      files = files.map(f => 
        f.id === tempId ? {
          ...f,
          status: 'processed',
          conversionResult: conversionResult || null,
          id: uploadResult.id, // 使用服务器返回的真实ID
          url: `/files/${uploadResult.id}`
        } : f
      );

      await loadFiles();

      toast.success($i18n.t('File processed: {0}', [file.name]));
      dispatch('change');

    } catch (error) {
      // 错误处理
      files = files.map(f => 
        f.id === tempId ? {
          ...f,
          status: 'error',
          error: error.message || $i18n.t('Processing failed')
        } : f
      );
      toast.error($i18n.t('Failed to process {0}: {1}', [file.name, error.message]));
    }
  };

  async function handleListFiles() {
      try {
        listingFiles = true;
        const response = await fetch('http://localhost:8080/proxy/list-files', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer token_59b8b43a_aiurmmm0',
            'Accept-Language': 'en'
          }
        });

        if (!response.ok) throw await response.json();
        
        const data = await response.json();
        listedFiles = data; // 存储返回的列表数据
        toast.success($i18n.t('Files listed successfully'));
        
        // 如果需要可以更新主文件列表
        // files = data.map(convertFileFormat); 
        
      } catch (error) {
        console.error('Error listing files:', error);
        toast.error($i18n.t('Failed to list files: {0}', [error.message]));
      } finally {
        listingFiles = false;
      }
    }
  
  async function loadFiles() {
      try {
          loading = true;
          const response = await getFiles(localStorage.token);
          if (response) {
          // 处理文件数据，确保所有必要的字段都有值
            files = response.map(file => ({
              id: file.id,          // 确保包含必要字段
              filename: file.filename, 
              type: file.type || 'application/octet-stream',
              size: file.size,
              updated_at: file.updated_at || new Date().toISOString(),
              // 添加缺失的状态字段
              status: 'loaded',
              url: file.url || `/files/${file.id}`
          }));
          } else {
              files = [];
          }
      } catch (error) {
          console.error('Error loading files:', error);
          toast.error($i18n.t('Failed to load files'));
          files = [];
      } finally {
          loading = false;
      }
  }
  
  async function handleDeleteFile(fileId) {
    if (confirm($i18n.t('Are you sure you want to delete this file?'))) {
      try {
        await deleteFileById(localStorage.token, fileId);
        toast.success($i18n.t('File deleted successfully'));
        await loadFiles();
        dispatch('change');
      } catch (error) {
        console.error('Error deleting file:', error);
        toast.error($i18n.t('Failed to delete file'));
      }
    }
  }
  
  async function handleDeleteAllFiles() {
    confirmingDelete = false;
    
    try {
      await deleteAllFiles(localStorage.token);
      toast.success($i18n.t('All files deleted successfully'));
      await loadFiles();
      dispatch('change');
    } catch (error) {
      console.error('Error deleting all files:', error);
      toast.error($i18n.t('Failed to delete all files'));
    }
  }
  
  async function handleDownloadFile(file) {
    try {
      const blob = await getFileContentById(file.id);
      if (!blob) {
        throw new Error('Failed to download file');
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      toast.success($i18n.t('File downloaded'));
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error($i18n.t('Failed to download file'));
    }
  }
  
  function formatFileSize(bytes) {
      // 检查bytes是否为有效数字且大于零
      if (bytes === undefined || bytes === null || isNaN(bytes) || bytes <= 0) {
          return 'Unknown size'; // 当为0或无效时显示"Unknown size"而不是"0 Bytes"
      }
  
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      
      // 添加错误处理
      try {
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      } catch (error) {
          return 'Unknown size';
      }
  }
  
  function getFileTypeIcon(type) {
      if (!type) {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          `;
      }
      if (type.includes('excel') || type.includes('spreadsheet')) {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5 5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3H5zm3.25 9.5a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0-3a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zM8.25 9a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
          </svg>
          `;
    } else if (type.includes('pdf')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M5 5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3H5z" clip-rule="evenodd" />
          <path d="M7 7h10v2H7V7z" />
        </svg>
      `;
      } else if (type.includes('image')) {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
          </svg>
          `;
      } else if (type.includes('word') || type.includes('document')) {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5 5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3H5zm3 2a1 1 0 000 2h8a1 1 0 100-2H8zm-1 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clip-rule="evenodd" />
          </svg>
          `;
      } else if (type.includes('text/csv')) {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5 5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3H5zm0 2a1 1 0 011-1h12a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1V7z" clip-rule="evenodd" />
              <path d="M7 9h2v2H7V9zm0 4h2v2H7v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
          </svg>
          `;
      } else {
          return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          `;
      }
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" on:click|self={() => (show = false)}>
    <div class="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl p-6 max-h-[80vh] overflow-auto file-modal-content">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{$i18n.t('Excel Management')}</h2>
        <button 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          on:click={() => (show = false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <button 
            class="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            on:click={() => loadFiles()}
          >
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {$i18n.t('Refresh')}
            </div>
          </button>
          
          <!-- 新增List Files按钮 -->
          <button
            class="text-sm px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-800 hover:bg-purple-200 dark:hover:bg-purple-700 transition"
            on:click={handleListFiles}
            disabled={listingFiles}
          >
            <div class="flex items-center gap-2 text-purple-600 dark:text-purple-300">
              {#if listingFiles}
                <Spinner className="size-4" />
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              {/if}
              {$i18n.t('List Files')}
            </div>
          </button>
        </div>

        <button 
          class="text-sm px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
          on:click={() => confirmingDelete = true}
        >
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {$i18n.t('Delete All')}
          </div>
        </button>
      </div>

      <!-- 新增API响应显示 -->
      {#if listedFiles.length > 0}
        <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium mb-2">{$i18n.t('API Response:')}</h3>
          <pre class="text-xs p-3 bg-white dark:bg-gray-900 rounded overflow-auto max-h-40">
            {JSON.stringify(listedFiles, null, 2)}
          </pre>
        </div>
      {/if}

      {#if confirmingDelete}
        <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
          <div class="text-red-800 dark:text-red-200 mb-2 font-medium">
            {$i18n.t('Are you sure you want to delete all files?')}
          </div>
          <div class="text-red-600 dark:text-red-300 text-sm mb-3">
            {$i18n.t('This action cannot be undone.')}
          </div>
          <div class="flex space-x-3">
            <button 
              class="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              on:click={handleDeleteAllFiles}
            >
              {$i18n.t('Delete All Files')}
            </button>
            <button 
              class="text-sm px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              on:click={() => confirmingDelete = false}
            >
              {$i18n.t('Cancel')}
            </button>
          </div>
        </div>
      {/if}

      <!-- 保持原有文件列表部分不变 -->
      {#if loading}
      <div class="flex justify-center items-center h-40">
        <Spinner className="size-8" />
      </div>
    {:else if sortedFiles.length === 0}
      <div class="text-center py-12 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <p class="text-lg font-medium">{$i18n.t('No files found')}</p>
        <p class="text-sm mt-1">{$i18n.t('Upload files to see them here')}</p>
      </div>
    {:else}
      <div class="overflow-x-auto mb-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <tr>
              <th class="px-4 py-2 text-left font-medium">
                <button class="flex items-center gap-1" on:click={() => handleSort('name')}>
                  {$i18n.t('Filename')}
                  {#if sortBy === 'name'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                    </svg>
                  {/if}
                </button>
              </th>
              <th class="px-4 py-2 text-left font-medium">
                <button class="flex items-center gap-1" on:click={() => handleSort('date')}>
                  {$i18n.t('Date')}
                  {#if sortBy === 'date'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                    </svg>
                  {/if}
                </button>
              </th>
              <th class="px-4 py-2 text-left font-medium">
                <button class="flex items-center gap-1" on:click={() => handleSort('size')}>
                  {$i18n.t('Size')}
                  {#if sortBy === 'size'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sortDirection === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                    </svg>
                  {/if}
                </button>
              </th>
              <th class="px-4 py-2 text-right font-medium">{$i18n.t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {#each sortedFiles as file (file.id)}
              <tr class="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="px-4 py-3">
                  <div class="flex items-center">
                    <div class="text-gray-500 dark:text-gray-400 mr-2.5">
                      {@html getFileTypeIcon(file.type)}
                    </div>
                    <!-- 修改这里，添加点击事件和样式 -->
                    <div 
                      class="truncate max-w-[200px] cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" 
                      title={file.filename}
                      on:click={() => handleFileClick(file)}
                    >
                      {file.filename}
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(file.updated_at)}
                </td>
                <td class="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end space-x-2">
                    <button 
                      class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400"
                      on:click={() => handleDownloadFile(file)}
                      title={$i18n.t('Download')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button 
                      class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                      on:click={() => handleDeleteFile(file.id)}
                      title={$i18n.t('Delete')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
    
    <div class="border-t border-gray-200 dark:border-gray-800 pt-4">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {#if files.length > 0}
            {$i18n.t('Showing')} {files.length} {files.length === 1 ? $i18n.t('file') : $i18n.t('files')}
          {/if}
        </div>
        
        <div class="flex space-x-3">
          <label 
            class="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {$i18n.t('Upload File')}
            <input
              type="file"
              class="hidden"
              multiple
              on:change={async (e) => {
                const files = e.target.files;
                if (files) {
                  for (const file of files) {
                    await handleFileProcessing(file);
                    await loadFiles(); // 刷新文件列表
                  }
                }
              }}
            />
          </label>
          
          <button 
            class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm"
            on:click={() => (show = false)}
          >
            {$i18n.t('Close')}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<!-- 添加文件预览模态框 -->
{#if showFilePreview && selectedFile}
<FileItemModal 
  item={selectedFile} 
  bind:show={showFilePreview}
  edit={false}
/>
{/if}

<style lang="postcss">
  /* 使用自定义类名代替直接选择带方括号的类名 */
  :global(.dark) .file-modal-content::-webkit-scrollbar {
    width: 10px;
  }
  
  :global(.dark) .file-modal-content::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 8px;
  }
  
  :global(.dark) .file-modal-content::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 8px;
  }
  
  :global(.dark) .file-modal-content::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
  
  .file-modal-content::-webkit-scrollbar {
    width: 10px;
  }
  
  .file-modal-content::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 8px;
  }
  
  .file-modal-content::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 8px;
  }
  
  .file-modal-content::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style>
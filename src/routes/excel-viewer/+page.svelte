<script lang="ts">
    import { onMount } from 'svelte';
    import { WEBUI_API_BASE_URL } from '$lib/constants';
    import ExcelViewer from '$lib/components/common/ExcelViewer.svelte';
    
    let fileId: string;
    let fileName: string;
    let loading = true;
    let error = null;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        fileId = urlParams.get('fileId');
        fileName = urlParams.get('fileName');
        
        loading = false;
        
        if (!fileId) {
            error = 'No file ID provided';
        }
        
        // 设置页面标题
        if (fileName) {
            document.title = `${fileName} - Excel Viewer`;
        } else {
            document.title = 'Excel Viewer';
        }
    });
</script>

<div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
    <header class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
                {fileName || 'Excel Viewer'}
            </h1>
            
        </div>
    </header>
    
    <main class="flex-1 p-4 overflow-auto">
        {#if loading}
            <div class="flex items-center justify-center h-full">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        {:else if error}
            <div class="flex items-center justify-center h-full">
                <div class="text-red-500">{error}</div>
            </div>
        {:else if fileId}
            <ExcelViewer 
                src={`${WEBUI_API_BASE_URL}/files/${fileId}/content`}
                fileName={fileName || ''}
                editable={true}
            />
        {/if}
    </main>
</div>
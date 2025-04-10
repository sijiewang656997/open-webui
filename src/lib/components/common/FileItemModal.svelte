<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { formatFileSize, getLineCount } from '$lib/utils';
	import { WEBUI_API_BASE_URL } from '$lib/constants';

	const i18n = getContext('i18n');

	import Modal from './Modal.svelte';
	import XMark from '../icons/XMark.svelte';
	import Info from '../icons/Info.svelte';
	import Switch from './Switch.svelte';
	import Tooltip from './Tooltip.svelte';
	import ExcelViewer from './ExcelViewer.svelte';
	import MultiFileViewer from './MultiFileViewer.svelte';

	export let item;
	export let show = false;
	export let edit = false;

	let enableFullContent = false;
	let multiFileMode = false;
    let openFiles = [];
    let activeFileIndex = 0;

	$: isPDF =
		item?.meta?.content_type === 'application/pdf' ||
		(item?.name && item?.name.toLowerCase().endsWith('.pdf'));
		
	$: isExcel =
		item?.meta?.content_type?.includes('spreadsheet') ||
		item?.meta?.content_type?.includes('excel') ||
		item?.meta?.content_type?.includes('ms-excel') ||
		(item?.name && /\.(xlsx|xls|xlsm|xlsb|xltx|xlt|csv|ods)$/i.test(item?.name));

	$: {
        if (item && show) {
            addFileToViewer(item);
        }
    }

	function addFileToViewer(fileItem) {
        // 检查文件是否已经打开
        const existingIndex = openFiles.findIndex(f => f.id === fileItem.id);
        
        if (existingIndex >= 0) {
            // 如果已存在，切换到对应标签
            activeFileIndex = existingIndex;
        } else {
            // 创建新的文件对象
            const newFile = {
                id: fileItem.id,
                name: fileItem.name || 'Untitled',
                type: isPDF ? 'pdf' : isExcel ? 'excel' : 'text',
                src: `${WEBUI_API_BASE_URL}/files/${fileItem.id}/content`,
                content: fileItem?.file?.data?.content,
                size: fileItem.size,
                item: fileItem  // 保存原始item引用，以便需要时使用
            };
            
            // 添加到已打开文件列表
            openFiles = [...openFiles, newFile];
            multiFileMode = openFiles.length > 1; // 当有多个文件时启用多文件模式
            activeFileIndex = openFiles.length - 1; // 设置新添加的文件为活动文件
        }
    }

	function handleEmptyFileViewer() {
        show = false;
    }

	onMount(() => {
		console.log(item);
		if (item?.context === 'full') {
			enableFullContent = true;
		}
	});
</script>

<!-- 修改了这里：添加了 draggable={true} 启用拖动功能 -->
<Modal bind:show size="lg" draggable={true} className="bg-gray-50 dark:bg-gray-900 rounded-2xl">
    <div class="font-primary px-6 py-5 w-full flex flex-col justify-center dark:text-gray-400">
        <div class="pb-2">
            <div class="flex items-start justify-between">
                <div>
                    <div class="font-medium text-lg dark:text-gray-100">
                        {#if multiFileMode}
                            <span>File Viewer</span>
                        {:else}
                            <a
                                href="#"
                                class="hover:underline line-clamp-1"
                                on:click|preventDefault={() => {
                                    if (!isPDF && !isExcel && item.url) {
                                        window.open(
                                            item.type === 'file' ? `${item.url}/content` : `${item.url}`,
                                            '_blank'
                                        );
                                    }
                                }}
                            >
                                {item?.name ?? 'File'}
                            </a>
                        {/if}
                    </div>
                </div>
                
                <div>
                    <button
                        on:click={() => {
                            show = false;
                        }}
                    >
                        <XMark />
                    </button>
                </div>
            </div>
            
            {#if !multiFileMode}
            <div>
                <div class="flex flex-col items-center md:flex-row gap-1 justify-between w-full">
                    <div class="flex flex-wrap text-sm gap-1 text-gray-500">
                        {#if item.size}
                            <div class="capitalize shrink-0">{formatFileSize(item.size)}</div>
                            •
                        {/if}
                        
                        {#if item?.file?.data?.content}
                            <div class="capitalize shrink-0">
                                {getLineCount(item?.file?.data?.content ?? '')} extracted lines
                            </div>
                            
                            <div class="flex items-center gap-1 shrink-0">
                                <Info />
                                Formatting may be inconsistent from source.
                            </div>
                        {/if}
                    </div>
                    
                    {#if edit}
                        <div>
                            <Tooltip
                                content={enableFullContent
                                    ? 'Inject the entire content as context for comprehensive processing, this is recommended for complex queries.'
                                    : 'Default to segmented retrieval for focused and relevant content extraction, this is recommended for most cases.'}
                            >
                                <div class="flex items-center gap-1.5 text-xs">
                                    {#if enableFullContent}
                                        Using Entire Document
                                    {:else}
                                        Using Focused Retrieval
                                    {/if}
                                    <Switch
                                        bind:state={enableFullContent}
                                        on:change={(e) => {
                                            item.context = e.detail ? 'full' : undefined;
                                        }}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    {/if}
                </div>
            </div>
            {/if}
        </div>
        
        <div class="max-h-[75vh] overflow-auto">
            {#if multiFileMode}
                <!-- 使用多文件查看器 -->
                <MultiFileViewer 
                    bind:files={openFiles}
                    bind:activeFileIndex={activeFileIndex}
                    on:empty={handleEmptyFileViewer}
                />
            {:else if isPDF}
                <iframe
                    title={item?.name}
                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}
                    class="w-full h-[70vh] border-0 rounded-lg mt-4"
                />
            {:else if isExcel}
                <ExcelViewer 
                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}
                    fileName={item.name}
                />
            {:else}
                <div class="max-h-96 overflow-scroll scrollbar-hidden text-xs whitespace-pre-wrap">
                    {item?.file?.data?.content ?? 'No content'}
                </div>
            {/if}
        </div>
    </div>
</Modal>

<style>
    :global(.scrollbar-hidden::-webkit-scrollbar) {
        display: none;
    }
    
    :global(.scrollbar-hidden) {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
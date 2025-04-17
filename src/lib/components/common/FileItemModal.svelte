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
	// 移除 MultiFileViewer 导入

	export let item;
	export let show = false;
	export let edit = false;

	let enableFullContent = false;
    let excelData = null;
    let isExcelModified = false;

	$: isPDF =
		item?.meta?.content_type === 'application/pdf' ||
		(item?.name && item?.name.toLowerCase().endsWith('.pdf'));
		
	$: isExcel =
		item?.meta?.content_type?.includes('spreadsheet') ||
		item?.meta?.content_type?.includes('excel') ||
		item?.meta?.content_type?.includes('ms-excel') ||
		(item?.name && /\.(xlsx|xls|xlsm|xlsb|xltx|xlt|csv|ods)$/i.test(item?.name));

    function handleExcelDataChange(event) {
        excelData = event.detail.data;
        isExcelModified = true;
    }

    // 保留Excel文件保存功能
    async function saveExcelFile() {
        if (!excelData || !item || !item.id) return;

        try {
            const isSaving = true;
            
            const formData = new FormData();
            
            
            // 假设excelData是一个Blob对象或可以转换为Blob的数据

            // 假设excelData是一个Blob对象或可以转换为Blob的数据
            const excelBlob = new Blob([excelData], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            });
            
            formData.append('file', excelBlob, item.name);
            
            // 发送到服务器的API端点
            const response = await fetch(`${WEBUI_API_BASE_URL}/files/${item.id}/update`, {
                method: 'PUT',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to save file');
            }
            
            // 保存成功
            isExcelModified = false;
            alert('Excel file saved successfully!');
        } catch (error) {
            console.error('Error saving Excel file:', error);
            alert('Failed to save Excel file: ' + error.message);
        }
    }

	onMount(() => {
		console.log(item);
		if (item?.context === 'full') {
			enableFullContent = true;
		}
	});
</script>

<!-- 保持Modal可拖动功能 -->
<Modal bind:show size="lg" draggable={true} className="bg-gray-50 dark:bg-gray-900 rounded-2xl">
    <div class="font-primary px-6 py-5 w-full flex flex-col justify-center dark:text-gray-400">
        <div class="pb-2">
            <div class="flex items-start justify-between">
                <div>
                    <div class="font-medium text-lg dark:text-gray-100">
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
                    </div>
                </div>
                
                <!-- 保留Excel保存按钮 -->
                {#if isExcel && isExcelModified}
                <div class="ml-auto mr-2">
                    <button 
                        class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        on:click={saveExcelFile}
                    >
                        Save
                    </button>
                </div>
                {/if}
                
                <div>
                    <button
                        on:click={() => {
                            // 保留未保存提示
                            if (isExcel && isExcelModified) {
                                if (confirm('You have unsaved changes. Do you want to leave without saving?')) {
                                    show = false;
                                }
                            } else {
                                show = false;
                            }
                        }}
                    >
                        <XMark />
                    </button>
                </div>
            </div>
            
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
        </div>
        
        <div class="max-h-[75vh] overflow-auto">
            {#if isPDF}
                <iframe
                    title={item?.name}
                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}
                    class="w-full h-[70vh] border-0 rounded-lg mt-4"
                />
            {:else if isExcel}
                <!-- 保留Excel编辑功能 -->
                <ExcelViewer 
                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}
                    fileName={item.name}
                    editable={true}
                    on:datachange={handleExcelDataChange}
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
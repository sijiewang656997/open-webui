<!-- MultiFileViewer.svelte -->
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import ExcelViewer from './ExcelViewer.svelte';
    import XMark from '../icons/XMark.svelte';
    
    const dispatch = createEventDispatcher();
    
    // 接收文件列表参数
    export let files = [];
    // 当前活动文件的索引
    export let activeFileIndex = 0;
    
    // 切换到指定的文件
    function switchToFile(index) {
        activeFileIndex = index;
    }
    
    // 关闭指定的文件标签
    function closeFile(index, event) {
        event.stopPropagation(); // 防止触发切换标签
        
        // 移除指定文件
        files = files.filter((_, i) => i !== index);
        
        // 如果关闭的是当前文件，调整当前索引
        if (index === activeFileIndex) {
            // 如果关闭的是最后一个文件，选择新的最后一个
            if (index >= files.length) {
                activeFileIndex = Math.max(0, files.length - 1);
            }
            // 其他情况保持相同的索引位置(其后的文件会自动前移)
        } 
        // 如果关闭的文件索引小于当前活动索引，需要调整活动索引
        else if (index < activeFileIndex) {
            activeFileIndex--;
        }
        
        // 如果没有文件了，通知父组件可以关闭查看器
        if (files.length === 0) {
            dispatch('empty');
        }
    }
    
    // 计算当前活动文件
    $: activeFile = files[activeFileIndex] || null;
</script>

<!-- 文件标签栏 -->
<div class="border-b dark:border-gray-700 mb-4">
    <div class="flex overflow-x-auto">
        {#each files as file, index}
            <div 
                class="flex items-center px-3 py-2 cursor-pointer {index === activeFileIndex 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-500 dark:border-blue-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'}"
                on:click={() => switchToFile(index)}
            >
                <span class="text-sm truncate max-w-[160px] {index === activeFileIndex 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-400'}">
                    {file.name || `File ${index + 1}`}
                </span>
                
                <!-- 关闭按钮 -->
                <button 
                    class="ml-2 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                    on:click={(e) => closeFile(index, e)}
                    aria-label="Close file tab"
                >
                    <div class="w-3.5 h-3.5">
                        <XMark />
                    </div>
                </button>
            </div>
        {/each}
    </div>
</div>

<!-- 活动文件的内容 -->
{#if activeFile}
    <div class="h-full">
        {#if activeFile.type === 'excel'}
            <ExcelViewer 
                src={activeFile.src}
                fileName={activeFile.name}
            />
        {:else if activeFile.type === 'pdf'}
            <iframe
                title={activeFile.name}
                src={activeFile.src}
                class="w-full h-[65vh] border-0 rounded-lg"
            />
        {:else}
            <div class="max-h-96 overflow-scroll scrollbar-hidden text-xs whitespace-pre-wrap p-4 border dark:border-gray-700 rounded-lg">
                {activeFile.content || 'No content available'}
            </div>
        {/if}
    </div>
{:else}
    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
        No files to display
    </div>
{/if}

<style>
    /* 确保滚动条样式与主应用一致 */
    :global(.scrollbar-hidden::-webkit-scrollbar) {
        display: none;
    }
    
    :global(.scrollbar-hidden) {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
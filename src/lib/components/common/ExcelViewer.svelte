<!-- ExcelViewer.svelte -->
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as XLSX from 'xlsx';
    
    export let src = "";
    export let fileName = "";
    export let editable = false; // 是否可编辑
    
    let sheets = [];
    let activeSheetIndex = 0;
    let isLoading = true;
    let error = null;
    let editingCell = null; // 当前正在编辑的单元格
    let editValue = ""; // 编辑框的值
    let originalWorkbook = null; // 保存原始workbook以便导出
    let isModified = false; // 新增：跟踪是否有修改
    let isSaving = false; // 新增：保存状态
    let saveSuccess = false; // 新增：保存成功状态
    
    const dispatch = createEventDispatcher(); // 用于触发数据变更事件
    
    function getColumnHeader(index) {
        let result = '';
        do {
            result = String.fromCharCode(65 + (index % 26)) + result;
            index = Math.floor(index / 26) - 1;
        } while (index >= 0);
        return result;
    }

    function getAuthToken() {
        return localStorage.getItem('token') || '';
    }
    
    async function loadExcel() {
        try {
            isLoading = true;
            
            const token = getAuthToken();
            
            const response = await fetch(src, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'zh-CN'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch Excel file: ${response.status} ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            
            originalWorkbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
            
            sheets = originalWorkbook.SheetNames.map(name => {
                const sheet = originalWorkbook.Sheets[name];
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                
                // 确保所有行具有相同的列数
                const maxCols = data.reduce((max, row) => Math.max(max, row?.length || 0), 0);
                const normalizedData = data.map(row => {
                    if (!row) return Array(maxCols).fill('');
                    return [...row, ...Array(maxCols - row.length).fill('')];
                });
                
                const MAX_ROWS = 1000;
                const rowCount = normalizedData.length;
                const truncated = rowCount > MAX_ROWS;
                
                return {
                    name,
                    data: normalizedData.slice(0, MAX_ROWS),
                    rowCount,
                    truncated
                };
            });
            
        } catch (err) {
            console.error("Error loading Excel:", err);
            error = err.message;
        } finally {
            isLoading = false;
        }
    }
    
    function switchSheet(index) {
        // 取消当前编辑
        editingCell = null;
        activeSheetIndex = index;
    }
    
    // 开始编辑单元格
    function startEditing(rowIndex, colIndex, currentValue) {
        if (!editable) return;
        editingCell = { rowIndex, colIndex };
        editValue = currentValue !== undefined && currentValue !== null ? currentValue.toString() : '';
    }
    
    // 保存单元格编辑
    function saveEdit() {
        if (!editingCell) return;
        
        const { rowIndex, colIndex } = editingCell;
        
        // 更新数据
        if (!sheets[activeSheetIndex].data[rowIndex]) {
            sheets[activeSheetIndex].data[rowIndex] = [];
        }
        
        // 转换类型：尝试转换为数字，如果不是数字则保持为字符串
        let valueToSave = editValue;
        if (!isNaN(editValue) && editValue.trim() !== '') {
            const num = Number(editValue);
            if (String(num) === editValue.trim()) {
                valueToSave = num;
            }
        }
        
        // 检查值是否真的改变了，如果改变了才标记修改状态
        if (sheets[activeSheetIndex].data[rowIndex][colIndex] !== valueToSave) {
            sheets[activeSheetIndex].data[rowIndex][colIndex] = valueToSave;
            isModified = true; // 标记为已修改
            
            // 更新Excel工作表数据
            updateWorkbookData();
        }
        
        // 退出编辑模式
        editingCell = null;
    }
    
    // 取消编辑
    function cancelEdit() {
        editingCell = null;
    }
    
    // 处理键盘事件
    function handleKeydown(event) {
        if (event.key === 'Enter') {
            saveEdit();
            event.preventDefault();
        } else if (event.key === 'Escape') {
            cancelEdit();
            event.preventDefault();
        }
    }
    
    // 更新工作簿数据
    function updateWorkbookData() {
        if (!originalWorkbook) return;
        
        // 每个sheet的数据
        sheets.forEach((sheet, sheetIndex) => {
            // 创建一个新的工作表
            const ws = XLSX.utils.aoa_to_sheet(sheet.data);
            // 更新原始工作簿中的工作表
            originalWorkbook.Sheets[sheet.name] = ws;
        });
    }
    
    // 触发数据变更事件
    function dispatchChanges() {
        if (!originalWorkbook) return;
        
        // 转换为二进制
        const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });
        
        // 触发事件，传递二进制数据
        dispatch('datachange', {
            data: wbout
        });
    }
    
    // 下载Excel文件
    function downloadExcel() {
        if (!originalWorkbook) return;
        
        updateWorkbookData();
        
        // 生成二进制数据
        const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });
        
        // 创建Blob对象
        const blob = new Blob([new Uint8Array(wbout)], { type: 'application/octet-stream' });
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'download.xlsx';
        
        // 模拟点击下载
        document.body.appendChild(a);
        a.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
    
    // 新增: 保存修改
    async function saveChanges() {
        if (!originalWorkbook || !isModified) return;
        
        try {
            isSaving = true;
            
            // 更新工作簿数据确保最新
            updateWorkbookData();
            
            // 生成二进制数据
            const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });
            
            // 触发事件将数据送到父组件处理
            dispatch('datachange', {
                data: wbout
            });
            
            // 如果有保存的逻辑，显示成功
            saveSuccess = true;
            isModified = false;
            
            // 3秒后隐藏成功信息
            setTimeout(() => {
                saveSuccess = false;
            }, 3000);
        } catch (err) {
            console.error("Error saving Excel:", err);
            error = err.message;
        } finally {
            isSaving = false;
        }
    }
    
    // 处理单元格点击
    function handleCellClick(rowIndex, colIndex, currentValue) {
        if (editable) {
            startEditing(rowIndex, colIndex, currentValue);
        }
    }
    
    $: activeSheet = sheets[activeSheetIndex] || null;
    
    onMount(() => {
        loadExcel();
    });
</script>

{#if isLoading}
    <div class="flex justify-center items-center h-[50vh]">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading Excel data...</span>
    </div>
{:else if error}
    <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
        <p class="font-medium">Error loading Excel file</p>
        <p class="text-sm mt-1">{error}</p>
        <div class="mt-4">
            <a 
                href={src} 
                download={fileName}
                class="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center"
            >
                Download file instead
            </a>
        </div>
    </div>
{:else if sheets.length}
    <!-- 工具栏 -->
    <div class="mb-3 flex justify-between items-center">
        <div>
            {#if sheets.length > 1}
                <span class="text-sm text-gray-600 dark:text-gray-400">Sheets: {sheets.length}</span>
            {/if}
        </div>
        <div class="flex gap-2">
            <!-- 新增: 保存按钮 -->
            {#if editable && isModified}
                <button 
                    class="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 
                           disabled:bg-gray-400 disabled:cursor-not-allowed"
                    on:click={saveChanges}
                    disabled={isSaving}
                >
                    {#if isSaving}
                        <span class="inline-block animate-pulse">Saving...</span>
                    {:else}
                        Save
                    {/if}
                </button>
            {/if}
            
            {#if editable}
                <button 
                    class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    on:click={downloadExcel}
                >
                    Download
                </button>
            {:else}
                <a 
                    href={src} 
                    download={fileName}
                    class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 inline-block"
                >
                    Download
                </a>
            {/if}
        </div>
    </div>

    <!-- 保存成功提示 -->
    {#if saveSuccess}
        <div class="mb-3 px-3 py-2 bg-green-100 dark:bg-green-900/20 border border-green-300 
                  dark:border-green-800 rounded-md text-green-700 dark:text-green-400 text-sm">
            Changes saved successfully!
        </div>
    {/if}

    <!-- Sheet Tabs -->
    {#if sheets.length > 1}
        <div class="mb-2 border-b dark:border-gray-700 overflow-x-auto">
            <div class="flex">
                {#each sheets as sheet, index}
                    <button 
                        class="px-3 py-2 text-sm whitespace-nowrap {index === activeSheetIndex 
                            ? 'border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}"
                        on:click={() => switchSheet(index)}
                    >
                        {sheet.name || `Sheet ${index + 1}`}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
    
    <!-- Excel Table -->
    {#if activeSheet?.data?.length}
        <div class="overflow-x-auto border dark:border-gray-700 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th class="w-10 px-2 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                            #
                        </th>
                        {#each Array(activeSheet.data[0]?.length || 0) as _, colIndex}
                            <th class="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {getColumnHeader(colIndex)}
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {#each activeSheet.data as row, rowIndex}
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 text-center">
                                {rowIndex + 1}
                            </td>
                            {#each Array(activeSheet.data[0]?.length || 0) as _, colIndex}
                                <td 
                                    class="px-4 py-2 whitespace-nowrap text-xs overflow-hidden text-ellipsis max-w-[200px] {editable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}"
                                    on:click={() => handleCellClick(rowIndex, colIndex, row[colIndex])}
                                >
                                    {#if editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex}
                                        <input 
                                            type="text"
                                            class="w-full p-1 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                                            bind:value={editValue}
                                            on:keydown={handleKeydown}
                                            on:blur={saveEdit}
                                            autofocus
                                        />
                                    {:else}
                                        {row[colIndex] !== undefined && row[colIndex] !== null ? row[colIndex] : ''}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        
        {#if activeSheet.truncated}
            <div class="mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                Showing first 1000 rows. Full file contains {activeSheet.rowCount} rows.
                <span class="ml-1 text-yellow-500">Note: Only visible rows can be edited.</span>
            </div>
        {/if}

        {#if editable}
            <div class="mt-2 text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded">
                <p><strong>Editing mode enabled:</strong> Click on any cell to edit its content.</p>
                {#if isModified}
                    <p class="mt-1 text-yellow-600 dark:text-yellow-400">
                        <strong>Unsaved changes:</strong> Remember to save your changes.
                    </p>
                {/if}
            </div>
        {/if}
    {:else}
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No data available in this sheet
        </div>
    {/if}
{:else}
    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
        No data available in this Excel file
    </div>
{/if}

<style>
    table td {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    input {
        font-size: inherit;
    }
</style>
<!-- ExcelViewer.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as XLSX from 'xlsx';
    
    export let src = "";
    export let fileName = "";
    
    let sheets = [];
    let activeSheetIndex = 0;
    let isLoading = true;
    let error = null;
    
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
            
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
            
            sheets = workbook.SheetNames.map(name => {
                const sheet = workbook.Sheets[name];
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                
                const MAX_ROWS = 1000;
                const rowCount = data.length;
                const truncated = rowCount > MAX_ROWS;
                
                return {
                    name,
                    data: data.slice(0, MAX_ROWS),
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
        activeSheetIndex = index;
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
                                <td class="px-4 py-2 whitespace-nowrap text-xs overflow-hidden text-ellipsis max-w-[200px]">
                                    {row[colIndex] !== undefined && row[colIndex] !== null ? row[colIndex] : ''}
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
<script lang="ts">
  import { getContext } from 'svelte';
  const i18n: any = getContext('i18n');
  export let data: any[] = [];
  export let columns: string[] = [];
  export let className = "";
  export let maxPreviewRows = 12;
  export let showFullPreview = false;
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  let showAllRows = false;
  let showModal = false;

  // Format number with commas for thousand separators
  function formatNumber(value: any) {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US', { 
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2 
      }).format(value);
    }
    return value;
  }

  // Determine if a value is numeric for alignment purposes
  function isNumeric(value: any) {
    return typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)));
  }
  
  // Convert data to CSV and trigger download
  function downloadCSV() {
    if (!data || !columns || data.length === 0) return;
    
    // Create CSV header row
    const csvHeader = columns.map(col => `"${col}"`).join(',');
    
    // Create CSV data rows
    const csvRows = data.map(row => {
      return columns.map(col => {
        const value = row[col];
        // Properly format and escape values
        if (value === null || value === undefined) return '""';
        if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
        return `"${value}"`;
      }).join(',');
    });
    
    // Combine header and rows
    const csvString = [csvHeader, ...csvRows].join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'table-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Toggle modal for full view
  function toggleFullPreview() {
    if (showFullPreview) {
      dispatch('fullPreview');
    } else {
      showModal = true;
    }
  }
  
  // Calculate if we need to show truncated view
  $: needsTruncation = data.length > maxPreviewRows;
  $: displayData = needsTruncation && !showAllRows ? data.slice(0, maxPreviewRows) : data;
</script>

<!-- Full preview modal -->
{#if showModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50" on:click|self={() => showModal = false}>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
      <!-- Modal header -->
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">{$i18n.t('Full Data Table')}</h3>
        <button 
          class="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          title={$i18n.t('View full table')}
          on:click={() => showModal = false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- Modal body with scrollable table -->
      <div class="overflow-auto p-1 flex-grow">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              {#each columns as column}
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider {isNumeric(data[0]?.[column]) ? 'text-right' : 'text-left'}"
                >
                  {column}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {#each data as row, rowIndex}
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 {rowIndex % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-800/20'}">
                {#each columns as column}
                  <td class="px-4 py-3 {isNumeric(row[column]) ? 'text-right' : 'text-left'} whitespace-nowrap">
                    {isNumeric(row[column]) ? formatNumber(row[column]) : row[column]}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <!-- Modal footer with download button -->
      <div class="p-4 border-t dark:border-gray-700 flex justify-end">
        <button 
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 text-sm"
          on:click={downloadCSV}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {$i18n.t('Download CSV')}
        </button>
      </div>
    </div>
  </div>
{/if}

<div class={`inline-block rounded-lg border border-gray-200 dark:border-gray-700 ${className}`} style="text-align: left;">
  <div class="relative">
    <!-- Table toolbar -->
    <div class="absolute top-2 right-2 flex gap-2 z-10">
      <button 
        class="p-1.5 bg-gray-100 dark:bg-gray-700 rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title={$i18n.t('View full table')}
        on:click={toggleFullPreview}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </button>
      
      <button 
        class="p-1.5 bg-gray-100 dark:bg-gray-700 rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title={$i18n.t('Download as CSV')}
        on:click={downloadCSV}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </button>
    </div>
    
    <table class="divide-y divide-gray-200 dark:divide-gray-700 text-sm table-auto">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr>
          {#each columns as column}
            <th 
              scope="col" 
              class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider {isNumeric(data[0]?.[column]) ? 'text-right' : 'text-left'}"
            >
              {column}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
        {#each displayData as row, rowIndex}
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 {rowIndex % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-800/20'}">
            {#each columns as column}
              <td class="px-4 py-3 {isNumeric(row[column]) ? 'text-right' : 'text-left'} whitespace-nowrap">
                {isNumeric(row[column]) ? formatNumber(row[column]) : row[column]}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    
    {#if needsTruncation && !showAllRows}
      <div class="w-full flex justify-center py-2 border-t border-gray-200 dark:border-gray-700">
        <button 
          class="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          on:click={() => showAllRows = true}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {$i18n.t('Show all {{count}} rows', { count: data.length })}
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Add subtle box shadow for depth */
  div {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  /* Ensure table takes appropriate width based on content */
  table {
    border-collapse: separate;
    border-spacing: 0;
    margin-left: 0;
    text-align: left;
    width: auto;
    max-width: fit-content;
  }
  
  /* Column styling for content-based width */
  th, td {
    white-space: nowrap;
    width: auto;
  }
  
  /* Add transition for smoother hover effects */
  tr {
    transition: background-color 0.15s ease-in-out;
  }
  
  /* Modal animation */
  .fixed {
    animation: fadeIn 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style> 
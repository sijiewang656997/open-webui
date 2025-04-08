<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { updateCell, downloadExcel, addSheet } from '$lib/utils/excelUtils';
    
    const dispatch = createEventDispatcher();
    
    // Main data passed to the component
    export let excelData;
    // Optional: styling options
    export let showToolbar = true;
    export let editable = true;
    export let tableBordered = true;
    export let tableStriped = true;
    export let tableCompact = false;
    
    // Track internal state
    let activeSheet = excelData?.activeSheet || '';
    let availableSheets = [];
    let editingCell = null;
    let editValue = '';
    let hasChanges = false;
    
    // Update available sheets when excelData changes
    $: if (excelData?.sheets) {
      availableSheets = Object.keys(excelData.sheets);
      if (!activeSheet && availableSheets.length > 0) {
        activeSheet = availableSheets[0];
      }
    }
    
    // Get the active sheet data
    $: sheetData = excelData?.sheets?.[activeSheet] || [];
    
    // Helper to get column letters (A, B, C, ... AA, AB, etc.)
    function getColumnLabel(index) {
      let label = '';
      while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
      }
      return label;
    }
    
    // Calculate table dimensions
    $: columnCount = Math.max(
      0, 
      ...sheetData.map(row => row ? row.length : 0)
    );
    
    // For managing scrolling and large datasets
    $: visibleColumns = Array.from({ length: columnCount }, (_, i) => i);
    
    function handleCellClick(rowIndex, colIndex) {
      if (!editable) return;
      
      editingCell = { rowIndex, colIndex };
      editValue = sheetData[rowIndex]?.[colIndex]?.toString() || '';
    }
    
    function handleCellEdit(e) {
      if (e.key === 'Enter' || e.type === 'blur') {
        applyEdit();
      } else if (e.key === 'Escape') {
        cancelEdit();
      }
    }
    
    function applyEdit() {
      if (!editingCell) return;
      
      const { rowIndex, colIndex } = editingCell;
      const currentValue = sheetData[rowIndex]?.[colIndex];
      
      // Only update if value changed
      if (editValue !== currentValue) {
        const updatedData = updateCell(excelData, activeSheet, rowIndex, colIndex, editValue);
        excelData = updatedData;
        hasChanges = true;
        
        // Notify parent component of the change
        dispatch('change', { excelData });
      }
      
      editingCell = null;
    }
    
    function cancelEdit() {
      editingCell = null;
    }
    
    function handleSheetChange(e) {
      activeSheet = e.target.value;
      dispatch('sheetChange', { sheet: activeSheet });
    }
    
    function handleAddSheet() {
      const baseName = 'Sheet';
      let sheetNumber = availableSheets.length + 1;
      let newSheetName = `${baseName}${sheetNumber}`;
      
      // Ensure sheet name is unique
      while (availableSheets.includes(newSheetName)) {
        sheetNumber++;
        newSheetName = `${baseName}${sheetNumber}`;
      }
      
      excelData = addSheet(excelData, newSheetName);
      activeSheet = newSheetName;
      availableSheets = Object.keys(excelData.sheets);
      hasChanges = true;
      dispatch('change', { excelData });
    }
    
    function handleExport() {
      const filename = 'exported_spreadsheet.xlsx';
      downloadExcel(excelData, filename);
    }
    
    // Move to next cell when Enter is pressed in edit mode
    function handleKeyNavigation(e) {
      if (!editingCell) return;
      
      const { rowIndex, colIndex } = editingCell;
      
      if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
        e.preventDefault();
        applyEdit();
        
        // Move to next cell (right or down)
        if (colIndex < columnCount - 1) {
          handleCellClick(rowIndex, colIndex + 1);
        } else if (rowIndex < sheetData.length - 1) {
          handleCellClick(rowIndex + 1, 0);
        }
      } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        applyEdit();
        
        // Move up
        if (rowIndex > 0) {
          handleCellClick(rowIndex - 1, colIndex);
        }
      }
    }
  </script>
  
  <div class="excel-editor">
    {#if showToolbar}
      <div class="editor-toolbar">
        <div class="sheet-selector">
          <label for="sheet-select">Sheet:</label>
          <select 
            id="sheet-select" 
            value={activeSheet} 
            on:change={handleSheetChange}>
            {#each availableSheets as sheet}
              <option value={sheet}>{sheet}</option>
            {/each}
          </select>
          
          <button class="action-button" on:click={handleAddSheet}>
            <span>+</span> Add Sheet
          </button>
        </div>
        
        <div class="toolbar-actions">
          <button class="action-button export" on:click={handleExport}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>
    {/if}
    
    <div class="table-container">
      <table 
        class:bordered={tableBordered} 
        class:striped={tableStriped}
        class:compact={tableCompact}>
        <thead>
          <tr>
            <th class="row-header"></th>
            {#each visibleColumns as colIndex}
              <th>{getColumnLabel(colIndex)}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each sheetData as row, rowIndex}
            <tr>
              <td class="row-header">{rowIndex + 1}</td>
              {#each visibleColumns as colIndex}
                <td 
                  class="data-cell"
                  class:active={editingCell?.rowIndex === rowIndex && editingCell?.colIndex === colIndex}
                  on:click={() => handleCellClick(rowIndex, colIndex)}
                >
                  {#if editingCell?.rowIndex === rowIndex && editingCell?.colIndex === colIndex}
                    <input 
                      type="text" 
                      bind:value={editValue}
                      on:keydown={handleKeyNavigation}
                      on:keyup={handleCellEdit}
                      on:blur={handleCellEdit}
                      autofocus 
                    />
                  {:else}
                    {row?.[colIndex] ?? ''}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
          <!-- Empty row for adding new data -->
          {#if editable}
            <tr>
              <td class="row-header">{sheetData.length + 1}</td>
              {#each visibleColumns as colIndex}
                <td 
                  class="data-cell"
                  on:click={() => handleCellClick(sheetData.length, colIndex)}
                ></td>
              {/each}
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
  
  <style>
    .excel-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .editor-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #f1f5f9;
      border-bottom: 1px solid #cbd5e1;
    }
    
    .sheet-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .sheet-selector select {
      padding: 0.25rem 0.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.25rem;
      background-color: white;
    }
    
    .action-button {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .action-button:hover {
      background-color: #e2e8f0;
    }
    
    .action-button.export {
      background-color: #2563eb;
      color: white;
      border-color: #1d4ed8;
    }
    
    .action-button.export:hover {
      background-color: #1d4ed8;
    }
    
    .table-container {
      flex: 1;
      overflow: auto;
      position: relative;
      border: 1px solid #cbd5e1;
      border-top: none;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    
    .bordered td, .bordered th {
      border: 1px solid #cbd5e1;
    }
    
    .striped tbody tr:nth-child(odd) {
      background-color: #f8fafc;
    }
    
    .compact td, .compact th {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 0.5rem;
      text-align: left;
    }
    
    th {
      position: sticky;
      top: 0;
      background-color: #f1f5f9;
      z-index: 10;
      font-weight: 600;
    }
    
    .row-header {
      position: sticky;
      left: 0;
      background-color: #f1f5f9;
      z-index: 5;
      text-align: center;
      font-weight: 600;
      min-width: 2.5rem;
    }
    
    .data-cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 6rem;
    }
    
    .data-cell.active {
      padding: 0;
    }
    
    .data-cell input {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      border: 2px solid #2563eb;
      outline: none;
    }
  </style>
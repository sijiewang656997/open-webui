<script lang="ts">
  import { onMount, getContext,afterUpdate } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { user, showSidebar } from '$lib/stores';;
  import Spinner from '$lib/components/common/Spinner.svelte';
  import { getApiConfig } from '$lib/utils/api-config';
  import { WEBUI_BASE_URL } from '$lib/constants';
  
  const i18n = getContext('i18n');
  
  let isLoading = true;
  let files = [];
  let selectedFile = null;
  let tablesData = {};
  let tableLoadingStates = {};
  let expandedTables = {};
  let searchQuery = '';
  let selectedTable = null;
  let editedData = {};
  let selectedColumns = [];
  let hasUnsavedChanges = false;
  let isEditMode = false;

  let contentContainer: HTMLElement;
  let isToggling = false;
  
  // API configuration with fallback defaults
  let base_url = WEBUI_BASE_URL;
  let user_token = 'token_59b8b43a_aiurmmm0';
  let language_local = 'en';
  
  // Create a confirmation modal state
  let showConfirmDialog = false;
  let confirmDialogProps = {
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  };
  
  onMount(async () => {
    try {
      console.log('Loading API configuration...');
      
      // Get API configuration
      const apiConfig = await getApiConfig(i18n);
      
      // Update local variables with config values
      base_url = base_url;
      user_token = apiConfig.userToken || user_token;
      language_local = apiConfig.languageLocal || language_local;
      
      console.log('Excel-to-SQL page - API Config loaded:', { base_url, language_local, user_token });
    } catch (error) {
      console.error('Error loading API configuration:', error);
      // Keep using default values
    }
    
    await loadFiles();
  });
  
  // Function to make requests to the API with the required headers
  async function makeRequest(endpoint, options = {}) {
    // Updated to use the proxy endpoint for all requests
    const url = `${base_url}/proxy/api${endpoint}`;
    
    console.log(`[ExcelToSQL Debug] Sending request to ${url}`);
    
    const defaultOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`,
        'Accept-Language': language_local
      }
    };
    
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...(options.headers || {})
      }
    };
    
    console.log(`[ExcelToSQL Debug] Full request options:`, mergedOptions);
    
    try {
      const response = await fetch(url, mergedOptions);
      
      console.log(`[ExcelToSQL Debug] Response status: ${response.status}`);
      
      // Try to parse the response as JSON
      try {
        const data = await response.json();
        console.log(`[ExcelToSQL Debug] RAW API RESPONSE:`, JSON.stringify(data, null, 2));
        
        if (!response.ok) {
          console.error(`[ExcelToSQL Debug] Request failed with status ${response.status}:`, data);
          throw new Error(data.error || data.detail || 'An error occurred');
        }
        
        return data;
      } catch (jsonError) {
        console.error('[ExcelToSQL Debug] Failed to parse JSON response:', jsonError);
        const textResponse = await response.text();
        console.error('[ExcelToSQL Debug] Text response:', textResponse);
        throw new Error('Invalid JSON response from server');
      }
    } catch (error) {
      console.error('[ExcelToSQL Debug] API request failed:', error);
      throw error;
    }
  }
  
  // Load files from backend
  async function loadFiles() {
    console.log('[ExcelToSQL Debug] Loading files list');
    isLoading = true;
    
    try {
      // Use correct endpoint for external API through the proxy
      const response = await makeRequest('/excel_to_sql/list_files', {
        method: 'GET'
      });
      
      console.log('[ExcelToSQL Debug] Files loaded:', response);
      
      if (response.success && response.files) {
        console.log('[ExcelToSQL Debug] LIST_FILES SUCCESS - File count:', response.files.length);
        console.log('[ExcelToSQL Debug] LIST_FILES DETAILED:', JSON.stringify(response.files, null, 2));
        
        const formattedFiles = response.files.map((file, index) => ({
          key: index.toString(),
          id: file.id || index.toString(),
          name: file.original_filename,
          savedPath: file.saved_path,
          dateUploaded: new Date(file.created_at || Date.now()).toLocaleString(),
          tableCount: (file.tables || []).length,
          tables: file.tables || [],
          mappingId: file.mapping_id
        }));
        
        console.log('[ExcelToSQL Debug] Formatted files:', formattedFiles);
        files = formattedFiles;
      } else {
        console.error('[ExcelToSQL Debug] Failed to load files:', response);
        toast.error('Failed to load Excel files');
      }
    } catch (error) {
      console.error('[ExcelToSQL Debug] Error loading Excel files:', error);
      toast.error(`Error loading Excel files: ${error.message}`);
      files = [];
    } finally {
      isLoading = false;
    }
  }
  
  // Function to show confirmation dialog
  function showConfirmation(title, message, onConfirm) {
    confirmDialogProps = {
      title,
      message,
      onConfirm: () => {
        onConfirm();
        showConfirmDialog = false;
      },
      onCancel: () => {
        showConfirmDialog = false;
      }
    };
    showConfirmDialog = true;
  }
  
  // Delete a file
  async function handleDeleteFile(file) {
    console.log('[ExcelToSQL Debug] Attempting to delete file:', file);
    showConfirmation(
      "Delete File",
      `Are you sure you want to delete the file "${file.name}"?`,
      async () => {
        isLoading = true;
        try {
          console.log('[ExcelToSQL Debug] Confirmed file deletion for:', file.savedPath);
          // Update endpoint path to use proper structure
          const response = await makeRequest('/excel_to_sql/delete_file', {
            method: 'POST',
            body: JSON.stringify({ file_path: file.savedPath })
          });
  
          console.log('[ExcelToSQL Debug] Delete file response:', response);
          
          if (response.success) {
            toast.success(`File "${file.name}" deleted successfully`);
            console.log('[ExcelToSQL Debug] File deleted successfully, reloading file list');
            await loadFiles();
            if (selectedFile && selectedFile.id === file.id) {
              console.log('[ExcelToSQL Debug] Clearing selected file as it was deleted');
              selectedFile = null;
            }
          } else {
            console.error('[ExcelToSQL Debug] Failed to delete file:', response.error);
            toast.error(`Failed to delete file: ${response.error}`);
          }
        } catch (error) {
          console.error('[ExcelToSQL Debug] Error deleting file:', error);
          toast.error(`Error deleting file: ${error.message}`);
        } finally {
          isLoading = false;
        }
      }
    );
  }
  
  // View file details
  function handleViewDetails(file) {
    console.log('[ExcelToSQL Debug] Viewing file details:', file);
    selectedFile = file;
    tablesData = {};
    tableLoadingStates = {};
    expandedTables = {};
    selectedTable = null;
    editedData = {};
    isEditMode = false;
    hasUnsavedChanges = false;
  }
  
  // Load a single table
  async function loadSingleTable(table) {
    console.log('[ExcelToSQL Debug] Loading table data for:', table.table_name);
    selectedTable = table;
    tableLoadingStates[table.table_name] = true;
    
    // Reset edit state when loading a new table
    isEditMode = false;
    hasUnsavedChanges = false;
    
    try {
      // Updated endpoint path to use proper structure
      const response = await makeRequest('/excel_to_sql/get_table_data', {
        method: 'POST',
        body: JSON.stringify({ 
          table_name: table.table_name
        })
      });

      console.log('[ExcelToSQL Debug] Table data response:', response);

      if (response.success) {
        console.log('[ExcelToSQL Debug] Table data loaded successfully:', response.data);
        tablesData[table.table_name] = response.data || {};
        
        // Initialize edited data with original data
        const initialEditedData = {};
        if (response.data && response.data.rows) {
          response.data.rows.forEach((row, idx) => {
            initialEditedData[idx] = { ...row };
          });
        }
        editedData = initialEditedData;
        
        // Initialize selected columns with all columns
        if (response.data && response.data.columns) {
          selectedColumns = response.data.columns.map(col => col.name);
          console.log('[ExcelToSQL Debug] Selected columns:', selectedColumns);
        }
      } else {
        console.error('[ExcelToSQL Debug] Failed to load table data:', response.error);
        toast.error(`Failed to load table data: ${response.error}`);
      }
    } catch (error) {
      console.error('[ExcelToSQL Debug] Error loading table data:', error);
      toast.error(`Error loading table data: ${error.message}`);
    } finally {
      tableLoadingStates[table.table_name] = false;
    }
  }
  
  // Handle cell editing
  function handleCellEdit(rowIndex, columnName, value) {
    console.log(`[ExcelToSQL Debug] Editing cell: row ${rowIndex}, column ${columnName}, value:`, value);
    editedData[rowIndex] = {
      ...editedData[rowIndex],
      [columnName]: value
    };
    hasUnsavedChanges = true;
  }
  
  // Save edited data
  async function saveEditedData() {
    if (!selectedTable) return;
    
    console.log('[ExcelToSQL Debug] Saving edited data for table:', selectedTable.table_name);
    
    try {
      isLoading = true;
      
      // Convert edited data back to rows format
      const rows = Object.values(editedData);
      console.log('[ExcelToSQL Debug] Rows to save:', rows);
      console.log('[ExcelToSQL Debug] Columns to include:', selectedColumns);
      
      const requestPayload = {
        table_name: selectedTable.table_name,
        rows: rows,
        columns: selectedColumns
      };
      
      console.log('[ExcelToSQL Debug] Save request payload:', requestPayload);
      
      const response = await makeRequest('/excel_to_sql/update_table_data', {
        method: 'POST',
        body: JSON.stringify(requestPayload)
      });
      
      console.log('[ExcelToSQL Debug] Save response:', response);
      
      if (response.success) {
        console.log('[ExcelToSQL Debug] Data saved successfully');
        toast.success(`Successfully saved changes to ${selectedTable.table_name}`);
        hasUnsavedChanges = false;
        
        // Refresh the table data
        console.log('[ExcelToSQL Debug] Reloading table data after save');
        await loadSingleTable(selectedTable);
        
        // Exit edit mode after saving
        isEditMode = false;
      } else {
        console.error('[ExcelToSQL Debug] Failed to save changes:', response.error);
        toast.error(`Failed to save changes: ${response.error}`);
      }
    } catch (error) {
      console.error('[ExcelToSQL Debug] Error saving data:', error);
      toast.error(`Error saving data: ${error.message}`);
    } finally {
      isLoading = false;
    }
  }
  
  // Delete a table
  async function handleDeleteTable(table) {
    console.log('[ExcelToSQL Debug] Requesting to delete table:', table.table_name);
    showConfirmation(
      "Delete Table",
      `Are you sure you want to delete the table "${table.table_name}"?`,
      async () => {
        try {
          console.log('[ExcelToSQL Debug] Confirmed table deletion for:', table.table_name);
          const response = await makeRequest('/excel_to_sql/delete_table', {
            method: 'POST',
            body: JSON.stringify({ table_name: table.table_name })
          });

          console.log('[ExcelToSQL Debug] Delete table response:', response);

          if (response.success) {
            console.log('[ExcelToSQL Debug] Table deleted successfully');
            toast.success(`Table "${table.table_name}" deleted successfully`);
            
            // Update the selected file's tables
            if (selectedFile) {
              const updatedTables = selectedFile.tables.filter(t => t.table_name !== table.table_name);
              console.log('[ExcelToSQL Debug] Updated tables list after deletion:', updatedTables);
              
              selectedFile = {
                ...selectedFile,
                tables: updatedTables,
                tableCount: updatedTables.length
              };
              
              // Clear the selected table if it was deleted
              if (selectedTable && selectedTable.table_name === table.table_name) {
                console.log('[ExcelToSQL Debug] Clearing selected table as it was deleted');
                selectedTable = null;
              }
            }
          } else {
            console.error('[ExcelToSQL Debug] Failed to delete table:', response.error);
            toast.error(`Failed to delete table: ${response.error}`);
          }
        } catch (error) {
          console.error('[ExcelToSQL Debug] Error deleting table:', error);
          toast.error(`Error deleting table: ${error.message}`);
        }
      }
    );
  }
  
  // Filter files by search query
  $: filteredFiles = files.filter(file => 
    searchQuery === '' || file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Simple function to get icon for file type
  function getFileIcon(fileName) {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return 'SpreadsheetDocument';
    } else if (fileName.endsWith('.csv')) {
      return 'TextDocument';
    }
    return 'Page';
  }

  onMount(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  afterUpdate(() => {
    if (contentContainer) {
      contentContainer.getBoundingClientRect();
    }
  });

  // 统一的resize处理
  function handleResize() {
    if (contentContainer) {
      contentContainer.getBoundingClientRect();
    }
  }

  function toggleSidebar() {
    if (isToggling) return;
    isToggling = true;

    // 触发初始布局计算
    if (contentContainer) {
      contentContainer.getBoundingClientRect();
    }

    requestAnimationFrame(() => {
      showSidebar.update(value => !value);

      // 添加动画完成后的处理
      setTimeout(() => {
        isToggling = false;
        if (contentContainer) {
          contentContainer.getBoundingClientRect();
        }
      }, 300);
    });
  }
</script>

<div class="excel-management-container" bind:this={contentContainer}>
  <div class="management-header bg-gray-900 dark:bg-gray-950 text-white">
    <div class="header-title-row">
      <div class="header-left">
        <button
          class="cursor-pointer p-[7px] flex rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          on:click={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <div class="m-auto self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </div>
        </button>
        <a href="/" class="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </a>
        <h2 class="header-title">{$i18n.t('Excel To SQL Management')}</h2>
      </div>
      <button 
        class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        on:click={loadFiles}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <span>{$i18n.t('Refresh')}</span>
      </button>
    </div>
  </div>

  <div class="management-content bg-white dark:bg-gray-900">
    {#if !selectedFile}
      <!-- Show file list when no file is selected -->
      <div class="file-list-container">
        <div class="file-list-header dark:border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{$i18n.t('Excel Data Sources')}</h3>
            <div class="search-box">
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search files..." 
                  bind:value={searchQuery}
                  class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {#if isLoading}
          <div class="flex justify-center items-center h-64">
            <Spinner className="w-10 h-10" />
            <span class="ml-4 text-gray-600 dark:text-gray-400">{$i18n.t('Loading files...')}</span>
          </div>
        {:else if files.length === 0}
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 mx-auto mb-4 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">{$i18n.t('No Excel files have been uploaded yet')}</h3>
            <p class="text-gray-500 dark:text-gray-400">{$i18n.t('Upload Excel files using the Excel File Handler to see them here')}</p>
          </div>
        {:else if filteredFiles.length === 0}
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-16 h-16 mx-auto mb-4 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">{$i18n.t('No files match your search')}</h3>
            <p class="text-gray-500 dark:text-gray-400">{$i18n.t('Try a different search term or clear your search')}</p>
          </div>
        {:else}
          <div class="file-list">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="py-3 px-4 text-left"></th>
                  <th class="py-3 px-4 text-left">{$i18n.t('Filename')}</th>
                  <th class="py-3 px-4 text-left">{$i18n.t('Upload Date')}</th>
                  <th class="py-3 px-4 text-left">{$i18n.t('Tables')}</th>
                  <th class="py-3 px-4 text-left">{$i18n.t('Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredFiles as file (file.id)}
                  <tr class="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td class="py-3 px-4">
                      {#if getFileIcon(file.name) === 'SpreadsheetDocument'}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-green-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      {:else if getFileIcon(file.name) === 'TextDocument'}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-blue-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-gray-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      {/if}
                    </td>
                    <td class="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">{file.name}</td>
                    <td class="py-3 px-4">{file.dateUploaded}</td>
                    <td class="py-3 px-4">{file.tableCount}</td>
                    <td class="py-3 px-4">
                      <div class="flex space-x-2">
                        <button 
                          class="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                          on:click={() => handleViewDetails(file)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                        <button 
                          class="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                          on:click={() => handleDeleteFile(file)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
      </div>
    {:else}
      <!-- Show file details or selected table -->
      <div class="file-detail-container">
        <div class="file-detail-header dark:border-gray-700">
          <button 
            class="back-to-files-button"
            on:click={() => {
              if (selectedTable) {
                selectedTable = null;
                isEditMode = false;
              } else {
                selectedFile = null;
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {selectedTable ? 'Back to Tables' : 'Back to Files'}
          </button>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{selectedFile.name}</h3>
        </div>
        
        {#if !selectedTable}
          <!-- Show file info and table list -->
          <div class="file-info-section dark:border-gray-700">
            <div class="file-info-item">
              <span class="info-label">{$i18n.t('Filename')}:</span>
              <span class="info-value">{selectedFile.name}</span>
            </div>
            <div class="file-info-item">
              <span class="info-label">{$i18n.t('Upload Date')}:</span>
              <span class="info-value">{selectedFile.dateUploaded}</span>
            </div>
            <div class="file-info-item">
              <span class="info-label">{$i18n.t('Tables')}:</span>
              <span class="info-value">{selectedFile.tableCount}</span>
            </div>
            <div class="file-info-item">
              <span class="info-label">{$i18n.t('Path')}:</span>
              <span class="info-value text-xs opacity-80">{selectedFile.savedPath}</span>
            </div>
          </div>
          
          <div class="tables-section">
            <div class="flex justify-between items-center mb-4">
              <h4 class="section-title">{$i18n.t('Excel Sheets')}</h4>
              {#if selectedFile.tables && selectedFile.tables.length > 0}
                <span class="text-gray-500 dark:text-gray-400 text-sm">
                  {selectedFile.tables.length} {selectedFile.tables.length === 1 ? 'sheet' : 'sheets'} available
                </span>
              {/if}
            </div>
            
            {#if !selectedFile.tables || selectedFile.tables.length === 0}
              <div class="no-content-message">
                <p class="text-gray-500 dark:text-gray-400">{$i18n.t('No tables found in this file')}</p>
              </div>
            {:else}
              <div class="tables-list">
                <div class="space-y-2">
                  {#each selectedFile.tables as table}
                    <div 
                      class="table-item {selectedTable && selectedTable.table_name === table.table_name ? 'selected' : ''}"
                      on:click={() => loadSingleTable(table)}
                    >
                      <div class="flex justify-between items-center w-full">
                        <span class="text-md text-gray-800 dark:text-gray-200">{table.table_name}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{table.row_count} rows</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <!-- Show selected table with edit capabilities -->
          <div class="table-view-section">
            <div class="mb-4">
              <div class="flex justify-between items-center">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{$i18n.t('Table')}: {selectedTable.table_name}</h4>
                <div class="flex space-x-2">
                  <button
                    class="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition flex items-center space-x-2"
                    on:click={() => handleDeleteTable(selectedTable)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <span>Delete Table</span>
                  </button>
                </div>
              </div>
            </div>
            
            {#if tableLoadingStates[selectedTable.table_name]}
              <div class="flex justify-center items-center h-64">
                <Spinner className="w-10 h-10" />
                <span class="ml-4 text-gray-600 dark:text-gray-400">{$i18n.t('Loading table data...')}</span>
              </div>
            {:else}
              {#if tablesData[selectedTable.table_name]}
                <div class="table-controls mb-4">
                  <div class="flex space-x-4">
                    <button
                      class="px-3 py-2 rounded-lg {isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition flex items-center space-x-2"
                      on:click={isEditMode ? saveEditedData : () => isEditMode = true}
                      disabled={isEditMode && !hasUnsavedChanges}
                    >
                      {#if isEditMode}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        <span>Save Changes</span>
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <span>Edit Data</span>
                      {/if}
                    </button>
                    
                    {#if isEditMode}
                      <button
                        class="px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition flex items-center space-x-2"
                        on:click={() => {
                          showConfirmation(
                            "Cancel Editing",
                            "Are you sure you want to cancel? All unsaved changes will be lost.",
                            () => {
                              isEditMode = false;
                              loadSingleTable(selectedTable); // Reload the original data
                            }
                          );
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    {/if}
                  </div>
                </div>
                
                <div class="excel-table-wrapper">
                  <table class="excel-table w-full">
                    <thead>
                      <tr>
                        {#each tablesData[selectedTable.table_name].columns.filter(col => selectedColumns.includes(col.name)) as col}
                          <th>
                            <div class="flex justify-between items-center">
                              <span>{col.name}</span>
                            </div>
                          </th>
                        {/each}
                      </tr>
                    </thead>
                    <tbody>
                      {#each tablesData[selectedTable.table_name].rows as row, rowIndex}
                        <tr>
                          {#each tablesData[selectedTable.table_name].columns.filter(col => selectedColumns.includes(col.name)) as col}
                            <td 
                              contenteditable={isEditMode}
                              on:blur={(e) => {
                                if (isEditMode) {
                                  handleCellEdit(rowIndex, col.name, e.target.innerText);
                                }
                              }}
                            >
                              {row[col.name] !== undefined ? row[col.name] : ''}
                            </td>
                          {/each}
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- Confirmation Dialog -->
{#if showConfirmDialog}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{confirmDialogProps.title}</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-6">{confirmDialogProps.message}</p>
      <div class="flex justify-end space-x-4">
        <button 
          class="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          on:click={confirmDialogProps.onCancel}
        >
          No
        </button>
        <button 
          class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          on:click={confirmDialogProps.onConfirm}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .excel-management-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .management-header {
    padding: 12px 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .header-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .back-button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    margin-right: 15px;
    font-size: 14px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .back-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateX(-2px);
  }

  .header-title {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.3px;
  }

  .management-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    position: relative;
    padding: 0;
    border-radius: 8px;
    margin: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .file-list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .file-list-header {
    padding: 20px 24px;
    border-bottom: 1px solid #edf2f7;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
  }

  .file-detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .file-detail-header {
    padding: 18px 24px;
    border-bottom: 1px solid #edf2f7;
    display: flex;
    align-items: center;
  }

  .back-to-files-button {
    background: transparent;
    border: none;
    color: #3182ce;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .back-to-files-button:hover {
    background-color: rgba(49, 130, 206, 0.1);
    transform: translateX(-2px);
  }

  .file-info-section {
    padding: 16px 24px;
    border-bottom: 1px solid #edf2f7;
    display: flex;
    flex-wrap: wrap;
  }

  .file-info-item {
    margin-right: 32px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }

  .info-label {
    font-weight: 600;
    margin-right: 8px;
    color: #64748b;
    font-size: 14px;
  }

  .info-value {
    color: #334155;
    font-size: 14px;
  }

  .tables-section {
    padding: 16px 24px;
    flex: 1;
    overflow: auto;
  }

  .section-title {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 600;
    color: #334155;
    font-size: 16px;
  }

  .table-view-section {
    padding: 16px 24px;
    width: 100%;
    overflow: hidden;
  }

  .table-item {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .table-item:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }

  .table-item.selected {
    background-color: #ebf8ff;
    border-color: #90cdf4;
  }

  .excel-table-wrapper {
    overflow-y: auto;
    overflow-x: auto;
    max-height: 70vh;
    max-width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    width: 100%;
  }

  .excel-table {
    border-collapse: collapse;
    min-width: 100%;
    table-layout: auto;
    white-space: nowrap;
  }

  .excel-table th {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 12px;
    text-align: left;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 1;
    min-width: 120px;
  }

  .excel-table td {
    border: 1px solid #e2e8f0;
    padding: 8px 12px;
    vertical-align: top;
  }

  .excel-table tbody tr:hover {
    background-color: #f7fafc;
  }

  .excel-table td[contenteditable="true"] {
    background-color: #ffffff;
    cursor: text;
  }

  .excel-table td[contenteditable="true"]:focus {
    outline: 2px solid #3182ce;
    outline-offset: -2px;
  }

  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    .excel-table th {
      background-color: #2d3748;
      border-color: #4a5568;
    }

    .excel-table td {
      border-color: #4a5568;
    }

    .excel-table tbody tr:hover {
      background-color: #2d3748;
    }

    .excel-table td[contenteditable="true"] {
      background-color: #1a202c;
    }

    .excel-table td[contenteditable="true"]:focus {
      outline-color: #4299e1;
    }
  }
  @media (max-width: 768px) {
    .management-header {
      padding: 10px 16px;
    }
    
    .header-left {
      gap: 10px;
    }
    
    .management-content {
      margin: 12px;
    }
  }
</style> 
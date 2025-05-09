<script lang="ts">
    import { createEventDispatcher, getContext, onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    
    import Modal from './Modal.svelte';
    import Spinner from './Spinner.svelte';
    import { getApiConfig } from '$lib/utils/api-config';
    import { WEBUI_BASE_URL } from '$lib/constants';
    import type { File } from '$lib/types';

    const i18n = getContext('i18n');
    
    export let show = false;
    
    const dispatch = createEventDispatcher();
    
    let isUploading = false;
    let files: File[] = [];
    let clearPreviousData = false;
    let deleteExcelOnClear = false;
    let dragOver = false;
    
    // API configuration with fallback defaults
    let base_url = WEBUI_BASE_URL;
    let user_token = 'token_59b8b43a_aiurmmm0';
    let language_local = 'en';
    
    // Load API configuration once component is mounted
    onMount(async () => {
        console.log('ExcelToSqlUploadModal - Component mounted');
        console.log('i18n object available:', !!i18n);
        
        try {
            // Get API configuration
            console.log('Getting API config...');
            const apiConfig = await getApiConfig(i18n);
            
            // Update local variables with config values
            
            user_token = apiConfig.userToken || user_token;
            language_local = apiConfig.languageLocal || language_local;
            
            console.log('API Config loaded:', { base_url, language_local, user_token });
        } catch (error) {
            console.error('Error loading API configuration:', error);
            // Keep using default values set above
        }
    });
    
    const uploadFiles = async () => {
        if (files.length === 0) {
            toast.error($i18n.t('Please select at least one file to upload'));
            return;
        }
        
        isUploading = true;
        
        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('clear_previous_data', clearPreviousData.toString());
                formData.append('delete_excel_on_clear', deleteExcelOnClear.toString());
                
                // Log the request details
                console.log('Uploading file:', file.name);
                console.log('Clear previous data:', clearPreviousData);
                console.log('Delete Excel on clear:', deleteExcelOnClear);
                
                // Set language based on locale
                if (localStorage.getItem('locale') === "zh-CN") {
                    language_local = 'zh_cn';
                } else {
                    language_local = 'en';
                }
                base_url = WEBUI_BASE_URL;
                console.log('Using API config:', { base_url, language_local, user_token });
                
                
                // Make the API call using WEBUI_BASE_URL
                const response = await fetch(`${base_url}/proxy/api/excel_to_sql`, {
                    method: 'POST',
                    headers: {
                        'Accept-Language': language_local,
                        'Authorization': `Bearer ${user_token}`
                    },
                    body: formData
                });
                
                const responseData = await response.json();
                console.log('Upload response:', responseData);
                
                if (response.ok) {
                    toast.success($i18n.t('File uploaded successfully: {{filename}}', { filename: file.name }));
                } else {
                    toast.error($i18n.t('Failed to upload file: {{filename}}', { filename: file.name }));
                    console.error('Upload error:', responseData);
                }
            }
            
            // Reset form after successful upload
            files = [];
            dispatch('change');
            show = false;
        } catch (error: any) {
            console.error('Error uploading files:', error);
            toast.error($i18n.t('Error uploading files: {{message}}', { message: error.message || 'Unknown error' }));
        } finally {
            isUploading = false;
        }
    };
    
    const handleFileSelection = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            const selectedFiles = Array.from(target.files);
            files = selectedFiles;
            
            // Log selected files for debugging
            console.log('Selected files:', files.map(f => ({ name: f.name, type: f.type, size: f.size })));
        }
    };

    // Handle drag and drop events
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragOver = true;
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragOver = false;
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragOver = false;
        
        if (e.dataTransfer?.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            // Filter to only include allowed file types
            const validFiles = droppedFiles.filter(file => {
                const fileExt = file.name.split('.').pop()?.toLowerCase();
                return fileExt && ['xlsx', 'xls', 'csv', 'zip'].includes(fileExt);
            });
            
            if (validFiles.length !== droppedFiles.length) {
                toast.error($i18n.t('Some files were skipped. Only Excel, CSV, or ZIP files are allowed.'));
            }
            
            if (validFiles.length > 0) {
                files = validFiles;
                console.log('Dropped files:', files.map(f => ({ name: f.name, type: f.type, size: f.size })));
            }
        }
    };
    
    const allowedFileTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/zip'
    ];
    
    const fileTypeNames = {
        'application/vnd.ms-excel': 'Excel (.xls)',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel (.xlsx)',
        'text/csv': 'CSV (.csv)',
        'application/zip': 'ZIP (.zip)'
    };
</script>

<Modal
    bind:show
    title={$i18n.t('Excel To SQL Upload')}
    classNames="w-full max-w-2xl"
    on:close={() => {
        if (!isUploading) {
            files = [];
        }
    }}
>
    <div class="p-4">
        {#if isUploading}
            <div class="flex flex-col items-center justify-center py-10">
                <Spinner size="lg" />
                <div class="mt-4 text-gray-700 dark:text-gray-300">{$i18n.t('Uploading files, please wait...')}</div>
            </div>
        {:else}
            <div class="space-y-6">
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {$i18n.t('Upload Excel, CSV, or ZIP Files')}
                    </label>
                    <div 
                        class="flex justify-center px-6 pt-5 pb-6 border-2 {dragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'} border-dashed rounded-md"
                        on:dragover={handleDragOver}
                        on:dragenter={handleDragOver}
                        on:dragleave={handleDragLeave}
                        on:drop={handleDrop}
                    >
                        <div class="space-y-1 text-center">
                            <svg 
                                class="mx-auto h-12 w-12 text-gray-400" 
                                stroke="currentColor" 
                                fill="none" 
                                viewBox="0 0 48 48" 
                                aria-hidden="true"
                            >
                                <path 
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                    stroke-width="2" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <div class="flex text-sm text-gray-600 dark:text-gray-400">
                                <label 
                                    for="file-upload" 
                                    class="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:focus-within:ring-offset-gray-900"
                                >
                                    <span>{$i18n.t('Select files')}</span>
                                    <input 
                                        id="file-upload" 
                                        name="file-upload" 
                                        type="file" 
                                        class="sr-only" 
                                        multiple 
                                        accept=".xlsx,.xls,.csv,.zip"
                                        on:change={handleFileSelection}
                                    />
                                </label>
                                <p class="pl-1">{$i18n.t('or drag and drop')}</p>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {$i18n.t('Excel, CSV, or ZIP files up to 50MB')}
                            </p>
                        </div>
                    </div>
                </div>
                
                {#if files.length > 0}
                    <div class="space-y-2">
                        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">{$i18n.t('Selected Files')}:</h3>
                        <ul class="mt-1 space-y-1 max-h-40 overflow-auto border border-gray-200 dark:border-gray-700 rounded-md p-2">
                            {#each files as file}
                                <li class="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                                    <div class="flex items-center">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            class="h-5 w-5 mr-2 text-green-500" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                stroke-linecap="round" 
                                                stroke-linejoin="round" 
                                                stroke-width="2" 
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                            />
                                        </svg>
                                        <span>{file.name}</span>
                                    </div>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">
                                        {Math.round(file.size / 1024)} KB
                                    </span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
                
                <div class="flex justify-end space-x-3">
                    <button 
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-offset-gray-900 transition-colors"
                        on:click={() => {
                            files = [];
                            show = false;
                        }}
                    >
                        {$i18n.t('Cancel')}
                    </button>
                    
                    <button 
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={files.length === 0 || isUploading}
                        on:click={uploadFiles}
                    >
                        {$i18n.t('Upload')}
                    </button>
                </div>
            </div>
        {/if}
    </div>
</Modal> 
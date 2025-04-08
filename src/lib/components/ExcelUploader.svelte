<script>
    import { createEventDispatcher } from 'svelte';
    import { readExcelFile } from '$lib/utils/excelUtils';
  
    const dispatch = createEventDispatcher();
    
    export let accept = ".xlsx,.xls,.csv";
    export let buttonText = "Upload Excel File";
    export let maxSizeMB = 10;
    
    let dragOver = false;
    let fileInput;
    let error = null;
    let loading = false;
    
    async function handleFile(file) {
      if (!file) return;
      
      // Check file size (convert MB to bytes)
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        error = `File size exceeds maximum limit of ${maxSizeMB}MB`;
        return;
      }
      
      // Check file type
      const validTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!validTypes.includes(fileExtension)) {
        error = `Invalid file type. Please upload ${accept} files`;
        return;
      }
      
      try {
        loading = true;
        error = null;
        const excelData = await readExcelFile(file);
        dispatch('fileLoaded', { file, data: excelData });
      } catch (err) {
        console.error('Error reading Excel file:', err);
        error = `Error reading file: ${err.message}`;
      } finally {
        loading = false;
      }
    }
    
    function handleDrop(event) {
      event.preventDefault();
      dragOver = false;
      
      const file = event.dataTransfer?.files?.[0];
      handleFile(file);
    }
    
    function handleDragOver(event) {
      event.preventDefault();
      dragOver = true;
    }
    
    function handleDragLeave() {
      dragOver = false;
    }
  </script>
  
  <div 
    class="excel-uploader" 
    class:drag-over={dragOver}
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}>
    
    <input 
      type="file" 
      bind:this={fileInput}
      accept={accept}
      on:change={(e) => handleFile(e.target.files[0])}
      style="display: none;" />
    
    <div class="uploader-content">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M8 13h8"/>
          <path d="M8 17h8"/>
          <path d="M8 9h2"/>
        </svg>
      </div>
      
      <div class="text">
        <p>Drag & drop an Excel file here or</p>
        <button 
          type="button" 
          class="upload-button"
          disabled={loading}
          on:click={() => fileInput.click()}>
          {loading ? 'Processing...' : buttonText}
        </button>
        <p class="hint">Supported formats: {accept}</p>
      </div>
      
      {#if error}
        <p class="error">{error}</p>
      {/if}
    </div>
  </div>
  
  <style>
    .excel-uploader {
      border: 2px dashed #cbd5e1;
      border-radius: 0.5rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      cursor: pointer;
      background-color: rgba(203, 213, 225, 0.1);
    }
    
    .drag-over {
      border-color: #60a5fa;
      background-color: rgba(96, 165, 250, 0.1);
    }
    
    .uploader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .icon {
      color: #64748b;
      margin-bottom: 0.5rem;
    }
    
    .text {
      text-align: center;
    }
    
    .hint {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
    
    .upload-button {
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .upload-button:hover {
      background-color: #1d4ed8;
    }
    
    .upload-button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    
    .error {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  </style>
<script>
    import { createEventDispatcher } from 'svelte';
    import { performSync, getSyncState } from '$lib/apis/syncService';
    
    const dispatch = createEventDispatcher();
    let isSyncing = false;
    let syncStatus = {
      inProgress: false,
      success: false,
      error: null,
      progress: 0
    };
  
    async function handleSync() {
      try {
        syncStatus.inProgress = true;
        syncStatus.progress = 10;
        isSyncing = true;
        
        const response = await performSync();
        
        syncStatus.progress = 100;
        syncStatus.success = true;
        dispatch('synccomplete', response);
        
      } catch (error) {
        syncStatus.error = error.message;
        dispatch('syncerror', { error });
      } finally {
        syncStatus.inProgress = false;
        isSyncing = false;
      }
    }
  </script>
  
  <div class="sync-container">
    <button 
      class="sync-button" 
      on:click={handleSync} 
      disabled={isSyncing}
    >
      {#if isSyncing}
        <span class="spinner"></span>同步中...
      {:else}
        <svg viewBox="0 0 24 24" class="sync-icon">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46c.78-1.23 1.24-2.69 1.24-4.26 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
        同步数据
      {/if}
    </button>
    
    {#if syncStatus.inProgress}
      <div class="progress-bar">
        <div class="progress-fill" style="width: {syncStatus.progress}%"></div>
      </div>
    {/if}
    
    {#if syncStatus.error}
      <div class="error-message">
        {syncStatus.error}
      </div>
    {/if}
  </div>
  
  <style>
    .sync-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .sync-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .sync-button:hover:not([disabled]) {
      background-color: #2563eb;
    }
    
    .sync-button:disabled {
      background-color: #93c5fd;
      cursor: not-allowed;
    }
    
    .sync-icon {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
    
    .spinner {
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 2px solid #fff;
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .progress-bar {
      width: 100%;
      height: 4px;
      background-color: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background-color: #3b82f6;
      transition: width 0.3s ease;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 14px;
      margin-top: 4px;
    }
  </style>
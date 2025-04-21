<script>
    import SyncButton from '$lib/components/SyncButton.svelte';
    
    let syncResult = null;
    let syncError = null;
    
    function handleSyncComplete(event) {
      syncResult = event.detail;
      syncError = null;
    }
    
    function handleSyncError(event) {
      syncError = event.detail.error;
      syncResult = null;
    }
  </script>
  
  <!-- 现有设置内容 -->
  
  <section class="sync-section">
    <h2>数据同步</h2>
    <p>将您的数据同步到后端系统</p>
    
    <SyncButton 
      on:synccomplete={handleSyncComplete}
      on:syncerror={handleSyncError}
    />
    
    {#if syncResult}
      <div class="result-panel">
        <h3>同步成功</h3>
        <div class="result-summary">
          {#if syncResult.summary}
            <p><strong>表格总数:</strong> {syncResult.summary.tableCount || 0}</p>
            <p><strong>行数:</strong> {syncResult.summary.rowCount || 0}</p>
            <p><strong>同步时间:</strong> {new Date(syncResult.timestamp).toLocaleString()}</p>
          {/if}
        </div>
      </div>
    {/if}
    
    {#if syncError}
      <div class="error-panel">
        <h3>同步失败</h3>
        <p>{syncError}</p>
      </div>
    {/if}
  </section>
  
  <style>
    /* 添加以下样式到现有样式中 */
    
    .sync-section {
      margin-top: 30px;
      padding: 20px;
      border-radius: 8px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
    }
    
    .result-panel {
      margin-top: 20px;
      padding: 15px;
      background-color: #ecfdf5;
      border-radius: 6px;
      border-left: 4px solid #10b981;
    }
    
    .error-panel {
      margin-top: 20px;
      padding: 15px;
      background-color: #fef2f2;
      border-radius: 6px;
      border-left: 4px solid #ef4444;
    }
    
    h3 {
      color: #111827;
      margin-top: 0;
      font-size: 1.1rem;
    }
    
    .result-summary {
      font-size: 0.9rem;
    }
  </style>
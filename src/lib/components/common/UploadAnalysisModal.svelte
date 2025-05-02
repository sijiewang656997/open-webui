<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { getContext, onMount, createEventDispatcher } from 'svelte';
  import Spinner from '../common/Spinner.svelte';
  import { userAPIKey } from '$lib/stores';
  
  const i18n = getContext('i18n');
  const dispatch = createEventDispatcher();
  
  export let show: boolean = false;
  
  let isLoading = false;
  let hasUploadError = false;
  let progress = 0;
  let statusMessage = '';
  let selectedFiles = [];
  let uploadInProgress = false;
  let uploadCompleted = false;
  let recentTaskAvailable = false;
  let recentTaskId = null;
  let checkingStatus = false;
  
  // Configuration
  const language_local = 'zh-cn';
  const user_token = "token_59b8b43a_aiurmmm0_test_upload";
  const apiBaseUrl = "http://192.168.200.118:5002";
  
  // Key to store task in localStorage
  const taskStorageKey = `upload_analysis_task_${user_token}_${language_local}`;
  
  async function fetchApiKey() {
    try {
      console.log("Fetching API key from server...");
      const response = await fetch('/api/v1/auths/api_key', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Successfully retrieved API key:", data.api_key);
        // Update the store
        userAPIKey.set(data.api_key);
        return data.api_key;
      } else {
        const errorData = await response.json();
        console.error("Failed to get API key. Status:", response.status, "Error:", errorData);
        toast.error("Failed to get API key. Please check permissions.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
      toast.error("Error fetching API key. Please try again.");
      return null;
    }
  }
  
  onMount(async () => {
    console.log('Current user API key:', $userAPIKey);
    
    // If API key is null, fetch it first
    if ($userAPIKey === null) {
      console.log("API key is null, attempting to fetch it");
      const apiKey = await fetchApiKey();
      
      // Just log the API key and don't proceed with other operations
      console.log("API key after fetch attempt:", apiKey);
      return;
    }
    
    // Only proceed with normal operations if API key is not null
    if (show && $userAPIKey !== null) {
      checkForRecentTasks();
    }
  });
  
  $: if (show && $userAPIKey !== null) {
    checkForRecentTasks();
  }
  
  async function checkForRecentTasks() {
    try {
      console.log("⏳ Starting check for recent tasks...");
      checkingStatus = true;
      // Check localStorage for recent task
      const storedTask = localStorage.getItem(taskStorageKey);
      
      if (storedTask) {
        console.log("📋 Found stored task in localStorage:", storedTask);
        const taskData = JSON.parse(storedTask);
        
        // Only check tasks that are not too old (less than 7 days)
        const taskTime = new Date(taskData.timestamp).getTime();
        const now = new Date().getTime();
        const daysDiff = (now - taskTime) / (1000 * 60 * 60 * 24);
        console.log(`📅 Task age: ${daysDiff.toFixed(2)} days`);
        
        if (daysDiff <= 7 && taskData.taskId) {
          // Check status of the task
          recentTaskId = taskData.taskId;
          console.log(`🔍 Checking status for task ID: ${recentTaskId}`);
          updateProgressBar(20, $i18n.t('Checking recent analysis status...'));
          
          const statusResponse = await fetch(`${apiBaseUrl}/api/upload/status?task_id=${recentTaskId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user_token}`
            }
          });
          
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log("📊 Task status data:", statusData);
            
            if (statusData.status?.status === "completed") {
              console.log("✅ Found completed analysis task");
              recentTaskAvailable = true;
              uploadCompleted = true;
              updateProgressBar(100, $i18n.t('Previous analysis is available!'));
              toast.success($i18n.t('Previous analysis is available!'));
            } else if (statusData.status?.status === "processing") {
              // Task still in progress
              console.log("⚙️ Found processing analysis task");
              recentTaskAvailable = false;
              uploadInProgress = true;
              updateProgressBar(
                statusData.status?.progress || 50, 
                $i18n.t('Analysis from previous upload is still processing...')
              );
              // Start polling for this task
              pollUploadStatus(recentTaskId);
            } else if (statusData.status?.status === "error") {
              // Clear failed task
              console.log("❌ Found failed analysis task - clearing from storage");
              localStorage.removeItem(taskStorageKey);
              recentTaskId = null;
              recentTaskAvailable = false;
            }
          } else {
            // If status check fails, assume task is invalid
            console.log("⚠️ Status check failed - clearing task from storage");
            localStorage.removeItem(taskStorageKey);
            recentTaskId = null;
            recentTaskAvailable = false;
          }
        } else {
          // Task is too old, clear it
          console.log("🕒 Task is too old or invalid - clearing from storage");
          localStorage.removeItem(taskStorageKey);
          recentTaskId = null;
          recentTaskAvailable = false;
        }
      } else {
        console.log("📭 No stored tasks found");
      }
    } catch (error) {
      console.error("❌ Error checking recent tasks:", error);
      recentTaskAvailable = false;
    } finally {
      console.log("✓ Finished checking for recent tasks");
      checkingStatus = false;
    }
  }
  
  function resetState() {
    isLoading = false;
    hasUploadError = false;
    progress = 0;
    statusMessage = '';
    selectedFiles = [];
    uploadInProgress = false;
    uploadCompleted = false;
    recentTaskAvailable = false;
    recentTaskId = null;
  }
  
  function updateProgressBar(newProgress, message, isError = false) {
    progress = newProgress;
    statusMessage = message;
    if (isError) {
      hasUploadError = true;
    }
  }
  
  function viewRecentAnalysis() {
    // Redirect to analysis page with the task ID
    window.location.href = `/analysis?task_id=${recentTaskId}`;
  }
  
  // Add function to cancel a task
  async function cancelPreviousTask(taskId) {
    try {
      console.log(`🚫 Attempting to cancel previous task: ${taskId}`);
      updateProgressBar(10, $i18n.t('Cancelling previous upload...'));
      
      const response = await fetch(`${apiBaseUrl}/api/upload/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language_local,
          'Authorization': `Bearer ${user_token}`
        },
        body: JSON.stringify({
          task_id: taskId,
          cancel_all: false
        })
      });
      
      console.log(`📡 Cancel API response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("📄 Cancel API response data:", data);
        if (data.success) {
          toast.success($i18n.t('Previous task cancelled successfully'));
          console.log("✅ Previous task cancelled successfully");
          return true;
        } else {
          console.error("❌ Failed to cancel task:", data);
          return false;
        }
      } else {
        console.error("❌ Error response from cancel API:", response.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Error cancelling previous task:", error);
      return false;
    }
  }
  
  async function handleFileUpload() {
    console.log("📂 Starting file upload process");
    resetState();
    
    // Check for existing tasks
    let existingTaskId = null;
    let needsToCancel = false;
    
    try {
      console.log("🔍 Checking for existing tasks...");
      const storedTask = localStorage.getItem(taskStorageKey);
      if (storedTask) {
        console.log("📋 Found stored task:", storedTask);
        const taskData = JSON.parse(storedTask);
        if (taskData.taskId) {
          existingTaskId = taskData.taskId;
          console.log(`🆔 Existing task ID: ${existingTaskId}`);
          
          // Check if task is still running
          console.log("📡 Checking if task is still running...");
          const statusResponse = await fetch(`${apiBaseUrl}/api/upload/status?task_id=${existingTaskId}`, {
            method: 'GET',
            headers: {
               
            'Accept-Language': language_local,
            'Authorization': `Bearer ${user_token}`
            }
          });
          
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log("📊 Existing task status:", statusData);
            if (statusData.status?.status === "processing") {
              console.log("⚙️ Existing task is still running - needs cancellation");
              needsToCancel = true;
            } else {
              console.log(`📊 Existing task status: ${statusData.status?.status} - no need to cancel`);
            }
          } else {
            console.log("⚠️ Failed to check existing task status - continuing anyway");
          }
        }
      } else {
        console.log("📭 No existing tasks found");
      }
    } catch (error) {
      console.error("❌ Error checking existing task:", error);
    }
    
    // Cancel previous task if needed
    if (needsToCancel && existingTaskId) {
      console.log("🚫 Cancelling previous task before starting new upload");
      const cancelled = await cancelPreviousTask(existingTaskId);
      if (!cancelled) {
        console.log("⚠️ Could not cancel previous task - proceeding anyway");
        toast.warning($i18n.t('Could not cancel previous task. Proceeding with new upload anyway.'));
      }
    }
    
    // Create file input
    console.log("📎 Creating file input for selection");
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.zip'; // Only accept zip files
    fileInput.multiple = false; // Only allow single file selection
    
    // Define change handler
    fileInput.onchange = async (e) => {
      try {
        console.log("📄 File input change detected");
        const files = e.target?.files;
        if (!files || files.length === 0) {
          console.log("❌ No files were selected");
          toast.warning($i18n.t('No files were selected.'));
          return;
        }
        
        // Check if selected file is a zip file
        const file = files[0];
        console.log(`📦 Selected file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
        if (!file.name.toLowerCase().endsWith('.zip')) {
          console.log("❌ Selected file is not a ZIP file");
          toast.error($i18n.t('Only ZIP files are allowed.'));
          return;
        }
        
        selectedFiles = [file]; // Store only the zip file
        isLoading = true;
        uploadInProgress = true;
        updateProgressBar(5, $i18n.t('Processing ZIP file for upload...'));
        
        // Create FormData for upload
        console.log("📋 Preparing FormData for upload");
        const formData = new FormData();
        
        // Add the zip file to FormData
        formData.append('file', file);
        
        // Add metadata
        formData.append('language', language_local);
        console.log(`🌐 Using language: ${language_local}`);
        
        try {
          updateProgressBar(10, $i18n.t('Starting upload...'));
          console.log("🚀 Starting upload to API...");
          
          // Send the upload request
          const uploadResponse = await fetch(`${apiBaseUrl}/api/upload`, {
            method: 'POST',
            headers: {
              'Accept-Language': language_local,
              'Authorization': `Bearer ${user_token}`
            },
            body: formData
          });
          
          console.log(`📡 Upload API response status: ${uploadResponse.status}`);
          
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({}));
            console.error("❌ Upload failed:", errorData);
            throw new Error(errorData.message || $i18n.t('Upload failed'));
          }
          
          const responseData = await uploadResponse.json();
          console.log("📄 Upload API response data:", responseData);
          
          // If there's a task_id, start polling for status
          if (responseData.task_id) {
            console.log(`🆔 Received task ID: ${responseData.task_id}`);
            // Save task ID to localStorage with timestamp
            localStorage.setItem(taskStorageKey, JSON.stringify({
              taskId: responseData.task_id,
              filename: file.name,
              timestamp: new Date().toISOString()
            }));
            console.log("💾 Saved task information to localStorage");
            
            recentTaskId = responseData.task_id;
            updateProgressBar(20, $i18n.t('Upload started. Monitoring progress...'));
            console.log("⏱️ Beginning status polling...");
            await pollUploadStatus(responseData.task_id);
          } else {
            // No task_id, assume completed
            console.log("✅ Upload completed immediately (no task ID)");
            updateProgressBar(100, $i18n.t('Upload completed successfully!'));
            uploadInProgress = false;
            uploadCompleted = true;
            toast.success($i18n.t('Upload completed successfully!'));
          }
        } catch (error) {
          console.error("❌ Error during upload:", error);
          const errorMessage = error instanceof Error ? error.message : String(error);
          updateProgressBar(100, `${$i18n.t('Upload failed')}: ${errorMessage}`, true);
          uploadInProgress = false;
          toast.error(`${$i18n.t('Upload failed')}: ${errorMessage}`);
        }
      } catch (error) {
        console.error("❌ Error in file upload handler:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        updateProgressBar(0, `${$i18n.t('Error')}: ${errorMessage}`, true);
        uploadInProgress = false;
        toast.error(`${$i18n.t('Error')}: ${errorMessage}`);
      }
    };
    
    // Trigger file selection
    console.log("📂 Opening file selector");
    fileInput.click();
  }
  
  async function pollUploadStatus(taskId) {
    console.log(`⏱️ Starting status polling for task: ${taskId}`);
    // Polling intervals in milliseconds
    const pollingIntervals = [
      ...(new Array(5).fill(2000)),    // First 5 polls: every 2 seconds
      ...(new Array(10).fill(5000)),   // Next 10 polls: every 5 seconds
      ...(new Array(15).fill(10000)),  // Next 15 polls: every 10 seconds
      ...(new Array(60).fill(30000)),  // Next 60 polls: every 30 seconds
    ];
    
    let polling = true;
    let statusPollingCounter = 0;
    let lastStatus = '';
    let lastProgress = 0;
    let errorCount = 0;
    
    while (polling && statusPollingCounter < pollingIntervals.length) {
      // Get the appropriate polling interval
      const interval = pollingIntervals[statusPollingCounter];
      console.log(`⏳ Waiting ${interval}ms before next status check (poll #${statusPollingCounter + 1})`);
      await new Promise(resolve => setTimeout(resolve, interval));
      
      statusPollingCounter++;
      
      try {
        // Check upload status
        console.log(`📡 Checking status for task: ${taskId}`);
        const statusResponse = await fetch(`${apiBaseUrl}/api/upload/status?task_id=${taskId}`, {
          method: 'GET',
          headers: {
            'Accept-Language': language_local,
            'Authorization': `Bearer ${user_token}`
          }
        });
        
        console.log(`📡 Status API response status: ${statusResponse.status}`);
        
        if (!statusResponse.ok) {
          console.error(`❌ Status check failed with status: ${statusResponse.status}`);
          throw new Error($i18n.t('Failed to check upload status'));
        }
        
        const statusData = await statusResponse.json();
        console.log("📊 Status data:", statusData);
        errorCount = 0; // Reset error count on successful response
        
        // Extract status information
        const currentStatus = statusData.status?.status || 'processing';
        const currentProgress = statusData.status?.progress || lastProgress;
        const currentMessage = statusData.status?.message || $i18n.t('Processing...');
        
        console.log(`📈 Status: ${currentStatus}, Progress: ${currentProgress}%, Message: "${currentMessage}"`);
        
        // Determine if we should update the UI
        const statusChanged = currentStatus !== lastStatus;
        const initialPolls = statusPollingCounter < 5;
        const periodicUpdate = statusPollingCounter % 3 === 0;
        const significantProgress = Math.abs(currentProgress - lastProgress) >= 5;
        
        if (statusChanged || initialPolls || periodicUpdate || significantProgress) {
          // Calculate display progress: 20% for upload start + remaining 80% based on progress
          const displayProgress = 20 + (currentProgress * 0.8);
          console.log(`🔄 Updating UI progress to ${displayProgress.toFixed(1)}%`);
          updateProgressBar(displayProgress, currentMessage);
        }
        
        // Store current status for comparison
        lastStatus = currentStatus;
        lastProgress = currentProgress;
        
        // Check for completion or error
        if (currentStatus === "completed") {
          console.log("✅ Task completed successfully");
          polling = false;
          updateProgressBar(100, $i18n.t('Upload completed successfully!'));
          uploadInProgress = false;
          uploadCompleted = true;
          recentTaskAvailable = true;
          toast.success($i18n.t('Upload completed successfully!'));
        } else if (currentStatus === "error") {
          console.log("❌ Task failed with error");
          polling = false;
          updateProgressBar(100, `${$i18n.t('Upload failed')}: ${statusData.status?.message || $i18n.t('Unknown error')}`, true);
          uploadInProgress = false;
          // Remove failed task from localStorage
          localStorage.removeItem(taskStorageKey);
          console.log("🗑️ Removed failed task from localStorage");
          recentTaskId = null;
          toast.error(`${$i18n.t('Upload failed')}: ${statusData.status?.message || $i18n.t('Unknown error')}`);
        }
      } catch (error) {
        console.error("❌ Error checking upload status:", error);
        errorCount++;
        console.log(`⚠️ Error count: ${errorCount}/3`);
        
        // Stop polling after 3 consecutive errors
        if (errorCount >= 3) {
          console.log("🛑 Stopping polling due to consecutive errors");
          polling = false;
          updateProgressBar(100, $i18n.t('Failed to check upload status after multiple attempts'), true);
          uploadInProgress = false;
          toast.error($i18n.t('Failed to check upload status after multiple attempts'));
        }
      }
    }
    
    // If we've reached the maximum polling attempts, show a message
    if (statusPollingCounter >= pollingIntervals.length && polling) {
      console.log("⏰ Maximum polling attempts reached, but task still running");
      updateProgressBar(90, $i18n.t('Upload is taking longer than expected'), false);
      toast.info($i18n.t('Upload is taking longer than expected. You can close this dialog and check status later.'));
    }
  }

  function handleClose() {
    if (uploadInProgress) {
      const shouldClose = confirm($i18n.t('Upload is in progress. Are you sure you want to close this window?'));
      if (!shouldClose) return;
    }
    
    show = false;
    
    // Only reset if upload is not in progress
    if (!uploadInProgress) {
      resetState();
    }
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" on:click|self={handleClose}>
    <div class="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-6 max-h-[80vh] overflow-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">{$i18n.t('Upload Analysis File')}</h2>
        <button 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          on:click={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      {#if checkingStatus}
        <div class="flex justify-center items-center py-8">
          <Spinner className="size-8" />
          <p class="ml-3 text-gray-600 dark:text-gray-400">{$i18n.t('Checking for recent analysis...')}</p>
        </div>
      {:else if recentTaskAvailable}
        <div class="mb-6">
          <div class="text-center p-5 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-medium mb-2">{$i18n.t('Analysis Available')}</h3>
            <p class="mb-4">{$i18n.t('A recent analysis is available for viewing.')}</p>
            <button 
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              on:click={viewRecentAnalysis}
            >
              {$i18n.t('View Analysis Results')}
            </button>
          </div>
          
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-4">{$i18n.t('Or start a new analysis:')}</p>
            <button 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              on:click={resetState}
            >
              {$i18n.t('Start New Analysis')}
            </button>
          </div>
        </div>
      {:else if !isLoading && !uploadCompleted}
        <div class="mb-6">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {$i18n.t('Upload ZIP file for analysis. Only .zip files are supported.')}
          </p>
          
          <button 
            class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            on:click={handleFileUpload}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {$i18n.t('Choose ZIP File to Upload')}
          </button>
        </div>
      {/if}
      
      {#if isLoading || uploadInProgress}
        <div class="mb-6">
          {#if selectedFiles.length > 0}
            <div class="mb-4">
              <h3 class="font-medium mb-2">{$i18n.t('Selected File')}:</h3>
              <ul class="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                {#each selectedFiles as file}
                  <li class="mb-1 last:mb-0 truncate">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          
          <div class="mb-4">
            <div class="flex justify-between mb-1 text-sm">
              <span>{statusMessage || $i18n.t('Processing...')}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                class="h-2.5 rounded-full {hasUploadError ? 'bg-red-600' : 'bg-blue-600'}" 
                style="width: {progress}%"
              ></div>
            </div>
          </div>
          
          {#if uploadInProgress}
            <div class="flex justify-center my-4">
              <Spinner className="size-6" />
            </div>
          {/if}
          
          {#if uploadCompleted && !recentTaskAvailable}
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <p>{$i18n.t('Upload completed successfully!')}</p>
            </div>
          {/if}
          
          {#if hasUploadError}
            <div class="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p>{statusMessage || $i18n.t('Upload failed')}</p>
            </div>
          {/if}
        </div>
      {/if}
      
      <div class="flex justify-end gap-3">
        {#if uploadInProgress}
          <button 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
            disabled
          >
            {$i18n.t('Uploading...')}
          </button>
        {:else if !uploadCompleted && isLoading}
          <button 
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            on:click={handleClose}
          >
            {$i18n.t('Cancel Upload')}
          </button>
        {:else if (uploadCompleted || hasUploadError) && !recentTaskAvailable}
          <button 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            on:click={resetState}
          >
            {$i18n.t('Upload New File')}
          </button>
        {/if}
        
        <button 
          class="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition"
          on:click={handleClose}
        >
          {$i18n.t('Close')}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Ensure scrollbar styling is consistent */
  :global(.dark) div::-webkit-scrollbar {
    width: 8px;
  }
  
  :global(.dark) div::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 6px;
  }
  
  :global(.dark) div::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 6px;
  }
  
  :global(.dark) div::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
  
  div::-webkit-scrollbar {
    width: 8px;
  }
  
  div::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 6px;
  }
  
  div::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 6px;
  }
  
  div::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style> 
<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { get, writable } from 'svelte/store';
	import { user, showSidebar } from '$lib/stores';
	import i18n from '$lib/i18n';
	import { Chart } from 'svelte-chartjs';
	import type { ChartData, ChartTypeRegistry } from 'chart.js';
	import {
		Chart as ChartJS,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Legend
	} from 'chart.js';
	import Table from '$lib/components/common/Table.svelte';
	import { createDocxTemplateReport, downloadDocxDocument } from '$lib/utils/docxTemplateUtils';
	import { WEBUI_BASE_URL } from '$lib/constants';
	import { getApiConfig } from '$lib/utils/api-config';

	// Initialize API config
	let apiConfig = {
		baseUrl: WEBUI_BASE_URL,
		userToken: '',
		languageLocal: 'en'
	};

	ChartJS.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale,
		Tooltip,
		Legend
	);

	interface Message {
		role: string;
		content: string;
		metadata?: any;
		results?: {
			columns: string[];
			records: [string, number][];
		};
	}

	interface AnalysisChartData extends ChartData<'line'> {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			borderColor: string;
			tension: number;
		}[];
	}

	let messages: Message[] = [];
	let input = '';
	let isLoading = false;
	let error = '';
	let isDownloading = false;
	let isToggling = false; // Added to prevent rapid toggle clicks
	let contentContainer: HTMLElement;

	onMount(() => {
		// Initialize API config - moved to a separate async function
		initApiConfig();
		
		// Add event listener for window resize to ensure sidebar renders correctly
		window.addEventListener('resize', handleResize);
		
		// Return cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	
	// Separate async function for API initialization
	async function initApiConfig() {
		try {
			apiConfig = await getApiConfig(i18n);
			console.log('API config initialized:', apiConfig);
		} catch (error) {
			console.error('Failed to initialize API config:', error);
		}
	}
	
	// Utility function to safely extract regex match groups with null checks
	function safeMatchGroup(text: string, regex: RegExp, groupIndex: number = 1): string {
		const match = text.match(regex);
		return match && match[groupIndex] ? match[groupIndex] : '';
	}
	
	// Handle window resize to ensure sidebar renders correctly
	function handleResize() {
		if (contentContainer) {
			// Force layout recalculation
			contentContainer.getBoundingClientRect();
		}
	}

	async function handleSubmit() {
		if (!input.trim()) return;
		if (!input.startsWith('@analysis')) {
			error = 'Please start your message with @analysis';
			return;
		}

		console.log('[DEBUG] Submitting input:', input);

		isLoading = true;
		error = '';
		messages = [];

		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No authentication token found');
			}

			const requestBody = {
				conversation_id: 'analysis_stream',
				message: input
			};
			const requestHeaders = {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiConfig.userToken}`,
				'Accept-Language': apiConfig.languageLocal
			};
			console.log('[DEBUG] Sending fetch to proxy/api/analysis/stream', requestBody, requestHeaders);

			const response = await fetch(`${WEBUI_BASE_URL}/proxy/api/analysis/stream`, {
				method: 'POST',
				headers: requestHeaders,
				body: JSON.stringify(requestBody)
			});

			console.log('[DEBUG] Response status:', response.status);

			if (!response.ok) {
				throw new Error('Failed to fetch analysis');
			}

			const reader = response.body?.getReader();
			if (!reader) throw new Error('No reader available');

			const decoder = new TextDecoder();
			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split('\n');
				buffer = lines.pop() || '';

				for (const line of lines) {
					if (!line.trim()) continue;
					console.log('[DEBUG] Received line:', line);
					try {
						const data = JSON.parse(line);
						if (data.type === 'node') {
							const newMessage = {
								role: 'assistant',
								content: data.content,
								metadata: data.metadata,
								results: data.results
							};
							console.log('[DEBUG] Adding message:', newMessage);
							messages = [...messages, newMessage];
						}
					} catch (e) {
						console.error('[DEBUG] Error parsing line:', e, line);
					}
				}
			}
		} catch (e) {
			console.error('[DEBUG] Error in handleSubmit:', e);
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			isLoading = false;
			input = '';
		}
	}

	function formatChartData(results: Message['results']): AnalysisChartData | null {
		if (!results || !results.records) return null;
		const chartData: AnalysisChartData = {
			labels: results.records.map((r) => r[0]),
			datasets: [{
				label: 'Value',
				data: results.records.map((r) => r[1]),
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}]
		};
		return chartData;
	}

	function toTableObjects(columns: string[], records: [string, number][]) {
		return records.map(row => {
			const obj: Record<string, any> = {};
			columns.forEach((col, i) => {
				obj[col] = row[i];
			});
			return obj;
		});
	}

	async function downloadWordReport() {
		try {
			console.log('[DOCX DEBUG] Starting Word document download with Docxtemplater');
			isDownloading = true;
			
			// Combine all message contents for the report
			const combinedContent = messages.map(message => {
				// Clean HTML tags and format the content
				return message.content.replace(/<[^>]+>/g, '');
			}).join('\n\n');
			
			// Use the first message's results for the table, if available
			const tableData = messages.find(msg => msg.results?.columns && msg.results.records)?.results;
			
			// Create the document using our new utility function
			const blob = await createDocxTemplateReport(
				combinedContent,
				'Analysis Report',
				tableData
			);
			
			// Generate filename with timestamp
			const timestamp = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 14);
			const filename = `analysis_report_${timestamp}.docx`;
			
			// Download the document
			downloadDocxDocument(blob, filename);
			
			console.log('[DOCX DEBUG] Download complete');
		} catch (error) {
			console.error('[DOCX DEBUG] Error in downloadWordReport:', error);
			alert('Failed to download report. Please try again.');
		} finally {
			isDownloading = false;
		}
	}

	function toggleSidebar() {
		if (isToggling) return; // Prevent rapid toggling
		
		isToggling = true;
		
		// Force a layout recalculation
		if (contentContainer) {
			contentContainer.getBoundingClientRect();
		}
		
		// Add a tiny delay before updating the store
		requestAnimationFrame(() => {
			showSidebar.update(value => !value);
			
			// Reset toggle state after animation completes
			setTimeout(() => { 
				isToggling = false;
				
				// Force another layout recalculation after sidebar animation completes
				if (contentContainer) {
					contentContainer.getBoundingClientRect();
				}
			}, 300);
		});
	}
	
	// After each update, ensure layout is recalculated
	afterUpdate(() => {
		if (contentContainer) {
			// Force layout recalculation after DOM updates
			contentContainer.getBoundingClientRect();
		}
	});
</script>

<div class="analysis-container" bind:this={contentContainer}>
	<div class="analysis-header bg-gray-900 dark:bg-gray-950 text-white">
		<div class="header-title-row">
			<div class="header-left">
				<!-- Sidebar Toggle Button -->
				<button
					class="cursor-pointer p-[7px] flex rounded-xl hover:bg-gray-800 dark:hover:bg-gray-800 transition sidebar-toggle"
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
				<h1 class="text-2xl font-bold">Analysis Report</h1>
			</div>

			<button 
				on:click={downloadWordReport} 
				class="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-700/50 transition flex items-center"
				disabled={isDownloading || messages.length === 0}
			>
				{#if isDownloading}
					<svg class="animate-spin h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
					</svg>
					<span>Downloading...</span>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
					</svg>
					<span>Download as Word</span>
				{/if}
			</button>
		</div>
	</div>

	<div class="analysis-content bg-white dark:bg-gray-900">
		<!-- Message content area -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#each messages as message}
				<div class="bg-white dark:bg-gray-800 rounded-xl p-0 shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 mb-6">
					<!-- Extract and display title -->
					{#if message.content.match(/\*\*Analysis for - (.*?)\*\*/)}
						<div class="bg-gray-50 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
							<h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
								{safeMatchGroup(message.content, /\*\*Analysis for - (.*?)\*\*/)}
							</h2>
						</div>
					{/if}
					
					<!-- Content area -->
					<div class="p-0">
						<!-- Summary section -->
						{#if message.content.includes('**Summary')}
							<div class="px-4 py-4 border-b border-gray-100 dark:border-gray-700">
								<div class="flex items-start">
									<div class="bg-blue-100 dark:bg-blue-800/30 p-2 rounded-lg mr-3">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
											<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
											<path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">Summary</h3>
										<div class="text-gray-700 dark:text-gray-300">
											{#if message.content.match(/\*\*Summary\*\*:?\s*(.*?)(?:\n\n\*\*Trends And Insights|\*\*Trends And Insights)/s)}
												{@html safeMatchGroup(
													message.content,
													/\*\*Summary\*\*:?\s*(.*?)(?:\n\n\*\*Trends And Insights|\*\*Trends And Insights)/s
												)
													.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
													.split(';')
													.map(line => line.trim())
													.join('<br>')}
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/if}
						
						<!-- Trends And Insights section -->
						{#if message.content.includes('**Trends And Insights')}
							<div class="bg-purple-50 dark:bg-purple-900/10 px-4 py-4 border-b border-gray-100 dark:border-gray-700">
								<div class="flex items-start">
									<div class="bg-purple-100 dark:bg-purple-800/30 p-2 rounded-lg mr-3">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-purple-800 dark:text-purple-300 mb-2">Trends And Insights</h3>
										<div class="text-gray-700 dark:text-gray-300">
											{#if message.content.match(/\*\*Trends And Insights\*\*:?\s*(.*?)(?:\n\n\*\*Journal Entries|\*\*Journal Entries)/s)}
												<ul class="list-disc pl-5 space-y-2">
													{#each safeMatchGroup(
														message.content,
														/\*\*Trends And Insights\*\*:?\s*(.*?)(?:\n\n\*\*Journal Entries|\*\*Journal Entries)/s
													)
														.replace(/^\*\s*/, '')
														.split(/;\s*|\n\*\s*/)
														.filter(item => item.trim()) as item}
														<li>{@html item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
													{/each}
												</ul>
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/if}
						
						<!-- Journal Entries Analysis section -->
						{#if message.content.includes('**Journal Entries Analysis')}
							<div class="bg-green-50 dark:bg-green-900/10 px-4 py-4 border-b border-gray-100 dark:border-gray-700">
								<div class="flex items-start">
									<div class="bg-green-100 dark:bg-green-800/30 p-2 rounded-lg mr-3">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-green-800 dark:text-green-300 mb-2">Journal Entries</h3>
										<div class="text-gray-700 dark:text-gray-300">
											{#if message.content.match(/\*\*Journal Entries Analysis\*\*:?\s*(.*?)(?:\n\n\*\*Recommendations|\*\*Recommendations)/s)}
												<ul class="list-disc pl-5 space-y-2">
													{#each safeMatchGroup(
														message.content, 
														/\*\*Journal Entries Analysis\*\*:?\s*(.*?)(?:\n\n\*\*Recommendations|\*\*Recommendations)/s
													)
														.replace(/^\*\s*/, '')
														.split(/;\s*|\n\*\s*/)
														.filter(item => item.trim()) as item}
														<li>{@html item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
													{/each}
												</ul>
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/if}
						
						<!-- Recommendations section -->
						{#if message.content.includes('**Recommendations')}
							<div class="bg-amber-50 dark:bg-amber-900/10 px-4 py-4">
								<div class="flex items-start">
									<div class="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-lg mr-3">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
											<path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-amber-800 dark:text-amber-300 mb-2">Recommendations</h3>
										<div class="text-gray-700 dark:text-gray-300">
											{#if message.content.match(/\*\*Recommendations\*\*:?\s*(.*?)$/s)}
												<ul class="list-disc pl-5 space-y-2">
													{#each safeMatchGroup(
														message.content, 
														/\*\*Recommendations\*\*:?\s*(.*?)$/s
													)
														.split(/;\s*|\n\*\s*/)
														.filter(rec => rec.trim()) as recommendation}
														<li>{@html recommendation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
													{/each}
												</ul>
											{/if}
										</div>
									</div>
								</div>
							</div>
						{/if}
						
						{#if !message.content.includes('**Summary') && !message.content.includes('**Trends And Insights') && 
							!message.content.includes('**Journal Entries Analysis') && !message.content.includes('**Recommendations')}
							<div class="px-5 py-4">
								<div class="prose dark:prose-invert max-w-none">
									{@html message.content.replace(/;/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
								</div>
							</div>
						{/if}
					</div>
					{#if message.results}
						<div class="mt-4">
							{#if message.results.records}
								<div class="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
										<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75" />
									</svg>
									Data Table
								</div>
								<div class="overflow-x-auto">
									<Table 
										data={toTableObjects(message.results.columns, message.results.records)}
										columns={message.results.columns}
										className="border w-full table-improved"
									/>
								</div>
								<div class="mt-4 h-64">
									{#if message.results}
										{#await Promise.resolve(formatChartData(message.results)) then chartData}
											{#if chartData}
												<Chart
													type="line"
													data={chartData}
													options={{
														responsive: true,
														maintainAspectRatio: false
													}}
												/>
											{/if}
										{/await}
									{/if}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Input form at bottom -->
		<div class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
			<div class="max-w-6xl px-2.5 mx-auto inset-x-0">
				<form on:submit|preventDefault={handleSubmit} class="w-full flex gap-1.5">
					<div class="flex-1 flex flex-col relative w-full rounded-3xl px-1 bg-gray-600/5 dark:bg-gray-400/5 dark:text-gray-100">
						<div class="px-2.5">
							<input
								type="text"
								bind:value={input}
								placeholder="Send a message starting with @analysis"
								class="scrollbar-hidden bg-transparent dark:text-gray-100 outline-hidden w-full pt-3 px-1 resize-none h-fit"
								disabled={isLoading}
							/>
						</div>
				  
						<div class="flex justify-between mt-1.5 mb-2.5 mx-0.5 max-w-full">
							<div class="ml-1 self-end gap-0.5 flex items-center flex-1 max-w-[80%]">
								<!-- This space can remain empty to match the layout -->
							</div>
							
							<div class="self-end flex space-x-1 mr-1 shrink-0">
								<div class="flex items-center">
									<button
										type="submit"
										class="{!isLoading 
											? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100' 
											: 'text-white bg-gray-200 dark:text-gray-900 dark:bg-gray-700'} 
											transition rounded-full p-1.5 self-center"
										disabled={isLoading}
									>
										{#if isLoading}
											<div class="flex items-center">
												<svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
													<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
													<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
												</svg>
												<span>Processing...</span>
											</div>
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5">
												<path fill-rule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clip-rule="evenodd"/>
											</svg>
										{/if}
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
				
				{#if error}
					<p class="mt-2 text-red-500 text-sm">{error}</p>
				{/if}
			</div>
		</div>
	</div>
</div>


<style>
/* Add structured CSS similar to excel-to-sql page */
.analysis-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	position: relative;
	overflow: hidden;
}

.analysis-header {
	padding: 12px 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 10;
	position: relative;
}

.header-title-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 16px;
}

.sidebar-toggle {
	transition: all 300ms ease-in-out;
	position: relative;
	z-index: 11;
}

.analysis-content {
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	position: relative;
}

.analysis-content > div.flex-1 {
	height: calc(100vh - 130px);
}

:global(.table-improved) {
	width: calc(100% + 1rem) !important;
	max-width: none !important;
	margin-left: -0.5rem;
	margin-right: -0.5rem;
}
:global(.table-improved thead) {
	background-color: #e8f4ff !important;
}
:global(.dark .table-improved thead) {
	background-color: #1e3a5f !important;
}
:global(.table-improved th) {
	font-weight: 600;
	padding: 0.75rem 1rem !important;
}
:global(.table-improved td) {
	padding: 0.625rem 1rem !important;
}

/* Fixes for mobile viewports */
@media (max-width: 768px) {
	.analysis-header {
		padding: 10px 16px;
	}
	
	.header-left {
		gap: 10px;
	}
	
	.analysis-content > div.flex-1 {
		height: calc(100vh - 120px);
	}
}
</style> 
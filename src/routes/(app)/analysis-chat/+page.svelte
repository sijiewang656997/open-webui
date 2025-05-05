<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { user } from '$lib/stores';
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
	import { saveAs } from 'file-saver';
	import { Document, Packer, Paragraph, TextRun, Table as DocxTable, TableRow, TableCell } from 'docx';

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
				'Authorization': 'Bearer token_59b8b43a_aiurmmm0_test', //`Bearer ${token}`,
				'Accept-Language': 'zh-cn'
			};
			console.log('[DEBUG] Sending fetch to http://192.168.200.118:5002/api/analysis/stream', requestBody, requestHeaders);

			const response = await fetch('http://192.168.200.118:5002/api/analysis/stream', {
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
		const doc = new Document();
		const children = [];

		children.push(new Paragraph({
			children: [new TextRun({ text: 'Analysis Report', bold: true, size: 36 })],
			spacing: { after: 300 }
		}));

		for (const message of messages) {
			children.push(new Paragraph({
				children: [new TextRun({ text: message.content.replace(/<[^>]+>/g, ''), size: 24 })],
				spacing: { after: 200 }
			}));
			if (message.results && message.results.columns && message.results.records) {
				const tableRows = [
					new TableRow({
						children: message.results.columns.map(col => new TableCell({ children: [new Paragraph({ text: col, bold: true })] }))
					}),
					...message.results.records.map(row => new TableRow({
						children: row.map(cell => new TableCell({ children: [new Paragraph({ text: String(cell) })] }))
					}))
				];
				children.push(new DocxTable({ rows: tableRows }));
			}
		}

		doc.addSection({ children });
		const blob = await Packer.toBlob(doc);
		saveAs(blob, 'analysis_report.docx');
	}
</script>

<div class="flex flex-row w-full h-full max-h-[100dvh]">
	<!-- Main content area -->
	<div class="flex-1 flex flex-col h-full">
		<div class="flex items-center justify-between px-4 pt-4 pb-2">
			<h1 class="text-2xl font-bold">Analysis Report</h1>
			<button on:click={downloadWordReport} class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Download as Word</button>
		</div>
		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#each messages as message}
				<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
					<div class="prose dark:prose-invert max-w-none">
						{@html message.content}
					</div>
					{#if message.results}
						<div class="mt-4">
							{#if message.results.records}
								<!-- Table Section Header -->
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

		<div class="p-4 border-t dark:border-gray-700">
			{#if error}
				<div class="mb-4 text-red-500 dark:text-red-400">{error}</div>
			{/if}
			<form on:submit|preventDefault={handleSubmit} class="flex space-x-2">
				<input
					type="text"
					bind:value={input}
					placeholder="Type @analysis followed by your query..."
					class="flex-1 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					disabled={isLoading}
				/>
				<button
					type="submit"
					class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
					disabled={isLoading}
				>
					{#if isLoading}
						Loading...
					{:else}
						Send
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>

<style>
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
</style> 
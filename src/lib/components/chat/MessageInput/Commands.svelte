<script>
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';

	const dispatch = createEventDispatcher();

	import { knowledge, prompts } from '$lib/stores';

	import { removeLastWordFromString } from '$lib/utils';
	import { getPrompts } from '$lib/apis/prompts';
	import { getKnowledgeBases } from '$lib/apis/knowledge';

	import Prompts from './Commands/Prompts.svelte';
	import Knowledge from './Commands/Knowledge.svelte';
	import Models from './Commands/Models.svelte';
	import DatabaseReferences from './Commands/DatabaseReferences.svelte';
	import Spinner from '$lib/components/common/Spinner.svelte';

	export let prompt = '';
	export let files = [];
	export let history = null; // Add history prop to access message data

	let loading = false;
	let commandElement = null;
	let useDbReferences = false; // Flag to determine if we should show DB references or models
	let dbReferencesList = []; // List of database references found in messages

	// Extract database references from message content
	const extractDbReferences = () => {
		if (!history || !history.messages) return [];
		
		const references = [];
		let highestGeneratedTable = -1; // Track highest actually generated table
		
		// Look through all assistant messages to find database references
		Object.values(history.messages).forEach(message => {
			if (message.role === 'assistant' && message.content) {
				try {
					// First look for "Generated Table Tn" pattern that confirms table creation
					const generatedMatch = message.content.match(/Generated Table T(\d+)/i);
					if (generatedMatch) {
						const tableNumber = parseInt(generatedMatch[1]);
						if (tableNumber > highestGeneratedTable) {
							highestGeneratedTable = tableNumber;
						}
					}
				} catch (error) {
					console.log("Error parsing message content:", error);
				}
			}
		});
		
		if (highestGeneratedTable >= 0) {
			// Show only tables that have actually been generated
			// Add generated tables (T1 to highestGeneratedTable)
			for (let i = 0; i <= highestGeneratedTable; i++) {
				references.push(`T${i}`);
			}
			// Add the next table in sequence
			//references.push(`T${highestGeneratedTable + 1}`);
		} else {
			// If no tables found, show T0 for new conversations
			references.push("T0");
		}
		
		return references;
	};

	export const selectUp = () => {
		commandElement?.selectUp();
	};

	export const selectDown = () => {
		commandElement?.selectDown();
	};

	let command = '';
	$: command = prompt?.split('\n').pop()?.split(' ')?.pop() ?? '';

	let show = false;
	$: show = ['/', '#', '@'].includes(command?.charAt(0)) || '\\#' === command.slice(0, 2);

	$: if (show) {
		init();
	}
	
	// Update database references whenever command is shown
	$: if (show && command?.charAt(0) === '@') {
		dbReferencesList = extractDbReferences();
		useDbReferences = dbReferencesList.length > 0;
	}

	const init = async () => {
		loading = true;
		await Promise.all([
			(async () => {
				prompts.set(await getPrompts(localStorage.token));
			})(),
			(async () => {
				knowledge.set(await getKnowledgeBases(localStorage.token));
			})()
		]);
		loading = false;
	};
</script>

{#if show}
	{#if !loading}
		{#if command?.charAt(0) === '/'}
			<Prompts bind:this={commandElement} bind:prompt bind:files {command} />
		{:else if (command?.charAt(0) === '#' && command.startsWith('#') && !command.includes('# ')) || ('\\#' === command.slice(0, 2) && command.startsWith('#') && !command.includes('# '))}
			<Knowledge
				bind:this={commandElement}
				bind:prompt
				command={command.includes('\\#') ? command.slice(2) : command}
				on:youtube={(e) => {
					console.log(e);
					dispatch('upload', {
						type: 'youtube',
						data: e.detail
					});
				}}
				on:url={(e) => {
					console.log(e);
					dispatch('upload', {
						type: 'web',
						data: e.detail
					});
				}}
				on:select={(e) => {
					console.log(e);
					if (files.find((f) => f.id === e.detail.id)) {
						return;
					}

					files = [
						...files,
						{
							...e.detail,
							status: 'processed'
						}
					];

					dispatch('select');
				}}
			/>
		{:else if command?.charAt(0) === '@'}
			{#if useDbReferences}
				<DatabaseReferences
					bind:this={commandElement}
					{command}
					dbReferences={dbReferencesList}
					on:select={(e) => {
						prompt = removeLastWordFromString(prompt, command);
						prompt += `@${e.detail}`;
						
						dispatch('select');
					}}
				/>
			{:else}
				<Models
					bind:this={commandElement}
					{command}
					on:select={(e) => {
						prompt = removeLastWordFromString(prompt, command);

						dispatch('select', {
							type: 'model',
							data: e.detail
						});
					}}
				/>
			{/if}
		{/if}
	{:else}
		<div
			id="commands-container"
			class="px-2 mb-2 text-left w-full absolute bottom-0 left-0 right-0 z-10"
		>
			<div class="flex w-full rounded-xl border border-gray-100 dark:border-gray-850">
				<div
					class="max-h-60 flex flex-col w-full rounded-xl bg-white dark:bg-gray-900 dark:text-gray-100"
				>
					<Spinner />
				</div>
			</div>
		</div>
	{/if}
{/if}

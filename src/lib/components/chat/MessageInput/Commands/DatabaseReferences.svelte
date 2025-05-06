<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { tick, getContext } from 'svelte';

	const i18n = getContext('i18n');
	const dispatch = createEventDispatcher();

	export let command = '';
	export let dbReferences = ['T0']; // Default to T0 if nothing is provided

	let selectedIdx = 0;
	let filteredReferences = [];

	// Filter references based on what's typed after @
	$: {
		const query = command.slice(1).toLowerCase();
		if (query) {
			filteredReferences = dbReferences.filter(ref => 
				ref.toLowerCase().includes(query)
			);
		} else {
			filteredReferences = [...dbReferences];
		}
		
		// If we have no results but typed something, show the input as an option
		if (filteredReferences.length === 0 && query) {
			// Add T followed by the number if query is numeric
			if (/^\d+$/.test(query)) {
				filteredReferences = [`T${query}`];
			}
		}
		
		// Always reset selection to first item when filtering
		selectedIdx = 0;
	}

	export const selectUp = () => {
		selectedIdx = Math.max(0, selectedIdx - 1);
	};

	export const selectDown = () => {
		selectedIdx = Math.min(selectedIdx + 1, filteredReferences.length - 1);
	};

	const confirmSelect = async (reference) => {
		dispatch('select', reference);
	};

	onMount(async () => {
		await tick();
		const chatInputElement = document.getElementById('chat-input');
		if (chatInputElement) {
			await tick();
			chatInputElement?.focus();
		}
	});
</script>

{#if filteredReferences.length > 0}
	<div
		id="commands-container"
		class="px-2 mb-2 text-left w-full absolute bottom-0 left-0 right-0 z-10"
	>
		<div class="flex w-full rounded-xl border border-gray-100 dark:border-gray-850">
			<div
				class="max-h-60 flex flex-col w-full rounded-xl bg-white dark:bg-gray-900 dark:text-gray-100"
			>
				<div class="m-1 overflow-y-auto p-1 rounded-r-lg space-y-0.5 scrollbar-hidden">
					{#each filteredReferences as reference, refIdx}
						<button
							class="px-3 py-1.5 rounded-xl w-full text-left {refIdx === selectedIdx
								? 'bg-gray-50 dark:bg-gray-850 selected-command-option-button'
								: ''}"
							type="button"
							on:click={() => {
								confirmSelect(reference);
							}}
							on:mousemove={() => {
								selectedIdx = refIdx;
							}}
						>
							<div class="flex font-medium text-black dark:text-gray-100 line-clamp-1">
								<div class="flex items-center mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
										<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
									</svg>
								</div>
								@{reference}
							</div>
							<div class="text-xs text-gray-500 ml-7">
								{$i18n.t('Reference database table')}
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if} 
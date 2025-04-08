<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	
	import { getKneronDevices } from '$lib/apis/openai';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import AddDeviceModal from '$lib/components/AddDeviceModal.svelte';
	
	const i18n: any = getContext('i18n');
	
	let devices: string[] = [];
	let loading = true;
	let showAddDeviceModal = false;
	
	const fetchDevices = async () => {
		loading = true;
		try {
			devices = await getKneronDevices(localStorage.token);
		} catch (error) {
			toast.error(`${error}`);
		} finally {
			loading = false;
		}
	};
	
	const onDeviceAdded = async () => {
		await fetchDevices();
	};
	
	onMount(fetchDevices);
</script>

<AddDeviceModal bind:show={showAddDeviceModal} onSubmit={onDeviceAdded} />

<div class="">
	<div class="flex justify-between items-center mb-0.5">
		<div class="font-medium">{$i18n.t('Kneron Devices')}</div>
		
		<Tooltip content={$i18n.t(`Add Device`)}>
			<button
				class="px-1"
				on:click={() => {
					showAddDeviceModal = true;
				}}
				type="button"
			>
				<Plus />
			</button>
		</Tooltip>
	</div>
	
	<div class="flex flex-col gap-1.5">
		{#if loading}
			<div class="flex justify-center py-2">
				<div class="animate-spin h-4 w-4 rounded-full border-2 border-t-transparent border-gray-500"></div>
			</div>
		{:else if devices.length === 0}
			<div class="text-sm text-gray-500 py-1">{$i18n.t('No devices found')}</div>
		{:else}
			{#each devices as device}
				<div class="flex justify-between items-center py-1.5 px-2 bg-gray-50 dark:bg-gray-800 rounded-md">
					<div class="text-sm">{device}</div>
				</div>
			{/each}
		{/if}
	</div>
</div> 
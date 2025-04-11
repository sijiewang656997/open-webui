<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flyAndScale } from '$lib/utils/transitions';

	export let show = true;
	export let size = 'md';
	export let containerClassName = 'p-3';
	export let className = 'bg-gray-50 dark:bg-gray-900 rounded-2xl';
	export let draggable = false; // 是否可拖动
	export let minimizable = false; // 新增: 是否可最小化
	export let title = ''; // 新增: 窗口标题，用于最小化时显示

	let modalElement = null;
	let modalContentElement = null;
	let mounted = false;
	let minimized = false; // 新增: 是否已最小化
	let minimizedPosition = { x: 20, y: 20 }; // 新增: 最小化后的位置

	// 拖动相关状态
	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let currentX = 0;
	let currentY = 0;
	let offsetX = 0;
	let offsetY = 0;

	// 最小化图标拖动状态
	let isMinimizedDragging = false;
	let minInitialX = 0;
	let minInitialY = 0;

	const sizeToWidth = (size) => {
		if (size === 'full') {
			return 'w-full';
		}
		if (size === 'xs') {
			return 'w-[16rem]';
		} else if (size === 'sm') {
			return 'w-[30rem]';
		} else if (size === 'md') {
			return 'w-[42rem]';
		} else {
			return 'w-[56rem]';
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && isTopModal() && !minimized) {
			console.log('Escape');
			show = false;
		}
	};

	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	// 新增: 切换最小化状态
	function toggleMinimize() {
		minimized = !minimized;
		
		// 如果从最小化恢复，重置窗口位置
		if (!minimized) {
			resetPosition();
		}
	}

	// 开始拖动
	function startDrag(e) {
		if (!draggable || !modalContentElement || minimized) return;

		// 检查是否在标题区域点击（前30px高度区域）
		const rect = modalContentElement.getBoundingClientRect();
		const mouseY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
		
		if (mouseY - rect.top > 30) {
			// 如果不是在顶部区域点击，不启动拖动
			return;
		}

		// 防止选择文本
		e.preventDefault();
		isDragging = true;

		// 获取鼠标或触摸起始位置
		if (e.type === 'mousedown') {
			initialX = e.clientX;
			initialY = e.clientY;
		} else if (e.type === 'touchstart') {
			initialX = e.touches[0].clientX;
			initialY = e.touches[0].clientY;
		}

		// 当前偏移量
		currentX = offsetX;
		currentY = offsetY;

		// 添加移动和结束事件监听
		document.addEventListener('mousemove', drag);
		document.addEventListener('touchmove', drag, { passive: false });
		document.addEventListener('mouseup', stopDrag);
		document.addEventListener('touchend', stopDrag);
	}

	// 拖动过程
	function drag(e) {
		if (!isDragging) return;

		e.preventDefault();

		let clientX, clientY;

		if (e.type === 'mousemove') {
			clientX = e.clientX;
			clientY = e.clientY;
		} else if (e.type === 'touchmove') {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		}

		// 计算新位置
		const dx = clientX - initialX;
		const dy = clientY - initialY;

		offsetX = currentX + dx;
		offsetY = currentY + dy;

		// 应用位置
		if (modalContentElement) {
			modalContentElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
		}
	}

	// 停止拖动
	function stopDrag() {
		isDragging = false;

		// 移除事件监听
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('touchmove', drag);
		document.removeEventListener('mouseup', stopDrag);
		document.removeEventListener('touchend', stopDrag);
	}

	// 新增: 开始拖动最小化图标
	function startMinimizedDrag(e) {
		e.preventDefault();
		isMinimizedDragging = true;

		// 获取鼠标或触摸起始位置
		if (e.type === 'mousedown') {
			minInitialX = e.clientX - minimizedPosition.x;
			minInitialY = e.clientY - minimizedPosition.y;
		} else if (e.type === 'touchstart') {
			minInitialX = e.touches[0].clientX - minimizedPosition.x;
			minInitialY = e.touches[0].clientY - minimizedPosition.y;
		}

		// 添加移动和结束事件监听
		document.addEventListener('mousemove', dragMinimized);
		document.addEventListener('touchmove', dragMinimized, { passive: false });
		document.addEventListener('mouseup', stopMinimizedDrag);
		document.addEventListener('touchend', stopMinimizedDrag);
	}

	// 新增: 拖动最小化图标
	function dragMinimized(e) {
		if (!isMinimizedDragging) return;

		e.preventDefault();

		let clientX, clientY;

		if (e.type === 'mousemove') {
			clientX = e.clientX;
			clientY = e.clientY;
		} else if (e.type === 'touchmove') {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		}

		// 计算并设置新位置
		minimizedPosition.x = clientX - minInitialX;
		minimizedPosition.y = clientY - minInitialY;

		// 确保不超出屏幕
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		minimizedPosition.x = Math.max(0, Math.min(minimizedPosition.x, screenWidth - 60));
		minimizedPosition.y = Math.max(0, Math.min(minimizedPosition.y, screenHeight - 60));
	}

	// 新增: 停止拖动最小化图标
	function stopMinimizedDrag() {
		isMinimizedDragging = false;

		// 移除事件监听
		document.removeEventListener('mousemove', dragMinimized);
		document.removeEventListener('touchmove', dragMinimized);
		document.removeEventListener('mouseup', stopMinimizedDrag);
		document.removeEventListener('touchend', stopMinimizedDrag);
	}

	// 重置位置
	function resetPosition() {
		offsetX = 0;
		offsetY = 0;
		if (modalContentElement) {
			modalContentElement.style.transform = '';
		}
	}

	// 当模态窗口关闭时，重置状态
	$: if (!show) {
		resetPosition();
		minimized = false;
	}

	onMount(() => {
		mounted = true;
	});

	$: if (show && modalElement) {
		document.body.appendChild(modalElement);
		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';
	} else if (modalElement) {
		window.removeEventListener('keydown', handleKeyDown);
		document.body.removeChild(modalElement);
		document.body.style.overflow = 'unset';
	}

	onDestroy(() => {
		show = false;
		if (modalElement) {
			document.body.removeChild(modalElement);
		}

		// 确保清理所有事件监听器
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('touchmove', drag);
		document.removeEventListener('mouseup', stopDrag);
		document.removeEventListener('touchend', stopDrag);
		document.removeEventListener('mousemove', dragMinimized);
		document.removeEventListener('touchmove', dragMinimized);
		document.removeEventListener('mouseup', stopMinimizedDrag);
		document.removeEventListener('touchend', stopMinimizedDrag);
	});
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={modalElement}
		class="modal fixed top-0 right-0 left-0 bottom-0 {minimized ? 'pointer-events-none' : 'bg-black/60'} w-full h-screen max-h-[100dvh] {containerClassName} flex justify-center z-9999 overflow-y-auto overscroll-contain"
		in:fade={{ duration: 10 }}
		on:mousedown={() => {
			if (!isDragging && !minimized) {
				show = false;
			}
		}}
	>
		<!-- 主窗口 - 仅在非最小化状态显示 -->
		{#if !minimized}
			<div
				bind:this={modalContentElement}
				class="m-auto max-w-full {sizeToWidth(size)} {size !== 'full' ? 'mx-2' : ''} shadow-3xl min-h-fit scrollbar-hidden {className} {draggable ? 'cursor-move' : ''}"
				style={draggable ? 'position: relative;' : ''}
				in:flyAndScale
				on:mousedown={(e) => {
					e.stopPropagation();
					if (draggable) {
						startDrag(e);
					}
				}}
				on:touchstart={(e) => {
					e.stopPropagation();
					if (draggable) {
						startDrag(e);
					}
				}}
			>
				<!-- 标题栏 -->
				{#if draggable}
					<div class="absolute top-0 w-full h-8 cursor-move flex items-center justify-between px-2">
						{#if minimizable}
							<button
								class="h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
								on:click|stopPropagation={toggleMinimize}
								title="Minimize"
							>
								<span class="block w-3 h-0.5 bg-current"></span>
							</button>
						{/if}
					</div>
				{/if}
				
				<slot />
			</div>
		{/if}

		<!-- 最小化图标 - 仅在最小化状态显示 -->
		{#if minimized}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="fixed pointer-events-auto bg-blue-500 text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center cursor-move"
				style="left: {minimizedPosition.x}px; top: {minimizedPosition.y}px;"
				on:mousedown={startMinimizedDrag}
				on:touchstart={startMinimizedDrag}
				on:dblclick={toggleMinimize}
			>
				<div class="w-full h-full rounded-full flex items-center justify-center hover:bg-blue-600">
					<span class="text-xs font-medium">{title.slice(0, 2).toUpperCase()}</span>
				</div>
				
				<!-- 悬浮时显示完整标题的工具提示 -->
				<div class="absolute left-full ml-2 py-1 px-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
					{title || 'Window'}
					<div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.modal-content {
		animation: scaleUp 0.1s ease-out forwards;
	}

	@keyframes scaleUp {
		from {
			transform: scale(0.985);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
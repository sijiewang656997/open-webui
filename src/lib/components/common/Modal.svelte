<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { flyAndScale } from '$lib/utils/transitions';

	export let show = true;
	export let size = 'md';
	export let containerClassName = 'p-3';
	export let className = 'bg-gray-50 dark:bg-gray-900 rounded-2xl';
	export let draggable = false; // 新增: 控制是否可拖动

	let modalElement = null;
	let modalContentElement = null; // 新增: 引用内容元素
	let dragHandleElement = null; // 新增: 引用拖动把手元素
	let mounted = false;

	// 新增: 拖动相关状态
	let isDragging = false;
	let initialX = 0;
	let initialY = 0;
	let currentX = 0;
	let currentY = 0;
	let offsetX = 0;
	let offsetY = 0;

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
		if (event.key === 'Escape' && isTopModal()) {
			console.log('Escape');
			show = false;
		}
	};

	const isTopModal = () => {
		const modals = document.getElementsByClassName('modal');
		return modals.length && modals[modals.length - 1] === modalElement;
	};

	// 新增: 开始拖动
	function startDrag(e) {
		if (!draggable || !modalContentElement) return;

		// 防止选择文本
		e.preventDefault();

		// 验证是否从拖动把手开始
		if (dragHandleElement && !dragHandleElement.contains(e.target)) return;

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

	// 新增: 拖动
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

		// 计算可移动边界，防止拖出屏幕
		if (modalContentElement) {
			const rect = modalContentElement.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			const maxX = windowWidth - rect.width;
			const maxY = windowHeight - rect.height;

			// 限制范围，至少保留20%在视窗内
			offsetX = Math.max(-rect.width * 0.8, Math.min(offsetX, maxX + rect.width * 0.8));
			offsetY = Math.max(-rect.height * 0.5, Math.min(offsetY, maxY + rect.height * 0.2));
		}

		// 应用位置
		if (modalContentElement) {
			modalContentElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
		}
	}

	// 新增: 停止拖动
	function stopDrag() {
		isDragging = false;

		// 移除事件监听
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('touchmove', drag);
		document.removeEventListener('mouseup', stopDrag);
		document.removeEventListener('touchend', stopDrag);
	}

	// 新增: 重置位置
	function resetPosition() {
		offsetX = 0;
		offsetY = 0;
		if (modalContentElement) {
			modalContentElement.style.transform = '';
		}
	}

	// 新增: 当模态窗口关闭时，重置位置
	$: if (!show) {
		resetPosition();
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

		// 确保清理拖动事件监听器
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('touchmove', drag);
		document.removeEventListener('mouseup', stopDrag);
		document.removeEventListener('touchend', stopDrag);
	});
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={modalElement}
		class="modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] {containerClassName} flex justify-center z-9999 overflow-y-auto overscroll-contain"
		in:fade={{ duration: 10 }}
		on:mousedown={() => {
			// 只有在非拖动状态下，点击背景才关闭
			if (!isDragging) {
				show = false;
			}
		}}
	>
		<div
			bind:this={modalContentElement}
			class="m-auto max-w-full {sizeToWidth(size)} {size !== 'full' ? 'mx-2' : ''} shadow-3xl min-h-fit scrollbar-hidden {className} {draggable ? 'cursor-move' : ''}"
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
			{#if draggable}
				<!-- 拖动把手 - 可以自定义样式 -->
				<div 
					bind:this={dragHandleElement}
					class="drag-handle h-8 w-full cursor-move flex items-center justify-center"
				>
					<div class="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
				</div>
			{/if}
			<slot />
		</div>
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
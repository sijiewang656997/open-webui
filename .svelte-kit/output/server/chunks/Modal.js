import { c as create_ssr_component, o as onDestroy, a as add_attribute, f as escape } from "./ssr.js";
/* empty css                                    */
const css = {
  code: ".modal-content.svelte-fq1rhy{animation:svelte-fq1rhy-scaleUp 0.1s ease-out forwards}@keyframes svelte-fq1rhy-scaleUp{from{transform:scale(0.985);opacity:0}to{transform:scale(1);opacity:1}}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onDestroy, onMount } from \\"svelte\\";\\nimport { fade } from \\"svelte/transition\\";\\nimport { flyAndScale } from \\"$lib/utils/transitions\\";\\nexport let show = true;\\nexport let size = \\"md\\";\\nexport let containerClassName = \\"p-3\\";\\nexport let className = \\"bg-gray-50 dark:bg-gray-900 rounded-2xl\\";\\nexport let draggable = false;\\nexport let minimizable = false;\\nexport let title = \\"\\";\\nlet modalElement = null;\\nlet modalContentElement = null;\\nlet mounted = false;\\nlet minimized = false;\\nlet minimizedPosition = { x: 20, y: 20 };\\nlet isDragging = false;\\nlet initialX = 0;\\nlet initialY = 0;\\nlet currentX = 0;\\nlet currentY = 0;\\nlet offsetX = 0;\\nlet offsetY = 0;\\nlet isMinimizedDragging = false;\\nlet minInitialX = 0;\\nlet minInitialY = 0;\\nconst sizeToWidth = (size2) => {\\n  if (size2 === \\"full\\") {\\n    return \\"w-full\\";\\n  }\\n  if (size2 === \\"xs\\") {\\n    return \\"w-[16rem]\\";\\n  } else if (size2 === \\"sm\\") {\\n    return \\"w-[30rem]\\";\\n  } else if (size2 === \\"md\\") {\\n    return \\"w-[42rem]\\";\\n  } else {\\n    return \\"w-[56rem]\\";\\n  }\\n};\\nconst handleKeyDown = (event) => {\\n  if (event.key === \\"Escape\\" && isTopModal() && !minimized) {\\n    console.log(\\"Escape\\");\\n    show = false;\\n  }\\n};\\nconst isTopModal = () => {\\n  const modals = document.getElementsByClassName(\\"modal\\");\\n  return modals.length && modals[modals.length - 1] === modalElement;\\n};\\nfunction toggleMinimize() {\\n  minimized = !minimized;\\n  if (!minimized) {\\n    resetPosition();\\n  }\\n}\\nfunction startDrag(e) {\\n  if (!draggable || !modalContentElement || minimized) return;\\n  const rect = modalContentElement.getBoundingClientRect();\\n  const mouseY = e.type === \\"mousedown\\" ? e.clientY : e.touches[0].clientY;\\n  if (mouseY - rect.top > 30) {\\n    return;\\n  }\\n  e.preventDefault();\\n  isDragging = true;\\n  if (e.type === \\"mousedown\\") {\\n    initialX = e.clientX;\\n    initialY = e.clientY;\\n  } else if (e.type === \\"touchstart\\") {\\n    initialX = e.touches[0].clientX;\\n    initialY = e.touches[0].clientY;\\n  }\\n  currentX = offsetX;\\n  currentY = offsetY;\\n  document.addEventListener(\\"mousemove\\", drag);\\n  document.addEventListener(\\"touchmove\\", drag, { passive: false });\\n  document.addEventListener(\\"mouseup\\", stopDrag);\\n  document.addEventListener(\\"touchend\\", stopDrag);\\n}\\nfunction drag(e) {\\n  if (!isDragging) return;\\n  e.preventDefault();\\n  let clientX, clientY;\\n  if (e.type === \\"mousemove\\") {\\n    clientX = e.clientX;\\n    clientY = e.clientY;\\n  } else if (e.type === \\"touchmove\\") {\\n    clientX = e.touches[0].clientX;\\n    clientY = e.touches[0].clientY;\\n  }\\n  const dx = clientX - initialX;\\n  const dy = clientY - initialY;\\n  offsetX = currentX + dx;\\n  offsetY = currentY + dy;\\n  if (modalContentElement) {\\n    modalContentElement.style.transform = \`translate(\${offsetX}px, \${offsetY}px)\`;\\n  }\\n}\\nfunction stopDrag() {\\n  isDragging = false;\\n  document.removeEventListener(\\"mousemove\\", drag);\\n  document.removeEventListener(\\"touchmove\\", drag);\\n  document.removeEventListener(\\"mouseup\\", stopDrag);\\n  document.removeEventListener(\\"touchend\\", stopDrag);\\n}\\nfunction startMinimizedDrag(e) {\\n  e.preventDefault();\\n  isMinimizedDragging = true;\\n  if (e.type === \\"mousedown\\") {\\n    minInitialX = e.clientX - minimizedPosition.x;\\n    minInitialY = e.clientY - minimizedPosition.y;\\n  } else if (e.type === \\"touchstart\\") {\\n    minInitialX = e.touches[0].clientX - minimizedPosition.x;\\n    minInitialY = e.touches[0].clientY - minimizedPosition.y;\\n  }\\n  document.addEventListener(\\"mousemove\\", dragMinimized);\\n  document.addEventListener(\\"touchmove\\", dragMinimized, { passive: false });\\n  document.addEventListener(\\"mouseup\\", stopMinimizedDrag);\\n  document.addEventListener(\\"touchend\\", stopMinimizedDrag);\\n}\\nfunction dragMinimized(e) {\\n  if (!isMinimizedDragging) return;\\n  e.preventDefault();\\n  let clientX, clientY;\\n  if (e.type === \\"mousemove\\") {\\n    clientX = e.clientX;\\n    clientY = e.clientY;\\n  } else if (e.type === \\"touchmove\\") {\\n    clientX = e.touches[0].clientX;\\n    clientY = e.touches[0].clientY;\\n  }\\n  minimizedPosition.x = clientX - minInitialX;\\n  minimizedPosition.y = clientY - minInitialY;\\n  const screenWidth = window.innerWidth;\\n  const screenHeight = window.innerHeight;\\n  minimizedPosition.x = Math.max(0, Math.min(minimizedPosition.x, screenWidth - 60));\\n  minimizedPosition.y = Math.max(0, Math.min(minimizedPosition.y, screenHeight - 60));\\n}\\nfunction stopMinimizedDrag() {\\n  isMinimizedDragging = false;\\n  document.removeEventListener(\\"mousemove\\", dragMinimized);\\n  document.removeEventListener(\\"touchmove\\", dragMinimized);\\n  document.removeEventListener(\\"mouseup\\", stopMinimizedDrag);\\n  document.removeEventListener(\\"touchend\\", stopMinimizedDrag);\\n}\\nfunction resetPosition() {\\n  offsetX = 0;\\n  offsetY = 0;\\n  if (modalContentElement) {\\n    modalContentElement.style.transform = \\"\\";\\n  }\\n}\\n$: if (!show) {\\n  resetPosition();\\n  minimized = false;\\n}\\nonMount(() => {\\n  mounted = true;\\n});\\n$: if (show && modalElement) {\\n  document.body.appendChild(modalElement);\\n  window.addEventListener(\\"keydown\\", handleKeyDown);\\n  document.body.style.overflow = \\"hidden\\";\\n} else if (modalElement) {\\n  window.removeEventListener(\\"keydown\\", handleKeyDown);\\n  document.body.removeChild(modalElement);\\n  document.body.style.overflow = \\"unset\\";\\n}\\nonDestroy(() => {\\n  show = false;\\n  if (modalElement) {\\n    document.body.removeChild(modalElement);\\n  }\\n  document.removeEventListener(\\"mousemove\\", drag);\\n  document.removeEventListener(\\"touchmove\\", drag);\\n  document.removeEventListener(\\"mouseup\\", stopDrag);\\n  document.removeEventListener(\\"touchend\\", stopDrag);\\n  document.removeEventListener(\\"mousemove\\", dragMinimized);\\n  document.removeEventListener(\\"touchmove\\", dragMinimized);\\n  document.removeEventListener(\\"mouseup\\", stopMinimizedDrag);\\n  document.removeEventListener(\\"touchend\\", stopMinimizedDrag);\\n});\\n<\/script>\\n\\n{#if show}\\n\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\n\\t<div\\n\\t\\tbind:this={modalElement}\\n\\t\\tclass=\\"modal fixed top-0 right-0 left-0 bottom-0 {minimized ? 'pointer-events-none' : 'bg-black/60'} w-full h-screen max-h-[100dvh] {containerClassName} flex justify-center z-9999 overflow-y-auto overscroll-contain\\"\\n\\t\\tin:fade={{ duration: 10 }}\\n\\t\\ton:mousedown={() => {\\n\\t\\t\\tif (!isDragging && !minimized) {\\n\\t\\t\\t\\tshow = false;\\n\\t\\t\\t}\\n\\t\\t}}\\n\\t>\\n\\t\\t<!-- 主窗口 - 仅在非最小化状态显示 -->\\n\\t\\t{#if !minimized}\\n\\t\\t\\t<div\\n\\t\\t\\t\\tbind:this={modalContentElement}\\n\\t\\t\\t\\tclass=\\"m-auto max-w-full {sizeToWidth(size)} {size !== 'full' ? 'mx-2' : ''} shadow-3xl min-h-fit scrollbar-hidden {className} {draggable ? 'cursor-move' : ''}\\"\\n\\t\\t\\t\\tstyle={draggable ? 'position: relative;' : ''}\\n\\t\\t\\t\\tin:flyAndScale\\n\\t\\t\\t\\ton:mousedown={(e) => {\\n\\t\\t\\t\\t\\te.stopPropagation();\\n\\t\\t\\t\\t\\tif (draggable) {\\n\\t\\t\\t\\t\\t\\tstartDrag(e);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ton:touchstart={(e) => {\\n\\t\\t\\t\\t\\te.stopPropagation();\\n\\t\\t\\t\\t\\tif (draggable) {\\n\\t\\t\\t\\t\\t\\tstartDrag(e);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<!-- 标题栏 -->\\n\\t\\t\\t\\t{#if draggable}\\n\\t\\t\\t\\t\\t<div class=\\"absolute top-0 w-full h-8 cursor-move flex items-center justify-between px-2\\">\\n\\t\\t\\t\\t\\t\\t{#if minimizable}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click|stopPropagation={toggleMinimize}\\n\\t\\t\\t\\t\\t\\t\\t\\ttitle=\\"Minimize\\"\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"block w-3 h-0.5 bg-current\\"></span>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t<slot />\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\n\\t\\t<!-- 最小化图标 - 仅在最小化状态显示 -->\\n\\t\\t{#if minimized}\\n\\t\\t\\t<!-- svelte-ignore a11y-click-events-have-key-events -->\\n\\t\\t\\t<!-- svelte-ignore a11y-no-static-element-interactions -->\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"fixed pointer-events-auto bg-blue-500 text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center cursor-move\\"\\n\\t\\t\\t\\tstyle=\\"left: {minimizedPosition.x}px; top: {minimizedPosition.y}px;\\"\\n\\t\\t\\t\\ton:mousedown={startMinimizedDrag}\\n\\t\\t\\t\\ton:touchstart={startMinimizedDrag}\\n\\t\\t\\t\\ton:dblclick={toggleMinimize}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div class=\\"w-full h-full rounded-full flex items-center justify-center hover:bg-blue-600\\">\\n\\t\\t\\t\\t\\t<span class=\\"text-xs font-medium\\">{title.slice(0, 2).toUpperCase()}</span>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t<!-- 悬浮时显示完整标题的工具提示 -->\\n\\t\\t\\t\\t<div class=\\"absolute left-full ml-2 py-1 px-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none\\">\\n\\t\\t\\t\\t\\t{title || 'Window'}\\n\\t\\t\\t\\t\\t<div class=\\"absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800\\"></div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.modal-content {\\n\\t\\tanimation: scaleUp 0.1s ease-out forwards;\\n\\t}\\n\\n\\t@keyframes scaleUp {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0.985);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>"],"names":[],"mappings":"AAqQC,4BAAe,CACd,SAAS,CAAE,qBAAO,CAAC,IAAI,CAAC,QAAQ,CAAC,QAClC,CAEA,WAAW,qBAAQ,CAClB,IAAK,CACJ,SAAS,CAAE,MAAM,KAAK,CAAC,CACvB,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACD"}`
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = true } = $$props;
  let { size = "md" } = $$props;
  let { containerClassName = "p-3" } = $$props;
  let { className = "bg-gray-50 dark:bg-gray-900 rounded-2xl" } = $$props;
  let { draggable = false } = $$props;
  let { minimizable = false } = $$props;
  let { title = "" } = $$props;
  let modalElement = null;
  let modalContentElement = null;
  let minimized = false;
  let minimizedPosition = { x: 20, y: 20 };
  let isDragging = false;
  let isMinimizedDragging = false;
  let minInitialX = 0;
  let minInitialY = 0;
  const sizeToWidth = (size2) => {
    if (size2 === "full") {
      return "w-full";
    }
    if (size2 === "xs") {
      return "w-[16rem]";
    } else if (size2 === "sm") {
      return "w-[30rem]";
    } else if (size2 === "md") {
      return "w-[42rem]";
    } else {
      return "w-[56rem]";
    }
  };
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    if (e.type === "mousemove") {
      e.clientX;
      e.clientY;
    } else if (e.type === "touchmove") {
      e.touches[0].clientX;
      e.touches[0].clientY;
    }
  }
  function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  }
  function dragMinimized(e) {
    if (!isMinimizedDragging) return;
    e.preventDefault();
    let clientX, clientY;
    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    minimizedPosition.x = clientX - minInitialX;
    minimizedPosition.y = clientY - minInitialY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    minimizedPosition.x = Math.max(0, Math.min(minimizedPosition.x, screenWidth - 60));
    minimizedPosition.y = Math.max(0, Math.min(minimizedPosition.y, screenHeight - 60));
  }
  function stopMinimizedDrag() {
    isMinimizedDragging = false;
    document.removeEventListener("mousemove", dragMinimized);
    document.removeEventListener("touchmove", dragMinimized);
    document.removeEventListener("mouseup", stopMinimizedDrag);
    document.removeEventListener("touchend", stopMinimizedDrag);
  }
  onDestroy(() => {
    show = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
    document.removeEventListener("mousemove", dragMinimized);
    document.removeEventListener("touchmove", dragMinimized);
    document.removeEventListener("mouseup", stopMinimizedDrag);
    document.removeEventListener("touchend", stopMinimizedDrag);
  });
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0) $$bindings.containerClassName(containerClassName);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0) $$bindings.draggable(draggable);
  if ($$props.minimizable === void 0 && $$bindings.minimizable && minimizable !== void 0) $$bindings.minimizable(minimizable);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  $$result.css.add(css);
  {
    if (!show) {
      minimized = false;
    }
  }
  return `${show ? `  <div class="${"modal fixed top-0 right-0 left-0 bottom-0 " + escape(minimized ? "pointer-events-none" : "bg-black/60", true) + " w-full h-screen max-h-[100dvh] " + escape(containerClassName, true) + " flex justify-center z-9999 overflow-y-auto overscroll-contain svelte-fq1rhy"}"${add_attribute("this", modalElement, 0)}> ${!minimized ? `<div class="${"m-auto max-w-full " + escape(sizeToWidth(size), true) + " " + escape(size !== "full" ? "mx-2" : "", true) + " shadow-3xl min-h-fit scrollbar-hidden " + escape(className, true) + " " + escape(draggable ? "cursor-move" : "", true) + " svelte-fq1rhy"}"${add_attribute("style", draggable ? "position: relative;" : "", 0)}${add_attribute("this", modalContentElement, 0)}> ${draggable ? `<div class="absolute top-0 w-full h-8 cursor-move flex items-center justify-between px-2">${minimizable ? `<button class="h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300" title="Minimize" data-svelte-h="svelte-16zgt96"><span class="block w-3 h-0.5 bg-current"></span></button>` : ``}</div>` : ``} ${slots.default ? slots.default({}) : ``}</div>` : ``}  ${minimized ? `  <div class="fixed pointer-events-auto bg-blue-500 text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center cursor-move" style="${"left: " + escape(minimizedPosition.x, true) + "px; top: " + escape(minimizedPosition.y, true) + "px;"}"><div class="w-full h-full rounded-full flex items-center justify-center hover:bg-blue-600"><span class="text-xs font-medium">${escape(title.slice(0, 2).toUpperCase())}</span></div>  <div class="absolute left-full ml-2 py-1 px-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">${escape(title || "Window")} <div class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div></div></div>` : ``}</div>` : ``}`;
});
export {
  Modal as M
};
//# sourceMappingURL=Modal.js.map

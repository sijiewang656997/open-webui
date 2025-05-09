import { c as create_ssr_component, f as escape } from "../../../chunks/ssr.js";
/* empty css                                                        */
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col h-screen bg-gray-50 dark:bg-gray-900"><header class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"><div class="flex items-center justify-between"><h1 class="text-xl font-semibold text-gray-900 dark:text-white">${escape("Excel Viewer")}</h1></div></header> <main class="flex-1 p-4 overflow-auto">${`<div class="flex items-center justify-center h-full" data-svelte-h="svelte-2xnqpj"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>`}</main></div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

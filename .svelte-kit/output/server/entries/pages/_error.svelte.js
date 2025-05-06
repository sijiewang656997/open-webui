import { c as create_ssr_component, b as subscribe, g as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="bg-white dark:bg-gray-800 min-h-screen"><div class="flex h-full"><div class="m-auto my-10 dark:text-gray-300 text-3xl font-semibold">${escape($page.status)}: ${escape($page.error.message)}</div></div></div>`;
});
export {
  Error as default
};
//# sourceMappingURL=_error.svelte.js.map

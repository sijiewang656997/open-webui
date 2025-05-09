import { c as create_ssr_component, b as subscribe, p as getContext, v as validate_component, f as escape } from "../../../../chunks/ssr.js";
import { W as WEBUI_NAME, j as showSidebar } from "../../../../chunks/index3.js";
import { M as MenuLines } from "../../../../chunks/MenuLines.js";
import { p as page } from "../../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $showSidebar, $$unsubscribe_showSidebar;
  let $page, $$unsubscribe_page;
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_showSidebar();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-116tcfd_START -->${$$result.title = `<title> ${escape($i18n.t("Playground"))} | ${escape($WEBUI_NAME)} </title>`, ""}<!-- HEAD_svelte-116tcfd_END -->`, ""} <div class="${"flex flex-col w-full h-screen max-h-[100dvh] transition-width duration-200 ease-in-out " + escape($showSidebar ? "md:max-w-[calc(100%-260px)]" : "", true) + " max-w-full"}"><nav class="px-2.5 pt-1 backdrop-blur-xl w-full drag-region"><div class="flex items-center"><div class="${escape($showSidebar ? "md:hidden" : "", true) + " flex flex-none items-center self-end"}"><button id="sidebar-toggle-button" class="cursor-pointer p-1.5 flex rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 transition" aria-label="Toggle Sidebar"><div class="m-auto self-center">${validate_component(MenuLines, "MenuLines").$$render($$result, {}, {}, {})}</div></button></div> <div class="flex w-full"><div class="flex gap-1 scrollbar-none overflow-x-auto w-fit text-center text-sm font-medium rounded-full bg-transparent pt-1"><a class="${"min-w-fit rounded-full p-1.5 " + escape(
    ["/playground", "/playground/"].includes($page.url.pathname) ? "" : "text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
    true
  ) + " transition"}" href="/playground">${escape($i18n.t("Chat"))}</a>  <a class="${"min-w-fit rounded-full p-1.5 " + escape(
    $page.url.pathname.includes("/playground/completions") ? "" : "text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
    true
  ) + " transition"}" href="/playground/completions">${escape($i18n.t("Completions"))}</a></div></div></div></nav> <div class="flex-1 max-h-full overflow-y-auto">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Layout as default
};
//# sourceMappingURL=_layout.svelte.js.map

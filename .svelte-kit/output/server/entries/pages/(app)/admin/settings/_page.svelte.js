import { c as create_ssr_component, p as getContext, b as subscribe, f as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { t as tick } from "../../../../../chunks/scheduler.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { c as config } from "../../../../../chunks/index3.js";
import { a as getBackendConfig } from "../../../../../chunks/index7.js";
import "file-saver";
import "../../../../../chunks/index5.js";
import "dequal";
import "../../../../../chunks/create.js";
import "dompurify";
import "marked";
/* empty css                                                        */
/* empty css                                                              */
/* empty css                                                                */
import "postcss";
/* empty css                                                                */
import "sortablejs";
import "socket.io-client";
const General = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { saveHandler } = $$props;
  if ($$props.saveHandler === void 0 && $$bindings.saveHandler && saveHandler !== void 0) $$bindings.saveHandler(saveHandler);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form class="flex flex-col h-full justify-between space-y-3 text-sm"><div class="mt-0.5 space-y-3 overflow-y-scroll scrollbar-hidden h-full">${``}</div> <div class="flex justify-end pt-3 text-sm font-medium"><button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full" type="submit">${escape($i18n.t("Save"))}</button></div></form>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  $$unsubscribe_i18n();
  return `<div class="flex flex-col lg:flex-row w-full h-full pb-2 lg:space-x-4"><div id="admin-settings-tabs-container" class="tabs flex flex-row overflow-x-auto gap-2.5 max-w-full lg:gap-1 lg:flex-col lg:flex-none lg:w-40 dark:text-gray-200 text-sm font-medium text-left scrollbar-none"><button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 lg:flex-none flex text-right transition " + escape(
    "",
    true
  )}"><div class="self-center mr-2" data-svelte-h="svelte-1e9u9pw"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-1.081a.5.5 0 0 1 .67.033l.774.775a.5.5 0 0 1 .034.67l-1.08 1.32c.25.417.44.873.561 1.357l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l1.082 1.322a.5.5 0 0 1-.034.67l-.774.774a.5.5 0 0 1-.67.033l-1.322-1.08c-.416.25-.872.44-1.356.561l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a4.973 4.973 0 0 1-1.356-.562L4.108 13.37a.5.5 0 0 1-.67-.033l-.774-.775a.5.5 0 0 1-.034-.67l1.08-1.32a4.971 4.971 0 0 1-.561-1.357l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356L2.629 4.107a.5.5 0 0 1 .034-.67l.774-.774a.5.5 0 0 1 .67-.033L5.43 3.71a4.97 4.97 0 0 1 1.356-.561l.17-1.699ZM6 8c0 .538.212 1.026.558 1.385l.057.057a2 2 0 0 0 2.828-2.828l-.058-.056A2 2 0 0 0 6 8Z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("General"))}</div></button> <button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition " + escape(
    " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
    true
  )}"><div class="self-center mr-2" data-svelte-h="svelte-1xixjje"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path d="M1 9.5A3.5 3.5 0 0 0 4.5 13H12a3 3 0 0 0 .917-5.857 2.503 2.503 0 0 0-3.198-3.019 3.5 3.5 0 0 0-6.628 2.171A3.5 3.5 0 0 0 1 9.5Z"></path></svg></div> <div class="self-center">${escape($i18n.t("Connections"))}</div></button>       <button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition " + escape(
    " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
    true
  )}"><div class="self-center mr-2" data-svelte-h="svelte-sf0iba"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path d="M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z"></path><path d="M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z"></path></svg></div> <div class="self-center">${escape($i18n.t("Audio"))}</div></button>   <button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition " + escape(
    " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
    true
  )}"><div class="self-center mr-2" data-svelte-h="svelte-35c53k"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path d="M8 7c3.314 0 6-1.343 6-3s-2.686-3-6-3-6 1.343-6 3 2.686 3 6 3Z"></path><path d="M8 8.5c1.84 0 3.579-.37 4.914-1.037A6.33 6.33 0 0 0 14 6.78V8c0 1.657-2.686 3-6 3S2 9.657 2 8V6.78c.346.273.72.5 1.087.683C4.42 8.131 6.16 8.5 8 8.5Z"></path><path d="M8 12.5c1.84 0 3.579-.37 4.914-1.037.366-.183.74-.41 1.086-.684V12c0 1.657-2.686 3-6 3s-6-1.343-6-3v-1.22c.346.273.72.5 1.087.683C4.42 12.131 6.16 12.5 8 12.5Z"></path></svg></div> <div class="self-center">${escape($i18n.t("Database"))}</div></button></div> <div class="flex-1 mt-3 lg:mt-0 overflow-y-scroll pr-1 scrollbar-hidden">${`${validate_component(General, "General").$$render(
    $$result,
    {
      saveHandler: async () => {
        toast.success($i18n.t("Settings saved successfully!"));
        await tick();
        await config.set(await getBackendConfig());
      }
    },
    {},
    {}
  )}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

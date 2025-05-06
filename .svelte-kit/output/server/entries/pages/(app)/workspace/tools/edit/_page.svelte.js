import { c as create_ssr_component, b as subscribe, p as getContext, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { S as Spinner } from "../../../../../../chunks/Spinner.js";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
/* empty css                                                                   */
import "dompurify";
import "marked";
/* empty css                                                           */
import "../../../../../../chunks/index3.js";
import "../../../../../../chunks/index5.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_i18n;
  $$unsubscribe_page = subscribe(page, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_page();
  $$unsubscribe_i18n();
  return `${`<div class="flex items-center justify-center h-full"><div class="pb-16">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div></div>`}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

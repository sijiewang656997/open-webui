import { c as create_ssr_component, b as subscribe, p as getContext } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/index3.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "dompurify";
import "marked";
/* empty css                                                           */
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $$unsubscribe_i18n;
  $$unsubscribe_page = subscribe(page, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_page();
  $$unsubscribe_i18n();
  return `${``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

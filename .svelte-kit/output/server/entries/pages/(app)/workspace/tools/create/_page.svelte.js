import { c as create_ssr_component, p as getContext, b as subscribe } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
/* empty css                                                                   */
import "dompurify";
import "marked";
/* empty css                                                           */
import "../../../../../../chunks/index3.js";
import "../../../../../../chunks/index5.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_i18n();
  return `${``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

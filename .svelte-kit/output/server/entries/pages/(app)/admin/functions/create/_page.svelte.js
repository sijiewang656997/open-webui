import { c as create_ssr_component, b as subscribe, p as getContext } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../../chunks/client.js";
import { a as settings, c as config } from "../../../../../../chunks/index3.js";
/* empty css                                                                   */
import "dompurify";
import "marked";
import "../../../../../../chunks/index5.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $$unsubscribe_config;
  let $$unsubscribe_i18n;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  return `${``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

import { c as create_ssr_component, b as subscribe, p as getContext } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { c as config, W as WEBUI_NAME } from "../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_config;
  let $$unsubscribe_i18n;
  let $$unsubscribe_WEBUI_NAME;
  $$unsubscribe_config = subscribe(config, (value) => value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  return `${``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

import { c as create_ssr_component, b as subscribe, p as getContext, f as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { u as user, W as WEBUI_NAME, j as showSidebar } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  let $i18n, $$unsubscribe_i18n;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $$unsubscribe_showSidebar;
  let $$unsubscribe_page;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  $$unsubscribe_user();
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_showSidebar();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-l0sfb_START -->${$$result.title = `<title> ${escape($i18n.t("Admin Panel"))} | ${escape($WEBUI_NAME)} </title>`, ""}<!-- HEAD_svelte-l0sfb_END -->`, ""} ${``}`;
});
export {
  Layout as default
};
//# sourceMappingURL=_layout.svelte.js.map

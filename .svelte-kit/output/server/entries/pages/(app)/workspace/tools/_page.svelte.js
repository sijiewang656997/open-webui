import { c as create_ssr_component, b as subscribe, p as getContext, v as validate_component, f as escape } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import fileSaver from "file-saver";
import { W as WEBUI_NAME, u as user, c as config } from "../../../../../chunks/index3.js";
import "../../../../../chunks/client.js";
import "dompurify";
import "marked";
/* empty css                                                                */
import "dequal";
import "../../../../../chunks/create.js";
import "../../../../../chunks/index5.js";
/* empty css                                                        */
import { S as Spinner } from "../../../../../chunks/Spinner.js";
const Tools = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $$unsubscribe_user;
  let $$unsubscribe_config;
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => value);
  const { saveAs } = fileSaver;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-3w621p_START -->${$$result.title = `<title> ${escape($i18n.t("Tools"))} | ${escape($WEBUI_NAME)} </title>`, ""}<!-- HEAD_svelte-3w621p_END -->`, ""} ${`<div class="w-full h-full flex justify-center items-center">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div>`}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_user();
  $$unsubscribe_config();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Tools, "Tools").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

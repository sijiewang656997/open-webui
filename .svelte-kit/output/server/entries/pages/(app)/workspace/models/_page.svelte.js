import { c as create_ssr_component, b as subscribe, p as getContext, g as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { a as settings, c as config, W as WEBUI_NAME, u as user, m as models } from "../../../../../chunks/index3.js";
import "marked";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "sortablejs";
import "file-saver";
import "../../../../../chunks/client.js";
import "dequal";
import "../../../../../chunks/create.js";
import "dompurify";
import "../../../../../chunks/index5.js";
/* empty css                                                                */
import { S as Spinner } from "../../../../../chunks/Spinner.js";
const Models = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $$unsubscribe_config;
  let $i18n, $$unsubscribe_i18n;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $$unsubscribe_user;
  let $$unsubscribe__models;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe__models = subscribe(models, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-rjeobo_START -->${$$result.title = `<title> ${escape($i18n.t("Models"))} | ${escape($WEBUI_NAME)} </title>`, ""}<!-- HEAD_svelte-rjeobo_END -->`, ""} ${`<div class="w-full h-full flex justify-center items-center">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div>`}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_user();
  $$unsubscribe__models();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $$unsubscribe_config;
  let $models, $$unsubscribe_models;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_models();
  return `${$models !== null ? `${validate_component(Models, "Models").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

import { c as create_ssr_component, p as getContext, b as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "onnxruntime-web";
import "@huggingface/transformers";
import "../../../../../chunks/index3.js";
import "dompurify";
import "marked";
import "file-saver";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dequal";
import "../../../../../chunks/create.js";
const Evaluations = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$unsubscribe_i18n();
  return `${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Evaluations, "Evaluations").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

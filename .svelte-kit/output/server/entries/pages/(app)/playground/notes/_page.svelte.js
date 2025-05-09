import { c as create_ssr_component, p as getContext, b as subscribe, a as add_attribute, v as validate_component, f as escape } from "../../../../../chunks/ssr.js";
import { R as RichTextInput } from "../../../../../chunks/RichTextInput.js";
import { M as Mic } from "../../../../../chunks/Mic.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../chunks/index3.js";
import "../../../../../chunks/index5.js";
import "../../../../../chunks/AutoCompletion.js";
import { T as Tooltip } from "../../../../../chunks/Tooltip.js";
const Notes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let name = "";
  let content = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="relative flex-1 w-full h-full flex justify-center overflow-auto px-5">${``} <div class="${"w-full flex flex-col gap-2 " + escape("", true)}"><div class="shrink-0 w-full flex justify-between items-center"><div class="w-full"><input class="w-full text-2xl font-medium bg-transparent outline-hidden" type="text"${add_attribute("placeholder", $i18n.t("Title"), 0)} required${add_attribute("value", name, 0)}></div></div> <div class="flex-1 w-full h-full">${validate_component(RichTextInput, "RichTextInput").$$render(
      $$result,
      {
        className: "input-prose-sm",
        placeholder: $i18n.t("Write something..."),
        preserveBreaks: true,
        value: content
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="absolute bottom-0 left-0 right-0 p-5 max-w-full flex justify-end"><div class="flex gap-0.5 justify-end w-full">${`${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Voice Input") }, {}, {
      default: () => {
        return `<button class="cursor-pointer p-2.5 flex rounded-full hover:bg-gray-100 dark:hover:bg-gray-850 transition shadow-xl" type="button">${validate_component(Mic, "Mic").$$render($$result, { className: "size-4" }, {}, {})}</button>`;
      }
    })}`} </div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Notes, "Notes").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

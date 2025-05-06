import { c as create_ssr_component, b as subscribe, p as getContext, v as validate_component, a as add_attribute, g as escape } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../chunks/client.js";
import { c as config, a as settings, u as user, m as models } from "../../../../../chunks/index3.js";
import "../../../../../chunks/index5.js";
import { S as Selector } from "../../../../../chunks/Selector.js";
const Completions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_config;
  let $$unsubscribe_settings;
  let $$unsubscribe_user;
  let $models, $$unsubscribe_models;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_config = subscribe(config, (value) => value);
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let selectedModelId = "";
  let textCompletionAreaElement;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-col justify-between w-full overflow-y-auto h-full"><div class="mx-auto w-full md:px-0 h-full"><div class="flex flex-col h-full px-4"><div class="flex flex-col justify-between mb-1 gap-1"><div class="flex flex-col gap-1 w-full"><div class="flex w-full"><div class="overflow-hidden w-full"><div class="max-w-full">${validate_component(Selector, "Selector").$$render(
      $$result,
      {
        placeholder: $i18n.t("Select a model"),
        items: $models.map((model) => ({
          value: model.id,
          label: model.name,
          model
        })),
        value: selectedModelId
      },
      {
        value: ($$value) => {
          selectedModelId = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div></div></div> <div class="pt-0.5 pb-2.5 flex flex-col justify-between w-full flex-auto overflow-auto h-0" id="messages-container"><div class="h-full w-full flex flex-col"><div class="flex-1"><textarea id="text-completion-textarea" class="w-full h-full p-3 bg-transparent border border-gray-100 dark:border-gray-850 outline-hidden resize-none rounded-lg text-sm"${add_attribute("placeholder", $i18n.t("You're a helpful assistant."), 0)}${add_attribute("this", textCompletionAreaElement, 0)}>${escape("")}</textarea></div></div></div> <div class="pb-3 flex justify-end">${`<button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full">${escape($i18n.t("Run"))}</button>`}</div></div></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_config();
  $$unsubscribe_settings();
  $$unsubscribe_user();
  $$unsubscribe_models();
  $$unsubscribe_i18n();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Completions, "Completions").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

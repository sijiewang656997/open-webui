import { c as create_ssr_component, p as getContext, b as subscribe, g as escape, a as add_attribute, v as validate_component } from "../../../../../../chunks/ssr.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../../../chunks/index3.js";
import { A as AccessControl } from "../../../../../../chunks/AccessControl.js";
const CreateKnowledgeBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let name = "";
  let accessControl = null;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="w-full max-h-full"><button class="flex space-x-1"><div class="self-center" data-svelte-h="svelte-1klo87r"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd"></path></svg></div> <div class="self-center font-medium text-sm">${escape($i18n.t("Back"))}</div></button> <form class="flex flex-col max-w-lg mx-auto mt-10 mb-10"><div class="w-full flex flex-col justify-center"><div class="text-2xl font-medium font-primary mb-2.5">${escape($i18n.t("Create a knowledge base"))}</div> <div class="w-full flex flex-col gap-2.5"><div class="w-full"><div class="text-sm mb-2">${escape($i18n.t("What are you working on?"))}</div> <div class="w-full mt-1"><input class="w-full rounded-lg py-2 px-4 text-sm bg-gray-50 dark:text-gray-300 dark:bg-gray-850 outline-hidden" type="text"${add_attribute("placeholder", $i18n.t("Name your knowledge base"), 0)} required${add_attribute("value", name, 0)}></div></div> <div><div class="text-sm mb-2">${escape($i18n.t("What are you trying to achieve?"))}</div> <div class="w-full mt-1"><textarea class="w-full resize-none rounded-lg py-2 px-4 text-sm bg-gray-50 dark:text-gray-300 dark:bg-gray-850 outline-hidden" rows="4"${add_attribute("placeholder", $i18n.t("Describe your knowledge base and objectives"), 0)} required>${escape("")}</textarea></div></div></div></div> <div class="mt-2"><div class="px-3 py-2 bg-gray-50 dark:bg-gray-950 rounded-lg">${validate_component(AccessControl, "AccessControl").$$render(
      $$result,
      {
        accessRoles: ["read", "write"],
        accessControl
      },
      {
        accessControl: ($$value) => {
          accessControl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="flex justify-end mt-2"><div><button class="${"text-sm px-4 py-2 transition rounded-lg " + escape(
      " bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800",
      true
    ) + " flex"}" type="submit" ${""}><div class="self-center font-medium">${escape($i18n.t("Create Knowledge"))}</div> ${``}</button></div></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(CreateKnowledgeBase, "CreateKnowledgeBase").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

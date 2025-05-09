import { c as create_ssr_component, a as add_attribute, g as escape, p as getContext, b as subscribe, v as validate_component } from "../../../../../../chunks/ssr.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { p as WEBUI_API_BASE_URL, G as prompts } from "../../../../../../chunks/index3.js";
import { T as Tooltip } from "../../../../../../chunks/Tooltip.js";
import { M as Modal } from "../../../../../../chunks/Modal.js";
import { A as AccessControl } from "../../../../../../chunks/AccessControl.js";
const createNewPrompt = async (token, prompt) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/prompts/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...prompt,
      command: `/${prompt.command}`
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    error = err.detail;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const getPrompts = async (token = "") => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/prompts/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
  }).catch((err) => {
    error = err.detail;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { rows = 1 } = $$props;
  let { required = false } = $$props;
  let { className = "w-full rounded-lg px-3 py-2 text-sm bg-gray-50 dark:text-gray-300 dark:bg-gray-850 outline-hidden  h-full" } = $$props;
  let textareaElement;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0) $$bindings.rows(rows);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<textarea${add_attribute("placeholder", placeholder, 0)}${add_attribute("class", className, 0)} style="field-sizing: content;"${add_attribute("rows", rows, 0)} ${required ? "required" : ""}${add_attribute("this", textareaElement, 0)}>${escape(value || "")}</textarea>`;
});
const LockClosed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg>`;
});
const AccessControlModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  let { accessControl = null } = $$props;
  let { accessRoles = ["read"] } = $$props;
  let { onChange = () => {
  } } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.accessControl === void 0 && $$bindings.accessControl && accessControl !== void 0) $$bindings.accessControl(accessControl);
  if ($$props.accessRoles === void 0 && $$bindings.accessRoles && accessRoles !== void 0) $$bindings.accessRoles(accessRoles);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "sm", show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div><div class="flex justify-between dark:text-gray-100 px-5 pt-3 pb-1"><div class="text-lg font-medium self-center font-primary">${escape($i18n.t("Access Control"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="w-full px-5 pb-4 dark:text-white">${validate_component(AccessControl, "AccessControl").$$render(
            $$result,
            { onChange, accessRoles, accessControl },
            {
              accessControl: ($$value) => {
                accessControl = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const PromptEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let { onSubmit } = $$props;
  let { edit = false } = $$props;
  let { prompt = null } = $$props;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let title = "";
  let command = "";
  let content = "";
  let accessControl = null;
  let showAccessControlModal = false;
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0) $$bindings.onSubmit(onSubmit);
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0) $$bindings.edit(edit);
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0) $$bindings.prompt(prompt);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (!edit) {
        command = "";
      }
    }
    $$rendered = `${validate_component(AccessControlModal, "AccessControlModal").$$render(
      $$result,
      {
        accessRoles: ["read", "write"],
        show: showAccessControlModal,
        accessControl
      },
      {
        show: ($$value) => {
          showAccessControlModal = $$value;
          $$settled = false;
        },
        accessControl: ($$value) => {
          accessControl = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="w-full max-h-full flex justify-center"><form class="flex flex-col w-full mb-10"><div class="my-2">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: `${$i18n.t("Only alphanumeric characters and hyphens are allowed")} - ${$i18n.t('Activate this command by typing "/{{COMMAND}}" to chat input.', { COMMAND: command })}`,
        placement: "bottom-start"
      },
      {},
      {
        default: () => {
          return `<div class="flex flex-col w-full"><div class="flex items-center"><input class="text-2xl font-semibold w-full bg-transparent outline-hidden"${add_attribute("placeholder", $i18n.t("Title"), 0)} required${add_attribute("value", title, 0)}> <div class="self-center shrink-0"><button class="bg-gray-50 hover:bg-gray-100 text-black dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-white transition px-2 py-1 rounded-full flex gap-1 items-center" type="button">${validate_component(LockClosed, "LockClosed").$$render(
            $$result,
            {
              strokeWidth: "2.5",
              className: "size-3.5"
            },
            {},
            {}
          )} <div class="text-sm font-medium shrink-0">${escape($i18n.t("Access"))}</div></button></div></div> <div class="flex gap-0.5 items-center text-xs text-gray-500"><div class="" data-svelte-h="svelte-1x25scu">/</div> <input class="w-full bg-transparent outline-hidden"${add_attribute("placeholder", $i18n.t("Command"), 0)} required ${edit ? "disabled" : ""}${add_attribute("value", command, 0)}></div></div>`;
        }
      }
    )}</div> <div class="my-2"><div class="flex w-full justify-between"><div class="self-center text-sm font-semibold">${escape($i18n.t("Prompt Content"))}</div></div> <div class="mt-2"><div>${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        className: "text-sm w-full bg-transparent outline-hidden overflow-y-hidden resize-none",
        placeholder: $i18n.t("Write a summary in 50 words that summarizes [topic or keyword]."),
        rows: 6,
        required: true,
        value: content
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="text-xs text-gray-400 dark:text-gray-500">ⓘ ${escape($i18n.t("Format your variables using brackets like this:"))} <span class="text-gray-600 dark:text-gray-300 font-medium">${escape("{{")}${escape($i18n.t("variable"))}${escape("}}")}</span>.
					${escape($i18n.t("Make sure to enclose them with"))} <span class="text-gray-600 dark:text-gray-300 font-medium">${escape("{{")}</span> ${escape($i18n.t("and"))} <span class="text-gray-600 dark:text-gray-300 font-medium">${escape("}}")}</span>.</div> <div class="text-xs text-gray-400 dark:text-gray-500">${escape($i18n.t("Utilize"))}<span class="text-gray-600 dark:text-gray-300 font-medium">${escape(` {{CLIPBOARD}}`)}</span> ${escape($i18n.t("variable to have them replaced with clipboard content."))}</div></div></div> <div class="my-4 flex justify-end pb-20"><button class="${"text-sm w-full lg:w-fit px-4 py-2 transition rounded-lg " + escape(
      "bg-black hover:bg-gray-900 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black",
      true
    ) + " flex w-full justify-center"}" type="submit" ${""}><div class="self-center font-medium">${escape($i18n.t("Save & Create"))}</div> ${``}</button></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let prompt = null;
  const onSubmit = async (_prompt) => {
    const prompt2 = await createNewPrompt(localStorage.token, _prompt).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    if (prompt2) {
      toast.success($i18n.t("Prompt created successfully"));
      await prompts.set(await getPrompts(localStorage.token));
      await goto();
    }
  };
  $$unsubscribe_i18n();
  return `${validate_component(PromptEditor, "PromptEditor").$$render($$result, { prompt, onSubmit }, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

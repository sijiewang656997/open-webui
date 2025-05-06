import { c as create_ssr_component, a as add_attribute, p as getContext, b as subscribe, g as escape, e as each, v as validate_component } from "../../../../chunks/ssr.js";
import { t as tick } from "../../../../chunks/scheduler.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import { c as config, a as settings, u as user, m as models } from "../../../../chunks/index3.js";
import "../../../../chunks/index5.js";
import { C as Collapsible } from "../../../../chunks/Collapsible.js";
import { C as ChevronUp } from "../../../../chunks/ChevronUp.js";
import { P as Pencil } from "../../../../chunks/Pencil.js";
const Cog6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>`;
});
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { message } = $$props;
  let { idx } = $$props;
  let { onDelete } = $$props;
  let textAreaElement;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.idx === void 0 && $$bindings.idx && idx !== void 0) $$bindings.idx(idx);
  if ($$props.onDelete === void 0 && $$bindings.onDelete && onDelete !== void 0) $$bindings.onDelete(onDelete);
  $$unsubscribe_i18n();
  return `<div class="flex gap-2 group"><div class="flex items-start pt-1"><div class="px-2 py-1 text-sm font-semibold uppercase min-w-[6rem] text-left rounded-lg transition">${escape($i18n.t(message.role))}</div></div> <div class="flex-1">  <textarea id="${escape(message.role, true) + "-" + escape(idx, true) + "-textarea"}" class="w-full bg-transparent outline-hidden rounded-lg p-2 text-sm resize-none overflow-hidden"${add_attribute(
    "placeholder",
    $i18n.t(`Enter {{role}} message here`, {
      role: message.role === "user" ? $i18n.t("a user") : $i18n.t("an assistant")
    }),
    0
  )} rows="1"${add_attribute("this", textAreaElement, 0)}>${escape(message.content || "")}</textarea></div> <div class="pt-1"><button class="group-hover:text-gray-500 dark:text-gray-900 dark:hover:text-gray-300 transition" data-svelte-h="svelte-7qrvne"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg></button></div></div>`;
});
const Messages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getContext("i18n");
  let { messages = [] } = $$props;
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0) $$bindings.messages(messages);
  return `<div class="py-3 space-y-3">${each(messages, (message, idx) => {
    return `${validate_component(Message, "Message").$$render(
      $$result,
      {
        message,
        idx,
        onDelete: () => {
          messages = messages.filter((message2, messageIdx) => messageIdx !== idx);
        }
      },
      {},
      {}
    )}`;
  })}</div>`;
});
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let { side = "right" } = $$props;
  let { width = "200px" } = $$props;
  let { className = "" } = $$props;
  let { duration = 100 } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  return `${show ? ` <div class="absolute z-20 top-0 right-0 left-0 bottom-0 bg-white/20 dark:bg-black/5 w-full min-h-full h-full flex justify-center overflow-hidden overscroll-contain"></div> <div class="${"absolute z-30 shadow-xl " + escape(side === "right" ? "right-0" : "left-0", true) + " top-0 bottom-0"}"><div class="${escape(className, true) + " h-full"}" style="${"width: " + escape(show ? width : "0px", true)}">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
});
const ArrowRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>`;
});
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let systemTextareaElement;
  let messagesContainerElement;
  let showSystem = false;
  let showSettings = false;
  let system = "";
  let messages = [];
  const resizeSystemTextarea = async () => {
    await tick();
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (showSystem) {
        resizeSystemTextarea();
      }
    }
    $$rendered = `<div class="flex flex-col justify-between w-full overflow-y-auto h-full"><div class="mx-auto w-full md:px-0 h-full relative">${validate_component(Sidebar, "Sidebar").$$render(
      $$result,
      {
        className: " bg-white dark:bg-gray-900",
        width: "300px",
        show: showSettings
      },
      {
        show: ($$value) => {
          showSettings = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="flex flex-col px-5 py-3 text-sm"><div class="flex justify-between items-center mb-2"><div class="font-medium text-base" data-svelte-h="svelte-1dw76ku">Settings</div> <div class="translate-x-1.5"><button class="p-1.5 bg-transparent hover:bg-white/5 transition rounded-lg">${validate_component(ArrowRight, "ArrowRight").$$render($$result, { className: "size-3", strokeWidth: "2.5" }, {}, {})}</button></div></div> <div class="mt-1"><div><div class="text-xs font-medium mb-1" data-svelte-h="svelte-vz1bvh">Model</div> <div class="w-full"><select class="w-full bg-transparent border border-gray-100 dark:border-gray-850 rounded-lg py-1 px-2 -mx-0.5 text-sm outline-hidden">${each($models, (model) => {
            return `<option${add_attribute("value", model.id, 0)} class="bg-gray-50 dark:bg-gray-700">${escape(model.name)}</option>`;
          })}</select></div></div></div></div>`;
        }
      }
    )} <div class="flex flex-col h-full px-3.5"><div class="flex w-full items-start gap-1.5">${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        className: "w-full flex-1",
        buttonClassName: "w-full rounded-lg text-sm border border-gray-100 dark:border-gray-850 w-full py-1 px-1.5",
        grow: true,
        open: showSystem
      },
      {
        open: ($$value) => {
          showSystem = $$value;
          $$settled = false;
        }
      },
      {
        content: () => {
          return `<div slot="content"><div class="pt-1 px-1.5"><textarea class="w-full h-full bg-transparent resize-none outline-hidden text-sm"${add_attribute("placeholder", $i18n.t("You're a helpful assistant."), 0)} rows="4"${add_attribute("this", systemTextareaElement, 0)}>${escape("")}</textarea></div></div>`;
        },
        default: () => {
          return `<div class="flex gap-2 justify-between items-center"><div class="shrink-0 font-medium ml-1.5">${escape($i18n.t("System Instructions"))}</div> ${!showSystem ? `<div class="flex-1 text-gray-500 line-clamp-1">${escape(system)}</div>` : ``} <div class="shrink-0"><button class="p-1.5 bg-transparent hover:bg-white/5 transition rounded-lg">${showSystem ? `${validate_component(ChevronUp, "ChevronUp").$$render($$result, { className: "size-3.5" }, {}, {})}` : `${validate_component(Pencil, "Pencil").$$render($$result, { className: "size-3.5" }, {}, {})}`}</button></div></div>`;
        }
      }
    )} <div class="translate-y-1"><button class="p-1.5 bg-transparent hover:bg-white/5 transition rounded-lg">${validate_component(Cog6, "Cog6").$$render($$result, {}, {}, {})}</button></div></div> <div class="pb-2.5 flex flex-col justify-between w-full flex-auto overflow-auto h-0" id="messages-container"${add_attribute("this", messagesContainerElement, 0)}><div class="h-full w-full flex flex-col"><div class="flex-1 p-1">${validate_component(Messages, "Messages").$$render(
      $$result,
      { messages },
      {
        messages: ($$value) => {
          messages = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div> <div class="pb-3"><div class="text-xs font-medium text-gray-500 px-2 py-1">${escape(selectedModelId)}</div> <div class="border border-gray-100 dark:border-gray-850 w-full px-3 py-2.5 rounded-xl"><div class="py-0.5">  <textarea class="w-full h-full bg-transparent resize-none outline-hidden text-sm"${add_attribute(
      "placeholder",
      $i18n.t(`Enter {{role}} message here`, {
        role: $i18n.t("a user")
      }),
      0
    )} rows="2">${escape("")}</textarea></div> <div class="flex justify-between"><div><button class="px-3.5 py-1.5 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-gray-200 transition rounded-lg">${`${escape($i18n.t("User"))}`}</button></div> <div>${`<button ${"disabled"} class="px-3.5 py-1.5 text-sm font-medium disabled:bg-gray-50 dark:disabled:hover:bg-gray-850 disabled:cursor-not-allowed bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-850 dark:hover:bg-gray-800 dark:text-gray-200 transition rounded-lg">${escape($i18n.t("Add"))}</button> <button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-lg">${escape($i18n.t("Run"))}</button>`}</div></div></div></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_config();
  $$unsubscribe_settings();
  $$unsubscribe_user();
  $$unsubscribe_models();
  $$unsubscribe_i18n();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Chat, "Chat").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

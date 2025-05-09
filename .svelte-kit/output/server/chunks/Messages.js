import { c as create_ssr_component, b as subscribe, l as createEventDispatcher, p as getContext, g as escape, a as add_attribute, e as each, v as validate_component, o as onDestroy, w as null_to_empty } from "./ssr.js";
import { t as tick } from "./scheduler.js";
import { v4 } from "uuid";
import { B as tags, m as models, p as WEBUI_API_BASE_URL, o as mobile, d as chatId, a as settings, c as config, T as TTSWorker, u as user, t as temporaryChatEnabled, g as WEBUI_BASE_URL, b as currentChatPage, z as chats } from "./index3.js";
import { a as toast } from "./Toaster.svelte_svelte_type_style_lang.js";
import { u as updateChatById, c as getChatList } from "./index8.js";
import { a as createMessagesList, f as formatDate, s as sanitizeResponseContent } from "./index5.js";
import dayjs from "dayjs";
import "dompurify";
import { marked } from "marked";
import "dayjs/locale/af.js";
import "dayjs/locale/am.js";
import "dayjs/locale/ar.js";
import "dayjs/locale/az.js";
import "dayjs/locale/be.js";
import "dayjs/locale/bg.js";
import "dayjs/locale/bi.js";
import "dayjs/locale/bm.js";
import "dayjs/locale/bn.js";
import "dayjs/locale/bo.js";
import "dayjs/locale/br.js";
import "dayjs/locale/bs.js";
import "dayjs/locale/ca.js";
import "dayjs/locale/cs.js";
import "dayjs/locale/cv.js";
import "dayjs/locale/cy.js";
import "dayjs/locale/da.js";
import "dayjs/locale/de.js";
import "dayjs/locale/dv.js";
import "dayjs/locale/el.js";
import "dayjs/locale/en.js";
import "dayjs/locale/eo.js";
import "dayjs/locale/es.js";
import "dayjs/locale/eu.js";
import "dayjs/locale/fa.js";
import "dayjs/locale/fi.js";
import "dayjs/locale/fo.js";
import "dayjs/locale/fr.js";
import "dayjs/locale/fy.js";
import "dayjs/locale/ga.js";
import "dayjs/locale/gd.js";
import "dayjs/locale/gl.js";
import "dayjs/locale/gu.js";
import "dayjs/locale/he.js";
import "dayjs/locale/hi.js";
import "dayjs/locale/hr.js";
import "dayjs/locale/ht.js";
import "dayjs/locale/hu.js";
import "dayjs/locale/id.js";
import "dayjs/locale/is.js";
import "dayjs/locale/it.js";
import "dayjs/locale/ja.js";
import "dayjs/locale/jv.js";
import "dayjs/locale/ka.js";
import "dayjs/locale/kk.js";
import "dayjs/locale/km.js";
import "dayjs/locale/kn.js";
import "dayjs/locale/ko.js";
import "dayjs/locale/ku.js";
import "dayjs/locale/ky.js";
import "dayjs/locale/lb.js";
import "dayjs/locale/lo.js";
import "dayjs/locale/lt.js";
import "dayjs/locale/lv.js";
import "dayjs/locale/me.js";
import "dayjs/locale/mi.js";
import "dayjs/locale/mk.js";
import "dayjs/locale/ml.js";
import "dayjs/locale/mn.js";
import "dayjs/locale/mr.js";
import "dayjs/locale/ms.js";
import "dayjs/locale/mt.js";
import "dayjs/locale/my.js";
import "dayjs/locale/nb.js";
import "dayjs/locale/ne.js";
import "dayjs/locale/nl.js";
import "dayjs/locale/nn.js";
import "dayjs/locale/pl.js";
import "dayjs/locale/pt.js";
import "dayjs/locale/ro.js";
import "dayjs/locale/ru.js";
import "dayjs/locale/rw.js";
import "dayjs/locale/sd.js";
import "dayjs/locale/se.js";
import "dayjs/locale/si.js";
import "dayjs/locale/sk.js";
import "dayjs/locale/sl.js";
import "dayjs/locale/sq.js";
import "dayjs/locale/sr.js";
import "dayjs/locale/ss.js";
import "dayjs/locale/sv.js";
import "dayjs/locale/sw.js";
import "dayjs/locale/ta.js";
import "dayjs/locale/te.js";
import "dayjs/locale/tet.js";
import "dayjs/locale/tg.js";
import "dayjs/locale/th.js";
import "dayjs/locale/tk.js";
import "dayjs/locale/tlh.js";
import "dayjs/locale/tr.js";
import "dayjs/locale/tzl.js";
import "dayjs/locale/tzm.js";
import "dayjs/locale/uk.js";
import "dayjs/locale/ur.js";
import "dayjs/locale/uz.js";
import "dayjs/locale/vi.js";
import "dayjs/locale/yo.js";
import "dayjs/locale/zh.js";
import "dayjs/locale/et.js";
import "dayjs/plugin/duration.js";
import "dayjs/plugin/relativeTime.js";
/* empty css                                            */
/* empty css                                    */
import { a as Info, b as CodeBlock, M as Markdown, P as ProfileImage, N as Name, I as Image, F as FileItem, L as Loader } from "./Markdown.js";
import "file-saver";
import "panzoom";
import "katex";
import "katex/contrib/mhchem";
import { T as Table } from "./Table.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { T as Tooltip } from "./Tooltip.js";
import { X as XMark } from "./XMark.js";
import { S as Spinner } from "./Spinner.js";
import { C as ChevronDown } from "./ChevronDown.js";
import { C as ChevronUp } from "./ChevronUp.js";
import { C as Collapsible } from "./Collapsible.js";
import { C as ConfirmDialog } from "./ConfirmDialog.js";
import { M as Modal } from "./Modal.js";
import { B as Badge } from "./Badge.js";
import { C as Check } from "./Check.js";
import { E as EllipsisHorizontal } from "./EllipsisHorizontal.js";
const TagInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $$unsubscribe_tags;
  $$unsubscribe_tags = subscribe(tags, (value) => value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { label = "" } = $$props;
  let showTagInput = false;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  $$unsubscribe_i18n();
  $$unsubscribe_tags();
  return `<div class="${"px-0.5 flex " + escape("", true)}">${``} <button class="cursor-pointer self-center p-0.5 flex h-fit items-center dark:hover:bg-gray-700 rounded-full transition border dark:border-gray-600 border-dashed" type="button"${add_attribute("aria-label", $i18n.t("Add Tag"), 0)}><div class="m-auto self-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="${"w-3 h-3 " + escape("", true) + " transition-all transform"}"><path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"></path></svg></div></button> ${label && !showTagInput ? `<span class="text-xs pl-2 self-center">${escape(label)}</span>` : ``}</div>`;
});
const TagList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { tags: tags2 = [] } = $$props;
  if ($$props.tags === void 0 && $$bindings.tags && tags2 !== void 0) $$bindings.tags(tags2);
  return `${each(tags2, (tag) => {
    return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: tag.name }, {}, {
      default: () => {
        return `<div class="relative group/tags px-1.5 py-[0.2px] gap-0.5 flex justify-between h-fit max-h-fit w-fit items-center rounded-full bg-gray-500/20 text-gray-700 dark:text-gray-200 transition cursor-pointer"><div class="text-[0.7rem] font-medium self-center line-clamp-1 w-fit">${escape(tag.name)}</div> <div class="absolute invisible right-0.5 group-hover/tags:visible transition"><button class="rounded-full border bg-white dark:bg-gray-700 h-full flex self-center cursor-pointer" type="button">${validate_component(XMark, "XMark").$$render($$result, { className: "size-3", strokeWidth: "2.5" }, {}, {})}</button> </div></div> `;
      }
    })}`;
  })}`;
});
const Tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { tags: tags2 = [] } = $$props;
  if ($$props.tags === void 0 && $$bindings.tags && tags2 !== void 0) $$bindings.tags(tags2);
  $$unsubscribe_i18n();
  return `<div class="flex flex-row flex-wrap gap-1 line-clamp-1">${validate_component(TagList, "TagList").$$render($$result, { tags: tags2 }, {}, {})} ${validate_component(TagInput, "TagInput").$$render(
    $$result,
    {
      label: tags2.length == 0 ? $i18n.t("Add Tags") : ""
    },
    {},
    {}
  )}</div>`;
});
const Skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "md" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  return `<div class="w-full mt-2 mb-2"><div class="animate-pulse flex w-full"><div class="${escape(size === "md" ? "space-y-2" : "space-y-1.5", true) + " w-full"}"><div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm mr-14"}"></div> <div class="grid grid-cols-3 gap-4"><div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm col-span-2"}"></div> <div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm col-span-1"}"></div></div> <div class="grid grid-cols-4 gap-4"><div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm col-span-1"}"></div> <div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm col-span-2"}"></div> <div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm col-span-1 mr-4"}"></div></div> <div class="${escape(size === "md" ? "h-2" : "h-1.5", true) + " bg-gray-200 dark:bg-gray-600 rounded-sm"}"></div></div></div></div>`;
});
const RateComment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $$unsubscribe_models;
  $$unsubscribe_models = subscribe(models, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { message } = $$props;
  let { show = false } = $$props;
  let LIKE_REASONS = [
    "accurate_information",
    "followed_instructions_perfectly",
    "showcased_creativity",
    "positive_attitude",
    "attention_to_detail",
    "thorough_explanation",
    "other"
  ];
  let DISLIKE_REASONS = [
    "dont_like_the_style",
    "too_verbose",
    "not_helpful",
    "not_factually_correct",
    "didnt_fully_follow_instructions",
    "refused_when_it_shouldnt_have",
    "being_lazy",
    "other"
  ];
  let tags2 = [];
  let reasons = [];
  let selectedReason = null;
  let comment = "";
  let detailedRating = null;
  const init = () => {
    if (!selectedReason) {
      selectedReason = message?.annotation?.reason ?? "";
    }
    if (!comment) {
      comment = message?.annotation?.comment ?? "";
    }
    tags2 = (message?.annotation?.tags ?? []).map((tag) => ({ name: tag }));
    if (!detailedRating) {
      detailedRating = message?.annotation?.details?.rating ?? null;
    }
  };
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  {
    if (message?.annotation?.rating === 1) {
      reasons = LIKE_REASONS;
    } else if (message?.annotation?.rating === -1) {
      reasons = DISLIKE_REASONS;
    }
  }
  {
    if (message) {
      init();
    }
  }
  $$unsubscribe_i18n();
  $$unsubscribe_models();
  return `${message?.arena ? `<div class="text-xs font-medium pt-1.5 -mb-0.5">${escape($i18n.t('This response was generated by "{{model}}"', {
    model: message.selectedModelId
  }))}</div>` : ``} <div class="my-2.5 rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-850" id="${"message-feedback-" + escape(message.id, true)}"><div class="flex justify-between items-center"><div class="text-sm font-medium">${escape($i18n.t("How would you rate this response?"))}</div>  <button data-svelte-h="svelte-1ew22ui"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></button></div> <div class="w-full flex justify-center"><div class="relative w-fit"><div class="mt-1.5 w-fit flex gap-1 pb-5"> ${each(Array.from({ length: 10 }).map((_, i) => i + 1), (rating) => {
    return `<button class="${"size-7 text-sm border border-gray-100 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-850 " + escape(
      detailedRating === rating ? "bg-gray-100 dark:bg-gray-800" : "",
      true
    ) + " transition rounded-full disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-white dark:disabled:bg-gray-900"}" ${(message?.annotation?.rating === -1 ? rating > 5 : rating < 6) ? "disabled" : ""}>${escape(rating)} </button>`;
  })}</div> <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs"><div>1 - ${escape($i18n.t("Awful"))}</div> <div>10 - ${escape($i18n.t("Amazing"))}</div></div></div></div> <div>${reasons.length > 0 ? `<div class="text-sm mt-1.5 font-medium">${escape($i18n.t("Why?"))}</div> <div class="flex flex-wrap gap-1.5 text-sm mt-1.5">${each(reasons, (reason) => {
    return `<button class="${"px-3 py-0.5 border border-gray-100 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-850 " + escape(
      selectedReason === reason ? "bg-gray-100 dark:bg-gray-800" : "",
      true
    ) + " transition rounded-xl"}">${reason === "accurate_information" ? `${escape($i18n.t("Accurate information"))}` : `${reason === "followed_instructions_perfectly" ? `${escape($i18n.t("Followed instructions perfectly"))}` : `${reason === "showcased_creativity" ? `${escape($i18n.t("Showcased creativity"))}` : `${reason === "positive_attitude" ? `${escape($i18n.t("Positive attitude"))}` : `${reason === "attention_to_detail" ? `${escape($i18n.t("Attention to detail"))}` : `${reason === "thorough_explanation" ? `${escape($i18n.t("Thorough explanation"))}` : `${reason === "dont_like_the_style" ? `${escape($i18n.t("Don't like the style"))}` : `${reason === "too_verbose" ? `${escape($i18n.t("Too verbose"))}` : `${reason === "not_helpful" ? `${escape($i18n.t("Not helpful"))}` : `${reason === "not_factually_correct" ? `${escape($i18n.t("Not factually correct"))}` : `${reason === "didnt_fully_follow_instructions" ? `${escape($i18n.t("Didn't fully follow instructions"))}` : `${reason === "refused_when_it_shouldnt_have" ? `${escape($i18n.t("Refused when it shouldn't have"))}` : `${reason === "being_lazy" ? `${escape($i18n.t("Being lazy"))}` : `${reason === "other" ? `${escape($i18n.t("Other"))}` : `${escape(reason)}`}`}`}`}`}`}`}`}`}`}`}`}`}`} </button>`;
  })}</div>` : ``}</div> <div class="mt-2"><textarea class="w-full text-sm px-1 py-2 bg-transparent outline-hidden resize-none rounded-xl"${add_attribute("placeholder", $i18n.t("Feel free to add specific details"), 0)} rows="3">${escape(comment || "")}</textarea></div> <div class="mt-2 gap-1.5 flex justify-between"><div class="flex items-end group">${validate_component(Tags, "Tags").$$render($$result, { tags: tags2 }, {}, {})}</div> <button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full">${escape($i18n.t("Save"))}</button></div></div>`;
});
const MagnifyingGlass = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>`;
});
const WebSearchResults = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = { urls: [], query: "" } } = $$props;
  let state = false;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        className: "w-full space-y-1",
        open: state
      },
      {
        open: ($$value) => {
          state = $$value;
          $$settled = false;
        }
      },
      {
        content: () => {
          return `<div class="text-sm border border-gray-300/30 dark:border-gray-700/50 rounded-xl mb-1.5" slot="content">${status?.query ? `<a href="${"https://www.google.com/search?q=" + escape(status.query, true)}" target="_blank" class="flex w-full items-center p-3 px-4 border-b border-gray-300/30 dark:border-gray-700/50 group/item justify-between font-normal text-gray-800 dark:text-gray-300 no-underline"><div class="flex gap-2 items-center">${validate_component(MagnifyingGlass, "MagnifyingGlass").$$render($$result, {}, {}, {})} <div class="line-clamp-1">${escape(status.query)}</div></div> <div class="ml-1 text-white dark:text-gray-900 group-hover/item:text-gray-600 dark:group-hover/item:text-white transition" data-svelte-h="svelte-14xjows"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd"></path></svg></div></a>` : ``} ${each(status.urls, (url, urlIdx) => {
            return `<a${add_attribute("href", url, 0)} target="_blank" class="${"flex w-full items-center p-3 px-4 " + escape(
              urlIdx === status.urls.length - 1 ? "" : "border-b border-gray-300/30 dark:border-gray-700/50",
              true
            ) + " group/item justify-between font-normal text-gray-800 dark:text-gray-300"}"><div class="line-clamp-1">${escape(url)}</div> <div class="ml-1 text-white dark:text-gray-900 group-hover/item:text-gray-600 dark:group-hover/item:text-white transition" data-svelte-h="svelte-14xjows"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd"></path></svg></div> </a>`;
          })}</div>`;
        },
        default: () => {
          return `<div class="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">${slots.default ? slots.default({}) : ``} ${state ? `${validate_component(ChevronUp, "ChevronUp").$$render(
            $$result,
            {
              strokeWidth: "3.5",
              className: "size-3.5 "
            },
            {},
            {}
          )}` : `${validate_component(ChevronDown, "ChevronDown").$$render(
            $$result,
            {
              strokeWidth: "3.5",
              className: "size-3.5 "
            },
            {},
            {}
          )}`}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Sparkles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path></svg>`;
});
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content = "" } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  return `<div class="flex my-2 gap-2.5 border px-4 py-3 border-red-600/10 bg-red-600/10 rounded-lg"><div class="self-start mt-0.5">${validate_component(Info, "Info").$$render(
    $$result,
    {
      className: "size-5 text-red-700 dark:text-red-400"
    },
    {},
    {}
  )}</div> <div class="self-center text-sm">${escape(typeof content === "string" ? content : JSON.stringify(content))}</div></div>`;
});
function calculatePercentage(distance) {
  if (distance < 0) return 0;
  if (distance > 1) return 100;
  return Math.round(distance * 1e4) / 100;
}
function getRelevanceColor(percentage) {
  if (percentage >= 80) return "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200";
  if (percentage >= 60) return "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200";
  if (percentage >= 40) return "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200";
  return "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200";
}
const CitationsModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  let { citation } = $$props;
  let { showPercentage = false } = $$props;
  let { showRelevance = true } = $$props;
  let mergedDocuments = [];
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.citation === void 0 && $$bindings.citation && citation !== void 0) $$bindings.citation(citation);
  if ($$props.showPercentage === void 0 && $$bindings.showPercentage && showPercentage !== void 0) $$bindings.showPercentage(showPercentage);
  if ($$props.showRelevance === void 0 && $$bindings.showRelevance && showRelevance !== void 0) $$bindings.showRelevance(showRelevance);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (citation) {
        mergedDocuments = citation.document?.map((c, i) => {
          return {
            source: citation.source,
            document: c,
            metadata: citation.metadata?.[i],
            distance: citation.distances?.[i]
          };
        });
        if (mergedDocuments.every((doc) => doc.distance !== void 0)) {
          mergedDocuments = mergedDocuments.sort((a, b) => (b.distance ?? Infinity) - (a.distance ?? Infinity));
        }
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "lg", show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-2"><div class="text-lg font-medium self-center capitalize">${escape($i18n.t("Citation"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full px-6 pb-5 md:space-x-4"><div class="flex flex-col w-full dark:text-gray-200 overflow-y-scroll max-h-[22rem] scrollbar-hidden">${each(mergedDocuments, (document2, documentIdx) => {
            return `<div class="flex flex-col w-full"><div class="text-sm font-medium dark:text-gray-300">${escape($i18n.t("Source"))}</div> ${document2.source?.name ? `${validate_component(Tooltip, "Tooltip").$$render(
              $$result,
              {
                className: "w-fit",
                content: $i18n.t("Open file"),
                placement: "top-start",
                tippyOptions: { duration: [500, 0] }
              },
              {},
              {
                default: () => {
                  return `<div class="text-sm dark:text-gray-400 flex items-center gap-2 w-fit"><a class="hover:text-gray-500 dark:hover:text-gray-100 underline grow"${add_attribute(
                    "href",
                    document2?.metadata?.file_id ? `${WEBUI_API_BASE_URL}/files/${document2?.metadata?.file_id}/content${document2?.metadata?.page !== void 0 ? `#page=${document2.metadata.page + 1}` : ""}` : document2.source?.url?.includes("http") ? document2.source.url : `#`,
                    0
                  )} target="_blank">${escape(document2?.metadata?.name ?? document2.source.name)}</a> ${document2?.metadata?.page ? `<span class="text-xs text-gray-500 dark:text-gray-400">(${escape($i18n.t("page"))} ${escape(document2.metadata.page + 1)})
										</span>` : ``}</div> `;
                }
              }
            )} ${showRelevance ? `<div class="text-sm font-medium dark:text-gray-300 mt-2">${escape($i18n.t("Relevance"))}</div> ${document2.distance !== void 0 ? `${validate_component(Tooltip, "Tooltip").$$render(
              $$result,
              {
                className: "w-fit",
                content: $i18n.t("Semantic distance to query"),
                placement: "top-start",
                tippyOptions: { duration: [500, 0] }
              },
              {},
              {
                default: () => {
                  return `<div class="text-sm my-1 dark:text-gray-400 flex items-center gap-2 w-fit">${showPercentage ? (() => {
                    let percentage = calculatePercentage(document2.distance);
                    return ` <span${add_attribute("class", `px-1 rounded-sm font-medium ${getRelevanceColor(percentage)}`, 0)}>${escape(percentage.toFixed(2))}%</span> <span class="text-gray-500 dark:text-gray-500">(${escape(document2.distance.toFixed(4))})
												</span>`;
                  })() : `<span class="text-gray-500 dark:text-gray-500">${escape(document2.distance.toFixed(4))} </span>`}</div> `;
                }
              }
            )}` : `<div class="text-sm dark:text-gray-400">${escape($i18n.t("No distance available"))} </div>`}` : ``}` : `<div class="text-sm dark:text-gray-400">${escape($i18n.t("No source available"))} </div>`}</div> <div class="flex flex-col w-full"><div class="text-sm font-medium dark:text-gray-300 mt-2">${escape($i18n.t("Content"))}</div> ${document2.metadata?.html ? `<iframe class="w-full border-0 h-auto rounded-none" sandbox="allow-scripts allow-forms allow-same-origin"${add_attribute("srcdoc", document2.document, 0)}${add_attribute("title", $i18n.t("Content"), 0)}></iframe>` : `<pre class="text-sm dark:text-gray-400 whitespace-pre-line">                ${escape(document2.document)}
              </pre>`}</div> ${documentIdx !== mergedDocuments.length - 1 ? `<hr class="border-gray-100 dark:border-gray-850 my-3">` : ``}`;
          })}</div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
function calculateShowRelevance(sources2) {
  const distances = sources2.flatMap((citation) => citation.distances ?? []);
  const inRange = distances.filter((d) => d !== void 0 && d >= -1 && d <= 1).length;
  const outOfRange = distances.filter((d) => d !== void 0 && (d < -1 || d > 1)).length;
  if (distances.length === 0) {
    return false;
  }
  if (inRange === distances.length - 1 && outOfRange === 1 || outOfRange === distances.length - 1 && inRange === 1) {
    return false;
  }
  return true;
}
function shouldShowPercentage(sources2) {
  const distances = sources2.flatMap((citation) => citation.distances ?? []);
  return distances.every((d) => d !== void 0 && d >= -1 && d <= 1);
}
const Citations = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { id = "" } = $$props;
  let { sources = [] } = $$props;
  let citations = [];
  let showPercentage = false;
  let showRelevance = true;
  let showCitationModal = false;
  let selectedCitation = null;
  let isCollapsibleOpen = false;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.sources === void 0 && $$bindings.sources && sources !== void 0) $$bindings.sources(sources);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        console.log("sources", sources);
        citations = sources.reduce(
          (acc, source) => {
            if (Object.keys(source).length === 0) {
              return acc;
            }
            source.document.forEach((document2, index) => {
              const metadata = source.metadata?.[index];
              const distance = source.distances?.[index];
              const id2 = metadata?.source ?? source?.source?.id ?? "N/A";
              let _source = source?.source;
              if (metadata?.name) {
                _source = { ..._source, name: metadata.name };
              }
              if (id2.startsWith("http://") || id2.startsWith("https://")) {
                _source = { ..._source, name: id2, url: id2 };
              }
              const existingSource = acc.find((item) => item.id === id2);
              if (existingSource) {
                existingSource.document.push(document2);
                existingSource.metadata.push(metadata);
                if (distance !== void 0) existingSource.distances.push(distance);
              } else {
                acc.push({
                  id: id2,
                  source: _source,
                  document: [document2],
                  metadata: metadata ? [metadata] : [],
                  distances: distance !== void 0 ? [distance] : void 0
                });
              }
            });
            return acc;
          },
          []
        );
        showRelevance = calculateShowRelevance(citations);
        showPercentage = shouldShowPercentage(citations);
      }
    }
    $$rendered = `${validate_component(CitationsModal, "CitationsModal").$$render(
      $$result,
      {
        citation: selectedCitation,
        showPercentage,
        showRelevance,
        show: showCitationModal
      },
      {
        show: ($$value) => {
          showCitationModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${citations.length > 0 ? `<div class="py-0.5 -mx-0.5 w-full flex gap-1 items-center flex-wrap">${citations.length <= 3 ? `<div class="flex text-xs font-medium flex-wrap">${each(citations, (citation, idx) => {
      return `<button${add_attribute("id", `source-${id}-${idx}`, 0)} class="no-toggle outline-hidden flex dark:text-gray-300 p-1 bg-white dark:bg-gray-900 rounded-xl max-w-96">${citations.every((c) => c.distances !== void 0) ? `<div class="bg-gray-50 dark:bg-gray-800 rounded-full size-4">${escape(idx + 1)} </div>` : ``} <div class="flex-1 mx-1 truncate text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition">${escape(citation.source.name)}</div> </button>`;
    })}</div>` : `${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        id: "collapsible-sources",
        className: "w-full max-w-full ",
        buttonClassName: "w-fit max-w-full",
        open: isCollapsibleOpen
      },
      {
        open: ($$value) => {
          isCollapsibleOpen = $$value;
          $$settled = false;
        }
      },
      {
        content: () => {
          return `<div slot="content"><div class="flex text-xs font-medium flex-wrap">${each(citations, (citation, idx) => {
            return `<button${add_attribute("id", `source-${id}-${idx}`, 0)} class="no-toggle outline-hidden flex dark:text-gray-300 p-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-850 transition rounded-xl max-w-96">${citations.every((c) => c.distances !== void 0) ? `<div class="bg-gray-50 dark:bg-gray-800 rounded-full size-4">${escape(idx + 1)} </div>` : ``} <div class="flex-1 mx-1 truncate">${escape(citation.source.name)}</div> </button>`;
          })}</div></div>`;
        },
        default: () => {
          return `<div class="flex w-full overflow-auto items-center gap-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition cursor-pointer"><div class="flex-1 flex items-center gap-1 overflow-auto scrollbar-none w-full max-w-full"><span class="whitespace-nowrap hidden sm:inline shrink-0">${escape($i18n.t("References from"))}</span> <div class="flex items-center overflow-auto scrollbar-none w-full max-w-full flex-1"><div class="flex text-xs font-medium items-center">${each(citations.slice(0, 2), (citation, idx) => {
            return `<button class="no-toggle outline-hidden flex dark:text-gray-300 p-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-850 transition rounded-xl max-w-96">${citations.every((c) => c.distances !== void 0) ? `<div class="bg-gray-50 dark:bg-gray-800 rounded-full size-4">${escape(idx + 1)} </div>` : ``} <div class="flex-1 mx-1 truncate">${escape(citation.source.name)}</div> </button>`;
          })}</div></div> <div class="flex items-center gap-1 whitespace-nowrap shrink-0"><span class="hidden sm:inline">${escape($i18n.t("and"))}</span> ${escape(citations.length - 2)} <span>${escape($i18n.t("more"))}</span></div></div> <div class="shrink-0">${isCollapsibleOpen ? `${validate_component(ChevronUp, "ChevronUp").$$render(
            $$result,
            {
              strokeWidth: "3.5",
              className: "size-3.5"
            },
            {},
            {}
          )}` : `${validate_component(ChevronDown, "ChevronDown").$$render(
            $$result,
            {
              strokeWidth: "3.5",
              className: "size-3.5"
            },
            {},
            {}
          )}`}</div></div>`;
        }
      }
    )}`}</div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const CodeExecutionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  let { codeExecution = null } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.codeExecution === void 0 && $$bindings.codeExecution && codeExecution !== void 0) $$bindings.codeExecution(codeExecution);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "lg", show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-2"><div class="text-lg font-medium self-center flex flex-col gap-0.5 capitalize">${codeExecution?.result ? `<div>${codeExecution.result?.error ? `${validate_component(Badge, "Badge").$$render($$result, { type: "error", content: "error" }, {}, {})}` : `${codeExecution.result?.output ? `${validate_component(Badge, "Badge").$$render($$result, { type: "success", content: "success" }, {}, {})}` : `${validate_component(Badge, "Badge").$$render($$result, { type: "warning", content: "incomplete" }, {}, {})}`}`}</div>` : ``} <div class="flex gap-2 items-center">${!codeExecution?.result ? `<div>${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}</div>` : ``} <div>${codeExecution?.name ? `${escape($i18n.t("Code execution"))}: ${escape(codeExecution?.name)}` : `${escape($i18n.t("Code execution"))}`}</div></div></div> <button class="self-center" data-svelte-h="svelte-vnrwun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full px-4 pb-5"><div class="flex flex-col w-full dark:text-gray-200 overflow-y-scroll max-h-[22rem] scrollbar-hidden"><div class="flex flex-col w-full">${validate_component(CodeBlock, "CodeBlock").$$render(
            $$result,
            {
              id: "code-exec-" + codeExecution?.id + "-code",
              lang: codeExecution?.language ?? "",
              code: codeExecution?.code ?? "",
              className: "",
              editorClassName: codeExecution?.result && (codeExecution?.result?.error || codeExecution?.result?.output) ? "rounded-b-none" : "",
              stickyButtonsClassName: "top-0",
              run: false
            },
            {},
            {}
          )}</div> ${codeExecution?.result && (codeExecution?.result?.error || codeExecution?.result?.output) ? `<div class="dark:bg-[#202123] dark:text-white px-4 py-4 rounded-b-lg flex flex-col gap-3">${codeExecution?.result?.error ? `<div><div class="text-gray-500 text-xs mb-1">${escape($i18n.t("ERROR"))}</div> <div class="text-sm">${escape(codeExecution?.result?.error)}</div></div>` : ``} ${codeExecution?.result?.output ? `<div><div class="text-gray-500 text-xs mb-1">${escape($i18n.t("OUTPUT"))}</div> <div class="text-sm">${escape(codeExecution?.result?.output)}</div></div>` : ``}</div>` : ``} ${codeExecution?.result?.files && codeExecution?.result?.files.length > 0 ? `<div class="flex flex-col w-full"><hr class="border-gray-100 dark:border-gray-850 my-2"> <div class="text-sm font-medium dark:text-gray-300">${escape($i18n.t("Files"))}</div> <ul class="mt-1 list-disc pl-4 text-xs">${each(codeExecution?.result?.files, (file) => {
            return `<li><a${add_attribute("href", file.url, 0)} target="_blank">${escape(file.name)}</a> </li>`;
          })}</ul></div>` : ``}</div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const css$1 = {
  code: "@keyframes svelte-1gvtig2-pulse{0%,100%{opacity:1}50%{opacity:0.6}}.pulse.svelte-1gvtig2{opacity:1;animation:svelte-1gvtig2-pulse 1.5s ease}",
  map: `{"version":3,"file":"CodeExecutions.svelte","sources":["CodeExecutions.svelte"],"sourcesContent":["<script lang=\\"ts\\">import CodeExecutionModal from \\"./CodeExecutionModal.svelte\\";\\nimport Spinner from \\"$lib/components/common/Spinner.svelte\\";\\nimport Check from \\"$lib/components/icons/Check.svelte\\";\\nimport XMark from \\"$lib/components/icons/XMark.svelte\\";\\nimport EllipsisHorizontal from \\"$lib/components/icons/EllipsisHorizontal.svelte\\";\\nexport let codeExecutions = [];\\nlet selectedCodeExecution = null;\\nlet showCodeExecutionModal = false;\\n$: if (codeExecutions) {\\n  updateSelectedCodeExecution();\\n}\\nconst updateSelectedCodeExecution = () => {\\n  if (selectedCodeExecution) {\\n    selectedCodeExecution = codeExecutions.find(\\n      (execution) => execution.id === selectedCodeExecution.id\\n    );\\n  }\\n};\\n<\/script>\\n\\n<CodeExecutionModal bind:show={showCodeExecutionModal} codeExecution={selectedCodeExecution} />\\n\\n{#if codeExecutions.length > 0}\\n\\t<div class=\\"mt-1 mb-2 w-full flex gap-1 items-center flex-wrap\\">\\n\\t\\t{#each codeExecutions as execution (execution.id)}\\n\\t\\t\\t<div class=\\"flex gap-1 text-xs font-semibold\\">\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\tclass=\\"flex dark:text-gray-300 py-1 px-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-xl max-w-96\\"\\n\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\tselectedCodeExecution = execution;\\n\\t\\t\\t\\t\\t\\tshowCodeExecutionModal = true;\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\"bg-white dark:bg-gray-700 rounded-full size-4 flex items-center justify-center\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{#if execution?.result}\\n\\t\\t\\t\\t\\t\\t\\t{#if execution.result?.error}\\n\\t\\t\\t\\t\\t\\t\\t\\t<XMark />\\n\\t\\t\\t\\t\\t\\t\\t{:else if execution.result?.output}\\n\\t\\t\\t\\t\\t\\t\\t\\t<Check strokeWidth=\\"3\\" className=\\"size-3\\" />\\n\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t<EllipsisHorizontal />\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t<Spinner className=\\"size-4\\" />\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\"flex-1 mx-2 line-clamp-1 code-execution-name {execution?.result ? '' : 'pulse'}\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{execution.name}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</div>\\n\\t\\t{/each}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t@keyframes pulse {\\n\\t\\t0%,\\n\\t\\t100% {\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t\\t50% {\\n\\t\\t\\topacity: 0.6;\\n\\t\\t}\\n\\t}\\n\\n\\t.pulse {\\n\\t\\topacity: 1;\\n\\t\\tanimation: pulse 1.5s ease;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4DC,WAAW,oBAAM,CAChB,EAAE,CACF,IAAK,CACJ,OAAO,CAAE,CACV,CACA,GAAI,CACH,OAAO,CAAE,GACV,CACD,CAEA,qBAAO,CACN,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,oBAAK,CAAC,IAAI,CAAC,IACvB"}`
};
const CodeExecutions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { codeExecutions = [] } = $$props;
  let selectedCodeExecution = null;
  let showCodeExecutionModal = false;
  if ($$props.codeExecutions === void 0 && $$bindings.codeExecutions && codeExecutions !== void 0) $$bindings.codeExecutions(codeExecutions);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(CodeExecutionModal, "CodeExecutionModal").$$render(
      $$result,
      {
        codeExecution: selectedCodeExecution,
        show: showCodeExecutionModal
      },
      {
        show: ($$value) => {
          showCodeExecutionModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${codeExecutions.length > 0 ? `<div class="mt-1 mb-2 w-full flex gap-1 items-center flex-wrap">${each(codeExecutions, (execution) => {
      return `<div class="flex gap-1 text-xs font-semibold"><button class="flex dark:text-gray-300 py-1 px-1 bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-xl max-w-96"><div class="bg-white dark:bg-gray-700 rounded-full size-4 flex items-center justify-center">${execution?.result ? `${execution.result?.error ? `${validate_component(XMark, "XMark").$$render($$result, {}, {}, {})}` : `${execution.result?.output ? `${validate_component(Check, "Check").$$render($$result, { strokeWidth: "3", className: "size-3" }, {}, {})}` : `${validate_component(EllipsisHorizontal, "EllipsisHorizontal").$$render($$result, {}, {}, {})}`}`}` : `${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}`}</div> <div class="${"flex-1 mx-2 line-clamp-1 code-execution-name " + escape(execution?.result ? "" : "pulse", true) + " svelte-1gvtig2"}">${escape(execution.name)} </div></button> </div>`;
    })}</div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const ChatBubble = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"></path></svg>`;
});
const LightBlub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>`;
});
const FloatingButtons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { id = "" } = $$props;
  let { model = null } = $$props;
  let { messages = [] } = $$props;
  let { onAdd = () => {
  } } = $$props;
  let floatingInput = false;
  let floatingInputValue = "";
  let prompt = "";
  let responseContent = null;
  let responseDone = false;
  const closeHandler = () => {
    responseContent = null;
    responseDone = false;
    floatingInput = false;
    floatingInputValue = "";
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0) $$bindings.model(model);
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0) $$bindings.messages(messages);
  if ($$props.onAdd === void 0 && $$bindings.onAdd && onAdd !== void 0) $$bindings.onAdd(onAdd);
  if ($$props.closeHandler === void 0 && $$bindings.closeHandler && closeHandler !== void 0) $$bindings.closeHandler(closeHandler);
  $$unsubscribe_i18n();
  return `<div${add_attribute("id", `floating-buttons-${id}`, 0)} class="absolute rounded-lg mt-1 text-xs z-9999" style="display: none">${responseContent === null ? `${!floatingInput ? `<div class="flex flex-row gap-0.5 shrink-0 p-1 bg-white dark:bg-gray-850 dark:text-gray-100 text-medium rounded-lg shadow-xl"><button class="px-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm flex items-center gap-1 min-w-fit">${validate_component(ChatBubble, "ChatBubble").$$render($$result, { className: "size-3 shrink-0" }, {}, {})} <div class="shrink-0" data-svelte-h="svelte-1ugwo9q">Ask</div></button> <button class="px-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm flex items-center gap-1 min-w-fit">${validate_component(LightBlub, "LightBlub").$$render($$result, { className: "size-3 shrink-0" }, {}, {})} <div class="shrink-0" data-svelte-h="svelte-1sxc82g">Explain</div></button></div>` : `<div class="py-1 flex dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border dark:border-gray-850 w-72 rounded-full shadow-xl"><input type="text" id="floating-message-input" class="ml-5 bg-transparent outline-hidden w-full flex-1 text-sm"${add_attribute("placeholder", $i18n.t("Ask a question"), 0)}${add_attribute("value", floatingInputValue, 0)}> <div class="ml-1 mr-2"><button class="${escape(
    floatingInputValue !== "" ? "bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 " : "text-white bg-gray-200 dark:text-gray-900 dark:bg-gray-700 disabled",
    true
  ) + " transition rounded-full p-1.5 m-0.5 self-center"}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clip-rule="evenodd"></path></svg></button></div></div>`}` : `<div class="bg-white dark:bg-gray-850 dark:text-gray-100 rounded-xl shadow-xl w-80 max-w-full"><div class="bg-gray-50/50 dark:bg-gray-800 dark:text-gray-100 text-medium rounded-xl px-3.5 py-3 w-full"><div class="font-medium">${validate_component(Markdown, "Markdown").$$render(
    $$result,
    {
      id: `${id}-float-prompt`,
      content: prompt
    },
    {},
    {}
  )}</div></div> <div class="bg-white dark:bg-gray-850 dark:text-gray-100 text-medium rounded-xl px-3.5 py-3 w-full"><div class="max-h-80 overflow-y-auto w-full markdown-prose-xs" id="response-container">${responseContent.trim() === "" ? `${validate_component(Skeleton, "Skeleton").$$render($$result, { size: "sm" }, {}, {})}` : `${validate_component(Markdown, "Markdown").$$render(
    $$result,
    {
      id: `${id}-float-response`,
      content: responseContent
    },
    {},
    {}
  )}`} ${responseDone ? `<div class="flex justify-end pt-3 text-sm font-medium"><button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full">${escape($i18n.t("Add"))}</button></div>` : ``}</div></div></div>`}</div>`;
});
const ContentRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_mobile;
  let $$unsubscribe_chatId;
  $$unsubscribe_mobile = subscribe(mobile, (value) => value);
  $$unsubscribe_chatId = subscribe(chatId, (value) => value);
  getContext("i18n");
  createEventDispatcher();
  let { id } = $$props;
  let { content } = $$props;
  let { history } = $$props;
  let { model = null } = $$props;
  let { sources = null } = $$props;
  let { save = false } = $$props;
  let { floatingButtons = true } = $$props;
  let { onSourceClick = () => {
  } } = $$props;
  let { onTaskClick = () => {
  } } = $$props;
  let { onAddMessages = () => {
  } } = $$props;
  let contentContainerElement;
  let floatingButtonsElement;
  const updateButtonPosition = (event) => {
    const buttonsContainerElement = document.getElementById(`floating-buttons-${id}`);
    if (!buttonsContainerElement?.contains(event.target)) {
      closeFloatingButtons();
      return;
    }
    setTimeout(
      async () => {
        await tick();
        return;
      },
      0
    );
  };
  const closeFloatingButtons = () => {
    const buttonsContainerElement = document.getElementById(`floating-buttons-${id}`);
    if (buttonsContainerElement) {
      buttonsContainerElement.style.display = "none";
    }
    if (floatingButtonsElement) {
      floatingButtonsElement.closeHandler();
    }
  };
  const keydownHandler = (e) => {
    if (e.key === "Escape") {
      closeFloatingButtons();
    }
  };
  onDestroy(() => {
    if (floatingButtons) {
      document.removeEventListener("mouseup", updateButtonPosition);
      document.removeEventListener("keydown", keydownHandler);
    }
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0) $$bindings.model(model);
  if ($$props.sources === void 0 && $$bindings.sources && sources !== void 0) $$bindings.sources(sources);
  if ($$props.save === void 0 && $$bindings.save && save !== void 0) $$bindings.save(save);
  if ($$props.floatingButtons === void 0 && $$bindings.floatingButtons && floatingButtons !== void 0) $$bindings.floatingButtons(floatingButtons);
  if ($$props.onSourceClick === void 0 && $$bindings.onSourceClick && onSourceClick !== void 0) $$bindings.onSourceClick(onSourceClick);
  if ($$props.onTaskClick === void 0 && $$bindings.onTaskClick && onTaskClick !== void 0) $$bindings.onTaskClick(onTaskClick);
  if ($$props.onAddMessages === void 0 && $$bindings.onAddMessages && onAddMessages !== void 0) $$bindings.onAddMessages(onAddMessages);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div${add_attribute("this", contentContainerElement, 0)}>${validate_component(Markdown, "Markdown").$$render(
      $$result,
      {
        id,
        content,
        model,
        save,
        sourceIds: (sources ?? []).reduce(
          (acc, s) => {
            let ids = [];
            s.document.forEach((document2, index) => {
              if (model?.info?.meta?.capabilities?.citations == false) {
                ids.push("N/A");
                return ids;
              }
              const metadata = s.metadata?.[index];
              const id2 = metadata?.source ?? "N/A";
              if (metadata?.name) {
                ids.push(metadata.name);
                return ids;
              }
              if (id2.startsWith("http://") || id2.startsWith("https://")) {
                ids.push(id2);
              } else {
                ids.push(s?.source?.name ?? id2);
              }
              return ids;
            });
            acc = [...acc, ...ids];
            return acc.filter((item, index) => acc.indexOf(item) === index);
          },
          []
        ),
        onSourceClick,
        onTaskClick
      },
      {},
      {}
    )}</div> ${floatingButtons && model ? `${validate_component(FloatingButtons, "FloatingButtons").$$render(
      $$result,
      {
        id,
        model: model?.id,
        messages: createMessagesList(history, id),
        onAdd: ({ modelId, parentId, messages }) => {
          console.log(modelId, parentId, messages);
          onAddMessages({ modelId, parentId, messages });
          closeFloatingButtons();
        },
        this: floatingButtonsElement
      },
      {
        this: ($$value) => {
          floatingButtonsElement = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_mobile();
  $$unsubscribe_chatId();
  return $$rendered;
});
const css = {
  code: ".buttons.svelte-wlev50.svelte-wlev50::-webkit-scrollbar{display:none}.buttons.svelte-wlev50.svelte-wlev50{-ms-overflow-style:none;scrollbar-width:none}.table-improved{width:calc(100% + 1rem) !important;max-width:none !important;margin-left:-0.5rem;margin-right:-0.5rem}.table-improved thead{background-color:#e8f4ff !important}.dark .table-improved thead{background-color:#1e3a5f !important}.table-improved th{font-weight:600;padding:0.75rem 1rem !important}.table-improved td{padding:0.625rem 1rem !important}.agent-loading-animation.svelte-wlev50.svelte-wlev50{padding:0.5rem 0}.agent-loading-text.svelte-wlev50.svelte-wlev50{font-size:1rem;line-height:1.5;color:var(--text-primary)}.typing-animation.svelte-wlev50.svelte-wlev50{display:inline-flex;align-items:center;margin-right:0.5rem}.typing-animation.svelte-wlev50 span.svelte-wlev50{height:0.5rem;width:0.5rem;margin:0 0.1rem;background-color:#4b5563;border-radius:50%;display:inline-block;opacity:0.6}.dark .typing-animation.svelte-wlev50 span.svelte-wlev50{background-color:#9ca3af}.typing-animation.svelte-wlev50 span.svelte-wlev50:nth-child(1){animation:svelte-wlev50-pulse 1.5s infinite ease-in-out}.typing-animation.svelte-wlev50 span.svelte-wlev50:nth-child(2){animation:svelte-wlev50-pulse 1.5s infinite ease-in-out 0.3s}.typing-animation.svelte-wlev50 span.svelte-wlev50:nth-child(3){animation:svelte-wlev50-pulse 1.5s infinite ease-in-out 0.6s}@keyframes svelte-wlev50-pulse{0%,100%{transform:scale(0.75);opacity:0.4}50%{transform:scale(1);opacity:1}}",
  map: `{"version":3,"file":"ResponseMessage.svelte","sources":["ResponseMessage.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { toast } from \\"svelte-sonner\\";\\nimport dayjs from \\"dayjs\\";\\nimport { createEventDispatcher } from \\"svelte\\";\\nimport { onMount, tick, getContext } from \\"svelte\\";\\nconst i18n = getContext(\\"i18n\\");\\nconst dispatch = createEventDispatcher();\\nimport { createNewFeedback, getFeedbackById, updateFeedbackById } from \\"$lib/apis/evaluations\\";\\nimport { getChatById } from \\"$lib/apis/chats\\";\\nimport { generateTags } from \\"$lib/apis\\";\\nimport { config, models, settings, temporaryChatEnabled, TTSWorker, user } from \\"$lib/stores\\";\\nimport { synthesizeOpenAISpeech } from \\"$lib/apis/audio\\";\\nimport { imageGenerations } from \\"$lib/apis/images\\";\\nimport {\\n  copyToClipboard as _copyToClipboard,\\n  approximateToHumanReadable,\\n  getMessageContentParts,\\n  sanitizeResponseContent,\\n  createMessagesList,\\n  formatDate\\n} from \\"$lib/utils\\";\\nimport { WEBUI_BASE_URL } from \\"$lib/constants\\";\\nimport Name from \\"./Name.svelte\\";\\nimport ProfileImage from \\"./ProfileImage.svelte\\";\\nimport Skeleton from \\"./Skeleton.svelte\\";\\nimport Image from \\"$lib/components/common/Image.svelte\\";\\nimport Tooltip from \\"$lib/components/common/Tooltip.svelte\\";\\nimport RateComment from \\"./RateComment.svelte\\";\\nimport Spinner from \\"$lib/components/common/Spinner.svelte\\";\\nimport WebSearchResults from \\"./ResponseMessage/WebSearchResults.svelte\\";\\nimport Sparkles from \\"$lib/components/icons/Sparkles.svelte\\";\\nimport DeleteConfirmDialog from \\"$lib/components/common/ConfirmDialog.svelte\\";\\nimport Error from \\"./Error.svelte\\";\\nimport Citations from \\"./Citations.svelte\\";\\nimport CodeExecutions from \\"./CodeExecutions.svelte\\";\\nimport ContentRenderer from \\"./ContentRenderer.svelte\\";\\nimport { KokoroWorker } from \\"$lib/workers/KokoroWorker\\";\\nimport Table from \\"$lib/components/common/Table.svelte\\";\\nexport let chatId = \\"\\";\\nexport let history;\\nexport let messageId;\\nexport let message = JSON.parse(JSON.stringify(history.messages[messageId]));\\n$: if (history.messages) {\\n  if (JSON.stringify(message) !== JSON.stringify(history.messages[messageId])) {\\n    console.log(\\"\\\\u{1F4F1} ResponseMessage updated for message:\\", messageId);\\n    message = JSON.parse(JSON.stringify(history.messages[messageId]));\\n  }\\n}\\nexport let siblings;\\nexport let showPreviousMessage;\\nexport let showNextMessage;\\nexport let updateChat;\\nexport let editMessage;\\nexport let saveMessage;\\nexport let rateMessage;\\nexport let actionMessage;\\nexport let deleteMessage;\\nexport let submitMessage;\\nexport let continueResponse;\\nexport let regenerateResponse;\\nexport let addMessages;\\nexport let isLastMessage = true;\\nexport let readOnly = false;\\nlet buttonsContainerElement;\\nlet showDeleteConfirm = false;\\nlet model = null;\\n$: model = $models.find((m) => m.id === message.model);\\nlet edit = false;\\nlet editedContent = \\"\\";\\nlet editTextAreaElement;\\nlet audioParts = {};\\nlet speaking = false;\\nlet speakingIdx;\\nlet loadingSpeech = false;\\nlet generatingImage = false;\\nlet showRateComment = false;\\nconst copyToClipboard = async (text) => {\\n  const res = await _copyToClipboard(text);\\n  if (res) {\\n    toast.success($i18n.t(\\"Copying to clipboard was successful!\\"));\\n  }\\n};\\nconst playAudio = (idx) => {\\n  return new Promise((res) => {\\n    speakingIdx = idx;\\n    const audio = audioParts[idx];\\n    if (!audio) {\\n      return res();\\n    }\\n    audio.play();\\n    audio.onended = async () => {\\n      await new Promise((r) => setTimeout(r, 300));\\n      if (Object.keys(audioParts).length - 1 === idx) {\\n        speaking = false;\\n      }\\n      res();\\n    };\\n  });\\n};\\nconst toggleSpeakMessage = async () => {\\n  if (speaking) {\\n    try {\\n      speechSynthesis.cancel();\\n      if (speakingIdx !== void 0 && audioParts[speakingIdx]) {\\n        audioParts[speakingIdx].pause();\\n        audioParts[speakingIdx].currentTime = 0;\\n      }\\n    } catch {\\n    }\\n    speaking = false;\\n    speakingIdx = void 0;\\n    return;\\n  }\\n  if (!(message?.content ?? \\"\\").trim().length) {\\n    toast.info($i18n.t(\\"No content to speak\\"));\\n    return;\\n  }\\n  speaking = true;\\n  if ($config.audio.tts.engine === \\"\\") {\\n    let voices = [];\\n    const getVoicesLoop = setInterval(() => {\\n      voices = speechSynthesis.getVoices();\\n      if (voices.length > 0) {\\n        clearInterval(getVoicesLoop);\\n        const voice = voices?.filter(\\n          (v) => v.voiceURI === ($settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice)\\n        )?.at(0) ?? void 0;\\n        console.log(voice);\\n        const speak = new SpeechSynthesisUtterance(message.content);\\n        speak.rate = $settings.audio?.tts?.playbackRate ?? 1;\\n        console.log(speak);\\n        speak.onend = () => {\\n          speaking = false;\\n          if ($settings.conversationMode) {\\n            document.getElementById(\\"voice-input-button\\")?.click();\\n          }\\n        };\\n        if (voice) {\\n          speak.voice = voice;\\n        }\\n        speechSynthesis.speak(speak);\\n      }\\n    }, 100);\\n  } else {\\n    loadingSpeech = true;\\n    const messageContentParts = getMessageContentParts(\\n      message.content,\\n      $config?.audio?.tts?.split_on ?? \\"punctuation\\"\\n    );\\n    if (!messageContentParts.length) {\\n      console.log(\\"No content to speak\\");\\n      toast.info($i18n.t(\\"No content to speak\\"));\\n      speaking = false;\\n      loadingSpeech = false;\\n      return;\\n    }\\n    console.debug(\\"Prepared message content for TTS\\", messageContentParts);\\n    audioParts = messageContentParts.reduce(\\n      (acc, _sentence, idx) => {\\n        acc[idx] = null;\\n        return acc;\\n      },\\n      {}\\n    );\\n    let lastPlayedAudioPromise = Promise.resolve();\\n    if ($settings.audio?.tts?.engine === \\"browser-kokoro\\") {\\n      if (!$TTSWorker) {\\n        await TTSWorker.set(\\n          new KokoroWorker({\\n            dtype: $settings.audio?.tts?.engineConfig?.dtype ?? \\"fp32\\"\\n          })\\n        );\\n        await $TTSWorker.init();\\n      }\\n      for (const [idx, sentence] of messageContentParts.entries()) {\\n        const blob = await $TTSWorker.generate({\\n          text: sentence,\\n          voice: $settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice\\n        }).catch((error) => {\\n          console.error(error);\\n          toast.error(\`\${error}\`);\\n          speaking = false;\\n          loadingSpeech = false;\\n        });\\n        if (blob) {\\n          const audio = new Audio(blob);\\n          audio.playbackRate = $settings.audio?.tts?.playbackRate ?? 1;\\n          audioParts[idx] = audio;\\n          loadingSpeech = false;\\n          lastPlayedAudioPromise = lastPlayedAudioPromise.then(() => playAudio(idx));\\n        }\\n      }\\n    } else {\\n      for (const [idx, sentence] of messageContentParts.entries()) {\\n        const res = await synthesizeOpenAISpeech(\\n          localStorage.token,\\n          $settings?.audio?.tts?.defaultVoice === $config.audio.tts.voice ? $settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice : $config?.audio?.tts?.voice,\\n          sentence\\n        ).catch((error) => {\\n          console.error(error);\\n          toast.error(\`\${error}\`);\\n          speaking = false;\\n          loadingSpeech = false;\\n        });\\n        if (res) {\\n          const blob = await res.blob();\\n          const blobUrl = URL.createObjectURL(blob);\\n          const audio = new Audio(blobUrl);\\n          audio.playbackRate = $settings.audio?.tts?.playbackRate ?? 1;\\n          audioParts[idx] = audio;\\n          loadingSpeech = false;\\n          lastPlayedAudioPromise = lastPlayedAudioPromise.then(() => playAudio(idx));\\n        }\\n      }\\n    }\\n  }\\n};\\nconst editMessageHandler = async () => {\\n  edit = true;\\n  editedContent = message.content;\\n  await tick();\\n  editTextAreaElement.style.height = \\"\\";\\n  editTextAreaElement.style.height = \`\${editTextAreaElement.scrollHeight}px\`;\\n};\\nconst editMessageConfirmHandler = async () => {\\n  editMessage(message.id, editedContent ? editedContent : \\"\\", false);\\n  edit = false;\\n  editedContent = \\"\\";\\n  await tick();\\n};\\nconst saveAsCopyHandler = async () => {\\n  editMessage(message.id, editedContent ? editedContent : \\"\\");\\n  edit = false;\\n  editedContent = \\"\\";\\n  await tick();\\n};\\nconst cancelEditMessage = async () => {\\n  edit = false;\\n  editedContent = \\"\\";\\n  await tick();\\n};\\nconst generateImage = async (message2) => {\\n  generatingImage = true;\\n  const res = await imageGenerations(localStorage.token, message2.content).catch((error) => {\\n    toast.error(\`\${error}\`);\\n  });\\n  console.log(res);\\n  if (res) {\\n    const files = res.map((image) => ({\\n      type: \\"image\\",\\n      url: \`\${image.url}\`\\n    }));\\n    saveMessage(message2.id, {\\n      ...message2,\\n      files\\n    });\\n  }\\n  generatingImage = false;\\n};\\nlet feedbackLoading = false;\\nconst feedbackHandler = async (rating = null, details = null) => {\\n  feedbackLoading = true;\\n  console.log(\\"Feedback\\", rating, details);\\n  const updatedMessage = {\\n    ...message,\\n    annotation: {\\n      ...message?.annotation ?? {},\\n      ...rating !== null ? { rating } : {},\\n      ...details ? details : {}\\n    }\\n  };\\n  const chat = await getChatById(localStorage.token, chatId).catch((error) => {\\n    toast.error(\`\${error}\`);\\n  });\\n  if (!chat) {\\n    return;\\n  }\\n  const messages = createMessagesList(history, message.id);\\n  let feedbackItem = {\\n    type: \\"rating\\",\\n    data: {\\n      ...updatedMessage?.annotation ? updatedMessage.annotation : {},\\n      model_id: message?.selectedModelId ?? message.model,\\n      ...history.messages[message.parentId].childrenIds.length > 1 ? {\\n        sibling_model_ids: history.messages[message.parentId].childrenIds.filter((id) => id !== message.id).map((id) => history.messages[id]?.selectedModelId ?? history.messages[id].model)\\n      } : {}\\n    },\\n    meta: {\\n      arena: message ? message.arena : false,\\n      model_id: message.model,\\n      message_id: message.id,\\n      message_index: messages.length,\\n      chat_id: chatId\\n    },\\n    snapshot: {\\n      chat\\n    }\\n  };\\n  const baseModels = [\\n    feedbackItem.data.model_id,\\n    ...feedbackItem.data.sibling_model_ids ?? []\\n  ].reduce((acc, modelId) => {\\n    const model2 = $models.find((m) => m.id === modelId);\\n    if (model2) {\\n      acc[model2.id] = model2?.info?.base_model_id ?? null;\\n    } else {\\n      console.warn(\`Model with ID \${modelId} not found\`);\\n    }\\n    return acc;\\n  }, {});\\n  feedbackItem.meta.base_models = baseModels;\\n  let feedback = null;\\n  if (message?.feedbackId) {\\n    feedback = await updateFeedbackById(\\n      localStorage.token,\\n      message.feedbackId,\\n      feedbackItem\\n    ).catch((error) => {\\n      toast.error(\`\${error}\`);\\n    });\\n  } else {\\n    feedback = await createNewFeedback(localStorage.token, feedbackItem).catch((error) => {\\n      toast.error(\`\${error}\`);\\n    });\\n    if (feedback) {\\n      updatedMessage.feedbackId = feedback.id;\\n    }\\n  }\\n  console.log(updatedMessage);\\n  saveMessage(message.id, updatedMessage);\\n  await tick();\\n  if (!details) {\\n    showRateComment = true;\\n    if (!updatedMessage.annotation?.tags) {\\n      const tags = await generateTags(localStorage.token, message.model, messages, chatId).catch(\\n        (error) => {\\n          console.error(error);\\n          return [];\\n        }\\n      );\\n      console.log(tags);\\n      if (tags) {\\n        updatedMessage.annotation.tags = tags;\\n        feedbackItem.data.tags = tags;\\n        saveMessage(message.id, updatedMessage);\\n        await updateFeedbackById(\\n          localStorage.token,\\n          updatedMessage.feedbackId,\\n          feedbackItem\\n        ).catch((error) => {\\n          toast.error(\`\${error}\`);\\n        });\\n      }\\n    }\\n  }\\n  feedbackLoading = false;\\n};\\nconst deleteMessageHandler = async () => {\\n  deleteMessage(message.id);\\n};\\n$: if (!edit) {\\n  (async () => {\\n    await tick();\\n  })();\\n}\\nonMount(async () => {\\n  await tick();\\n  if (buttonsContainerElement) {\\n    console.log(buttonsContainerElement);\\n    buttonsContainerElement.addEventListener(\\"wheel\\", function(event) {\\n      event.preventDefault();\\n      if (event.deltaY !== 0) {\\n        buttonsContainerElement.scrollLeft += event.deltaY;\\n      }\\n    });\\n  }\\n});\\n$: if (message?.content) {\\n  console.log(\`\\\\u{1F5A5}\\\\uFE0F Rendering message \${messageId} content length: \${message.content.length}\`);\\n}\\nfunction isJsonString(str) {\\n  try {\\n    const json = JSON.parse(str);\\n    return typeof json === \\"object\\" && json !== null;\\n  } catch (e) {\\n    return false;\\n  }\\n}\\nfunction processAgentResponse(content) {\\n  console.log(\\"Processing agent response:\\", content);\\n  console.log(\\"Type of content:\\", typeof content);\\n  if (!content || typeof content !== \\"string\\") return { isAgent: false, content };\\n  if (isJsonString(content)) {\\n    try {\\n      const parsedContent = JSON.parse(content);\\n      if (parsedContent.success && parsedContent.response) {\\n        console.log(\\"\\\\u{1F4CA} Detected agent response:\\", parsedContent.response.type);\\n        if (parsedContent.response.type === \\"query_chart\\") {\\n          return {\\n            isAgent: true,\\n            type: \\"query_chart\\",\\n            content: parsedContent.response.content,\\n            data: parsedContent\\n          };\\n        }\\n        if (parsedContent.response.type === \\"query_result\\") {\\n          return {\\n            isAgent: true,\\n            type: parsedContent.response.type,\\n            content: parsedContent.response.content,\\n            data: parsedContent\\n          };\\n        }\\n        return {\\n          isAgent: true,\\n          type: parsedContent.response.type,\\n          content: parsedContent.response.content,\\n          data: parsedContent\\n        };\\n      }\\n      if (parsedContent.success && (parsedContent.type === \\"query_result\\" || parsedContent.type === \\"query_chart\\")) {\\n        console.log(\\"\\\\u{1F4CA} Detected direct query type:\\", parsedContent.type);\\n        return {\\n          isAgent: true,\\n          type: parsedContent.type,\\n          content: parsedContent.response.content,\\n          data: parsedContent\\n        };\\n      }\\n    } catch (e) {\\n      console.error(\\"Error parsing potential agent response:\\", e);\\n    }\\n  }\\n  return { isAgent: false, content };\\n}\\n$: processedResponse = processAgentResponse(message?.content);\\n<\/script>\\n\\n<DeleteConfirmDialog\\n\\tbind:show={showDeleteConfirm}\\n\\ttitle={$i18n.t('Delete message?')}\\n\\ton:confirm={() => {\\n\\t\\tdeleteMessageHandler();\\n\\t}}\\n/>\\n\\n{#key message.id}\\n\\t<div\\n\\t\\tclass=\\" flex w-full message-{message.id}\\"\\n\\t\\tid=\\"message-{message.id}\\"\\n\\t\\tdir={$settings.chatDirection}\\n\\t>\\n\\t\\t<div class={\`shrink-0 \${($settings?.chatDirection ?? 'LTR') === 'LTR' ? 'mr-3' : 'ml-3'}\`}>\\n\\t\\t\\t<ProfileImage\\n\\t\\t\\t\\tsrc={model?.info?.meta?.profile_image_url ??\\n\\t\\t\\t\\t\\t($i18n.language === 'dg-DG' ? \`/doge.png\` : \`\${WEBUI_BASE_URL}/static/favicon.png\`)}\\n\\t\\t\\t\\tclassName={'size-8'}\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"flex-auto w-0 pl-1\\">\\n\\t\\t\\t<Name>\\n\\t\\t\\t\\t<Tooltip content={model?.name ?? message.model} placement=\\"top-start\\">\\n\\t\\t\\t\\t\\t<span class=\\"line-clamp-1\\">\\n\\t\\t\\t\\t\\t\\t{model?.name ?? message.model}\\n\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t</Tooltip>\\n\\n\\t\\t\\t\\t{#if message.timestamp}\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\" self-center text-xs invisible group-hover:visible text-gray-400 font-medium first-letter:capitalize ml-0.5 translate-y-[1px]\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<Tooltip content={dayjs(message.timestamp * 1000).format('LLLL')}>\\n\\t\\t\\t\\t\\t\\t\\t<span class=\\"line-clamp-1\\">{formatDate(message.timestamp * 1000)}</span>\\n\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</Name>\\n\\n\\t\\t\\t<div>\\n\\t\\t\\t\\t{#if message?.files && message.files?.filter((f) => f.type === 'image').length > 0}\\n\\t\\t\\t\\t\\t<div class=\\"my-2.5 w-full flex overflow-x-auto gap-2 flex-wrap\\">\\n\\t\\t\\t\\t\\t\\t{#each message.files as file}\\n\\t\\t\\t\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if file.type === 'image'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Image src={file.url} alt={message.content} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t<div class=\\"chat-{message.role} w-full min-w-full markdown-prose\\">\\n\\t\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t\\t{#if (message?.statusHistory ?? [...(message?.status ? [message?.status] : [])]).length > 0}\\n\\t\\t\\t\\t\\t\\t\\t{@const status = (\\n\\t\\t\\t\\t\\t\\t\\t\\tmessage?.statusHistory ?? [...(message?.status ? [message?.status] : [])]\\n\\t\\t\\t\\t\\t\\t\\t).at(-1)}\\n\\t\\t\\t\\t\\t\\t\\t{#if !status?.hidden}\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"status-description flex items-center gap-2 py-0.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if status?.done === false}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Spinner className=\\"size-4\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if status?.action === 'web_search' && status?.urls}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<WebSearchResults {status}>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col justify-center -space-y-0.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{status?.done === false\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'shimmer'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} text-base line-clamp-1 text-wrap\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- $i18n.t(\\"Generating search query\\") -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- $i18n.t(\\"No search query generated\\") -->\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- $i18n.t('Searched {{count}} sites') -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if status?.description.includes('{{count}}')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t(status?.description, {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcount: status?.urls.length\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t})}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if status?.description === 'No search query generated'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('No search query generated')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if status?.description === 'Generating search query'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Generating search query')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{status?.description}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</WebSearchResults>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if status?.action === 'knowledge_search'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col justify-center -space-y-0.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{status?.done === false\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'shimmer'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} text-gray-500 dark:text-gray-500 text-base line-clamp-1 text-wrap\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t(\`Searching Knowledge for \\"{{searchQuery}}\\"\`, {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsearchQuery: status.query\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t})}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col justify-center -space-y-0.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{status?.done === false\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'shimmer'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} text-gray-500 dark:text-gray-500 text-base line-clamp-1 text-wrap\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- $i18n.t(\`Searching \\"{{searchQuery}}\\"\`) -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if status?.description.includes('{{searchQuery}}')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t(status?.description, {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsearchQuery: status?.query\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t})}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if status?.description === 'No search query generated'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('No search query generated')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if status?.description === 'Generating search query'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Generating search query')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{status?.description}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t{#if edit === true}\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"w-full bg-gray-50 dark:bg-gray-800 rounded-3xl px-5 py-3 my-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<textarea\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"message-edit-{message.id}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tbind:this={editTextAreaElement}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" bg-transparent outline-hidden w-full resize-none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tbind:value={editedContent}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:input={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\te.target.style.height = '';\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\te.target.style.height = \`\${e.target.scrollHeight}px\`;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:keydown={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (e.key === 'Escape') {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdocument.getElementById('close-edit-message-button')?.click();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst isCmdOrCtrlPressed = e.metaKey || e.ctrlKey;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst isEnterPressed = e.key === 'Enter';\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (isCmdOrCtrlPressed && isEnterPressed) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdocument.getElementById('confirm-edit-message-button')?.click();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" mt-2 mb-1 flex justify-between text-sm font-medium\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"save-new-message-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border dark:border-gray-700 text-gray-700 dark:text-gray-200 transition rounded-3xl\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsaveAsCopyHandler();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Save As Copy')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex space-x-1.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"close-edit-message-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-4 py-2 bg-white dark:bg-gray-900 hover:bg-gray-100 text-gray-800 dark:text-gray-100 transition rounded-3xl\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcancelEditMessage();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Cancel')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"confirm-edit-message-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-850 text-gray-100 dark:text-gray-800 transition rounded-3xl\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\teditMessageConfirmHandler();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Save')}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"w-full flex flex-col relative\\" id=\\"response-content-container\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if message.content === '' && !message.error}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Skeleton />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if message.content && message.error !== true}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if message.isLoading}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Agent loading animation -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"agent-loading-animation\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"typing-animation mr-1\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span></span>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span></span>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<span></span>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"agent-loading-text\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{message.content}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if processedResponse.isAgent}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if (processedResponse.type === 'query_result' || processedResponse.data.type === 'query_result') && (processedResponse.data.results || processedResponse.data.response?.results)}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"agent-query-results py-3\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-4 text-gray-700 dark:text-gray-300\\">{processedResponse.content}</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Data table with header -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tData Table\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"overflow-x-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if processedResponse.data.results}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Table \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata={processedResponse.data.results.records}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcolumns={processedResponse.data.results.columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclassName=\\"border w-full table-improved\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if processedResponse.data.response?.results}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Table \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata={processedResponse.data.response.results.records}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcolumns={processedResponse.data.response.results.columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclassName=\\"border w-full table-improved\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-4 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex justify-between items-center mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\" stroke-width=\\"2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tSQL Query\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcopyToClipboard(processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-1\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" class=\\"w-3.5 h-3.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tCopy\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<pre class=\\"bg-gray-50 dark:bg-gray-800/70 p-3 rounded-lg overflow-auto text-sm font-mono border border-gray-200 dark:border-gray-700 shadow-inner\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<code class=\\"sql-syntax text-gray-800 dark:text-gray-200\\">\\n{processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</code>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</pre>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if (processedResponse.type === 'query_chart' || processedResponse.data.type === 'query_chart') && processedResponse.data.response?.chart_url}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"agent-query-chart py-3\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Display text content -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-3 text-gray-700 dark:text-gray-300\\">{processedResponse.content}</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Display chart image with enhanced styling and download button -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-4 relative\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"absolute top-2 right-2 flex gap-2 z-10\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<a \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\thref={processedResponse.data.response.chart_url} \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdownload=\\"chart.png\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"p-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttitle=\\"Download chart\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"1.5\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<a \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\thref={processedResponse.data.response.chart_url} \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"p-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttitle=\\"Open in new tab\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"1.5\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsrc={processedResponse.data.response.chart_url} \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\talt=\\"Data visualization chart\\" \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Display data table if available with enhanced section header -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if processedResponse.data.results?.records}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-4 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tData Table\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"overflow-x-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Table \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata={processedResponse.data.results.records}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcolumns={processedResponse.data.results.columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclassName=\\"border w-full table-improved\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmaxPreviewRows={12}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Display SQL query if available -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-4 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex justify-between items-center mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\" stroke-width=\\"2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tSQL Query\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcopyToClipboard(processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-1\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" class=\\"w-3.5 h-3.5\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tCopy\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<pre class=\\"bg-gray-50 dark:bg-gray-800/70 p-3 rounded-lg overflow-auto text-sm font-mono border border-gray-200 dark:border-gray-700 shadow-inner\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<code class=\\"sql-syntax text-gray-800 dark:text-gray-200\\">\\n{processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</code>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</pre>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if processedResponse.type === 'chart' && processedResponse.data.response.chart_url}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"agent-chart py-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mb-2\\">{processedResponse.content}</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsrc={processedResponse.data.response.chart_url} \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\talt=\\"Chart\\" \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"max-w-full h-auto border dark:border-gray-700 rounded\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Regular text response or fallback -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<ContentRenderer\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid={message.id}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{history}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcontent={processedResponse.isAgent ? processedResponse.content : message.content}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsources={message.sources}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfloatingButtons={message?.done}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsave={!readOnly}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{model}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonTaskClick={async (e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.log(e);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonSourceClick={async (id, idx) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.log(id, idx);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlet sourceButton = document.getElementById(\`source-\${message.id}-\${idx}\`);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst sourcesCollapsible = document.getElementById(\`collapsible-sources\`);\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (sourceButton) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton.scrollIntoView({ behavior: 'smooth' });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t} else if (sourcesCollapsible) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// Open sources collapsible so we can click the source button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourcesCollapsible\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.querySelector('div:first-child')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.dispatchEvent(new PointerEvent('pointerup', {}));\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// Wait for next frame to ensure DOM updates\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait new Promise((resolve) => requestAnimationFrame(resolve));\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait new Promise((resolve) => requestAnimationFrame(resolve));\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton = document.getElementById(\`source-\${message.id}-\${idx}\`);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (sourceButton) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton.scrollIntoView({ behavior: 'smooth' });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonAddMessages={({ modelId, parentId, messages }) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\taddMessages({ modelId, parentId, messages });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:update={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmessage.content = e.detail.content;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdispatch('update', message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<!-- Not an agent response, use normal rendering -->\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<ContentRenderer\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid={message.id}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{history}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcontent={message.content}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsources={message.sources}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfloatingButtons={message?.done}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsave={!readOnly}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{model}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonTaskClick={async (e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.log(e);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonSourceClick={async (id, idx) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.log(id, idx);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlet sourceButton = document.getElementById(\`source-\${message.id}-\${idx}\`);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst sourcesCollapsible = document.getElementById(\`collapsible-sources\`);\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (sourceButton) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton.scrollIntoView({ behavior: 'smooth' });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t} else if (sourcesCollapsible) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// Open sources collapsible so we can click the source button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourcesCollapsible\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.querySelector('div:first-child')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.dispatchEvent(new PointerEvent('pointerup', {}));\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t// Wait for next frame to ensure DOM updates\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait new Promise((resolve) => requestAnimationFrame(resolve));\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait new Promise((resolve) => requestAnimationFrame(resolve));\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton = document.getElementById(\`source-\${message.id}-\${idx}\`);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (sourceButton) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsourceButton.scrollIntoView({ behavior: 'smooth' });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tonAddMessages={({ modelId, parentId, messages }) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\taddMessages({ modelId, parentId, messages });\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:update={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmessage.content = e.detail.content;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdispatch('update', message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if message?.error && message.error !== true}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Error content={message.error.content} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if (message?.sources || message?.citations) && (model?.info?.meta?.capabilities?.citations ?? true)}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Citations id={message?.id} sources={message?.sources ?? message?.citations} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if message.code_executions}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<CodeExecutions id={message?.id} code_executions={message.code_executions} />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t{#if !edit}\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tbind:this={buttonsContainerElement}\\n\\t\\t\\t\\t\\t\\tclass=\\"flex justify-start overflow-x-auto buttons text-gray-600 dark:text-gray-500 mt-0.5\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{#if message.done || siblings.length > 1}\\n\\t\\t\\t\\t\\t\\t\\t{#if siblings.length > 1}\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex self-center min-w-fit\\" dir=\\"ltr\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tshowPreviousMessage(message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"size-3.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M15.75 19.5 8.25 12l7.5-7.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"text-sm tracking-widest font-semibold self-center dark:text-gray-100 min-w-fit\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{siblings.indexOf(message.id) + 1}/{siblings.length}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tshowNextMessage(message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"size-3.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"m8.25 4.5 7.5 7.5-7.5 7.5\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t{#if message.done}\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if !readOnly}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if $user.role === 'user' ? ($user?.permissions?.chat?.edit ?? true) : true}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Edit')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\teditMessageHandler();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Copy')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition copy-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcopyToClipboard(message.content);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Read Aloud')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"speak-button-{message.id}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (!loadingSpeech) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttoggleSpeakMessage();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if loadingSpeech}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_S1WN {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation: spinner_MGfb 0.8s linear infinite;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.8s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_Km9P {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.65s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_JApP {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.5s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t@keyframes spinner_MGfb {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t93.75%,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t100% {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\topacity: 0.2;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN\\" cx=\\"4\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN spinner_Km9P\\" cx=\\"12\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN spinner_JApP\\" cx=\\"20\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else if speaking}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if $config?.features.enable_image_generation && ($user.role === 'admin' || $user?.permissions?.features?.image_generation) && !readOnly}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Generate Image')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'}  p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (!generatingImage) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tgenerateImage(message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if generatingImage}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<style>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_S1WN {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation: spinner_MGfb 0.8s linear infinite;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.8s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_Km9P {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.65s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.spinner_JApP {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tanimation-delay: -0.5s;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t@keyframes spinner_MGfb {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t93.75%,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t100% {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\topacity: 0.2;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</style>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN\\" cx=\\"4\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN spinner_Km9P\\" cx=\\"12\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"spinner_S1WN spinner_JApP\\" cx=\\"20\\" cy=\\"12\\" r=\\"3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if message.usage}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcontent={message.usage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? \`<pre>\${sanitizeResponseContent(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tJSON.stringify(message.usage, null, 2)\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.replace(/\\"([^(\\")\\"]+)\\":/g, '$1:')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.slice(1, -1)\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.split('\\\\n')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.map((line) => line.slice(2))\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.map((line) => (line.endsWith(',') ? line.slice(0, -1) : line))\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.join('\\\\n')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t)}</pre>\`\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tplacement=\\"bottom\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" {isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition whitespace-pre-wrap\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconsole.log(message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"info-{message.id}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if !readOnly}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if !$temporaryChatEnabled && ($config?.features.enable_message_rating ?? true)}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Good Response')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg {(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmessage?.annotation?.rating ?? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t).toString() === '1'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'bg-gray-100 dark:bg-gray-800'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} dark:hover:text-white hover:text-black transition disabled:cursor-progress disabled:hover:bg-transparent\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdisabled={feedbackLoading}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait feedbackHandler(1);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\twindow.setTimeout(() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdocument\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.getElementById(\`message-feedback-\${message.id}\`)\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t?.scrollIntoView();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}, 0);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Bad Response')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg {(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmessage?.annotation?.rating ?? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t).toString() === '-1'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'bg-gray-100 dark:bg-gray-800'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''} dark:hover:text-white hover:text-black transition disabled:cursor-progress disabled:hover:bg-transparent\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdisabled={feedbackLoading}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait feedbackHandler(-1);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\twindow.setTimeout(() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdocument\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.getElementById(\`message-feedback-\${message.id}\`)\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t?.scrollIntoView();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}, 0);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if isLastMessage}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Continue Response')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"continue-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcontinueResponse();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Regenerate')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tshowRateComment = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tregenerateResponse(message);\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t(model?.actions ?? []).forEach((action) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdispatch('action', {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid: action.id,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tevent: {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid: 'regenerate-response',\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata: {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmessageId: message.id\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2.3\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if siblings.length > 1}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Delete')} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tid=\\"continue-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tshowDeleteConfirm = true;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"none\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-width=\\"2\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linecap=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2 2 0 0 1-2 2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if isLastMessage}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#each model?.actions ?? [] as action}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Tooltip content={action.name} placement=\\"bottom\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"{isLastMessage\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'visible'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: 'invisible group-hover:visible'} p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tactionMessage(action.id, message);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if action.icon_url}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"size-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsrc={action.icon_url}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4 {action.icon_url.includes('svg')\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? 'dark:invert-[80%]'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ''}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstyle=\\"fill: currentColor;\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\talt={action.name}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Sparkles strokeWidth=\\"2.1\\" className=\\"size-4\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t{#if message.done && showRateComment}\\n\\t\\t\\t\\t\\t\\t<RateComment\\n\\t\\t\\t\\t\\t\\t\\tbind:message\\n\\t\\t\\t\\t\\t\\t\\tbind:show={showRateComment}\\n\\t\\t\\t\\t\\t\\t\\ton:save={async (e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\tawait feedbackHandler(null, {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t...e.detail\\n\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n{/key}\\n\\n<style>\\n\\t.buttons::-webkit-scrollbar {\\n\\t\\tdisplay: none; /* for Chrome, Safari and Opera */\\n\\t}\\n\\n\\t.buttons {\\n\\t\\t-ms-overflow-style: none; /* IE and Edge */\\n\\t\\tscrollbar-width: none; /* Firefox */\\n\\t}\\n\\t\\n\\t/* Table styling improvements */\\n\\t:global(.table-improved) {\\n\\t\\twidth: calc(100% + 1rem) !important;\\n\\t\\tmax-width: none !important;\\n\\t\\tmargin-left: -0.5rem;\\n\\t\\tmargin-right: -0.5rem;\\n\\t}\\n\\t\\n\\t:global(.table-improved thead) {\\n\\t\\tbackground-color: #e8f4ff !important; /* Light blue header */\\n\\t}\\n\\t\\n\\t:global(.dark .table-improved thead) {\\n\\t\\tbackground-color: #1e3a5f !important; /* Dark theme blue header */\\n\\t}\\n\\t\\n\\t:global(.table-improved th) {\\n\\t\\tfont-weight: 600;\\n\\t\\tpadding: 0.75rem 1rem !important;\\n\\t}\\n\\t\\n\\t:global(.table-improved td) {\\n\\t\\tpadding: 0.625rem 1rem !important;\\n\\t}\\n\\n\\t/* Agent loading animation styles */\\n\\t.agent-loading-animation {\\n\\t\\tpadding: 0.5rem 0;\\n\\t}\\n\\n\\t.agent-loading-text {\\n\\t\\tfont-size: 1rem;\\n\\t\\tline-height: 1.5;\\n\\t\\tcolor: var(--text-primary);\\n\\t}\\n\\n\\t.typing-animation {\\n\\t\\tdisplay: inline-flex;\\n\\t\\talign-items: center;\\n\\t\\tmargin-right: 0.5rem;\\n\\t}\\n\\n\\t.typing-animation span {\\n\\t\\theight: 0.5rem;\\n\\t\\twidth: 0.5rem;\\n\\t\\tmargin: 0 0.1rem;\\n\\t\\tbackground-color: #4b5563;\\n\\t\\tborder-radius: 50%;\\n\\t\\tdisplay: inline-block;\\n\\t\\topacity: 0.6;\\n\\t}\\n\\n\\t:global(.dark) .typing-animation span {\\n\\t\\tbackground-color: #9ca3af;\\n\\t}\\n\\n\\t.typing-animation span:nth-child(1) {\\n\\t\\tanimation: pulse 1.5s infinite ease-in-out;\\n\\t}\\n\\n\\t.typing-animation span:nth-child(2) {\\n\\t\\tanimation: pulse 1.5s infinite ease-in-out 0.3s;\\n\\t}\\n\\n\\t.typing-animation span:nth-child(3) {\\n\\t\\tanimation: pulse 1.5s infinite ease-in-out 0.6s;\\n\\t}\\n\\n\\t@keyframes pulse {\\n\\t\\t0%, 100% {\\n\\t\\t\\ttransform: scale(0.75);\\n\\t\\t\\topacity: 0.4;\\n\\t\\t}\\n\\t\\t50% {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAw6CC,oCAAQ,mBAAoB,CAC3B,OAAO,CAAE,IACV,CAEA,oCAAS,CACR,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAClB,CAGQ,eAAiB,CACxB,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACnC,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,WAAW,CAAE,OAAO,CACpB,YAAY,CAAE,OACf,CAEQ,qBAAuB,CAC9B,gBAAgB,CAAE,OAAO,CAAC,UAC3B,CAEQ,2BAA6B,CACpC,gBAAgB,CAAE,OAAO,CAAC,UAC3B,CAEQ,kBAAoB,CAC3B,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,OAAO,CAAC,IAAI,CAAC,UACvB,CAEQ,kBAAoB,CAC3B,OAAO,CAAE,QAAQ,CAAC,IAAI,CAAC,UACxB,CAGA,oDAAyB,CACxB,OAAO,CAAE,MAAM,CAAC,CACjB,CAEA,+CAAoB,CACnB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,cAAc,CAC1B,CAEA,6CAAkB,CACjB,OAAO,CAAE,WAAW,CACpB,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,MACf,CAEA,+BAAiB,CAAC,kBAAK,CACtB,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,CAAC,CAAC,MAAM,CAChB,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,GACV,CAEQ,KAAM,CAAC,+BAAiB,CAAC,kBAAK,CACrC,gBAAgB,CAAE,OACnB,CAEA,+BAAiB,CAAC,kBAAI,WAAW,CAAC,CAAE,CACnC,SAAS,CAAE,mBAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,WAChC,CAEA,+BAAiB,CAAC,kBAAI,WAAW,CAAC,CAAE,CACnC,SAAS,CAAE,mBAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,WAAW,CAAC,IAC5C,CAEA,+BAAiB,CAAC,kBAAI,WAAW,CAAC,CAAE,CACnC,SAAS,CAAE,mBAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,WAAW,CAAC,IAC5C,CAEA,WAAW,mBAAM,CAChB,EAAE,CAAE,IAAK,CACR,SAAS,CAAE,MAAM,IAAI,CAAC,CACtB,OAAO,CAAE,GACV,CACA,GAAI,CACH,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACD"}`
};
function isJsonString(str) {
  try {
    const json = JSON.parse(str);
    return typeof json === "object" && json !== null;
  } catch (e) {
    return false;
  }
}
function processAgentResponse(content) {
  console.log("Processing agent response:", content);
  console.log("Type of content:", typeof content);
  if (!content || typeof content !== "string") return { isAgent: false, content };
  if (isJsonString(content)) {
    try {
      const parsedContent = JSON.parse(content);
      if (parsedContent.success && parsedContent.response) {
        console.log("📊 Detected agent response:", parsedContent.response.type);
        if (parsedContent.response.type === "query_chart") {
          return {
            isAgent: true,
            type: "query_chart",
            content: parsedContent.response.content,
            data: parsedContent
          };
        }
        if (parsedContent.response.type === "query_result") {
          return {
            isAgent: true,
            type: parsedContent.response.type,
            content: parsedContent.response.content,
            data: parsedContent
          };
        }
        return {
          isAgent: true,
          type: parsedContent.response.type,
          content: parsedContent.response.content,
          data: parsedContent
        };
      }
      if (parsedContent.success && (parsedContent.type === "query_result" || parsedContent.type === "query_chart")) {
        console.log("📊 Detected direct query type:", parsedContent.type);
        return {
          isAgent: true,
          type: parsedContent.type,
          content: parsedContent.response.content,
          data: parsedContent
        };
      }
    } catch (e) {
      console.error("Error parsing potential agent response:", e);
    }
  }
  return { isAgent: false, content };
}
const ResponseMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let processedResponse;
  let $models, $$unsubscribe_models;
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $$unsubscribe_TTSWorker;
  let $i18n, $$unsubscribe_i18n;
  let $user, $$unsubscribe_user;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_TTSWorker = subscribe(TTSWorker, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { chatId: chatId2 = "" } = $$props;
  let { history } = $$props;
  let { messageId } = $$props;
  let { message = JSON.parse(JSON.stringify(history.messages[messageId])) } = $$props;
  let { siblings } = $$props;
  let { showPreviousMessage } = $$props;
  let { showNextMessage } = $$props;
  let { updateChat } = $$props;
  let { editMessage } = $$props;
  let { saveMessage } = $$props;
  let { rateMessage } = $$props;
  let { actionMessage } = $$props;
  let { deleteMessage } = $$props;
  let { submitMessage } = $$props;
  let { continueResponse } = $$props;
  let { regenerateResponse } = $$props;
  let { addMessages } = $$props;
  let { isLastMessage = true } = $$props;
  let { readOnly = false } = $$props;
  let buttonsContainerElement;
  let showDeleteConfirm = false;
  let model = null;
  let showRateComment = false;
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.messageId === void 0 && $$bindings.messageId && messageId !== void 0) $$bindings.messageId(messageId);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.siblings === void 0 && $$bindings.siblings && siblings !== void 0) $$bindings.siblings(siblings);
  if ($$props.showPreviousMessage === void 0 && $$bindings.showPreviousMessage && showPreviousMessage !== void 0) $$bindings.showPreviousMessage(showPreviousMessage);
  if ($$props.showNextMessage === void 0 && $$bindings.showNextMessage && showNextMessage !== void 0) $$bindings.showNextMessage(showNextMessage);
  if ($$props.updateChat === void 0 && $$bindings.updateChat && updateChat !== void 0) $$bindings.updateChat(updateChat);
  if ($$props.editMessage === void 0 && $$bindings.editMessage && editMessage !== void 0) $$bindings.editMessage(editMessage);
  if ($$props.saveMessage === void 0 && $$bindings.saveMessage && saveMessage !== void 0) $$bindings.saveMessage(saveMessage);
  if ($$props.rateMessage === void 0 && $$bindings.rateMessage && rateMessage !== void 0) $$bindings.rateMessage(rateMessage);
  if ($$props.actionMessage === void 0 && $$bindings.actionMessage && actionMessage !== void 0) $$bindings.actionMessage(actionMessage);
  if ($$props.deleteMessage === void 0 && $$bindings.deleteMessage && deleteMessage !== void 0) $$bindings.deleteMessage(deleteMessage);
  if ($$props.submitMessage === void 0 && $$bindings.submitMessage && submitMessage !== void 0) $$bindings.submitMessage(submitMessage);
  if ($$props.continueResponse === void 0 && $$bindings.continueResponse && continueResponse !== void 0) $$bindings.continueResponse(continueResponse);
  if ($$props.regenerateResponse === void 0 && $$bindings.regenerateResponse && regenerateResponse !== void 0) $$bindings.regenerateResponse(regenerateResponse);
  if ($$props.addMessages === void 0 && $$bindings.addMessages && addMessages !== void 0) $$bindings.addMessages(addMessages);
  if ($$props.isLastMessage === void 0 && $$bindings.isLastMessage && isLastMessage !== void 0) $$bindings.isLastMessage(isLastMessage);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0) $$bindings.readOnly(readOnly);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (history.messages) {
        if (JSON.stringify(message) !== JSON.stringify(history.messages[messageId])) {
          console.log("📱 ResponseMessage updated for message:", messageId);
          message = JSON.parse(JSON.stringify(history.messages[messageId]));
        }
      }
    }
    model = $models.find((m) => m.id === message.model);
    {
      {
        (async () => {
          await tick();
        })();
      }
    }
    {
      if (message?.content) {
        console.log(`🖥️ Rendering message ${messageId} content length: ${message.content.length}`);
      }
    }
    processedResponse = processAgentResponse(message?.content);
    $$rendered = `${validate_component(ConfirmDialog, "DeleteConfirmDialog").$$render(
      $$result,
      {
        title: $i18n.t("Delete message?"),
        show: showDeleteConfirm
      },
      {
        show: ($$value) => {
          showDeleteConfirm = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="${"flex w-full message-" + escape(message.id, true) + " svelte-wlev50"}" id="${"message-" + escape(message.id, true)}"${add_attribute("dir", $settings.chatDirection, 0)}><div class="${escape(
      null_to_empty(`shrink-0 ${($settings?.chatDirection ?? "LTR") === "LTR" ? "mr-3" : "ml-3"}`),
      true
    ) + " svelte-wlev50"}">${validate_component(ProfileImage, "ProfileImage").$$render(
      $$result,
      {
        src: model?.info?.meta?.profile_image_url ?? ($i18n.language === "dg-DG" ? `/doge.png` : `${WEBUI_BASE_URL}/static/favicon.png`),
        className: "size-8"
      },
      {},
      {}
    )}</div> <div class="flex-auto w-0 pl-1">${validate_component(Name, "Name").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            content: model?.name ?? message.model,
            placement: "top-start"
          },
          {},
          {
            default: () => {
              return `<span class="line-clamp-1 svelte-wlev50">${escape(model?.name ?? message.model)}</span>`;
            }
          }
        )} ${message.timestamp ? `<div class="self-center text-xs invisible group-hover:visible text-gray-400 font-medium first-letter:capitalize ml-0.5 translate-y-[1px]">${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            content: dayjs(message.timestamp * 1e3).format("LLLL")
          },
          {},
          {
            default: () => {
              return `<span class="line-clamp-1 svelte-wlev50">${escape(formatDate(message.timestamp * 1e3))}</span>`;
            }
          }
        )}</div>` : ``}`;
      }
    })} <div>${message?.files && message.files?.filter((f) => f.type === "image").length > 0 ? `<div class="my-2.5 w-full flex overflow-x-auto gap-2 flex-wrap">${each(message.files, (file) => {
      return `<div>${file.type === "image" ? `${validate_component(Image, "Image").$$render($$result, { src: file.url, alt: message.content }, {}, {})}` : ``} </div>`;
    })}</div>` : ``} <div class="${"chat-" + escape(message.role, true) + " w-full min-w-full markdown-prose svelte-wlev50"}"><div>${(message?.statusHistory ?? [...message?.status ? [message?.status] : []]).length > 0 ? (() => {
      let status = (message?.statusHistory ?? [...message?.status ? [message?.status] : []]).at(-1);
      return ` ${!status?.hidden ? `<div class="status-description flex items-center gap-2 py-0.5">${status?.done === false ? `<div class="">${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}</div>` : ``} ${status?.action === "web_search" && status?.urls ? `${validate_component(WebSearchResults, "WebSearchResults").$$render($$result, { status }, {}, {
        default: () => {
          return `<div class="flex flex-col justify-center -space-y-0.5"><div class="${escape(status?.done === false ? "shimmer" : "", true) + " text-base line-clamp-1 text-wrap"}">   ${status?.description.includes("{{count}}") ? `${escape($i18n.t(status?.description, { count: status?.urls.length }))}` : `${status?.description === "No search query generated" ? `${escape($i18n.t("No search query generated"))}` : `${status?.description === "Generating search query" ? `${escape($i18n.t("Generating search query"))}` : `${escape(status?.description)}`}`}`}</div></div>`;
        }
      })}` : `${status?.action === "knowledge_search" ? `<div class="flex flex-col justify-center -space-y-0.5"><div class="${escape(status?.done === false ? "shimmer" : "", true) + " text-gray-500 dark:text-gray-500 text-base line-clamp-1 text-wrap"}">${escape($i18n.t(`Searching Knowledge for "{{searchQuery}}"`, { searchQuery: status.query }))}</div></div>` : `<div class="flex flex-col justify-center -space-y-0.5"><div class="${escape(status?.done === false ? "shimmer" : "", true) + " text-gray-500 dark:text-gray-500 text-base line-clamp-1 text-wrap"}"> ${status?.description.includes("{{searchQuery}}") ? `${escape($i18n.t(status?.description, { searchQuery: status?.query }))}` : `${status?.description === "No search query generated" ? `${escape($i18n.t("No search query generated"))}` : `${status?.description === "Generating search query" ? `${escape($i18n.t("Generating search query"))}` : `${escape(status?.description)}`}`}`}</div></div>`}`}</div>` : ``}`;
    })() : ``} ${`<div class="w-full flex flex-col relative" id="response-content-container">${message.content === "" && !message.error ? `${validate_component(Skeleton, "Skeleton").$$render($$result, {}, {}, {})}` : `${message.content && message.error !== true ? `${message.isLoading ? ` <div class="agent-loading-animation svelte-wlev50"><div class="flex items-center"><div class="typing-animation mr-1 svelte-wlev50" data-svelte-h="svelte-1b5cdcg"><span class="svelte-wlev50"></span> <span class="svelte-wlev50"></span> <span class="svelte-wlev50"></span></div> <div class="agent-loading-text svelte-wlev50">${escape(message.content)}</div></div></div>` : `${processedResponse.isAgent ? `${(processedResponse.type === "query_result" || processedResponse.data.type === "query_result") && (processedResponse.data.results || processedResponse.data.response?.results) ? `<div class="agent-query-results py-3"><div class="mb-4 text-gray-700 dark:text-gray-300">${escape(processedResponse.content)}</div>  <div class="mb-2"><div class="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-10hd957"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75"></path></svg>
														Data Table</div> <div class="overflow-x-auto">${processedResponse.data.results ? `${validate_component(Table, "Table").$$render(
      $$result,
      {
        data: processedResponse.data.results.records,
        columns: processedResponse.data.results.columns,
        className: "border w-full table-improved"
      },
      {},
      {}
    )}` : `${processedResponse.data.response?.results ? `${validate_component(Table, "Table").$$render(
      $$result,
      {
        data: processedResponse.data.response.results.records,
        columns: processedResponse.data.response.results.columns,
        className: "border w-full table-improved"
      },
      {},
      {}
    )}` : ``}`}</div></div> ${processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query ? `<div class="mt-4 mb-2"><div class="flex justify-between items-center mb-2"><div class="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2" data-svelte-h="svelte-5npp6j"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
																SQL Query</div> <button class="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors" data-svelte-h="svelte-yiav4"><div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg>
																	Copy</div></button></div> <pre class="bg-gray-50 dark:bg-gray-800/70 p-3 rounded-lg overflow-auto text-sm font-mono border border-gray-200 dark:border-gray-700 shadow-inner">															<code class="sql-syntax text-gray-800 dark:text-gray-200">
${escape(processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query)}
															</code>
														</pre></div>` : ``}</div>` : `${(processedResponse.type === "query_chart" || processedResponse.data.type === "query_chart") && processedResponse.data.response?.chart_url ? `<div class="agent-query-chart py-3"> <div class="mb-3 text-gray-700 dark:text-gray-300">${escape(processedResponse.content)}</div>  <div class="mb-4 relative"><div class="absolute top-2 right-2 flex gap-2 z-10"><a${add_attribute("href", processedResponse.data.response.chart_url, 0)} download="chart.png" target="_blank" class="p-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Download chart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg></a> <a${add_attribute("href", processedResponse.data.response.chart_url, 0)} target="_blank" class="p-1.5 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" title="Open in new tab"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></a></div> <img${add_attribute("src", processedResponse.data.response.chart_url, 0)} alt="Data visualization chart" class="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"></div>  ${processedResponse.data.results?.records ? `<div class="mt-4 mb-2"><div class="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-h22r7a"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75"></path></svg>
															Data Table</div> <div class="overflow-x-auto">${validate_component(Table, "Table").$$render(
      $$result,
      {
        data: processedResponse.data.results.records,
        columns: processedResponse.data.results.columns,
        className: "border w-full table-improved",
        maxPreviewRows: 12
      },
      {},
      {}
    )}</div></div>` : ``}  ${processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query ? `<div class="mt-4 mb-2"><div class="flex justify-between items-center mb-2"><div class="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2" data-svelte-h="svelte-5npp6j"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
																SQL Query</div> <button class="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors" data-svelte-h="svelte-yiav4"><div class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg>
																	Copy</div></button></div> <pre class="bg-gray-50 dark:bg-gray-800/70 p-3 rounded-lg overflow-auto text-sm font-mono border border-gray-200 dark:border-gray-700 shadow-inner">															<code class="sql-syntax text-gray-800 dark:text-gray-200">
${escape(processedResponse.data.results?.sql_query || processedResponse.data.metadata?.sql_query)}
															</code>
														</pre></div>` : ``}</div>` : `${processedResponse.type === "chart" && processedResponse.data.response.chart_url ? `<div class="agent-chart py-2"><div class="mb-2">${escape(processedResponse.content)}</div> <img${add_attribute("src", processedResponse.data.response.chart_url, 0)} alt="Chart" class="max-w-full h-auto border dark:border-gray-700 rounded"></div>` : ` ${validate_component(ContentRenderer, "ContentRenderer").$$render(
      $$result,
      {
        id: message.id,
        history,
        content: processedResponse.isAgent ? processedResponse.content : message.content,
        sources: message.sources,
        floatingButtons: message?.done,
        save: !readOnly,
        model,
        onTaskClick: async (e) => {
          console.log(e);
        },
        onSourceClick: async (id, idx) => {
          console.log(id, idx);
          let sourceButton = document.getElementById(`source-${message.id}-${idx}`);
          const sourcesCollapsible = document.getElementById(`collapsible-sources`);
          if (sourceButton) {
            sourceButton.scrollIntoView({ behavior: "smooth" });
          } else if (sourcesCollapsible) {
            sourcesCollapsible.querySelector("div:first-child").dispatchEvent(new PointerEvent("pointerup", {}));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            sourceButton = document.getElementById(`source-${message.id}-${idx}`);
            if (sourceButton) {
              sourceButton.scrollIntoView({ behavior: "smooth" });
            }
          }
        },
        onAddMessages: ({ modelId, parentId, messages }) => {
          addMessages({ modelId, parentId, messages });
        }
      },
      {},
      {}
    )}`}`}`}` : ` ${validate_component(ContentRenderer, "ContentRenderer").$$render(
      $$result,
      {
        id: message.id,
        history,
        content: message.content,
        sources: message.sources,
        floatingButtons: message?.done,
        save: !readOnly,
        model,
        onTaskClick: async (e) => {
          console.log(e);
        },
        onSourceClick: async (id, idx) => {
          console.log(id, idx);
          let sourceButton = document.getElementById(`source-${message.id}-${idx}`);
          const sourcesCollapsible = document.getElementById(`collapsible-sources`);
          if (sourceButton) {
            sourceButton.scrollIntoView({ behavior: "smooth" });
          } else if (sourcesCollapsible) {
            sourcesCollapsible.querySelector("div:first-child").dispatchEvent(new PointerEvent("pointerup", {}));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            sourceButton = document.getElementById(`source-${message.id}-${idx}`);
            if (sourceButton) {
              sourceButton.scrollIntoView({ behavior: "smooth" });
            }
          }
        },
        onAddMessages: ({ modelId, parentId, messages }) => {
          addMessages({ modelId, parentId, messages });
        }
      },
      {},
      {}
    )}`}`} ${message?.error && message.error !== true ? `${validate_component(Error, "Error").$$render($$result, { content: message.error.content }, {}, {})}` : ``} ${(message?.sources || message?.citations) && (model?.info?.meta?.capabilities?.citations ?? true) ? `${validate_component(Citations, "Citations").$$render(
      $$result,
      {
        id: message?.id,
        sources: message?.sources ?? message?.citations
      },
      {},
      {}
    )}` : ``} ${message.code_executions ? `${validate_component(CodeExecutions, "CodeExecutions").$$render(
      $$result,
      {
        id: message?.id,
        code_executions: message.code_executions
      },
      {},
      {}
    )}` : ``}` : ``}`}</div>`}</div></div> ${`<div class="flex justify-start overflow-x-auto buttons text-gray-600 dark:text-gray-500 mt-0.5 svelte-wlev50"${add_attribute("this", buttonsContainerElement, 0)}>${message.done || siblings.length > 1 ? `${siblings.length > 1 ? `<div class="flex self-center min-w-fit" dir="ltr"><button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-1e0chv1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg></button> <div class="text-sm tracking-widest font-semibold self-center dark:text-gray-100 min-w-fit">${escape(siblings.indexOf(message.id) + 1)}/${escape(siblings.length)}</div> <button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-107ksnk"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg></button></div>` : ``} ${message.done ? `${!readOnly ? `${($user.role === "user" ? $user?.permissions?.chat?.edit ?? true : true) ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Edit"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition"}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg></button>`;
        }
      }
    )}` : ``}` : ``} ${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Copy"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition copy-response-button"}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path></svg></button>`;
        }
      }
    )} ${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Read Aloud"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button id="${"speak-button-" + escape(message.id, true)}" class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition"}">${`${`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path></svg>`}`}</button>`;
        }
      }
    )} ${$config?.features.enable_image_generation && ($user.role === "admin" || $user?.permissions?.features?.image_generation) && !readOnly ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Generate Image"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition"}">${`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg>`}</button>`;
        }
      }
    )}` : ``} ${message.usage ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: message.usage ? `<pre>${sanitizeResponseContent(JSON.stringify(message.usage, null, 2).replace(/"([^(")"]+)":/g, "$1:").slice(1, -1).split("\n").map((line) => line.slice(2)).map((line) => line.endsWith(",") ? line.slice(0, -1) : line).join("\n"))}</pre>` : "",
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${"" + escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition whitespace-pre-wrap"}" id="${"info-" + escape(message.id, true)}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z"></path></svg></button>`;
        }
      }
    )}` : ``} ${!readOnly ? `${!$temporaryChatEnabled && ($config?.features.enable_message_rating ?? true) ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Good Response"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg " + escape(
            (message?.annotation?.rating ?? "").toString() === "1" ? "bg-gray-100 dark:bg-gray-800" : "",
            true
          ) + " dark:hover:text-white hover:text-black transition disabled:cursor-progress disabled:hover:bg-transparent"}" ${""}><svg stroke="currentColor" fill="none" stroke-width="2.3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button>`;
        }
      }
    )} ${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Bad Response"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg " + escape(
            (message?.annotation?.rating ?? "").toString() === "-1" ? "bg-gray-100 dark:bg-gray-800" : "",
            true
          ) + " dark:hover:text-white hover:text-black transition disabled:cursor-progress disabled:hover:bg-transparent"}" ${""}><svg stroke="currentColor" fill="none" stroke-width="2.3" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></button>`;
        }
      }
    )}` : ``} ${isLastMessage ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Continue Response"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button type="button" id="continue-response-button" class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button"}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg></button>`;
        }
      }
    )}` : ``} ${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Regenerate"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button type="button" class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button"}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path></svg></button>`;
        }
      }
    )} ${siblings.length > 1 ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Delete"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button type="button" id="continue-response-button" class="${escape(
            isLastMessage ? "visible" : "invisible group-hover:visible",
            true
          ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition regenerate-response-button"}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2 2 0 0 1-2 2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></button>`;
        }
      }
    )}` : ``} ${isLastMessage ? `${each(model?.actions ?? [], (action) => {
      return `${validate_component(Tooltip, "Tooltip").$$render(
        $$result,
        {
          content: action.name,
          placement: "bottom"
        },
        {},
        {
          default: () => {
            return `<button type="button" class="${escape(
              isLastMessage ? "visible" : "invisible group-hover:visible",
              true
            ) + " p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition"}">${action.icon_url ? `<div class="size-4"><img${add_attribute("src", action.icon_url, 0)} class="${"w-4 h-4 " + escape(
              action.icon_url.includes("svg") ? "dark:invert-[80%]" : "",
              true
            )}" style="fill: currentColor;"${add_attribute("alt", action.name, 0)}> </div>` : `${validate_component(Sparkles, "Sparkles").$$render($$result, { strokeWidth: "2.1", className: "size-4" }, {}, {})}`}</button> `;
          }
        }
      )}`;
    })}` : ``}` : ``}` : ``}` : ``}</div> ${message.done && showRateComment ? `${validate_component(RateComment, "RateComment").$$render(
      $$result,
      { message, show: showRateComment },
      {
        message: ($$value) => {
          message = $$value;
          $$settled = false;
        },
        show: ($$value) => {
          showRateComment = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_models();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_TTSWorker();
  $$unsubscribe_i18n();
  $$unsubscribe_user();
  $$unsubscribe_temporaryChatEnabled();
  return $$rendered;
});
const MultiResponseMessages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_mobile;
  let $$unsubscribe_i18n;
  $$unsubscribe_mobile = subscribe(mobile, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  dayjs.extend(localizedFormat);
  let { chatId: chatId2 } = $$props;
  let { history } = $$props;
  let { messageId } = $$props;
  let { isLastMessage } = $$props;
  let { readOnly = false } = $$props;
  let { updateChat } = $$props;
  let { editMessage } = $$props;
  let { saveMessage } = $$props;
  let { rateMessage } = $$props;
  let { actionMessage } = $$props;
  let { submitMessage } = $$props;
  let { deleteMessage } = $$props;
  let { continueResponse } = $$props;
  let { regenerateResponse } = $$props;
  let { mergeResponses } = $$props;
  let { addMessages } = $$props;
  let { triggerScroll } = $$props;
  createEventDispatcher();
  let message = JSON.parse(JSON.stringify(history.messages[messageId]));
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.messageId === void 0 && $$bindings.messageId && messageId !== void 0) $$bindings.messageId(messageId);
  if ($$props.isLastMessage === void 0 && $$bindings.isLastMessage && isLastMessage !== void 0) $$bindings.isLastMessage(isLastMessage);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0) $$bindings.readOnly(readOnly);
  if ($$props.updateChat === void 0 && $$bindings.updateChat && updateChat !== void 0) $$bindings.updateChat(updateChat);
  if ($$props.editMessage === void 0 && $$bindings.editMessage && editMessage !== void 0) $$bindings.editMessage(editMessage);
  if ($$props.saveMessage === void 0 && $$bindings.saveMessage && saveMessage !== void 0) $$bindings.saveMessage(saveMessage);
  if ($$props.rateMessage === void 0 && $$bindings.rateMessage && rateMessage !== void 0) $$bindings.rateMessage(rateMessage);
  if ($$props.actionMessage === void 0 && $$bindings.actionMessage && actionMessage !== void 0) $$bindings.actionMessage(actionMessage);
  if ($$props.submitMessage === void 0 && $$bindings.submitMessage && submitMessage !== void 0) $$bindings.submitMessage(submitMessage);
  if ($$props.deleteMessage === void 0 && $$bindings.deleteMessage && deleteMessage !== void 0) $$bindings.deleteMessage(deleteMessage);
  if ($$props.continueResponse === void 0 && $$bindings.continueResponse && continueResponse !== void 0) $$bindings.continueResponse(continueResponse);
  if ($$props.regenerateResponse === void 0 && $$bindings.regenerateResponse && regenerateResponse !== void 0) $$bindings.regenerateResponse(regenerateResponse);
  if ($$props.mergeResponses === void 0 && $$bindings.mergeResponses && mergeResponses !== void 0) $$bindings.mergeResponses(mergeResponses);
  if ($$props.addMessages === void 0 && $$bindings.addMessages && addMessages !== void 0) $$bindings.addMessages(addMessages);
  if ($$props.triggerScroll === void 0 && $$bindings.triggerScroll && triggerScroll !== void 0) $$bindings.triggerScroll(triggerScroll);
  {
    if (history.messages) {
      if (JSON.stringify(message) !== JSON.stringify(history.messages[messageId])) {
        message = JSON.parse(JSON.stringify(history.messages[messageId]));
      }
    }
  }
  $$unsubscribe_mobile();
  $$unsubscribe_i18n();
  return `${``}`;
});
const UserMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $settings, $$unsubscribe_settings;
  let $models, $$unsubscribe_models;
  let $_user, $$unsubscribe__user;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe__user = subscribe(user, (value) => $_user = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  dayjs.extend(localizedFormat);
  let { user: user$1 } = $$props;
  let { history } = $$props;
  let { messageId } = $$props;
  let { siblings } = $$props;
  let { showPreviousMessage } = $$props;
  let { showNextMessage } = $$props;
  let { editMessage } = $$props;
  let { deleteMessage } = $$props;
  let { isFirstMessage } = $$props;
  let { readOnly } = $$props;
  let showDeleteConfirm = false;
  let message = JSON.parse(JSON.stringify(history.messages[messageId]));
  if ($$props.user === void 0 && $$bindings.user && user$1 !== void 0) $$bindings.user(user$1);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.messageId === void 0 && $$bindings.messageId && messageId !== void 0) $$bindings.messageId(messageId);
  if ($$props.siblings === void 0 && $$bindings.siblings && siblings !== void 0) $$bindings.siblings(siblings);
  if ($$props.showPreviousMessage === void 0 && $$bindings.showPreviousMessage && showPreviousMessage !== void 0) $$bindings.showPreviousMessage(showPreviousMessage);
  if ($$props.showNextMessage === void 0 && $$bindings.showNextMessage && showNextMessage !== void 0) $$bindings.showNextMessage(showNextMessage);
  if ($$props.editMessage === void 0 && $$bindings.editMessage && editMessage !== void 0) $$bindings.editMessage(editMessage);
  if ($$props.deleteMessage === void 0 && $$bindings.deleteMessage && deleteMessage !== void 0) $$bindings.deleteMessage(deleteMessage);
  if ($$props.isFirstMessage === void 0 && $$bindings.isFirstMessage && isFirstMessage !== void 0) $$bindings.isFirstMessage(isFirstMessage);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0) $$bindings.readOnly(readOnly);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (history.messages) {
        if (JSON.stringify(message) !== JSON.stringify(history.messages[messageId])) {
          message = JSON.parse(JSON.stringify(history.messages[messageId]));
        }
      }
    }
    $$rendered = `${validate_component(ConfirmDialog, "DeleteConfirmDialog").$$render(
      $$result,
      {
        title: $i18n.t("Delete message?"),
        show: showDeleteConfirm
      },
      {
        show: ($$value) => {
          showDeleteConfirm = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="flex w-full user-message"${add_attribute("dir", $settings.chatDirection, 0)} id="${"message-" + escape(message.id, true)}">${!($settings?.chatBubble ?? true) ? `<div${add_attribute(
      "class",
      `shrink-0 ${($settings?.chatDirection ?? "LTR") === "LTR" ? "mr-3" : "ml-3"}`,
      0
    )}>${validate_component(ProfileImage, "ProfileImage").$$render(
      $$result,
      {
        src: message.user ? $models.find((m) => m.id === message.user)?.info?.meta?.profile_image_url ?? "/user.png" : user$1?.profile_image_url ?? "/user.png",
        className: "size-8"
      },
      {},
      {}
    )}</div>` : ``} <div class="flex-auto w-0 max-w-full pl-1">${!($settings?.chatBubble ?? true) ? `<div>${validate_component(Name, "Name").$$render($$result, {}, {}, {
      default: () => {
        return `${message.user ? `${escape($i18n.t("You"))} <span class="text-gray-500 text-sm font-medium">${escape(message?.user ?? "")}</span>` : `${$settings.showUsername || $_user.name !== user$1.name ? `${escape(user$1.name)}` : `${escape($i18n.t("You"))}`}`} ${message.timestamp ? `<div class="self-center text-xs invisible group-hover:visible text-gray-400 font-medium first-letter:capitalize ml-0.5 translate-y-[1px]">${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            content: dayjs(message.timestamp * 1e3).format("LLLL")
          },
          {},
          {
            default: () => {
              return `<span class="line-clamp-1">${escape(formatDate(message.timestamp * 1e3))}</span>`;
            }
          }
        )}</div>` : ``}`;
      }
    })}</div>` : ``} <div class="${"chat-" + escape(message.role, true) + " w-full min-w-full markdown-prose"}">${message.files ? `<div class="mt-2.5 mb-1 w-full flex flex-col justify-end overflow-x-auto gap-1 flex-wrap">${each(message.files, (file) => {
      return `<div${add_attribute("class", $settings?.chatBubble ?? true ? "self-end" : "", 0)}>${file.type === "image" ? `${validate_component(Image, "Image").$$render(
        $$result,
        {
          src: file.url,
          imageClassName: " max-h-96 rounded-lg"
        },
        {},
        {}
      )}` : `${validate_component(FileItem, "FileItem").$$render(
        $$result,
        {
          item: file,
          url: file.url,
          name: file.name,
          type: file.type,
          size: file?.size,
          colorClassName: "bg-white dark:bg-gray-850 "
        },
        {},
        {}
      )}`} </div>`;
    })}</div>` : ``} ${message.content !== "" ? `${`<div class="w-full"><div class="${"flex " + escape(
      $settings?.chatBubble ?? true ? "justify-end pb-1" : "w-full",
      true
    )}"><div class="${"rounded-3xl " + escape(
      $settings?.chatBubble ?? true ? `max-w-[90%] px-5 py-2  bg-gray-50 dark:bg-gray-850 ${message.files ? "rounded-tr-lg" : ""}` : " w-full",
      true
    )}">${message.content ? `${validate_component(Markdown, "Markdown").$$render($$result, { id: message.id, content: message.content }, {}, {})}` : ``}</div></div> <div class="${"flex " + escape($settings?.chatBubble ?? true ? "justify-end" : "", true) + " text-gray-600 dark:text-gray-500"}">${!($settings?.chatBubble ?? true) ? `${siblings.length > 1 ? `<div class="flex self-center" dir="ltr"><button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-buado9"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg></button> <div class="text-sm tracking-widest font-semibold self-center dark:text-gray-100">${escape(siblings.indexOf(message.id) + 1)}/${escape(siblings.length)}</div> <button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-4phel2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg></button></div>` : ``}` : ``} ${!readOnly ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Edit"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="invisible group-hover:visible p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition edit-user-message-button" data-svelte-h="svelte-tlrz1q"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg></button>`;
        }
      }
    )}` : ``} ${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Copy"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="invisible group-hover:visible p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg dark:hover:text-white hover:text-black transition" data-svelte-h="svelte-1ivgdx2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path></svg></button>`;
        }
      }
    )} ${!isFirstMessage && !readOnly ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Delete"),
        placement: "bottom"
      },
      {},
      {
        default: () => {
          return `<button class="invisible group-hover:visible p-1 rounded-sm dark:hover:text-white hover:text-black transition" data-svelte-h="svelte-146x2zz"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg></button>`;
        }
      }
    )}` : ``} ${$settings?.chatBubble ?? true ? `${siblings.length > 1 ? `<div class="flex self-center" dir="ltr"><button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-buado9"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg></button> <div class="text-sm tracking-widest font-semibold self-center dark:text-gray-100">${escape(siblings.indexOf(message.id) + 1)}/${escape(siblings.length)}</div> <button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition" data-svelte-h="svelte-4phel2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg></button></div>` : ``}` : ``}</div></div>`}` : ``}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_models();
  $$unsubscribe__user();
  return $$rendered;
});
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  createEventDispatcher();
  getContext("i18n");
  let { chatId: chatId2 } = $$props;
  let { idx = 0 } = $$props;
  let { history } = $$props;
  let { messageId } = $$props;
  let { user: user2 } = $$props;
  let { showPreviousMessage } = $$props;
  let { showNextMessage } = $$props;
  let { updateChat } = $$props;
  let { editMessage } = $$props;
  let { saveMessage } = $$props;
  let { deleteMessage } = $$props;
  let { rateMessage } = $$props;
  let { actionMessage } = $$props;
  let { submitMessage } = $$props;
  let { regenerateResponse } = $$props;
  let { continueResponse } = $$props;
  let { mergeResponses } = $$props;
  let { addMessages } = $$props;
  let { triggerScroll } = $$props;
  let { readOnly = false } = $$props;
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.idx === void 0 && $$bindings.idx && idx !== void 0) $$bindings.idx(idx);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.messageId === void 0 && $$bindings.messageId && messageId !== void 0) $$bindings.messageId(messageId);
  if ($$props.user === void 0 && $$bindings.user && user2 !== void 0) $$bindings.user(user2);
  if ($$props.showPreviousMessage === void 0 && $$bindings.showPreviousMessage && showPreviousMessage !== void 0) $$bindings.showPreviousMessage(showPreviousMessage);
  if ($$props.showNextMessage === void 0 && $$bindings.showNextMessage && showNextMessage !== void 0) $$bindings.showNextMessage(showNextMessage);
  if ($$props.updateChat === void 0 && $$bindings.updateChat && updateChat !== void 0) $$bindings.updateChat(updateChat);
  if ($$props.editMessage === void 0 && $$bindings.editMessage && editMessage !== void 0) $$bindings.editMessage(editMessage);
  if ($$props.saveMessage === void 0 && $$bindings.saveMessage && saveMessage !== void 0) $$bindings.saveMessage(saveMessage);
  if ($$props.deleteMessage === void 0 && $$bindings.deleteMessage && deleteMessage !== void 0) $$bindings.deleteMessage(deleteMessage);
  if ($$props.rateMessage === void 0 && $$bindings.rateMessage && rateMessage !== void 0) $$bindings.rateMessage(rateMessage);
  if ($$props.actionMessage === void 0 && $$bindings.actionMessage && actionMessage !== void 0) $$bindings.actionMessage(actionMessage);
  if ($$props.submitMessage === void 0 && $$bindings.submitMessage && submitMessage !== void 0) $$bindings.submitMessage(submitMessage);
  if ($$props.regenerateResponse === void 0 && $$bindings.regenerateResponse && regenerateResponse !== void 0) $$bindings.regenerateResponse(regenerateResponse);
  if ($$props.continueResponse === void 0 && $$bindings.continueResponse && continueResponse !== void 0) $$bindings.continueResponse(continueResponse);
  if ($$props.mergeResponses === void 0 && $$bindings.mergeResponses && mergeResponses !== void 0) $$bindings.mergeResponses(mergeResponses);
  if ($$props.addMessages === void 0 && $$bindings.addMessages && addMessages !== void 0) $$bindings.addMessages(addMessages);
  if ($$props.triggerScroll === void 0 && $$bindings.triggerScroll && triggerScroll !== void 0) $$bindings.triggerScroll(triggerScroll);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0) $$bindings.readOnly(readOnly);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="${"flex flex-col justify-between px-5 mb-3 w-full " + escape(
      $settings?.widescreenMode ?? null ? "max-w-full" : "max-w-5xl",
      true
    ) + " mx-auto rounded-lg group"}">${history.messages[messageId] ? `${history.messages[messageId].role === "user" ? `${validate_component(UserMessage, "UserMessage").$$render(
      $$result,
      {
        user: user2,
        history,
        messageId,
        isFirstMessage: idx === 0,
        siblings: history.messages[messageId].parentId !== null ? history.messages[history.messages[messageId].parentId]?.childrenIds ?? [] : Object.values(history.messages).filter((message) => message.parentId === null).map((message) => message.id) ?? [],
        showPreviousMessage,
        showNextMessage,
        editMessage,
        deleteMessage,
        readOnly
      },
      {},
      {}
    )}` : `${(history.messages[history.messages[messageId].parentId]?.models?.length ?? 1) === 1 ? `${validate_component(ResponseMessage, "ResponseMessage").$$render(
      $$result,
      {
        chatId: chatId2,
        history,
        messageId,
        isLastMessage: messageId === history.currentId,
        siblings: history.messages[history.messages[messageId].parentId]?.childrenIds ?? [],
        showPreviousMessage,
        showNextMessage,
        updateChat,
        editMessage,
        saveMessage,
        rateMessage,
        actionMessage,
        submitMessage,
        deleteMessage,
        continueResponse,
        regenerateResponse,
        addMessages,
        readOnly
      },
      {},
      {}
    )}` : `${validate_component(MultiResponseMessages, "MultiResponseMessages").$$render(
      $$result,
      {
        chatId: chatId2,
        messageId,
        isLastMessage: messageId === history?.currentId,
        updateChat,
        editMessage,
        saveMessage,
        rateMessage,
        actionMessage,
        submitMessage,
        deleteMessage,
        continueResponse,
        regenerateResponse,
        mergeResponses,
        triggerScroll,
        addMessages,
        readOnly,
        history
      },
      {
        history: ($$value) => {
          history = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}`}` : ``}</div>`;
  } while (!$$settled);
  $$unsubscribe_settings();
  return $$rendered;
});
const EyeSlash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>`;
});
const ChatPlaceholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_models, $$unsubscribe__models;
  let $i18n, $$unsubscribe_i18n;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $user, $$unsubscribe_user;
  $$unsubscribe__models = subscribe(models, (value) => $_models = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { modelIds = [] } = $$props;
  let { models: models$1 = [] } = $$props;
  let { atSelectedModel } = $$props;
  let { submitPrompt } = $$props;
  let selectedModelIdx = 0;
  if ($$props.modelIds === void 0 && $$bindings.modelIds && modelIds !== void 0) $$bindings.modelIds(modelIds);
  if ($$props.models === void 0 && $$bindings.models && models$1 !== void 0) $$bindings.models(models$1);
  if ($$props.atSelectedModel === void 0 && $$bindings.atSelectedModel && atSelectedModel !== void 0) $$bindings.atSelectedModel(atSelectedModel);
  if ($$props.submitPrompt === void 0 && $$bindings.submitPrompt && submitPrompt !== void 0) $$bindings.submitPrompt(submitPrompt);
  models$1 = modelIds.map((id) => $_models.find((m) => m.id === id));
  {
    if (modelIds.length > 0) {
      selectedModelIdx = models$1.length - 1;
    }
  }
  $$unsubscribe__models();
  $$unsubscribe_i18n();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_user();
  return `<div class="m-auto w-full max-w-6xl px-8 lg:px-20"><div class="flex justify-start"><div class="flex -space-x-4 mb-0.5">${each(models$1, (model, modelIdx) => {
    return `<button>${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: marked.parse(sanitizeResponseContent(models$1[selectedModelIdx]?.info?.meta?.description ?? "")),
        placement: "right"
      },
      {},
      {
        default: () => {
          return `<img crossorigin="anonymous"${add_attribute(
            "src",
            model?.info?.meta?.profile_image_url ?? ($i18n.language === "dg-DG" ? `/doge.png` : `${WEBUI_BASE_URL}/static/favicon.png`),
            0
          )} class="size-[2.7rem] rounded-full border-[1px] border-gray-200 dark:border-none" alt="logo" draggable="false"> `;
        }
      }
    )} </button>`;
  })}</div></div> ${$temporaryChatEnabled ? `${validate_component(Tooltip, "Tooltip").$$render(
    $$result,
    {
      content: "This chat won't appear in history and your messages will not be saved.",
      className: "w-fit",
      placement: "top-start"
    },
    {},
    {
      default: () => {
        return `<div class="flex items-center gap-2 text-gray-500 font-medium text-lg my-2 w-fit">${validate_component(EyeSlash, "EyeSlash").$$render($$result, { strokeWidth: "2.5", className: "size-5" }, {}, {})} Temporary Chat</div>`;
      }
    }
  )}` : ``} <div class="mt-2 mb-4 text-3xl text-gray-800 dark:text-gray-100 font-medium text-left flex items-center gap-4 font-primary"><div><div class="capitalize line-clamp-1">${models$1[selectedModelIdx]?.name ? `${escape(models$1[selectedModelIdx]?.name)}` : `${escape($i18n.t("Hello, {{name}}", { name: $user.name }))}`}</div> <div>${models$1[selectedModelIdx]?.info?.meta?.description ?? null ? `<div class="mt-0.5 text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-3 markdown"><!-- HTML_TAG_START -->${marked.parse(sanitizeResponseContent(models$1[selectedModelIdx]?.info?.meta?.description))}<!-- HTML_TAG_END --></div> ${models$1[selectedModelIdx]?.info?.meta?.user ? `<div class="mt-0.5 text-sm font-normal text-gray-400 dark:text-gray-500">By
								${models$1[selectedModelIdx]?.info?.meta?.user.community ? `<a href="${"https://openwebui.com/m/" + escape(models$1[selectedModelIdx]?.info?.meta?.user.username, true)}">${escape(models$1[selectedModelIdx]?.info?.meta?.user.name ? models$1[selectedModelIdx]?.info?.meta?.user.name : `@${models$1[selectedModelIdx]?.info?.meta?.user.username}`)}</a>` : `${escape(models$1[selectedModelIdx]?.info?.meta?.user.name)}`}</div>` : ``}` : `<div class="font-medium text-gray-400 dark:text-gray-500 line-clamp-1 font-p">${escape($i18n.t("How can I help you today?"))}</div>`}</div> <span class="text-lg">${escape($i18n.t("Hi! I'm Kneron Analytics Agent, your financial analysis assistant. I can analyze statements, identify trends, calculate metrics and generate reports. What financial data would you like to examine - balance sheets, income statements, cash flows, or other information?"))}</span></div></div> </div>`;
});
const Messages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $currentChatPage, $$unsubscribe_currentChatPage;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $_user, $$unsubscribe__user;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_currentChatPage = subscribe(currentChatPage, (value) => $currentChatPage = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe__user = subscribe(user, (value) => $_user = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { className = "h-full flex pt-8" } = $$props;
  let { chatId: chatId2 = "" } = $$props;
  let { user: user$1 = $_user } = $$props;
  let { prompt } = $$props;
  let { history = {} } = $$props;
  let { selectedModels } = $$props;
  let { atSelectedModel } = $$props;
  let messages = [];
  let { sendPrompt } = $$props;
  let { continueResponse } = $$props;
  let { regenerateResponse } = $$props;
  let { mergeResponses } = $$props;
  let { chatActionHandler } = $$props;
  let { showMessage = () => {
  } } = $$props;
  let { submitMessage = () => {
  } } = $$props;
  let { addMessages = () => {
  } } = $$props;
  let { readOnly = false } = $$props;
  let { bottomPadding = false } = $$props;
  let { autoScroll } = $$props;
  let messagesCount = 20;
  const scrollToBottom = () => {
    const element = document.getElementById("messages-container");
    element.scrollTop = element.scrollHeight;
  };
  const updateChat = async () => {
    if (!$temporaryChatEnabled) {
      history = history;
      await tick();
      await updateChatById(localStorage.token, chatId2, { history, messages });
      currentChatPage.set(1);
      await chats.set(await getChatList(localStorage.token, $currentChatPage));
    }
  };
  const showPreviousMessage = async (message) => {
    if (message.parentId !== null) {
      let messageId = history.messages[message.parentId].childrenIds[Math.max(history.messages[message.parentId].childrenIds.indexOf(message.id) - 1, 0)];
      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;
        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        history.currentId = messageId;
      }
    } else {
      let childrenIds = Object.values(history.messages).filter((message2) => message2.parentId === null).map((message2) => message2.id);
      let messageId = childrenIds[Math.max(childrenIds.indexOf(message.id) - 1, 0)];
      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;
        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        history.currentId = messageId;
      }
    }
    await tick();
    if ($settings?.scrollOnBranchChange ?? true) {
      const element = document.getElementById("messages-container");
      autoScroll = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
      setTimeout(
        () => {
          scrollToBottom();
        },
        100
      );
    }
  };
  const showNextMessage = async (message) => {
    if (message.parentId !== null) {
      let messageId = history.messages[message.parentId].childrenIds[Math.min(history.messages[message.parentId].childrenIds.indexOf(message.id) + 1, history.messages[message.parentId].childrenIds.length - 1)];
      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;
        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        history.currentId = messageId;
      }
    } else {
      let childrenIds = Object.values(history.messages).filter((message2) => message2.parentId === null).map((message2) => message2.id);
      let messageId = childrenIds[Math.min(childrenIds.indexOf(message.id) + 1, childrenIds.length - 1)];
      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;
        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        history.currentId = messageId;
      }
    }
    await tick();
    if ($settings?.scrollOnBranchChange ?? true) {
      const element = document.getElementById("messages-container");
      autoScroll = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
      setTimeout(
        () => {
          scrollToBottom();
        },
        100
      );
    }
  };
  const rateMessage = async (messageId, rating) => {
    history.messages[messageId].annotation = {
      ...history.messages[messageId].annotation,
      rating
    };
    await updateChat();
  };
  const editMessage = async (messageId, content, submit = true) => {
    if (history.messages[messageId].role === "user") {
      if (submit) {
        let userPrompt = content;
        let userMessageId = v4();
        let userMessage = {
          id: userMessageId,
          parentId: history.messages[messageId].parentId,
          childrenIds: [],
          role: "user",
          content: userPrompt,
          ...history.messages[messageId].files && { files: history.messages[messageId].files },
          models: selectedModels
        };
        let messageParentId = history.messages[messageId].parentId;
        if (messageParentId !== null) {
          history.messages[messageParentId].childrenIds = [...history.messages[messageParentId].childrenIds, userMessageId];
        }
        history.messages[userMessageId] = userMessage;
        history.currentId = userMessageId;
        await tick();
        await sendPrompt(history, userPrompt, userMessageId);
      } else {
        history.messages[messageId].content = content;
        await updateChat();
      }
    } else {
      if (submit) {
        const responseMessageId = v4();
        const message = history.messages[messageId];
        const parentId = message.parentId;
        const responseMessage = {
          ...message,
          id: responseMessageId,
          parentId,
          childrenIds: [],
          files: void 0,
          content,
          timestamp: Math.floor(Date.now() / 1e3)
        };
        history.messages[responseMessageId] = responseMessage;
        history.currentId = responseMessageId;
        if (parentId !== null) {
          history.messages[parentId].childrenIds = [...history.messages[parentId].childrenIds, responseMessageId];
        }
        await updateChat();
      } else {
        history.messages[messageId].originalContent = history.messages[messageId].content;
        history.messages[messageId].content = content;
        await updateChat();
      }
    }
  };
  const actionMessage = async (actionId, message, event = null) => {
    await chatActionHandler(chatId2, actionId, message.model, message.id, event);
  };
  const saveMessage = async (messageId, message) => {
    history.messages[messageId] = message;
    await updateChat();
  };
  const deleteMessage = async (messageId) => {
    const messageToDelete = history.messages[messageId];
    const parentMessageId = messageToDelete.parentId;
    const childMessageIds = messageToDelete.childrenIds ?? [];
    const grandchildrenIds = childMessageIds.flatMap((childId) => history.messages[childId]?.childrenIds ?? []);
    if (parentMessageId && history.messages[parentMessageId]) {
      history.messages[parentMessageId].childrenIds = [
        ...history.messages[parentMessageId].childrenIds.filter((id) => id !== messageId),
        ...grandchildrenIds
      ];
    }
    grandchildrenIds.forEach((grandchildId) => {
      if (history.messages[grandchildId]) {
        history.messages[grandchildId].parentId = parentMessageId;
      }
    });
    [messageId, ...childMessageIds].forEach((id) => {
      delete history.messages[id];
    });
    await tick();
    showMessage({ id: parentMessageId });
    await updateChat();
  };
  const triggerScroll = () => {
    if (autoScroll) {
      const element = document.getElementById("messages-container");
      autoScroll = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
      setTimeout(
        () => {
          scrollToBottom();
        },
        100
      );
    }
  };
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.user === void 0 && $$bindings.user && user$1 !== void 0) $$bindings.user(user$1);
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0) $$bindings.prompt(prompt);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.selectedModels === void 0 && $$bindings.selectedModels && selectedModels !== void 0) $$bindings.selectedModels(selectedModels);
  if ($$props.atSelectedModel === void 0 && $$bindings.atSelectedModel && atSelectedModel !== void 0) $$bindings.atSelectedModel(atSelectedModel);
  if ($$props.sendPrompt === void 0 && $$bindings.sendPrompt && sendPrompt !== void 0) $$bindings.sendPrompt(sendPrompt);
  if ($$props.continueResponse === void 0 && $$bindings.continueResponse && continueResponse !== void 0) $$bindings.continueResponse(continueResponse);
  if ($$props.regenerateResponse === void 0 && $$bindings.regenerateResponse && regenerateResponse !== void 0) $$bindings.regenerateResponse(regenerateResponse);
  if ($$props.mergeResponses === void 0 && $$bindings.mergeResponses && mergeResponses !== void 0) $$bindings.mergeResponses(mergeResponses);
  if ($$props.chatActionHandler === void 0 && $$bindings.chatActionHandler && chatActionHandler !== void 0) $$bindings.chatActionHandler(chatActionHandler);
  if ($$props.showMessage === void 0 && $$bindings.showMessage && showMessage !== void 0) $$bindings.showMessage(showMessage);
  if ($$props.submitMessage === void 0 && $$bindings.submitMessage && submitMessage !== void 0) $$bindings.submitMessage(submitMessage);
  if ($$props.addMessages === void 0 && $$bindings.addMessages && addMessages !== void 0) $$bindings.addMessages(addMessages);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0) $$bindings.readOnly(readOnly);
  if ($$props.bottomPadding === void 0 && $$bindings.bottomPadding && bottomPadding !== void 0) $$bindings.bottomPadding(bottomPadding);
  if ($$props.autoScroll === void 0 && $$bindings.autoScroll && autoScroll !== void 0) $$bindings.autoScroll(autoScroll);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (history.currentId) {
        let _messages = [];
        if (history.messages) {
          _messages = Object.values(history.messages).sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              return a.timestamp - b.timestamp;
            }
            if (a.parentId === null && b.parentId !== null) return -1;
            if (a.parentId !== null && b.parentId === null) return 1;
            return 0;
          });
          if (_messages.length > messagesCount) {
            _messages = _messages.slice(-messagesCount);
          }
        }
        messages = _messages;
      } else {
        messages = [];
      }
    }
    {
      if (autoScroll && bottomPadding) {
        (async () => {
          await tick();
          scrollToBottom();
        })();
      }
    }
    $$rendered = `<div${add_attribute("class", className, 0)}>${Object.keys(history?.messages ?? {}).length == 0 ? `${validate_component(ChatPlaceholder, "ChatPlaceholder").$$render(
      $$result,
      {
        modelIds: selectedModels,
        atSelectedModel,
        submitPrompt: async (p) => {
          let text = p;
          if (p.includes("{{CLIPBOARD}}")) {
            const clipboardText = await navigator.clipboard.readText().catch((err) => {
              toast.error($i18n.t("Failed to read clipboard contents"));
              return "{{CLIPBOARD}}";
            });
            text = p.replaceAll("{{CLIPBOARD}}", clipboardText);
          }
          prompt = text;
          await tick();
          const chatInputContainerElement = document.getElementById("chat-input-container");
          if (chatInputContainerElement) {
            prompt = p;
            chatInputContainerElement.style.height = "";
            chatInputContainerElement.style.height = Math.min(chatInputContainerElement.scrollHeight, 200) + "px";
            chatInputContainerElement.focus();
          }
          await tick();
        }
      },
      {},
      {}
    )}` : `<div class="w-full pt-2"><div class="w-full">${messages.at(0)?.parentId !== null ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="w-full flex justify-center py-1 text-xs animate-pulse items-center gap-2">${validate_component(Spinner, "Spinner").$$render($$result, { className: " size-4" }, {}, {})} <div class="" data-svelte-h="svelte-17uns3n">Loading...</div></div>`;
      }
    })}` : ``} ${each(messages, (message, messageIdx) => {
      return `${validate_component(Message, "Message").$$render(
        $$result,
        {
          chatId: chatId2,
          messageId: message.id,
          idx: messageIdx,
          user: user$1,
          showPreviousMessage,
          showNextMessage,
          updateChat,
          editMessage,
          deleteMessage,
          rateMessage,
          actionMessage,
          saveMessage,
          submitMessage,
          regenerateResponse,
          continueResponse,
          mergeResponses,
          addMessages,
          triggerScroll,
          readOnly,
          history
        },
        {
          history: ($$value) => {
            history = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> <div class="pb-12"></div> ${bottomPadding ? `<div class="pb-6"></div>` : ``}</div>`}</div>`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_currentChatPage();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe__user();
  $$unsubscribe_i18n();
  return $$rendered;
});
export {
  EyeSlash as E,
  Messages as M,
  Tags as T
};
//# sourceMappingURL=Messages.js.map

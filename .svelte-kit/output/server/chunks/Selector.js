import { c as create_ssr_component, a as add_attribute, b as subscribe, p as getContext, l as createEventDispatcher, v as validate_component, g as escape, e as each } from "./ssr.js";
import "dequal";
import "./create.js";
import { b as Menu, c as Menu_trigger, M as Menu_content, f as flyAndScale } from "./menu-trigger.js";
import { marked } from "marked";
import Fuse from "fuse.js";
import { C as ChevronDown } from "./ChevronDown.js";
import { C as Check } from "./Check.js";
import { S as Search } from "./Search.js";
import { M as MODEL_DOWNLOAD_POOL, a as settings, c as config, o as mobile, u as user, t as temporaryChatEnabled } from "./index3.js";
import "./Toaster.svelte_svelte_type_style_lang.js";
import { s as sanitizeResponseContent } from "./index5.js";
import { T as Tooltip } from "./Tooltip.js";
import { S as Switch_1 } from "./Switch.js";
import "./client.js";
const ChatBubbleOval = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"></path></svg>`;
});
const Selector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredItems;
  let $MODEL_DOWNLOAD_POOL, $$unsubscribe_MODEL_DOWNLOAD_POOL;
  let $i18n, $$unsubscribe_i18n;
  let $$unsubscribe_settings;
  let $$unsubscribe_config;
  let $mobile, $$unsubscribe_mobile;
  let $user, $$unsubscribe_user;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  $$unsubscribe_MODEL_DOWNLOAD_POOL = subscribe(MODEL_DOWNLOAD_POOL, (value2) => $MODEL_DOWNLOAD_POOL = value2);
  $$unsubscribe_settings = subscribe(settings, (value2) => value2);
  $$unsubscribe_config = subscribe(config, (value2) => value2);
  $$unsubscribe_mobile = subscribe(mobile, (value2) => $mobile = value2);
  $$unsubscribe_user = subscribe(user, (value2) => $user = value2);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value2) => $temporaryChatEnabled = value2);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => $i18n = value2);
  createEventDispatcher();
  let { id = "" } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "Select a model" } = $$props;
  let { searchEnabled = true } = $$props;
  let { searchPlaceholder = $i18n.t("Search a model") } = $$props;
  let { showTemporaryChatControl = false } = $$props;
  let { items = [] } = $$props;
  let { className = "w-[32rem]" } = $$props;
  let { triggerClassName = "text-lg" } = $$props;
  let show = false;
  let selectedModel = "";
  let searchValue = "";
  let ollamaVersion = null;
  let selectedModelIdx = 0;
  const fuse = new Fuse(
    items.map((item) => {
      const _item = {
        ...item,
        modelName: item.model?.name,
        tags: item.model?.info?.meta?.tags?.map((tag) => tag.name).join(" "),
        desc: item.model?.info?.meta?.description
      };
      return _item;
    }),
    {
      keys: ["value", "tags", "modelName"],
      threshold: 0.4
    }
  );
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.searchEnabled === void 0 && $$bindings.searchEnabled && searchEnabled !== void 0) $$bindings.searchEnabled(searchEnabled);
  if ($$props.searchPlaceholder === void 0 && $$bindings.searchPlaceholder && searchPlaceholder !== void 0) $$bindings.searchPlaceholder(searchPlaceholder);
  if ($$props.showTemporaryChatControl === void 0 && $$bindings.showTemporaryChatControl && showTemporaryChatControl !== void 0) $$bindings.showTemporaryChatControl(showTemporaryChatControl);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.triggerClassName === void 0 && $$bindings.triggerClassName && triggerClassName !== void 0) $$bindings.triggerClassName(triggerClassName);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    selectedModel = items.find((item) => item.value === value) ?? "";
    filteredItems = searchValue ? fuse.search(searchValue).map((e) => {
      return e.item;
    }) : items;
    $$rendered = `${validate_component(Menu, "DropdownMenu.Root").$$render(
      $$result,
      {
        onOpenChange: async () => {
          searchValue = "";
          selectedModelIdx = 0;
          window.setTimeout(() => document.getElementById("model-search-input")?.focus(), 0);
        },
        closeFocus: false,
        open: show
      },
      {
        open: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Menu_trigger, "DropdownMenu.Trigger").$$render(
            $$result,
            {
              class: "relative w-full font-primary",
              "aria-label": placeholder,
              id: "model-selector-" + id + "-button"
            },
            {},
            {
              default: () => {
                return `<div class="${"flex w-full text-left px-0.5 outline-hidden bg-transparent truncate " + escape(triggerClassName, true) + " justify-between font-medium placeholder-gray-400 focus:outline-hidden"}">${selectedModel ? `${escape(selectedModel.label)}` : `${escape(placeholder)}`} ${validate_component(ChevronDown, "ChevronDown").$$render(
                  $$result,
                  {
                    className: " self-center ml-2 size-3",
                    strokeWidth: "2.5"
                  },
                  {},
                  {}
                )}</div>`;
              }
            }
          )} ${validate_component(Menu_content, "DropdownMenu.Content").$$render(
            $$result,
            {
              class: " z-40 " + ($mobile ? `w-full` : `${className}`) + " max-w-[calc(100vw-1rem)] justify-start rounded-xl  bg-white dark:bg-gray-850 dark:text-white shadow-lg  outline-hidden",
              transition: flyAndScale,
              side: $mobile ? "bottom" : "bottom-start",
              sideOffset: 3
            },
            {},
            {
              default: () => {
                return `${slots.default ? slots.default({}) : ` ${searchEnabled ? `<div class="flex items-center gap-2.5 px-5 mt-3.5 mb-3">${validate_component(Search, "Search").$$render($$result, { className: "size-4", strokeWidth: "2.5" }, {}, {})} <input id="model-search-input" class="w-full text-sm bg-transparent outline-hidden"${add_attribute("placeholder", searchPlaceholder, 0)} autocomplete="off"${add_attribute("value", searchValue, 0)}></div> <hr class="border-gray-100 dark:border-gray-850">` : ``} <div class="px-3 my-2 max-h-64 overflow-y-auto scrollbar-hidden group">${filteredItems.length ? each(filteredItems, (item, index) => {
                  return `<button aria-label="model-item" class="${"flex w-full text-left font-medium line-clamp-1 select-none items-center rounded-button py-2 pl-3 pr-1.5 text-sm text-gray-700 dark:text-gray-100 outline-hidden transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer data-highlighted:bg-muted " + escape(
                    index === selectedModelIdx ? "bg-gray-100 dark:bg-gray-800 group-hover:bg-transparent" : "",
                    true
                  )}"${add_attribute("data-arrow-selected", index === selectedModelIdx, 0)}><div class="flex flex-col">${$mobile && (item?.model?.info?.meta?.tags ?? []).length > 0 ? `<div class="flex gap-0.5 self-start h-full mb-1.5 -translate-x-1">${each(item.model?.info?.meta.tags, (tag) => {
                    return `<div class="text-xs font-bold px-1 rounded-sm uppercase line-clamp-1 bg-gray-500/20 text-gray-700 dark:text-gray-200">${escape(tag.name)} </div>`;
                  })} </div>` : ``} <div class="flex items-center gap-2"><div class="flex items-center min-w-fit"><div class="line-clamp-1"><div class="flex items-center min-w-fit">${validate_component(Tooltip, "Tooltip").$$render(
                    $$result,
                    {
                      content: $user?.role === "admin" ? item?.value ?? "" : "",
                      placement: "top-start"
                    },
                    {},
                    {
                      default: () => {
                        return `<img${add_attribute("src", item.model?.info?.meta?.profile_image_url ?? "/static/favicon.png", 0)} alt="Model" class="rounded-full size-5 flex items-center mr-2"> ${escape(item.label)} `;
                      }
                    }
                  )} </div></div> ${item.model.owned_by === "ollama" && (item.model.ollama?.details?.parameter_size ?? "") !== "" ? `<div class="flex ml-1 items-center translate-y-[0.5px]">${validate_component(Tooltip, "Tooltip").$$render(
                    $$result,
                    {
                      content: `${item.model.ollama?.details?.quantization_level ? item.model.ollama?.details?.quantization_level + " " : ""}${item.model.ollama?.size ? `(${(item.model.ollama?.size / 1024 ** 3).toFixed(1)}GB)` : ""}`,
                      className: "self-end"
                    },
                    {},
                    {
                      default: () => {
                        return `<span class="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1">${escape(item.model.ollama?.details?.parameter_size ?? "")}</span> `;
                      }
                    }
                  )} </div>` : ``}</div>  ${item.model?.direct ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: `${"Direct"}` }, {}, {
                    default: () => {
                      return `<div class="translate-y-[1px]" data-svelte-h="svelte-1dup7go"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3"><path fill-rule="evenodd" d="M2 2.75A.75.75 0 0 1 2.75 2C8.963 2 14 7.037 14 13.25a.75.75 0 0 1-1.5 0c0-5.385-4.365-9.75-9.75-9.75A.75.75 0 0 1 2 2.75Zm0 4.5a.75.75 0 0 1 .75-.75 6.75 6.75 0 0 1 6.75 6.75.75.75 0 0 1-1.5 0C8 10.35 5.65 8 2.75 8A.75.75 0 0 1 2 7.25ZM3.5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" clip-rule="evenodd"></path></svg></div> `;
                    }
                  })}` : `${item.model.owned_by === "openai" ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: `${"External"}` }, {}, {
                    default: () => {
                      return `<div class="translate-y-[1px]" data-svelte-h="svelte-n3uai6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3"><path fill-rule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"></path></svg></div> `;
                    }
                  })}` : ``}`} ${item.model?.info?.meta?.description ? `${validate_component(Tooltip, "Tooltip").$$render(
                    $$result,
                    {
                      content: `${marked.parse(sanitizeResponseContent(item.model?.info?.meta?.description).replaceAll("\n", "<br>"))}`
                    },
                    {},
                    {
                      default: () => {
                        return `<div class="translate-y-[1px]" data-svelte-h="svelte-1mqbvzr"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path></svg></div> `;
                      }
                    }
                  )}` : ``} ${!$mobile && (item?.model?.info?.meta?.tags ?? []).length > 0 ? `<div class="flex gap-0.5 self-center items-center h-full translate-y-[0.5px]">${each(item.model?.info?.meta.tags, (tag) => {
                    return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: tag.name }, {}, {
                      default: () => {
                        return `<div class="text-xs font-bold px-1 rounded-sm uppercase line-clamp-1 bg-gray-500/20 text-gray-700 dark:text-gray-200">${escape(tag.name)}</div> `;
                      }
                    })}`;
                  })} </div>` : ``} </div></div> ${value === item.value ? `<div class="ml-auto pl-2 pr-2 md:pr-0">${validate_component(Check, "Check").$$render($$result, {}, {}, {})} </div>` : ``} </button>`;
                }) : `<div><div class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-100">${escape($i18n.t("No results found"))}</div> </div>`} ${!(searchValue.trim() in $MODEL_DOWNLOAD_POOL) && searchValue && ollamaVersion && $user.role === "admin" ? `${validate_component(Tooltip, "Tooltip").$$render(
                  $$result,
                  {
                    content: $i18n.t(`Pull "{{searchValue}}" from Ollama.com`, { searchValue }),
                    placement: "top-start"
                  },
                  {},
                  {
                    default: () => {
                      return `<button class="flex w-full font-medium line-clamp-1 select-none items-center rounded-button py-2 pl-3 pr-1.5 text-sm text-gray-700 dark:text-gray-100 outline-hidden transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer data-highlighted:bg-muted"><div class="truncate">${escape($i18n.t(`Pull "{{searchValue}}" from Ollama.com`, { searchValue }))}</div></button>`;
                    }
                  }
                )}` : ``} ${each(Object.keys($MODEL_DOWNLOAD_POOL), (model) => {
                  return `<div class="flex w-full justify-between font-medium select-none rounded-button py-2 pl-3 pr-1.5 text-sm text-gray-700 dark:text-gray-100 outline-hidden transition-all duration-75 rounded-lg cursor-pointer data-highlighted:bg-muted"><div class="flex"><div class="-ml-2 mr-2.5 translate-y-0.5" data-svelte-h="svelte-102rp4j"><svg class="size-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><style>.spinner_ajPY {
											transform-origin: center;
											animation: spinner_AtaB 0.75s infinite linear;
										}
										@keyframes spinner_AtaB {
											100% {
												transform: rotate(360deg);
											}
										}
									</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"></path><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"></path></svg></div> <div class="flex flex-col self-start"><div class="flex gap-1"><div class="line-clamp-1">Downloading &quot;${escape(model)}&quot;</div> <div class="shrink-0">${escape("pullProgress" in $MODEL_DOWNLOAD_POOL[model] ? `(${$MODEL_DOWNLOAD_POOL[model].pullProgress}%)` : "")} </div></div> ${"digest" in $MODEL_DOWNLOAD_POOL[model] && $MODEL_DOWNLOAD_POOL[model].digest ? `<div class="-mt-1 h-fit text-[0.7rem] dark:text-gray-500 line-clamp-1">${escape($MODEL_DOWNLOAD_POOL[model].digest)} </div>` : ``} </div></div> <div class="mr-2 ml-1 translate-y-0.5">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Cancel") }, {}, {
                    default: () => {
                      return `<button class="text-gray-800 dark:text-gray-100" data-svelte-h="svelte-19bzgft"><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"></path></svg></button> `;
                    }
                  })}</div> </div>`;
                })}</div> ${showTemporaryChatControl ? `<hr class="border-gray-100 dark:border-gray-850"> <div class="flex items-center mx-2 my-2"><button class="flex justify-between w-full font-medium line-clamp-1 select-none items-center rounded-button py-2 px-3 text-sm text-gray-700 dark:text-gray-100 outline-hidden transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer data-highlighted:bg-muted"><div class="flex gap-2.5 items-center">${validate_component(ChatBubbleOval, "ChatBubbleOval").$$render($$result, { className: "size-4", strokeWidth: "2.5" }, {}, {})} ${escape($i18n.t(`Temporary Chat`))}</div> <div>${validate_component(Switch_1, "Switch").$$render($$result, { state: $temporaryChatEnabled }, {}, {})}</div></button></div>` : ``} <div class="hidden w-[42rem]"></div> <div class="hidden w-[32rem]"></div> `}`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_MODEL_DOWNLOAD_POOL();
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_mobile();
  $$unsubscribe_user();
  $$unsubscribe_temporaryChatEnabled();
  return $$rendered;
});
export {
  Selector as S
};
//# sourceMappingURL=Selector.js.map

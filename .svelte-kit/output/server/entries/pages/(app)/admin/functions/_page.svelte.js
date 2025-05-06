import { c as create_ssr_component, a as add_attribute, p as getContext, b as subscribe, v as validate_component, g as escape, l as createEventDispatcher, e as each } from "../../../../../chunks/ssr.js";
import { a as settings, c as config, k as functions, W as WEBUI_NAME, m as models } from "../../../../../chunks/index3.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import fileSaver from "file-saver";
import { g as goto } from "../../../../../chunks/client.js";
import { V as Valves, g as getToolValvesById, a as getToolValvesSpecById, b as getFunctionValvesById, c as getFunctionValvesSpecById, H as Heart, d as getFunctionById, t as toggleGlobalById, e as getFunctions } from "../../../../../chunks/Heart.js";
import { T as Tooltip } from "../../../../../chunks/Tooltip.js";
import { C as ConfirmDialog } from "../../../../../chunks/ConfirmDialog.js";
import { g as getModels } from "../../../../../chunks/index7.js";
import "dequal";
import "../../../../../chunks/create.js";
import { D as Dropdown, M as Menu_item } from "../../../../../chunks/Dropdown.js";
import { M as Menu_content, f as flyAndScale } from "../../../../../chunks/menu-trigger.js";
import { G as GarbageBin } from "../../../../../chunks/GarbageBin.js";
import { A as ArrowDownTray } from "../../../../../chunks/ArrowDownTray.js";
import { S as Switch_1 } from "../../../../../chunks/Switch.js";
import { E as EllipsisHorizontal } from "../../../../../chunks/EllipsisHorizontal.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
import { S as Spinner } from "../../../../../chunks/Spinner.js";
import { S as Search } from "../../../../../chunks/Search.js";
import { P as Plus } from "../../../../../chunks/Plus.js";
import { C as ChevronRight } from "../../../../../chunks/ChevronRight.js";
const Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd"></path></svg>`;
});
const DocumentDuplicate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path></svg>`;
});
const GlobeAlt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"></path></svg>`;
});
const FunctionMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { func } = $$props;
  let { editHandler } = $$props;
  let { shareHandler } = $$props;
  let { cloneHandler } = $$props;
  let { exportHandler } = $$props;
  let { deleteHandler } = $$props;
  let { toggleGlobalHandler } = $$props;
  let { onClose } = $$props;
  let show = false;
  if ($$props.func === void 0 && $$bindings.func && func !== void 0) $$bindings.func(func);
  if ($$props.editHandler === void 0 && $$bindings.editHandler && editHandler !== void 0) $$bindings.editHandler(editHandler);
  if ($$props.shareHandler === void 0 && $$bindings.shareHandler && shareHandler !== void 0) $$bindings.shareHandler(shareHandler);
  if ($$props.cloneHandler === void 0 && $$bindings.cloneHandler && cloneHandler !== void 0) $$bindings.cloneHandler(cloneHandler);
  if ($$props.exportHandler === void 0 && $$bindings.exportHandler && exportHandler !== void 0) $$bindings.exportHandler(exportHandler);
  if ($$props.deleteHandler === void 0 && $$bindings.deleteHandler && deleteHandler !== void 0) $$bindings.deleteHandler(deleteHandler);
  if ($$props.toggleGlobalHandler === void 0 && $$bindings.toggleGlobalHandler && toggleGlobalHandler !== void 0) $$bindings.toggleGlobalHandler(toggleGlobalHandler);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Dropdown, "Dropdown").$$render(
      $$result,
      { show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        content: () => {
          return `<div slot="content">${validate_component(Menu_content, "DropdownMenu.Content").$$render(
            $$result,
            {
              class: "w-full max-w-[180px] rounded-xl px-1 py-1.5 border border-gray-300/30 dark:border-gray-700/50 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-sm",
              sideOffset: -2,
              side: "bottom",
              align: "start",
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `${["filter", "action"].includes(func.type) ? `<div class="flex gap-2 justify-between items-center px-3 py-2 text-sm font-medium cursor-pointerrounded-md"><div class="flex gap-2 items-center">${validate_component(GlobeAlt, "GlobeAlt").$$render($$result, {}, {}, {})} <div class="flex items-center">${escape($i18n.t("Global"))}</div></div> <div>${validate_component(Switch_1, "Switch").$$render(
                  $$result,
                  { state: func.is_global },
                  {
                    state: ($$value) => {
                      func.is_global = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}</div></div> <hr class="border-gray-100 dark:border-gray-850 my-1">` : ``} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg> <div class="flex items-center">${escape($i18n.t("Edit"))}</div>`;
                    }
                  }
                )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Share, "Share").$$render($$result, {}, {}, {})} <div class="flex items-center">${escape($i18n.t("Share"))}</div>`;
                    }
                  }
                )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(DocumentDuplicate, "DocumentDuplicate").$$render($$result, {}, {}, {})} <div class="flex items-center">${escape($i18n.t("Clone"))}</div>`;
                    }
                  }
                )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(ArrowDownTray, "ArrowDownTray").$$render($$result, {}, {}, {})} <div class="flex items-center">${escape($i18n.t("Export"))}</div>`;
                    }
                  }
                )} <hr class="border-gray-100 dark:border-gray-850 my-1"> ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex  gap-2  items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(GarbageBin, "GarbageBin").$$render($$result, { strokeWidth: "2" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Delete"))}</div>`;
                    }
                  }
                )}`;
              }
            }
          )}</div>`;
        },
        default: () => {
          return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("More") }, {}, {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const ValvesModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { show = false } = $$props;
  let { type = "tool" } = $$props;
  let { id = null } = $$props;
  let loading = false;
  let valvesSpec = null;
  let valves = {};
  const initHandler = async () => {
    loading = true;
    valves = {};
    valvesSpec = null;
    if (type === "tool") {
      valves = await getToolValvesById(localStorage.token, id);
      valvesSpec = await getToolValvesSpecById(localStorage.token, id);
    } else if (type === "function") {
      valves = await getFunctionValvesById(localStorage.token, id);
      valvesSpec = await getFunctionValvesSpecById(localStorage.token, id);
    }
    if (!valves) {
      valves = {};
    }
    if (valvesSpec) {
      for (const property in valvesSpec.properties) {
        if (valvesSpec.properties[property]?.type === "array") {
          valves[property] = (valves[property] ?? []).join(",");
        }
      }
    }
    loading = false;
  };
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        initHandler();
      }
    }
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
          return `<div><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-2"><div class="text-lg font-medium self-center">${escape($i18n.t("Valves"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full px-5 pb-4 md:space-x-4 dark:text-gray-200"><div class="flex flex-col w-full sm:flex-row sm:justify-center sm:space-x-6"><form class="flex flex-col w-full"><div class="px-1">${!loading ? `${validate_component(Valves, "Valves").$$render(
            $$result,
            { valvesSpec, valves },
            {
              valves: ($$value) => {
                valves = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : `${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-5" }, {}, {})}`}</div> <div class="flex justify-end pt-3 text-sm font-medium"><button class="${"px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full " + escape("", true)}" type="submit" ${""}>${escape($i18n.t("Save"))} ${``}</button></div></form></div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const ManifestModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { show = false } = $$props;
  let { manifest = {} } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.manifest === void 0 && $$bindings.manifest && manifest !== void 0) $$bindings.manifest(manifest);
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
          return `<div><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-2"><div class="text-lg font-medium self-center">${escape($i18n.t("Show your support!"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full px-5 pb-4 md:space-x-4 dark:text-gray-200"><div class="flex flex-col w-full sm:flex-row sm:justify-center sm:space-x-6"><form class="flex flex-col w-full"><div class="px-1 text-sm"><div class="my-2">${escape($i18n.t("The developers behind this plugin are passionate volunteers from the community. If you find this plugin helpful, please consider contributing to its development."))}</div> <div class="my-2">${escape($i18n.t("Your entire contribution will go directly to the plugin developer; Open WebUI does not take any percentage. However, the chosen funding platform might have its own fees."))}</div> <hr class="dark:border-gray-800 my-3"> <div class="my-2">${escape($i18n.t("Support this plugin:"))} <a${add_attribute("href", manifest.funding_url, 0)} target="_blank" class="underline text-blue-400 hover:text-blue-300">${escape(manifest.funding_url)}</a></div></div> <div class="flex justify-end pt-3 text-sm font-medium"><button class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-gray-100 transition rounded-lg flex flex-row space-x-1 items-center" type="submit">${escape($i18n.t("Done"))}</button></div></form></div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Functions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $i18n, $$unsubscribe_i18n;
  let $functions, $$unsubscribe_functions;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_functions = subscribe(functions, (value) => $functions = value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  const { saveAs } = fileSaver;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let showConfirm = false;
  let query = "";
  let showManifestModal = false;
  let showValvesModal = false;
  let selectedFunction = null;
  let showDeleteConfirm = false;
  let filteredItems = [];
  const shareHandler = async (func) => {
    const item = await getFunctionById(localStorage.token, func.id).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    toast.success($i18n.t("Redirecting you to Open WebUI Community"));
    const url = "https://openwebui.com";
    const tab = await window.open(`${url}/functions/create`, "_blank");
    const messageHandler = (event) => {
      if (event.origin !== url) return;
      if (event.data === "loaded") {
        tab.postMessage(JSON.stringify(item), "*");
        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler, false);
    console.log(item);
  };
  const cloneHandler = async (func) => {
    const _function = await getFunctionById(localStorage.token, func.id).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    if (_function) {
      sessionStorage.function = JSON.stringify({
        ..._function,
        id: `${_function.id}_clone`,
        name: `${_function.name} (Clone)`
      });
      goto();
    }
  };
  const exportHandler = async (func) => {
    const _function = await getFunctionById(localStorage.token, func.id).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    if (_function) {
      let blob = new Blob([JSON.stringify([_function])], { type: "application/json" });
      saveAs(blob, `function-${_function.id}-export-${Date.now()}.json`);
    }
  };
  const toggleGlobalHandler = async (func) => {
    const res = await toggleGlobalById(localStorage.token, func.id).catch((error) => {
      toast.error(`${error}`);
    });
    if (res) {
      if (func.is_global) {
        func.type === "filter" ? toast.success($i18n.t("Filter is now globally enabled")) : toast.success($i18n.t("Function is now globally enabled"));
      } else {
        func.type === "filter" ? toast.success($i18n.t("Filter is now globally disabled")) : toast.success($i18n.t("Function is now globally disabled"));
      }
      functions.set(await getFunctions(localStorage.token));
      models.set(await getModels(localStorage.token, $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null)));
    }
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    filteredItems = $functions.filter((f) => query === "").sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-6oeup7_START -->${$$result.title = `<title> ${escape($i18n.t("Functions"))} | ${escape($WEBUI_NAME)} </title>`, ""}<!-- HEAD_svelte-6oeup7_END -->`, ""} <div class="flex flex-col gap-1 mt-1.5 mb-2"><div class="flex justify-between items-center"><div class="flex md:self-center text-xl items-center font-medium px-0.5">${escape($i18n.t("Functions"))} <div class="flex self-center w-[1px] h-6 mx-2.5 bg-gray-50 dark:bg-gray-850"></div> <span class="text-base font-lg text-gray-500 dark:text-gray-300">${escape(filteredItems.length)}</span></div></div> <div class="flex w-full space-x-2"><div class="flex flex-1"><div class="self-center ml-1 mr-3">${validate_component(Search, "Search").$$render($$result, { className: "size-3.5" }, {}, {})}</div> <input class="w-full text-sm pr-4 py-1 rounded-r-xl outline-hidden bg-transparent"${add_attribute("placeholder", $i18n.t("Search Functions"), 0)}${add_attribute("value", query, 0)}></div> <div><a class="px-2 py-2 rounded-xl hover:bg-gray-700/10 dark:hover:bg-gray-100/10 dark:text-gray-300 dark:hover:text-white transition font-medium text-sm flex items-center space-x-1" href="/admin/functions/create">${validate_component(Plus, "Plus").$$render($$result, { className: "size-3.5" }, {}, {})}</a></div></div></div> <div class="mb-5">${each(filteredItems, (func) => {
      return `<div class="flex space-x-4 cursor-pointer w-full px-3 py-2 dark:hover:bg-white/5 hover:bg-black/5 rounded-xl"><a class="flex flex-1 space-x-3.5 cursor-pointer w-full"${add_attribute("href", `/admin/functions/edit?id=${encodeURIComponent(func.id)}`, 0)}><div class="flex items-center text-left"><div class="flex-1 self-center pl-1"><div class="font-semibold flex items-center gap-1.5"><div class="text-xs font-bold px-1 rounded-sm uppercase line-clamp-1 bg-gray-500/20 text-gray-700 dark:text-gray-200">${escape(func.type)}</div> ${func?.meta?.manifest?.version ? `<div class="text-xs font-bold px-1 rounded-sm line-clamp-1 bg-gray-500/20 text-gray-700 dark:text-gray-200">v${escape(func?.meta?.manifest?.version ?? "")} </div>` : ``} <div class="line-clamp-1">${escape(func.name)} </div></div> <div class="flex gap-1.5 px-1"><div class="text-gray-500 text-xs font-medium shrink-0">${escape(func.id)}</div> <div class="text-xs overflow-hidden text-ellipsis line-clamp-1">${escape(func.meta.description)}</div> </div></div> </div></a> <div class="flex flex-row gap-0.5 self-center">${`${func?.meta?.manifest?.funding_url ?? false ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Support") }, {}, {
        default: () => {
          return `<button class="self-center w-fit text-sm px-2 py-2 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl" type="button">${validate_component(Heart, "Heart").$$render($$result, {}, {}, {})}</button> `;
        }
      })}` : ``} ${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Valves") }, {}, {
        default: () => {
          return `<button class="self-center w-fit text-sm px-2 py-2 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl" type="button" data-svelte-h="svelte-1d80tim"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg></button> `;
        }
      })} ${validate_component(FunctionMenu, "FunctionMenu").$$render(
        $$result,
        {
          func,
          editHandler: () => {
            goto(`/admin/functions/edit?id=${encodeURIComponent(func.id)}`);
          },
          shareHandler: () => {
            shareHandler(func);
          },
          cloneHandler: () => {
            cloneHandler(func);
          },
          exportHandler: () => {
            exportHandler(func);
          },
          deleteHandler: async () => {
            selectedFunction = func;
            showDeleteConfirm = true;
          },
          toggleGlobalHandler: () => {
            if (["filter", "action"].includes(func.type)) {
              toggleGlobalHandler(func);
            }
          },
          onClose: () => {
          }
        },
        {},
        {
          default: () => {
            return `<button class="self-center w-fit text-sm p-1.5 dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl" type="button">${validate_component(EllipsisHorizontal, "EllipsisHorizontal").$$render($$result, { className: "size-5" }, {}, {})}</button> `;
          }
        }
      )}`} <div class="self-center mx-1">${validate_component(Tooltip, "Tooltip").$$render(
        $$result,
        {
          content: func.is_active ? $i18n.t("Enabled") : $i18n.t("Disabled")
        },
        {},
        {
          default: () => {
            return `${validate_component(Switch_1, "Switch").$$render(
              $$result,
              { state: func.is_active },
              {
                state: ($$value) => {
                  func.is_active = $$value;
                  $$settled = false;
                }
              },
              {}
            )} `;
          }
        }
      )} </div></div> </div>`;
    })}</div>  <div class="flex justify-end w-full mb-2"><div class="flex space-x-2"><input id="documents-import-input" type="file" accept=".json" hidden> <button class="flex text-xs items-center space-x-1 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition"><div class="self-center mr-2 font-medium line-clamp-1">${escape($i18n.t("Import Functions"))}</div> <div class="self-center" data-svelte-h="svelte-aqr4dt"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm4 9.5a.75.75 0 0 1-.75-.75V8.06l-.72.72a.75.75 0 0 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72v2.69a.75.75 0 0 1-.75.75Z" clip-rule="evenodd"></path></svg></div></button> <button class="flex text-xs items-center space-x-1 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 transition"><div class="self-center mr-2 font-medium line-clamp-1">${escape($i18n.t("Export Functions"))}</div> <div class="self-center" data-svelte-h="svelte-1n7zye"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm4 3.5a.75.75 0 0 1 .75.75v2.69l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06l.72.72V6.25A.75.75 0 0 1 8 5.5Z" clip-rule="evenodd"></path></svg></div></button></div></div> ${$config?.features.enable_community_sharing ? `<div class="my-16"><div class="text-xl font-medium mb-1 line-clamp-1">${escape($i18n.t("Made by Open WebUI Community"))}</div> <a class="flex cursor-pointer items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-850 w-full mb-2 px-3.5 py-1.5 rounded-xl transition" href="https://openwebui.com/#open-webui-community" target="_blank"><div class="self-center"><div class="font-semibold line-clamp-1">${escape($i18n.t("Discover a function"))}</div> <div class="text-sm line-clamp-1">${escape($i18n.t("Discover, download, and explore custom functions"))}</div></div> <div><div>${validate_component(ChevronRight, "ChevronRight").$$render($$result, {}, {}, {})}</div></div></a></div>` : ``} ${validate_component(ConfirmDialog, "DeleteConfirmDialog").$$render(
      $$result,
      {
        title: $i18n.t("Delete function?"),
        show: showDeleteConfirm
      },
      {
        show: ($$value) => {
          showDeleteConfirm = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-sm text-gray-500">${escape($i18n.t("This will delete"))} <span class="font-semibold">${escape(selectedFunction.name)}</span>.</div>`;
        }
      }
    )} ${validate_component(ManifestModal, "ManifestModal").$$render(
      $$result,
      {
        manifest: selectedFunction?.meta?.manifest ?? {},
        show: showManifestModal
      },
      {
        show: ($$value) => {
          showManifestModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(ValvesModal, "ValvesModal").$$render(
      $$result,
      {
        type: "function",
        id: selectedFunction?.id ?? null,
        show: showValvesModal
      },
      {
        show: ($$value) => {
          showValvesModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
      $$result,
      { show: showConfirm },
      {
        show: ($$value) => {
          showConfirm = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-sm text-gray-500"><div class="bg-yellow-500/20 text-yellow-700 dark:text-yellow-200 rounded-lg px-4 py-3"><div data-svelte-h="svelte-1a6manw">Please carefully review the following warnings:</div> <ul class="mt-1 list-disc pl-4 text-xs"><li>${escape($i18n.t("Functions allow arbitrary code execution."))}</li> <li>${escape($i18n.t("Do not install functions from sources you do not fully trust."))}</li></ul></div> <div class="my-3">${escape($i18n.t("I acknowledge that I have read and I understand the implications of my action. I am aware of the risks associated with executing arbitrary code and I have verified the trustworthiness of the source."))}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  $$unsubscribe_functions();
  $$unsubscribe_WEBUI_NAME();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $functions, $$unsubscribe_functions;
  $$unsubscribe_functions = subscribe(functions, (value) => $functions = value);
  $$unsubscribe_functions();
  return `${$functions !== null ? `${validate_component(Functions, "Functions").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

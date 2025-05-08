import { c as create_ssr_component, b as subscribe, h as compute_rest_props, i as spread, k as escape_object, a as add_attribute, l as createEventDispatcher, v as validate_component, p as getContext, g as escape, j as escape_attribute_value, o as onDestroy, e as each, r as get_store_value, d as add_styles, f as merge_ssr_styles, s as setContext, m as missing_component, t as hasContext, u as compute_slots, n as noop, w as null_to_empty } from "./ssr.js";
import { t as tick } from "./scheduler.js";
import { v4 } from "uuid";
import { a as toast } from "./Toaster.svelte_svelte_type_style_lang.js";
import { g as getCtx, a as generateId, s as styleToString, b as getCursorStyle, F as FilesOverlay, U as UserMenu, D as Drawer, P as Pane$1, c as Pane_group } from "./Drawer.js";
import { g as goto } from "./client.js";
import { p as page } from "./stores.js";
import { m as models, c as config, A as AUDIO_API_BASE_URL, R as RETRIEVAL_API_BASE_URL, a as settings, n as tools, o as mobile, u as user, T as TTSWorker, p as WEBUI_API_BASE_URL, t as temporaryChatEnabled, W as WEBUI_NAME, d as chatId, j as showSidebar, k as functions, q as showCallOverlay, f as theme, r as showControls, v as showArtifacts, w as showOverview, g as WEBUI_BASE_URL, b as currentChatPage, s as socket, l as userAPIKey, x as chatTitle, y as banners, z as chats, B as tags } from "./index3.js";
import { c as compressImage, b as blobToFile, a as createMessagesList, s as sanitizeResponseContent, d as convertMessagesToHistory, p as promptTemplate, r as removeDetails, g as getPromptVariables } from "./index5.js";
import { a as getChatById, b as getTagsById, u as updateChatById, c as getChatList, d as createNewChat, e as getAllTags } from "./index8.js";
import { b as generateEmoji, c as chatAction, d as generateMoACompletion, e as generateOpenAIChatCompletion, s as stopTask } from "./index7.js";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { a as getUserSettings, b as getAndUpdateUserLocation } from "./index6.js";
import { V as Valves, f as getUserValvesById, h as getUserValvesSpecById, e as getFunctions, i as getTools, H as Heart } from "./Heart.js";
import "dompurify";
import { marked } from "marked";
import * as XLSX from "xlsx";
import { u as uploadFile } from "./Drawer.svelte_svelte_type_style_lang.js";
import "dequal";
import "./create.js";
import "./AutoCompletion.js";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "turndown";
import "@tiptap/extension-code-block-lowlight";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-highlight";
import "@tiptap/extension-typography";
import "@tiptap/starter-kit";
/* empty css                                    */
/* empty css                                          */
/* empty css                                            */
import { T as Tags, E as EyeSlash, M as Messages } from "./Messages.js";
import { M as Modal } from "./Modal.js";
import { S as Selector } from "./Selector.js";
import { T as Tooltip } from "./Tooltip.js";
import { d as derived, w as writable, r as readable } from "./index2.js";
import { s as setSubMenuCtx, g as getSubmenuCtx, u as updateSubPositioning, a as getSubTrigger, M as Menu_content, f as flyAndScale } from "./menu-trigger.js";
import { D as Dropdown, M as Menu_item } from "./Dropdown.js";
import { a as createDispatcher, d as disabledAttrs } from "./updater.js";
import "file-saver";
import { C as Clipboard, F as FileItem, P as ProfileImage, S as SVGPanZoom } from "./Markdown.js";
import { M as MenuLines } from "./MenuLines.js";
import { X as XMark } from "./XMark.js";
import { A as AdvancedParams } from "./AdvancedParams.js";
import { S as Spinner } from "./Spinner.js";
import { C as Collapsible } from "./Collapsible.js";
import cc from "classcat";
import { Position, ConnectionMode, areConnectionMapsEqual, handleConnectionChange, errorMessages, getBezierPath, getSmoothStepPath, getStraightPath, infiniteExtent, adoptUserNodes, updateConnectionLookup, getInternalNodesBounds, getViewportForBounds, SelectionMode, initialConnection, ConnectionLineType, devWarn, isEdgeVisible, getEdgePosition, getElevatedEdgeZIndex, getNodesInside, getElementsToRemove, pointToRendererPoint, createMarkerIds, addEdge, updateNodeInternals, getFitViewNodes, fitView, panBy, nodeHasDimensions, getMarkerId, MarkerType, isNumeric, isMacOs, getConnectionStatus, PanOnScrollMode, isNodeBase, isRectObject, nodeToRect, getOverlappingArea, rendererPointToPoint, getNodesBounds, evaluateAbsolutePosition } from "@xyflow/system";
import { C as ConfirmDialog } from "./ConfirmDialog.js";
const Menu_sub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { disabled = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  const { updateOption, ids, states: { subOpen } } = setSubMenuCtx({
    disabled,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  open !== void 0 && subOpen.set(open);
  {
    updateOption("disabled", disabled);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ subIds: $idValues }) : ``}`;
});
const Menu_sub_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $subMenu, $$unsubscribe_subMenu;
  let $subOpen, $$unsubscribe_subOpen;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "right" } = $$props;
  let { align = "start" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { subMenu }, states: { subOpen }, ids, getAttrs } = getSubmenuCtx();
  $$unsubscribe_subMenu = subscribe(subMenu, (value) => $subMenu = value);
  $$unsubscribe_subOpen = subscribe(subOpen, (value) => $subOpen = value);
  createDispatcher();
  const attrs = getAttrs("sub-content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder = $subMenu;
  {
    Object.assign(builder, attrs);
  }
  {
    updateSubPositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  $$unsubscribe_subMenu();
  $$unsubscribe_subOpen();
  return `${asChild && $subOpen ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_sub_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["disabled", "asChild", "id", "el"]);
  let $disabledStore, $$unsubscribe_disabledStore;
  let $subTrigger, $$unsubscribe_subTrigger;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { subTrigger }, ids, getAttrs, options } = getSubTrigger();
  $$unsubscribe_subTrigger = subscribe(subTrigger, (value) => $subTrigger = value);
  const { disabled: disabledStore } = options;
  $$unsubscribe_disabledStore = subscribe(disabledStore, (value) => $disabledStore = value);
  createDispatcher();
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $subTrigger;
  attrs = {
    ...getAttrs("sub-trigger"),
    ...disabledAttrs(disabled || $disabledStore)
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_disabledStore();
  $$unsubscribe_subTrigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Tags_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { chatId: chatId2 = "" } = $$props;
  let tags$1 = [];
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  return `${validate_component(Tags, "Tags").$$render($$result, { tags: tags$1 }, {}, {})}`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"></path></svg>`;
});
const ShareChatModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_models;
  let $i18n, $$unsubscribe_i18n;
  let $config, $$unsubscribe_config;
  $$unsubscribe_models = subscribe(models, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  let { chatId: chatId2 } = $$props;
  let chat = null;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  const isDifferentChat = (_chat) => {
    if (!chat) {
      return true;
    }
    if (!_chat) {
      return false;
    }
    return chat.id !== _chat.id || chat.share_id !== _chat.share_id;
  };
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        (async () => {
          if (chatId2) {
            const _chat = await getChatById(localStorage.token, chatId2);
            if (isDifferentChat(_chat)) {
              chat = _chat;
            }
          } else {
            chat = null;
            console.log(chat);
          }
        })();
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "md", show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-0.5"><div class="text-lg font-medium self-center">${escape($i18n.t("Share Chat"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> ${chat ? `<div class="px-5 pt-4 pb-5 w-full flex flex-col justify-center"><div class="text-sm dark:text-gray-300 mb-1">${chat.share_id ? `<a href="${"/s/" + escape(chat.share_id, true)}" target="_blank">${escape($i18n.t("You have shared this chat"))} <span class="underline">${escape($i18n.t("before"))}</span>.</a> ${escape($i18n.t("Click here to"))} <button class="underline">${escape($i18n.t("delete this link"))}</button> ${escape($i18n.t("and create a new shared link."))}` : `${escape($i18n.t("Messages you send after creating your link won't be shared. Users with the URL will be able to view the shared chat."))}`}</div> <div class="flex justify-end"><div class="flex flex-col items-end space-x-1 mt-3"><div class="flex gap-1">${$config?.features.enable_community_sharing ? `<button class="self-center flex items-center gap-1 px-3.5 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-850 dark:text-white dark:hover:bg-gray-800 transition rounded-full" type="button">${escape($i18n.t("Share to Open WebUI Community"))}</button>` : ``} <button class="self-center flex items-center gap-1 px-3.5 py-2 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full" type="button" id="copy-and-share-chat-button">${validate_component(Link, "Link").$$render($$result, {}, {}, {})} ${chat.share_id ? `${escape($i18n.t("Update and Copy Link"))}` : `${escape($i18n.t("Copy Link"))}`}</button></div></div></div></div>` : ``}</div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_models();
  $$unsubscribe_i18n();
  $$unsubscribe_config();
  return $$rendered;
});
const PencilSquare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path></svg>`;
});
const transcribeAudio = async (token, file) => {
  const data = new FormData();
  data.append("file", file);
  let error = null;
  const res = await fetch(`${AUDIO_API_BASE_URL}/transcriptions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`
    },
    body: data
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
const synthesizeOpenAISpeech = async (token = "", speaker = "alloy", text = "", model) => {
  let error = null;
  const res = await fetch(`${AUDIO_API_BASE_URL}/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: text,
      voice: speaker,
      ...model
    })
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2;
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
const Pane_resizer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDragging;
  let style;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["disabled", "onDraggingChange", "tabIndex", "el", "id", "style"]);
  let $groupId, $$unsubscribe_groupId;
  let $direction, $$unsubscribe_direction;
  let $dragState, $$unsubscribe_dragState;
  let { disabled = false } = $$props;
  let { onDraggingChange = void 0 } = $$props;
  let { tabIndex = 0 } = $$props;
  let { el = null } = $$props;
  let { id: idFromProps = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { methods: { registerResizeHandle, startDragging, stopDragging }, states: { direction, dragState, groupId } } = getCtx("PaneResizer");
  $$unsubscribe_direction = subscribe(direction, (value) => $direction = value);
  $$unsubscribe_dragState = subscribe(dragState, (value) => $dragState = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  const resizeHandleId = generateId(idFromProps);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.onDraggingChange === void 0 && $$bindings.onDraggingChange && onDraggingChange !== void 0) $$bindings.onDraggingChange(onDraggingChange);
  if ($$props.tabIndex === void 0 && $$bindings.tabIndex && tabIndex !== void 0) $$bindings.tabIndex(tabIndex);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.id === void 0 && $$bindings.id && idFromProps !== void 0) $$bindings.id(idFromProps);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0) $$bindings.style(styleFromProps);
  isDragging = $dragState?.dragHandleId === resizeHandleId;
  {
    if (disabled) ;
    else {
      registerResizeHandle(resizeHandleId);
    }
  }
  style = styleToString({
    cursor: getCursorStyle($direction),
    "touch-action": "none",
    "user-select": "none",
    "-webkit-user-select": "none",
    "-webkit-touch-callout": "none"
  }) + styleFromProps;
  attrs = {
    "data-direction": $direction,
    "data-pane-group-id": $groupId,
    "data-active": isDragging ? "pointer" : void 0,
    "data-enabled": !disabled,
    "data-pane-resizer-id": resizeHandleId,
    "data-pane-resizer": ""
  };
  $$unsubscribe_groupId();
  $$unsubscribe_direction();
  $$unsubscribe_dragState();
  return `   <div${spread(
    [
      { role: "separator" },
      { style: escape_attribute_value(style) },
      {
        tabindex: escape_attribute_value(tabIndex)
      },
      escape_object(attrs),
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const processYoutubeVideo = async (token, url) => {
  let error = null;
  const res = await fetch(`${RETRIEVAL_API_BASE_URL}/process/youtube`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      url
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
async function createOpenAITextStream(responseBody, splitLargeDeltas) {
  const eventStream = responseBody.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).getReader();
  let iterator = openAIStreamToIterator(eventStream);
  if (splitLargeDeltas) {
    iterator = streamLargeDeltasAsRandomChunks(iterator);
  }
  return iterator;
}
async function* openAIStreamToIterator(reader) {
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      yield { done: true, value: "" };
      break;
    }
    if (!value) {
      continue;
    }
    const data = value.data;
    if (data.startsWith("[DONE]")) {
      yield { done: true, value: "" };
      break;
    }
    try {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      if (parsedData.error) {
        yield { done: true, value: "", error: parsedData.error };
        break;
      }
      if (parsedData.sources) {
        yield { done: false, value: "", sources: parsedData.sources };
        continue;
      }
      if (parsedData.selected_model_id) {
        yield { done: false, value: "", selectedModelId: parsedData.selected_model_id };
        continue;
      }
      if (parsedData.usage) {
        yield { done: false, value: "", usage: parsedData.usage };
        continue;
      }
      yield {
        done: false,
        value: parsedData.choices?.[0]?.delta?.content ?? ""
      };
    } catch (e) {
      console.error("Error extracting delta from SSE event:", e);
    }
  }
}
async function* streamLargeDeltasAsRandomChunks(iterator) {
  for await (const textStreamUpdate of iterator) {
    if (textStreamUpdate.done) {
      yield textStreamUpdate;
      return;
    }
    if (textStreamUpdate.error) {
      yield textStreamUpdate;
      continue;
    }
    if (textStreamUpdate.sources) {
      yield textStreamUpdate;
      continue;
    }
    if (textStreamUpdate.selectedModelId) {
      yield textStreamUpdate;
      continue;
    }
    if (textStreamUpdate.usage) {
      yield textStreamUpdate;
      continue;
    }
    let content = textStreamUpdate.value;
    if (content.length < 5) {
      yield { done: false, value: content };
      continue;
    }
    while (content != "") {
      const chunkSize = Math.min(Math.floor(Math.random() * 3) + 1, content.length);
      const chunk = content.slice(0, chunkSize);
      yield { done: false, value: chunk };
      if (document?.visibilityState !== "hidden") {
        await sleep(5);
      }
      content = content.slice(chunkSize);
    }
  }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { banner = {
    id: "",
    type: "info",
    title: "",
    content: "",
    url: "",
    dismissable: true,
    timestamp: Math.floor(Date.now() / 1e3)
  } } = $$props;
  let { dismissed = false } = $$props;
  if ($$props.banner === void 0 && $$bindings.banner && banner !== void 0) $$bindings.banner(banner);
  if ($$props.dismissed === void 0 && $$bindings.dismissed && dismissed !== void 0) $$bindings.dismissed(dismissed);
  return `${!dismissed ? `${``}` : ``}`;
});
({
  sdk: "8.0",
  entry: {
    oneDrive: {
      files: {}
    }
  },
  authentication: {},
  messaging: {
    origin: window?.location?.origin,
    channelId: v4()
  },
  typesAndSources: {
    mode: "files",
    pivots: {
      oneDrive: true,
      recent: true
    }
  }
});
const MessageInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $models, $$unsubscribe_models;
  let $$unsubscribe_tools;
  let $$unsubscribe_mobile;
  let $$unsubscribe__user;
  let $$unsubscribe_TTSWorker;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_tools = subscribe(tools, (value) => value);
  $$unsubscribe_mobile = subscribe(mobile, (value) => value);
  $$unsubscribe__user = subscribe(user, (value) => value);
  $$unsubscribe_TTSWorker = subscribe(TTSWorker, (value) => value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { transparentBackground = false } = $$props;
  let { onChange = () => {
  } } = $$props;
  let { createMessagePair } = $$props;
  let { stopResponse } = $$props;
  let { autoScroll = false } = $$props;
  let { atSelectedModel = void 0 } = $$props;
  let { selectedModels } = $$props;
  let { history } = $$props;
  let { prompt = "" } = $$props;
  let { files = [] } = $$props;
  let { selectedToolIds = [] } = $$props;
  let { imageGenerationEnabled = false } = $$props;
  let { webSearchEnabled = false } = $$props;
  let { codeInterpreterEnabled = false } = $$props;
  let dragged = false;
  let { placeholder = "" } = $$props;
  let visionCapableModels = [];
  const uploadFileHandler = async (file, fullContext = false) => {
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const isExcel = file.type.startsWith("application/vnd.ms-excel") || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileExtension === ".xlsx" || fileExtension === ".xls" || fileExtension === ".csv";
    const tempItemId = v4();
    const fileItem = {
      type: isExcel ? "excel" : "file",
      file: "",
      id: null,
      url: "",
      name: file.name,
      collection_name: "",
      status: "uploading",
      size: file.size,
      error: "",
      itemId: tempItemId,
      conversionResult: null,
      ...fullContext ? { context: "full" } : {}
    };
    if (fileItem.size == 0) {
      toast.error($i18n.t("You cannot upload an empty file."));
      return null;
    }
    files = [...files, fileItem];
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (isExcel) {
        console.log("Processing Excel file:", file.name, "Size:", file.size);
        let excelMetadata = null;
        try {
          excelMetadata = await extractExcelMetadata(file);
          formData.append("metadata", JSON.stringify({
            sheetNames: excelMetadata.sheetNames,
            rowCount: excelMetadata.rowCount,
            columnCount: excelMetadata.columnCount,
            headers: excelMetadata.headers,
            previewData: excelMetadata.previewData
          }));
          console.log("Excel metadata extracted successfully", excelMetadata);
        } catch (metadataError) {
          console.error("Failed to extract Excel metadata:", metadataError);
        }
        console.log("FormData 内容:", Array.from(formData.entries()).map(([k, v]) => ({
          key: k,
          value: v instanceof File ? v.name : v
        })));
        const conversionResponse = await fetch("http://localhost:8080/proxy/excel-to-sql", {
          method: "POST",
          headers: {
            "Authorization": "Bearer token_59b8b43a_aiurmmm0",
            "Accept-Language": "en"
          },
          body: formData
        });
        if (!conversionResponse.ok) {
          const error = await conversionResponse.json();
          throw new Error(error.detail || "Excel conversion failed");
        }
        const conversionResult = await conversionResponse.json();
        fileItem.conversionResult = conversionResult;
        const uploadedFile = await uploadFile(localStorage.token, file, formData);
        if (uploadedFile) {
          fileItem.file = uploadedFile;
          fileItem.id = uploadedFile.id;
          fileItem.url = `${WEBUI_API_BASE_URL}/files/${uploadedFile.id}`;
        }
      } else {
        const uploadedFile = await uploadFile(localStorage.token, file, formData);
        if (uploadedFile) {
          fileItem.file = uploadedFile;
          fileItem.id = uploadedFile.id;
          fileItem.url = `${WEBUI_API_BASE_URL}/files/${uploadedFile.id}`;
        }
      }
      files = files.map((item) => item.itemId === tempItemId ? { ...fileItem, status: "processed" } : item);
    } catch (e) {
      files = files.map((item) => item.itemId === tempItemId ? {
        ...item,
        status: "error",
        error: e.message
      } : item);
      toast.error($i18n.t("File processing failed: {{error}}", { error: e.message }));
    }
  };
  const extractExcelMetadata = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const workbook = XLSX.read(event.target.result, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const rowCount = jsonData.length - 1;
          const sampleRows = jsonData.slice(1, 4);
          resolve({
            columnNames: headers,
            rowCount,
            sampleRows
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  const inputFilesHandler = async (inputFiles2) => {
    console.log("Input files handler called with:", inputFiles2);
    inputFiles2.forEach((file) => {
      console.log("Processing file:", {
        name: file.name,
        type: file.type,
        size: file.size,
        extension: file.name.split(".").at(-1)
      });
      if (($config?.file?.max_size ?? null) !== null && file.size > ($config?.file?.max_size ?? 0) * 1024 * 1024) {
        console.log("File exceeds max size limit:", {
          fileSize: file.size,
          maxSize: ($config?.file?.max_size ?? 0) * 1024 * 1024
        });
        toast.error($i18n.t(`File size should not exceed {{maxSize}} MB.`, { maxSize: $config?.file?.max_size }));
        return;
      }
      "." + file.name.split(".").pop().toLowerCase();
      const isExcel = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.oasis.opendocument.spreadsheet",
        "text/csv"
      ].includes(file.type) || [".xls", ".xlsx", ".csv", ".ods"].includes("." + file.name.split(".").pop().toLowerCase());
      if (["image/gif", "image/webp", "image/jpeg", "image/png", "image/avif"].includes(file["type"])) {
        if (visionCapableModels.length === 0) {
          toast.error($i18n.t("Selected model(s) do not support image inputs"));
          return;
        }
        let reader = new FileReader();
        reader.onload = async (event) => {
          let imageUrl = event.target.result;
          if ($settings?.imageCompression ?? false) {
            const width = $settings?.imageCompressionSize?.width ?? null;
            const height = $settings?.imageCompressionSize?.height ?? null;
            if (width || height) {
              imageUrl = await compressImage(imageUrl, width, height);
            }
          }
          files = [...files, { type: "image", url: `${imageUrl}` }];
        };
        reader.readAsDataURL(file);
      } else if (isExcel) {
        console.log("Excel file detected:", file.name);
        (async () => {
          try {
            const excelMetadata = await extractExcelMetadata(file);
            console.log("Excel metadata:", excelMetadata);
            const fileWithMetadata = new File([file], file.name, { type: file.type });
            fileWithMetadata.excelMetadata = excelMetadata;
            uploadFileHandler(file, true);
          } catch (error) {
            console.error("Error extracting Excel metadata:", error);
            toast.error($i18n.t("Error processing Excel file: {{error}}", { error: error.message }));
          }
        })();
      } else {
        uploadFileHandler(file);
      }
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      console.log("Escape");
      dragged = false;
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.types?.includes("Files")) {
      dragged = true;
    } else {
      dragged = false;
    }
  };
  const onDragLeave = () => {
    dragged = false;
  };
  const onDrop = async (e) => {
    e.preventDefault();
    console.log(e);
    if (e.dataTransfer?.files) {
      const inputFiles2 = Array.from(e.dataTransfer?.files);
      if (inputFiles2 && inputFiles2.length > 0) {
        console.log(inputFiles2);
        inputFilesHandler(inputFiles2);
      }
    }
    dragged = false;
  };
  onDestroy(() => {
    console.log("destroy");
    window.removeEventListener("keydown", handleKeyDown);
    const dropzoneElement = document.getElementById("chat-container");
    if (dropzoneElement) {
      dropzoneElement?.removeEventListener("dragover", onDragOver);
      dropzoneElement?.removeEventListener("drop", onDrop);
      dropzoneElement?.removeEventListener("dragleave", onDragLeave);
    }
  });
  if ($$props.transparentBackground === void 0 && $$bindings.transparentBackground && transparentBackground !== void 0) $$bindings.transparentBackground(transparentBackground);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  if ($$props.createMessagePair === void 0 && $$bindings.createMessagePair && createMessagePair !== void 0) $$bindings.createMessagePair(createMessagePair);
  if ($$props.stopResponse === void 0 && $$bindings.stopResponse && stopResponse !== void 0) $$bindings.stopResponse(stopResponse);
  if ($$props.autoScroll === void 0 && $$bindings.autoScroll && autoScroll !== void 0) $$bindings.autoScroll(autoScroll);
  if ($$props.atSelectedModel === void 0 && $$bindings.atSelectedModel && atSelectedModel !== void 0) $$bindings.atSelectedModel(atSelectedModel);
  if ($$props.selectedModels === void 0 && $$bindings.selectedModels && selectedModels !== void 0) $$bindings.selectedModels(selectedModels);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0) $$bindings.prompt(prompt);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.selectedToolIds === void 0 && $$bindings.selectedToolIds && selectedToolIds !== void 0) $$bindings.selectedToolIds(selectedToolIds);
  if ($$props.imageGenerationEnabled === void 0 && $$bindings.imageGenerationEnabled && imageGenerationEnabled !== void 0) $$bindings.imageGenerationEnabled(imageGenerationEnabled);
  if ($$props.webSearchEnabled === void 0 && $$bindings.webSearchEnabled && webSearchEnabled !== void 0) $$bindings.webSearchEnabled(webSearchEnabled);
  if ($$props.codeInterpreterEnabled === void 0 && $$bindings.codeInterpreterEnabled && codeInterpreterEnabled !== void 0) $$bindings.codeInterpreterEnabled(codeInterpreterEnabled);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    atSelectedModel !== void 0 ? [atSelectedModel.id] : selectedModels;
    {
      onChange({
        prompt,
        files,
        selectedToolIds,
        imageGenerationEnabled,
        webSearchEnabled
      });
    }
    visionCapableModels = [...atSelectedModel ? [atSelectedModel] : selectedModels].filter((model) => $models.find((m) => m.id === model)?.info?.meta?.capabilities?.vision ?? true);
    $$rendered = `${validate_component(FilesOverlay, "FilesOverlay").$$render($$result, { show: dragged }, {}, {})} ${``}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_models();
  $$unsubscribe_tools();
  $$unsubscribe_mobile();
  $$unsubscribe__user();
  $$unsubscribe_TTSWorker();
  return $$rendered;
});
const ModelSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $models, $$unsubscribe_models;
  let $i18n, $$unsubscribe_i18n;
  let $$unsubscribe_settings;
  let $user, $$unsubscribe_user;
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { selectedModels = [""] } = $$props;
  let { disabled = false } = $$props;
  let { showSetDefault = true } = $$props;
  if ($$props.selectedModels === void 0 && $$bindings.selectedModels && selectedModels !== void 0) $$bindings.selectedModels(selectedModels);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.showSetDefault === void 0 && $$bindings.showSetDefault && showSetDefault !== void 0) $$bindings.showSetDefault(showSetDefault);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (selectedModels.length > 0 && $models.length > 0) {
        selectedModels = selectedModels.map((model) => $models.map((m) => m.id).includes(model) ? model : "");
      }
    }
    $$rendered = `<div class="flex flex-col w-full items-start">${each(selectedModels, (selectedModel, selectedModelIdx) => {
      return `<div class="flex w-full max-w-fit"><div class="overflow-hidden w-full"><div class="mr-1 max-w-full">${validate_component(Selector, "Selector").$$render(
        $$result,
        {
          id: `${selectedModelIdx}`,
          placeholder: $i18n.t("Select a model"),
          items: $models.map((model) => ({
            value: model.id,
            label: model.name,
            model
          })),
          showTemporaryChatControl: $user.role === "user" ? $user?.permissions?.chat?.temporary ?? true : true,
          value: selectedModel
        },
        {
          value: ($$value) => {
            selectedModel = $$value;
            $$settled = false;
          }
        },
        {}
      )} </div></div> ${selectedModelIdx === 0 ? `<div class="self-center mx-1 disabled:text-gray-600 disabled:hover:text-gray-600 -translate-y-[0.5px]">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Add Model") }, {}, {
        default: () => {
          return `<button class="" ${disabled ? "disabled" : ""} aria-label="Add Model"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path></svg></button> `;
        }
      })} </div>` : `<div class="self-center mx-1 disabled:text-gray-600 disabled:hover:text-gray-600 -translate-y-[0.5px]">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Remove Model") }, {}, {
        default: () => {
          return `<button ${disabled ? "disabled" : ""} aria-label="Remove Model"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-3"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg></button> `;
        }
      })} </div>`} </div>`;
    })}</div> ${showSetDefault ? `<div class="absolute text-left mt-[1px] ml-1 text-[0.7rem] text-gray-500 font-primary"><button>${escape($i18n.t("Set as default"))}</button></div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_models();
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_user();
  return $$rendered;
});
const Map$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"></path></svg>`;
});
const AdjustmentsHorizontal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"${add_attribute("class", className, 0)}${add_attribute("stroke-width", strokeWidth, 0)}><path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"></path></svg>`;
});
const Cube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path></svg>`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $mobile, $$unsubscribe_mobile;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe_mobile = subscribe(mobile, (value) => $mobile = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { shareEnabled = false } = $$props;
  let { shareHandler } = $$props;
  let { downloadHandler } = $$props;
  let { chat } = $$props;
  let { onClose = () => {
  } } = $$props;
  if ($$props.shareEnabled === void 0 && $$bindings.shareEnabled && shareEnabled !== void 0) $$bindings.shareEnabled(shareEnabled);
  if ($$props.shareHandler === void 0 && $$bindings.shareHandler && shareHandler !== void 0) $$bindings.shareHandler(shareHandler);
  if ($$props.downloadHandler === void 0 && $$bindings.downloadHandler && downloadHandler !== void 0) $$bindings.downloadHandler(downloadHandler);
  if ($$props.chat === void 0 && $$bindings.chat && chat !== void 0) $$bindings.chat(chat);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_mobile();
  $$unsubscribe_i18n();
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    content: () => {
      return `<div slot="content">${validate_component(Menu_content, "DropdownMenu.Content").$$render(
        $$result,
        {
          class: "w-full max-w-[200px] rounded-xl px-1 py-1.5  z-50 bg-white dark:bg-gray-850 dark:text-white shadow-lg",
          sideOffset: 8,
          side: "bottom",
          align: "end",
          transition: flyAndScale
        },
        {},
        {
          default: () => {
            return ` ${$mobile ? `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-controls-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(AdjustmentsHorizontal, "AdjustmentsHorizontal").$$render($$result, { className: " size-4", strokeWidth: "0.5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Controls"))}</div>`;
                }
              }
            )}` : ``} ${!$temporaryChatEnabled ? `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-share-button"
              },
              {},
              {
                default: () => {
                  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd"></path></svg> <div class="flex items-center">${escape($i18n.t("Share"))}</div>`;
                }
              }
            )}` : ``} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-overview-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Map$1, "Map").$$render($$result, { className: " size-4", strokeWidth: "1.5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Overview"))}</div>`;
                }
              }
            )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-overview-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Cube, "Cube").$$render($$result, { className: " size-4", strokeWidth: "1.5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Artifacts"))}</div>`;
                }
              }
            )} ${validate_component(Menu_sub, "DropdownMenu.Sub").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Menu_sub_trigger, "DropdownMenu.SubTrigger").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                  },
                  {},
                  {
                    default: () => {
                      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg> <div class="flex items-center">${escape($i18n.t("Download"))}</div>`;
                    }
                  }
                )} ${validate_component(Menu_sub_content, "DropdownMenu.SubContent").$$render(
                  $$result,
                  {
                    class: "w-full rounded-xl px-1 py-1.5 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-lg",
                    transition: flyAndScale,
                    sideOffset: 8
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                        $$result,
                        {
                          class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        },
                        {},
                        {
                          default: () => {
                            return `<div class="flex items-center line-clamp-1">${escape($i18n.t("Export chat (.json)"))}</div>`;
                          }
                        }
                      )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                        $$result,
                        {
                          class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        },
                        {},
                        {
                          default: () => {
                            return `<div class="flex items-center line-clamp-1">${escape($i18n.t("Plain text (.txt)"))}</div>`;
                          }
                        }
                      )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                        $$result,
                        {
                          class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        },
                        {},
                        {
                          default: () => {
                            return `<div class="flex items-center line-clamp-1">${escape($i18n.t("PDF document (.pdf)"))}</div>`;
                          }
                        }
                      )}`;
                    }
                  }
                )}`;
              }
            })} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-copy-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Clipboard, "Clipboard").$$render($$result, { className: " size-4", strokeWidth: "1.5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Copy"))}</div>`;
                }
              }
            )} ${!$temporaryChatEnabled ? `<hr class="border-gray-100 dark:border-gray-850 my-0.5"> <div class="flex p-1">${validate_component(Tags_1, "Tags").$$render($$result, { chatId: chat.id }, {}, {})}</div>` : ``}`;
          }
        }
      )}</div>`;
    },
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $chatId, $$unsubscribe_chatId;
  let $showSidebar, $$unsubscribe_showSidebar;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $i18n, $$unsubscribe_i18n;
  let $user, $$unsubscribe_user;
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_chatId = subscribe(chatId, (value) => $chatId = value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { initNewChat } = $$props;
  let { title = $WEBUI_NAME } = $$props;
  let { shareEnabled = false } = $$props;
  let { chat } = $$props;
  let { selectedModels } = $$props;
  let { showModelSelector = true } = $$props;
  let showShareChatModal = false;
  if ($$props.initNewChat === void 0 && $$bindings.initNewChat && initNewChat !== void 0) $$bindings.initNewChat(initNewChat);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.shareEnabled === void 0 && $$bindings.shareEnabled && shareEnabled !== void 0) $$bindings.shareEnabled(shareEnabled);
  if ($$props.chat === void 0 && $$bindings.chat && chat !== void 0) $$bindings.chat(chat);
  if ($$props.selectedModels === void 0 && $$bindings.selectedModels && selectedModels !== void 0) $$bindings.selectedModels(selectedModels);
  if ($$props.showModelSelector === void 0 && $$bindings.showModelSelector && showModelSelector !== void 0) $$bindings.showModelSelector(showModelSelector);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(ShareChatModal, "ShareChatModal").$$render(
      $$result,
      {
        chatId: $chatId,
        show: showShareChatModal
      },
      {
        show: ($$value) => {
          showShareChatModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} <nav class="sticky top-0 z-30 w-full px-1.5 py-1.5 -mb-8 flex items-center drag-region"><div class="bg-linear-to-b via-50% from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pointer-events-none absolute inset-0 -bottom-7 z-[-1]"></div> <div class="flex max-w-full w-full mx-auto px-1 pt-0.5 bg-transparent"><div class="flex items-center w-full max-w-full"><div class="${escape($showSidebar ? "md:hidden" : "", true) + " mr-1 self-start flex flex-none items-center text-gray-600 dark:text-gray-400"}"><button id="sidebar-toggle-button" class="cursor-pointer px-2 py-2 flex rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition" aria-label="Toggle Sidebar"><div class="m-auto self-center">${validate_component(MenuLines, "MenuLines").$$render($$result, {}, {}, {})}</div></button></div> <div class="${"flex-1 overflow-hidden max-w-full py-0.5 " + escape($showSidebar ? "ml-1" : "", true)}">${showModelSelector ? `${validate_component(ModelSelector, "ModelSelector").$$render(
      $$result,
      {
        showSetDefault: !shareEnabled,
        selectedModels
      },
      {
        selectedModels: ($$value) => {
          selectedModels = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div> <div class="self-start flex flex-none items-center text-gray-600 dark:text-gray-400"> ${shareEnabled && chat && (chat.id || $temporaryChatEnabled) ? `${validate_component(Menu, "Menu").$$render(
      $$result,
      {
        chat,
        shareEnabled,
        shareHandler: () => {
          showShareChatModal = !showShareChatModal;
        },
        downloadHandler: () => {
        }
      },
      {},
      {
        default: () => {
          return `<button class="flex cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition" id="chat-context-menu-button" data-svelte-h="svelte-xd5mtd"><div class="m-auto self-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path></svg></div></button>`;
        }
      }
    )} ` : ``}  ${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("New Chat") }, {}, {
      default: () => {
        return `<button id="new-chat-button" class="${"flex " + escape($showSidebar ? "md:hidden" : "", true) + " cursor-pointer px-2 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"}" aria-label="New Chat"><div class="m-auto self-center">${validate_component(PencilSquare, "PencilSquare").$$render($$result, { className: " size-5", strokeWidth: "2" }, {}, {})}</div></button>`;
      }
    })} ${$user !== void 0 ? `${validate_component(UserMenu, "UserMenu").$$render(
      $$result,
      {
        className: "max-w-[200px]",
        role: $user.role
      },
      {},
      {
        default: () => {
          return `<button class="select-none flex rounded-xl p-1.5 w-full hover:bg-gray-50 dark:hover:bg-gray-850 transition" aria-label="User Menu"><div class="self-center"><img${add_attribute("src", $user.profile_image_url, 0)} class="size-6 object-cover rounded-full" alt="User profile" draggable="false"></div></button>`;
        }
      }
    )}` : ``}</div></div></div></nav>`;
  } while (!$$settled);
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_chatId();
  $$unsubscribe_showSidebar();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_i18n();
  $$unsubscribe_user();
  return $$rendered;
});
const Handle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isTarget;
  let isConnectable;
  let handleId;
  let connectionInProcess;
  let connectingFrom;
  let connectingTo;
  let isPossibleEndHandle;
  let valid;
  let $connection, $$unsubscribe_connection;
  let $connectionMode, $$unsubscribe_connectionMode;
  let $connectionLookup, $$unsubscribe_connectionLookup;
  let $$unsubscribe_edges;
  let $$unsubscribe_viewport;
  let $$unsubscribe_onConnectEndAction;
  let $$unsubscribe_onConnectStartAction;
  let $$unsubscribe_onConnectAction;
  let $$unsubscribe_onedgecreate;
  let $$unsubscribe_isValidConnectionStore;
  let $flowId, $$unsubscribe_flowId;
  let $$unsubscribe_autoPanOnConnect;
  let $$unsubscribe_lib;
  let $$unsubscribe_nodeLookup;
  let $$unsubscribe_domNode;
  let $$unsubscribe_connectionRadius;
  let $connectable, $$unsubscribe_connectable;
  let { id = void 0 } = $$props;
  let { type = "source" } = $$props;
  let { position = Position.Top } = $$props;
  let { style = void 0 } = $$props;
  let { isValidConnection = void 0 } = $$props;
  let { onconnect = void 0 } = $$props;
  let { ondisconnect = void 0 } = $$props;
  let { isConnectable: isConnectableProp = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const nodeId = getContext("svelteflow__node_id");
  const connectable = getContext("svelteflow__node_connectable");
  $$unsubscribe_connectable = subscribe(connectable, (value) => $connectable = value);
  const store = useStore();
  const { connectionMode, domNode, nodeLookup, connectionRadius, viewport, isValidConnection: isValidConnectionStore, lib, addEdge: addEdge2, onedgecreate, panBy: panBy2, cancelConnection, updateConnection, autoPanOnConnect, edges, connectionLookup, onconnect: onConnectAction, onconnectstart: onConnectStartAction, onconnectend: onConnectEndAction, flowId, connection } = store;
  $$unsubscribe_connectionMode = subscribe(connectionMode, (value) => $connectionMode = value);
  $$unsubscribe_domNode = subscribe(domNode, (value) => value);
  $$unsubscribe_nodeLookup = subscribe(nodeLookup, (value) => value);
  $$unsubscribe_connectionRadius = subscribe(connectionRadius, (value) => value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => value);
  $$unsubscribe_isValidConnectionStore = subscribe(isValidConnectionStore, (value) => value);
  $$unsubscribe_lib = subscribe(lib, (value) => value);
  $$unsubscribe_onedgecreate = subscribe(onedgecreate, (value) => value);
  $$unsubscribe_autoPanOnConnect = subscribe(autoPanOnConnect, (value) => value);
  $$unsubscribe_edges = subscribe(edges, (value) => value);
  $$unsubscribe_connectionLookup = subscribe(connectionLookup, (value) => $connectionLookup = value);
  $$unsubscribe_onConnectAction = subscribe(onConnectAction, (value) => value);
  $$unsubscribe_onConnectStartAction = subscribe(onConnectStartAction, (value) => value);
  $$unsubscribe_onConnectEndAction = subscribe(onConnectEndAction, (value) => value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  $$unsubscribe_connection = subscribe(connection, (value) => $connection = value);
  let prevConnections = null;
  let connections;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.isValidConnection === void 0 && $$bindings.isValidConnection && isValidConnection !== void 0) $$bindings.isValidConnection(isValidConnection);
  if ($$props.onconnect === void 0 && $$bindings.onconnect && onconnect !== void 0) $$bindings.onconnect(onconnect);
  if ($$props.ondisconnect === void 0 && $$bindings.ondisconnect && ondisconnect !== void 0) $$bindings.ondisconnect(ondisconnect);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectableProp !== void 0) $$bindings.isConnectable(isConnectableProp);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  isTarget = type === "target";
  isConnectable = isConnectableProp !== void 0 ? isConnectableProp : $connectable;
  handleId = id || null;
  {
    if (onconnect || ondisconnect) {
      connections = $connectionLookup.get(`${nodeId}-${type}-${id || null}`);
    }
  }
  {
    {
      if (prevConnections && !areConnectionMapsEqual(connections, prevConnections)) {
        const _connections = connections ?? /* @__PURE__ */ new Map();
        handleConnectionChange(prevConnections, _connections, ondisconnect);
        handleConnectionChange(_connections, prevConnections, onconnect);
      }
      prevConnections = connections ?? /* @__PURE__ */ new Map();
    }
  }
  connectionInProcess = !!$connection.fromHandle;
  connectingFrom = $connection.fromHandle?.nodeId === nodeId && $connection.fromHandle?.type === type && $connection.fromHandle?.id === handleId;
  connectingTo = $connection.toHandle?.nodeId === nodeId && $connection.toHandle?.type === type && $connection.toHandle?.id === handleId;
  isPossibleEndHandle = $connectionMode === ConnectionMode.Strict ? $connection.fromHandle?.type !== type : nodeId !== $connection.fromHandle?.nodeId || handleId !== $connection.fromHandle?.id;
  valid = connectingTo && $connection.isValid;
  $$unsubscribe_connection();
  $$unsubscribe_connectionMode();
  $$unsubscribe_connectionLookup();
  $$unsubscribe_edges();
  $$unsubscribe_viewport();
  $$unsubscribe_onConnectEndAction();
  $$unsubscribe_onConnectStartAction();
  $$unsubscribe_onConnectAction();
  $$unsubscribe_onedgecreate();
  $$unsubscribe_isValidConnectionStore();
  $$unsubscribe_flowId();
  $$unsubscribe_autoPanOnConnect();
  $$unsubscribe_lib();
  $$unsubscribe_nodeLookup();
  $$unsubscribe_domNode();
  $$unsubscribe_connectionRadius();
  $$unsubscribe_connectable();
  return ` <div${add_attribute("data-handleid", handleId, 0)}${add_attribute("data-nodeid", nodeId, 0)}${add_attribute("data-handlepos", position, 0)} data-id="${escape($flowId, true) + "-" + escape(nodeId, true) + "-" + escape(id || null, true) + "-" + escape(type, true)}" class="${[
    escape(
      cc([
        "svelte-flow__handle",
        `svelte-flow__handle-${position}`,
        "nodrag",
        "nopan",
        position,
        className
      ]),
      true
    ),
    (valid ? "valid" : "") + " " + (connectingTo ? "connectingto" : "") + " " + (connectingFrom ? "connectingfrom" : "") + " " + (!isTarget ? "source" : "") + " " + (isTarget ? "target" : "") + " " + (isConnectable ? "connectablestart" : "") + " " + (isConnectable ? "connectableend" : "") + " " + (isConnectable ? "connectable" : "") + " " + (isConnectable && (!connectionInProcess || isPossibleEndHandle) ? "connectionindicator" : "")
  ].join(" ").trim()}"${add_attribute("style", style, 0)} role="button" tabindex="-1">${slots.default ? slots.default({}) : ``}</div>`;
});
const DefaultNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["data", "targetPosition", "sourcePosition"]);
  let { data = { label: "Node" } } = $$props;
  let { targetPosition = void 0 } = $$props;
  let { sourcePosition = void 0 } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  return `${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "target",
      position: targetPosition ?? Position.Top
    },
    {},
    {}
  )} ${escape(data?.label)} ${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "source",
      position: sourcePosition ?? Position.Bottom
    },
    {},
    {}
  )}`;
});
const InputNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["data", "sourcePosition"]);
  let { data = { label: "Node" } } = $$props;
  let { sourcePosition = void 0 } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  return `${escape(data?.label)} ${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "source",
      position: sourcePosition ?? Position.Bottom
    },
    {},
    {}
  )}`;
});
const OutputNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, ["data", "targetPosition"]);
  let { data = { label: "Node" } } = $$props;
  let { targetPosition = void 0 } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  return `${escape(data?.label)} ${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "target",
      position: targetPosition ?? Position.Top
    },
    {},
    {}
  )}`;
});
const GroupNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  compute_rest_props($$props, []);
  return ``;
});
const EdgeLabelRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_domNode;
  const { domNode } = useStore();
  $$unsubscribe_domNode = subscribe(domNode, (value) => value);
  $$unsubscribe_domNode();
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
function useHandleEdgeSelect() {
  const { edgeLookup, selectionRect, selectionRectMode, multiselectionKeyPressed, addSelectedEdges, unselectNodesAndEdges, elementsSelectable } = useStore();
  return (id) => {
    const edge = get_store_value(edgeLookup).get(id);
    if (!edge) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    const selectable = edge.selectable || get_store_value(elementsSelectable) && typeof edge.selectable === "undefined";
    if (selectable) {
      selectionRect.set(null);
      selectionRectMode.set(null);
      if (!edge.selected) {
        addSelectedEdges([id]);
      } else if (edge.selected && get_store_value(multiselectionKeyPressed)) {
        unselectNodesAndEdges({ nodes: [], edges: [edge] });
      }
    }
  };
}
const EdgeLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { style = void 0 } = $$props;
  let { x = void 0 } = $$props;
  let { y = void 0 } = $$props;
  useHandleEdgeSelect();
  getContext("svelteflow__edge_id");
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0) $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0) $$bindings.y(y);
  return `${validate_component(EdgeLabelRenderer, "EdgeLabelRenderer").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="svelte-flow__edge-label"${add_styles(merge_ssr_styles(escape("pointer-events: all;" + style, true), {
        "transform": `translate(-50%, -50%) translate(${x}px,${y}px)`
      }))} role="button" tabindex="-1">${slots.default ? slots.default({}) : ``}</div>`;
    }
  })}`;
});
const BaseEdge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = void 0 } = $$props;
  let { path } = $$props;
  let { label = void 0 } = $$props;
  let { labelX = void 0 } = $$props;
  let { labelY = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { interactionWidth = 20 } = $$props;
  let { class: className = void 0 } = $$props;
  let interactionWidthValue = interactionWidth === void 0 ? 20 : interactionWidth;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0) $$bindings.path(path);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelX === void 0 && $$bindings.labelX && labelX !== void 0) $$bindings.labelX(labelX);
  if ($$props.labelY === void 0 && $$bindings.labelY && labelY !== void 0) $$bindings.labelY(labelY);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<path${add_attribute("id", id, 0)}${add_attribute("d", path, 0)}${add_attribute("class", cc(["svelte-flow__edge-path", className]), 0)}${add_attribute("marker-start", markerStart, 0)}${add_attribute("marker-end", markerEnd, 0)} fill="none"${add_attribute("style", style, 0)}></path> ${interactionWidthValue ? `<path${add_attribute("d", path, 0)}${add_attribute("stroke-opacity", 0, 0)}${add_attribute("stroke-width", interactionWidthValue, 0)} fill="none" class="svelte-flow__edge-interaction"></path>` : ``} ${label ? `${validate_component(EdgeLabel, "EdgeLabel").$$render($$result, { x: labelX, y: labelY, style: labelStyle }, {}, {
    default: () => {
      return `${escape(label)}`;
    }
  })}` : ``}`;
});
const BezierEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  compute_rest_props($$props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0) $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0) $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0) $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0) $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const SmoothStepEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  compute_rest_props($$props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0) $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0) $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0) $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0) $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const StraightEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  compute_rest_props($$props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "targetX",
    "targetY"
  ]);
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0) $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0) $$bindings.sourceY(sourceY);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0) $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0) $$bindings.targetY(targetY);
  [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const StepEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  compute_rest_props($$props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0) $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0) $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0) $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0) $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 0
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
function syncNodeStores(nodesStore, userNodesStore) {
  const nodesStoreSetter = nodesStore.set;
  const userNodesStoreSetter = userNodesStore.set;
  const currentNodesStore = get_store_value(nodesStore);
  const currentUserNodesStore = get_store_value(userNodesStore);
  const initWithUserNodes = currentNodesStore.length === 0 && currentUserNodesStore.length > 0;
  let val = initWithUserNodes ? currentUserNodesStore : currentNodesStore;
  nodesStore.set(val);
  const _set = (nds) => {
    const updatedNodes = nodesStoreSetter(nds);
    val = updatedNodes;
    userNodesStoreSetter(val);
    return updatedNodes;
  };
  nodesStore.set = userNodesStore.set = _set;
  nodesStore.update = userNodesStore.update = (fn) => _set(fn(val));
}
function syncEdgeStores(edgesStore, userEdgesStore) {
  const nodesStoreSetter = edgesStore.set;
  const userEdgesStoreSetter = userEdgesStore.set;
  let val = get_store_value(userEdgesStore);
  edgesStore.set(val);
  const _set = (eds) => {
    nodesStoreSetter(eds);
    userEdgesStoreSetter(eds);
    val = eds;
  };
  edgesStore.set = userEdgesStore.set = _set;
  edgesStore.update = userEdgesStore.update = (fn) => _set(fn(val));
}
const syncViewportStores = (panZoomStore, viewportStore, userViewportStore) => {
  if (!userViewportStore) {
    return;
  }
  const panZoom = get_store_value(panZoomStore);
  const viewportStoreSetter = viewportStore.set;
  const userViewportStoreSetter = userViewportStore.set;
  let val = userViewportStore ? get_store_value(userViewportStore) : { x: 0, y: 0, zoom: 1 };
  viewportStore.set(val);
  viewportStore.set = (vp) => {
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  userViewportStore.set = (vp) => {
    panZoom?.syncViewport(vp);
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  viewportStore.update = (fn) => {
    viewportStore.set(fn(val));
  };
  userViewportStore.update = (fn) => {
    userViewportStore.set(fn(val));
  };
};
const createNodesStore = (nodes, nodeLookup, parentLookup, nodeOrigin = [0, 0], nodeExtent = infiniteExtent) => {
  const { subscribe: subscribe2, set, update } = writable([]);
  let value = nodes;
  let defaults = {};
  let elevateNodesOnSelect = true;
  const _set = (nds) => {
    adoptUserNodes(nds, nodeLookup, parentLookup, {
      elevateNodesOnSelect,
      nodeOrigin,
      nodeExtent,
      defaults,
      checkEquality: false
    });
    value = nds;
    set(value);
    return value;
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  const setOptions = (options) => {
    elevateNodesOnSelect = options.elevateNodesOnSelect ?? elevateNodesOnSelect;
  };
  _set(value);
  return {
    subscribe: subscribe2,
    set: _set,
    update: _update,
    setDefaultOptions,
    setOptions
  };
};
const createEdgesStore = (edges, connectionLookup, edgeLookup, defaultOptions) => {
  const { subscribe: subscribe2, set, update } = writable([]);
  let value = edges;
  let defaults = {};
  const _set = (eds) => {
    const nextEdges = defaults ? eds.map((edge) => ({ ...defaults, ...edge })) : eds;
    updateConnectionLookup(connectionLookup, edgeLookup, nextEdges);
    value = nextEdges;
    set(value);
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  _set(value);
  return {
    subscribe: subscribe2,
    set: _set,
    update: _update,
    setDefaultOptions
  };
};
const initialNodeTypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
  group: GroupNode
};
const initialEdgeTypes = {
  straight: StraightEdgeInternal,
  smoothstep: SmoothStepEdgeInternal,
  default: BezierEdgeInternal,
  step: StepEdgeInternal
};
const getInitialStore = ({ nodes = [], edges = [], width, height, fitView: fitView2, nodeOrigin, nodeExtent }) => {
  const nodeLookup = /* @__PURE__ */ new Map();
  const parentLookup = /* @__PURE__ */ new Map();
  const connectionLookup = /* @__PURE__ */ new Map();
  const edgeLookup = /* @__PURE__ */ new Map();
  const storeNodeOrigin = nodeOrigin ?? [0, 0];
  const storeNodeExtent = nodeExtent ?? infiniteExtent;
  adoptUserNodes(nodes, nodeLookup, parentLookup, {
    nodeExtent: storeNodeExtent,
    nodeOrigin: storeNodeOrigin,
    elevateNodesOnSelect: false,
    checkEquality: false
  });
  updateConnectionLookup(connectionLookup, edgeLookup, edges);
  let viewport = { x: 0, y: 0, zoom: 1 };
  if (fitView2 && width && height) {
    const bounds = getInternalNodesBounds(nodeLookup, {
      filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight))
    });
    viewport = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
  }
  return {
    flowId: writable(null),
    nodes: createNodesStore(nodes, nodeLookup, parentLookup, storeNodeOrigin, storeNodeExtent),
    nodeLookup: readable(nodeLookup),
    parentLookup: readable(parentLookup),
    edgeLookup: readable(edgeLookup),
    visibleNodes: readable([]),
    edges: createEdgesStore(edges, connectionLookup, edgeLookup),
    visibleEdges: readable([]),
    connectionLookup: readable(connectionLookup),
    height: writable(500),
    width: writable(500),
    minZoom: writable(0.5),
    maxZoom: writable(2),
    nodeOrigin: writable(storeNodeOrigin),
    nodeDragThreshold: writable(1),
    nodeExtent: writable(storeNodeExtent),
    translateExtent: writable(infiniteExtent),
    autoPanOnNodeDrag: writable(true),
    autoPanOnConnect: writable(true),
    fitViewOnInit: writable(false),
    fitViewOnInitDone: writable(false),
    fitViewOptions: writable(void 0),
    panZoom: writable(null),
    snapGrid: writable(null),
    dragging: writable(false),
    selectionRect: writable(null),
    selectionKeyPressed: writable(false),
    multiselectionKeyPressed: writable(false),
    deleteKeyPressed: writable(false),
    panActivationKeyPressed: writable(false),
    zoomActivationKeyPressed: writable(false),
    selectionRectMode: writable(null),
    selectionMode: writable(SelectionMode.Partial),
    nodeTypes: writable(initialNodeTypes),
    edgeTypes: writable(initialEdgeTypes),
    viewport: writable(viewport),
    connectionMode: writable(ConnectionMode.Strict),
    domNode: writable(null),
    connection: readable(initialConnection),
    connectionLineType: writable(ConnectionLineType.Bezier),
    connectionRadius: writable(20),
    isValidConnection: writable(() => true),
    nodesDraggable: writable(true),
    nodesConnectable: writable(true),
    elementsSelectable: writable(true),
    selectNodesOnDrag: writable(true),
    markers: readable([]),
    defaultMarkerColor: writable("#b1b1b7"),
    lib: readable("svelte"),
    onlyRenderVisibleElements: writable(false),
    onerror: writable(devWarn),
    ondelete: writable(void 0),
    onedgecreate: writable(void 0),
    onconnect: writable(void 0),
    onconnectstart: writable(void 0),
    onconnectend: writable(void 0),
    onbeforedelete: writable(void 0),
    nodesInitialized: writable(false),
    edgesInitialized: writable(false),
    viewportInitialized: writable(false),
    initialized: readable(false)
  };
};
function getVisibleEdges(store) {
  const visibleEdges = derived([
    store.edges,
    store.nodes,
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.viewport,
    store.width,
    store.height
  ], ([edges, , nodeLookup, onlyRenderVisibleElements, viewport, width, height]) => {
    const visibleEdges2 = onlyRenderVisibleElements && width && height ? edges.filter((edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      return sourceNode && targetNode && isEdgeVisible({
        sourceNode,
        targetNode,
        width,
        height,
        transform: [viewport.x, viewport.y, viewport.zoom]
      });
    }) : edges;
    return visibleEdges2;
  });
  return derived([visibleEdges, store.nodes, store.nodeLookup, store.connectionMode, store.onerror], ([visibleEdges2, , nodeLookup, connectionMode, onerror]) => {
    const layoutedEdges = visibleEdges2.reduce((res, edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      if (!sourceNode || !targetNode) {
        return res;
      }
      const edgePosition = getEdgePosition({
        id: edge.id,
        sourceNode,
        targetNode,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        connectionMode,
        onError: onerror
      });
      if (edgePosition) {
        res.push({
          ...edge,
          zIndex: getElevatedEdgeZIndex({
            selected: edge.selected,
            zIndex: edge.zIndex,
            sourceNode,
            targetNode,
            elevateOnSelect: false
          }),
          ...edgePosition
        });
      }
      return res;
    }, []);
    return layoutedEdges;
  });
}
function getVisibleNodes(store) {
  return derived([
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.width,
    store.height,
    store.viewport,
    store.nodes
  ], ([nodeLookup, onlyRenderVisibleElements, width, height, viewport]) => {
    const transform = [viewport.x, viewport.y, viewport.zoom];
    return onlyRenderVisibleElements ? getNodesInside(nodeLookup, { x: 0, y: 0, width, height }, transform, true) : Array.from(nodeLookup.values());
  });
}
const key = Symbol();
function createStore({ nodes, edges, width, height, fitView: fitViewOnCreate, nodeOrigin, nodeExtent }) {
  const store = getInitialStore({
    nodes,
    edges,
    width,
    height,
    fitView: fitViewOnCreate,
    nodeOrigin,
    nodeExtent
  });
  function setNodeTypes(nodeTypes) {
    store.nodeTypes.set({
      ...initialNodeTypes,
      ...nodeTypes
    });
  }
  function setEdgeTypes(edgeTypes) {
    store.edgeTypes.set({
      ...initialEdgeTypes,
      ...edgeTypes
    });
  }
  function addEdge$1(edgeParams) {
    const edges2 = get_store_value(store.edges);
    store.edges.set(addEdge(edgeParams, edges2));
  }
  const updateNodePositions = (nodeDragItems, dragging = false) => {
    const nodeLookup = get_store_value(store.nodeLookup);
    for (const [id, dragItem] of nodeDragItems) {
      const node = nodeLookup.get(id)?.internals.userNode;
      if (!node) {
        continue;
      }
      node.position = dragItem.position;
      node.dragging = dragging;
    }
    store.nodes.update((nds) => nds);
  };
  function updateNodeInternals$1(updates) {
    const nodeLookup = get_store_value(store.nodeLookup);
    const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, get_store_value(store.parentLookup), get_store_value(store.domNode), get_store_value(store.nodeOrigin));
    if (!updatedInternals) {
      return;
    }
    if (!get_store_value(store.fitViewOnInitDone) && get_store_value(store.fitViewOnInit)) {
      const fitViewOptions = get_store_value(store.fitViewOptions);
      const fitViewOnInitDone = fitViewSync({
        ...fitViewOptions,
        nodes: fitViewOptions?.nodes
      });
      store.fitViewOnInitDone.set(fitViewOnInitDone);
    }
    for (const change of changes) {
      const node = nodeLookup.get(change.id)?.internals.userNode;
      if (!node) {
        continue;
      }
      switch (change.type) {
        case "dimensions": {
          const measured = { ...node.measured, ...change.dimensions };
          if (change.setAttributes) {
            node.width = change.dimensions?.width ?? node.width;
            node.height = change.dimensions?.height ?? node.height;
          }
          node.measured = measured;
          break;
        }
        case "position":
          node.position = change.position ?? node.position;
          break;
      }
    }
    store.nodes.update((nds) => nds);
    if (!get_store_value(store.nodesInitialized)) {
      store.nodesInitialized.set(true);
    }
  }
  function fitView$1(options) {
    const panZoom = get_store_value(store.panZoom);
    if (!panZoom) {
      return Promise.resolve(false);
    }
    const fitViewNodes = getFitViewNodes(get_store_value(store.nodeLookup), options);
    return fitView({
      nodes: fitViewNodes,
      width: get_store_value(store.width),
      height: get_store_value(store.height),
      minZoom: get_store_value(store.minZoom),
      maxZoom: get_store_value(store.maxZoom),
      panZoom
    }, options);
  }
  function fitViewSync(options) {
    const panZoom = get_store_value(store.panZoom);
    if (!panZoom) {
      return false;
    }
    const fitViewNodes = getFitViewNodes(get_store_value(store.nodeLookup), options);
    fitView({
      nodes: fitViewNodes,
      width: get_store_value(store.width),
      height: get_store_value(store.height),
      minZoom: get_store_value(store.minZoom),
      maxZoom: get_store_value(store.maxZoom),
      panZoom
    }, options);
    return fitViewNodes.size > 0;
  }
  function zoomBy(factor, options) {
    const panZoom = get_store_value(store.panZoom);
    if (!panZoom) {
      return Promise.resolve(false);
    }
    return panZoom.scaleBy(factor, options);
  }
  function zoomIn(options) {
    return zoomBy(1.2, options);
  }
  function zoomOut(options) {
    return zoomBy(1 / 1.2, options);
  }
  function setMinZoom(minZoom) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([minZoom, get_store_value(store.maxZoom)]);
      store.minZoom.set(minZoom);
    }
  }
  function setMaxZoom(maxZoom) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([get_store_value(store.minZoom), maxZoom]);
      store.maxZoom.set(maxZoom);
    }
  }
  function setTranslateExtent(extent) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setTranslateExtent(extent);
      store.translateExtent.set(extent);
    }
  }
  function resetSelectedElements(elements) {
    let elementsChanged = false;
    elements.forEach((element) => {
      if (element.selected) {
        element.selected = false;
        elementsChanged = true;
      }
    });
    return elementsChanged;
  }
  function setPaneClickDistance(distance) {
    get_store_value(store.panZoom)?.setClickDistance(distance);
  }
  function unselectNodesAndEdges(params) {
    const resetNodes = resetSelectedElements(params?.nodes || get_store_value(store.nodes));
    if (resetNodes)
      store.nodes.set(get_store_value(store.nodes));
    const resetEdges = resetSelectedElements(params?.edges || get_store_value(store.edges));
    if (resetEdges)
      store.edges.set(get_store_value(store.edges));
  }
  store.deleteKeyPressed.subscribe(async (deleteKeyPressed) => {
    if (deleteKeyPressed) {
      const nodes2 = get_store_value(store.nodes);
      const edges2 = get_store_value(store.edges);
      const selectedNodes = nodes2.filter((node) => node.selected);
      const selectedEdges = edges2.filter((edge) => edge.selected);
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove: selectedNodes,
        edgesToRemove: selectedEdges,
        nodes: nodes2,
        edges: edges2,
        onBeforeDelete: get_store_value(store.onbeforedelete)
      });
      if (matchingNodes.length || matchingEdges.length) {
        store.nodes.update((nds) => nds.filter((node) => !matchingNodes.some((mN) => mN.id === node.id)));
        store.edges.update((eds) => eds.filter((edge) => !matchingEdges.some((mE) => mE.id === edge.id)));
        get_store_value(store.ondelete)?.({
          nodes: matchingNodes,
          edges: matchingEdges
        });
      }
    }
  });
  function addSelectedNodes(ids) {
    const isMultiSelection = get_store_value(store.multiselectionKeyPressed);
    store.nodes.update((ns) => ns.map((node) => {
      const nodeWillBeSelected = ids.includes(node.id);
      const selected = isMultiSelection ? node.selected || nodeWillBeSelected : nodeWillBeSelected;
      node.selected = selected;
      return node;
    }));
    if (!isMultiSelection) {
      store.edges.update((es) => es.map((edge) => {
        edge.selected = false;
        return edge;
      }));
    }
  }
  function addSelectedEdges(ids) {
    const isMultiSelection = get_store_value(store.multiselectionKeyPressed);
    store.edges.update((edges2) => edges2.map((edge) => {
      const edgeWillBeSelected = ids.includes(edge.id);
      const selected = isMultiSelection ? edge.selected || edgeWillBeSelected : edgeWillBeSelected;
      edge.selected = selected;
      return edge;
    }));
    if (!isMultiSelection) {
      store.nodes.update((ns) => ns.map((node) => {
        node.selected = false;
        return node;
      }));
    }
  }
  function handleNodeSelection(id) {
    const node = get_store_value(store.nodes)?.find((n) => n.id === id);
    if (!node) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    if (!node.selected) {
      addSelectedNodes([id]);
    } else if (node.selected && get_store_value(store.multiselectionKeyPressed)) {
      unselectNodesAndEdges({ nodes: [node], edges: [] });
    }
  }
  function panBy$1(delta) {
    const viewport = get_store_value(store.viewport);
    return panBy({
      delta,
      panZoom: get_store_value(store.panZoom),
      transform: [viewport.x, viewport.y, viewport.zoom],
      translateExtent: get_store_value(store.translateExtent),
      width: get_store_value(store.width),
      height: get_store_value(store.height)
    });
  }
  const _connection = writable(initialConnection);
  const updateConnection = (newConnection) => {
    _connection.set({ ...newConnection });
  };
  function cancelConnection() {
    _connection.set(initialConnection);
  }
  function reset() {
    store.fitViewOnInitDone.set(false);
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    store.snapGrid.set(null);
    store.isValidConnection.set(() => true);
    unselectNodesAndEdges();
    cancelConnection();
  }
  return {
    // state
    ...store,
    // derived state
    visibleEdges: getVisibleEdges(store),
    visibleNodes: getVisibleNodes(store),
    connection: derived([_connection, store.viewport], ([connection, viewport]) => {
      return connection.inProgress ? {
        ...connection,
        to: pointToRendererPoint(connection.to, [viewport.x, viewport.y, viewport.zoom])
      } : { ...connection };
    }),
    markers: derived([store.edges, store.defaultMarkerColor, store.flowId], ([edges2, defaultColor, id]) => createMarkerIds(edges2, { defaultColor, id })),
    initialized: (() => {
      let initialized = false;
      const initialNodesLength = get_store_value(store.nodes).length;
      const initialEdgesLength = get_store_value(store.edges).length;
      return derived([store.nodesInitialized, store.edgesInitialized, store.viewportInitialized], ([nodesInitialized, edgesInitialized, viewportInitialized]) => {
        if (initialized)
          return initialized;
        if (initialNodesLength === 0) {
          initialized = viewportInitialized;
        } else if (initialEdgesLength === 0) {
          initialized = viewportInitialized && nodesInitialized;
        } else {
          initialized = viewportInitialized && nodesInitialized && edgesInitialized;
        }
        return initialized;
      });
    })(),
    // actions
    syncNodeStores: (nodes2) => syncNodeStores(store.nodes, nodes2),
    syncEdgeStores: (edges2) => syncEdgeStores(store.edges, edges2),
    syncViewport: (viewport) => syncViewportStores(store.panZoom, store.viewport, viewport),
    setNodeTypes,
    setEdgeTypes,
    addEdge: addEdge$1,
    updateNodePositions,
    updateNodeInternals: updateNodeInternals$1,
    zoomIn,
    zoomOut,
    fitView: (options) => fitView$1(options),
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setPaneClickDistance,
    unselectNodesAndEdges,
    addSelectedNodes,
    addSelectedEdges,
    handleNodeSelection,
    panBy: panBy$1,
    updateConnection,
    cancelConnection,
    reset
  };
}
function useStore() {
  const store = getContext(key);
  if (!store) {
    throw new Error("In order to use useStore you need to wrap your component in a <SvelteFlowProvider />");
  }
  return store.getStore();
}
function createStoreContext({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent }) {
  const store = createStore({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent });
  setContext(key, {
    getStore: () => store
  });
  return store;
}
const css$7 = {
  code: ".svelte-flow__zoom.svelte-4xkw84{width:100%;height:100%;position:absolute;top:0;left:0;z-index:4}",
  map: `{"version":3,"file":"Zoom.svelte","sources":["Zoom.svelte"],"sourcesContent":["<script>import { onMount } from 'svelte';\\nimport { PanOnScrollMode } from '@xyflow/system';\\nimport { useStore } from '../../store';\\nimport zoom from '../../actions/zoom';\\nexport let initialViewport = undefined;\\nexport let onMoveStart = undefined;\\nexport let onMove = undefined;\\nexport let onMoveEnd = undefined;\\nexport let panOnScrollMode;\\nexport let preventScrolling;\\nexport let zoomOnScroll;\\nexport let zoomOnDoubleClick;\\nexport let zoomOnPinch;\\nexport let panOnDrag;\\nexport let panOnScroll;\\nexport let paneClickDistance;\\nconst { viewport, panZoom, selectionRect, minZoom, maxZoom, dragging, translateExtent, lib, panActivationKeyPressed, zoomActivationKeyPressed, viewportInitialized } = useStore();\\n$: viewPort = initialViewport || { x: 0, y: 0, zoom: 1 };\\n$: _panOnDrag = $panActivationKeyPressed || panOnDrag;\\n$: _panOnScroll = $panActivationKeyPressed || panOnScroll;\\nconst onTransformChange = (transform) => viewport.set({ x: transform[0], y: transform[1], zoom: transform[2] });\\nonMount(() => {\\n    $viewportInitialized = true;\\n});\\n<\/script>\\n\\n<div\\n  class=\\"svelte-flow__zoom\\"\\n  use:zoom={{\\n    viewport,\\n    minZoom: $minZoom,\\n    maxZoom: $maxZoom,\\n    initialViewport: viewPort,\\n    dragging,\\n    panZoom,\\n    onPanZoomStart: onMoveStart,\\n    onPanZoom: onMove,\\n    onPanZoomEnd: onMoveEnd,\\n    zoomOnScroll,\\n    zoomOnDoubleClick,\\n    zoomOnPinch,\\n    panOnScroll: _panOnScroll,\\n    panOnDrag: _panOnDrag,\\n    panOnScrollSpeed: 0.5,\\n    panOnScrollMode: panOnScrollMode || PanOnScrollMode.Free,\\n    zoomActivationKeyPressed: $zoomActivationKeyPressed,\\n    preventScrolling: typeof preventScrolling === 'boolean' ? preventScrolling : true,\\n    noPanClassName: 'nopan',\\n    noWheelClassName: 'nowheel',\\n    userSelectionActive: !!$selectionRect,\\n    translateExtent: $translateExtent,\\n    lib: $lib,\\n    paneClickDistance,\\n    onTransformChange\\n  }}\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__zoom {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 4;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4DE,gCAAmB,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,CACX"}`
};
const Zoom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_viewportInitialized;
  let $$unsubscribe_panActivationKeyPressed;
  let $$unsubscribe_minZoom;
  let $$unsubscribe_maxZoom;
  let $$unsubscribe_zoomActivationKeyPressed;
  let $$unsubscribe_selectionRect;
  let $$unsubscribe_translateExtent;
  let $$unsubscribe_lib;
  let { initialViewport = void 0 } = $$props;
  let { onMoveStart = void 0 } = $$props;
  let { onMove = void 0 } = $$props;
  let { onMoveEnd = void 0 } = $$props;
  let { panOnScrollMode } = $$props;
  let { preventScrolling } = $$props;
  let { zoomOnScroll } = $$props;
  let { zoomOnDoubleClick } = $$props;
  let { zoomOnPinch } = $$props;
  let { panOnDrag } = $$props;
  let { panOnScroll } = $$props;
  let { paneClickDistance } = $$props;
  const { viewport, panZoom, selectionRect, minZoom, maxZoom, dragging, translateExtent, lib, panActivationKeyPressed, zoomActivationKeyPressed, viewportInitialized } = useStore();
  $$unsubscribe_selectionRect = subscribe(selectionRect, (value) => value);
  $$unsubscribe_minZoom = subscribe(minZoom, (value) => value);
  $$unsubscribe_maxZoom = subscribe(maxZoom, (value) => value);
  $$unsubscribe_translateExtent = subscribe(translateExtent, (value) => value);
  $$unsubscribe_lib = subscribe(lib, (value) => value);
  $$unsubscribe_panActivationKeyPressed = subscribe(panActivationKeyPressed, (value) => value);
  $$unsubscribe_zoomActivationKeyPressed = subscribe(zoomActivationKeyPressed, (value) => value);
  $$unsubscribe_viewportInitialized = subscribe(viewportInitialized, (value) => value);
  if ($$props.initialViewport === void 0 && $$bindings.initialViewport && initialViewport !== void 0) $$bindings.initialViewport(initialViewport);
  if ($$props.onMoveStart === void 0 && $$bindings.onMoveStart && onMoveStart !== void 0) $$bindings.onMoveStart(onMoveStart);
  if ($$props.onMove === void 0 && $$bindings.onMove && onMove !== void 0) $$bindings.onMove(onMove);
  if ($$props.onMoveEnd === void 0 && $$bindings.onMoveEnd && onMoveEnd !== void 0) $$bindings.onMoveEnd(onMoveEnd);
  if ($$props.panOnScrollMode === void 0 && $$bindings.panOnScrollMode && panOnScrollMode !== void 0) $$bindings.panOnScrollMode(panOnScrollMode);
  if ($$props.preventScrolling === void 0 && $$bindings.preventScrolling && preventScrolling !== void 0) $$bindings.preventScrolling(preventScrolling);
  if ($$props.zoomOnScroll === void 0 && $$bindings.zoomOnScroll && zoomOnScroll !== void 0) $$bindings.zoomOnScroll(zoomOnScroll);
  if ($$props.zoomOnDoubleClick === void 0 && $$bindings.zoomOnDoubleClick && zoomOnDoubleClick !== void 0) $$bindings.zoomOnDoubleClick(zoomOnDoubleClick);
  if ($$props.zoomOnPinch === void 0 && $$bindings.zoomOnPinch && zoomOnPinch !== void 0) $$bindings.zoomOnPinch(zoomOnPinch);
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0) $$bindings.panOnDrag(panOnDrag);
  if ($$props.panOnScroll === void 0 && $$bindings.panOnScroll && panOnScroll !== void 0) $$bindings.panOnScroll(panOnScroll);
  if ($$props.paneClickDistance === void 0 && $$bindings.paneClickDistance && paneClickDistance !== void 0) $$bindings.paneClickDistance(paneClickDistance);
  $$result.css.add(css$7);
  $$unsubscribe_viewportInitialized();
  $$unsubscribe_panActivationKeyPressed();
  $$unsubscribe_minZoom();
  $$unsubscribe_maxZoom();
  $$unsubscribe_zoomActivationKeyPressed();
  $$unsubscribe_selectionRect();
  $$unsubscribe_translateExtent();
  $$unsubscribe_lib();
  return `<div class="svelte-flow__zoom svelte-4xkw84">${slots.default ? slots.default({}) : ``} </div>`;
});
const css$6 = {
  code: ".svelte-flow__pane.svelte-1esy7hx{position:absolute;top:0;left:0;width:100%;height:100%}",
  map: `{"version":3,"file":"Pane.svelte","sources":["Pane.svelte"],"sourcesContent":["<script context=\\"module\\">export function wrapHandler(handler, container) {\\n    return (event) => {\\n        if (event.target !== container) {\\n            return;\\n        }\\n        handler?.(event);\\n    };\\n}\\nexport function toggleSelected(ids) {\\n    return (item) => {\\n        const isSelected = ids.includes(item.id);\\n        if (item.selected !== isSelected) {\\n            item.selected = isSelected;\\n        }\\n        return item;\\n    };\\n}\\n<\/script>\\n\\n<script>import { createEventDispatcher } from 'svelte';\\nimport { SelectionMode, getEventPosition, getNodesInside, getConnectedEdges } from '@xyflow/system';\\nimport { useStore } from '../../store';\\nexport let panOnDrag = undefined;\\nexport let selectionOnDrag = undefined;\\nconst dispatch = createEventDispatcher();\\nconst { nodes, nodeLookup, edges, viewport, dragging, elementsSelectable, selectionRect, selectionRectMode, selectionKeyPressed, selectionMode, panActivationKeyPressed, unselectNodesAndEdges } = useStore();\\nlet container;\\nlet containerBounds = null;\\nlet selectedNodes = [];\\n$: _panOnDrag = $panActivationKeyPressed || panOnDrag;\\n$: isSelecting =\\n    $selectionKeyPressed || $selectionRect || (selectionOnDrag && _panOnDrag !== true);\\n$: hasActiveSelection = $elementsSelectable && (isSelecting || $selectionRectMode === 'user');\\n// Used to prevent click events when the user lets go of the selectionKey during a selection\\nlet selectionInProgress = false;\\nfunction onClick(event) {\\n    // We prevent click events when the user let go of the selectionKey during a selection\\n    if (selectionInProgress) {\\n        selectionInProgress = false;\\n        return;\\n    }\\n    dispatch('paneclick', { event });\\n    unselectNodesAndEdges();\\n    selectionRectMode.set(null);\\n}\\nfunction onPointerDown(event) {\\n    containerBounds = container.getBoundingClientRect();\\n    if (!elementsSelectable ||\\n        !isSelecting ||\\n        event.button !== 0 ||\\n        event.target !== container ||\\n        !containerBounds) {\\n        return;\\n    }\\n    event.target?.setPointerCapture?.(event.pointerId);\\n    const { x, y } = getEventPosition(event, containerBounds);\\n    unselectNodesAndEdges();\\n    selectionRect.set({\\n        width: 0,\\n        height: 0,\\n        startX: x,\\n        startY: y,\\n        x,\\n        y\\n    });\\n    // onSelectionStart?.(event);\\n}\\nfunction onPointerMove(event) {\\n    if (!isSelecting || !containerBounds || !$selectionRect) {\\n        return;\\n    }\\n    selectionInProgress = true;\\n    const mousePos = getEventPosition(event, containerBounds);\\n    const startX = $selectionRect.startX ?? 0;\\n    const startY = $selectionRect.startY ?? 0;\\n    const nextUserSelectRect = {\\n        ...$selectionRect,\\n        x: mousePos.x < startX ? mousePos.x : startX,\\n        y: mousePos.y < startY ? mousePos.y : startY,\\n        width: Math.abs(mousePos.x - startX),\\n        height: Math.abs(mousePos.y - startY)\\n    };\\n    const prevSelectedNodeIds = selectedNodes.map((n) => n.id);\\n    const prevSelectedEdgeIds = getConnectedEdges(selectedNodes, $edges).map((e) => e.id);\\n    selectedNodes = getNodesInside($nodeLookup, nextUserSelectRect, [$viewport.x, $viewport.y, $viewport.zoom], $selectionMode === SelectionMode.Partial, true);\\n    const selectedEdgeIds = getConnectedEdges(selectedNodes, $edges).map((e) => e.id);\\n    const selectedNodeIds = selectedNodes.map((n) => n.id);\\n    // this prevents unnecessary updates while updating the selection rectangle\\n    if (prevSelectedNodeIds.length !== selectedNodeIds.length ||\\n        selectedNodeIds.some((id) => !prevSelectedNodeIds.includes(id))) {\\n        nodes.update((nodes) => nodes.map(toggleSelected(selectedNodeIds)));\\n    }\\n    if (prevSelectedEdgeIds.length !== selectedEdgeIds.length ||\\n        selectedEdgeIds.some((id) => !prevSelectedEdgeIds.includes(id))) {\\n        edges.update((edges) => edges.map(toggleSelected(selectedEdgeIds)));\\n    }\\n    selectionRectMode.set('user');\\n    selectionRect.set(nextUserSelectRect);\\n}\\nfunction onPointerUp(event) {\\n    if (event.button !== 0) {\\n        return;\\n    }\\n    event.target?.releasePointerCapture?.(event.pointerId);\\n    // We only want to trigger click functions when in selection mode if\\n    // the user did not move the mouse.\\n    if (!isSelecting && $selectionRectMode === 'user' && event.target === container) {\\n        onClick?.(event);\\n    }\\n    selectionRect.set(null);\\n    if (selectedNodes.length > 0) {\\n        $selectionRectMode = 'nodes';\\n    }\\n    // If the user kept holding the selectionKey during the selection,\\n    // we need to reset the selectionInProgress, so the next click event is not prevented\\n    if ($selectionKeyPressed) {\\n        selectionInProgress = false;\\n    }\\n    // onSelectionEnd?.(event);\\n}\\nconst onContextMenu = (event) => {\\n    if (Array.isArray(_panOnDrag) && _panOnDrag?.includes(2)) {\\n        event.preventDefault();\\n        return;\\n    }\\n    dispatch('panecontextmenu', { event });\\n};\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div\\n  bind:this={container}\\n  class=\\"svelte-flow__pane\\"\\n  class:draggable={panOnDrag === true || (Array.isArray(panOnDrag) && panOnDrag.includes(0))}\\n  class:dragging={$dragging}\\n  class:selection={isSelecting}\\n  on:click={hasActiveSelection ? undefined : wrapHandler(onClick, container)}\\n  on:pointerdown={hasActiveSelection ? onPointerDown : undefined}\\n  on:pointermove={hasActiveSelection ? onPointerMove : undefined}\\n  on:pointerup={hasActiveSelection ? onPointerUp : undefined}\\n  on:contextmenu={wrapHandler(onContextMenu, container)}\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__pane {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmJE,iCAAmB,CACjB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}`
};
const Pane = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _panOnDrag;
  let isSelecting;
  let $selectionKeyPressed, $$unsubscribe_selectionKeyPressed;
  let $$unsubscribe_selectionRectMode;
  let $$unsubscribe_edges;
  let $$unsubscribe_selectionMode;
  let $$unsubscribe_viewport;
  let $$unsubscribe_nodeLookup;
  let $selectionRect, $$unsubscribe_selectionRect;
  let $$unsubscribe_elementsSelectable;
  let $panActivationKeyPressed, $$unsubscribe_panActivationKeyPressed;
  let $dragging, $$unsubscribe_dragging;
  let { panOnDrag = void 0 } = $$props;
  let { selectionOnDrag = void 0 } = $$props;
  createEventDispatcher();
  const { nodes, nodeLookup, edges, viewport, dragging, elementsSelectable, selectionRect, selectionRectMode, selectionKeyPressed, selectionMode, panActivationKeyPressed, unselectNodesAndEdges } = useStore();
  $$unsubscribe_nodeLookup = subscribe(nodeLookup, (value) => value);
  $$unsubscribe_edges = subscribe(edges, (value) => value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => value);
  $$unsubscribe_dragging = subscribe(dragging, (value) => $dragging = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => value);
  $$unsubscribe_selectionRect = subscribe(selectionRect, (value) => $selectionRect = value);
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => value);
  $$unsubscribe_selectionKeyPressed = subscribe(selectionKeyPressed, (value) => $selectionKeyPressed = value);
  $$unsubscribe_selectionMode = subscribe(selectionMode, (value) => value);
  $$unsubscribe_panActivationKeyPressed = subscribe(panActivationKeyPressed, (value) => $panActivationKeyPressed = value);
  let container;
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0) $$bindings.panOnDrag(panOnDrag);
  if ($$props.selectionOnDrag === void 0 && $$bindings.selectionOnDrag && selectionOnDrag !== void 0) $$bindings.selectionOnDrag(selectionOnDrag);
  $$result.css.add(css$6);
  _panOnDrag = $panActivationKeyPressed || panOnDrag;
  isSelecting = $selectionKeyPressed || $selectionRect || selectionOnDrag && _panOnDrag !== true;
  $$unsubscribe_selectionKeyPressed();
  $$unsubscribe_selectionRectMode();
  $$unsubscribe_edges();
  $$unsubscribe_selectionMode();
  $$unsubscribe_viewport();
  $$unsubscribe_nodeLookup();
  $$unsubscribe_selectionRect();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_panActivationKeyPressed();
  $$unsubscribe_dragging();
  return `  <div class="${[
    "svelte-flow__pane svelte-1esy7hx",
    (panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0) ? "draggable" : "") + " " + ($dragging ? "dragging" : "") + " " + (isSelecting ? "selection" : "")
  ].join(" ").trim()}"${add_attribute("this", container, 0)}>${slots.default ? slots.default({}) : ``} </div>`;
});
const css$5 = {
  code: ".svelte-flow__viewport.svelte-1floaup{width:100%;height:100%;position:absolute;top:0;left:0}",
  map: `{"version":3,"file":"Viewport.svelte","sources":["Viewport.svelte"],"sourcesContent":["<script>import { useStore } from '../../store';\\nconst { viewport } = useStore();\\n<\/script>\\n\\n<div\\n  class=\\"svelte-flow__viewport xyflow__viewport\\"\\n  style=\\"transform: translate({$viewport.x}px, {$viewport.y}px) scale({$viewport.zoom})\\"\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__viewport {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAYE,qCAAuB,CACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}`
};
const Viewport = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $viewport, $$unsubscribe_viewport;
  const { viewport } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$result.css.add(css$5);
  $$unsubscribe_viewport();
  return `<div class="svelte-flow__viewport xyflow__viewport svelte-1floaup" style="${"transform: translate(" + escape($viewport.x, true) + "px, " + escape($viewport.y, true) + "px) scale(" + escape($viewport.zoom, true) + ")"}">${slots.default ? slots.default({}) : ``} </div>`;
});
function getNodeInlineStyleDimensions({ width, height, initialWidth, initialHeight, measuredWidth, measuredHeight }) {
  if (measuredWidth === void 0 && measuredHeight === void 0) {
    const styleWidth = width ?? initialWidth;
    const styleHeight = height ?? initialHeight;
    return {
      width: styleWidth ? `width:${styleWidth}px;` : "",
      height: styleHeight ? `height:${styleHeight}px;` : ""
    };
  }
  return {
    width: width ? `width:${width}px;` : "",
    height: height ? `height:${height}px;` : ""
  };
}
const NodeWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let nodeType;
  let nodeTypeValid;
  let nodeComponent;
  let inlineStyleDimensions;
  let $nodeTypes, $$unsubscribe_nodeTypes;
  let $connectableStore, $$unsubscribe_connectableStore;
  let { node } = $$props;
  let { id } = $$props;
  let { data = {} } = $$props;
  let { selected = false } = $$props;
  let { draggable = void 0 } = $$props;
  let { selectable = void 0 } = $$props;
  let { connectable = true } = $$props;
  let { deletable = true } = $$props;
  let { hidden = false } = $$props;
  let { dragging = false } = $$props;
  let { resizeObserver = null } = $$props;
  let { style = void 0 } = $$props;
  let { type = "default" } = $$props;
  let { isParent = false } = $$props;
  let { positionX } = $$props;
  let { positionY } = $$props;
  let { sourcePosition = void 0 } = $$props;
  let { targetPosition = void 0 } = $$props;
  let { zIndex } = $$props;
  let { measuredWidth = void 0 } = $$props;
  let { measuredHeight = void 0 } = $$props;
  let { initialWidth = void 0 } = $$props;
  let { initialHeight = void 0 } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { initialized = false } = $$props;
  let { parentId = void 0 } = $$props;
  let { nodeClickDistance = void 0 } = $$props;
  let { class: className = "" } = $$props;
  const store = useStore();
  const { nodeTypes, nodeDragThreshold, selectNodesOnDrag, handleNodeSelection, updateNodeInternals: updateNodeInternals2 } = store;
  $$unsubscribe_nodeTypes = subscribe(nodeTypes, (value) => $nodeTypes = value);
  let nodeRef;
  let prevNodeRef = null;
  createEventDispatcher();
  const connectableStore = writable(connectable);
  $$unsubscribe_connectableStore = subscribe(connectableStore, (value) => $connectableStore = value);
  let prevType = void 0;
  let prevSourcePosition = void 0;
  let prevTargetPosition = void 0;
  setContext("svelteflow__node_id", id);
  setContext("svelteflow__node_connectable", connectableStore);
  onDestroy(() => {
    if (prevNodeRef) {
      resizeObserver?.unobserve(prevNodeRef);
    }
  });
  if ($$props.node === void 0 && $$bindings.node && node !== void 0) $$bindings.node(node);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0) $$bindings.draggable(draggable);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0) $$bindings.selectable(selectable);
  if ($$props.connectable === void 0 && $$bindings.connectable && connectable !== void 0) $$bindings.connectable(connectable);
  if ($$props.deletable === void 0 && $$bindings.deletable && deletable !== void 0) $$bindings.deletable(deletable);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0) $$bindings.dragging(dragging);
  if ($$props.resizeObserver === void 0 && $$bindings.resizeObserver && resizeObserver !== void 0) $$bindings.resizeObserver(resizeObserver);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.isParent === void 0 && $$bindings.isParent && isParent !== void 0) $$bindings.isParent(isParent);
  if ($$props.positionX === void 0 && $$bindings.positionX && positionX !== void 0) $$bindings.positionX(positionX);
  if ($$props.positionY === void 0 && $$bindings.positionY && positionY !== void 0) $$bindings.positionY(positionY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
  if ($$props.measuredWidth === void 0 && $$bindings.measuredWidth && measuredWidth !== void 0) $$bindings.measuredWidth(measuredWidth);
  if ($$props.measuredHeight === void 0 && $$bindings.measuredHeight && measuredHeight !== void 0) $$bindings.measuredHeight(measuredHeight);
  if ($$props.initialWidth === void 0 && $$bindings.initialWidth && initialWidth !== void 0) $$bindings.initialWidth(initialWidth);
  if ($$props.initialHeight === void 0 && $$bindings.initialHeight && initialHeight !== void 0) $$bindings.initialHeight(initialHeight);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0) $$bindings.dragHandle(dragHandle);
  if ($$props.initialized === void 0 && $$bindings.initialized && initialized !== void 0) $$bindings.initialized(initialized);
  if ($$props.parentId === void 0 && $$bindings.parentId && parentId !== void 0) $$bindings.parentId(parentId);
  if ($$props.nodeClickDistance === void 0 && $$bindings.nodeClickDistance && nodeClickDistance !== void 0) $$bindings.nodeClickDistance(nodeClickDistance);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  nodeType = type || "default";
  nodeTypeValid = !!$nodeTypes[nodeType];
  nodeComponent = $nodeTypes[nodeType] || DefaultNode;
  {
    {
      if (!nodeTypeValid) {
        console.warn("003", errorMessages["error003"](type));
      }
    }
  }
  inlineStyleDimensions = getNodeInlineStyleDimensions({
    width,
    height,
    initialWidth,
    initialHeight,
    measuredWidth,
    measuredHeight
  });
  {
    {
      connectableStore.set(!!connectable);
    }
  }
  {
    {
      const doUpdate = prevType && nodeType !== prevType || prevSourcePosition && sourcePosition !== prevSourcePosition || prevTargetPosition && targetPosition !== prevTargetPosition;
      if (doUpdate) {
        requestAnimationFrame(() => updateNodeInternals2(/* @__PURE__ */ new Map([[id, { id, nodeElement: nodeRef, force: true }]])));
      }
      prevType = nodeType;
      prevSourcePosition = sourcePosition;
      prevTargetPosition = targetPosition;
    }
  }
  {
    {
      if (resizeObserver && (nodeRef !== prevNodeRef || !initialized)) {
        prevNodeRef && resizeObserver.unobserve(prevNodeRef);
        prevNodeRef = nodeRef;
      }
    }
  }
  $$unsubscribe_nodeTypes();
  $$unsubscribe_connectableStore();
  return `    ${!hidden ? `<div${add_attribute("data-id", id, 0)} class="${[
    escape(cc(["svelte-flow__node", `svelte-flow__node-${nodeType}`, className]), true),
    (dragging ? "dragging" : "") + " " + (selected ? "selected" : "") + " " + (draggable ? "draggable" : "") + " " + (connectable ? "connectable" : "") + " " + (selectable ? "selectable" : "") + " " + (draggable ? "nopan" : "") + " " + (isParent ? "parent" : "")
  ].join(" ").trim()}"${add_styles(merge_ssr_styles(escape(style ?? "", true) + ";" + escape(inlineStyleDimensions.width, true) + escape(inlineStyleDimensions.height, true), {
    "z-index": zIndex,
    "transform": `translate(${positionX}px, ${positionY}px)`,
    "visibility": initialized ? "visible" : "hidden"
  }))}${add_attribute("this", nodeRef, 0)}>${validate_component(nodeComponent || missing_component, "svelte:component").$$render(
    $$result,
    {
      data,
      id,
      selected,
      selectable,
      deletable,
      sourcePosition,
      targetPosition,
      zIndex,
      dragging,
      draggable,
      dragHandle,
      parentId,
      type: nodeType,
      isConnectable: $connectableStore,
      positionAbsoluteX: positionX,
      positionAbsoluteY: positionY,
      width,
      height
    },
    {},
    {}
  )}</div>` : ``}`;
});
const css$4 = {
  code: ".svelte-flow__nodes.svelte-tf4uy4{width:100%;height:100%;position:absolute;left:0;top:0}",
  map: `{"version":3,"file":"NodeRenderer.svelte","sources":["NodeRenderer.svelte"],"sourcesContent":["<script>import { onDestroy } from 'svelte';\\nimport { nodeHasDimensions } from '@xyflow/system';\\nimport { NodeWrapper } from '../../components/NodeWrapper';\\nimport { useStore } from '../../store';\\nexport let nodeClickDistance = 0;\\nconst { visibleNodes, nodesDraggable, nodesConnectable, elementsSelectable, updateNodeInternals, parentLookup } = useStore();\\nconst resizeObserver = typeof ResizeObserver === 'undefined'\\n    ? null\\n    : new ResizeObserver((entries) => {\\n        const updates = new Map();\\n        entries.forEach((entry) => {\\n            const id = entry.target.getAttribute('data-id');\\n            updates.set(id, {\\n                id,\\n                nodeElement: entry.target,\\n                force: true\\n            });\\n        });\\n        updateNodeInternals(updates);\\n    });\\nonDestroy(() => {\\n    resizeObserver?.disconnect();\\n});\\n<\/script>\\n\\n<div class=\\"svelte-flow__nodes\\">\\n  {#each $visibleNodes as node (node.id)}\\n    <NodeWrapper\\n      {node}\\n      id={node.id}\\n      data={node.data}\\n      selected={!!node.selected}\\n      hidden={!!node.hidden}\\n      draggable={!!(node.draggable || ($nodesDraggable && typeof node.draggable === 'undefined'))}\\n      selectable={!!(\\n        node.selectable ||\\n        ($elementsSelectable && typeof node.selectable === 'undefined')\\n      )}\\n      connectable={!!(\\n        node.connectable ||\\n        ($nodesConnectable && typeof node.connectable === 'undefined')\\n      )}\\n      deletable={node.deletable ?? true}\\n      positionX={node.internals.positionAbsolute.x}\\n      positionY={node.internals.positionAbsolute.y}\\n      isParent={$parentLookup.has(node.id)}\\n      style={node.style}\\n      class={node.class}\\n      type={node.type ?? 'default'}\\n      sourcePosition={node.sourcePosition}\\n      targetPosition={node.targetPosition}\\n      dragging={node.dragging}\\n      zIndex={node.internals.z ?? 0}\\n      dragHandle={node.dragHandle}\\n      initialized={nodeHasDimensions(node)}\\n      width={node.width}\\n      height={node.height}\\n      initialWidth={node.initialWidth}\\n      initialHeight={node.initialHeight}\\n      measuredWidth={node.measured.width}\\n      measuredHeight={node.measured.height}\\n      parentId={node.parentId}\\n      {resizeObserver}\\n      {nodeClickDistance}\\n      on:nodeclick\\n      on:nodemouseenter\\n      on:nodemousemove\\n      on:nodemouseleave\\n      on:nodedrag\\n      on:nodedragstart\\n      on:nodedragstop\\n      on:nodecontextmenu\\n    />\\n  {/each}\\n</div>\\n\\n<style>\\n  .svelte-flow__nodes {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    left: 0;\\n    top: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6EE,iCAAoB,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CACP"}`
};
const NodeRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $visibleNodes, $$unsubscribe_visibleNodes;
  let $nodesDraggable, $$unsubscribe_nodesDraggable;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $nodesConnectable, $$unsubscribe_nodesConnectable;
  let $parentLookup, $$unsubscribe_parentLookup;
  let { nodeClickDistance = 0 } = $$props;
  const { visibleNodes, nodesDraggable, nodesConnectable, elementsSelectable, updateNodeInternals: updateNodeInternals2, parentLookup } = useStore();
  $$unsubscribe_visibleNodes = subscribe(visibleNodes, (value) => $visibleNodes = value);
  $$unsubscribe_nodesDraggable = subscribe(nodesDraggable, (value) => $nodesDraggable = value);
  $$unsubscribe_nodesConnectable = subscribe(nodesConnectable, (value) => $nodesConnectable = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  $$unsubscribe_parentLookup = subscribe(parentLookup, (value) => $parentLookup = value);
  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
    const updates = /* @__PURE__ */ new Map();
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("data-id");
      updates.set(id, {
        id,
        nodeElement: entry.target,
        force: true
      });
    });
    updateNodeInternals2(updates);
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
  if ($$props.nodeClickDistance === void 0 && $$bindings.nodeClickDistance && nodeClickDistance !== void 0) $$bindings.nodeClickDistance(nodeClickDistance);
  $$result.css.add(css$4);
  $$unsubscribe_visibleNodes();
  $$unsubscribe_nodesDraggable();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_nodesConnectable();
  $$unsubscribe_parentLookup();
  return `<div class="svelte-flow__nodes svelte-tf4uy4">${each($visibleNodes, (node) => {
    return `${validate_component(NodeWrapper, "NodeWrapper").$$render(
      $$result,
      {
        node,
        id: node.id,
        data: node.data,
        selected: !!node.selected,
        hidden: !!node.hidden,
        draggable: !!(node.draggable || $nodesDraggable && typeof node.draggable === "undefined"),
        selectable: !!(node.selectable || $elementsSelectable && typeof node.selectable === "undefined"),
        connectable: !!(node.connectable || $nodesConnectable && typeof node.connectable === "undefined"),
        deletable: node.deletable ?? true,
        positionX: node.internals.positionAbsolute.x,
        positionY: node.internals.positionAbsolute.y,
        isParent: $parentLookup.has(node.id),
        style: node.style,
        class: node.class,
        type: node.type ?? "default",
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
        dragging: node.dragging,
        zIndex: node.internals.z ?? 0,
        dragHandle: node.dragHandle,
        initialized: nodeHasDimensions(node),
        width: node.width,
        height: node.height,
        initialWidth: node.initialWidth,
        initialHeight: node.initialHeight,
        measuredWidth: node.measured.width,
        measuredHeight: node.measured.height,
        parentId: node.parentId,
        resizeObserver,
        nodeClickDistance
      },
      {},
      {}
    )}`;
  })} </div>`;
});
const EdgeWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let edgeType;
  let edgeComponent;
  let markerStartUrl;
  let markerEndUrl;
  let isSelectable;
  let $$unsubscribe_edgeLookup;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $flowId, $$unsubscribe_flowId;
  let $edgeTypes, $$unsubscribe_edgeTypes;
  let { id } = $$props;
  let { type = "default" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { data = {} } = $$props;
  let { style = void 0 } = $$props;
  let { zIndex = void 0 } = $$props;
  let { animated = false } = $$props;
  let { selected = false } = $$props;
  let { selectable = void 0 } = $$props;
  let { deletable = void 0 } = $$props;
  let { hidden = false } = $$props;
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { sourceHandle = void 0 } = $$props;
  let { targetHandle = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { sourcePosition } = $$props;
  let { targetPosition } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { class: className = "" } = $$props;
  setContext("svelteflow__edge_id", id);
  const { edgeLookup, edgeTypes, flowId, elementsSelectable } = useStore();
  $$unsubscribe_edgeLookup = subscribe(edgeLookup, (value) => value);
  $$unsubscribe_edgeTypes = subscribe(edgeTypes, (value) => $edgeTypes = value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  createEventDispatcher();
  useHandleEdgeSelect();
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0) $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0) $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0) $$bindings.selectable(selectable);
  if ($$props.deletable === void 0 && $$bindings.deletable && deletable !== void 0) $$bindings.deletable(deletable);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0) $$bindings.labelStyle(labelStyle);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0) $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0) $$bindings.markerEnd(markerEnd);
  if ($$props.sourceHandle === void 0 && $$bindings.sourceHandle && sourceHandle !== void 0) $$bindings.sourceHandle(sourceHandle);
  if ($$props.targetHandle === void 0 && $$bindings.targetHandle && targetHandle !== void 0) $$bindings.targetHandle(targetHandle);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0) $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0) $$bindings.sourceY(sourceY);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0) $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0) $$bindings.targetY(targetY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0) $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0) $$bindings.targetPosition(targetPosition);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0) $$bindings.interactionWidth(interactionWidth);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  edgeType = type || "default";
  edgeComponent = $edgeTypes[edgeType] || BezierEdgeInternal;
  markerStartUrl = markerStart ? `url('#${getMarkerId(markerStart, $flowId)}')` : void 0;
  markerEndUrl = markerEnd ? `url('#${getMarkerId(markerEnd, $flowId)}')` : void 0;
  isSelectable = selectable ?? $elementsSelectable;
  $$unsubscribe_edgeLookup();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_flowId();
  $$unsubscribe_edgeTypes();
  return `    ${!hidden ? `<svg${add_styles({ "z-index": zIndex })}><g class="${[
    escape(cc(["svelte-flow__edge", className]), true),
    (animated ? "animated" : "") + " " + (selected ? "selected" : "") + " " + (isSelectable ? "selectable" : "")
  ].join(" ").trim()}"${add_attribute("data-id", id, 0)}${add_attribute(
    "aria-label",
    ariaLabel === null ? void 0 : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`,
    0
  )} role="img">${validate_component(edgeComponent || missing_component, "svelte:component").$$render(
    $$result,
    {
      id,
      source,
      target,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      animated,
      selected,
      label,
      labelStyle,
      data,
      style,
      interactionWidth,
      selectable: isSelectable,
      deletable: deletable ?? true,
      type: edgeType,
      sourceHandleId: sourceHandle,
      targetHandleId: targetHandle,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl
    },
    {},
    {}
  )}</g></svg>` : ``}`;
});
const CallOnMount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onMount: _onMount = void 0 } = $$props;
  let { onDestroy: _onDestroy = void 0 } = $$props;
  if ($$props.onMount === void 0 && $$bindings.onMount && _onMount !== void 0) $$bindings.onMount(_onMount);
  if ($$props.onDestroy === void 0 && $$bindings.onDestroy && _onDestroy !== void 0) $$bindings.onDestroy(_onDestroy);
  return ``;
});
const MarkerDefinition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $markers, $$unsubscribe_markers;
  const { markers } = useStore();
  $$unsubscribe_markers = subscribe(markers, (value) => $markers = value);
  $$unsubscribe_markers();
  return `<defs>${each($markers, (marker) => {
    return `${validate_component(Marker, "Marker").$$render($$result, Object.assign({}, marker), {}, {})}`;
  })}</defs>`;
});
const Marker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { type } = $$props;
  let { width = 12.5 } = $$props;
  let { height = 12.5 } = $$props;
  let { markerUnits = "strokeWidth" } = $$props;
  let { orient = "auto-start-reverse" } = $$props;
  let { color = void 0 } = $$props;
  let { strokeWidth = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.markerUnits === void 0 && $$bindings.markerUnits && markerUnits !== void 0) $$bindings.markerUnits(markerUnits);
  if ($$props.orient === void 0 && $$bindings.orient && orient !== void 0) $$bindings.orient(orient);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<marker class="svelte-flow__arrowhead"${add_attribute("id", id, 0)}${add_attribute("markerWidth", `${width}`, 0)}${add_attribute("markerHeight", `${height}`, 0)} viewBox="-10 -10 20 20"${add_attribute("markerUnits", markerUnits, 0)}${add_attribute("orient", orient, 0)} refX="0" refY="0">${type === MarkerType.Arrow ? `<polyline${add_attribute("stroke", color, 0)} stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} fill="none" points="-5,-4 0,0 -5,4"></polyline>` : `${type === MarkerType.ArrowClosed ? `<polyline${add_attribute("stroke", color, 0)} stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)}${add_attribute("fill", color, 0)} points="-5,-4 0,0 -5,4 -5,-4"></polyline>` : ``}`}</marker>`;
});
const EdgeRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $visibleEdges, $$unsubscribe_visibleEdges;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $$unsubscribe_edgesInitialized;
  let { defaultEdgeOptions } = $$props;
  const { visibleEdges, edgesInitialized, edges: { setDefaultOptions }, elementsSelectable } = useStore();
  $$unsubscribe_visibleEdges = subscribe(visibleEdges, (value) => $visibleEdges = value);
  $$unsubscribe_edgesInitialized = subscribe(edgesInitialized, (value) => value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  if ($$props.defaultEdgeOptions === void 0 && $$bindings.defaultEdgeOptions && defaultEdgeOptions !== void 0) $$bindings.defaultEdgeOptions(defaultEdgeOptions);
  $$unsubscribe_visibleEdges();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_edgesInitialized();
  return `<div class="svelte-flow__edges"><svg class="svelte-flow__marker">${validate_component(MarkerDefinition, "MarkerDefinition").$$render($$result, {}, {}, {})}</svg> ${each($visibleEdges, (edge) => {
    return `${validate_component(EdgeWrapper, "EdgeWrapper").$$render(
      $$result,
      {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge.data,
        style: edge.style,
        animated: edge.animated,
        selected: edge.selected,
        selectable: edge.selectable ?? $elementsSelectable,
        deletable: edge.deletable,
        hidden: edge.hidden,
        label: edge.label,
        labelStyle: edge.labelStyle,
        markerStart: edge.markerStart,
        markerEnd: edge.markerEnd,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        sourceX: edge.sourceX,
        sourceY: edge.sourceY,
        targetX: edge.targetX,
        targetY: edge.targetY,
        sourcePosition: edge.sourcePosition,
        targetPosition: edge.targetPosition,
        ariaLabel: edge.ariaLabel,
        interactionWidth: edge.interactionWidth,
        class: edge.class,
        type: edge.type || "default",
        zIndex: edge.zIndex
      },
      {},
      {}
    )}`;
  })} ${$visibleEdges.length > 0 ? `${validate_component(CallOnMount, "CallOnMount").$$render(
    $$result,
    {
      onMount: () => {
      },
      onDestroy: () => {
      }
    },
    {},
    {}
  )}` : ``}</div>`;
});
const css$3 = {
  code: ".svelte-flow__selection.svelte-1iugwpu{position:absolute;top:0;left:0}",
  map: '{"version":3,"file":"Selection.svelte","sources":["Selection.svelte"],"sourcesContent":["<script>export let x = 0;\\nexport let y = 0;\\nexport let width = 0;\\nexport let height = 0;\\nexport let isVisible = true;\\n<\/script>\\n\\n{#if isVisible}\\n  <div\\n    class=\\"svelte-flow__selection\\"\\n    style:width={typeof width === \'string\' ? width : `${width}px`}\\n    style:height={typeof height === \'string\' ? height : `${height}px`}\\n    style:transform={`translate(${x}px, ${y}px)`}\\n  />\\n{/if}\\n\\n<style>\\n  .svelte-flow__selection {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,sCAAwB,CACtB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}'
};
const Selection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { width = 0 } = $$props;
  let { height = 0 } = $$props;
  let { isVisible = true } = $$props;
  if ($$props.x === void 0 && $$bindings.x && x !== void 0) $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0) $$bindings.y(y);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0) $$bindings.isVisible(isVisible);
  $$result.css.add(css$3);
  return `${isVisible ? `<div class="svelte-flow__selection svelte-1iugwpu"${add_styles({
    "width": typeof width === "string" ? width : `${width}px`,
    "height": typeof height === "string" ? height : `${height}px`,
    "transform": `translate(${x}px, ${y}px)`
  })}></div>` : ``}`;
});
const UserSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectionRect, $$unsubscribe_selectionRect;
  let $selectionRectMode, $$unsubscribe_selectionRectMode;
  const { selectionRect, selectionRectMode } = useStore();
  $$unsubscribe_selectionRect = subscribe(selectionRect, (value) => $selectionRect = value);
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => $selectionRectMode = value);
  $$unsubscribe_selectionRect();
  $$unsubscribe_selectionRectMode();
  return `${validate_component(Selection, "Selection").$$render(
    $$result,
    {
      isVisible: !!($selectionRect && $selectionRectMode === "user"),
      width: $selectionRect?.width,
      height: $selectionRect?.height,
      x: $selectionRect?.x,
      y: $selectionRect?.y
    },
    {},
    {}
  )}`;
});
const css$2 = {
  code: ".selection-wrapper.svelte-5pxri{position:absolute;top:0;left:0;z-index:7;pointer-events:all}",
  map: `{"version":3,"file":"NodeSelection.svelte","sources":["NodeSelection.svelte"],"sourcesContent":["<script>import { createEventDispatcher } from 'svelte';\\nimport { getInternalNodesBounds, isNumeric } from '@xyflow/system';\\nimport { useStore } from '../../store';\\nimport { Selection } from '../Selection';\\nimport drag from '../../actions/drag';\\nconst store = useStore();\\nconst { selectionRectMode, nodes, nodeLookup } = store;\\nconst dispatch = createEventDispatcher();\\nlet bounds = null;\\n$: if ($selectionRectMode === 'nodes') {\\n    bounds = getInternalNodesBounds($nodeLookup, { filter: (node) => !!node.selected });\\n    $nodes;\\n}\\nfunction onContextMenu(event) {\\n    const selectedNodes = $nodes.filter((n) => n.selected);\\n    dispatch('selectioncontextmenu', { nodes: selectedNodes, event });\\n}\\nfunction onClick(event) {\\n    const selectedNodes = $nodes.filter((n) => n.selected);\\n    dispatch('selectionclick', { nodes: selectedNodes, event });\\n}\\n<\/script>\\n\\n{#if $selectionRectMode === 'nodes' && bounds && isNumeric(bounds.x) && isNumeric(bounds.y)}\\n  <div\\n    class=\\"selection-wrapper nopan\\"\\n    style=\\"width: {bounds.width}px; height: {bounds.height}px; transform: translate({bounds.x}px, {bounds.y}px)\\"\\n    use:drag={{\\n      disabled: false,\\n      store,\\n      onDrag: (event, _, __, nodes) => {\\n        dispatch('nodedrag', { event, targetNode: null, nodes });\\n      },\\n      onDragStart: (event, _, __, nodes) => {\\n        dispatch('nodedragstart', { event, targetNode: null, nodes });\\n      },\\n      onDragStop: (event, _, __, nodes) => {\\n        dispatch('nodedragstop', { event, targetNode: null, nodes });\\n      }\\n    }}\\n    on:contextmenu={onContextMenu}\\n    on:click={onClick}\\n    role=\\"button\\"\\n    tabindex=\\"-1\\"\\n    on:keyup={() => {}}\\n  >\\n    <Selection width=\\"100%\\" height=\\"100%\\" x={0} y={0} />\\n  </div>\\n{/if}\\n\\n<style>\\n  .selection-wrapper {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 7;\\n    pointer-events: all;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmDE,+BAAmB,CACjB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,GAClB"}`
};
const NodeSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_nodes;
  let $nodeLookup, $$unsubscribe_nodeLookup;
  let $selectionRectMode, $$unsubscribe_selectionRectMode;
  const store = useStore();
  const { selectionRectMode, nodes, nodeLookup } = store;
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => $selectionRectMode = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => value);
  $$unsubscribe_nodeLookup = subscribe(nodeLookup, (value) => $nodeLookup = value);
  createEventDispatcher();
  let bounds = null;
  $$result.css.add(css$2);
  {
    if ($selectionRectMode === "nodes") {
      bounds = getInternalNodesBounds($nodeLookup, { filter: (node) => !!node.selected });
    }
  }
  $$unsubscribe_nodes();
  $$unsubscribe_nodeLookup();
  $$unsubscribe_selectionRectMode();
  return `${$selectionRectMode === "nodes" && bounds && isNumeric(bounds.x) && isNumeric(bounds.y) ? `<div class="selection-wrapper nopan svelte-5pxri" style="${"width: " + escape(bounds.width, true) + "px; height: " + escape(bounds.height, true) + "px; transform: translate(" + escape(bounds.x, true) + "px, " + escape(bounds.y, true) + "px)"}" role="button" tabindex="-1">${validate_component(Selection, "Selection").$$render(
    $$result,
    {
      width: "100%",
      height: "100%",
      x: 0,
      y: 0
    },
    {},
    {}
  )}</div>` : ``}`;
});
const KeyHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectionKey = "Shift" } = $$props;
  let { multiSelectionKey = isMacOs() ? "Meta" : "Control" } = $$props;
  let { deleteKey = "Backspace" } = $$props;
  let { panActivationKey = " " } = $$props;
  let { zoomActivationKey = isMacOs() ? "Meta" : "Control" } = $$props;
  useStore();
  if ($$props.selectionKey === void 0 && $$bindings.selectionKey && selectionKey !== void 0) $$bindings.selectionKey(selectionKey);
  if ($$props.multiSelectionKey === void 0 && $$bindings.multiSelectionKey && multiSelectionKey !== void 0) $$bindings.multiSelectionKey(multiSelectionKey);
  if ($$props.deleteKey === void 0 && $$bindings.deleteKey && deleteKey !== void 0) $$bindings.deleteKey(deleteKey);
  if ($$props.panActivationKey === void 0 && $$bindings.panActivationKey && panActivationKey !== void 0) $$bindings.panActivationKey(panActivationKey);
  if ($$props.zoomActivationKey === void 0 && $$bindings.zoomActivationKey && zoomActivationKey !== void 0) $$bindings.zoomActivationKey(zoomActivationKey);
  return ``;
});
const ConnectionLine = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connectionLineType, $$unsubscribe_connectionLineType;
  let $connection, $$unsubscribe_connection;
  let $width, $$unsubscribe_width;
  let $height, $$unsubscribe_height;
  let { containerStyle = "" } = $$props;
  let { style = "" } = $$props;
  let { isCustomComponent = false } = $$props;
  const { width, height, connection, connectionLineType } = useStore();
  $$unsubscribe_width = subscribe(width, (value) => $width = value);
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  $$unsubscribe_connection = subscribe(connection, (value) => $connection = value);
  $$unsubscribe_connectionLineType = subscribe(connectionLineType, (value) => $connectionLineType = value);
  let path = null;
  if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0) $$bindings.containerStyle(containerStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.isCustomComponent === void 0 && $$bindings.isCustomComponent && isCustomComponent !== void 0) $$bindings.isCustomComponent(isCustomComponent);
  {
    if ($connection.inProgress && !isCustomComponent) {
      const { from, to, fromPosition, toPosition } = $connection;
      const pathParams = {
        sourceX: from.x,
        sourceY: from.y,
        sourcePosition: fromPosition,
        targetX: to.x,
        targetY: to.y,
        targetPosition: toPosition
      };
      switch ($connectionLineType) {
        case ConnectionLineType.Bezier:
          [path] = getBezierPath(pathParams);
          break;
        case ConnectionLineType.Step:
          [path] = getSmoothStepPath({ ...pathParams, borderRadius: 0 });
          break;
        case ConnectionLineType.SmoothStep:
          [path] = getSmoothStepPath(pathParams);
          break;
        default:
          [path] = getStraightPath(pathParams);
      }
    }
  }
  $$unsubscribe_connectionLineType();
  $$unsubscribe_connection();
  $$unsubscribe_width();
  $$unsubscribe_height();
  return `${$connection.inProgress ? `<svg${add_attribute("width", $width, 0)}${add_attribute("height", $height, 0)} class="svelte-flow__connectionline"${add_attribute("style", containerStyle, 0)}><g${add_attribute("class", cc(["svelte-flow__connection", getConnectionStatus($connection.isValid)]), 0)}>${slots.connectionLine ? slots.connectionLine({}) : ``}${!isCustomComponent ? `<path${add_attribute("d", path, 0)}${add_attribute("style", style, 0)} fill="none" class="svelte-flow__connection-path"></path>` : ``}</g></svg>` : ``}`;
});
const Panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let positionClasses;
  let $$restProps = compute_rest_props($$props, ["position", "style", "class"]);
  let $selectionRectMode, $$unsubscribe_selectionRectMode;
  let { position = "top-right" } = $$props;
  let { style = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const { selectionRectMode } = useStore();
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => $selectionRectMode = value);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  positionClasses = `${position}`.split("-");
  $$unsubscribe_selectionRectMode();
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cc(["svelte-flow__panel", className, ...positionClasses]))
      },
      { style: escape_attribute_value(style) },
      escape_object($$restProps)
    ],
    {
      styles: {
        "pointer-events": $selectionRectMode ? "none" : ""
      }
    }
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Attribution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { proOptions = void 0 } = $$props;
  let { position = "bottom-right" } = $$props;
  if ($$props.proOptions === void 0 && $$bindings.proOptions && proOptions !== void 0) $$bindings.proOptions(proOptions);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  return `${!proOptions?.hideAttribution ? `${validate_component(Panel, "Panel").$$render(
    $$result,
    {
      position,
      class: "svelte-flow__attribution",
      "data-message": "Feel free to remove the attribution or check out how you could support us: https://svelteflow.dev/support-us"
    },
    {},
    {
      default: () => {
        return `<a href="https://svelteflow.dev" target="_blank" rel="noopener noreferrer" aria-label="Svelte Flow attribution" data-svelte-h="svelte-2vm8e4">Svelte Flow</a>`;
      }
    }
  )}` : ``}`;
});
function updateStore(store, { nodeTypes, edgeTypes, minZoom, maxZoom, translateExtent, paneClickDistance }) {
  if (nodeTypes !== void 0) {
    store.setNodeTypes(nodeTypes);
  }
  if (edgeTypes !== void 0) {
    store.setEdgeTypes(edgeTypes);
  }
  if (minZoom !== void 0) {
    store.setMinZoom(minZoom);
  }
  if (maxZoom !== void 0) {
    store.setMaxZoom(maxZoom);
  }
  if (translateExtent !== void 0) {
    store.setTranslateExtent(translateExtent);
  }
  if (paneClickDistance !== void 0) {
    store.setPaneClickDistance(paneClickDistance);
  }
}
const getKeys = (obj) => Object.keys(obj);
function updateStoreByKeys(store, keys) {
  getKeys(keys).forEach((prop) => {
    const update = keys[prop];
    if (update !== void 0) {
      store[prop].set(update);
    }
  });
}
function getMediaQuery() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}
function useColorModeClass(colorMode = "light") {
  const colorModeClass = readable("light", (set) => {
    if (colorMode !== "system") {
      set(colorMode);
      return;
    }
    const mediaQuery = getMediaQuery();
    const updateColorModeClass = () => set(mediaQuery?.matches ? "dark" : "light");
    set(mediaQuery?.matches ? "dark" : "light");
    mediaQuery?.addEventListener("change", updateColorModeClass);
    return () => {
      mediaQuery?.removeEventListener("change", updateColorModeClass);
    };
  });
  return colorModeClass;
}
const css$1 = {
  code: ".svelte-flow.svelte-12wlba6{width:100%;height:100%;overflow:hidden;position:relative;z-index:0;background-color:var(--background-color, var(--background-color-default))}:root{--background-color-default:#fff;--background-pattern-color-default:#ddd;--minimap-mask-color-default:rgb(240, 240, 240, 0.6);--minimap-mask-stroke-color-default:none;--minimap-mask-stroke-width-default:1;--controls-button-background-color-default:#fefefe;--controls-button-background-color-hover-default:#f4f4f4;--controls-button-color-default:inherit;--controls-button-color-hover-default:inherit;--controls-button-border-color-default:#eee}",
  map: `{"version":3,"file":"SvelteFlow.svelte","sources":["SvelteFlow.svelte"],"sourcesContent":["<script>import { onMount, hasContext } from 'svelte';\\nimport { get } from 'svelte/store';\\nimport cc from 'classcat';\\nimport { ConnectionMode, PanOnScrollMode } from '@xyflow/system';\\nimport { Zoom } from '../Zoom';\\nimport { Pane } from '../Pane';\\nimport { Viewport as ViewportComponent } from '../Viewport';\\nimport { NodeRenderer } from '../NodeRenderer';\\nimport { EdgeRenderer } from '../EdgeRenderer';\\nimport { UserSelection } from '../../components/UserSelection';\\nimport { NodeSelection } from '../../components/NodeSelection';\\nimport { KeyHandler } from '../../components/KeyHandler';\\nimport { ConnectionLine } from '../../components/ConnectionLine';\\nimport { Attribution } from '../../components/Attribution';\\nimport { key, useStore, createStoreContext } from '../../store';\\nimport { updateStore, updateStoreByKeys } from './utils';\\nimport { useColorModeClass } from '../../hooks/useColorModeClass';\\nexport let id = '1';\\nexport let nodes;\\nexport let edges;\\nexport let fitView = undefined;\\nexport let fitViewOptions = undefined;\\nexport let minZoom = undefined;\\nexport let maxZoom = undefined;\\nexport let initialViewport = undefined;\\nexport let viewport = undefined;\\nexport let nodeTypes = undefined;\\nexport let edgeTypes = undefined;\\nexport let selectionKey = undefined;\\nexport let selectionMode = undefined;\\nexport let panActivationKey = undefined;\\nexport let multiSelectionKey = undefined;\\nexport let zoomActivationKey = undefined;\\nexport let nodesDraggable = undefined;\\nexport let nodesConnectable = undefined;\\nexport let nodeDragThreshold = undefined;\\nexport let elementsSelectable = undefined;\\nexport let snapGrid = undefined;\\nexport let deleteKey = undefined;\\nexport let connectionRadius = undefined;\\nexport let connectionLineType = undefined;\\nexport let connectionMode = ConnectionMode.Strict;\\nexport let connectionLineStyle = '';\\nexport let connectionLineContainerStyle = '';\\nexport let onMoveStart = undefined;\\nexport let onMove = undefined;\\nexport let onMoveEnd = undefined;\\nexport let isValidConnection = undefined;\\nexport let translateExtent = undefined;\\nexport let nodeExtent = undefined;\\nexport let onlyRenderVisibleElements = undefined;\\nexport let panOnScrollMode = PanOnScrollMode.Free;\\nexport let preventScrolling = true;\\nexport let zoomOnScroll = true;\\nexport let zoomOnDoubleClick = true;\\nexport let zoomOnPinch = true;\\nexport let panOnScroll = false;\\nexport let panOnDrag = true;\\nexport let selectionOnDrag = undefined;\\nexport let autoPanOnConnect = true;\\nexport let autoPanOnNodeDrag = true;\\nexport let onerror = undefined;\\nexport let ondelete = undefined;\\nexport let onedgecreate = undefined;\\nexport let attributionPosition = undefined;\\nexport let proOptions = undefined;\\nexport let defaultEdgeOptions = undefined;\\nexport let width = undefined;\\nexport let height = undefined;\\nexport let colorMode = 'light';\\nexport let onconnect = undefined;\\nexport let onconnectstart = undefined;\\nexport let onconnectend = undefined;\\nexport let onbeforedelete = undefined;\\nexport let oninit = undefined;\\nexport let nodeOrigin = undefined;\\nexport let paneClickDistance = 0;\\nexport let nodeClickDistance = 0;\\nexport let defaultMarkerColor = '#b1b1b7';\\nexport let style = undefined;\\nlet className = undefined;\\nexport { className as class };\\nlet domNode;\\nlet clientWidth;\\nlet clientHeight;\\nconst initViewport = $viewport || initialViewport;\\nconst store = hasContext(key)\\n    ? useStore()\\n    : createStoreContext({\\n        nodes: get(nodes),\\n        edges: get(edges),\\n        width,\\n        height,\\n        fitView,\\n        nodeOrigin,\\n        nodeExtent\\n    });\\nonMount(() => {\\n    store.width.set(clientWidth);\\n    store.height.set(clientHeight);\\n    store.domNode.set(domNode);\\n    store.syncNodeStores(nodes);\\n    store.syncEdgeStores(edges);\\n    store.syncViewport(viewport);\\n    if (fitView !== undefined) {\\n        store.fitViewOnInit.set(fitView);\\n    }\\n    if (fitViewOptions) {\\n        store.fitViewOptions.set(fitViewOptions);\\n    }\\n    updateStore(store, {\\n        nodeTypes,\\n        edgeTypes,\\n        minZoom,\\n        maxZoom,\\n        translateExtent,\\n        paneClickDistance\\n    });\\n    return () => {\\n        store.reset();\\n    };\\n});\\n// Update width & height on resize\\n$: {\\n    if (clientWidth !== undefined && clientHeight !== undefined) {\\n        store.width.set(clientWidth);\\n        store.height.set(clientHeight);\\n    }\\n}\\n// Call oninit once when flow is intialized\\nconst { initialized } = store;\\nlet onInitCalled = false;\\n$: {\\n    if (!onInitCalled && $initialized) {\\n        oninit?.();\\n        onInitCalled = true;\\n    }\\n}\\n// this updates the store for simple changes\\n// where the prop names equals the store name\\n$: {\\n    const updatableProps = {\\n        flowId: id,\\n        connectionLineType,\\n        connectionRadius,\\n        selectionMode,\\n        snapGrid,\\n        defaultMarkerColor,\\n        nodesDraggable,\\n        nodesConnectable,\\n        elementsSelectable,\\n        onlyRenderVisibleElements,\\n        isValidConnection,\\n        autoPanOnConnect,\\n        autoPanOnNodeDrag,\\n        onerror,\\n        ondelete,\\n        onedgecreate,\\n        connectionMode,\\n        nodeDragThreshold,\\n        onconnect,\\n        onconnectstart,\\n        onconnectend,\\n        onbeforedelete,\\n        nodeOrigin\\n    };\\n    updateStoreByKeys(store, updatableProps);\\n}\\n$: updateStore(store, {\\n    nodeTypes,\\n    edgeTypes,\\n    minZoom,\\n    maxZoom,\\n    translateExtent,\\n    paneClickDistance\\n});\\n$: colorModeClass = useColorModeClass(colorMode);\\n<\/script>\\n\\n<div\\n  bind:this={domNode}\\n  bind:clientWidth\\n  bind:clientHeight\\n  {style}\\n  class={cc(['svelte-flow', className, $colorModeClass])}\\n  data-testid=\\"svelte-flow__wrapper\\"\\n  on:dragover\\n  on:drop\\n  {...$$restProps}\\n  role=\\"application\\"\\n>\\n  <KeyHandler\\n    {selectionKey}\\n    {deleteKey}\\n    {panActivationKey}\\n    {multiSelectionKey}\\n    {zoomActivationKey}\\n  />\\n  <Zoom\\n    initialViewport={initViewport}\\n    {onMoveStart}\\n    {onMove}\\n    {onMoveEnd}\\n    panOnScrollMode={panOnScrollMode === undefined ? PanOnScrollMode.Free : panOnScrollMode}\\n    preventScrolling={preventScrolling === undefined ? true : preventScrolling}\\n    zoomOnScroll={zoomOnScroll === undefined ? true : zoomOnScroll}\\n    zoomOnDoubleClick={zoomOnDoubleClick === undefined ? true : zoomOnDoubleClick}\\n    zoomOnPinch={zoomOnPinch === undefined ? true : zoomOnPinch}\\n    panOnScroll={panOnScroll === undefined ? false : panOnScroll}\\n    panOnDrag={panOnDrag === undefined ? true : panOnDrag}\\n    paneClickDistance={paneClickDistance === undefined ? 0 : paneClickDistance}\\n  >\\n    <Pane\\n      on:paneclick\\n      on:panecontextmenu\\n      panOnDrag={panOnDrag === undefined ? true : panOnDrag}\\n      {selectionOnDrag}\\n    >\\n      <ViewportComponent>\\n        <EdgeRenderer\\n          on:edgeclick\\n          on:edgecontextmenu\\n          on:edgemouseenter\\n          on:edgemouseleave\\n          {defaultEdgeOptions}\\n        />\\n        <ConnectionLine\\n          containerStyle={connectionLineContainerStyle}\\n          style={connectionLineStyle}\\n          isCustomComponent={$$slots.connectionLine}\\n        >\\n          <slot name=\\"connectionLine\\" slot=\\"connectionLine\\" />\\n        </ConnectionLine>\\n        <div class=\\"svelte-flow__edgelabel-renderer\\" />\\n        <div class=\\"svelte-flow__viewport-portal\\" />\\n        <NodeRenderer\\n          {nodeClickDistance}\\n          on:nodeclick\\n          on:nodemouseenter\\n          on:nodemousemove\\n          on:nodemouseleave\\n          on:nodedragstart\\n          on:nodedrag\\n          on:nodedragstop\\n          on:nodecontextmenu\\n        />\\n        <NodeSelection\\n          on:selectionclick\\n          on:selectioncontextmenu\\n          on:nodedragstart\\n          on:nodedrag\\n          on:nodedragstop\\n        />\\n      </ViewportComponent>\\n      <UserSelection />\\n    </Pane>\\n  </Zoom>\\n  <Attribution {proOptions} position={attributionPosition} />\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow {\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    position: relative;\\n    z-index: 0;\\n\\n    background-color: var(--background-color, var(--background-color-default));\\n  }\\n\\n  :root {\\n    --background-color-default: #fff;\\n    --background-pattern-color-default: #ddd;\\n\\n    --minimap-mask-color-default: rgb(240, 240, 240, 0.6);\\n    --minimap-mask-stroke-color-default: none;\\n    --minimap-mask-stroke-width-default: 1;\\n\\n    --controls-button-background-color-default: #fefefe;\\n    --controls-button-background-color-hover-default: #f4f4f4;\\n    --controls-button-color-default: inherit;\\n    --controls-button-color-hover-default: inherit;\\n    --controls-button-border-color-default: #eee;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsQE,2BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CAEV,gBAAgB,CAAE,IAAI,kBAAkB,CAAC,gCAAgC,CAC3E,CAEA,KAAM,CACJ,0BAA0B,CAAE,IAAI,CAChC,kCAAkC,CAAE,IAAI,CAExC,4BAA4B,CAAE,uBAAuB,CACrD,mCAAmC,CAAE,IAAI,CACzC,mCAAmC,CAAE,CAAC,CAEtC,0CAA0C,CAAE,OAAO,CACnD,gDAAgD,CAAE,OAAO,CACzD,+BAA+B,CAAE,OAAO,CACxC,qCAAqC,CAAE,OAAO,CAC9C,sCAAsC,CAAE,IAC1C"}`
};
const SvelteFlow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorModeClass;
  let $$restProps = compute_rest_props($$props, [
    "id",
    "nodes",
    "edges",
    "fitView",
    "fitViewOptions",
    "minZoom",
    "maxZoom",
    "initialViewport",
    "viewport",
    "nodeTypes",
    "edgeTypes",
    "selectionKey",
    "selectionMode",
    "panActivationKey",
    "multiSelectionKey",
    "zoomActivationKey",
    "nodesDraggable",
    "nodesConnectable",
    "nodeDragThreshold",
    "elementsSelectable",
    "snapGrid",
    "deleteKey",
    "connectionRadius",
    "connectionLineType",
    "connectionMode",
    "connectionLineStyle",
    "connectionLineContainerStyle",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "isValidConnection",
    "translateExtent",
    "nodeExtent",
    "onlyRenderVisibleElements",
    "panOnScrollMode",
    "preventScrolling",
    "zoomOnScroll",
    "zoomOnDoubleClick",
    "zoomOnPinch",
    "panOnScroll",
    "panOnDrag",
    "selectionOnDrag",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onerror",
    "ondelete",
    "onedgecreate",
    "attributionPosition",
    "proOptions",
    "defaultEdgeOptions",
    "width",
    "height",
    "colorMode",
    "onconnect",
    "onconnectstart",
    "onconnectend",
    "onbeforedelete",
    "oninit",
    "nodeOrigin",
    "paneClickDistance",
    "nodeClickDistance",
    "defaultMarkerColor",
    "style",
    "class"
  ]);
  let $$slots = compute_slots(slots);
  let $initialized, $$unsubscribe_initialized;
  let $viewport, $$unsubscribe_viewport;
  let $colorModeClass, $$unsubscribe_colorModeClass = noop, $$subscribe_colorModeClass = () => ($$unsubscribe_colorModeClass(), $$unsubscribe_colorModeClass = subscribe(colorModeClass, ($$value) => $colorModeClass = $$value), colorModeClass);
  let { id = "1" } = $$props;
  let { nodes } = $$props;
  let { edges } = $$props;
  let { fitView: fitView2 = void 0 } = $$props;
  let { fitViewOptions = void 0 } = $$props;
  let { minZoom = void 0 } = $$props;
  let { maxZoom = void 0 } = $$props;
  let { initialViewport = void 0 } = $$props;
  let { viewport = void 0 } = $$props;
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  let { nodeTypes = void 0 } = $$props;
  let { edgeTypes = void 0 } = $$props;
  let { selectionKey = void 0 } = $$props;
  let { selectionMode = void 0 } = $$props;
  let { panActivationKey = void 0 } = $$props;
  let { multiSelectionKey = void 0 } = $$props;
  let { zoomActivationKey = void 0 } = $$props;
  let { nodesDraggable = void 0 } = $$props;
  let { nodesConnectable = void 0 } = $$props;
  let { nodeDragThreshold = void 0 } = $$props;
  let { elementsSelectable = void 0 } = $$props;
  let { snapGrid = void 0 } = $$props;
  let { deleteKey = void 0 } = $$props;
  let { connectionRadius = void 0 } = $$props;
  let { connectionLineType = void 0 } = $$props;
  let { connectionMode = ConnectionMode.Strict } = $$props;
  let { connectionLineStyle = "" } = $$props;
  let { connectionLineContainerStyle = "" } = $$props;
  let { onMoveStart = void 0 } = $$props;
  let { onMove = void 0 } = $$props;
  let { onMoveEnd = void 0 } = $$props;
  let { isValidConnection = void 0 } = $$props;
  let { translateExtent = void 0 } = $$props;
  let { nodeExtent = void 0 } = $$props;
  let { onlyRenderVisibleElements = void 0 } = $$props;
  let { panOnScrollMode = PanOnScrollMode.Free } = $$props;
  let { preventScrolling = true } = $$props;
  let { zoomOnScroll = true } = $$props;
  let { zoomOnDoubleClick = true } = $$props;
  let { zoomOnPinch = true } = $$props;
  let { panOnScroll = false } = $$props;
  let { panOnDrag = true } = $$props;
  let { selectionOnDrag = void 0 } = $$props;
  let { autoPanOnConnect = true } = $$props;
  let { autoPanOnNodeDrag = true } = $$props;
  let { onerror = void 0 } = $$props;
  let { ondelete = void 0 } = $$props;
  let { onedgecreate = void 0 } = $$props;
  let { attributionPosition = void 0 } = $$props;
  let { proOptions = void 0 } = $$props;
  let { defaultEdgeOptions = void 0 } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { colorMode = "light" } = $$props;
  let { onconnect = void 0 } = $$props;
  let { onconnectstart = void 0 } = $$props;
  let { onconnectend = void 0 } = $$props;
  let { onbeforedelete = void 0 } = $$props;
  let { oninit = void 0 } = $$props;
  let { nodeOrigin = void 0 } = $$props;
  let { paneClickDistance = 0 } = $$props;
  let { nodeClickDistance = 0 } = $$props;
  let { defaultMarkerColor = "#b1b1b7" } = $$props;
  let { style = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  let domNode;
  const initViewport = $viewport || initialViewport;
  const store = hasContext(key) ? useStore() : createStoreContext({
    nodes: get_store_value(nodes),
    edges: get_store_value(edges),
    width,
    height,
    fitView: fitView2,
    nodeOrigin,
    nodeExtent
  });
  const { initialized } = store;
  $$unsubscribe_initialized = subscribe(initialized, (value) => $initialized = value);
  let onInitCalled = false;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.nodes === void 0 && $$bindings.nodes && nodes !== void 0) $$bindings.nodes(nodes);
  if ($$props.edges === void 0 && $$bindings.edges && edges !== void 0) $$bindings.edges(edges);
  if ($$props.fitView === void 0 && $$bindings.fitView && fitView2 !== void 0) $$bindings.fitView(fitView2);
  if ($$props.fitViewOptions === void 0 && $$bindings.fitViewOptions && fitViewOptions !== void 0) $$bindings.fitViewOptions(fitViewOptions);
  if ($$props.minZoom === void 0 && $$bindings.minZoom && minZoom !== void 0) $$bindings.minZoom(minZoom);
  if ($$props.maxZoom === void 0 && $$bindings.maxZoom && maxZoom !== void 0) $$bindings.maxZoom(maxZoom);
  if ($$props.initialViewport === void 0 && $$bindings.initialViewport && initialViewport !== void 0) $$bindings.initialViewport(initialViewport);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0) $$bindings.viewport(viewport);
  if ($$props.nodeTypes === void 0 && $$bindings.nodeTypes && nodeTypes !== void 0) $$bindings.nodeTypes(nodeTypes);
  if ($$props.edgeTypes === void 0 && $$bindings.edgeTypes && edgeTypes !== void 0) $$bindings.edgeTypes(edgeTypes);
  if ($$props.selectionKey === void 0 && $$bindings.selectionKey && selectionKey !== void 0) $$bindings.selectionKey(selectionKey);
  if ($$props.selectionMode === void 0 && $$bindings.selectionMode && selectionMode !== void 0) $$bindings.selectionMode(selectionMode);
  if ($$props.panActivationKey === void 0 && $$bindings.panActivationKey && panActivationKey !== void 0) $$bindings.panActivationKey(panActivationKey);
  if ($$props.multiSelectionKey === void 0 && $$bindings.multiSelectionKey && multiSelectionKey !== void 0) $$bindings.multiSelectionKey(multiSelectionKey);
  if ($$props.zoomActivationKey === void 0 && $$bindings.zoomActivationKey && zoomActivationKey !== void 0) $$bindings.zoomActivationKey(zoomActivationKey);
  if ($$props.nodesDraggable === void 0 && $$bindings.nodesDraggable && nodesDraggable !== void 0) $$bindings.nodesDraggable(nodesDraggable);
  if ($$props.nodesConnectable === void 0 && $$bindings.nodesConnectable && nodesConnectable !== void 0) $$bindings.nodesConnectable(nodesConnectable);
  if ($$props.nodeDragThreshold === void 0 && $$bindings.nodeDragThreshold && nodeDragThreshold !== void 0) $$bindings.nodeDragThreshold(nodeDragThreshold);
  if ($$props.elementsSelectable === void 0 && $$bindings.elementsSelectable && elementsSelectable !== void 0) $$bindings.elementsSelectable(elementsSelectable);
  if ($$props.snapGrid === void 0 && $$bindings.snapGrid && snapGrid !== void 0) $$bindings.snapGrid(snapGrid);
  if ($$props.deleteKey === void 0 && $$bindings.deleteKey && deleteKey !== void 0) $$bindings.deleteKey(deleteKey);
  if ($$props.connectionRadius === void 0 && $$bindings.connectionRadius && connectionRadius !== void 0) $$bindings.connectionRadius(connectionRadius);
  if ($$props.connectionLineType === void 0 && $$bindings.connectionLineType && connectionLineType !== void 0) $$bindings.connectionLineType(connectionLineType);
  if ($$props.connectionMode === void 0 && $$bindings.connectionMode && connectionMode !== void 0) $$bindings.connectionMode(connectionMode);
  if ($$props.connectionLineStyle === void 0 && $$bindings.connectionLineStyle && connectionLineStyle !== void 0) $$bindings.connectionLineStyle(connectionLineStyle);
  if ($$props.connectionLineContainerStyle === void 0 && $$bindings.connectionLineContainerStyle && connectionLineContainerStyle !== void 0) $$bindings.connectionLineContainerStyle(connectionLineContainerStyle);
  if ($$props.onMoveStart === void 0 && $$bindings.onMoveStart && onMoveStart !== void 0) $$bindings.onMoveStart(onMoveStart);
  if ($$props.onMove === void 0 && $$bindings.onMove && onMove !== void 0) $$bindings.onMove(onMove);
  if ($$props.onMoveEnd === void 0 && $$bindings.onMoveEnd && onMoveEnd !== void 0) $$bindings.onMoveEnd(onMoveEnd);
  if ($$props.isValidConnection === void 0 && $$bindings.isValidConnection && isValidConnection !== void 0) $$bindings.isValidConnection(isValidConnection);
  if ($$props.translateExtent === void 0 && $$bindings.translateExtent && translateExtent !== void 0) $$bindings.translateExtent(translateExtent);
  if ($$props.nodeExtent === void 0 && $$bindings.nodeExtent && nodeExtent !== void 0) $$bindings.nodeExtent(nodeExtent);
  if ($$props.onlyRenderVisibleElements === void 0 && $$bindings.onlyRenderVisibleElements && onlyRenderVisibleElements !== void 0) $$bindings.onlyRenderVisibleElements(onlyRenderVisibleElements);
  if ($$props.panOnScrollMode === void 0 && $$bindings.panOnScrollMode && panOnScrollMode !== void 0) $$bindings.panOnScrollMode(panOnScrollMode);
  if ($$props.preventScrolling === void 0 && $$bindings.preventScrolling && preventScrolling !== void 0) $$bindings.preventScrolling(preventScrolling);
  if ($$props.zoomOnScroll === void 0 && $$bindings.zoomOnScroll && zoomOnScroll !== void 0) $$bindings.zoomOnScroll(zoomOnScroll);
  if ($$props.zoomOnDoubleClick === void 0 && $$bindings.zoomOnDoubleClick && zoomOnDoubleClick !== void 0) $$bindings.zoomOnDoubleClick(zoomOnDoubleClick);
  if ($$props.zoomOnPinch === void 0 && $$bindings.zoomOnPinch && zoomOnPinch !== void 0) $$bindings.zoomOnPinch(zoomOnPinch);
  if ($$props.panOnScroll === void 0 && $$bindings.panOnScroll && panOnScroll !== void 0) $$bindings.panOnScroll(panOnScroll);
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0) $$bindings.panOnDrag(panOnDrag);
  if ($$props.selectionOnDrag === void 0 && $$bindings.selectionOnDrag && selectionOnDrag !== void 0) $$bindings.selectionOnDrag(selectionOnDrag);
  if ($$props.autoPanOnConnect === void 0 && $$bindings.autoPanOnConnect && autoPanOnConnect !== void 0) $$bindings.autoPanOnConnect(autoPanOnConnect);
  if ($$props.autoPanOnNodeDrag === void 0 && $$bindings.autoPanOnNodeDrag && autoPanOnNodeDrag !== void 0) $$bindings.autoPanOnNodeDrag(autoPanOnNodeDrag);
  if ($$props.onerror === void 0 && $$bindings.onerror && onerror !== void 0) $$bindings.onerror(onerror);
  if ($$props.ondelete === void 0 && $$bindings.ondelete && ondelete !== void 0) $$bindings.ondelete(ondelete);
  if ($$props.onedgecreate === void 0 && $$bindings.onedgecreate && onedgecreate !== void 0) $$bindings.onedgecreate(onedgecreate);
  if ($$props.attributionPosition === void 0 && $$bindings.attributionPosition && attributionPosition !== void 0) $$bindings.attributionPosition(attributionPosition);
  if ($$props.proOptions === void 0 && $$bindings.proOptions && proOptions !== void 0) $$bindings.proOptions(proOptions);
  if ($$props.defaultEdgeOptions === void 0 && $$bindings.defaultEdgeOptions && defaultEdgeOptions !== void 0) $$bindings.defaultEdgeOptions(defaultEdgeOptions);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.colorMode === void 0 && $$bindings.colorMode && colorMode !== void 0) $$bindings.colorMode(colorMode);
  if ($$props.onconnect === void 0 && $$bindings.onconnect && onconnect !== void 0) $$bindings.onconnect(onconnect);
  if ($$props.onconnectstart === void 0 && $$bindings.onconnectstart && onconnectstart !== void 0) $$bindings.onconnectstart(onconnectstart);
  if ($$props.onconnectend === void 0 && $$bindings.onconnectend && onconnectend !== void 0) $$bindings.onconnectend(onconnectend);
  if ($$props.onbeforedelete === void 0 && $$bindings.onbeforedelete && onbeforedelete !== void 0) $$bindings.onbeforedelete(onbeforedelete);
  if ($$props.oninit === void 0 && $$bindings.oninit && oninit !== void 0) $$bindings.oninit(oninit);
  if ($$props.nodeOrigin === void 0 && $$bindings.nodeOrigin && nodeOrigin !== void 0) $$bindings.nodeOrigin(nodeOrigin);
  if ($$props.paneClickDistance === void 0 && $$bindings.paneClickDistance && paneClickDistance !== void 0) $$bindings.paneClickDistance(paneClickDistance);
  if ($$props.nodeClickDistance === void 0 && $$bindings.nodeClickDistance && nodeClickDistance !== void 0) $$bindings.nodeClickDistance(nodeClickDistance);
  if ($$props.defaultMarkerColor === void 0 && $$bindings.defaultMarkerColor && defaultMarkerColor !== void 0) $$bindings.defaultMarkerColor(defaultMarkerColor);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$result.css.add(css$1);
  {
    {
      if (!onInitCalled && $initialized) {
        oninit?.();
        onInitCalled = true;
      }
    }
  }
  {
    {
      const updatableProps = {
        flowId: id,
        connectionLineType,
        connectionRadius,
        selectionMode,
        snapGrid,
        defaultMarkerColor,
        nodesDraggable,
        nodesConnectable,
        elementsSelectable,
        onlyRenderVisibleElements,
        isValidConnection,
        autoPanOnConnect,
        autoPanOnNodeDrag,
        onerror,
        ondelete,
        onedgecreate,
        connectionMode,
        nodeDragThreshold,
        onconnect,
        onconnectstart,
        onconnectend,
        onbeforedelete,
        nodeOrigin
      };
      updateStoreByKeys(store, updatableProps);
    }
  }
  {
    updateStore(store, {
      nodeTypes,
      edgeTypes,
      minZoom,
      maxZoom,
      translateExtent,
      paneClickDistance
    });
  }
  $$subscribe_colorModeClass(colorModeClass = useColorModeClass(colorMode));
  $$unsubscribe_initialized();
  $$unsubscribe_viewport();
  $$unsubscribe_colorModeClass();
  return `<div${spread(
    [
      { style: escape_attribute_value(style) },
      {
        class: escape_attribute_value(cc(["svelte-flow", className, $colorModeClass]))
      },
      { "data-testid": "svelte-flow__wrapper" },
      escape_object($$restProps),
      { role: "application" }
    ],
    { classes: "svelte-12wlba6" }
  )}${add_attribute("this", domNode, 0)}>${validate_component(KeyHandler, "KeyHandler").$$render(
    $$result,
    {
      selectionKey,
      deleteKey,
      panActivationKey,
      multiSelectionKey,
      zoomActivationKey
    },
    {},
    {}
  )} ${validate_component(Zoom, "Zoom").$$render(
    $$result,
    {
      initialViewport: initViewport,
      onMoveStart,
      onMove,
      onMoveEnd,
      panOnScrollMode: panOnScrollMode === void 0 ? PanOnScrollMode.Free : panOnScrollMode,
      preventScrolling: preventScrolling === void 0 ? true : preventScrolling,
      zoomOnScroll: zoomOnScroll === void 0 ? true : zoomOnScroll,
      zoomOnDoubleClick: zoomOnDoubleClick === void 0 ? true : zoomOnDoubleClick,
      zoomOnPinch: zoomOnPinch === void 0 ? true : zoomOnPinch,
      panOnScroll: panOnScroll === void 0 ? false : panOnScroll,
      panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
      paneClickDistance: paneClickDistance === void 0 ? 0 : paneClickDistance
    },
    {},
    {
      default: () => {
        return `${validate_component(Pane, "Pane").$$render(
          $$result,
          {
            panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
            selectionOnDrag
          },
          {},
          {
            default: () => {
              return `${validate_component(Viewport, "ViewportComponent").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(EdgeRenderer, "EdgeRenderer").$$render($$result, { defaultEdgeOptions }, {}, {})} ${validate_component(ConnectionLine, "ConnectionLine").$$render(
                    $$result,
                    {
                      containerStyle: connectionLineContainerStyle,
                      style: connectionLineStyle,
                      isCustomComponent: $$slots.connectionLine
                    },
                    {},
                    {
                      connectionLine: () => {
                        return `${slots.connectionLine ? slots.connectionLine({ slot: "connectionLine" }) : ``}`;
                      }
                    }
                  )} <div class="svelte-flow__edgelabel-renderer"></div> <div class="svelte-flow__viewport-portal"></div> ${validate_component(NodeRenderer, "NodeRenderer").$$render($$result, { nodeClickDistance }, {}, {})} ${validate_component(NodeSelection, "NodeSelection").$$render($$result, {}, {}, {})}`;
                }
              })} ${validate_component(UserSelection, "UserSelection").$$render($$result, {}, {}, {})}`;
            }
          }
        )}`;
      }
    }
  )} ${validate_component(Attribution, "Attribution").$$render(
    $$result,
    {
      proOptions,
      position: attributionPosition
    },
    {},
    {}
  )} ${slots.default ? slots.default({}) : ``} </div>`;
});
const SvelteFlowProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { initialNodes = void 0 } = $$props;
  let { initialEdges = void 0 } = $$props;
  let { initialWidth = void 0 } = $$props;
  let { initialHeight = void 0 } = $$props;
  let { fitView: fitView2 = void 0 } = $$props;
  let { nodeOrigin = void 0 } = $$props;
  const store = createStore({
    nodes: initialNodes,
    edges: initialEdges,
    width: initialWidth,
    height: initialHeight,
    nodeOrigin,
    fitView: fitView2
  });
  setContext(key, { getStore: () => store });
  onDestroy(() => {
    store.reset();
  });
  if ($$props.initialNodes === void 0 && $$bindings.initialNodes && initialNodes !== void 0) $$bindings.initialNodes(initialNodes);
  if ($$props.initialEdges === void 0 && $$bindings.initialEdges && initialEdges !== void 0) $$bindings.initialEdges(initialEdges);
  if ($$props.initialWidth === void 0 && $$bindings.initialWidth && initialWidth !== void 0) $$bindings.initialWidth(initialWidth);
  if ($$props.initialHeight === void 0 && $$bindings.initialHeight && initialHeight !== void 0) $$bindings.initialHeight(initialHeight);
  if ($$props.fitView === void 0 && $$bindings.fitView && fitView2 !== void 0) $$bindings.fitView(fitView2);
  if ($$props.nodeOrigin === void 0 && $$bindings.nodeOrigin && nodeOrigin !== void 0) $$bindings.nodeOrigin(nodeOrigin);
  return `${slots.default ? slots.default({}) : ``}`;
});
const ControlButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  let bgColor = void 0;
  let bgColorHover = void 0;
  let color = void 0;
  let colorHover = void 0;
  let borderColor = void 0;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<button${spread(
    [
      { type: "button" },
      {
        class: escape_attribute_value(cc(["svelte-flow__controls-button", className]))
      },
      escape_object($$restProps)
    ],
    {
      styles: {
        "--xy-controls-button-background-color-props": bgColor,
        "--xy-controls-button-background-color-hover-props": bgColorHover,
        "--xy-controls-button-color-props": color,
        "--xy-controls-button-color-hover-props": colorHover,
        "--xy-controls-button-border-color-props": borderColor
      }
    }
  )}>${slots.default ? slots.default({ class: "button-svg" }) : ``}</button>`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path></svg>`;
});
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z"></path></svg>`;
});
const Fit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path></svg>`;
});
const Lock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path></svg>`;
});
const Unlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path></svg>`;
});
const Controls$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isInteractive;
  let minZoomReached;
  let maxZoomReached;
  let orientationClass;
  let $maxZoom, $$unsubscribe_maxZoom;
  let $viewport, $$unsubscribe_viewport;
  let $minZoom, $$unsubscribe_minZoom;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $nodesConnectable, $$unsubscribe_nodesConnectable;
  let $nodesDraggable, $$unsubscribe_nodesDraggable;
  let { position = "bottom-left" } = $$props;
  let { showZoom = true } = $$props;
  let { showFitView = true } = $$props;
  let { showLock = true } = $$props;
  let { buttonBgColor = void 0 } = $$props;
  let { buttonBgColorHover = void 0 } = $$props;
  let { buttonColor = void 0 } = $$props;
  let { buttonColorHover = void 0 } = $$props;
  let { buttonBorderColor = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { orientation = "vertical" } = $$props;
  let { fitViewOptions = void 0 } = $$props;
  let { class: className = "" } = $$props;
  const { zoomIn, zoomOut, fitView: fitView2, viewport, minZoom, maxZoom, nodesDraggable, nodesConnectable, elementsSelectable } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_minZoom = subscribe(minZoom, (value) => $minZoom = value);
  $$unsubscribe_maxZoom = subscribe(maxZoom, (value) => $maxZoom = value);
  $$unsubscribe_nodesDraggable = subscribe(nodesDraggable, (value) => $nodesDraggable = value);
  $$unsubscribe_nodesConnectable = subscribe(nodesConnectable, (value) => $nodesConnectable = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  const buttonProps = {
    bgColor: buttonBgColor,
    bgColorHover: buttonBgColorHover,
    color: buttonColor,
    colorHover: buttonColorHover,
    borderColor: buttonBorderColor
  };
  if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
  if ($$props.showZoom === void 0 && $$bindings.showZoom && showZoom !== void 0) $$bindings.showZoom(showZoom);
  if ($$props.showFitView === void 0 && $$bindings.showFitView && showFitView !== void 0) $$bindings.showFitView(showFitView);
  if ($$props.showLock === void 0 && $$bindings.showLock && showLock !== void 0) $$bindings.showLock(showLock);
  if ($$props.buttonBgColor === void 0 && $$bindings.buttonBgColor && buttonBgColor !== void 0) $$bindings.buttonBgColor(buttonBgColor);
  if ($$props.buttonBgColorHover === void 0 && $$bindings.buttonBgColorHover && buttonBgColorHover !== void 0) $$bindings.buttonBgColorHover(buttonBgColorHover);
  if ($$props.buttonColor === void 0 && $$bindings.buttonColor && buttonColor !== void 0) $$bindings.buttonColor(buttonColor);
  if ($$props.buttonColorHover === void 0 && $$bindings.buttonColorHover && buttonColorHover !== void 0) $$bindings.buttonColorHover(buttonColorHover);
  if ($$props.buttonBorderColor === void 0 && $$bindings.buttonBorderColor && buttonBorderColor !== void 0) $$bindings.buttonBorderColor(buttonBorderColor);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.fitViewOptions === void 0 && $$bindings.fitViewOptions && fitViewOptions !== void 0) $$bindings.fitViewOptions(fitViewOptions);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  isInteractive = $nodesDraggable || $nodesConnectable || $elementsSelectable;
  minZoomReached = $viewport.zoom <= $minZoom;
  maxZoomReached = $viewport.zoom >= $maxZoom;
  orientationClass = orientation === "horizontal" ? "horizontal" : "vertical";
  $$unsubscribe_maxZoom();
  $$unsubscribe_viewport();
  $$unsubscribe_minZoom();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_nodesConnectable();
  $$unsubscribe_nodesDraggable();
  return `${validate_component(Panel, "Panel").$$render(
    $$result,
    {
      class: cc(["svelte-flow__controls", orientationClass, className]),
      position,
      "data-testid": "svelte-flow__controls",
      "aria-label": ariaLabel ?? "Svelte Flow controls",
      style
    },
    {},
    {
      default: () => {
        return `${slots.before ? slots.before({}) : ``} ${showZoom ? `${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-zoomin" }, { title: "zoom in" }, { "aria-label": "zoom in" }, { disabled: maxZoomReached }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Plus, "PlusIcon").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-zoomout" }, { title: "zoom out" }, { "aria-label": "zoom out" }, { disabled: minZoomReached }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Minus, "MinusIcon").$$render($$result, {}, {}, {})}`;
          }
        })}` : ``} ${showFitView ? `${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-fitview" }, { title: "fit view" }, { "aria-label": "fit view" }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Fit, "FitViewIcon").$$render($$result, {}, {}, {})}`;
          }
        })}` : ``} ${showLock ? `${validate_component(ControlButton, "ControlButton").$$render(
          $$result,
          Object.assign(
            {},
            {
              class: "svelte-flow__controls-interactive"
            },
            { title: "toggle interactivity" },
            { "aria-label": "toggle interactivity" },
            buttonProps
          ),
          {},
          {
            default: () => {
              return `${isInteractive ? `${validate_component(Unlock, "UnlockIcon").$$render($$result, {}, {}, {})}` : `${validate_component(Lock, "LockIcon").$$render($$result, {}, {}, {})}`}`;
            }
          }
        )}` : ``} ${slots.default ? slots.default({}) : ``} ${slots.after ? slots.after({}) : ``}`;
      }
    }
  )}`;
});
var BackgroundVariant;
(function(BackgroundVariant2) {
  BackgroundVariant2["Lines"] = "lines";
  BackgroundVariant2["Dots"] = "dots";
  BackgroundVariant2["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
const DotPattern = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { radius = 5 } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.radius === void 0 && $$bindings.radius && radius !== void 0) $$bindings.radius(radius);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<circle${add_attribute("cx", radius, 0)}${add_attribute("cy", radius, 0)}${add_attribute("r", radius, 0)}${add_attribute("class", cc(["svelte-flow__background-pattern", "dots", className]), 0)}></circle>`;
});
const LinePattern = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lineWidth = 1 } = $$props;
  let { dimensions } = $$props;
  let { variant = void 0 } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.lineWidth === void 0 && $$bindings.lineWidth && lineWidth !== void 0) $$bindings.lineWidth(lineWidth);
  if ($$props.dimensions === void 0 && $$bindings.dimensions && dimensions !== void 0) $$bindings.dimensions(dimensions);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<path${add_attribute("stroke-width", lineWidth, 0)}${add_attribute("d", `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`, 0)}${add_attribute("class", cc(["svelte-flow__background-pattern", variant, className]), 0)}></path>`;
});
const css = {
  code: ".svelte-flow__background.svelte-1r7pe8d{position:absolute;width:100%;height:100%;top:0;left:0}",
  map: `{"version":3,"file":"Background.svelte","sources":["Background.svelte"],"sourcesContent":["<script labg=\\"ts\\" context=\\"module\\">\\n  const defaultSize = {\\n    [BackgroundVariant.Dots]: 1,\\n    [BackgroundVariant.Lines]: 1,\\n    [BackgroundVariant.Cross]: 6\\n  };\\n<\/script>\\n\\n<script>import cc from 'classcat';\\nimport DotPattern from './DotPattern.svelte';\\nimport LinePattern from './LinePattern.svelte';\\nimport { useStore } from '../../store';\\nimport { BackgroundVariant } from './types';\\nexport let id = undefined;\\nexport let variant = BackgroundVariant.Dots;\\nexport let gap = 20;\\nexport let size = 1;\\nexport let lineWidth = 1;\\nexport let bgColor = undefined;\\nexport let patternColor = undefined;\\nexport let patternClass = undefined;\\nlet className = '';\\nexport { className as class };\\nconst { viewport, flowId } = useStore();\\nconst patternSize = size || defaultSize[variant];\\nconst isDots = variant === BackgroundVariant.Dots;\\nconst isCross = variant === BackgroundVariant.Cross;\\nconst gapXY = Array.isArray(gap) ? gap : [gap, gap];\\n$: patternId = \`background-pattern-\${$flowId}-\${id ? id : ''}\`;\\n$: scaledGap = [gapXY[0] * $viewport.zoom || 1, gapXY[1] * $viewport.zoom || 1];\\n$: scaledSize = patternSize * $viewport.zoom;\\n$: patternDimensions = (isCross ? [scaledSize, scaledSize] : scaledGap);\\n$: patternOffset = isDots\\n    ? [scaledSize / 2, scaledSize / 2]\\n    : [patternDimensions[0] / 2, patternDimensions[1] / 2];\\n<\/script>\\n\\n<svg\\n  class={cc(['svelte-flow__background', className])}\\n  data-testid=\\"svelte-flow__background\\"\\n  style:--xy-background-color-props={bgColor}\\n  style:--xy-background-pattern-color-props={patternColor}\\n>\\n  <pattern\\n    id={patternId}\\n    x={$viewport.x % scaledGap[0]}\\n    y={$viewport.y % scaledGap[1]}\\n    width={scaledGap[0]}\\n    height={scaledGap[1]}\\n    patternUnits=\\"userSpaceOnUse\\"\\n    patternTransform={\`translate(-\${patternOffset[0]},-\${patternOffset[1]})\`}\\n  >\\n    {#if isDots}\\n      <DotPattern radius={scaledSize / 2} class={patternClass} />\\n    {:else}\\n      <LinePattern dimensions={patternDimensions} {variant} {lineWidth} class={patternClass} />\\n    {/if}\\n  </pattern>\\n  <rect x=\\"0\\" y=\\"0\\" width=\\"100%\\" height=\\"100%\\" fill={\`url(#\${patternId})\`} />\\n</svg>\\n\\n<style>\\n  .svelte-flow__background {\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8DE,uCAAyB,CACvB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}`
};
const defaultSize = {
  [BackgroundVariant.Dots]: 1,
  [BackgroundVariant.Lines]: 1,
  [BackgroundVariant.Cross]: 6
};
const Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let patternId;
  let scaledGap;
  let scaledSize;
  let patternDimensions;
  let patternOffset;
  let $viewport, $$unsubscribe_viewport;
  let $flowId, $$unsubscribe_flowId;
  let { id = void 0 } = $$props;
  let { variant = BackgroundVariant.Dots } = $$props;
  let { gap = 20 } = $$props;
  let { size = 1 } = $$props;
  let { lineWidth = 1 } = $$props;
  let { bgColor = void 0 } = $$props;
  let { patternColor = void 0 } = $$props;
  let { patternClass = void 0 } = $$props;
  let { class: className = "" } = $$props;
  const { viewport, flowId } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  const patternSize = size || defaultSize[variant];
  const isDots = variant === BackgroundVariant.Dots;
  const isCross = variant === BackgroundVariant.Cross;
  const gapXY = Array.isArray(gap) ? gap : [gap, gap];
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0) $$bindings.gap(gap);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.lineWidth === void 0 && $$bindings.lineWidth && lineWidth !== void 0) $$bindings.lineWidth(lineWidth);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
  if ($$props.patternColor === void 0 && $$bindings.patternColor && patternColor !== void 0) $$bindings.patternColor(patternColor);
  if ($$props.patternClass === void 0 && $$bindings.patternClass && patternClass !== void 0) $$bindings.patternClass(patternClass);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$result.css.add(css);
  patternId = `background-pattern-${$flowId}-${id ? id : ""}`;
  scaledGap = [gapXY[0] * $viewport.zoom || 1, gapXY[1] * $viewport.zoom || 1];
  scaledSize = patternSize * $viewport.zoom;
  patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
  patternOffset = isDots ? [scaledSize / 2, scaledSize / 2] : [patternDimensions[0] / 2, patternDimensions[1] / 2];
  $$unsubscribe_viewport();
  $$unsubscribe_flowId();
  return `<svg class="${escape(null_to_empty(cc(["svelte-flow__background", className])), true) + " svelte-1r7pe8d"}" data-testid="svelte-flow__background"${add_styles({
    "--xy-background-color-props": bgColor,
    "--xy-background-pattern-color-props": patternColor
  })}><pattern${add_attribute("id", patternId, 0)}${add_attribute("x", $viewport.x % scaledGap[0], 0)}${add_attribute("y", $viewport.y % scaledGap[1], 0)}${add_attribute("width", scaledGap[0], 0)}${add_attribute("height", scaledGap[1], 0)} patternUnits="userSpaceOnUse"${add_attribute("patternTransform", `translate(-${patternOffset[0]},-${patternOffset[1]})`, 0)}>${isDots ? `${validate_component(DotPattern, "DotPattern").$$render(
    $$result,
    {
      radius: scaledSize / 2,
      class: patternClass
    },
    {},
    {}
  )}` : `${validate_component(LinePattern, "LinePattern").$$render(
    $$result,
    {
      dimensions: patternDimensions,
      variant,
      lineWidth,
      class: patternClass
    },
    {},
    {}
  )}`}</pattern><rect x="0" y="0" width="100%" height="100%"${add_attribute("fill", `url(#${patternId})`, 0)}></rect></svg>`;
});
const isNode = (element) => isNodeBase(element);
function useSvelteFlow() {
  const { zoomIn, zoomOut, fitView: fitView2, onbeforedelete, snapGrid, viewport, width, height, minZoom, maxZoom, panZoom, nodes, edges, domNode, nodeLookup, nodeOrigin, edgeLookup, connectionLookup } = useStore();
  const getNodeRect = (node) => {
    const $nodeLookup = get_store_value(nodeLookup);
    const nodeToUse = isNode(node) ? node : $nodeLookup.get(node.id);
    const position = nodeToUse.parentId ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, $nodeLookup, get_store_value(nodeOrigin)) : nodeToUse.position;
    const nodeWithPosition = {
      id: nodeToUse.id,
      position,
      width: nodeToUse.measured?.width ?? nodeToUse.width,
      height: nodeToUse.measured?.height ?? nodeToUse.height,
      data: nodeToUse.data
    };
    return nodeToRect(nodeWithPosition);
  };
  const updateNode = (id, nodeUpdate, options = { replace: false }) => {
    const node = get_store_value(nodeLookup).get(id)?.internals.userNode;
    if (!node) {
      return;
    }
    const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
    if (options.replace) {
      nodes.update((nds) => nds.map((node2) => {
        if (node2.id === id) {
          return isNode(nextNode) ? nextNode : { ...node2, ...nextNode };
        }
        return node2;
      }));
    } else {
      Object.assign(node, nextNode);
      nodes.update((nds) => nds);
    }
  };
  const getInternalNode = (id) => get_store_value(nodeLookup).get(id);
  return {
    zoomIn,
    zoomOut,
    getInternalNode,
    getNode: (id) => getInternalNode(id)?.internals.userNode,
    getNodes: (ids) => ids === void 0 ? get_store_value(nodes) : getElements(get_store_value(nodeLookup), ids),
    getEdge: (id) => get_store_value(edgeLookup).get(id),
    getEdges: (ids) => ids === void 0 ? get_store_value(edges) : getElements(get_store_value(edgeLookup), ids),
    setZoom: (zoomLevel, options) => {
      const currentPanZoom = get_store_value(panZoom);
      return currentPanZoom ? currentPanZoom.scaleTo(zoomLevel, { duration: options?.duration }) : Promise.resolve(false);
    },
    getZoom: () => get_store_value(viewport).zoom,
    setViewport: async (nextViewport, options) => {
      const currentViewport = get_store_value(viewport);
      const currentPanZoom = get_store_value(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      await currentPanZoom.setViewport({
        x: nextViewport.x ?? currentViewport.x,
        y: nextViewport.y ?? currentViewport.y,
        zoom: nextViewport.zoom ?? currentViewport.zoom
      }, { duration: options?.duration });
      return Promise.resolve(true);
    },
    getViewport: () => get_store_value(viewport),
    setCenter: async (x, y, options) => {
      const nextZoom = typeof options?.zoom !== "undefined" ? options.zoom : get_store_value(maxZoom);
      const currentPanZoom = get_store_value(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      await currentPanZoom.setViewport({
        x: get_store_value(width) / 2 - x * nextZoom,
        y: get_store_value(height) / 2 - y * nextZoom,
        zoom: nextZoom
      }, { duration: options?.duration });
      return Promise.resolve(true);
    },
    fitView: fitView2,
    fitBounds: async (bounds, options) => {
      const currentPanZoom = get_store_value(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      const viewport2 = getViewportForBounds(bounds, get_store_value(width), get_store_value(height), get_store_value(minZoom), get_store_value(maxZoom), options?.padding ?? 0.1);
      await currentPanZoom.setViewport(viewport2, { duration: options?.duration });
      return Promise.resolve(true);
    },
    getIntersectingNodes: (nodeOrRect, partially = true, nodesToIntersect) => {
      const isRect = isRectObject(nodeOrRect);
      const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
      if (!nodeRect) {
        return [];
      }
      return (nodesToIntersect || get_store_value(nodes)).filter((n) => {
        const internalNode = get_store_value(nodeLookup).get(n.id);
        if (!internalNode || !isRect && n.id === nodeOrRect.id) {
          return false;
        }
        const currNodeRect = nodeToRect(internalNode);
        const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
        const partiallyVisible = partially && overlappingArea > 0;
        return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
      });
    },
    isNodeIntersecting: (nodeOrRect, area, partially = true) => {
      const isRect = isRectObject(nodeOrRect);
      const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
      if (!nodeRect) {
        return false;
      }
      const overlappingArea = getOverlappingArea(nodeRect, area);
      const partiallyVisible = partially && overlappingArea > 0;
      return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
    },
    deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove,
        edgesToRemove,
        nodes: get_store_value(nodes),
        edges: get_store_value(edges),
        onBeforeDelete: get_store_value(onbeforedelete)
      });
      if (matchingNodes) {
        nodes.update((nds) => nds.filter((node) => !matchingNodes.some(({ id }) => id === node.id)));
      }
      if (matchingEdges) {
        edges.update((eds) => eds.filter((edge) => !matchingEdges.some(({ id }) => id === edge.id)));
      }
      return {
        deletedNodes: matchingNodes,
        deletedEdges: matchingEdges
      };
    },
    screenToFlowPosition: (position, options = { snapToGrid: true }) => {
      const _domNode = get_store_value(domNode);
      if (!_domNode) {
        return position;
      }
      const _snapGrid = options.snapToGrid ? get_store_value(snapGrid) : false;
      const { x, y, zoom } = get_store_value(viewport);
      const { x: domX, y: domY } = _domNode.getBoundingClientRect();
      const correctedPosition = {
        x: position.x - domX,
        y: position.y - domY
      };
      return pointToRendererPoint(correctedPosition, [x, y, zoom], _snapGrid !== null, _snapGrid || [1, 1]);
    },
    /**
     *
     * @param position
     * @returns
     */
    flowToScreenPosition: (position) => {
      const _domNode = get_store_value(domNode);
      if (!_domNode) {
        return position;
      }
      const { x, y, zoom } = get_store_value(viewport);
      const { x: domX, y: domY } = _domNode.getBoundingClientRect();
      const rendererPosition = rendererPointToPoint(position, [x, y, zoom]);
      return {
        x: rendererPosition.x + domX,
        y: rendererPosition.y + domY
      };
    },
    toObject: () => {
      return {
        nodes: get_store_value(nodes).map((node) => ({
          ...node,
          // we want to make sure that changes to the nodes object that gets returned by toObject
          // do not affect the nodes object
          position: { ...node.position },
          data: { ...node.data }
        })),
        edges: get_store_value(edges).map((edge) => ({ ...edge })),
        viewport: { ...get_store_value(viewport) }
      };
    },
    updateNode,
    updateNodeData: (id, dataUpdate, options) => {
      const node = get_store_value(nodeLookup).get(id)?.internals.userNode;
      if (!node) {
        return;
      }
      const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
      node.data = options?.replace ? nextData : { ...node.data, ...nextData };
      nodes.update((nds) => nds);
    },
    getNodesBounds: (nodes2) => {
      const _nodeLookup = get_store_value(nodeLookup);
      const _nodeOrigin = get_store_value(nodeOrigin);
      return getNodesBounds(nodes2, { nodeLookup: _nodeLookup, nodeOrigin: _nodeOrigin });
    },
    getHandleConnections: ({ type, id, nodeId }) => Array.from(get_store_value(connectionLookup).get(`${nodeId}-${type}-${id ?? null}`)?.values() ?? []),
    viewport
  };
}
function getElements(lookup, ids) {
  const result = [];
  for (const id of ids) {
    const item = lookup.get(id);
    if (item) {
      const element = "internals" in item ? item.internals?.userNode : item;
      result.push(element);
    }
  }
  return result;
}
function useNodesInitialized() {
  const { nodesInitialized } = useStore();
  return {
    subscribe: nodesInitialized.subscribe
  };
}
const Valves_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tools, $$unsubscribe_tools;
  let $functions, $$unsubscribe_functions;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_tools = subscribe(tools, (value) => $tools = value);
  $$unsubscribe_functions = subscribe(functions, (value) => $functions = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  let selectedId = "";
  let loading = false;
  let valvesSpec = null;
  let valves = {};
  const getUserValves = async () => {
    loading = true;
    {
      valves = await getUserValvesById(localStorage.token, selectedId);
      valvesSpec = await getUserValvesSpecById(localStorage.token, selectedId);
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
  const init = async () => {
    loading = true;
    if ($functions === null) {
      functions.set(await getFunctions(localStorage.token));
    }
    if ($tools === null) {
      tools.set(await getTools(localStorage.token));
    }
    loading = false;
  };
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        selectedId = "";
      }
    }
    {
      if (selectedId) {
        getUserValves();
      }
    }
    {
      if (show) {
        init();
      }
    }
    $$rendered = `${show && !loading ? `<form class="flex flex-col h-full justify-between space-y-3 text-sm"><div class="flex flex-col"><div class="space-y-1"><div class="flex gap-2"><div class="flex-1"><select class="w-full rounded-sm text-xs py-2 px-1 bg-transparent outline-hidden" placeholder="Select"><option value="tools" class="bg-gray-100 dark:bg-gray-800">${escape($i18n.t("Tools"))}</option><option value="functions" class="bg-gray-100 dark:bg-gray-800">${escape($i18n.t("Functions"))}</option></select></div> <div class="flex-1"><select class="w-full rounded-sm py-2 px-1 text-xs bg-transparent outline-hidden">${`<option value="" selected disabled class="bg-gray-100 dark:bg-gray-800">${escape($i18n.t("Select a tool"))}</option> ${each($tools, (tool, toolIdx) => {
      return `<option${add_attribute("value", tool.id, 0)} class="bg-gray-100 dark:bg-gray-800">${escape(tool.name)}</option>`;
    })}`}</select></div></div></div> ${selectedId ? `<hr class="dark:border-gray-800 my-1 w-full"> <div class="my-2 text-xs">${!loading ? `${validate_component(Valves, "Valves").$$render(
      $$result,
      { valvesSpec, valves },
      {
        valves: ($$value) => {
          valves = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-5" }, {}, {})}`}</div>` : ``}</div></form>` : `${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}`}`;
  } while (!$$settled);
  $$unsubscribe_tools();
  $$unsubscribe_functions();
  $$unsubscribe_i18n();
  return $$rendered;
});
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { models: models2 = [] } = $$props;
  let { chatFiles = [] } = $$props;
  let { params = {} } = $$props;
  let showValves = false;
  if ($$props.models === void 0 && $$bindings.models && models2 !== void 0) $$bindings.models(models2);
  if ($$props.chatFiles === void 0 && $$bindings.chatFiles && chatFiles !== void 0) $$bindings.chatFiles(chatFiles);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="dark:text-white"><div class="flex items-center justify-between dark:text-gray-100 mb-2"><div class="text-lg font-medium self-center font-primary">${escape($i18n.t("Chat Controls"))}</div> <button class="self-center">${validate_component(XMark, "XMark").$$render($$result, { className: "size-3.5" }, {}, {})}</button></div> ${$user.role === "admin" || $user?.permissions.chat?.controls ? `<div class="dark:text-gray-200 text-sm font-primary py-0.5 px-0.5">${chatFiles.length > 0 ? `${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        title: $i18n.t("Files"),
        open: true,
        buttonClassName: "w-full"
      },
      {},
      {
        content: () => {
          return `<div class="flex flex-col gap-1 mt-1.5" slot="content">${each(chatFiles, (file, fileIdx) => {
            return `${validate_component(FileItem, "FileItem").$$render(
              $$result,
              {
                className: "w-full",
                item: file,
                edit: true,
                url: file?.url ? file.url : null,
                name: file.name,
                type: file.type,
                size: file?.size,
                dismissible: true
              },
              {},
              {}
            )}`;
          })}</div>`;
        }
      }
    )} <hr class="my-2 border-gray-50 dark:border-gray-700/10">` : ``} ${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        title: $i18n.t("Valves"),
        buttonClassName: "w-full",
        open: showValves
      },
      {
        open: ($$value) => {
          showValves = $$value;
          $$settled = false;
        }
      },
      {
        content: () => {
          return `<div class="text-sm" slot="content">${validate_component(Valves_1, "Valves").$$render($$result, { show: showValves }, {}, {})}</div>`;
        }
      }
    )} <hr class="my-2 border-gray-50 dark:border-gray-700/10"> ${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        title: $i18n.t("System Prompt"),
        open: true,
        buttonClassName: "w-full"
      },
      {},
      {
        content: () => {
          return `<div class="" slot="content"><textarea class="w-full text-xs py-1.5 bg-transparent outline-hidden resize-none" rows="4"${add_attribute("placeholder", $i18n.t("Enter system prompt"), 0)}>${escape(params.system || "")}</textarea></div>`;
        }
      }
    )} <hr class="my-2 border-gray-50 dark:border-gray-700/10"> ${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        title: $i18n.t("Advanced Params"),
        open: true,
        buttonClassName: "w-full"
      },
      {},
      {
        content: () => {
          return `<div class="text-sm mt-1.5" slot="content"><div>${validate_component(AdvancedParams, "AdvancedParams").$$render(
            $$result,
            { admin: $user?.role === "admin", params },
            {
              params: ($$value) => {
                params = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div>`;
        }
      }
    )}</div>` : `<div class="text-sm dark:text-gray-300 text-center py-2 px-10">${escape($i18n.t("You do not have permission to access this feature."))}</div>`}</div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_user();
  return $$rendered;
});
const VideoInputMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getContext("i18n");
  createEventDispatcher();
  let { onClose = () => {
  } } = $$props;
  let { devices } = $$props;
  let show = false;
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  if ($$props.devices === void 0 && $$bindings.devices && devices !== void 0) $$bindings.devices(devices);
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
              class: "w-full max-w-[180px] rounded-lg px-1 py-1.5 border border-gray-300/30 dark:border-gray-700/50 z-9999 bg-white dark:bg-gray-900 dark:text-white shadow-xs",
              sideOffset: 6,
              side: "top",
              align: "start",
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `${each(devices, (device) => {
                  return `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                    $$result,
                    {
                      class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    },
                    {},
                    {
                      default: () => {
                        return `<div class="flex items-center"><div class="line-clamp-1">${escape(device?.label ?? "Camera")} </div></div> `;
                      }
                    }
                  )}`;
                })}`;
              }
            }
          )}</div>`;
        },
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const CallOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_models;
  let $config, $$unsubscribe_config;
  let $settings, $$unsubscribe_settings;
  let $TTSWorker, $$unsubscribe_TTSWorker;
  let $showCallOverlay, $$unsubscribe_showCallOverlay;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_models = subscribe(models, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_TTSWorker = subscribe(TTSWorker, (value) => $TTSWorker = value);
  $$unsubscribe_showCallOverlay = subscribe(showCallOverlay, (value) => $showCallOverlay = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { eventTarget } = $$props;
  let { submitPrompt } = $$props;
  let { stopResponse } = $$props;
  let { files } = $$props;
  let { chatId: chatId2 } = $$props;
  let { modelId } = $$props;
  let loading = false;
  let confirmed = false;
  let assistantSpeaking = false;
  let emoji = null;
  let camera = false;
  let cameraStream = null;
  let chatStreaming = false;
  let rmsLevel = 0;
  let hasStartedSpeaking = false;
  let mediaRecorder;
  let audioStream = null;
  let audioChunks = [];
  let videoInputDevices = [];
  const stopVideoStream = async () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    cameraStream = null;
  };
  const takeScreenshot = () => {
    const video = document.getElementById("camera-feed");
    const canvas = document.getElementById("camera-canvas");
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    return dataURL;
  };
  const stopCamera = async () => {
    await stopVideoStream();
    camera = false;
  };
  const MIN_DECIBELS = -55;
  const transcribeHandler = async (audioBlob) => {
    await tick();
    const file = blobToFile(audioBlob, "recording.wav");
    const res = await transcribeAudio(localStorage.token, file).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    if (res) {
      console.log(res.text);
      if (res.text !== "") {
        const _responses = await submitPrompt(res.text, { _raw: true });
        console.log(_responses);
      }
    }
  };
  const stopRecordingCallback = async (_continue = true) => {
    if ($showCallOverlay) {
      console.log("%c%s", "color: red; font-size: 20px;", "🚨 stopRecordingCallback 🚨");
      const _audioChunks = audioChunks.slice(0);
      audioChunks = [];
      mediaRecorder = false;
      if (_continue) {
        startRecording();
      }
      if (confirmed) {
        loading = true;
        emoji = null;
        if (cameraStream) {
          const imageUrl = takeScreenshot();
          files = [{ type: "image", url: imageUrl }];
        }
        const audioBlob = new Blob(_audioChunks, { type: "audio/wav" });
        await transcribeHandler(audioBlob);
        confirmed = false;
        loading = false;
      }
    } else {
      audioChunks = [];
      mediaRecorder = false;
      if (audioStream) {
        const tracks = audioStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      audioStream = null;
    }
  };
  const startRecording = async () => {
    if ($showCallOverlay) {
      if (!audioStream) {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      }
      mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorder.onstart = () => {
        console.log("Recording started");
        audioChunks = [];
        analyseAudio(audioStream);
      };
      mediaRecorder.ondataavailable = (event) => {
        if (hasStartedSpeaking) {
          audioChunks.push(event.data);
        }
      };
      mediaRecorder.onstop = (e) => {
        console.log("Recording stopped", audioStream, e);
        stopRecordingCallback();
      };
      mediaRecorder.start();
    }
  };
  const stopAudioStream = async () => {
    try {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    } catch (error) {
      console.log("Error stopping audio stream:", error);
    }
    if (!audioStream) return;
    audioStream.getAudioTracks().forEach(function(track) {
      track.stop();
    });
    audioStream = null;
  };
  const calculateRMS = (data) => {
    let sumSquares = 0;
    for (let i = 0; i < data.length; i++) {
      const normalizedValue = (data[i] - 128) / 128;
      sumSquares += normalizedValue * normalizedValue;
    }
    return Math.sqrt(sumSquares / data.length);
  };
  const analyseAudio = (stream) => {
    const audioContext = new AudioContext();
    const audioStreamSource = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = MIN_DECIBELS;
    audioStreamSource.connect(analyser);
    const bufferLength = analyser.frequencyBinCount;
    const domainData = new Uint8Array(bufferLength);
    const timeDomainData = new Uint8Array(analyser.fftSize);
    let lastSoundTime = Date.now();
    hasStartedSpeaking = false;
    console.log("🔊 Sound detection started", lastSoundTime, hasStartedSpeaking);
    const detectSound = () => {
      const processFrame = () => {
        if (!mediaRecorder || !$showCallOverlay) {
          return;
        }
        if (assistantSpeaking && !($settings?.voiceInterruption ?? false)) {
          analyser.maxDecibels = 0;
          analyser.minDecibels = -1;
        } else {
          analyser.minDecibels = MIN_DECIBELS;
          analyser.maxDecibels = -30;
        }
        analyser.getByteTimeDomainData(timeDomainData);
        analyser.getByteFrequencyData(domainData);
        rmsLevel = calculateRMS(timeDomainData);
        const hasSound = domainData.some((value) => value > 0);
        if (hasSound) {
          console.log("%c%s", "color: red; font-size: 20px;", "🔊 Sound detected");
          if (!hasStartedSpeaking) {
            hasStartedSpeaking = true;
            stopAllAudio();
          }
          lastSoundTime = Date.now();
        }
        if (hasStartedSpeaking) {
          if (Date.now() - lastSoundTime > 2e3) {
            confirmed = true;
            if (mediaRecorder) {
              console.log("%c%s", "color: red; font-size: 20px;", "🔇 Silence detected");
              mediaRecorder.stop();
              return;
            }
          }
        }
        window.requestAnimationFrame(processFrame);
      };
      window.requestAnimationFrame(processFrame);
    };
    detectSound();
  };
  let finishedMessages = {};
  let currentMessageId = null;
  let currentUtterance = null;
  const speakSpeechSynthesisHandler = (content) => {
    if ($showCallOverlay) {
      return new Promise((resolve) => {
        let voices = [];
        const getVoicesLoop = setInterval(
          async () => {
            voices = await speechSynthesis.getVoices();
            if (voices.length > 0) {
              clearInterval(getVoicesLoop);
              const voice = voices?.filter((v) => v.voiceURI === ($settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice))?.at(0) ?? void 0;
              currentUtterance = new SpeechSynthesisUtterance(content);
              currentUtterance.rate = $settings.audio?.tts?.playbackRate ?? 1;
              if (voice) {
                currentUtterance.voice = voice;
              }
              speechSynthesis.speak(currentUtterance);
              currentUtterance.onend = async (e) => {
                await new Promise((r) => setTimeout(r, 200));
                resolve(e);
              };
            }
          },
          100
        );
      });
    } else {
      return Promise.resolve();
    }
  };
  const playAudio = (audio) => {
    if ($showCallOverlay) {
      return new Promise((resolve) => {
        const audioElement = document.getElementById("audioElement");
        if (audioElement) {
          audioElement.src = audio.src;
          audioElement.muted = true;
          audioElement.playbackRate = $settings.audio?.tts?.playbackRate ?? 1;
          audioElement.play().then(() => {
            audioElement.muted = false;
          }).catch((error) => {
            console.error(error);
          });
          audioElement.onended = async (e) => {
            await new Promise((r) => setTimeout(r, 100));
            resolve(e);
          };
        }
      });
    } else {
      return Promise.resolve();
    }
  };
  const stopAllAudio = async () => {
    assistantSpeaking = false;
    if (chatStreaming) {
      stopResponse();
    }
    if (currentUtterance) {
      speechSynthesis.cancel();
      currentUtterance = null;
    }
    const audioElement = document.getElementById("audioElement");
    if (audioElement) {
      audioElement.muted = true;
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  };
  let audioAbortController = new AbortController();
  const audioCache = /* @__PURE__ */ new Map();
  const emojiCache = /* @__PURE__ */ new Map();
  const fetchAudio = async (content) => {
    if (!audioCache.has(content)) {
      try {
        if ($settings?.showEmojiInCall ?? false) {
          const emoji2 = await generateEmoji(localStorage.token, modelId, content, chatId2);
          if (emoji2) {
            emojiCache.set(content, emoji2);
          }
        }
        if ($settings.audio?.tts?.engine === "browser-kokoro") {
          const blob = await $TTSWorker.generate({
            text: content,
            voice: $settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice
          }).catch((error) => {
            console.error(error);
            toast.error(`${error}`);
          });
          if (blob) {
            audioCache.set(content, new Audio(blob));
          }
        } else if ($config.audio.tts.engine !== "") {
          const res = await synthesizeOpenAISpeech(
            localStorage.token,
            $settings?.audio?.tts?.defaultVoice === $config.audio.tts.voice ? $settings?.audio?.tts?.voice ?? $config?.audio?.tts?.voice : $config?.audio?.tts?.voice,
            content
          ).catch((error) => {
            console.error(error);
            return null;
          });
          if (res) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            audioCache.set(content, new Audio(blobUrl));
          }
        } else {
          audioCache.set(content, true);
        }
      } catch (error) {
        console.error("Error synthesizing speech:", error);
      }
    }
    return audioCache.get(content);
  };
  let messages = {};
  const monitorAndPlayAudio = async (id, signal) => {
    while (!signal.aborted) {
      if (messages[id] && messages[id].length > 0) {
        const content = messages[id].shift();
        if (audioCache.has(content)) {
          if (($settings?.showEmojiInCall ?? false) && emojiCache.has(content)) {
            emoji = emojiCache.get(content);
          } else {
            emoji = null;
          }
          if ($config.audio.tts.engine !== "") {
            try {
              console.log("%c%s", "color: red; font-size: 20px;", `Playing audio for content: ${content}`);
              const audio = audioCache.get(content);
              await playAudio(audio);
              console.log(`Played audio for content: ${content}`);
              await new Promise((resolve) => setTimeout(resolve, 200));
            } catch (error) {
              console.error("Error playing audio:", error);
            }
          } else {
            await speakSpeechSynthesisHandler(content);
          }
        } else {
          messages[id].unshift(content);
          console.log(`Audio for "${content}" not yet available in the cache, re-queued...`);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      } else if (finishedMessages[id] && messages[id] && messages[id].length === 0) {
        assistantSpeaking = false;
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    console.log(`Audio monitoring and playing stopped for message ID ${id}`);
  };
  const chatStartHandler = async (e) => {
    const { id } = e.detail;
    chatStreaming = true;
    if (currentMessageId !== id) {
      console.log(`Received chat start event for message ID ${id}`);
      currentMessageId = id;
      if (audioAbortController) {
        audioAbortController.abort();
      }
      audioAbortController = new AbortController();
      assistantSpeaking = true;
      monitorAndPlayAudio(id, audioAbortController.signal);
    }
  };
  const chatEventHandler = async (e) => {
    const { id, content } = e.detail;
    if (currentMessageId === id) {
      console.log(`Received chat event for message ID ${id}: ${content}`);
      try {
        if (messages[id] === void 0) {
          messages[id] = [content];
        } else {
          messages[id].push(content);
        }
        console.log(content);
        fetchAudio(content);
      } catch (error) {
        console.error("Failed to fetch or play audio:", error);
      }
    }
  };
  const chatFinishHandler = async (e) => {
    const { id, content } = e.detail;
    finishedMessages[id] = true;
    chatStreaming = false;
  };
  onDestroy(async () => {
    await stopAllAudio();
    await stopRecordingCallback(false);
    await stopCamera();
    await stopAudioStream();
    eventTarget.removeEventListener("chat:start", chatStartHandler);
    eventTarget.removeEventListener("chat", chatEventHandler);
    eventTarget.removeEventListener("chat:finish", chatFinishHandler);
    audioAbortController.abort();
    await tick();
    await stopAllAudio();
  });
  if ($$props.eventTarget === void 0 && $$bindings.eventTarget && eventTarget !== void 0) $$bindings.eventTarget(eventTarget);
  if ($$props.submitPrompt === void 0 && $$bindings.submitPrompt && submitPrompt !== void 0) $$bindings.submitPrompt(submitPrompt);
  if ($$props.stopResponse === void 0 && $$bindings.stopResponse && stopResponse !== void 0) $$bindings.stopResponse(stopResponse);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.modelId === void 0 && $$bindings.modelId && modelId !== void 0) $$bindings.modelId(modelId);
  $$unsubscribe_models();
  $$unsubscribe_config();
  $$unsubscribe_settings();
  $$unsubscribe_TTSWorker();
  $$unsubscribe_showCallOverlay();
  $$unsubscribe_i18n();
  return `${$showCallOverlay ? `<div class="max-w-lg w-full h-full max-h-[100dvh] flex flex-col justify-between p-3 md:p-6">${camera ? `<button type="button" class="flex justify-center items-center w-full h-20 min-h-20">${emoji ? `<div class="transition-all rounded-full" style="${"font-size:" + escape(
    rmsLevel * 100 > 4 ? "4.5" : rmsLevel * 100 > 2 ? "4.25" : rmsLevel * 100 > 1 ? "3.75" : "3.5",
    true
  ) + "rem;width: 100%; text-align:center;"}">${escape(emoji)}</div>` : `${loading || assistantSpeaking ? `<svg class="size-12 text-gray-900 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><style>.spinner_qM83 {
								animation: spinner_8HQG 1.05s infinite;
							}
							.spinner_oXPr {
								animation-delay: 0.1s;
							}
							.spinner_ZTLf {
								animation-delay: 0.2s;
							}
							@keyframes spinner_8HQG {
								0%,
								57.14% {
									animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
									transform: translate(0);
								}
								28.57% {
									animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
									transform: translateY(-6px);
								}
								100% {
									transform: translate(0);
								}
							}
						</style><circle class="spinner_qM83" cx="4" cy="12" r="3"></circle><circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3"></circle><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3"></circle></svg>` : `<div class="${"" + escape(
    rmsLevel * 100 > 4 ? " size-[4.5rem]" : rmsLevel * 100 > 2 ? " size-16" : rmsLevel * 100 > 1 ? "size-14" : "size-12",
    true
  ) + " transition-all rounded-full " + escape(
    "bg-black dark:bg-white",
    true
  ) + " bg-black dark:bg-white"}"${add_attribute(
    "style",
    "",
    0
  )}></div>`}`} </button>` : ``} <div class="flex justify-center items-center flex-1 h-full w-full max-h-full">${!camera ? `<button type="button">${emoji ? `<div class="transition-all rounded-full" style="${"font-size:" + escape(
    rmsLevel * 100 > 4 ? "13" : rmsLevel * 100 > 2 ? "12" : rmsLevel * 100 > 1 ? "11.5" : "11",
    true
  ) + "rem;width:100%;text-align:center;"}">${escape(emoji)}</div>` : `${loading || assistantSpeaking ? `<svg class="size-44 text-gray-900 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><style>.spinner_qM83 {
									animation: spinner_8HQG 1.05s infinite;
								}
								.spinner_oXPr {
									animation-delay: 0.1s;
								}
								.spinner_ZTLf {
									animation-delay: 0.2s;
								}
								@keyframes spinner_8HQG {
									0%,
									57.14% {
										animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
										transform: translate(0);
									}
									28.57% {
										animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
										transform: translateY(-6px);
									}
									100% {
										transform: translate(0);
									}
								}
							</style><circle class="spinner_qM83" cx="4" cy="12" r="3"></circle><circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3"></circle><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3"></circle></svg>` : `<div class="${"" + escape(
    rmsLevel * 100 > 4 ? " size-52" : rmsLevel * 100 > 2 ? "size-48" : rmsLevel * 100 > 1 ? "size-44" : "size-40",
    true
  ) + " transition-all rounded-full " + escape(
    "bg-black dark:bg-white",
    true
  )}"${add_attribute(
    "style",
    "",
    0
  )}></div>`}`}</button>` : `<div class="relative flex video-container w-full max-h-full pt-2 pb-4 md:py-6 px-2 h-full"><video id="camera-feed" autoplay class="rounded-2xl h-full min-w-full object-cover object-center" playsinline></video> <canvas id="camera-canvas" style="display:none;"></canvas> <div class="absolute top-4 md:top-8 left-4"><button type="button" class="p-1.5 text-white cursor-pointer backdrop-blur-xl bg-black/10 rounded-full" data-svelte-h="svelte-16ul42n"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-6"><path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"></path></svg></button></div></div>`}</div> <div class="flex justify-between items-center pb-2 w-full"><div>${camera ? `${validate_component(VideoInputMenu, "VideoInputMenu").$$render($$result, { devices: videoInputDevices }, {}, {
    default: () => {
      return `<button class="p-3 rounded-full bg-gray-50 dark:bg-gray-900" type="button" data-svelte-h="svelte-5e0pue"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd"></path></svg></button>`;
    }
  })}` : `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Camera") }, {}, {
    default: () => {
      return `<button class="p-3 rounded-full bg-gray-50 dark:bg-gray-900" type="button" data-svelte-h="svelte-1n1gs9g"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path></svg></button>`;
    }
  })}`}</div> <div><button type="button"><div class="line-clamp-1 text-sm font-medium">${loading ? `${escape($i18n.t("Thinking..."))}` : `${assistantSpeaking ? `${escape($i18n.t("Tap to interrupt"))}` : `${escape($i18n.t("Listening..."))}`}`}</div></button></div> <div><button class="p-3 rounded-full bg-gray-50 dark:bg-gray-900" type="button" data-svelte-h="svelte-1k5eavb"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg></button></div></div></div>` : ``}`;
});
const Node = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="px-4 py-3 shadow-md rounded-xl dark:bg-black bg-white border dark:border-gray-900 w-60 h-20 group">${validate_component(Tooltip, "Tooltip").$$render(
    $$result,
    {
      content: data?.message?.error ? data.message.error.content : data.message.content,
      class: "w-full",
      allowHTML: false
    },
    {},
    {
      default: () => {
        return `${data.message.role === "user" ? `<div class="flex w-full">${validate_component(ProfileImage, "ProfileImage").$$render(
          $$result,
          {
            src: data.user?.profile_image_url ?? "/user.png",
            className: "size-5 -translate-y-[1px]"
          },
          {},
          {}
        )} <div class="ml-2"><div class="flex justify-between items-center"><div class="text-xs text-black dark:text-white font-medium line-clamp-1">${escape(data?.user?.name ?? "User")}</div></div> ${data?.message?.error ? `<div class="text-red-500 line-clamp-2 text-xs mt-0.5">${escape(data.message.error.content)}</div>` : `<div class="text-gray-500 line-clamp-2 text-xs mt-0.5">${escape(data.message.content)}</div>`}</div></div>` : `<div class="flex w-full">${validate_component(ProfileImage, "ProfileImage").$$render(
          $$result,
          {
            src: data?.model?.info?.meta?.profile_image_url ?? "",
            className: "size-5 -translate-y-[1px]"
          },
          {},
          {}
        )} <div class="ml-2"><div class="flex justify-between items-center"><div class="text-xs text-black dark:text-white font-medium line-clamp-1">${escape(data?.model?.name ?? data?.message?.model ?? "Assistant")}</div> <button${add_attribute(
          "class",
          data?.message?.favorite ? "" : "invisible group-hover:visible",
          0
        )}>${validate_component(Heart, "Heart").$$render(
          $$result,
          {
            className: "size-3 " + (data?.message?.favorite ? "fill-red-500 stroke-red-500" : "hover:fill-red-500 hover:stroke-red-500") + " ",
            strokeWidth: "2.5"
          },
          {},
          {}
        )}</button></div> ${data?.message?.error ? `<div class="text-red-500 line-clamp-2 text-xs mt-0.5">${escape(data.message.error.content)}</div>` : `<div class="text-gray-500 line-clamp-2 text-xs mt-0.5">${escape(data.message.content)}</div>`}</div></div>`}`;
      }
    }
  )} ${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "target",
      position: Position.Top,
      class: "w-2 rounded-full dark:bg-gray-900"
    },
    {},
    {}
  )} ${validate_component(Handle, "Handle").$$render(
    $$result,
    {
      type: "source",
      position: Position.Bottom,
      class: "w-2 rounded-full dark:bg-gray-900"
    },
    {},
    {}
  )}</div>`;
});
const Flow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  createEventDispatcher();
  let { nodes } = $$props;
  let { nodeTypes } = $$props;
  let { edges } = $$props;
  if ($$props.nodes === void 0 && $$bindings.nodes && nodes !== void 0) $$bindings.nodes(nodes);
  if ($$props.nodeTypes === void 0 && $$bindings.nodeTypes && nodeTypes !== void 0) $$bindings.nodeTypes(nodeTypes);
  if ($$props.edges === void 0 && $$bindings.edges && edges !== void 0) $$bindings.edges(edges);
  $$unsubscribe_theme();
  return `${validate_component(SvelteFlow, "SvelteFlow").$$render(
    $$result,
    {
      nodes,
      nodeTypes,
      edges,
      fitView: true,
      minZoom: 1e-3,
      colorMode: $theme.includes("dark") ? "dark" : $theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light",
      nodesConnectable: false,
      nodesDraggable: false,
      oninit: () => {
        console.log("Flow initialized");
      }
    },
    {},
    {
      default: () => {
        return `${validate_component(Controls$1, "Controls").$$render($$result, { showLock: false }, {}, {})} ${validate_component(Background, "Background").$$render($$result, { variant: BackgroundVariant.Dots }, {}, {})}`;
      }
    }
  )}`;
});
const ArrowLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path></svg>`;
});
const Overview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $models, $$unsubscribe_models;
  let $user, $$unsubscribe_user;
  let $i18n, $$unsubscribe_i18n;
  let $nodes, $$unsubscribe_nodes;
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  useStore();
  const { fitView: fitView2, getViewport } = useSvelteFlow();
  useNodesInitialized();
  let { history } = $$props;
  let selectedMessageId = null;
  const nodes = writable([]);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  const edges = writable([]);
  const nodeTypes = { custom: Node };
  const focusNode = async () => {
    if (selectedMessageId === null) {
      await fitView2({ nodes: [{ id: history.currentId }] });
    } else {
      await fitView2({ nodes: [{ id: selectedMessageId }] });
    }
    selectedMessageId = null;
  };
  const drawFlow = async () => {
    const nodeList = [];
    const edgeList = [];
    const levelOffset = 150;
    const siblingOffset = 250;
    let positionMap = /* @__PURE__ */ new Map();
    let layerWidths = {};
    Object.keys(history.messages).forEach((id) => {
      const message = history.messages[id];
      const level = message.parentId ? (positionMap.get(message.parentId)?.level ?? -1) + 1 : 0;
      if (!layerWidths[level]) layerWidths[level] = 0;
      positionMap.set(id, {
        id: message.id,
        level,
        position: layerWidths[level]++
      });
    });
    Object.keys(history.messages).forEach((id) => {
      const pos = positionMap.get(id);
      const xOffset = pos.position * siblingOffset;
      const y = pos.level * levelOffset;
      const x = xOffset;
      nodeList.push({
        id: pos.id,
        type: "custom",
        data: {
          user: $user,
          message: history.messages[id],
          model: $models.find((model) => model.id === history.messages[id].model)
        },
        position: { x, y }
      });
      const parentId = history.messages[id].parentId;
      if (parentId) {
        edgeList.push({
          id: parentId + "-" + pos.id,
          source: parentId,
          target: pos.id,
          selectable: false,
          class: " dark:fill-gray-300 fill-gray-300",
          type: "smoothstep",
          animated: history.currentId === id || recurseCheckChild(id, history.currentId)
        });
      }
    });
    await edges.set([...edgeList]);
    await nodes.set([...nodeList]);
  };
  const recurseCheckChild = (nodeId, currentId) => {
    const node = history.messages[nodeId];
    return node.childrenIds && node.childrenIds.some((id) => id === currentId || recurseCheckChild(id, currentId));
  };
  onDestroy(() => {
    console.log("Overview destroyed");
    nodes.set([]);
    edges.set([]);
  });
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  {
    if (history) {
      drawFlow();
    }
  }
  {
    if (history && history.currentId) {
      focusNode();
    }
  }
  $$unsubscribe_models();
  $$unsubscribe_user();
  $$unsubscribe_i18n();
  $$unsubscribe_nodes();
  return `<div class="w-full h-full relative"><div class="absolute z-50 w-full flex justify-between dark:text-gray-100 px-4 py-3.5"><div class="flex items-center gap-2.5"> <div class="text-lg font-medium self-center font-primary">${escape($i18n.t("Chat Overview"))}</div></div> <button class="self-center p-0.5">${validate_component(XMark, "XMark").$$render($$result, { className: "size-3.5" }, {}, {})}</button></div> ${$nodes.length > 0 ? `${validate_component(Flow, "Flow").$$render($$result, { nodes, nodeTypes, edges }, {}, {})}` : ``}</div>`;
});
const EllipsisVertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"></path></svg>`;
});
const ArrowsPointingOut = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path></svg>`;
});
const Artifacts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { overlay = false } = $$props;
  let { history } = $$props;
  let messages = [];
  let contents = [];
  let selectedContentIdx = 0;
  let iframeElement;
  const getContents = () => {
    contents = [];
    messages.forEach((message) => {
      if (message?.role !== "user" && message?.content) {
        const codeBlockContents = message.content.match(/```[\s\S]*?```/g);
        let codeBlocks = [];
        if (codeBlockContents) {
          codeBlockContents.forEach((block) => {
            const lang = block.split("\n")[0].replace("```", "").trim().toLowerCase();
            const code = block.replace(/```[\s\S]*?\n/, "").replace(/```$/, "");
            codeBlocks.push({ lang, code });
          });
        }
        let htmlContent = "";
        let cssContent = "";
        let jsContent = "";
        codeBlocks.forEach((block) => {
          const { lang, code } = block;
          if (lang === "html") {
            htmlContent += code + "\n";
          } else if (lang === "css") {
            cssContent += code + "\n";
          } else if (lang === "javascript" || lang === "js") {
            jsContent += code + "\n";
          }
        });
        const inlineHtml = message.content.match(/<html>[\s\S]*?<\/html>/gi);
        const inlineCss = message.content.match(/<style>[\s\S]*?<\/style>/gi);
        const inlineJs = message.content.match(/<script>[\s\S]*?<\/script>/gi);
        if (inlineHtml) {
          inlineHtml.forEach((block) => {
            const content = block.replace(/<\/?html>/gi, "");
            htmlContent += content + "\n";
          });
        }
        if (inlineCss) {
          inlineCss.forEach((block) => {
            const content = block.replace(/<\/?style>/gi, "");
            cssContent += content + "\n";
          });
        }
        if (inlineJs) {
          inlineJs.forEach((block) => {
            const content = block.replace(/<\/?script>/gi, "");
            jsContent += content + "\n";
          });
        }
        if (htmlContent || cssContent || jsContent) {
          const renderedContent = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
							<${""}style>
								body {
									background-color: white; /* Ensure the iframe has a white background */
								}

								${cssContent}
							</${""}style>
                        </head>
                        <body>
                            ${htmlContent}

							<${""}script>
                            	${jsContent}
							</${""}script>
                        </body>
                        </html>
                    `;
          contents = [...contents, { type: "iframe", content: renderedContent }];
        } else {
          for (const block of codeBlocks) {
            if (block.lang === "svg" || block.lang === "xml" && block.code.includes("<svg")) {
              contents = [...contents, { type: "svg", content: block.code }];
            }
          }
        }
      }
    });
    if (contents.length === 0) {
      showControls.set(false);
      showArtifacts.set(false);
    }
    selectedContentIdx = contents ? contents.length - 1 : 0;
  };
  if ($$props.overlay === void 0 && $$bindings.overlay && overlay !== void 0) $$bindings.overlay(overlay);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  {
    if (history) {
      messages = createMessagesList(history, history.currentId);
      getContents();
    } else {
      messages = [];
      getContents();
    }
  }
  $$unsubscribe_i18n();
  return `<div class="w-full h-full relative flex flex-col bg-gray-50 dark:bg-gray-850"><div class="w-full h-full flex-1 relative">${overlay ? `<div class="absolute top-0 left-0 right-0 bottom-0 z-10"></div>` : ``} <div class="absolute pointer-events-none z-50 w-full flex items-center justify-start p-4"><button class="self-center pointer-events-auto p-1 rounded-full bg-white dark:bg-gray-850">${validate_component(ArrowLeft, "ArrowLeft").$$render(
    $$result,
    {
      className: "size-3.5  text-gray-900 dark:text-white"
    },
    {},
    {}
  )}</button></div> <div class="absolute pointer-events-none z-50 w-full flex items-center justify-end p-4"><button class="self-center pointer-events-auto p-1 rounded-full bg-white dark:bg-gray-850">${validate_component(XMark, "XMark").$$render(
    $$result,
    {
      className: "size-3.5 text-gray-900 dark:text-white"
    },
    {},
    {}
  )}</button></div> <div class="flex-1 w-full h-full"><div class="h-full flex flex-col">${contents.length > 0 ? `<div class="max-w-full w-full h-full">${contents[selectedContentIdx].type === "iframe" ? `<iframe title="Content"${add_attribute("srcdoc", contents[selectedContentIdx].content, 0)} class="w-full border-0 h-full rounded-none" sandbox="allow-scripts allow-forms allow-same-origin"${add_attribute("this", iframeElement, 0)}></iframe>` : `${contents[selectedContentIdx].type === "svg" ? `${validate_component(SVGPanZoom, "SvgPanZoom").$$render(
    $$result,
    {
      className: " w-full h-full max-h-full overflow-hidden",
      svg: contents[selectedContentIdx].content
    },
    {},
    {}
  )}` : ``}`}</div>` : `<div class="m-auto font-medium text-xs text-gray-900 dark:text-white">${escape($i18n.t("No HTML, CSS, or JavaScript content found."))}</div>`}</div></div></div> ${contents.length > 0 ? `<div class="flex justify-between items-center p-2.5 font-primar text-gray-900 dark:text-white"><div class="flex items-center space-x-2"><div class="flex items-center gap-0.5 self-center min-w-fit" dir="ltr"><button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition disabled:cursor-not-allowed" ${contents.length <= 1 ? "disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg></button> <div class="text-xs self-center dark:text-gray-100 min-w-fit">${escape($i18n.t("Version {{selectedVersion}} of {{totalVersions}}", {
    selectedVersion: selectedContentIdx + 1,
    totalVersions: contents.length
  }))}</div> <button class="self-center p-1 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-black rounded-md transition disabled:cursor-not-allowed" ${contents.length <= 1 ? "disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="size-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg></button></div></div> <div class="flex items-center gap-1"><button class="copy-code-button bg-none border-none text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md px-1.5 py-0.5">${escape($i18n.t("Copy"))}</button> ${contents[selectedContentIdx].type === "iframe" ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Open in full screen") }, {}, {
    default: () => {
      return `<button class="bg-none border-none text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md p-0.5">${validate_component(ArrowsPointingOut, "ArrowsPointingOut").$$render($$result, { className: "size-3.5" }, {}, {})}</button>`;
    }
  })}` : ``}</div></div>` : ``}</div>`;
});
const ChatControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $showCallOverlay, $$unsubscribe_showCallOverlay;
  let $showControls, $$unsubscribe_showControls;
  let $showOverview, $$unsubscribe_showOverview;
  let $showArtifacts, $$unsubscribe_showArtifacts;
  $$unsubscribe_showCallOverlay = subscribe(showCallOverlay, (value) => $showCallOverlay = value);
  $$unsubscribe_showControls = subscribe(showControls, (value) => $showControls = value);
  $$unsubscribe_showOverview = subscribe(showOverview, (value) => $showOverview = value);
  $$unsubscribe_showArtifacts = subscribe(showArtifacts, (value) => $showArtifacts = value);
  let { history } = $$props;
  let { models: models2 = [] } = $$props;
  let { chatId: chatId2 = null } = $$props;
  let { chatFiles = [] } = $$props;
  let { params = {} } = $$props;
  let { eventTarget } = $$props;
  let { submitPrompt } = $$props;
  let { stopResponse } = $$props;
  let { showMessage } = $$props;
  let { files } = $$props;
  let { modelId } = $$props;
  let { pane } = $$props;
  let mediaQuery;
  let largeScreen = false;
  let dragged = false;
  let minSize = 0;
  const openPane = () => {
    if (parseInt(localStorage?.chatControlsSize)) {
      pane.resize(parseInt(localStorage?.chatControlsSize));
    } else {
      pane.resize(minSize);
    }
  };
  const handleMediaQuery = async (e) => {
    if (e.matches) {
      largeScreen = true;
      if ($showCallOverlay) {
        showCallOverlay.set(false);
        await tick();
        showCallOverlay.set(true);
      }
    } else {
      largeScreen = false;
      if ($showCallOverlay) {
        showCallOverlay.set(false);
        await tick();
        showCallOverlay.set(true);
      }
      pane = null;
    }
  };
  const onMouseDown = (event) => {
    dragged = true;
  };
  const onMouseUp = (event) => {
    dragged = false;
  };
  onDestroy(() => {
    showControls.set(false);
    mediaQuery.removeEventListener("change", handleMediaQuery);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  });
  const closeHandler = () => {
    showControls.set(false);
    showOverview.set(false);
    showArtifacts.set(false);
    if ($showCallOverlay) {
      showCallOverlay.set(false);
    }
  };
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.models === void 0 && $$bindings.models && models2 !== void 0) $$bindings.models(models2);
  if ($$props.chatId === void 0 && $$bindings.chatId && chatId2 !== void 0) $$bindings.chatId(chatId2);
  if ($$props.chatFiles === void 0 && $$bindings.chatFiles && chatFiles !== void 0) $$bindings.chatFiles(chatFiles);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  if ($$props.eventTarget === void 0 && $$bindings.eventTarget && eventTarget !== void 0) $$bindings.eventTarget(eventTarget);
  if ($$props.submitPrompt === void 0 && $$bindings.submitPrompt && submitPrompt !== void 0) $$bindings.submitPrompt(submitPrompt);
  if ($$props.stopResponse === void 0 && $$bindings.stopResponse && stopResponse !== void 0) $$bindings.stopResponse(stopResponse);
  if ($$props.showMessage === void 0 && $$bindings.showMessage && showMessage !== void 0) $$bindings.showMessage(showMessage);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.modelId === void 0 && $$bindings.modelId && modelId !== void 0) $$bindings.modelId(modelId);
  if ($$props.pane === void 0 && $$bindings.pane && pane !== void 0) $$bindings.pane(pane);
  if ($$props.openPane === void 0 && $$bindings.openPane && openPane !== void 0) $$bindings.openPane(openPane);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (!chatId2) {
        closeHandler();
      }
    }
    $$rendered = `${validate_component(SvelteFlowProvider, "SvelteFlowProvider").$$render($$result, {}, {}, {
      default: () => {
        return `${!largeScreen ? `${$showControls ? `${validate_component(Drawer, "Drawer").$$render($$result, { show: $showControls }, {}, {
          default: () => {
            return `<div class="${"" + escape(
              $showCallOverlay || $showOverview || $showArtifacts ? " h-screen  w-full" : "px-6 py-4",
              true
            ) + " h-full"}">${$showCallOverlay ? `<div class="h-full max-h-[100dvh] bg-white text-gray-700 dark:bg-black dark:text-gray-300 flex justify-center">${validate_component(CallOverlay, "CallOverlay").$$render(
              $$result,
              {
                submitPrompt,
                stopResponse,
                modelId,
                chatId: chatId2,
                eventTarget,
                files
              },
              {
                files: ($$value) => {
                  files = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>` : `${$showArtifacts ? `${validate_component(Artifacts, "Artifacts").$$render($$result, { history }, {}, {})}` : `${$showOverview ? `${validate_component(Overview, "Overview").$$render($$result, { history }, {}, {})}` : `${validate_component(Controls, "Controls").$$render(
              $$result,
              { models: models2, chatFiles, params },
              {
                chatFiles: ($$value) => {
                  chatFiles = $$value;
                  $$settled = false;
                },
                params: ($$value) => {
                  params = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`}`}`}</div>`;
          }
        })}` : ``}` : ` ${$showControls ? `${validate_component(Pane_resizer, "PaneResizer").$$render(
          $$result,
          {
            class: "relative flex w-2 items-center justify-center bg-background group"
          },
          {},
          {
            default: () => {
              return `<div class="z-10 flex h-7 w-5 items-center justify-center rounded-xs">${validate_component(EllipsisVertical, "EllipsisVertical").$$render(
                $$result,
                {
                  className: "size-4 invisible group-hover:visible"
                },
                {},
                {}
              )}</div>`;
            }
          }
        )}` : ``} ${validate_component(Pane$1, "Pane").$$render(
          $$result,
          {
            defaultSize: 0,
            onResize: (size) => {
              console.log("size", size, minSize);
              if ($showControls && pane.isExpanded()) {
                if (size < minSize) {
                  pane.resize(minSize);
                }
                if (size < minSize) {
                  localStorage.chatControlsSize = 0;
                } else {
                  localStorage.chatControlsSize = size;
                }
              }
            },
            onCollapse: () => {
              showControls.set(false);
            },
            collapsible: true,
            class: "pt-8",
            pane
          },
          {
            pane: ($$value) => {
              pane = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${$showControls ? `<div class="pr-4 pb-8 flex max-h-full min-h-full"><div class="${"w-full " + escape(
                ($showOverview || $showArtifacts) && !$showCallOverlay ? " " : "px-4 py-4 bg-white dark:shadow-lg dark:bg-gray-850  border border-gray-100 dark:border-gray-850",
                true
              ) + " rounded-xl z-40 pointer-events-auto overflow-y-auto scrollbar-hidden"}">${$showCallOverlay ? `<div class="w-full h-full flex justify-center">${validate_component(CallOverlay, "CallOverlay").$$render(
                $$result,
                {
                  submitPrompt,
                  stopResponse,
                  modelId,
                  chatId: chatId2,
                  eventTarget,
                  files
                },
                {
                  files: ($$value) => {
                    files = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div>` : `${$showArtifacts ? `${validate_component(Artifacts, "Artifacts").$$render($$result, { history, overlay: dragged }, {}, {})}` : `${$showOverview ? `${validate_component(Overview, "Overview").$$render($$result, { history }, {}, {})}` : `${validate_component(Controls, "Controls").$$render(
                $$result,
                { models: models2, chatFiles, params },
                {
                  chatFiles: ($$value) => {
                    chatFiles = $$value;
                    $$settled = false;
                  },
                  params: ($$value) => {
                    params = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}`}`}`}</div></div>` : ``}`;
            }
          }
        )}`}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_showCallOverlay();
  $$unsubscribe_showControls();
  $$unsubscribe_showOverview();
  $$unsubscribe_showArtifacts();
  return $$rendered;
});
const Placeholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_models, $$unsubscribe__models;
  let $i18n, $$unsubscribe_i18n;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $user, $$unsubscribe_user;
  $$unsubscribe__models = subscribe(models, (value) => $_models = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { transparentBackground = false } = $$props;
  let { createMessagePair } = $$props;
  let { stopResponse } = $$props;
  let { autoScroll = false } = $$props;
  let { atSelectedModel } = $$props;
  let { selectedModels } = $$props;
  let { history } = $$props;
  let { prompt = "" } = $$props;
  let { files = [] } = $$props;
  let { selectedToolIds = [] } = $$props;
  let { imageGenerationEnabled = false } = $$props;
  let { codeInterpreterEnabled = false } = $$props;
  let { webSearchEnabled = false } = $$props;
  let models$1 = [];
  let selectedModelIdx = 0;
  if ($$props.transparentBackground === void 0 && $$bindings.transparentBackground && transparentBackground !== void 0) $$bindings.transparentBackground(transparentBackground);
  if ($$props.createMessagePair === void 0 && $$bindings.createMessagePair && createMessagePair !== void 0) $$bindings.createMessagePair(createMessagePair);
  if ($$props.stopResponse === void 0 && $$bindings.stopResponse && stopResponse !== void 0) $$bindings.stopResponse(stopResponse);
  if ($$props.autoScroll === void 0 && $$bindings.autoScroll && autoScroll !== void 0) $$bindings.autoScroll(autoScroll);
  if ($$props.atSelectedModel === void 0 && $$bindings.atSelectedModel && atSelectedModel !== void 0) $$bindings.atSelectedModel(atSelectedModel);
  if ($$props.selectedModels === void 0 && $$bindings.selectedModels && selectedModels !== void 0) $$bindings.selectedModels(selectedModels);
  if ($$props.history === void 0 && $$bindings.history && history !== void 0) $$bindings.history(history);
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0) $$bindings.prompt(prompt);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
  if ($$props.selectedToolIds === void 0 && $$bindings.selectedToolIds && selectedToolIds !== void 0) $$bindings.selectedToolIds(selectedToolIds);
  if ($$props.imageGenerationEnabled === void 0 && $$bindings.imageGenerationEnabled && imageGenerationEnabled !== void 0) $$bindings.imageGenerationEnabled(imageGenerationEnabled);
  if ($$props.codeInterpreterEnabled === void 0 && $$bindings.codeInterpreterEnabled && codeInterpreterEnabled !== void 0) $$bindings.codeInterpreterEnabled(codeInterpreterEnabled);
  if ($$props.webSearchEnabled === void 0 && $$bindings.webSearchEnabled && webSearchEnabled !== void 0) $$bindings.webSearchEnabled(webSearchEnabled);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    models$1 = selectedModels.map((id) => $_models.find((m) => m.id === id));
    {
      if (selectedModels.length > 0) {
        selectedModelIdx = models$1.length - 1;
      }
    }
    $$rendered = `<div class="m-auto w-full max-w-6xl px-2 @2xl:px-20 translate-y-6 py-24 text-center">${$temporaryChatEnabled ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: "This chat won't appear in history and your messages will not be saved.",
        className: "w-full flex justify-center mb-0.5",
        placement: "top"
      },
      {},
      {
        default: () => {
          return `<div class="flex items-center gap-2 text-gray-500 font-medium text-lg my-2 w-fit">${validate_component(EyeSlash, "EyeSlash").$$render($$result, { strokeWidth: "2.5", className: "size-5" }, {}, {})} Temporary Chat</div>`;
        }
      }
    )}` : ``} <div class="w-full text-3xl text-gray-800 dark:text-gray-100 font-medium text-center flex items-center gap-4 font-primary"><div class="w-full flex flex-col justify-center items-center"><div class="flex flex-row justify-center gap-3 @sm:gap-3.5 w-fit px-5"><div class="flex shrink-0 justify-center"><div class="flex -space-x-4 mb-0.5">${each(models$1, (model, modelIdx) => {
      return `${validate_component(Tooltip, "Tooltip").$$render(
        $$result,
        {
          content: (models$1[modelIdx]?.info?.meta?.tags ?? []).map((tag) => tag.name.toUpperCase()).join(", "),
          placement: "top"
        },
        {},
        {
          default: () => {
            return `<button><img crossorigin="anonymous"${add_attribute(
              "src",
              model?.info?.meta?.profile_image_url ?? ($i18n.language === "dg-DG" ? `/doge.png` : `${WEBUI_BASE_URL}/static/favicon.png`),
              0
            )} class="size-9 @sm:size-10 rounded-full border-[1px] border-gray-200 dark:border-none" alt="logo" draggable="false"></button> `;
          }
        }
      )}`;
    })}</div></div> <div class="text-3xl @sm:text-4xl line-clamp-1">${models$1[selectedModelIdx]?.name ? `${escape(models$1[selectedModelIdx]?.name)}` : `${escape($i18n.t("Hello, {{name}}", { name: $user.name }))}`}</div></div> <div class="flex mt-1 mb-2"><div>${models$1[selectedModelIdx]?.info?.meta?.description ?? null ? `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        className: " w-fit",
        content: marked.parse(sanitizeResponseContent(models$1[selectedModelIdx]?.info?.meta?.description ?? "")),
        placement: "top"
      },
      {},
      {
        default: () => {
          return `<div class="mt-0.5 px-2 text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2 max-w-xl markdown"><!-- HTML_TAG_START -->${marked.parse(sanitizeResponseContent(models$1[selectedModelIdx]?.info?.meta?.description))}<!-- HTML_TAG_END --></div>`;
        }
      }
    )} ${models$1[selectedModelIdx]?.info?.meta?.user ? `<div class="mt-0.5 text-sm font-normal text-gray-400 dark:text-gray-500">By
								${models$1[selectedModelIdx]?.info?.meta?.user.community ? `<a href="${"https://openwebui.com/m/" + escape(models$1[selectedModelIdx]?.info?.meta?.user.username, true)}">${escape(models$1[selectedModelIdx]?.info?.meta?.user.name ? models$1[selectedModelIdx]?.info?.meta?.user.name : `@${models$1[selectedModelIdx]?.info?.meta?.user.username}`)}</a>` : `${escape(models$1[selectedModelIdx]?.info?.meta?.user.name)}`}</div>` : ``}` : ``}</div></div> <div class="${"text-base font-normal @md:max-w-3xl w-full py-3 " + escape(atSelectedModel ? "mt-2" : "", true)}">${validate_component(MessageInput, "MessageInput").$$render(
      $$result,
      {
        history,
        selectedModels,
        transparentBackground,
        stopResponse,
        createMessagePair,
        placeholder: $i18n.t("How can I help you today?"),
        files,
        prompt,
        autoScroll,
        selectedToolIds,
        imageGenerationEnabled,
        codeInterpreterEnabled,
        webSearchEnabled,
        atSelectedModel
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        },
        prompt: ($$value) => {
          prompt = $$value;
          $$settled = false;
        },
        autoScroll: ($$value) => {
          autoScroll = $$value;
          $$settled = false;
        },
        selectedToolIds: ($$value) => {
          selectedToolIds = $$value;
          $$settled = false;
        },
        imageGenerationEnabled: ($$value) => {
          imageGenerationEnabled = $$value;
          $$settled = false;
        },
        codeInterpreterEnabled: ($$value) => {
          codeInterpreterEnabled = $$value;
          $$settled = false;
        },
        webSearchEnabled: ($$value) => {
          webSearchEnabled = $$value;
          $$settled = false;
        },
        atSelectedModel: ($$value) => {
          atSelectedModel = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div> </div>`;
  } while (!$$settled);
  $$unsubscribe__models();
  $$unsubscribe_i18n();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_user();
  return $$rendered;
});
let eventConfirmationTitle = "";
let eventConfirmationMessage = "";
let eventConfirmationInput = false;
let eventConfirmationInputPlaceholder = "";
let eventConfirmationInputValue = "";
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentChatPage, $$unsubscribe_currentChatPage;
  let $temporaryChatEnabled, $$unsubscribe_temporaryChatEnabled;
  let $chatId, $$unsubscribe_chatId;
  let $settings, $$unsubscribe_settings;
  let $i18n, $$unsubscribe_i18n;
  let $models, $$unsubscribe_models;
  let $socket, $$unsubscribe_socket;
  let $userAPIKey, $$unsubscribe_userAPIKey;
  let $user, $$unsubscribe_user;
  let $config, $$unsubscribe_config;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_mobile;
  let $tools, $$unsubscribe_tools;
  let $chatTitle, $$unsubscribe_chatTitle;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $showSidebar, $$unsubscribe_showSidebar;
  let $banners, $$unsubscribe_banners;
  $$unsubscribe_currentChatPage = subscribe(currentChatPage, (value) => $currentChatPage = value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => $temporaryChatEnabled = value);
  $$unsubscribe_chatId = subscribe(chatId, (value) => $chatId = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  $$unsubscribe_socket = subscribe(socket, (value) => $socket = value);
  $$unsubscribe_userAPIKey = subscribe(userAPIKey, (value) => $userAPIKey = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_mobile = subscribe(mobile, (value) => value);
  $$unsubscribe_tools = subscribe(tools, (value) => $tools = value);
  $$unsubscribe_chatTitle = subscribe(chatTitle, (value) => $chatTitle = value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  $$unsubscribe_banners = subscribe(banners, (value) => $banners = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { chatIdProp = "" } = $$props;
  let loading = false;
  const eventTarget = new EventTarget();
  let controlPane;
  let controlPaneComponent;
  let autoScroll = true;
  let messagesContainerElement;
  let navbarElement;
  let showEventConfirmation = false;
  let selectedModels = [""];
  let atSelectedModel;
  let selectedModelIds = [];
  let selectedToolIds = [];
  let imageGenerationEnabled = false;
  let webSearchEnabled = false;
  let codeInterpreterEnabled = false;
  let chat = null;
  let history = { messages: {}, currentId: null };
  let taskId = null;
  let prompt = "";
  let chatFiles = [];
  let files = [];
  let params = {};
  const saveSessionSelectedModels = () => {
    if (selectedModels.length === 0 || selectedModels.length === 1 && selectedModels[0] === "") {
      return;
    }
    sessionStorage.selectedModels = JSON.stringify(selectedModels);
    console.log("saveSessionSelectedModels", selectedModels, sessionStorage.selectedModels);
  };
  const setToolIds = async () => {
    if (!$tools) {
      tools.set(await getTools(localStorage.token));
    }
    if (selectedModels.length !== 1 && !atSelectedModel) {
      return;
    }
    const model = atSelectedModel ?? $models.find((m) => m.id === selectedModels[0]);
    if (model) {
      selectedToolIds = (model?.info?.meta?.toolIds ?? []).filter((id) => $tools.find((t) => t.id === id));
    }
  };
  const showMessage = async (message) => {
    const _chatId = JSON.parse(JSON.stringify($chatId));
    let _messageId = JSON.parse(JSON.stringify(message.id));
    let messageChildrenIds = history.messages[_messageId].childrenIds;
    while (messageChildrenIds.length !== 0) {
      _messageId = messageChildrenIds.at(-1);
      messageChildrenIds = history.messages[_messageId].childrenIds;
    }
    history.currentId = _messageId;
    await tick();
    await tick();
    await tick();
    const messageElement = document.getElementById(`message-${message.id}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth" });
    }
    await tick();
    saveChatHandler(_chatId, history);
  };
  const chatEventHandler = async (event, cb) => {
    console.log("📥 Socket event received:", event && JSON.stringify(event).substring(0, 200) + "...");
    if (event.chat_id === $chatId) {
      await tick();
      let message = history.messages[event.message_id];
      if (message) {
        const type = event?.data?.type ?? null;
        const data = event?.data?.data ?? null;
        console.log("📥 Event type:", type, "Data ID:", data?.id);
        console.log("📥 Content preview:", data?.content ? data.content.substring(0, 50) + "..." : "No content");
        if (type === "chat:completion") {
          console.log("🤖 Processing agent API response from socket event");
          if (data.content) {
            console.log("📝 Content length:", data.content.length);
            if (message.isLoading) {
              message.isLoading = false;
            }
            message.content = data.content;
            if (data.done !== false) {
              message.done = true;
              console.log("✅ Marking message as done");
            }
            history.messages[event.message_id] = { ...message };
            console.log("✅ Updated message in history.messages");
            await tick();
            console.log("✅ Forced UI update");
            if (data.done && autoScroll) {
              scrollToBottom();
            }
          }
        } else if (type === "status") {
          if (message?.statusHistory) {
            message.statusHistory.push(data);
          } else {
            message.statusHistory = [data];
          }
        } else if (type === "source" || type === "citation") {
          if (data?.type === "code_execution") {
            if (!message.codeExecutions) {
              message.codeExecutions = [];
            }
            const existingIndex = message.codeExecutions.findIndex((exec) => exec.id === data.execution_id);
            if (existingIndex !== -1) {
              message.codeExecutions[existingIndex] = {
                ...message.codeExecutions[existingIndex],
                ...data,
                updated: Date.now()
              };
            } else {
              message.codeExecutions.push({
                ...data,
                created: Date.now(),
                updated: Date.now()
              });
            }
          } else {
            if (!message.sources) {
              message.sources = [];
            }
            message.sources.push(data);
          }
        } else if (type === "chat:title") {
          chatTitle.set(data);
          currentChatPage.set(1);
          await chats.set(await getChatList(localStorage.token, $currentChatPage));
        } else if (type === "chat:tags") {
          chat = await getChatById(localStorage.token, $chatId);
          tags.set(await getAllTags(localStorage.token));
        } else if (type === "message") {
          console.log("📝 Appending message content:", data.content);
          if (message.isLoading) {
            message.isLoading = false;
          }
          message.content += data.content;
        } else if (type === "replace") {
          console.log("📝 Replacing message content:", data.content);
          if (message.isLoading) {
            message.isLoading = false;
          }
          message.content = data.content;
        } else if (type === "action") {
          if (data.action === "continue") {
            const continueButton = document.getElementById("continue-response-button");
            if (continueButton) {
              continueButton.click();
            }
          }
        } else {
          console.log("❓ Unknown message type:", type, data);
        }
        history = { ...history };
        if (cb && typeof cb === "function") {
          cb(event, message);
        }
      } else {
        console.warn("⚠️ No message found for ID:", event.message_id);
      }
    }
  };
  const onMessageHandler = async (event) => {
    if (event.origin !== window.origin) {
      return;
    }
    if (event.data.type === "input:prompt") {
      console.debug(event.data.text);
      const inputElement = document.getElementById("chat-input");
      if (inputElement) {
        prompt = event.data.text;
        inputElement.focus();
      }
    }
    if (event.data.type === "action:submit") {
      console.debug(event.data.text);
      if (prompt !== "") {
        await tick();
        submitPrompt(prompt);
      }
    }
    if (event.data.type === "input:prompt:submit") {
      console.debug(event.data.text);
      if (prompt !== "") {
        await tick();
        submitPrompt(event.data.text);
      }
    }
  };
  onDestroy(() => {
    window.removeEventListener("message", onMessageHandler);
    $socket?.off("chat-events", chatEventHandler);
  });
  const uploadYoutubeTranscription = async (url) => {
    console.log(url);
    const fileItem = {
      type: "doc",
      name: url,
      collection_name: "",
      status: "uploading",
      context: "full",
      url,
      error: ""
    };
    try {
      files = [...files, fileItem];
      const res = await processYoutubeVideo(localStorage.token, url);
      if (res) {
        fileItem.status = "uploaded";
        fileItem.collection_name = res.collection_name;
        fileItem.file = { ...res.file, ...fileItem.file };
        files = files;
      }
    } catch (e) {
      files = files.filter((f) => f.name !== url);
      toast.error(`${e}`);
    }
  };
  const initNewChat = async () => {
    if ($page.url.searchParams.get("models")) {
      selectedModels = $page.url.searchParams.get("models")?.split(",");
    } else if ($page.url.searchParams.get("model")) {
      const urlModels = $page.url.searchParams.get("model")?.split(",");
      if (urlModels.length === 1) {
        const m = $models.find((m2) => m2.id === urlModels[0]);
        if (!m) {
          const modelSelectorButton = document.getElementById("model-selector-0-button");
          if (modelSelectorButton) {
            modelSelectorButton.click();
            await tick();
            const modelSelectorInput = document.getElementById("model-search-input");
            if (modelSelectorInput) {
              modelSelectorInput.focus();
              modelSelectorInput.value = urlModels[0];
              modelSelectorInput.dispatchEvent(new Event("input"));
            }
          }
        } else {
          selectedModels = urlModels;
        }
      } else {
        selectedModels = urlModels;
      }
    } else {
      if (sessionStorage.selectedModels) {
        selectedModels = JSON.parse(sessionStorage.selectedModels);
        sessionStorage.removeItem("selectedModels");
      } else {
        if ($settings?.models) {
          selectedModels = $settings?.models;
        } else if ($config?.default_models) {
          console.log($config?.default_models.split(",") ?? "");
          selectedModels = $config?.default_models.split(",");
        }
      }
    }
    selectedModels = selectedModels.filter((modelId) => $models.map((m) => m.id).includes(modelId));
    if (selectedModels.length === 0 || selectedModels.length === 1 && selectedModels[0] === "") {
      if ($models.length > 0) {
        selectedModels = [$models[0].id];
      } else {
        selectedModels = [""];
      }
    }
    await showControls.set(false);
    await showCallOverlay.set(false);
    await showOverview.set(false);
    await showArtifacts.set(false);
    if ($page.url.pathname.includes("/c/")) {
      window.history.replaceState(history.state, "", `/`);
    }
    autoScroll = true;
    await chatId.set("");
    await chatTitle.set("");
    history = { messages: {}, currentId: null };
    initHistoryWithGreetings();
    chatFiles = [];
    params = {};
    if ($page.url.searchParams.get("youtube")) {
      uploadYoutubeTranscription(`https://www.youtube.com/watch?v=${$page.url.searchParams.get("youtube")}`);
    }
    if ($page.url.searchParams.get("web-search") === "true") {
      webSearchEnabled = true;
    }
    if ($page.url.searchParams.get("image-generation") === "true") {
      imageGenerationEnabled = true;
    }
    if ($page.url.searchParams.get("tools")) {
      selectedToolIds = $page.url.searchParams.get("tools")?.split(",").map((id) => id.trim()).filter((id) => id);
    } else if ($page.url.searchParams.get("tool-ids")) {
      selectedToolIds = $page.url.searchParams.get("tool-ids")?.split(",").map((id) => id.trim()).filter((id) => id);
    }
    if ($page.url.searchParams.get("call") === "true") {
      showCallOverlay.set(true);
      showControls.set(true);
    }
    if ($page.url.searchParams.get("q")) {
      prompt = $page.url.searchParams.get("q") ?? "";
      if (prompt) {
        await tick();
        submitPrompt(prompt);
      }
    }
    selectedModels = selectedModels.map((modelId) => $models.map((m) => m.id).includes(modelId) ? modelId : "");
    const userSettings = await getUserSettings(localStorage.token);
    if (userSettings) {
      settings.set(userSettings.ui);
    } else {
      settings.set(JSON.parse(localStorage.getItem("settings") ?? "{}"));
    }
    const chatInput = document.getElementById("chat-input");
    setTimeout(() => chatInput?.focus(), 0);
  };
  const loadChat = async () => {
    chatId.set(chatIdProp);
    chat = await getChatById(localStorage.token, $chatId).catch(async (error) => {
      await goto();
      return null;
    });
    if (chat) {
      await getTagsById(localStorage.token, $chatId).catch(async (error) => {
        return [];
      });
      const chatContent = chat.chat;
      if (chatContent) {
        console.log(chatContent);
        selectedModels = (chatContent?.models ?? void 0) !== void 0 ? chatContent.models : [chatContent.models ?? ""];
        history = (chatContent?.history ?? void 0) !== void 0 ? chatContent.history : convertMessagesToHistory(chatContent.messages);
        chatTitle.set(chatContent.title);
        const userSettings = await getUserSettings(localStorage.token);
        if (userSettings) {
          await settings.set(userSettings.ui);
        } else {
          await settings.set(JSON.parse(localStorage.getItem("settings") ?? "{}"));
        }
        params = chatContent?.params ?? {};
        chatFiles = chatContent?.files ?? [];
        autoScroll = true;
        await tick();
        if (history.currentId) {
          history.messages[history.currentId].done = true;
        }
        await tick();
        return true;
      } else {
        return null;
      }
    }
  };
  const scrollToBottom = async () => {
    await tick();
  };
  const chatActionHandler = async (chatId2, actionId, modelId, responseMessageId, event = null) => {
    const messages = createMessagesList(history, responseMessageId);
    const res = await chatAction(localStorage.token, actionId, {
      model: modelId,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        info: m.info ? m.info : void 0,
        timestamp: m.timestamp,
        ...m.sources ? { sources: m.sources } : {}
      })),
      ...event ? { event } : {},
      model_item: $models.find((m) => m.id === modelId),
      chat_id: chatId2,
      session_id: $socket?.id,
      id: responseMessageId
    }).catch((error) => {
      toast.error(`${error}`);
      messages.at(-1).error = { content: error };
      return null;
    });
    if (res !== null && res.messages) {
      for (const message of res.messages) {
        history.messages[message.id] = {
          ...history.messages[message.id],
          ...history.messages[message.id].content !== message.content ? {
            originalContent: history.messages[message.id].content
          } : {},
          ...message
        };
      }
    }
    if ($chatId == chatId2) {
      if (!$temporaryChatEnabled) {
        chat = await updateChatById(localStorage.token, chatId2, {
          models: selectedModels,
          messages,
          history,
          params,
          files: chatFiles
        });
        currentChatPage.set(1);
        await chats.set(await getChatList(localStorage.token, $currentChatPage));
      }
    }
  };
  const createMessagePair = async (userPrompt) => {
    prompt = "";
    if (selectedModels.length === 0) {
      toast.error($i18n.t("Model not selected"));
    } else {
      const modelId = selectedModels[0];
      const model = $models.filter((m) => m.id === modelId).at(0);
      const messages = createMessagesList(history, history.currentId);
      const parentMessage = messages.length !== 0 ? messages.at(-1) : null;
      const userMessageId = v4();
      const responseMessageId = v4();
      const userMessage = {
        id: userMessageId,
        parentId: parentMessage ? parentMessage.id : null,
        childrenIds: [responseMessageId],
        role: "user",
        content: userPrompt ? userPrompt : `[PROMPT] ${userMessageId}`,
        timestamp: Math.floor(Date.now() / 1e3)
      };
      const responseMessage = {
        id: responseMessageId,
        parentId: userMessageId,
        childrenIds: [],
        role: "assistant",
        content: `[RESPONSE] ${responseMessageId}`,
        done: true,
        model: modelId,
        modelName: model.name ?? model.id,
        modelIdx: 0,
        timestamp: Math.floor(Date.now() / 1e3)
      };
      if (parentMessage) {
        parentMessage.childrenIds.push(userMessageId);
        history.messages[parentMessage.id] = parentMessage;
      }
      history.messages[userMessageId] = userMessage;
      history.messages[responseMessageId] = responseMessage;
      history.currentId = responseMessageId;
      await tick();
      if (autoScroll) {
        scrollToBottom();
      }
      if (messages.length === 0) {
        await initChatHandler(history);
      } else {
        await saveChatHandler($chatId, history);
      }
    }
  };
  const addMessages = async ({ modelId, parentId, messages }) => {
    const model = $models.filter((m) => m.id === modelId).at(0);
    let parentMessage = history.messages[parentId];
    let currentParentId = parentMessage ? parentMessage.id : null;
    for (const message of messages) {
      let messageId = v4();
      if (message.role === "user") {
        const userMessage = {
          id: messageId,
          parentId: currentParentId,
          childrenIds: [],
          timestamp: Math.floor(Date.now() / 1e3),
          ...message
        };
        if (parentMessage) {
          parentMessage.childrenIds.push(messageId);
          history.messages[parentMessage.id] = parentMessage;
        }
        history.messages[messageId] = userMessage;
        parentMessage = userMessage;
        currentParentId = messageId;
      } else {
        const responseMessage = {
          id: messageId,
          parentId: currentParentId,
          childrenIds: [],
          done: true,
          model: model.id,
          modelName: model.name ?? model.id,
          modelIdx: 0,
          timestamp: Math.floor(Date.now() / 1e3),
          ...message
        };
        if (parentMessage) {
          parentMessage.childrenIds.push(messageId);
          history.messages[parentMessage.id] = parentMessage;
        }
        history.messages[messageId] = responseMessage;
        parentMessage = responseMessage;
        currentParentId = messageId;
      }
    }
    history.currentId = currentParentId;
    await tick();
    if (autoScroll) {
      scrollToBottom();
    }
    if (messages.length === 0) {
      await initChatHandler(history);
    } else {
      await saveChatHandler($chatId, history);
    }
  };
  const submitPrompt = async (userPrompt, { _raw = false } = {}) => {
    console.log("🚀 submitPrompt", userPrompt, $chatId);
    console.log("📋 Current history IDs:", {
      currentId: history.currentId,
      messagesCount: Object.keys(history.messages).length
    });
    const messages = createMessagesList(history, history.currentId);
    if (messages) {
      console.log("📋 Last message:", messages.length > 0 ? {
        role: messages[messages.length - 1].role,
        content: messages[messages.length - 1].content.slice(0, 50) + "..."
      } : "No messages");
    }
    const _selectedModels = selectedModels.map((modelId) => $models.map((m) => m.id).includes(modelId) ? modelId : "");
    if (JSON.stringify(selectedModels) !== JSON.stringify(_selectedModels)) {
      selectedModels = _selectedModels;
    }
    if (userPrompt === "" && files.length === 0) {
      toast.error($i18n.t("Please enter a prompt"));
      return;
    }
    if (selectedModels.includes("")) {
      toast.error($i18n.t("Model not selected"));
      return;
    }
    if (messages.length != 0 && messages.at(-1).done != true) {
      return;
    }
    if (messages.length != 0 && messages.at(-1).error && !messages.at(-1).content) {
      toast.error($i18n.t(`Oops! There was an error in the previous response.`));
      return;
    }
    if (files.length > 0 && files.filter((file) => file.type !== "image" && file.status === "uploading").length > 0) {
      toast.error($i18n.t(`Oops! There are files still uploading. Please wait for the upload to complete.`));
      return;
    }
    if (($config?.file?.max_count ?? null) !== null && files.length + chatFiles.length > $config?.file?.max_count) {
      toast.error($i18n.t(`You can only chat with a maximum of {{maxCount}} file(s) at a time.`, { maxCount: $config?.file?.max_count }));
      return;
    }
    prompt = "";
    const chatInputElement = document.getElementById("chat-input");
    if (chatInputElement) {
      await tick();
      chatInputElement.style.height = "";
      chatInputElement.style.height = Math.min(chatInputElement.scrollHeight, 320) + "px";
    }
    const _files = JSON.parse(JSON.stringify(files));
    chatFiles.push(..._files.filter((item) => ["doc", "file", "collection"].includes(item.type)));
    chatFiles = chatFiles.filter(
      // Remove duplicates
      (item, index, array) => array.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) === index
    );
    files = [];
    prompt = "";
    let userMessageId = v4();
    let userMessage = {
      id: userMessageId,
      parentId: messages.length !== 0 ? messages.at(-1).id : null,
      childrenIds: [],
      role: "user",
      content: userPrompt,
      files: _files.length > 0 ? _files : void 0,
      timestamp: Math.floor(Date.now() / 1e3),
      // Unix epoch
      models: selectedModels
    };
    history.messages[userMessageId] = userMessage;
    history.currentId = userMessageId;
    if (messages.length !== 0) {
      history.messages[messages.at(-1).id].childrenIds.push(userMessageId);
    }
    const chatInput = document.getElementById("chat-input");
    chatInput?.focus();
    saveSessionSelectedModels();
    await sendPrompt(history, userPrompt, userMessageId, { newChat: true });
  };
  const sendPromptSocket = async (_history, model, responseMessageId, _chatId) => {
    console.log("🔌 sendPromptSocket:", {
      modelId: model.id,
      responseMessageId,
      chatId: _chatId
    });
    const responseMessage = _history.messages[responseMessageId];
    const userMessage = _history.messages[responseMessage.parentId];
    let files2 = JSON.parse(JSON.stringify(chatFiles));
    files2.push(...(userMessage?.files ?? []).filter((item) => ["doc", "file", "collection"].includes(item.type)), ...(responseMessage?.files ?? []).filter((item) => ["web_search_results"].includes(item.type)));
    files2 = files2.filter((item, index, array) => array.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) === index);
    scrollToBottom();
    eventTarget.dispatchEvent(new CustomEvent("chat:start", { detail: { id: responseMessageId } }));
    await tick();
    const getUserLocation = async () => {
      if ($settings?.userLocation) {
        try {
          return await getAndUpdateUserLocation(localStorage.token);
        } catch (err) {
          console.error(err);
          return void 0;
        }
      }
      return void 0;
    };
    const userLocation = await getUserLocation();
    console.log("Sending userAPIKey to backend:", $userAPIKey ? "Present" : "Empty/None");
    responseMessage.content = "";
    if ($settings?.processingMessage ?? false) {
      responseMessage.content = $settings.processingMessage === true ? "..." : $settings.processingMessage;
    }
    const stream = model?.info?.params?.stream_response ?? $settings?.params?.stream_response ?? params?.stream_response ?? true;
    let messages = [
      params?.system || $settings.system || (responseMessage?.userContext ?? null) ? {
        role: "system",
        content: `${promptTemplate(params?.system ?? $settings?.system ?? "", $user.name, userLocation, $userAPIKey)}${responseMessage?.userContext ?? null ? `

User Context:
${responseMessage?.userContext ?? ""}` : ""}`
      } : void 0,
      ...createMessagesList(_history, responseMessageId).map((message) => ({
        ...message,
        content: removeDetails(message.content, ["reasoning", "code_interpreter"])
      }))
    ].filter(Boolean);
    messages = messages.map((message, idx, arr) => ({
      role: message.role,
      ...message.files?.filter((file) => file.type === "image").length > 0 && message.role === "user" ? {
        content: [
          {
            type: "text",
            text: message?.merged?.content ?? message.content
          },
          ...message.files.filter((file) => file.type === "image").map((file) => ({
            type: "image_url",
            image_url: { url: file.url }
          }))
        ]
      } : {
        content: message?.merged?.content ?? message.content
      }
    })).filter((message) => message?.role === "user" || message?.content?.trim());
    const res = await generateOpenAIChatCompletion(
      localStorage.token,
      {
        stream,
        model: model.id,
        messages,
        params: {
          ...$settings?.params,
          ...params,
          format: $settings.requestFormat ?? void 0,
          keep_alive: $settings.keepAlive ?? void 0,
          stop: params?.stop ?? $settings?.params?.stop ?? void 0 ? (params?.stop.split(",").map((token2) => token2.trim()) ?? $settings.params.stop).map((str) => decodeURIComponent(JSON.parse('"' + str.replace(/\"/g, '\\"') + '"'))) : void 0
        },
        files: (files2?.length ?? 0) > 0 ? files2 : void 0,
        tool_ids: selectedToolIds.length > 0 ? selectedToolIds : void 0,
        features: {
          image_generation: $config?.features?.enable_image_generation && ($user.role === "admin" || $user?.permissions?.features?.image_generation) ? imageGenerationEnabled : false,
          code_interpreter: $config?.features?.enable_code_interpreter && ($user.role === "admin" || $user?.permissions?.features?.code_interpreter) ? codeInterpreterEnabled : false,
          web_search: $config?.features?.enable_web_search && ($user.role === "admin" || $user?.permissions?.features?.web_search) ? webSearchEnabled || ($settings?.webSearch ?? false) === "always" : false
        },
        variables: (() => {
          console.log("Sending userAPIKey to backend:", $userAPIKey ? "Present" : "Empty/None");
          const promptVars = getPromptVariables($user.name, userLocation, $userAPIKey);
          return promptVars;
        })(),
        model_item: $models.find((m) => m.id === model.id),
        session_id: $socket?.id,
        chat_id: _chatId,
        id: responseMessageId,
        ...!$temporaryChatEnabled && (messages.length == 1 || messages.length == 2 && messages.at(0)?.role === "system" && messages.at(1)?.role === "user") && (selectedModels[0] === model.id || atSelectedModel !== void 0) ? {
          background_tasks: {
            title_generation: $settings?.title?.auto ?? true,
            tags_generation: $settings?.autoTags ?? true
          }
        } : {},
        ...stream && (model.info?.meta?.capabilities?.usage ?? false) ? { stream_options: { include_usage: true } } : {}
      },
      `${WEBUI_BASE_URL}/api`
    ).catch((error) => {
      toast.error(`${error}`);
      responseMessage.error = { content: error };
      responseMessage.done = true;
      history.messages[responseMessageId] = responseMessage;
      history.currentId = responseMessageId;
      return null;
    });
    console.log(res);
    if (res) {
      taskId = res.task_id;
    }
    await tick();
    scrollToBottom();
  };
  const sendPrompt = async (_history, userPrompt, userMessageId, options = {}) => {
    const { modelId, modelIdx = 0, newChat = false } = options;
    let _chatId = $chatId;
    if (newChat && !$temporaryChatEnabled && !_chatId) {
      console.log("🆕 Creating new chat for prompt");
      try {
        chat = await createNewChat(localStorage.token, {
          id: _chatId,
          title: $i18n.t("New Chat"),
          models: selectedModels,
          system: $settings.system ?? void 0,
          params,
          history,
          messages: createMessagesList(history, history.currentId),
          tags: [],
          timestamp: Date.now()
        });
        _chatId = chat.id;
        await chatId.set(_chatId);
        await chats.set(await getChatList(localStorage.token, $currentChatPage));
        currentChatPage.set(1);
        try {
          window.history.pushState({}, "", `/c/${_chatId}`);
        } catch (e) {
          console.error("❌ Error updating URL:", e);
        }
      } catch (e) {
        console.error("❌ Error creating chat:", e);
        _chatId = null;
      }
    }
    const messages = createMessagesList(_history, userMessageId);
    const userMessage = messages.at(-1);
    const responseMessageId = v4();
    let model;
    if (modelId) {
      model = $models.find((m) => m.id === modelId);
    } else {
      const userModelId = (userMessage?.models ?? selectedModels)[0];
      model = $models.find((m) => m.id === userModelId);
    }
    if (!model) {
      toast.error($i18n.t("Model not selected"));
      return;
    }
    const isAgentModel = model.id === "accounting_en" || model.id.includes("accounting");
    console.log(`🏷️ Model ${model.id} is agent model: ${isAgentModel}`);
    const agentLoadingText = isAgentModel ? $i18n.t("Agent is helping...") : "";
    const responseMessage = {
      id: responseMessageId,
      parentId: userMessageId,
      childrenIds: [],
      role: "assistant",
      content: agentLoadingText,
      model: model.id,
      modelName: model?.name ?? model.id,
      modelIdx,
      timestamp: Math.floor(Date.now() / 1e3),
      // Flag to indicate this is an agent response
      isAgentResponse: isAgentModel,
      // Add loading indicator for agents
      isLoading: isAgentModel
    };
    _history.messages[responseMessageId] = responseMessage;
    _history.currentId = responseMessageId;
    _history.messages[userMessageId].childrenIds.push(responseMessageId);
    await tick();
    if (autoScroll) {
      scrollToBottom();
    }
    if (isAgentModel) {
      startAgentAnimation(responseMessageId);
    }
    await sendPromptSocket(_history, model, responseMessageId, _chatId);
    return responseMessageId;
  };
  const startAgentAnimation = async (messageId) => {
    const loadingTexts = [
      $i18n.t("Agent is helping..."),
      $i18n.t("Agent is processing your request..."),
      $i18n.t("Agent is working on it..."),
      $i18n.t("Agent is analyzing...")
    ];
    let textIndex = 0;
    let dotCount = 0;
    const animateText = () => {
      const message = history.messages[messageId];
      if (!message || !message.isLoading || message.content && message.content.length > 30) {
        return;
      }
      const baseText = loadingTexts[textIndex];
      const dots = ".".repeat(dotCount % 4);
      history.messages[messageId].content = baseText + dots;
      history = { ...history };
      dotCount++;
      if (dotCount % 12 === 0) {
        textIndex = (textIndex + 1) % loadingTexts.length;
      }
      setTimeout(animateText, 400);
    };
    animateText();
  };
  const stopResponse = () => {
    if (taskId) {
      const res = stopTask(localStorage.token, taskId).catch((error) => {
        return null;
      });
      if (res) {
        taskId = null;
        const responseMessage = history.messages[history.currentId];
        responseMessage.done = true;
        history.messages[history.currentId] = responseMessage;
        if (autoScroll) {
          scrollToBottom();
        }
      }
    }
  };
  const submitMessage = async (parentId, prompt2) => {
    let userPrompt = prompt2;
    let userMessageId = v4();
    let userMessage = {
      id: userMessageId,
      parentId,
      childrenIds: [],
      role: "user",
      content: userPrompt,
      models: selectedModels
    };
    if (parentId !== null) {
      history.messages[parentId].childrenIds = [...history.messages[parentId].childrenIds, userMessageId];
    }
    history.messages[userMessageId] = userMessage;
    history.currentId = userMessageId;
    await tick();
    await sendPrompt(history, userPrompt, userMessageId);
  };
  const regenerateResponse = async (message) => {
    console.log("regenerateResponse");
    if (history.currentId) {
      let userMessage = history.messages[message.parentId];
      let userPrompt = userMessage.content;
      if ((userMessage?.models ?? [...selectedModels]).length == 1) {
        await sendPrompt(history, userPrompt, userMessage.id);
      } else {
        await sendPrompt(history, userPrompt, userMessage.id, {
          modelId: message.model,
          modelIdx: message.modelIdx
        });
      }
    }
  };
  const continueResponse = async () => {
    console.log("continueResponse");
    JSON.parse(JSON.stringify($chatId));
    if (history.currentId && history.messages[history.currentId].done == true) {
      const responseMessage = history.messages[history.currentId];
      responseMessage.done = false;
      await tick();
      const model = $models.filter((m) => m.id === (responseMessage?.selectedModelId ?? responseMessage.model)).at(0);
      if (model) {
        await sendPrompt(history, responseMessage.content, responseMessage.parentId, {
          modelId: model.id,
          modelIdx: responseMessage.modelIdx
        });
      }
    }
  };
  const mergeResponses = async (messageId, responses, _chatId) => {
    console.log("mergeResponses", messageId, responses);
    const message = history.messages[messageId];
    const mergedResponse = { status: true, content: "" };
    message.merged = mergedResponse;
    history.messages[messageId] = message;
    try {
      const [res, controller] = await generateMoACompletion(localStorage.token, message.model, history.messages[message.parentId].content, responses);
      if (res && res.ok && res.body) {
        const textStream = await createOpenAITextStream(res.body, $settings.splitLargeChunks);
        for await (const update of textStream) {
          const { value, done, sources, error, usage } = update;
          if (error || done) {
            break;
          }
          if (mergedResponse.content == "" && value == "\n") {
            continue;
          } else {
            mergedResponse.content += value;
            history.messages[messageId] = message;
          }
          if (autoScroll) {
            scrollToBottom();
          }
        }
        await saveChatHandler(_chatId, history);
      } else {
        console.error(res);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const initChatHandler = async (history2) => {
    let _chatId = $chatId;
    if (!$temporaryChatEnabled) {
      chat = await createNewChat(localStorage.token, {
        id: _chatId,
        title: $i18n.t("New Chat"),
        models: selectedModels,
        system: $settings.system ?? void 0,
        params,
        history: history2,
        messages: createMessagesList(history2, history2.currentId),
        tags: [],
        timestamp: Date.now()
      });
      _chatId = chat.id;
      await chatId.set(_chatId);
      await chats.set(await getChatList(localStorage.token, $currentChatPage));
      currentChatPage.set(1);
      window.history.replaceState(history2.state, "", `/c/${_chatId}`);
    } else {
      _chatId = "local";
      await chatId.set("local");
    }
    await tick();
    return _chatId;
  };
  const saveChatHandler = async (_chatId, history2) => {
    if ($chatId == _chatId) {
      if (!$temporaryChatEnabled) {
        chat = await updateChatById(localStorage.token, _chatId, {
          models: selectedModels,
          history: history2,
          messages: createMessagesList(history2, history2.currentId),
          params,
          files: chatFiles
        });
        currentChatPage.set(1);
        await chats.set(await getChatList(localStorage.token, $currentChatPage));
      }
    }
  };
  const initHistoryWithGreetings = () => {
    let messageId = v4();
    const locale = localStorage.getItem("locale");
    const greeting = locale === "zh-CN" ? "您好！我是您的会计助手。请告诉我您需要分析的财务数据或有什么财务问题。" : "Hello! I'm your accounting assistant. How can I help with your financial data analysis?";
    history.messages[messageId] = {
      id: messageId,
      role: "assistant",
      content: greeting,
      model: "Assistant",
      modelName: "Assistant",
      parentId: null,
      timestamp: Math.floor(Date.now() / 1e3),
      childrenIds: [],
      done: true
    };
    history.currentId = messageId;
  };
  if ($$props.chatIdProp === void 0 && $$bindings.chatIdProp && chatIdProp !== void 0) $$bindings.chatIdProp(chatIdProp);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    selectedModelIds = atSelectedModel !== void 0 ? [atSelectedModel.id] : selectedModels;
    {
      if (chatIdProp) {
        (async () => {
          loading = true;
          console.log(chatIdProp);
          prompt = "";
          files = [];
          selectedToolIds = [];
          webSearchEnabled = false;
          imageGenerationEnabled = false;
          if (chatIdProp && await loadChat()) {
            await tick();
            loading = false;
            if (localStorage.getItem(`chat-input-${chatIdProp}`)) {
              try {
                const input = JSON.parse(localStorage.getItem(`chat-input-${chatIdProp}`));
                prompt = input.prompt;
                files = input.files;
                selectedToolIds = input.selectedToolIds;
                webSearchEnabled = input.webSearchEnabled;
                imageGenerationEnabled = input.imageGenerationEnabled;
              } catch (e) {
              }
            }
            window.setTimeout(() => scrollToBottom(), 0);
            const chatInput = document.getElementById("chat-input");
            chatInput?.focus();
          } else {
            await goto();
          }
        })();
      }
    }
    {
      if (selectedModels && chatIdProp !== "") {
        saveSessionSelectedModels();
      }
    }
    {
      if (selectedModels) {
        setToolIds();
      }
    }
    {
      if (atSelectedModel || selectedModels) {
        setToolIds();
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-8uu834_START -->${$$result.title = `<title> ${escape($chatTitle ? `${$chatTitle.length > 30 ? `${$chatTitle.slice(0, 30)}...` : $chatTitle} | ${$WEBUI_NAME}` : `${$WEBUI_NAME}`)} </title>`, ""}<!-- HEAD_svelte-8uu834_END -->`, ""} <audio id="audioElement" src="" style="display: none;"></audio> ${validate_component(ConfirmDialog, "EventConfirmDialog").$$render(
      $$result,
      {
        title: eventConfirmationTitle,
        message: eventConfirmationMessage,
        input: eventConfirmationInput,
        inputPlaceholder: eventConfirmationInputPlaceholder,
        inputValue: eventConfirmationInputValue,
        show: showEventConfirmation
      },
      {
        show: ($$value) => {
          showEventConfirmation = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="${"h-screen max-h-[100dvh] transition-width duration-200 ease-in-out " + escape($showSidebar ? "  md:max-w-[calc(100%-260px)]" : " ", true) + " w-full max-w-full flex flex-col"}" id="chat-container">${chatIdProp === "" || !loading && chatIdProp ? `${$settings?.backgroundImageUrl ?? null ? `<div class="${"absolute " + escape(
      $showSidebar ? "md:max-w-[calc(100%-260px)] md:translate-x-[260px]" : "",
      true
    ) + " top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"}" style="${"background-image: url(" + escape($settings.backgroundImageUrl, true) + ")"}"></div> <div class="absolute top-0 left-0 w-full h-full bg-linear-to-t from-white to-white/85 dark:from-gray-900 dark:to-gray-900/90 z-0"></div>` : ``} ${validate_component(Navbar, "Navbar").$$render(
      $$result,
      {
        chat: {
          id: $chatId,
          chat: {
            title: $chatTitle,
            models: selectedModels,
            system: $settings.system ?? void 0,
            params,
            history,
            timestamp: Date.now()
          }
        },
        title: $chatTitle,
        shareEnabled: !!history.currentId,
        initNewChat,
        this: navbarElement,
        selectedModels
      },
      {
        this: ($$value) => {
          navbarElement = $$value;
          $$settled = false;
        },
        selectedModels: ($$value) => {
          selectedModels = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Pane_group, "PaneGroup").$$render(
      $$result,
      {
        direction: "horizontal",
        class: "w-full h-full"
      },
      {},
      {
        default: () => {
          return `${validate_component(Pane$1, "Pane").$$render(
            $$result,
            {
              defaultSize: 50,
              class: "h-full flex w-full relative"
            },
            {},
            {
              default: () => {
                return `${$banners.length > 0 && !history.currentId && !$chatId && selectedModels.length <= 1 ? `<div class="absolute top-12 left-0 right-0 w-full z-30"><div class="flex flex-col gap-1 w-full">${each(
                  $banners.filter((b) => b.dismissible ? !JSON.parse(localStorage.getItem("dismissedBannerIds") ?? "[]").includes(b.id) : true),
                  (banner) => {
                    return `${validate_component(Banner, "Banner").$$render($$result, { banner }, {}, {})}`;
                  }
                )}</div></div>` : ``} <div class="flex flex-col flex-auto z-10 w-full @container">${$settings?.landingPageMode === "chat" || createMessagesList(history, history.currentId).length > 0 || true ? `<div class="pb-2.5 flex flex-col justify-between w-full flex-auto overflow-auto h-0 max-w-full z-10 scrollbar-hidden" id="messages-container"${add_attribute("this", messagesContainerElement, 0)}><div class="h-full w-full flex flex-col">${validate_component(Messages, "Messages").$$render(
                  $$result,
                  {
                    chatId: $chatId,
                    selectedModels,
                    atSelectedModel,
                    sendPrompt,
                    showMessage,
                    submitMessage,
                    continueResponse,
                    regenerateResponse,
                    mergeResponses,
                    chatActionHandler,
                    addMessages,
                    bottomPadding: files.length > 0,
                    history,
                    autoScroll,
                    prompt
                  },
                  {
                    history: ($$value) => {
                      history = $$value;
                      $$settled = false;
                    },
                    autoScroll: ($$value) => {
                      autoScroll = $$value;
                      $$settled = false;
                    },
                    prompt: ($$value) => {
                      prompt = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}</div></div> <div class="pb-[1rem]">${validate_component(MessageInput, "MessageInput").$$render(
                  $$result,
                  {
                    history,
                    selectedModels,
                    transparentBackground: $settings?.backgroundImageUrl ?? false,
                    stopResponse,
                    createMessagePair,
                    onChange: (input) => {
                      if (input.prompt) {
                        localStorage.setItem(`chat-input-${$chatId}`, JSON.stringify(input));
                      } else {
                        localStorage.removeItem(`chat-input-${$chatId}`);
                      }
                    },
                    files,
                    prompt,
                    autoScroll,
                    selectedToolIds,
                    imageGenerationEnabled,
                    codeInterpreterEnabled,
                    webSearchEnabled,
                    atSelectedModel
                  },
                  {
                    files: ($$value) => {
                      files = $$value;
                      $$settled = false;
                    },
                    prompt: ($$value) => {
                      prompt = $$value;
                      $$settled = false;
                    },
                    autoScroll: ($$value) => {
                      autoScroll = $$value;
                      $$settled = false;
                    },
                    selectedToolIds: ($$value) => {
                      selectedToolIds = $$value;
                      $$settled = false;
                    },
                    imageGenerationEnabled: ($$value) => {
                      imageGenerationEnabled = $$value;
                      $$settled = false;
                    },
                    codeInterpreterEnabled: ($$value) => {
                      codeInterpreterEnabled = $$value;
                      $$settled = false;
                    },
                    webSearchEnabled: ($$value) => {
                      webSearchEnabled = $$value;
                      $$settled = false;
                    },
                    atSelectedModel: ($$value) => {
                      atSelectedModel = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )} <div class="absolute bottom-1 text-xs text-gray-500 text-center line-clamp-1 right-0 left-0" data-svelte-h="svelte-1t2gtm5"></div></div>` : `<div class="overflow-auto w-full h-full flex items-center">${validate_component(Placeholder, "Placeholder").$$render(
                  $$result,
                  {
                    history,
                    selectedModels,
                    transparentBackground: $settings?.backgroundImageUrl ?? false,
                    stopResponse,
                    createMessagePair,
                    files,
                    prompt,
                    autoScroll,
                    selectedToolIds,
                    imageGenerationEnabled,
                    codeInterpreterEnabled,
                    webSearchEnabled,
                    atSelectedModel
                  },
                  {
                    files: ($$value) => {
                      files = $$value;
                      $$settled = false;
                    },
                    prompt: ($$value) => {
                      prompt = $$value;
                      $$settled = false;
                    },
                    autoScroll: ($$value) => {
                      autoScroll = $$value;
                      $$settled = false;
                    },
                    selectedToolIds: ($$value) => {
                      selectedToolIds = $$value;
                      $$settled = false;
                    },
                    imageGenerationEnabled: ($$value) => {
                      imageGenerationEnabled = $$value;
                      $$settled = false;
                    },
                    codeInterpreterEnabled: ($$value) => {
                      codeInterpreterEnabled = $$value;
                      $$settled = false;
                    },
                    webSearchEnabled: ($$value) => {
                      webSearchEnabled = $$value;
                      $$settled = false;
                    },
                    atSelectedModel: ($$value) => {
                      atSelectedModel = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}</div>`}</div>`;
              }
            }
          )} ${validate_component(ChatControls, "ChatControls").$$render(
            $$result,
            {
              chatId: $chatId,
              modelId: selectedModelIds?.at(0) ?? null,
              models: selectedModelIds.reduce(
                (a, e, i, arr) => {
                  const model = $models.find((m) => m.id === e);
                  if (model) {
                    return [...a, model];
                  }
                  return a;
                },
                []
              ),
              submitPrompt,
              stopResponse,
              showMessage,
              eventTarget,
              this: controlPaneComponent,
              history,
              chatFiles,
              params,
              files,
              pane: controlPane
            },
            {
              this: ($$value) => {
                controlPaneComponent = $$value;
                $$settled = false;
              },
              history: ($$value) => {
                history = $$value;
                $$settled = false;
              },
              chatFiles: ($$value) => {
                chatFiles = $$value;
                $$settled = false;
              },
              params: ($$value) => {
                params = $$value;
                $$settled = false;
              },
              files: ($$value) => {
                files = $$value;
                $$settled = false;
              },
              pane: ($$value) => {
                controlPane = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${loading ? `<div class="flex items-center justify-center h-full w-full"><div class="m-auto">${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}</div></div>` : ``}`}</div>`;
  } while (!$$settled);
  $$unsubscribe_currentChatPage();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_chatId();
  $$unsubscribe_settings();
  $$unsubscribe_i18n();
  $$unsubscribe_models();
  $$unsubscribe_socket();
  $$unsubscribe_userAPIKey();
  $$unsubscribe_user();
  $$unsubscribe_config();
  $$unsubscribe_page();
  $$unsubscribe_mobile();
  $$unsubscribe_tools();
  $$unsubscribe_chatTitle();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_showSidebar();
  $$unsubscribe_banners();
  return $$rendered;
});
const ShortcutsModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-gray-700 dark:text-gray-100"><div class="flex justify-between dark:text-gray-300 px-5 pt-4"><div class="text-lg font-medium self-center">${escape($i18n.t("Keyboard shortcuts"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full p-5 md:space-x-4 dark:text-gray-200"><div class="flex flex-col w-full sm:flex-row sm:justify-center sm:space-x-6"><div class="flex flex-col space-y-3 w-full self-start"><div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Open new chat"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1ykt4pq"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">O</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Focus chat input"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-9s7il5"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Esc</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Copy last code block"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1rhjj6y"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">;</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Copy last response"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-88t2mq"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">C</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Generate prompt pair"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-71xcgz"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Enter</div></div></div></div> <div class="flex flex-col space-y-3 w-full self-start"><div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Toggle settings"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-sstb0e"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">.</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Toggle sidebar"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-shqiv6"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">S</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Delete chat"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1czc2xm"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Shift</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">⌫/Delete</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Show shortcuts"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-10s6aob"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">Ctrl/⌘</div> <div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">/</div></div></div></div></div></div> <div class="flex justify-between dark:text-gray-300 px-5"><div class="text-lg font-medium self-center">${escape($i18n.t("Input commands"))}</div></div> <div class="flex flex-col md:flex-row w-full p-5 md:space-x-4 dark:text-gray-200"><div class="flex flex-col w-full sm:flex-row sm:justify-center sm:space-x-6"><div class="flex flex-col space-y-3 w-full self-start"><div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Attach file from knowledge"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-npid8c"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">#</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Add custom prompt"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1x4z9aw"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">/</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Talk to model"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1ia95ih"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">@</div></div></div> <div class="w-full flex justify-between items-center"><div class="text-sm">${escape($i18n.t("Accept autocomplete generation / Jump to prompt variable"))}</div> <div class="flex space-x-1 text-xs" data-svelte-h="svelte-1hbxzzi"><div class="h-fit py-1 px-2 flex items-center justify-center rounded-sm border border-black/10 capitalize text-gray-600 dark:border-white/10 dark:text-gray-300">TAB</div></div></div></div></div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const QuestionMarkCircle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"></path></svg>`;
});
const Keyboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)}${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm5.01 1H5v2.01h2.01V8Zm3 0H8v2.01h2.01V8Zm3 0H11v2.01h2.01V8Zm3 0H14v2.01h2.01V8Zm3 0H17v2.01h2.01V8Zm-12 3H5v2.01h2.01V11Zm3 0H8v2.01h2.01V11Zm3 0H11v2.01h2.01V11Zm3 0H14v2.01h2.01V11Zm3 0H17v2.01h2.01V11Zm-12 3H5v2.01h2.01V14ZM8 14l-.001 2 8.011.01V14H8Zm11.01 0H17v2.01h2.01V14Z" clip-rule="evenodd"></path></svg>`;
});
const HelpMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { showDocsHandler } = $$props;
  let { showShortcutsHandler } = $$props;
  let { onClose = () => {
  } } = $$props;
  if ($$props.showDocsHandler === void 0 && $$bindings.showDocsHandler && showDocsHandler !== void 0) $$bindings.showDocsHandler(showDocsHandler);
  if ($$props.showShortcutsHandler === void 0 && $$bindings.showShortcutsHandler && showShortcutsHandler !== void 0) $$bindings.showShortcutsHandler(showShortcutsHandler);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  $$unsubscribe_i18n();
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    content: () => {
      return `<div slot="content">${validate_component(Menu_content, "DropdownMenu.Content").$$render(
        $$result,
        {
          class: "w-full max-w-[200px] rounded-xl px-1 py-1.5 border border-gray-300/30 dark:border-gray-700/50 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-lg",
          sideOffset: 4,
          side: "top",
          align: "end",
          transition: flyAndScale
        },
        {},
        {
          default: () => {
            return `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-share-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(QuestionMarkCircle, "QuestionMarkCircle").$$render($$result, { className: "size-5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Documentation"))}</div>`;
                }
              }
            )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
              $$result,
              {
                class: "flex gap-2 items-center px-3 py-2 text-sm  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md",
                id: "chat-share-button"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Keyboard, "Keyboard").$$render($$result, { className: "size-5" }, {}, {})} <div class="flex items-center">${escape($i18n.t("Keyboard shortcuts"))}</div>`;
                }
              }
            )}`;
          }
        }
      )}</div>`;
    },
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let showShortcuts = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="hidden lg:flex fixed bottom-0 right-0 px-1 py-1 z-20"><button id="show-shortcuts-button" class="hidden"></button> ${validate_component(HelpMenu, "HelpMenu").$$render(
      $$result,
      {
        showDocsHandler: () => {
          showShortcuts = !showShortcuts;
        },
        showShortcutsHandler: () => {
          showShortcuts = !showShortcuts;
        }
      },
      {},
      {
        default: () => {
          return `${validate_component(Tooltip, "Tooltip").$$render(
            $$result,
            {
              content: $i18n.t("Help"),
              placement: "left"
            },
            {},
            {
              default: () => {
                return `<button class="text-gray-600 dark:text-gray-300 bg-gray-300/20 size-4 flex items-center justify-center text-[0.7rem] rounded-full" data-svelte-h="svelte-141cz2e">?</button>`;
              }
            }
          )}`;
        }
      }
    )}</div> ${validate_component(ShortcutsModal, "ShortcutsModal").$$render(
      $$result,
      { show: showShortcuts },
      {
        show: ($$value) => {
          showShortcuts = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
export {
  Chat as C,
  Help as H
};
//# sourceMappingURL=Help.js.map

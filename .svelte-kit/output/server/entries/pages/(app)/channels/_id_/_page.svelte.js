import { c as create_ssr_component, a as add_attribute, b as subscribe, l as createEventDispatcher, v as validate_component, f as escape, e as each, p as getContext, o as onDestroy } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { t as tick } from "../../../../../chunks/scheduler.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { F as FilesOverlay, U as UserMenu, c as Pane_group, P as Pane, D as Drawer } from "../../../../../chunks/Drawer.js";
import { g as goto } from "../../../../../chunks/client.js";
import { p as WEBUI_API_BASE_URL, C as activeUserIds, g as WEBUI_BASE_URL, D as emojiShortCodes, a as settings, u as user, E as shortCodesToEmojis, o as mobile, c as config, j as showSidebar, s as socket, d as chatId } from "../../../../../chunks/index3.js";
import "i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import isToday from "dayjs/plugin/isToday.js";
import isYesterday from "dayjs/plugin/isYesterday.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { P as ProfileImage, N as Name, I as Image, F as FileItem, M as Markdown, L as Loader } from "../../../../../chunks/Markdown.js";
import { C as ConfirmDialog } from "../../../../../chunks/ConfirmDialog.js";
import { G as GarbageBin } from "../../../../../chunks/GarbageBin.js";
import { P as Pencil } from "../../../../../chunks/Pencil.js";
import { T as Tooltip } from "../../../../../chunks/Tooltip.js";
import "dequal";
import "../../../../../chunks/create.js";
import { b as Menu, c as Menu_trigger, M as Menu_content, f as flyAndScale } from "../../../../../chunks/menu-trigger.js";
import { C as ChevronRight } from "../../../../../chunks/ChevronRight.js";
import { f as formatDate, c as compressImage } from "../../../../../chunks/index5.js";
import { S as Spinner } from "../../../../../chunks/Spinner.js";
import { v4 } from "uuid";
import { R as RichTextInput } from "../../../../../chunks/RichTextInput.js";
import "../../../../../chunks/AutoCompletion.js";
import { D as Dropdown, M as Menu_item } from "../../../../../chunks/Dropdown.js";
import { u as uploadFile } from "../../../../../chunks/Drawer.svelte_svelte_type_style_lang.js";
import { M as MenuLines } from "../../../../../chunks/MenuLines.js";
import { X as XMark } from "../../../../../chunks/XMark.js";
const getChannelById = async (token = "", channel_id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/channels/${channel_id}`, {
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
const getChannelMessages = async (token = "", channel_id, skip = 0, limit = 50) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }
  ).then(async (res2) => {
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
const getChannelThreadMessages = async (token = "", channel_id, message_id, skip = 0, limit = 50) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/${message_id}/thread?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }
  ).then(async (res2) => {
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
const sendMessage = async (token = "", channel_id, message) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/post`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ...message })
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
const updateMessage = async (token = "", channel_id, message_id, message) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/${message_id}/update`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...message })
    }
  ).then(async (res2) => {
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
const addReaction = async (token = "", channel_id, message_id, name) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/${message_id}/reactions/add`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    }
  ).then(async (res2) => {
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
const removeReaction = async (token = "", channel_id, message_id, name) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/${message_id}/reactions/remove`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    }
  ).then(async (res2) => {
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
const deleteMessage = async (token = "", channel_id, message_id) => {
  let error = null;
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/channels/${channel_id}/messages/${message_id}/delete`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }
  ).then(async (res2) => {
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
const DocumentArrowUpSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd"></path><path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"></path></svg>`;
});
const CameraSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z"></path><path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd"></path></svg>`;
});
const ProfilePreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeUserIds, $$unsubscribe_activeUserIds;
  $$unsubscribe_activeUserIds = subscribe(activeUserIds, (value) => $activeUserIds = value);
  let { side = "right" } = $$props;
  let { align = "top" } = $$props;
  let { user: user2 = null } = $$props;
  let show = false;
  const dispatch = createEventDispatcher();
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.user === void 0 && $$bindings.user && user2 !== void 0) $$bindings.user(user2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Menu, "DropdownMenu.Root").$$render(
      $$result,
      {
        closeFocus: false,
        onOpenChange: (state) => {
          dispatch("change", state);
        },
        typeahead: false,
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
          return `${validate_component(Menu_trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          })} ${slots.content ? slots.content({}) : ` ${validate_component(Menu_content, "DropdownMenu.Content").$$render(
            $$result,
            {
              class: "max-w-full w-[240px] rounded-lg z-9999 bg-white dark:bg-black dark:text-white shadow-lg",
              sideOffset: 8,
              side,
              align,
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `${user2 ? `<div class="flex flex-col gap-2 w-full rounded-lg"><div class="py-8 relative bg-gray-900 rounded-t-lg"><img crossorigin="anonymous"${add_attribute("src", user2?.profile_image_url ?? `${WEBUI_BASE_URL}/static/favicon.png`, 0)} class="absolute -bottom-5 left-3 size-12 ml-0.5 object-cover rounded-full -translate-y-[1px]" alt="profile"></div> <div class="flex flex-col pt-4 pb-2.5 px-4"><div class="-mb-1"><span class="font-medium text-sm line-clamp-1">${escape(user2.name)}</span></div> <div class="flex items-center gap-2">${$activeUserIds.includes(user2.id) ? `<div data-svelte-h="svelte-16ptfft"><span class="relative flex size-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span> <span class="relative inline-flex rounded-full size-2 bg-green-500"></span></span></div> <div class="-translate-y-[1px]" data-svelte-h="svelte-ck3jqo"><span class="text-xs">Active</span></div>` : `<div data-svelte-h="svelte-1sienw4"><span class="relative flex size-2"><span class="relative inline-flex rounded-full size-2 bg-gray-500"></span></span></div> <div class="-translate-y-[1px]" data-svelte-h="svelte-15khx8s"><span class="text-xs">Away</span></div>`}</div></div></div>` : ``}`;
              }
            }
          )} `}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_activeUserIds();
  return $$rendered;
});
const ChatBubbleOvalEllipsis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"></path></svg>`;
});
const FaceSmile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"></path></svg>`;
});
const Component = [
  "1F3FB",
  "1F3FC",
  "1F3FD",
  "1F3FE",
  "1F3FF",
  "1F9B0",
  "1F9B1",
  "1F9B3",
  "1F9B2"
];
const Activities = [
  "1F383",
  "1F384",
  "1F386",
  "1F387",
  "1F9E8",
  "2728",
  "1F388",
  "1F389",
  "1F38A",
  "1F38B",
  "1F38D",
  "1F38E",
  "1F38F",
  "1F390",
  "1F391",
  "1F9E7",
  "1F380",
  "1F381",
  "1F397-FE0F",
  "1F397",
  "1F39F-FE0F",
  "1F39F",
  "1F3AB",
  "1F396-FE0F",
  "1F396",
  "1F3C6",
  "1F3C5",
  "1F947",
  "1F948",
  "1F949",
  "26BD",
  "26BE",
  "1F94E",
  "1F3C0",
  "1F3D0",
  "1F3C8",
  "1F3C9",
  "1F3BE",
  "1F94F",
  "1F3B3",
  "1F3CF",
  "1F3D1",
  "1F3D2",
  "1F94D",
  "1F3D3",
  "1F3F8",
  "1F94A",
  "1F94B",
  "1F945",
  "26F3",
  "26F8-FE0F",
  "26F8",
  "1F3A3",
  "1F93F",
  "1F3BD",
  "1F3BF",
  "1F6F7",
  "1F94C",
  "1F3AF",
  "1FA80",
  "1FA81",
  "1F52B",
  "1F3B1",
  "1F52E",
  "1FA84",
  "1F3AE",
  "1F579-FE0F",
  "1F579",
  "1F3B0",
  "1F3B2",
  "1F9E9",
  "1F9F8",
  "1FA85",
  "1FAA9",
  "1FA86",
  "2660-FE0F",
  "2660",
  "2665-FE0F",
  "2665",
  "2666-FE0F",
  "2666",
  "2663-FE0F",
  "2663",
  "265F-FE0F",
  "265F",
  "1F0CF",
  "1F004",
  "1F3B4",
  "1F3AD",
  "1F5BC-FE0F",
  "1F5BC",
  "1F3A8",
  "1F9F5",
  "1FAA1",
  "1F9F6",
  "1FAA2"
];
const Objects = [
  "1F453",
  "1F576-FE0F",
  "1F576",
  "1F97D",
  "1F97C",
  "1F9BA",
  "1F454",
  "1F455",
  "1F456",
  "1F9E3",
  "1F9E4",
  "1F9E5",
  "1F9E6",
  "1F457",
  "1F458",
  "1F97B",
  "1FA71",
  "1FA72",
  "1FA73",
  "1F459",
  "1F45A",
  "1FAAD",
  "1F45B",
  "1F45C",
  "1F45D",
  "1F6CD-FE0F",
  "1F6CD",
  "1F392",
  "1FA74",
  "1F45E",
  "1F45F",
  "1F97E",
  "1F97F",
  "1F460",
  "1F461",
  "1FA70",
  "1F462",
  "1FAAE",
  "1F451",
  "1F452",
  "1F3A9",
  "1F393",
  "1F9E2",
  "1FA96",
  "26D1-FE0F",
  "26D1",
  "1F4FF",
  "1F484",
  "1F48D",
  "1F48E",
  "1F507",
  "1F508",
  "1F509",
  "1F50A",
  "1F4E2",
  "1F4E3",
  "1F4EF",
  "1F514",
  "1F515",
  "1F3BC",
  "1F3B5",
  "1F3B6",
  "1F399-FE0F",
  "1F399",
  "1F39A-FE0F",
  "1F39A",
  "1F39B-FE0F",
  "1F39B",
  "1F3A4",
  "1F3A7",
  "1F4FB",
  "1F3B7",
  "1FA97",
  "1F3B8",
  "1F3B9",
  "1F3BA",
  "1F3BB",
  "1FA95",
  "1F941",
  "1FA98",
  "1FA87",
  "1FA88",
  "1FA89",
  "1F4F1",
  "1F4F2",
  "260E-FE0F",
  "260E",
  "1F4DE",
  "1F4DF",
  "1F4E0",
  "1F50B",
  "1FAAB",
  "1F50C",
  "1F4BB",
  "1F5A5-FE0F",
  "1F5A5",
  "1F5A8-FE0F",
  "1F5A8",
  "2328-FE0F",
  "2328",
  "1F5B1-FE0F",
  "1F5B1",
  "1F5B2-FE0F",
  "1F5B2",
  "1F4BD",
  "1F4BE",
  "1F4BF",
  "1F4C0",
  "1F9EE",
  "1F3A5",
  "1F39E-FE0F",
  "1F39E",
  "1F4FD-FE0F",
  "1F4FD",
  "1F3AC",
  "1F4FA",
  "1F4F7",
  "1F4F8",
  "1F4F9",
  "1F4FC",
  "1F50D",
  "1F50E",
  "1F56F-FE0F",
  "1F56F",
  "1F4A1",
  "1F526",
  "1F3EE",
  "1FA94",
  "1F4D4",
  "1F4D5",
  "1F4D6",
  "1F4D7",
  "1F4D8",
  "1F4D9",
  "1F4DA",
  "1F4D3",
  "1F4D2",
  "1F4C3",
  "1F4DC",
  "1F4C4",
  "1F4F0",
  "1F5DE-FE0F",
  "1F5DE",
  "1F4D1",
  "1F516",
  "1F3F7-FE0F",
  "1F3F7",
  "1F4B0",
  "1FA99",
  "1F4B4",
  "1F4B5",
  "1F4B6",
  "1F4B7",
  "1F4B8",
  "1F4B3",
  "1F9FE",
  "1F4B9",
  "2709-FE0F",
  "2709",
  "1F4E7",
  "1F4E8",
  "1F4E9",
  "1F4E4",
  "1F4E5",
  "1F4E6",
  "1F4EB",
  "1F4EA",
  "1F4EC",
  "1F4ED",
  "1F4EE",
  "1F5F3-FE0F",
  "1F5F3",
  "270F-FE0F",
  "270F",
  "2712-FE0F",
  "2712",
  "1F58B-FE0F",
  "1F58B",
  "1F58A-FE0F",
  "1F58A",
  "1F58C-FE0F",
  "1F58C",
  "1F58D-FE0F",
  "1F58D",
  "1F4DD",
  "1F4BC",
  "1F4C1",
  "1F4C2",
  "1F5C2-FE0F",
  "1F5C2",
  "1F4C5",
  "1F4C6",
  "1F5D2-FE0F",
  "1F5D2",
  "1F5D3-FE0F",
  "1F5D3",
  "1F4C7",
  "1F4C8",
  "1F4C9",
  "1F4CA",
  "1F4CB",
  "1F4CC",
  "1F4CD",
  "1F4CE",
  "1F587-FE0F",
  "1F587",
  "1F4CF",
  "1F4D0",
  "2702-FE0F",
  "2702",
  "1F5C3-FE0F",
  "1F5C3",
  "1F5C4-FE0F",
  "1F5C4",
  "1F5D1-FE0F",
  "1F5D1",
  "1F512",
  "1F513",
  "1F50F",
  "1F510",
  "1F511",
  "1F5DD-FE0F",
  "1F5DD",
  "1F528",
  "1FA93",
  "26CF-FE0F",
  "26CF",
  "2692-FE0F",
  "2692",
  "1F6E0-FE0F",
  "1F6E0",
  "1F5E1-FE0F",
  "1F5E1",
  "2694-FE0F",
  "2694",
  "1F4A3",
  "1FA83",
  "1F3F9",
  "1F6E1-FE0F",
  "1F6E1",
  "1FA9A",
  "1F527",
  "1FA9B",
  "1F529",
  "2699-FE0F",
  "2699",
  "1F5DC-FE0F",
  "1F5DC",
  "2696-FE0F",
  "2696",
  "1F9AF",
  "1F517",
  "26D3-FE0F-200D-1F4A5",
  "26D3-200D-1F4A5",
  "26D3-FE0F",
  "26D3",
  "1FA9D",
  "1F9F0",
  "1F9F2",
  "1FA9C",
  "1FA8F",
  "2697-FE0F",
  "2697",
  "1F9EA",
  "1F9EB",
  "1F9EC",
  "1F52C",
  "1F52D",
  "1F4E1",
  "1F489",
  "1FA78",
  "1F48A",
  "1FA79",
  "1FA7C",
  "1FA7A",
  "1FA7B",
  "1F6AA",
  "1F6D7",
  "1FA9E",
  "1FA9F",
  "1F6CF-FE0F",
  "1F6CF",
  "1F6CB-FE0F",
  "1F6CB",
  "1FA91",
  "1F6BD",
  "1FAA0",
  "1F6BF",
  "1F6C1",
  "1FAA4",
  "1FA92",
  "1F9F4",
  "1F9F7",
  "1F9F9",
  "1F9FA",
  "1F9FB",
  "1FAA3",
  "1F9FC",
  "1FAE7",
  "1FAA5",
  "1F9FD",
  "1F9EF",
  "1F6D2",
  "1F6AC",
  "26B0-FE0F",
  "26B0",
  "1FAA6",
  "26B1-FE0F",
  "26B1",
  "1F9FF",
  "1FAAC",
  "1F5FF",
  "1FAA7",
  "1FAAA"
];
const Symbols = [
  "1F3E7",
  "1F6AE",
  "1F6B0",
  "267F",
  "1F6B9",
  "1F6BA",
  "1F6BB",
  "1F6BC",
  "1F6BE",
  "1F6C2",
  "1F6C3",
  "1F6C4",
  "1F6C5",
  "26A0-FE0F",
  "26A0",
  "1F6B8",
  "26D4",
  "1F6AB",
  "1F6B3",
  "1F6AD",
  "1F6AF",
  "1F6B1",
  "1F6B7",
  "1F4F5",
  "1F51E",
  "2622-FE0F",
  "2622",
  "2623-FE0F",
  "2623",
  "2B06-FE0F",
  "2B06",
  "2197-FE0F",
  "2197",
  "27A1-FE0F",
  "27A1",
  "2198-FE0F",
  "2198",
  "2B07-FE0F",
  "2B07",
  "2199-FE0F",
  "2199",
  "2B05-FE0F",
  "2B05",
  "2196-FE0F",
  "2196",
  "2195-FE0F",
  "2195",
  "2194-FE0F",
  "2194",
  "21A9-FE0F",
  "21A9",
  "21AA-FE0F",
  "21AA",
  "2934-FE0F",
  "2934",
  "2935-FE0F",
  "2935",
  "1F503",
  "1F504",
  "1F519",
  "1F51A",
  "1F51B",
  "1F51C",
  "1F51D",
  "1F6D0",
  "269B-FE0F",
  "269B",
  "1F549-FE0F",
  "1F549",
  "2721-FE0F",
  "2721",
  "2638-FE0F",
  "2638",
  "262F-FE0F",
  "262F",
  "271D-FE0F",
  "271D",
  "2626-FE0F",
  "2626",
  "262A-FE0F",
  "262A",
  "262E-FE0F",
  "262E",
  "1F54E",
  "1F52F",
  "1FAAF",
  "2648",
  "2649",
  "264A",
  "264B",
  "264C",
  "264D",
  "264E",
  "264F",
  "2650",
  "2651",
  "2652",
  "2653",
  "26CE",
  "1F500",
  "1F501",
  "1F502",
  "25B6-FE0F",
  "25B6",
  "23E9",
  "23ED-FE0F",
  "23ED",
  "23EF-FE0F",
  "23EF",
  "25C0-FE0F",
  "25C0",
  "23EA",
  "23EE-FE0F",
  "23EE",
  "1F53C",
  "23EB",
  "1F53D",
  "23EC",
  "23F8-FE0F",
  "23F8",
  "23F9-FE0F",
  "23F9",
  "23FA-FE0F",
  "23FA",
  "23CF-FE0F",
  "23CF",
  "1F3A6",
  "1F505",
  "1F506",
  "1F4F6",
  "1F6DC",
  "1F4F3",
  "1F4F4",
  "2640-FE0F",
  "2640",
  "2642-FE0F",
  "2642",
  "26A7-FE0F",
  "26A7",
  "2716-FE0F",
  "2716",
  "2795",
  "2796",
  "2797",
  "1F7F0",
  "267E-FE0F",
  "267E",
  "203C-FE0F",
  "203C",
  "2049-FE0F",
  "2049",
  "2753",
  "2754",
  "2755",
  "2757",
  "3030-FE0F",
  "3030",
  "1F4B1",
  "1F4B2",
  "2695-FE0F",
  "2695",
  "267B-FE0F",
  "267B",
  "269C-FE0F",
  "269C",
  "1F531",
  "1F4DB",
  "1F530",
  "2B55",
  "2705",
  "2611-FE0F",
  "2611",
  "2714-FE0F",
  "2714",
  "274C",
  "274E",
  "27B0",
  "27BF",
  "303D-FE0F",
  "303D",
  "2733-FE0F",
  "2733",
  "2734-FE0F",
  "2734",
  "2747-FE0F",
  "2747",
  "00A9-FE0F",
  "00A9",
  "00AE-FE0F",
  "00AE",
  "2122-FE0F",
  "2122",
  "1FADF",
  "0023-FE0F-20E3",
  "0023-20E3",
  "002A-FE0F-20E3",
  "002A-20E3",
  "0030-FE0F-20E3",
  "0030-20E3",
  "0031-FE0F-20E3",
  "0031-20E3",
  "0032-FE0F-20E3",
  "0032-20E3",
  "0033-FE0F-20E3",
  "0033-20E3",
  "0034-FE0F-20E3",
  "0034-20E3",
  "0035-FE0F-20E3",
  "0035-20E3",
  "0036-FE0F-20E3",
  "0036-20E3",
  "0037-FE0F-20E3",
  "0037-20E3",
  "0038-FE0F-20E3",
  "0038-20E3",
  "0039-FE0F-20E3",
  "0039-20E3",
  "1F51F",
  "1F520",
  "1F521",
  "1F522",
  "1F523",
  "1F524",
  "1F170-FE0F",
  "1F170",
  "1F18E",
  "1F171-FE0F",
  "1F171",
  "1F191",
  "1F192",
  "1F193",
  "2139-FE0F",
  "2139",
  "1F194",
  "24C2-FE0F",
  "24C2",
  "1F195",
  "1F196",
  "1F17E-FE0F",
  "1F17E",
  "1F197",
  "1F17F-FE0F",
  "1F17F",
  "1F198",
  "1F199",
  "1F19A",
  "1F201",
  "1F202-FE0F",
  "1F202",
  "1F237-FE0F",
  "1F237",
  "1F236",
  "1F22F",
  "1F250",
  "1F239",
  "1F21A",
  "1F232",
  "1F251",
  "1F238",
  "1F234",
  "1F233",
  "3297-FE0F",
  "3297",
  "3299-FE0F",
  "3299",
  "1F23A",
  "1F235",
  "1F534",
  "1F7E0",
  "1F7E1",
  "1F7E2",
  "1F535",
  "1F7E3",
  "1F7E4",
  "26AB",
  "26AA",
  "1F7E5",
  "1F7E7",
  "1F7E8",
  "1F7E9",
  "1F7E6",
  "1F7EA",
  "1F7EB",
  "2B1B",
  "2B1C",
  "25FC-FE0F",
  "25FC",
  "25FB-FE0F",
  "25FB",
  "25FE",
  "25FD",
  "25AA-FE0F",
  "25AA",
  "25AB-FE0F",
  "25AB",
  "1F536",
  "1F537",
  "1F538",
  "1F539",
  "1F53A",
  "1F53B",
  "1F4A0",
  "1F518",
  "1F533",
  "1F532"
];
const Flags = [
  "1F3C1",
  "1F6A9",
  "1F38C",
  "1F3F4",
  "1F3F3-FE0F",
  "1F3F3",
  "1F3F3-FE0F-200D-1F308",
  "1F3F3-200D-1F308",
  "1F3F3-FE0F-200D-26A7-FE0F",
  "1F3F3-200D-26A7-FE0F",
  "1F3F3-FE0F-200D-26A7",
  "1F3F3-200D-26A7",
  "1F3F4-200D-2620-FE0F",
  "1F3F4-200D-2620",
  "1F1E6-1F1E8",
  "1F1E6-1F1E9",
  "1F1E6-1F1EA",
  "1F1E6-1F1EB",
  "1F1E6-1F1EC",
  "1F1E6-1F1EE",
  "1F1E6-1F1F1",
  "1F1E6-1F1F2",
  "1F1E6-1F1F4",
  "1F1E6-1F1F6",
  "1F1E6-1F1F7",
  "1F1E6-1F1F8",
  "1F1E6-1F1F9",
  "1F1E6-1F1FA",
  "1F1E6-1F1FC",
  "1F1E6-1F1FD",
  "1F1E6-1F1FF",
  "1F1E7-1F1E6",
  "1F1E7-1F1E7",
  "1F1E7-1F1E9",
  "1F1E7-1F1EA",
  "1F1E7-1F1EB",
  "1F1E7-1F1EC",
  "1F1E7-1F1ED",
  "1F1E7-1F1EE",
  "1F1E7-1F1EF",
  "1F1E7-1F1F1",
  "1F1E7-1F1F2",
  "1F1E7-1F1F3",
  "1F1E7-1F1F4",
  "1F1E7-1F1F6",
  "1F1E7-1F1F7",
  "1F1E7-1F1F8",
  "1F1E7-1F1F9",
  "1F1E7-1F1FB",
  "1F1E7-1F1FC",
  "1F1E7-1F1FE",
  "1F1E7-1F1FF",
  "1F1E8-1F1E6",
  "1F1E8-1F1E8",
  "1F1E8-1F1E9",
  "1F1E8-1F1EB",
  "1F1E8-1F1EC",
  "1F1E8-1F1ED",
  "1F1E8-1F1EE",
  "1F1E8-1F1F0",
  "1F1E8-1F1F1",
  "1F1E8-1F1F2",
  "1F1E8-1F1F3",
  "1F1E8-1F1F4",
  "1F1E8-1F1F5",
  "1F1E8-1F1F6",
  "1F1E8-1F1F7",
  "1F1E8-1F1FA",
  "1F1E8-1F1FB",
  "1F1E8-1F1FC",
  "1F1E8-1F1FD",
  "1F1E8-1F1FE",
  "1F1E8-1F1FF",
  "1F1E9-1F1EA",
  "1F1E9-1F1EC",
  "1F1E9-1F1EF",
  "1F1E9-1F1F0",
  "1F1E9-1F1F2",
  "1F1E9-1F1F4",
  "1F1E9-1F1FF",
  "1F1EA-1F1E6",
  "1F1EA-1F1E8",
  "1F1EA-1F1EA",
  "1F1EA-1F1EC",
  "1F1EA-1F1ED",
  "1F1EA-1F1F7",
  "1F1EA-1F1F8",
  "1F1EA-1F1F9",
  "1F1EA-1F1FA",
  "1F1EB-1F1EE",
  "1F1EB-1F1EF",
  "1F1EB-1F1F0",
  "1F1EB-1F1F2",
  "1F1EB-1F1F4",
  "1F1EB-1F1F7",
  "1F1EC-1F1E6",
  "1F1EC-1F1E7",
  "1F1EC-1F1E9",
  "1F1EC-1F1EA",
  "1F1EC-1F1EB",
  "1F1EC-1F1EC",
  "1F1EC-1F1ED",
  "1F1EC-1F1EE",
  "1F1EC-1F1F1",
  "1F1EC-1F1F2",
  "1F1EC-1F1F3",
  "1F1EC-1F1F5",
  "1F1EC-1F1F6",
  "1F1EC-1F1F7",
  "1F1EC-1F1F8",
  "1F1EC-1F1F9",
  "1F1EC-1F1FA",
  "1F1EC-1F1FC",
  "1F1EC-1F1FE",
  "1F1ED-1F1F0",
  "1F1ED-1F1F2",
  "1F1ED-1F1F3",
  "1F1ED-1F1F7",
  "1F1ED-1F1F9",
  "1F1ED-1F1FA",
  "1F1EE-1F1E8",
  "1F1EE-1F1E9",
  "1F1EE-1F1EA",
  "1F1EE-1F1F1",
  "1F1EE-1F1F2",
  "1F1EE-1F1F3",
  "1F1EE-1F1F4",
  "1F1EE-1F1F6",
  "1F1EE-1F1F7",
  "1F1EE-1F1F8",
  "1F1EE-1F1F9",
  "1F1EF-1F1EA",
  "1F1EF-1F1F2",
  "1F1EF-1F1F4",
  "1F1EF-1F1F5",
  "1F1F0-1F1EA",
  "1F1F0-1F1EC",
  "1F1F0-1F1ED",
  "1F1F0-1F1EE",
  "1F1F0-1F1F2",
  "1F1F0-1F1F3",
  "1F1F0-1F1F5",
  "1F1F0-1F1F7",
  "1F1F0-1F1FC",
  "1F1F0-1F1FE",
  "1F1F0-1F1FF",
  "1F1F1-1F1E6",
  "1F1F1-1F1E7",
  "1F1F1-1F1E8",
  "1F1F1-1F1EE",
  "1F1F1-1F1F0",
  "1F1F1-1F1F7",
  "1F1F1-1F1F8",
  "1F1F1-1F1F9",
  "1F1F1-1F1FA",
  "1F1F1-1F1FB",
  "1F1F1-1F1FE",
  "1F1F2-1F1E6",
  "1F1F2-1F1E8",
  "1F1F2-1F1E9",
  "1F1F2-1F1EA",
  "1F1F2-1F1EB",
  "1F1F2-1F1EC",
  "1F1F2-1F1ED",
  "1F1F2-1F1F0",
  "1F1F2-1F1F1",
  "1F1F2-1F1F2",
  "1F1F2-1F1F3",
  "1F1F2-1F1F4",
  "1F1F2-1F1F5",
  "1F1F2-1F1F6",
  "1F1F2-1F1F7",
  "1F1F2-1F1F8",
  "1F1F2-1F1F9",
  "1F1F2-1F1FA",
  "1F1F2-1F1FB",
  "1F1F2-1F1FC",
  "1F1F2-1F1FD",
  "1F1F2-1F1FE",
  "1F1F2-1F1FF",
  "1F1F3-1F1E6",
  "1F1F3-1F1E8",
  "1F1F3-1F1EA",
  "1F1F3-1F1EB",
  "1F1F3-1F1EC",
  "1F1F3-1F1EE",
  "1F1F3-1F1F1",
  "1F1F3-1F1F4",
  "1F1F3-1F1F5",
  "1F1F3-1F1F7",
  "1F1F3-1F1FA",
  "1F1F3-1F1FF",
  "1F1F4-1F1F2",
  "1F1F5-1F1E6",
  "1F1F5-1F1EA",
  "1F1F5-1F1EB",
  "1F1F5-1F1EC",
  "1F1F5-1F1ED",
  "1F1F5-1F1F0",
  "1F1F5-1F1F1",
  "1F1F5-1F1F2",
  "1F1F5-1F1F3",
  "1F1F5-1F1F7",
  "1F1F5-1F1F8",
  "1F1F5-1F1F9",
  "1F1F5-1F1FC",
  "1F1F5-1F1FE",
  "1F1F6-1F1E6",
  "1F1F7-1F1EA",
  "1F1F7-1F1F4",
  "1F1F7-1F1F8",
  "1F1F7-1F1FA",
  "1F1F7-1F1FC",
  "1F1F8-1F1E6",
  "1F1F8-1F1E7",
  "1F1F8-1F1E8",
  "1F1F8-1F1E9",
  "1F1F8-1F1EA",
  "1F1F8-1F1EC",
  "1F1F8-1F1ED",
  "1F1F8-1F1EE",
  "1F1F8-1F1EF",
  "1F1F8-1F1F0",
  "1F1F8-1F1F1",
  "1F1F8-1F1F2",
  "1F1F8-1F1F3",
  "1F1F8-1F1F4",
  "1F1F8-1F1F7",
  "1F1F8-1F1F8",
  "1F1F8-1F1F9",
  "1F1F8-1F1FB",
  "1F1F8-1F1FD",
  "1F1F8-1F1FE",
  "1F1F8-1F1FF",
  "1F1F9-1F1E6",
  "1F1F9-1F1E8",
  "1F1F9-1F1E9",
  "1F1F9-1F1EB",
  "1F1F9-1F1EC",
  "1F1F9-1F1ED",
  "1F1F9-1F1EF",
  "1F1F9-1F1F0",
  "1F1F9-1F1F1",
  "1F1F9-1F1F2",
  "1F1F9-1F1F3",
  "1F1F9-1F1F4",
  "1F1F9-1F1F7",
  "1F1F9-1F1F9",
  "1F1F9-1F1FB",
  "1F1F9-1F1FC",
  "1F1F9-1F1FF",
  "1F1FA-1F1E6",
  "1F1FA-1F1EC",
  "1F1FA-1F1F2",
  "1F1FA-1F1F3",
  "1F1FA-1F1F8",
  "1F1FA-1F1FE",
  "1F1FA-1F1FF",
  "1F1FB-1F1E6",
  "1F1FB-1F1E8",
  "1F1FB-1F1EA",
  "1F1FB-1F1EC",
  "1F1FB-1F1EE",
  "1F1FB-1F1F3",
  "1F1FB-1F1FA",
  "1F1FC-1F1EB",
  "1F1FC-1F1F8",
  "1F1FD-1F1F0",
  "1F1FE-1F1EA",
  "1F1FE-1F1F9",
  "1F1FF-1F1E6",
  "1F1FF-1F1F2",
  "1F1FF-1F1FC",
  "1F3F4-E0067-E0062-E0065-E006E-E0067-E007F",
  "1F3F4-E0067-E0062-E0073-E0063-E0074-E007F",
  "1F3F4-E0067-E0062-E0077-E006C-E0073-E007F"
];
const emojiGroups = {
  "Smileys & Emotion": [
    "1F600",
    "1F603",
    "1F604",
    "1F601",
    "1F606",
    "1F605",
    "1F923",
    "1F602",
    "1F642",
    "1F643",
    "1FAE0",
    "1F609",
    "1F60A",
    "1F607",
    "1F970",
    "1F60D",
    "1F929",
    "1F618",
    "1F617",
    "263A-FE0F",
    "263A",
    "1F61A",
    "1F619",
    "1F972",
    "1F60B",
    "1F61B",
    "1F61C",
    "1F92A",
    "1F61D",
    "1F911",
    "1F917",
    "1F92D",
    "1FAE2",
    "1FAE3",
    "1F92B",
    "1F914",
    "1FAE1",
    "1F910",
    "1F928",
    "1F610",
    "1F611",
    "1F636",
    "1FAE5",
    "1F636-200D-1F32B-FE0F",
    "1F636-200D-1F32B",
    "1F60F",
    "1F612",
    "1F644",
    "1F62C",
    "1F62E-200D-1F4A8",
    "1F925",
    "1FAE8",
    "1F642-200D-2194-FE0F",
    "1F642-200D-2194",
    "1F642-200D-2195-FE0F",
    "1F642-200D-2195",
    "1F60C",
    "1F614",
    "1F62A",
    "1F924",
    "1F634",
    "1FAE9",
    "1F637",
    "1F912",
    "1F915",
    "1F922",
    "1F92E",
    "1F927",
    "1F975",
    "1F976",
    "1F974",
    "1F635",
    "1F635-200D-1F4AB",
    "1F92F",
    "1F920",
    "1F973",
    "1F978",
    "1F60E",
    "1F913",
    "1F9D0",
    "1F615",
    "1FAE4",
    "1F61F",
    "1F641",
    "2639-FE0F",
    "2639",
    "1F62E",
    "1F62F",
    "1F632",
    "1F633",
    "1F97A",
    "1F979",
    "1F626",
    "1F627",
    "1F628",
    "1F630",
    "1F625",
    "1F622",
    "1F62D",
    "1F631",
    "1F616",
    "1F623",
    "1F61E",
    "1F613",
    "1F629",
    "1F62B",
    "1F971",
    "1F624",
    "1F621",
    "1F620",
    "1F92C",
    "1F608",
    "1F47F",
    "1F480",
    "2620-FE0F",
    "2620",
    "1F4A9",
    "1F921",
    "1F479",
    "1F47A",
    "1F47B",
    "1F47D",
    "1F47E",
    "1F916",
    "1F63A",
    "1F638",
    "1F639",
    "1F63B",
    "1F63C",
    "1F63D",
    "1F640",
    "1F63F",
    "1F63E",
    "1F648",
    "1F649",
    "1F64A",
    "1F48C",
    "1F498",
    "1F49D",
    "1F496",
    "1F497",
    "1F493",
    "1F49E",
    "1F495",
    "1F49F",
    "2763-FE0F",
    "2763",
    "1F494",
    "2764-FE0F-200D-1F525",
    "2764-200D-1F525",
    "2764-FE0F-200D-1FA79",
    "2764-200D-1FA79",
    "2764-FE0F",
    "2764",
    "1FA77",
    "1F9E1",
    "1F49B",
    "1F49A",
    "1F499",
    "1FA75",
    "1F49C",
    "1F90E",
    "1F5A4",
    "1FA76",
    "1F90D",
    "1F48B",
    "1F4AF",
    "1F4A2",
    "1F4A5",
    "1F4AB",
    "1F4A6",
    "1F4A8",
    "1F573-FE0F",
    "1F573",
    "1F4AC",
    "1F441-FE0F-200D-1F5E8-FE0F",
    "1F441-200D-1F5E8-FE0F",
    "1F441-FE0F-200D-1F5E8",
    "1F441-200D-1F5E8",
    "1F5E8-FE0F",
    "1F5E8",
    "1F5EF-FE0F",
    "1F5EF",
    "1F4AD",
    "1F4A4"
  ],
  "People & Body": [
    "1F44B",
    "1F44B-1F3FB",
    "1F44B-1F3FC",
    "1F44B-1F3FD",
    "1F44B-1F3FE",
    "1F44B-1F3FF",
    "1F91A",
    "1F91A-1F3FB",
    "1F91A-1F3FC",
    "1F91A-1F3FD",
    "1F91A-1F3FE",
    "1F91A-1F3FF",
    "1F590-FE0F",
    "1F590",
    "1F590-1F3FB",
    "1F590-1F3FC",
    "1F590-1F3FD",
    "1F590-1F3FE",
    "1F590-1F3FF",
    "270B",
    "270B-1F3FB",
    "270B-1F3FC",
    "270B-1F3FD",
    "270B-1F3FE",
    "270B-1F3FF",
    "1F596",
    "1F596-1F3FB",
    "1F596-1F3FC",
    "1F596-1F3FD",
    "1F596-1F3FE",
    "1F596-1F3FF",
    "1FAF1",
    "1FAF1-1F3FB",
    "1FAF1-1F3FC",
    "1FAF1-1F3FD",
    "1FAF1-1F3FE",
    "1FAF1-1F3FF",
    "1FAF2",
    "1FAF2-1F3FB",
    "1FAF2-1F3FC",
    "1FAF2-1F3FD",
    "1FAF2-1F3FE",
    "1FAF2-1F3FF",
    "1FAF3",
    "1FAF3-1F3FB",
    "1FAF3-1F3FC",
    "1FAF3-1F3FD",
    "1FAF3-1F3FE",
    "1FAF3-1F3FF",
    "1FAF4",
    "1FAF4-1F3FB",
    "1FAF4-1F3FC",
    "1FAF4-1F3FD",
    "1FAF4-1F3FE",
    "1FAF4-1F3FF",
    "1FAF7",
    "1FAF7-1F3FB",
    "1FAF7-1F3FC",
    "1FAF7-1F3FD",
    "1FAF7-1F3FE",
    "1FAF7-1F3FF",
    "1FAF8",
    "1FAF8-1F3FB",
    "1FAF8-1F3FC",
    "1FAF8-1F3FD",
    "1FAF8-1F3FE",
    "1FAF8-1F3FF",
    "1F44C",
    "1F44C-1F3FB",
    "1F44C-1F3FC",
    "1F44C-1F3FD",
    "1F44C-1F3FE",
    "1F44C-1F3FF",
    "1F90C",
    "1F90C-1F3FB",
    "1F90C-1F3FC",
    "1F90C-1F3FD",
    "1F90C-1F3FE",
    "1F90C-1F3FF",
    "1F90F",
    "1F90F-1F3FB",
    "1F90F-1F3FC",
    "1F90F-1F3FD",
    "1F90F-1F3FE",
    "1F90F-1F3FF",
    "270C-FE0F",
    "270C",
    "270C-1F3FB",
    "270C-1F3FC",
    "270C-1F3FD",
    "270C-1F3FE",
    "270C-1F3FF",
    "1F91E",
    "1F91E-1F3FB",
    "1F91E-1F3FC",
    "1F91E-1F3FD",
    "1F91E-1F3FE",
    "1F91E-1F3FF",
    "1FAF0",
    "1FAF0-1F3FB",
    "1FAF0-1F3FC",
    "1FAF0-1F3FD",
    "1FAF0-1F3FE",
    "1FAF0-1F3FF",
    "1F91F",
    "1F91F-1F3FB",
    "1F91F-1F3FC",
    "1F91F-1F3FD",
    "1F91F-1F3FE",
    "1F91F-1F3FF",
    "1F918",
    "1F918-1F3FB",
    "1F918-1F3FC",
    "1F918-1F3FD",
    "1F918-1F3FE",
    "1F918-1F3FF",
    "1F919",
    "1F919-1F3FB",
    "1F919-1F3FC",
    "1F919-1F3FD",
    "1F919-1F3FE",
    "1F919-1F3FF",
    "1F448",
    "1F448-1F3FB",
    "1F448-1F3FC",
    "1F448-1F3FD",
    "1F448-1F3FE",
    "1F448-1F3FF",
    "1F449",
    "1F449-1F3FB",
    "1F449-1F3FC",
    "1F449-1F3FD",
    "1F449-1F3FE",
    "1F449-1F3FF",
    "1F446",
    "1F446-1F3FB",
    "1F446-1F3FC",
    "1F446-1F3FD",
    "1F446-1F3FE",
    "1F446-1F3FF",
    "1F595",
    "1F595-1F3FB",
    "1F595-1F3FC",
    "1F595-1F3FD",
    "1F595-1F3FE",
    "1F595-1F3FF",
    "1F447",
    "1F447-1F3FB",
    "1F447-1F3FC",
    "1F447-1F3FD",
    "1F447-1F3FE",
    "1F447-1F3FF",
    "261D-FE0F",
    "261D",
    "261D-1F3FB",
    "261D-1F3FC",
    "261D-1F3FD",
    "261D-1F3FE",
    "261D-1F3FF",
    "1FAF5",
    "1FAF5-1F3FB",
    "1FAF5-1F3FC",
    "1FAF5-1F3FD",
    "1FAF5-1F3FE",
    "1FAF5-1F3FF",
    "1F44D",
    "1F44D-1F3FB",
    "1F44D-1F3FC",
    "1F44D-1F3FD",
    "1F44D-1F3FE",
    "1F44D-1F3FF",
    "1F44E",
    "1F44E-1F3FB",
    "1F44E-1F3FC",
    "1F44E-1F3FD",
    "1F44E-1F3FE",
    "1F44E-1F3FF",
    "270A",
    "270A-1F3FB",
    "270A-1F3FC",
    "270A-1F3FD",
    "270A-1F3FE",
    "270A-1F3FF",
    "1F44A",
    "1F44A-1F3FB",
    "1F44A-1F3FC",
    "1F44A-1F3FD",
    "1F44A-1F3FE",
    "1F44A-1F3FF",
    "1F91B",
    "1F91B-1F3FB",
    "1F91B-1F3FC",
    "1F91B-1F3FD",
    "1F91B-1F3FE",
    "1F91B-1F3FF",
    "1F91C",
    "1F91C-1F3FB",
    "1F91C-1F3FC",
    "1F91C-1F3FD",
    "1F91C-1F3FE",
    "1F91C-1F3FF",
    "1F44F",
    "1F44F-1F3FB",
    "1F44F-1F3FC",
    "1F44F-1F3FD",
    "1F44F-1F3FE",
    "1F44F-1F3FF",
    "1F64C",
    "1F64C-1F3FB",
    "1F64C-1F3FC",
    "1F64C-1F3FD",
    "1F64C-1F3FE",
    "1F64C-1F3FF",
    "1FAF6",
    "1FAF6-1F3FB",
    "1FAF6-1F3FC",
    "1FAF6-1F3FD",
    "1FAF6-1F3FE",
    "1FAF6-1F3FF",
    "1F450",
    "1F450-1F3FB",
    "1F450-1F3FC",
    "1F450-1F3FD",
    "1F450-1F3FE",
    "1F450-1F3FF",
    "1F932",
    "1F932-1F3FB",
    "1F932-1F3FC",
    "1F932-1F3FD",
    "1F932-1F3FE",
    "1F932-1F3FF",
    "1F91D",
    "1F91D-1F3FB",
    "1F91D-1F3FC",
    "1F91D-1F3FD",
    "1F91D-1F3FE",
    "1F91D-1F3FF",
    "1FAF1-1F3FB-200D-1FAF2-1F3FC",
    "1FAF1-1F3FB-200D-1FAF2-1F3FD",
    "1FAF1-1F3FB-200D-1FAF2-1F3FE",
    "1FAF1-1F3FB-200D-1FAF2-1F3FF",
    "1FAF1-1F3FC-200D-1FAF2-1F3FB",
    "1FAF1-1F3FC-200D-1FAF2-1F3FD",
    "1FAF1-1F3FC-200D-1FAF2-1F3FE",
    "1FAF1-1F3FC-200D-1FAF2-1F3FF",
    "1FAF1-1F3FD-200D-1FAF2-1F3FB",
    "1FAF1-1F3FD-200D-1FAF2-1F3FC",
    "1FAF1-1F3FD-200D-1FAF2-1F3FE",
    "1FAF1-1F3FD-200D-1FAF2-1F3FF",
    "1FAF1-1F3FE-200D-1FAF2-1F3FB",
    "1FAF1-1F3FE-200D-1FAF2-1F3FC",
    "1FAF1-1F3FE-200D-1FAF2-1F3FD",
    "1FAF1-1F3FE-200D-1FAF2-1F3FF",
    "1FAF1-1F3FF-200D-1FAF2-1F3FB",
    "1FAF1-1F3FF-200D-1FAF2-1F3FC",
    "1FAF1-1F3FF-200D-1FAF2-1F3FD",
    "1FAF1-1F3FF-200D-1FAF2-1F3FE",
    "1F64F",
    "1F64F-1F3FB",
    "1F64F-1F3FC",
    "1F64F-1F3FD",
    "1F64F-1F3FE",
    "1F64F-1F3FF",
    "270D-FE0F",
    "270D",
    "270D-1F3FB",
    "270D-1F3FC",
    "270D-1F3FD",
    "270D-1F3FE",
    "270D-1F3FF",
    "1F485",
    "1F485-1F3FB",
    "1F485-1F3FC",
    "1F485-1F3FD",
    "1F485-1F3FE",
    "1F485-1F3FF",
    "1F933",
    "1F933-1F3FB",
    "1F933-1F3FC",
    "1F933-1F3FD",
    "1F933-1F3FE",
    "1F933-1F3FF",
    "1F4AA",
    "1F4AA-1F3FB",
    "1F4AA-1F3FC",
    "1F4AA-1F3FD",
    "1F4AA-1F3FE",
    "1F4AA-1F3FF",
    "1F9BE",
    "1F9BF",
    "1F9B5",
    "1F9B5-1F3FB",
    "1F9B5-1F3FC",
    "1F9B5-1F3FD",
    "1F9B5-1F3FE",
    "1F9B5-1F3FF",
    "1F9B6",
    "1F9B6-1F3FB",
    "1F9B6-1F3FC",
    "1F9B6-1F3FD",
    "1F9B6-1F3FE",
    "1F9B6-1F3FF",
    "1F442",
    "1F442-1F3FB",
    "1F442-1F3FC",
    "1F442-1F3FD",
    "1F442-1F3FE",
    "1F442-1F3FF",
    "1F9BB",
    "1F9BB-1F3FB",
    "1F9BB-1F3FC",
    "1F9BB-1F3FD",
    "1F9BB-1F3FE",
    "1F9BB-1F3FF",
    "1F443",
    "1F443-1F3FB",
    "1F443-1F3FC",
    "1F443-1F3FD",
    "1F443-1F3FE",
    "1F443-1F3FF",
    "1F9E0",
    "1FAC0",
    "1FAC1",
    "1F9B7",
    "1F9B4",
    "1F440",
    "1F441-FE0F",
    "1F441",
    "1F445",
    "1F444",
    "1FAE6",
    "1F476",
    "1F476-1F3FB",
    "1F476-1F3FC",
    "1F476-1F3FD",
    "1F476-1F3FE",
    "1F476-1F3FF",
    "1F9D2",
    "1F9D2-1F3FB",
    "1F9D2-1F3FC",
    "1F9D2-1F3FD",
    "1F9D2-1F3FE",
    "1F9D2-1F3FF",
    "1F466",
    "1F466-1F3FB",
    "1F466-1F3FC",
    "1F466-1F3FD",
    "1F466-1F3FE",
    "1F466-1F3FF",
    "1F467",
    "1F467-1F3FB",
    "1F467-1F3FC",
    "1F467-1F3FD",
    "1F467-1F3FE",
    "1F467-1F3FF",
    "1F9D1",
    "1F9D1-1F3FB",
    "1F9D1-1F3FC",
    "1F9D1-1F3FD",
    "1F9D1-1F3FE",
    "1F9D1-1F3FF",
    "1F471",
    "1F471-1F3FB",
    "1F471-1F3FC",
    "1F471-1F3FD",
    "1F471-1F3FE",
    "1F471-1F3FF",
    "1F468",
    "1F468-1F3FB",
    "1F468-1F3FC",
    "1F468-1F3FD",
    "1F468-1F3FE",
    "1F468-1F3FF",
    "1F9D4",
    "1F9D4-1F3FB",
    "1F9D4-1F3FC",
    "1F9D4-1F3FD",
    "1F9D4-1F3FE",
    "1F9D4-1F3FF",
    "1F9D4-200D-2642-FE0F",
    "1F9D4-200D-2642",
    "1F9D4-1F3FB-200D-2642-FE0F",
    "1F9D4-1F3FB-200D-2642",
    "1F9D4-1F3FC-200D-2642-FE0F",
    "1F9D4-1F3FC-200D-2642",
    "1F9D4-1F3FD-200D-2642-FE0F",
    "1F9D4-1F3FD-200D-2642",
    "1F9D4-1F3FE-200D-2642-FE0F",
    "1F9D4-1F3FE-200D-2642",
    "1F9D4-1F3FF-200D-2642-FE0F",
    "1F9D4-1F3FF-200D-2642",
    "1F9D4-200D-2640-FE0F",
    "1F9D4-200D-2640",
    "1F9D4-1F3FB-200D-2640-FE0F",
    "1F9D4-1F3FB-200D-2640",
    "1F9D4-1F3FC-200D-2640-FE0F",
    "1F9D4-1F3FC-200D-2640",
    "1F9D4-1F3FD-200D-2640-FE0F",
    "1F9D4-1F3FD-200D-2640",
    "1F9D4-1F3FE-200D-2640-FE0F",
    "1F9D4-1F3FE-200D-2640",
    "1F9D4-1F3FF-200D-2640-FE0F",
    "1F9D4-1F3FF-200D-2640",
    "1F468-200D-1F9B0",
    "1F468-1F3FB-200D-1F9B0",
    "1F468-1F3FC-200D-1F9B0",
    "1F468-1F3FD-200D-1F9B0",
    "1F468-1F3FE-200D-1F9B0",
    "1F468-1F3FF-200D-1F9B0",
    "1F468-200D-1F9B1",
    "1F468-1F3FB-200D-1F9B1",
    "1F468-1F3FC-200D-1F9B1",
    "1F468-1F3FD-200D-1F9B1",
    "1F468-1F3FE-200D-1F9B1",
    "1F468-1F3FF-200D-1F9B1",
    "1F468-200D-1F9B3",
    "1F468-1F3FB-200D-1F9B3",
    "1F468-1F3FC-200D-1F9B3",
    "1F468-1F3FD-200D-1F9B3",
    "1F468-1F3FE-200D-1F9B3",
    "1F468-1F3FF-200D-1F9B3",
    "1F468-200D-1F9B2",
    "1F468-1F3FB-200D-1F9B2",
    "1F468-1F3FC-200D-1F9B2",
    "1F468-1F3FD-200D-1F9B2",
    "1F468-1F3FE-200D-1F9B2",
    "1F468-1F3FF-200D-1F9B2",
    "1F469",
    "1F469-1F3FB",
    "1F469-1F3FC",
    "1F469-1F3FD",
    "1F469-1F3FE",
    "1F469-1F3FF",
    "1F469-200D-1F9B0",
    "1F469-1F3FB-200D-1F9B0",
    "1F469-1F3FC-200D-1F9B0",
    "1F469-1F3FD-200D-1F9B0",
    "1F469-1F3FE-200D-1F9B0",
    "1F469-1F3FF-200D-1F9B0",
    "1F9D1-200D-1F9B0",
    "1F9D1-1F3FB-200D-1F9B0",
    "1F9D1-1F3FC-200D-1F9B0",
    "1F9D1-1F3FD-200D-1F9B0",
    "1F9D1-1F3FE-200D-1F9B0",
    "1F9D1-1F3FF-200D-1F9B0",
    "1F469-200D-1F9B1",
    "1F469-1F3FB-200D-1F9B1",
    "1F469-1F3FC-200D-1F9B1",
    "1F469-1F3FD-200D-1F9B1",
    "1F469-1F3FE-200D-1F9B1",
    "1F469-1F3FF-200D-1F9B1",
    "1F9D1-200D-1F9B1",
    "1F9D1-1F3FB-200D-1F9B1",
    "1F9D1-1F3FC-200D-1F9B1",
    "1F9D1-1F3FD-200D-1F9B1",
    "1F9D1-1F3FE-200D-1F9B1",
    "1F9D1-1F3FF-200D-1F9B1",
    "1F469-200D-1F9B3",
    "1F469-1F3FB-200D-1F9B3",
    "1F469-1F3FC-200D-1F9B3",
    "1F469-1F3FD-200D-1F9B3",
    "1F469-1F3FE-200D-1F9B3",
    "1F469-1F3FF-200D-1F9B3",
    "1F9D1-200D-1F9B3",
    "1F9D1-1F3FB-200D-1F9B3",
    "1F9D1-1F3FC-200D-1F9B3",
    "1F9D1-1F3FD-200D-1F9B3",
    "1F9D1-1F3FE-200D-1F9B3",
    "1F9D1-1F3FF-200D-1F9B3",
    "1F469-200D-1F9B2",
    "1F469-1F3FB-200D-1F9B2",
    "1F469-1F3FC-200D-1F9B2",
    "1F469-1F3FD-200D-1F9B2",
    "1F469-1F3FE-200D-1F9B2",
    "1F469-1F3FF-200D-1F9B2",
    "1F9D1-200D-1F9B2",
    "1F9D1-1F3FB-200D-1F9B2",
    "1F9D1-1F3FC-200D-1F9B2",
    "1F9D1-1F3FD-200D-1F9B2",
    "1F9D1-1F3FE-200D-1F9B2",
    "1F9D1-1F3FF-200D-1F9B2",
    "1F471-200D-2640-FE0F",
    "1F471-200D-2640",
    "1F471-1F3FB-200D-2640-FE0F",
    "1F471-1F3FB-200D-2640",
    "1F471-1F3FC-200D-2640-FE0F",
    "1F471-1F3FC-200D-2640",
    "1F471-1F3FD-200D-2640-FE0F",
    "1F471-1F3FD-200D-2640",
    "1F471-1F3FE-200D-2640-FE0F",
    "1F471-1F3FE-200D-2640",
    "1F471-1F3FF-200D-2640-FE0F",
    "1F471-1F3FF-200D-2640",
    "1F471-200D-2642-FE0F",
    "1F471-200D-2642",
    "1F471-1F3FB-200D-2642-FE0F",
    "1F471-1F3FB-200D-2642",
    "1F471-1F3FC-200D-2642-FE0F",
    "1F471-1F3FC-200D-2642",
    "1F471-1F3FD-200D-2642-FE0F",
    "1F471-1F3FD-200D-2642",
    "1F471-1F3FE-200D-2642-FE0F",
    "1F471-1F3FE-200D-2642",
    "1F471-1F3FF-200D-2642-FE0F",
    "1F471-1F3FF-200D-2642",
    "1F9D3",
    "1F9D3-1F3FB",
    "1F9D3-1F3FC",
    "1F9D3-1F3FD",
    "1F9D3-1F3FE",
    "1F9D3-1F3FF",
    "1F474",
    "1F474-1F3FB",
    "1F474-1F3FC",
    "1F474-1F3FD",
    "1F474-1F3FE",
    "1F474-1F3FF",
    "1F475",
    "1F475-1F3FB",
    "1F475-1F3FC",
    "1F475-1F3FD",
    "1F475-1F3FE",
    "1F475-1F3FF",
    "1F64D",
    "1F64D-1F3FB",
    "1F64D-1F3FC",
    "1F64D-1F3FD",
    "1F64D-1F3FE",
    "1F64D-1F3FF",
    "1F64D-200D-2642-FE0F",
    "1F64D-200D-2642",
    "1F64D-1F3FB-200D-2642-FE0F",
    "1F64D-1F3FB-200D-2642",
    "1F64D-1F3FC-200D-2642-FE0F",
    "1F64D-1F3FC-200D-2642",
    "1F64D-1F3FD-200D-2642-FE0F",
    "1F64D-1F3FD-200D-2642",
    "1F64D-1F3FE-200D-2642-FE0F",
    "1F64D-1F3FE-200D-2642",
    "1F64D-1F3FF-200D-2642-FE0F",
    "1F64D-1F3FF-200D-2642",
    "1F64D-200D-2640-FE0F",
    "1F64D-200D-2640",
    "1F64D-1F3FB-200D-2640-FE0F",
    "1F64D-1F3FB-200D-2640",
    "1F64D-1F3FC-200D-2640-FE0F",
    "1F64D-1F3FC-200D-2640",
    "1F64D-1F3FD-200D-2640-FE0F",
    "1F64D-1F3FD-200D-2640",
    "1F64D-1F3FE-200D-2640-FE0F",
    "1F64D-1F3FE-200D-2640",
    "1F64D-1F3FF-200D-2640-FE0F",
    "1F64D-1F3FF-200D-2640",
    "1F64E",
    "1F64E-1F3FB",
    "1F64E-1F3FC",
    "1F64E-1F3FD",
    "1F64E-1F3FE",
    "1F64E-1F3FF",
    "1F64E-200D-2642-FE0F",
    "1F64E-200D-2642",
    "1F64E-1F3FB-200D-2642-FE0F",
    "1F64E-1F3FB-200D-2642",
    "1F64E-1F3FC-200D-2642-FE0F",
    "1F64E-1F3FC-200D-2642",
    "1F64E-1F3FD-200D-2642-FE0F",
    "1F64E-1F3FD-200D-2642",
    "1F64E-1F3FE-200D-2642-FE0F",
    "1F64E-1F3FE-200D-2642",
    "1F64E-1F3FF-200D-2642-FE0F",
    "1F64E-1F3FF-200D-2642",
    "1F64E-200D-2640-FE0F",
    "1F64E-200D-2640",
    "1F64E-1F3FB-200D-2640-FE0F",
    "1F64E-1F3FB-200D-2640",
    "1F64E-1F3FC-200D-2640-FE0F",
    "1F64E-1F3FC-200D-2640",
    "1F64E-1F3FD-200D-2640-FE0F",
    "1F64E-1F3FD-200D-2640",
    "1F64E-1F3FE-200D-2640-FE0F",
    "1F64E-1F3FE-200D-2640",
    "1F64E-1F3FF-200D-2640-FE0F",
    "1F64E-1F3FF-200D-2640",
    "1F645",
    "1F645-1F3FB",
    "1F645-1F3FC",
    "1F645-1F3FD",
    "1F645-1F3FE",
    "1F645-1F3FF",
    "1F645-200D-2642-FE0F",
    "1F645-200D-2642",
    "1F645-1F3FB-200D-2642-FE0F",
    "1F645-1F3FB-200D-2642",
    "1F645-1F3FC-200D-2642-FE0F",
    "1F645-1F3FC-200D-2642",
    "1F645-1F3FD-200D-2642-FE0F",
    "1F645-1F3FD-200D-2642",
    "1F645-1F3FE-200D-2642-FE0F",
    "1F645-1F3FE-200D-2642",
    "1F645-1F3FF-200D-2642-FE0F",
    "1F645-1F3FF-200D-2642",
    "1F645-200D-2640-FE0F",
    "1F645-200D-2640",
    "1F645-1F3FB-200D-2640-FE0F",
    "1F645-1F3FB-200D-2640",
    "1F645-1F3FC-200D-2640-FE0F",
    "1F645-1F3FC-200D-2640",
    "1F645-1F3FD-200D-2640-FE0F",
    "1F645-1F3FD-200D-2640",
    "1F645-1F3FE-200D-2640-FE0F",
    "1F645-1F3FE-200D-2640",
    "1F645-1F3FF-200D-2640-FE0F",
    "1F645-1F3FF-200D-2640",
    "1F646",
    "1F646-1F3FB",
    "1F646-1F3FC",
    "1F646-1F3FD",
    "1F646-1F3FE",
    "1F646-1F3FF",
    "1F646-200D-2642-FE0F",
    "1F646-200D-2642",
    "1F646-1F3FB-200D-2642-FE0F",
    "1F646-1F3FB-200D-2642",
    "1F646-1F3FC-200D-2642-FE0F",
    "1F646-1F3FC-200D-2642",
    "1F646-1F3FD-200D-2642-FE0F",
    "1F646-1F3FD-200D-2642",
    "1F646-1F3FE-200D-2642-FE0F",
    "1F646-1F3FE-200D-2642",
    "1F646-1F3FF-200D-2642-FE0F",
    "1F646-1F3FF-200D-2642",
    "1F646-200D-2640-FE0F",
    "1F646-200D-2640",
    "1F646-1F3FB-200D-2640-FE0F",
    "1F646-1F3FB-200D-2640",
    "1F646-1F3FC-200D-2640-FE0F",
    "1F646-1F3FC-200D-2640",
    "1F646-1F3FD-200D-2640-FE0F",
    "1F646-1F3FD-200D-2640",
    "1F646-1F3FE-200D-2640-FE0F",
    "1F646-1F3FE-200D-2640",
    "1F646-1F3FF-200D-2640-FE0F",
    "1F646-1F3FF-200D-2640",
    "1F481",
    "1F481-1F3FB",
    "1F481-1F3FC",
    "1F481-1F3FD",
    "1F481-1F3FE",
    "1F481-1F3FF",
    "1F481-200D-2642-FE0F",
    "1F481-200D-2642",
    "1F481-1F3FB-200D-2642-FE0F",
    "1F481-1F3FB-200D-2642",
    "1F481-1F3FC-200D-2642-FE0F",
    "1F481-1F3FC-200D-2642",
    "1F481-1F3FD-200D-2642-FE0F",
    "1F481-1F3FD-200D-2642",
    "1F481-1F3FE-200D-2642-FE0F",
    "1F481-1F3FE-200D-2642",
    "1F481-1F3FF-200D-2642-FE0F",
    "1F481-1F3FF-200D-2642",
    "1F481-200D-2640-FE0F",
    "1F481-200D-2640",
    "1F481-1F3FB-200D-2640-FE0F",
    "1F481-1F3FB-200D-2640",
    "1F481-1F3FC-200D-2640-FE0F",
    "1F481-1F3FC-200D-2640",
    "1F481-1F3FD-200D-2640-FE0F",
    "1F481-1F3FD-200D-2640",
    "1F481-1F3FE-200D-2640-FE0F",
    "1F481-1F3FE-200D-2640",
    "1F481-1F3FF-200D-2640-FE0F",
    "1F481-1F3FF-200D-2640",
    "1F64B",
    "1F64B-1F3FB",
    "1F64B-1F3FC",
    "1F64B-1F3FD",
    "1F64B-1F3FE",
    "1F64B-1F3FF",
    "1F64B-200D-2642-FE0F",
    "1F64B-200D-2642",
    "1F64B-1F3FB-200D-2642-FE0F",
    "1F64B-1F3FB-200D-2642",
    "1F64B-1F3FC-200D-2642-FE0F",
    "1F64B-1F3FC-200D-2642",
    "1F64B-1F3FD-200D-2642-FE0F",
    "1F64B-1F3FD-200D-2642",
    "1F64B-1F3FE-200D-2642-FE0F",
    "1F64B-1F3FE-200D-2642",
    "1F64B-1F3FF-200D-2642-FE0F",
    "1F64B-1F3FF-200D-2642",
    "1F64B-200D-2640-FE0F",
    "1F64B-200D-2640",
    "1F64B-1F3FB-200D-2640-FE0F",
    "1F64B-1F3FB-200D-2640",
    "1F64B-1F3FC-200D-2640-FE0F",
    "1F64B-1F3FC-200D-2640",
    "1F64B-1F3FD-200D-2640-FE0F",
    "1F64B-1F3FD-200D-2640",
    "1F64B-1F3FE-200D-2640-FE0F",
    "1F64B-1F3FE-200D-2640",
    "1F64B-1F3FF-200D-2640-FE0F",
    "1F64B-1F3FF-200D-2640",
    "1F9CF",
    "1F9CF-1F3FB",
    "1F9CF-1F3FC",
    "1F9CF-1F3FD",
    "1F9CF-1F3FE",
    "1F9CF-1F3FF",
    "1F9CF-200D-2642-FE0F",
    "1F9CF-200D-2642",
    "1F9CF-1F3FB-200D-2642-FE0F",
    "1F9CF-1F3FB-200D-2642",
    "1F9CF-1F3FC-200D-2642-FE0F",
    "1F9CF-1F3FC-200D-2642",
    "1F9CF-1F3FD-200D-2642-FE0F",
    "1F9CF-1F3FD-200D-2642",
    "1F9CF-1F3FE-200D-2642-FE0F",
    "1F9CF-1F3FE-200D-2642",
    "1F9CF-1F3FF-200D-2642-FE0F",
    "1F9CF-1F3FF-200D-2642",
    "1F9CF-200D-2640-FE0F",
    "1F9CF-200D-2640",
    "1F9CF-1F3FB-200D-2640-FE0F",
    "1F9CF-1F3FB-200D-2640",
    "1F9CF-1F3FC-200D-2640-FE0F",
    "1F9CF-1F3FC-200D-2640",
    "1F9CF-1F3FD-200D-2640-FE0F",
    "1F9CF-1F3FD-200D-2640",
    "1F9CF-1F3FE-200D-2640-FE0F",
    "1F9CF-1F3FE-200D-2640",
    "1F9CF-1F3FF-200D-2640-FE0F",
    "1F9CF-1F3FF-200D-2640",
    "1F647",
    "1F647-1F3FB",
    "1F647-1F3FC",
    "1F647-1F3FD",
    "1F647-1F3FE",
    "1F647-1F3FF",
    "1F647-200D-2642-FE0F",
    "1F647-200D-2642",
    "1F647-1F3FB-200D-2642-FE0F",
    "1F647-1F3FB-200D-2642",
    "1F647-1F3FC-200D-2642-FE0F",
    "1F647-1F3FC-200D-2642",
    "1F647-1F3FD-200D-2642-FE0F",
    "1F647-1F3FD-200D-2642",
    "1F647-1F3FE-200D-2642-FE0F",
    "1F647-1F3FE-200D-2642",
    "1F647-1F3FF-200D-2642-FE0F",
    "1F647-1F3FF-200D-2642",
    "1F647-200D-2640-FE0F",
    "1F647-200D-2640",
    "1F647-1F3FB-200D-2640-FE0F",
    "1F647-1F3FB-200D-2640",
    "1F647-1F3FC-200D-2640-FE0F",
    "1F647-1F3FC-200D-2640",
    "1F647-1F3FD-200D-2640-FE0F",
    "1F647-1F3FD-200D-2640",
    "1F647-1F3FE-200D-2640-FE0F",
    "1F647-1F3FE-200D-2640",
    "1F647-1F3FF-200D-2640-FE0F",
    "1F647-1F3FF-200D-2640",
    "1F926",
    "1F926-1F3FB",
    "1F926-1F3FC",
    "1F926-1F3FD",
    "1F926-1F3FE",
    "1F926-1F3FF",
    "1F926-200D-2642-FE0F",
    "1F926-200D-2642",
    "1F926-1F3FB-200D-2642-FE0F",
    "1F926-1F3FB-200D-2642",
    "1F926-1F3FC-200D-2642-FE0F",
    "1F926-1F3FC-200D-2642",
    "1F926-1F3FD-200D-2642-FE0F",
    "1F926-1F3FD-200D-2642",
    "1F926-1F3FE-200D-2642-FE0F",
    "1F926-1F3FE-200D-2642",
    "1F926-1F3FF-200D-2642-FE0F",
    "1F926-1F3FF-200D-2642",
    "1F926-200D-2640-FE0F",
    "1F926-200D-2640",
    "1F926-1F3FB-200D-2640-FE0F",
    "1F926-1F3FB-200D-2640",
    "1F926-1F3FC-200D-2640-FE0F",
    "1F926-1F3FC-200D-2640",
    "1F926-1F3FD-200D-2640-FE0F",
    "1F926-1F3FD-200D-2640",
    "1F926-1F3FE-200D-2640-FE0F",
    "1F926-1F3FE-200D-2640",
    "1F926-1F3FF-200D-2640-FE0F",
    "1F926-1F3FF-200D-2640",
    "1F937",
    "1F937-1F3FB",
    "1F937-1F3FC",
    "1F937-1F3FD",
    "1F937-1F3FE",
    "1F937-1F3FF",
    "1F937-200D-2642-FE0F",
    "1F937-200D-2642",
    "1F937-1F3FB-200D-2642-FE0F",
    "1F937-1F3FB-200D-2642",
    "1F937-1F3FC-200D-2642-FE0F",
    "1F937-1F3FC-200D-2642",
    "1F937-1F3FD-200D-2642-FE0F",
    "1F937-1F3FD-200D-2642",
    "1F937-1F3FE-200D-2642-FE0F",
    "1F937-1F3FE-200D-2642",
    "1F937-1F3FF-200D-2642-FE0F",
    "1F937-1F3FF-200D-2642",
    "1F937-200D-2640-FE0F",
    "1F937-200D-2640",
    "1F937-1F3FB-200D-2640-FE0F",
    "1F937-1F3FB-200D-2640",
    "1F937-1F3FC-200D-2640-FE0F",
    "1F937-1F3FC-200D-2640",
    "1F937-1F3FD-200D-2640-FE0F",
    "1F937-1F3FD-200D-2640",
    "1F937-1F3FE-200D-2640-FE0F",
    "1F937-1F3FE-200D-2640",
    "1F937-1F3FF-200D-2640-FE0F",
    "1F937-1F3FF-200D-2640",
    "1F9D1-200D-2695-FE0F",
    "1F9D1-200D-2695",
    "1F9D1-1F3FB-200D-2695-FE0F",
    "1F9D1-1F3FB-200D-2695",
    "1F9D1-1F3FC-200D-2695-FE0F",
    "1F9D1-1F3FC-200D-2695",
    "1F9D1-1F3FD-200D-2695-FE0F",
    "1F9D1-1F3FD-200D-2695",
    "1F9D1-1F3FE-200D-2695-FE0F",
    "1F9D1-1F3FE-200D-2695",
    "1F9D1-1F3FF-200D-2695-FE0F",
    "1F9D1-1F3FF-200D-2695",
    "1F468-200D-2695-FE0F",
    "1F468-200D-2695",
    "1F468-1F3FB-200D-2695-FE0F",
    "1F468-1F3FB-200D-2695",
    "1F468-1F3FC-200D-2695-FE0F",
    "1F468-1F3FC-200D-2695",
    "1F468-1F3FD-200D-2695-FE0F",
    "1F468-1F3FD-200D-2695",
    "1F468-1F3FE-200D-2695-FE0F",
    "1F468-1F3FE-200D-2695",
    "1F468-1F3FF-200D-2695-FE0F",
    "1F468-1F3FF-200D-2695",
    "1F469-200D-2695-FE0F",
    "1F469-200D-2695",
    "1F469-1F3FB-200D-2695-FE0F",
    "1F469-1F3FB-200D-2695",
    "1F469-1F3FC-200D-2695-FE0F",
    "1F469-1F3FC-200D-2695",
    "1F469-1F3FD-200D-2695-FE0F",
    "1F469-1F3FD-200D-2695",
    "1F469-1F3FE-200D-2695-FE0F",
    "1F469-1F3FE-200D-2695",
    "1F469-1F3FF-200D-2695-FE0F",
    "1F469-1F3FF-200D-2695",
    "1F9D1-200D-1F393",
    "1F9D1-1F3FB-200D-1F393",
    "1F9D1-1F3FC-200D-1F393",
    "1F9D1-1F3FD-200D-1F393",
    "1F9D1-1F3FE-200D-1F393",
    "1F9D1-1F3FF-200D-1F393",
    "1F468-200D-1F393",
    "1F468-1F3FB-200D-1F393",
    "1F468-1F3FC-200D-1F393",
    "1F468-1F3FD-200D-1F393",
    "1F468-1F3FE-200D-1F393",
    "1F468-1F3FF-200D-1F393",
    "1F469-200D-1F393",
    "1F469-1F3FB-200D-1F393",
    "1F469-1F3FC-200D-1F393",
    "1F469-1F3FD-200D-1F393",
    "1F469-1F3FE-200D-1F393",
    "1F469-1F3FF-200D-1F393",
    "1F9D1-200D-1F3EB",
    "1F9D1-1F3FB-200D-1F3EB",
    "1F9D1-1F3FC-200D-1F3EB",
    "1F9D1-1F3FD-200D-1F3EB",
    "1F9D1-1F3FE-200D-1F3EB",
    "1F9D1-1F3FF-200D-1F3EB",
    "1F468-200D-1F3EB",
    "1F468-1F3FB-200D-1F3EB",
    "1F468-1F3FC-200D-1F3EB",
    "1F468-1F3FD-200D-1F3EB",
    "1F468-1F3FE-200D-1F3EB",
    "1F468-1F3FF-200D-1F3EB",
    "1F469-200D-1F3EB",
    "1F469-1F3FB-200D-1F3EB",
    "1F469-1F3FC-200D-1F3EB",
    "1F469-1F3FD-200D-1F3EB",
    "1F469-1F3FE-200D-1F3EB",
    "1F469-1F3FF-200D-1F3EB",
    "1F9D1-200D-2696-FE0F",
    "1F9D1-200D-2696",
    "1F9D1-1F3FB-200D-2696-FE0F",
    "1F9D1-1F3FB-200D-2696",
    "1F9D1-1F3FC-200D-2696-FE0F",
    "1F9D1-1F3FC-200D-2696",
    "1F9D1-1F3FD-200D-2696-FE0F",
    "1F9D1-1F3FD-200D-2696",
    "1F9D1-1F3FE-200D-2696-FE0F",
    "1F9D1-1F3FE-200D-2696",
    "1F9D1-1F3FF-200D-2696-FE0F",
    "1F9D1-1F3FF-200D-2696",
    "1F468-200D-2696-FE0F",
    "1F468-200D-2696",
    "1F468-1F3FB-200D-2696-FE0F",
    "1F468-1F3FB-200D-2696",
    "1F468-1F3FC-200D-2696-FE0F",
    "1F468-1F3FC-200D-2696",
    "1F468-1F3FD-200D-2696-FE0F",
    "1F468-1F3FD-200D-2696",
    "1F468-1F3FE-200D-2696-FE0F",
    "1F468-1F3FE-200D-2696",
    "1F468-1F3FF-200D-2696-FE0F",
    "1F468-1F3FF-200D-2696",
    "1F469-200D-2696-FE0F",
    "1F469-200D-2696",
    "1F469-1F3FB-200D-2696-FE0F",
    "1F469-1F3FB-200D-2696",
    "1F469-1F3FC-200D-2696-FE0F",
    "1F469-1F3FC-200D-2696",
    "1F469-1F3FD-200D-2696-FE0F",
    "1F469-1F3FD-200D-2696",
    "1F469-1F3FE-200D-2696-FE0F",
    "1F469-1F3FE-200D-2696",
    "1F469-1F3FF-200D-2696-FE0F",
    "1F469-1F3FF-200D-2696",
    "1F9D1-200D-1F33E",
    "1F9D1-1F3FB-200D-1F33E",
    "1F9D1-1F3FC-200D-1F33E",
    "1F9D1-1F3FD-200D-1F33E",
    "1F9D1-1F3FE-200D-1F33E",
    "1F9D1-1F3FF-200D-1F33E",
    "1F468-200D-1F33E",
    "1F468-1F3FB-200D-1F33E",
    "1F468-1F3FC-200D-1F33E",
    "1F468-1F3FD-200D-1F33E",
    "1F468-1F3FE-200D-1F33E",
    "1F468-1F3FF-200D-1F33E",
    "1F469-200D-1F33E",
    "1F469-1F3FB-200D-1F33E",
    "1F469-1F3FC-200D-1F33E",
    "1F469-1F3FD-200D-1F33E",
    "1F469-1F3FE-200D-1F33E",
    "1F469-1F3FF-200D-1F33E",
    "1F9D1-200D-1F373",
    "1F9D1-1F3FB-200D-1F373",
    "1F9D1-1F3FC-200D-1F373",
    "1F9D1-1F3FD-200D-1F373",
    "1F9D1-1F3FE-200D-1F373",
    "1F9D1-1F3FF-200D-1F373",
    "1F468-200D-1F373",
    "1F468-1F3FB-200D-1F373",
    "1F468-1F3FC-200D-1F373",
    "1F468-1F3FD-200D-1F373",
    "1F468-1F3FE-200D-1F373",
    "1F468-1F3FF-200D-1F373",
    "1F469-200D-1F373",
    "1F469-1F3FB-200D-1F373",
    "1F469-1F3FC-200D-1F373",
    "1F469-1F3FD-200D-1F373",
    "1F469-1F3FE-200D-1F373",
    "1F469-1F3FF-200D-1F373",
    "1F9D1-200D-1F527",
    "1F9D1-1F3FB-200D-1F527",
    "1F9D1-1F3FC-200D-1F527",
    "1F9D1-1F3FD-200D-1F527",
    "1F9D1-1F3FE-200D-1F527",
    "1F9D1-1F3FF-200D-1F527",
    "1F468-200D-1F527",
    "1F468-1F3FB-200D-1F527",
    "1F468-1F3FC-200D-1F527",
    "1F468-1F3FD-200D-1F527",
    "1F468-1F3FE-200D-1F527",
    "1F468-1F3FF-200D-1F527",
    "1F469-200D-1F527",
    "1F469-1F3FB-200D-1F527",
    "1F469-1F3FC-200D-1F527",
    "1F469-1F3FD-200D-1F527",
    "1F469-1F3FE-200D-1F527",
    "1F469-1F3FF-200D-1F527",
    "1F9D1-200D-1F3ED",
    "1F9D1-1F3FB-200D-1F3ED",
    "1F9D1-1F3FC-200D-1F3ED",
    "1F9D1-1F3FD-200D-1F3ED",
    "1F9D1-1F3FE-200D-1F3ED",
    "1F9D1-1F3FF-200D-1F3ED",
    "1F468-200D-1F3ED",
    "1F468-1F3FB-200D-1F3ED",
    "1F468-1F3FC-200D-1F3ED",
    "1F468-1F3FD-200D-1F3ED",
    "1F468-1F3FE-200D-1F3ED",
    "1F468-1F3FF-200D-1F3ED",
    "1F469-200D-1F3ED",
    "1F469-1F3FB-200D-1F3ED",
    "1F469-1F3FC-200D-1F3ED",
    "1F469-1F3FD-200D-1F3ED",
    "1F469-1F3FE-200D-1F3ED",
    "1F469-1F3FF-200D-1F3ED",
    "1F9D1-200D-1F4BC",
    "1F9D1-1F3FB-200D-1F4BC",
    "1F9D1-1F3FC-200D-1F4BC",
    "1F9D1-1F3FD-200D-1F4BC",
    "1F9D1-1F3FE-200D-1F4BC",
    "1F9D1-1F3FF-200D-1F4BC",
    "1F468-200D-1F4BC",
    "1F468-1F3FB-200D-1F4BC",
    "1F468-1F3FC-200D-1F4BC",
    "1F468-1F3FD-200D-1F4BC",
    "1F468-1F3FE-200D-1F4BC",
    "1F468-1F3FF-200D-1F4BC",
    "1F469-200D-1F4BC",
    "1F469-1F3FB-200D-1F4BC",
    "1F469-1F3FC-200D-1F4BC",
    "1F469-1F3FD-200D-1F4BC",
    "1F469-1F3FE-200D-1F4BC",
    "1F469-1F3FF-200D-1F4BC",
    "1F9D1-200D-1F52C",
    "1F9D1-1F3FB-200D-1F52C",
    "1F9D1-1F3FC-200D-1F52C",
    "1F9D1-1F3FD-200D-1F52C",
    "1F9D1-1F3FE-200D-1F52C",
    "1F9D1-1F3FF-200D-1F52C",
    "1F468-200D-1F52C",
    "1F468-1F3FB-200D-1F52C",
    "1F468-1F3FC-200D-1F52C",
    "1F468-1F3FD-200D-1F52C",
    "1F468-1F3FE-200D-1F52C",
    "1F468-1F3FF-200D-1F52C",
    "1F469-200D-1F52C",
    "1F469-1F3FB-200D-1F52C",
    "1F469-1F3FC-200D-1F52C",
    "1F469-1F3FD-200D-1F52C",
    "1F469-1F3FE-200D-1F52C",
    "1F469-1F3FF-200D-1F52C",
    "1F9D1-200D-1F4BB",
    "1F9D1-1F3FB-200D-1F4BB",
    "1F9D1-1F3FC-200D-1F4BB",
    "1F9D1-1F3FD-200D-1F4BB",
    "1F9D1-1F3FE-200D-1F4BB",
    "1F9D1-1F3FF-200D-1F4BB",
    "1F468-200D-1F4BB",
    "1F468-1F3FB-200D-1F4BB",
    "1F468-1F3FC-200D-1F4BB",
    "1F468-1F3FD-200D-1F4BB",
    "1F468-1F3FE-200D-1F4BB",
    "1F468-1F3FF-200D-1F4BB",
    "1F469-200D-1F4BB",
    "1F469-1F3FB-200D-1F4BB",
    "1F469-1F3FC-200D-1F4BB",
    "1F469-1F3FD-200D-1F4BB",
    "1F469-1F3FE-200D-1F4BB",
    "1F469-1F3FF-200D-1F4BB",
    "1F9D1-200D-1F3A4",
    "1F9D1-1F3FB-200D-1F3A4",
    "1F9D1-1F3FC-200D-1F3A4",
    "1F9D1-1F3FD-200D-1F3A4",
    "1F9D1-1F3FE-200D-1F3A4",
    "1F9D1-1F3FF-200D-1F3A4",
    "1F468-200D-1F3A4",
    "1F468-1F3FB-200D-1F3A4",
    "1F468-1F3FC-200D-1F3A4",
    "1F468-1F3FD-200D-1F3A4",
    "1F468-1F3FE-200D-1F3A4",
    "1F468-1F3FF-200D-1F3A4",
    "1F469-200D-1F3A4",
    "1F469-1F3FB-200D-1F3A4",
    "1F469-1F3FC-200D-1F3A4",
    "1F469-1F3FD-200D-1F3A4",
    "1F469-1F3FE-200D-1F3A4",
    "1F469-1F3FF-200D-1F3A4",
    "1F9D1-200D-1F3A8",
    "1F9D1-1F3FB-200D-1F3A8",
    "1F9D1-1F3FC-200D-1F3A8",
    "1F9D1-1F3FD-200D-1F3A8",
    "1F9D1-1F3FE-200D-1F3A8",
    "1F9D1-1F3FF-200D-1F3A8",
    "1F468-200D-1F3A8",
    "1F468-1F3FB-200D-1F3A8",
    "1F468-1F3FC-200D-1F3A8",
    "1F468-1F3FD-200D-1F3A8",
    "1F468-1F3FE-200D-1F3A8",
    "1F468-1F3FF-200D-1F3A8",
    "1F469-200D-1F3A8",
    "1F469-1F3FB-200D-1F3A8",
    "1F469-1F3FC-200D-1F3A8",
    "1F469-1F3FD-200D-1F3A8",
    "1F469-1F3FE-200D-1F3A8",
    "1F469-1F3FF-200D-1F3A8",
    "1F9D1-200D-2708-FE0F",
    "1F9D1-200D-2708",
    "1F9D1-1F3FB-200D-2708-FE0F",
    "1F9D1-1F3FB-200D-2708",
    "1F9D1-1F3FC-200D-2708-FE0F",
    "1F9D1-1F3FC-200D-2708",
    "1F9D1-1F3FD-200D-2708-FE0F",
    "1F9D1-1F3FD-200D-2708",
    "1F9D1-1F3FE-200D-2708-FE0F",
    "1F9D1-1F3FE-200D-2708",
    "1F9D1-1F3FF-200D-2708-FE0F",
    "1F9D1-1F3FF-200D-2708",
    "1F468-200D-2708-FE0F",
    "1F468-200D-2708",
    "1F468-1F3FB-200D-2708-FE0F",
    "1F468-1F3FB-200D-2708",
    "1F468-1F3FC-200D-2708-FE0F",
    "1F468-1F3FC-200D-2708",
    "1F468-1F3FD-200D-2708-FE0F",
    "1F468-1F3FD-200D-2708",
    "1F468-1F3FE-200D-2708-FE0F",
    "1F468-1F3FE-200D-2708",
    "1F468-1F3FF-200D-2708-FE0F",
    "1F468-1F3FF-200D-2708",
    "1F469-200D-2708-FE0F",
    "1F469-200D-2708",
    "1F469-1F3FB-200D-2708-FE0F",
    "1F469-1F3FB-200D-2708",
    "1F469-1F3FC-200D-2708-FE0F",
    "1F469-1F3FC-200D-2708",
    "1F469-1F3FD-200D-2708-FE0F",
    "1F469-1F3FD-200D-2708",
    "1F469-1F3FE-200D-2708-FE0F",
    "1F469-1F3FE-200D-2708",
    "1F469-1F3FF-200D-2708-FE0F",
    "1F469-1F3FF-200D-2708",
    "1F9D1-200D-1F680",
    "1F9D1-1F3FB-200D-1F680",
    "1F9D1-1F3FC-200D-1F680",
    "1F9D1-1F3FD-200D-1F680",
    "1F9D1-1F3FE-200D-1F680",
    "1F9D1-1F3FF-200D-1F680",
    "1F468-200D-1F680",
    "1F468-1F3FB-200D-1F680",
    "1F468-1F3FC-200D-1F680",
    "1F468-1F3FD-200D-1F680",
    "1F468-1F3FE-200D-1F680",
    "1F468-1F3FF-200D-1F680",
    "1F469-200D-1F680",
    "1F469-1F3FB-200D-1F680",
    "1F469-1F3FC-200D-1F680",
    "1F469-1F3FD-200D-1F680",
    "1F469-1F3FE-200D-1F680",
    "1F469-1F3FF-200D-1F680",
    "1F9D1-200D-1F692",
    "1F9D1-1F3FB-200D-1F692",
    "1F9D1-1F3FC-200D-1F692",
    "1F9D1-1F3FD-200D-1F692",
    "1F9D1-1F3FE-200D-1F692",
    "1F9D1-1F3FF-200D-1F692",
    "1F468-200D-1F692",
    "1F468-1F3FB-200D-1F692",
    "1F468-1F3FC-200D-1F692",
    "1F468-1F3FD-200D-1F692",
    "1F468-1F3FE-200D-1F692",
    "1F468-1F3FF-200D-1F692",
    "1F469-200D-1F692",
    "1F469-1F3FB-200D-1F692",
    "1F469-1F3FC-200D-1F692",
    "1F469-1F3FD-200D-1F692",
    "1F469-1F3FE-200D-1F692",
    "1F469-1F3FF-200D-1F692",
    "1F46E",
    "1F46E-1F3FB",
    "1F46E-1F3FC",
    "1F46E-1F3FD",
    "1F46E-1F3FE",
    "1F46E-1F3FF",
    "1F46E-200D-2642-FE0F",
    "1F46E-200D-2642",
    "1F46E-1F3FB-200D-2642-FE0F",
    "1F46E-1F3FB-200D-2642",
    "1F46E-1F3FC-200D-2642-FE0F",
    "1F46E-1F3FC-200D-2642",
    "1F46E-1F3FD-200D-2642-FE0F",
    "1F46E-1F3FD-200D-2642",
    "1F46E-1F3FE-200D-2642-FE0F",
    "1F46E-1F3FE-200D-2642",
    "1F46E-1F3FF-200D-2642-FE0F",
    "1F46E-1F3FF-200D-2642",
    "1F46E-200D-2640-FE0F",
    "1F46E-200D-2640",
    "1F46E-1F3FB-200D-2640-FE0F",
    "1F46E-1F3FB-200D-2640",
    "1F46E-1F3FC-200D-2640-FE0F",
    "1F46E-1F3FC-200D-2640",
    "1F46E-1F3FD-200D-2640-FE0F",
    "1F46E-1F3FD-200D-2640",
    "1F46E-1F3FE-200D-2640-FE0F",
    "1F46E-1F3FE-200D-2640",
    "1F46E-1F3FF-200D-2640-FE0F",
    "1F46E-1F3FF-200D-2640",
    "1F575-FE0F",
    "1F575",
    "1F575-1F3FB",
    "1F575-1F3FC",
    "1F575-1F3FD",
    "1F575-1F3FE",
    "1F575-1F3FF",
    "1F575-FE0F-200D-2642-FE0F",
    "1F575-200D-2642-FE0F",
    "1F575-FE0F-200D-2642",
    "1F575-200D-2642",
    "1F575-1F3FB-200D-2642-FE0F",
    "1F575-1F3FB-200D-2642",
    "1F575-1F3FC-200D-2642-FE0F",
    "1F575-1F3FC-200D-2642",
    "1F575-1F3FD-200D-2642-FE0F",
    "1F575-1F3FD-200D-2642",
    "1F575-1F3FE-200D-2642-FE0F",
    "1F575-1F3FE-200D-2642",
    "1F575-1F3FF-200D-2642-FE0F",
    "1F575-1F3FF-200D-2642",
    "1F575-FE0F-200D-2640-FE0F",
    "1F575-200D-2640-FE0F",
    "1F575-FE0F-200D-2640",
    "1F575-200D-2640",
    "1F575-1F3FB-200D-2640-FE0F",
    "1F575-1F3FB-200D-2640",
    "1F575-1F3FC-200D-2640-FE0F",
    "1F575-1F3FC-200D-2640",
    "1F575-1F3FD-200D-2640-FE0F",
    "1F575-1F3FD-200D-2640",
    "1F575-1F3FE-200D-2640-FE0F",
    "1F575-1F3FE-200D-2640",
    "1F575-1F3FF-200D-2640-FE0F",
    "1F575-1F3FF-200D-2640",
    "1F482",
    "1F482-1F3FB",
    "1F482-1F3FC",
    "1F482-1F3FD",
    "1F482-1F3FE",
    "1F482-1F3FF",
    "1F482-200D-2642-FE0F",
    "1F482-200D-2642",
    "1F482-1F3FB-200D-2642-FE0F",
    "1F482-1F3FB-200D-2642",
    "1F482-1F3FC-200D-2642-FE0F",
    "1F482-1F3FC-200D-2642",
    "1F482-1F3FD-200D-2642-FE0F",
    "1F482-1F3FD-200D-2642",
    "1F482-1F3FE-200D-2642-FE0F",
    "1F482-1F3FE-200D-2642",
    "1F482-1F3FF-200D-2642-FE0F",
    "1F482-1F3FF-200D-2642",
    "1F482-200D-2640-FE0F",
    "1F482-200D-2640",
    "1F482-1F3FB-200D-2640-FE0F",
    "1F482-1F3FB-200D-2640",
    "1F482-1F3FC-200D-2640-FE0F",
    "1F482-1F3FC-200D-2640",
    "1F482-1F3FD-200D-2640-FE0F",
    "1F482-1F3FD-200D-2640",
    "1F482-1F3FE-200D-2640-FE0F",
    "1F482-1F3FE-200D-2640",
    "1F482-1F3FF-200D-2640-FE0F",
    "1F482-1F3FF-200D-2640",
    "1F977",
    "1F977-1F3FB",
    "1F977-1F3FC",
    "1F977-1F3FD",
    "1F977-1F3FE",
    "1F977-1F3FF",
    "1F477",
    "1F477-1F3FB",
    "1F477-1F3FC",
    "1F477-1F3FD",
    "1F477-1F3FE",
    "1F477-1F3FF",
    "1F477-200D-2642-FE0F",
    "1F477-200D-2642",
    "1F477-1F3FB-200D-2642-FE0F",
    "1F477-1F3FB-200D-2642",
    "1F477-1F3FC-200D-2642-FE0F",
    "1F477-1F3FC-200D-2642",
    "1F477-1F3FD-200D-2642-FE0F",
    "1F477-1F3FD-200D-2642",
    "1F477-1F3FE-200D-2642-FE0F",
    "1F477-1F3FE-200D-2642",
    "1F477-1F3FF-200D-2642-FE0F",
    "1F477-1F3FF-200D-2642",
    "1F477-200D-2640-FE0F",
    "1F477-200D-2640",
    "1F477-1F3FB-200D-2640-FE0F",
    "1F477-1F3FB-200D-2640",
    "1F477-1F3FC-200D-2640-FE0F",
    "1F477-1F3FC-200D-2640",
    "1F477-1F3FD-200D-2640-FE0F",
    "1F477-1F3FD-200D-2640",
    "1F477-1F3FE-200D-2640-FE0F",
    "1F477-1F3FE-200D-2640",
    "1F477-1F3FF-200D-2640-FE0F",
    "1F477-1F3FF-200D-2640",
    "1FAC5",
    "1FAC5-1F3FB",
    "1FAC5-1F3FC",
    "1FAC5-1F3FD",
    "1FAC5-1F3FE",
    "1FAC5-1F3FF",
    "1F934",
    "1F934-1F3FB",
    "1F934-1F3FC",
    "1F934-1F3FD",
    "1F934-1F3FE",
    "1F934-1F3FF",
    "1F478",
    "1F478-1F3FB",
    "1F478-1F3FC",
    "1F478-1F3FD",
    "1F478-1F3FE",
    "1F478-1F3FF",
    "1F473",
    "1F473-1F3FB",
    "1F473-1F3FC",
    "1F473-1F3FD",
    "1F473-1F3FE",
    "1F473-1F3FF",
    "1F473-200D-2642-FE0F",
    "1F473-200D-2642",
    "1F473-1F3FB-200D-2642-FE0F",
    "1F473-1F3FB-200D-2642",
    "1F473-1F3FC-200D-2642-FE0F",
    "1F473-1F3FC-200D-2642",
    "1F473-1F3FD-200D-2642-FE0F",
    "1F473-1F3FD-200D-2642",
    "1F473-1F3FE-200D-2642-FE0F",
    "1F473-1F3FE-200D-2642",
    "1F473-1F3FF-200D-2642-FE0F",
    "1F473-1F3FF-200D-2642",
    "1F473-200D-2640-FE0F",
    "1F473-200D-2640",
    "1F473-1F3FB-200D-2640-FE0F",
    "1F473-1F3FB-200D-2640",
    "1F473-1F3FC-200D-2640-FE0F",
    "1F473-1F3FC-200D-2640",
    "1F473-1F3FD-200D-2640-FE0F",
    "1F473-1F3FD-200D-2640",
    "1F473-1F3FE-200D-2640-FE0F",
    "1F473-1F3FE-200D-2640",
    "1F473-1F3FF-200D-2640-FE0F",
    "1F473-1F3FF-200D-2640",
    "1F472",
    "1F472-1F3FB",
    "1F472-1F3FC",
    "1F472-1F3FD",
    "1F472-1F3FE",
    "1F472-1F3FF",
    "1F9D5",
    "1F9D5-1F3FB",
    "1F9D5-1F3FC",
    "1F9D5-1F3FD",
    "1F9D5-1F3FE",
    "1F9D5-1F3FF",
    "1F935",
    "1F935-1F3FB",
    "1F935-1F3FC",
    "1F935-1F3FD",
    "1F935-1F3FE",
    "1F935-1F3FF",
    "1F935-200D-2642-FE0F",
    "1F935-200D-2642",
    "1F935-1F3FB-200D-2642-FE0F",
    "1F935-1F3FB-200D-2642",
    "1F935-1F3FC-200D-2642-FE0F",
    "1F935-1F3FC-200D-2642",
    "1F935-1F3FD-200D-2642-FE0F",
    "1F935-1F3FD-200D-2642",
    "1F935-1F3FE-200D-2642-FE0F",
    "1F935-1F3FE-200D-2642",
    "1F935-1F3FF-200D-2642-FE0F",
    "1F935-1F3FF-200D-2642",
    "1F935-200D-2640-FE0F",
    "1F935-200D-2640",
    "1F935-1F3FB-200D-2640-FE0F",
    "1F935-1F3FB-200D-2640",
    "1F935-1F3FC-200D-2640-FE0F",
    "1F935-1F3FC-200D-2640",
    "1F935-1F3FD-200D-2640-FE0F",
    "1F935-1F3FD-200D-2640",
    "1F935-1F3FE-200D-2640-FE0F",
    "1F935-1F3FE-200D-2640",
    "1F935-1F3FF-200D-2640-FE0F",
    "1F935-1F3FF-200D-2640",
    "1F470",
    "1F470-1F3FB",
    "1F470-1F3FC",
    "1F470-1F3FD",
    "1F470-1F3FE",
    "1F470-1F3FF",
    "1F470-200D-2642-FE0F",
    "1F470-200D-2642",
    "1F470-1F3FB-200D-2642-FE0F",
    "1F470-1F3FB-200D-2642",
    "1F470-1F3FC-200D-2642-FE0F",
    "1F470-1F3FC-200D-2642",
    "1F470-1F3FD-200D-2642-FE0F",
    "1F470-1F3FD-200D-2642",
    "1F470-1F3FE-200D-2642-FE0F",
    "1F470-1F3FE-200D-2642",
    "1F470-1F3FF-200D-2642-FE0F",
    "1F470-1F3FF-200D-2642",
    "1F470-200D-2640-FE0F",
    "1F470-200D-2640",
    "1F470-1F3FB-200D-2640-FE0F",
    "1F470-1F3FB-200D-2640",
    "1F470-1F3FC-200D-2640-FE0F",
    "1F470-1F3FC-200D-2640",
    "1F470-1F3FD-200D-2640-FE0F",
    "1F470-1F3FD-200D-2640",
    "1F470-1F3FE-200D-2640-FE0F",
    "1F470-1F3FE-200D-2640",
    "1F470-1F3FF-200D-2640-FE0F",
    "1F470-1F3FF-200D-2640",
    "1F930",
    "1F930-1F3FB",
    "1F930-1F3FC",
    "1F930-1F3FD",
    "1F930-1F3FE",
    "1F930-1F3FF",
    "1FAC3",
    "1FAC3-1F3FB",
    "1FAC3-1F3FC",
    "1FAC3-1F3FD",
    "1FAC3-1F3FE",
    "1FAC3-1F3FF",
    "1FAC4",
    "1FAC4-1F3FB",
    "1FAC4-1F3FC",
    "1FAC4-1F3FD",
    "1FAC4-1F3FE",
    "1FAC4-1F3FF",
    "1F931",
    "1F931-1F3FB",
    "1F931-1F3FC",
    "1F931-1F3FD",
    "1F931-1F3FE",
    "1F931-1F3FF",
    "1F469-200D-1F37C",
    "1F469-1F3FB-200D-1F37C",
    "1F469-1F3FC-200D-1F37C",
    "1F469-1F3FD-200D-1F37C",
    "1F469-1F3FE-200D-1F37C",
    "1F469-1F3FF-200D-1F37C",
    "1F468-200D-1F37C",
    "1F468-1F3FB-200D-1F37C",
    "1F468-1F3FC-200D-1F37C",
    "1F468-1F3FD-200D-1F37C",
    "1F468-1F3FE-200D-1F37C",
    "1F468-1F3FF-200D-1F37C",
    "1F9D1-200D-1F37C",
    "1F9D1-1F3FB-200D-1F37C",
    "1F9D1-1F3FC-200D-1F37C",
    "1F9D1-1F3FD-200D-1F37C",
    "1F9D1-1F3FE-200D-1F37C",
    "1F9D1-1F3FF-200D-1F37C",
    "1F47C",
    "1F47C-1F3FB",
    "1F47C-1F3FC",
    "1F47C-1F3FD",
    "1F47C-1F3FE",
    "1F47C-1F3FF",
    "1F385",
    "1F385-1F3FB",
    "1F385-1F3FC",
    "1F385-1F3FD",
    "1F385-1F3FE",
    "1F385-1F3FF",
    "1F936",
    "1F936-1F3FB",
    "1F936-1F3FC",
    "1F936-1F3FD",
    "1F936-1F3FE",
    "1F936-1F3FF",
    "1F9D1-200D-1F384",
    "1F9D1-1F3FB-200D-1F384",
    "1F9D1-1F3FC-200D-1F384",
    "1F9D1-1F3FD-200D-1F384",
    "1F9D1-1F3FE-200D-1F384",
    "1F9D1-1F3FF-200D-1F384",
    "1F9B8",
    "1F9B8-1F3FB",
    "1F9B8-1F3FC",
    "1F9B8-1F3FD",
    "1F9B8-1F3FE",
    "1F9B8-1F3FF",
    "1F9B8-200D-2642-FE0F",
    "1F9B8-200D-2642",
    "1F9B8-1F3FB-200D-2642-FE0F",
    "1F9B8-1F3FB-200D-2642",
    "1F9B8-1F3FC-200D-2642-FE0F",
    "1F9B8-1F3FC-200D-2642",
    "1F9B8-1F3FD-200D-2642-FE0F",
    "1F9B8-1F3FD-200D-2642",
    "1F9B8-1F3FE-200D-2642-FE0F",
    "1F9B8-1F3FE-200D-2642",
    "1F9B8-1F3FF-200D-2642-FE0F",
    "1F9B8-1F3FF-200D-2642",
    "1F9B8-200D-2640-FE0F",
    "1F9B8-200D-2640",
    "1F9B8-1F3FB-200D-2640-FE0F",
    "1F9B8-1F3FB-200D-2640",
    "1F9B8-1F3FC-200D-2640-FE0F",
    "1F9B8-1F3FC-200D-2640",
    "1F9B8-1F3FD-200D-2640-FE0F",
    "1F9B8-1F3FD-200D-2640",
    "1F9B8-1F3FE-200D-2640-FE0F",
    "1F9B8-1F3FE-200D-2640",
    "1F9B8-1F3FF-200D-2640-FE0F",
    "1F9B8-1F3FF-200D-2640",
    "1F9B9",
    "1F9B9-1F3FB",
    "1F9B9-1F3FC",
    "1F9B9-1F3FD",
    "1F9B9-1F3FE",
    "1F9B9-1F3FF",
    "1F9B9-200D-2642-FE0F",
    "1F9B9-200D-2642",
    "1F9B9-1F3FB-200D-2642-FE0F",
    "1F9B9-1F3FB-200D-2642",
    "1F9B9-1F3FC-200D-2642-FE0F",
    "1F9B9-1F3FC-200D-2642",
    "1F9B9-1F3FD-200D-2642-FE0F",
    "1F9B9-1F3FD-200D-2642",
    "1F9B9-1F3FE-200D-2642-FE0F",
    "1F9B9-1F3FE-200D-2642",
    "1F9B9-1F3FF-200D-2642-FE0F",
    "1F9B9-1F3FF-200D-2642",
    "1F9B9-200D-2640-FE0F",
    "1F9B9-200D-2640",
    "1F9B9-1F3FB-200D-2640-FE0F",
    "1F9B9-1F3FB-200D-2640",
    "1F9B9-1F3FC-200D-2640-FE0F",
    "1F9B9-1F3FC-200D-2640",
    "1F9B9-1F3FD-200D-2640-FE0F",
    "1F9B9-1F3FD-200D-2640",
    "1F9B9-1F3FE-200D-2640-FE0F",
    "1F9B9-1F3FE-200D-2640",
    "1F9B9-1F3FF-200D-2640-FE0F",
    "1F9B9-1F3FF-200D-2640",
    "1F9D9",
    "1F9D9-1F3FB",
    "1F9D9-1F3FC",
    "1F9D9-1F3FD",
    "1F9D9-1F3FE",
    "1F9D9-1F3FF",
    "1F9D9-200D-2642-FE0F",
    "1F9D9-200D-2642",
    "1F9D9-1F3FB-200D-2642-FE0F",
    "1F9D9-1F3FB-200D-2642",
    "1F9D9-1F3FC-200D-2642-FE0F",
    "1F9D9-1F3FC-200D-2642",
    "1F9D9-1F3FD-200D-2642-FE0F",
    "1F9D9-1F3FD-200D-2642",
    "1F9D9-1F3FE-200D-2642-FE0F",
    "1F9D9-1F3FE-200D-2642",
    "1F9D9-1F3FF-200D-2642-FE0F",
    "1F9D9-1F3FF-200D-2642",
    "1F9D9-200D-2640-FE0F",
    "1F9D9-200D-2640",
    "1F9D9-1F3FB-200D-2640-FE0F",
    "1F9D9-1F3FB-200D-2640",
    "1F9D9-1F3FC-200D-2640-FE0F",
    "1F9D9-1F3FC-200D-2640",
    "1F9D9-1F3FD-200D-2640-FE0F",
    "1F9D9-1F3FD-200D-2640",
    "1F9D9-1F3FE-200D-2640-FE0F",
    "1F9D9-1F3FE-200D-2640",
    "1F9D9-1F3FF-200D-2640-FE0F",
    "1F9D9-1F3FF-200D-2640",
    "1F9DA",
    "1F9DA-1F3FB",
    "1F9DA-1F3FC",
    "1F9DA-1F3FD",
    "1F9DA-1F3FE",
    "1F9DA-1F3FF",
    "1F9DA-200D-2642-FE0F",
    "1F9DA-200D-2642",
    "1F9DA-1F3FB-200D-2642-FE0F",
    "1F9DA-1F3FB-200D-2642",
    "1F9DA-1F3FC-200D-2642-FE0F",
    "1F9DA-1F3FC-200D-2642",
    "1F9DA-1F3FD-200D-2642-FE0F",
    "1F9DA-1F3FD-200D-2642",
    "1F9DA-1F3FE-200D-2642-FE0F",
    "1F9DA-1F3FE-200D-2642",
    "1F9DA-1F3FF-200D-2642-FE0F",
    "1F9DA-1F3FF-200D-2642",
    "1F9DA-200D-2640-FE0F",
    "1F9DA-200D-2640",
    "1F9DA-1F3FB-200D-2640-FE0F",
    "1F9DA-1F3FB-200D-2640",
    "1F9DA-1F3FC-200D-2640-FE0F",
    "1F9DA-1F3FC-200D-2640",
    "1F9DA-1F3FD-200D-2640-FE0F",
    "1F9DA-1F3FD-200D-2640",
    "1F9DA-1F3FE-200D-2640-FE0F",
    "1F9DA-1F3FE-200D-2640",
    "1F9DA-1F3FF-200D-2640-FE0F",
    "1F9DA-1F3FF-200D-2640",
    "1F9DB",
    "1F9DB-1F3FB",
    "1F9DB-1F3FC",
    "1F9DB-1F3FD",
    "1F9DB-1F3FE",
    "1F9DB-1F3FF",
    "1F9DB-200D-2642-FE0F",
    "1F9DB-200D-2642",
    "1F9DB-1F3FB-200D-2642-FE0F",
    "1F9DB-1F3FB-200D-2642",
    "1F9DB-1F3FC-200D-2642-FE0F",
    "1F9DB-1F3FC-200D-2642",
    "1F9DB-1F3FD-200D-2642-FE0F",
    "1F9DB-1F3FD-200D-2642",
    "1F9DB-1F3FE-200D-2642-FE0F",
    "1F9DB-1F3FE-200D-2642",
    "1F9DB-1F3FF-200D-2642-FE0F",
    "1F9DB-1F3FF-200D-2642",
    "1F9DB-200D-2640-FE0F",
    "1F9DB-200D-2640",
    "1F9DB-1F3FB-200D-2640-FE0F",
    "1F9DB-1F3FB-200D-2640",
    "1F9DB-1F3FC-200D-2640-FE0F",
    "1F9DB-1F3FC-200D-2640",
    "1F9DB-1F3FD-200D-2640-FE0F",
    "1F9DB-1F3FD-200D-2640",
    "1F9DB-1F3FE-200D-2640-FE0F",
    "1F9DB-1F3FE-200D-2640",
    "1F9DB-1F3FF-200D-2640-FE0F",
    "1F9DB-1F3FF-200D-2640",
    "1F9DC",
    "1F9DC-1F3FB",
    "1F9DC-1F3FC",
    "1F9DC-1F3FD",
    "1F9DC-1F3FE",
    "1F9DC-1F3FF",
    "1F9DC-200D-2642-FE0F",
    "1F9DC-200D-2642",
    "1F9DC-1F3FB-200D-2642-FE0F",
    "1F9DC-1F3FB-200D-2642",
    "1F9DC-1F3FC-200D-2642-FE0F",
    "1F9DC-1F3FC-200D-2642",
    "1F9DC-1F3FD-200D-2642-FE0F",
    "1F9DC-1F3FD-200D-2642",
    "1F9DC-1F3FE-200D-2642-FE0F",
    "1F9DC-1F3FE-200D-2642",
    "1F9DC-1F3FF-200D-2642-FE0F",
    "1F9DC-1F3FF-200D-2642",
    "1F9DC-200D-2640-FE0F",
    "1F9DC-200D-2640",
    "1F9DC-1F3FB-200D-2640-FE0F",
    "1F9DC-1F3FB-200D-2640",
    "1F9DC-1F3FC-200D-2640-FE0F",
    "1F9DC-1F3FC-200D-2640",
    "1F9DC-1F3FD-200D-2640-FE0F",
    "1F9DC-1F3FD-200D-2640",
    "1F9DC-1F3FE-200D-2640-FE0F",
    "1F9DC-1F3FE-200D-2640",
    "1F9DC-1F3FF-200D-2640-FE0F",
    "1F9DC-1F3FF-200D-2640",
    "1F9DD",
    "1F9DD-1F3FB",
    "1F9DD-1F3FC",
    "1F9DD-1F3FD",
    "1F9DD-1F3FE",
    "1F9DD-1F3FF",
    "1F9DD-200D-2642-FE0F",
    "1F9DD-200D-2642",
    "1F9DD-1F3FB-200D-2642-FE0F",
    "1F9DD-1F3FB-200D-2642",
    "1F9DD-1F3FC-200D-2642-FE0F",
    "1F9DD-1F3FC-200D-2642",
    "1F9DD-1F3FD-200D-2642-FE0F",
    "1F9DD-1F3FD-200D-2642",
    "1F9DD-1F3FE-200D-2642-FE0F",
    "1F9DD-1F3FE-200D-2642",
    "1F9DD-1F3FF-200D-2642-FE0F",
    "1F9DD-1F3FF-200D-2642",
    "1F9DD-200D-2640-FE0F",
    "1F9DD-200D-2640",
    "1F9DD-1F3FB-200D-2640-FE0F",
    "1F9DD-1F3FB-200D-2640",
    "1F9DD-1F3FC-200D-2640-FE0F",
    "1F9DD-1F3FC-200D-2640",
    "1F9DD-1F3FD-200D-2640-FE0F",
    "1F9DD-1F3FD-200D-2640",
    "1F9DD-1F3FE-200D-2640-FE0F",
    "1F9DD-1F3FE-200D-2640",
    "1F9DD-1F3FF-200D-2640-FE0F",
    "1F9DD-1F3FF-200D-2640",
    "1F9DE",
    "1F9DE-200D-2642-FE0F",
    "1F9DE-200D-2642",
    "1F9DE-200D-2640-FE0F",
    "1F9DE-200D-2640",
    "1F9DF",
    "1F9DF-200D-2642-FE0F",
    "1F9DF-200D-2642",
    "1F9DF-200D-2640-FE0F",
    "1F9DF-200D-2640",
    "1F9CC",
    "1F486",
    "1F486-1F3FB",
    "1F486-1F3FC",
    "1F486-1F3FD",
    "1F486-1F3FE",
    "1F486-1F3FF",
    "1F486-200D-2642-FE0F",
    "1F486-200D-2642",
    "1F486-1F3FB-200D-2642-FE0F",
    "1F486-1F3FB-200D-2642",
    "1F486-1F3FC-200D-2642-FE0F",
    "1F486-1F3FC-200D-2642",
    "1F486-1F3FD-200D-2642-FE0F",
    "1F486-1F3FD-200D-2642",
    "1F486-1F3FE-200D-2642-FE0F",
    "1F486-1F3FE-200D-2642",
    "1F486-1F3FF-200D-2642-FE0F",
    "1F486-1F3FF-200D-2642",
    "1F486-200D-2640-FE0F",
    "1F486-200D-2640",
    "1F486-1F3FB-200D-2640-FE0F",
    "1F486-1F3FB-200D-2640",
    "1F486-1F3FC-200D-2640-FE0F",
    "1F486-1F3FC-200D-2640",
    "1F486-1F3FD-200D-2640-FE0F",
    "1F486-1F3FD-200D-2640",
    "1F486-1F3FE-200D-2640-FE0F",
    "1F486-1F3FE-200D-2640",
    "1F486-1F3FF-200D-2640-FE0F",
    "1F486-1F3FF-200D-2640",
    "1F487",
    "1F487-1F3FB",
    "1F487-1F3FC",
    "1F487-1F3FD",
    "1F487-1F3FE",
    "1F487-1F3FF",
    "1F487-200D-2642-FE0F",
    "1F487-200D-2642",
    "1F487-1F3FB-200D-2642-FE0F",
    "1F487-1F3FB-200D-2642",
    "1F487-1F3FC-200D-2642-FE0F",
    "1F487-1F3FC-200D-2642",
    "1F487-1F3FD-200D-2642-FE0F",
    "1F487-1F3FD-200D-2642",
    "1F487-1F3FE-200D-2642-FE0F",
    "1F487-1F3FE-200D-2642",
    "1F487-1F3FF-200D-2642-FE0F",
    "1F487-1F3FF-200D-2642",
    "1F487-200D-2640-FE0F",
    "1F487-200D-2640",
    "1F487-1F3FB-200D-2640-FE0F",
    "1F487-1F3FB-200D-2640",
    "1F487-1F3FC-200D-2640-FE0F",
    "1F487-1F3FC-200D-2640",
    "1F487-1F3FD-200D-2640-FE0F",
    "1F487-1F3FD-200D-2640",
    "1F487-1F3FE-200D-2640-FE0F",
    "1F487-1F3FE-200D-2640",
    "1F487-1F3FF-200D-2640-FE0F",
    "1F487-1F3FF-200D-2640",
    "1F6B6",
    "1F6B6-1F3FB",
    "1F6B6-1F3FC",
    "1F6B6-1F3FD",
    "1F6B6-1F3FE",
    "1F6B6-1F3FF",
    "1F6B6-200D-2642-FE0F",
    "1F6B6-200D-2642",
    "1F6B6-1F3FB-200D-2642-FE0F",
    "1F6B6-1F3FB-200D-2642",
    "1F6B6-1F3FC-200D-2642-FE0F",
    "1F6B6-1F3FC-200D-2642",
    "1F6B6-1F3FD-200D-2642-FE0F",
    "1F6B6-1F3FD-200D-2642",
    "1F6B6-1F3FE-200D-2642-FE0F",
    "1F6B6-1F3FE-200D-2642",
    "1F6B6-1F3FF-200D-2642-FE0F",
    "1F6B6-1F3FF-200D-2642",
    "1F6B6-200D-2640-FE0F",
    "1F6B6-200D-2640",
    "1F6B6-1F3FB-200D-2640-FE0F",
    "1F6B6-1F3FB-200D-2640",
    "1F6B6-1F3FC-200D-2640-FE0F",
    "1F6B6-1F3FC-200D-2640",
    "1F6B6-1F3FD-200D-2640-FE0F",
    "1F6B6-1F3FD-200D-2640",
    "1F6B6-1F3FE-200D-2640-FE0F",
    "1F6B6-1F3FE-200D-2640",
    "1F6B6-1F3FF-200D-2640-FE0F",
    "1F6B6-1F3FF-200D-2640",
    "1F6B6-200D-27A1-FE0F",
    "1F6B6-200D-27A1",
    "1F6B6-1F3FB-200D-27A1-FE0F",
    "1F6B6-1F3FB-200D-27A1",
    "1F6B6-1F3FC-200D-27A1-FE0F",
    "1F6B6-1F3FC-200D-27A1",
    "1F6B6-1F3FD-200D-27A1-FE0F",
    "1F6B6-1F3FD-200D-27A1",
    "1F6B6-1F3FE-200D-27A1-FE0F",
    "1F6B6-1F3FE-200D-27A1",
    "1F6B6-1F3FF-200D-27A1-FE0F",
    "1F6B6-1F3FF-200D-27A1",
    "1F6B6-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-200D-2640-200D-27A1-FE0F",
    "1F6B6-200D-2640-FE0F-200D-27A1",
    "1F6B6-200D-2640-200D-27A1",
    "1F6B6-1F3FB-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FB-200D-2640-200D-27A1-FE0F",
    "1F6B6-1F3FB-200D-2640-FE0F-200D-27A1",
    "1F6B6-1F3FB-200D-2640-200D-27A1",
    "1F6B6-1F3FC-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FC-200D-2640-200D-27A1-FE0F",
    "1F6B6-1F3FC-200D-2640-FE0F-200D-27A1",
    "1F6B6-1F3FC-200D-2640-200D-27A1",
    "1F6B6-1F3FD-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FD-200D-2640-200D-27A1-FE0F",
    "1F6B6-1F3FD-200D-2640-FE0F-200D-27A1",
    "1F6B6-1F3FD-200D-2640-200D-27A1",
    "1F6B6-1F3FE-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FE-200D-2640-200D-27A1-FE0F",
    "1F6B6-1F3FE-200D-2640-FE0F-200D-27A1",
    "1F6B6-1F3FE-200D-2640-200D-27A1",
    "1F6B6-1F3FF-200D-2640-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FF-200D-2640-200D-27A1-FE0F",
    "1F6B6-1F3FF-200D-2640-FE0F-200D-27A1",
    "1F6B6-1F3FF-200D-2640-200D-27A1",
    "1F6B6-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-200D-2642-200D-27A1-FE0F",
    "1F6B6-200D-2642-FE0F-200D-27A1",
    "1F6B6-200D-2642-200D-27A1",
    "1F6B6-1F3FB-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FB-200D-2642-200D-27A1-FE0F",
    "1F6B6-1F3FB-200D-2642-FE0F-200D-27A1",
    "1F6B6-1F3FB-200D-2642-200D-27A1",
    "1F6B6-1F3FC-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FC-200D-2642-200D-27A1-FE0F",
    "1F6B6-1F3FC-200D-2642-FE0F-200D-27A1",
    "1F6B6-1F3FC-200D-2642-200D-27A1",
    "1F6B6-1F3FD-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FD-200D-2642-200D-27A1-FE0F",
    "1F6B6-1F3FD-200D-2642-FE0F-200D-27A1",
    "1F6B6-1F3FD-200D-2642-200D-27A1",
    "1F6B6-1F3FE-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FE-200D-2642-200D-27A1-FE0F",
    "1F6B6-1F3FE-200D-2642-FE0F-200D-27A1",
    "1F6B6-1F3FE-200D-2642-200D-27A1",
    "1F6B6-1F3FF-200D-2642-FE0F-200D-27A1-FE0F",
    "1F6B6-1F3FF-200D-2642-200D-27A1-FE0F",
    "1F6B6-1F3FF-200D-2642-FE0F-200D-27A1",
    "1F6B6-1F3FF-200D-2642-200D-27A1",
    "1F9CD",
    "1F9CD-1F3FB",
    "1F9CD-1F3FC",
    "1F9CD-1F3FD",
    "1F9CD-1F3FE",
    "1F9CD-1F3FF",
    "1F9CD-200D-2642-FE0F",
    "1F9CD-200D-2642",
    "1F9CD-1F3FB-200D-2642-FE0F",
    "1F9CD-1F3FB-200D-2642",
    "1F9CD-1F3FC-200D-2642-FE0F",
    "1F9CD-1F3FC-200D-2642",
    "1F9CD-1F3FD-200D-2642-FE0F",
    "1F9CD-1F3FD-200D-2642",
    "1F9CD-1F3FE-200D-2642-FE0F",
    "1F9CD-1F3FE-200D-2642",
    "1F9CD-1F3FF-200D-2642-FE0F",
    "1F9CD-1F3FF-200D-2642",
    "1F9CD-200D-2640-FE0F",
    "1F9CD-200D-2640",
    "1F9CD-1F3FB-200D-2640-FE0F",
    "1F9CD-1F3FB-200D-2640",
    "1F9CD-1F3FC-200D-2640-FE0F",
    "1F9CD-1F3FC-200D-2640",
    "1F9CD-1F3FD-200D-2640-FE0F",
    "1F9CD-1F3FD-200D-2640",
    "1F9CD-1F3FE-200D-2640-FE0F",
    "1F9CD-1F3FE-200D-2640",
    "1F9CD-1F3FF-200D-2640-FE0F",
    "1F9CD-1F3FF-200D-2640",
    "1F9CE",
    "1F9CE-1F3FB",
    "1F9CE-1F3FC",
    "1F9CE-1F3FD",
    "1F9CE-1F3FE",
    "1F9CE-1F3FF",
    "1F9CE-200D-2642-FE0F",
    "1F9CE-200D-2642",
    "1F9CE-1F3FB-200D-2642-FE0F",
    "1F9CE-1F3FB-200D-2642",
    "1F9CE-1F3FC-200D-2642-FE0F",
    "1F9CE-1F3FC-200D-2642",
    "1F9CE-1F3FD-200D-2642-FE0F",
    "1F9CE-1F3FD-200D-2642",
    "1F9CE-1F3FE-200D-2642-FE0F",
    "1F9CE-1F3FE-200D-2642",
    "1F9CE-1F3FF-200D-2642-FE0F",
    "1F9CE-1F3FF-200D-2642",
    "1F9CE-200D-2640-FE0F",
    "1F9CE-200D-2640",
    "1F9CE-1F3FB-200D-2640-FE0F",
    "1F9CE-1F3FB-200D-2640",
    "1F9CE-1F3FC-200D-2640-FE0F",
    "1F9CE-1F3FC-200D-2640",
    "1F9CE-1F3FD-200D-2640-FE0F",
    "1F9CE-1F3FD-200D-2640",
    "1F9CE-1F3FE-200D-2640-FE0F",
    "1F9CE-1F3FE-200D-2640",
    "1F9CE-1F3FF-200D-2640-FE0F",
    "1F9CE-1F3FF-200D-2640",
    "1F9CE-200D-27A1-FE0F",
    "1F9CE-200D-27A1",
    "1F9CE-1F3FB-200D-27A1-FE0F",
    "1F9CE-1F3FB-200D-27A1",
    "1F9CE-1F3FC-200D-27A1-FE0F",
    "1F9CE-1F3FC-200D-27A1",
    "1F9CE-1F3FD-200D-27A1-FE0F",
    "1F9CE-1F3FD-200D-27A1",
    "1F9CE-1F3FE-200D-27A1-FE0F",
    "1F9CE-1F3FE-200D-27A1",
    "1F9CE-1F3FF-200D-27A1-FE0F",
    "1F9CE-1F3FF-200D-27A1",
    "1F9CE-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-200D-2640-200D-27A1-FE0F",
    "1F9CE-200D-2640-FE0F-200D-27A1",
    "1F9CE-200D-2640-200D-27A1",
    "1F9CE-1F3FB-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FB-200D-2640-200D-27A1-FE0F",
    "1F9CE-1F3FB-200D-2640-FE0F-200D-27A1",
    "1F9CE-1F3FB-200D-2640-200D-27A1",
    "1F9CE-1F3FC-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FC-200D-2640-200D-27A1-FE0F",
    "1F9CE-1F3FC-200D-2640-FE0F-200D-27A1",
    "1F9CE-1F3FC-200D-2640-200D-27A1",
    "1F9CE-1F3FD-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FD-200D-2640-200D-27A1-FE0F",
    "1F9CE-1F3FD-200D-2640-FE0F-200D-27A1",
    "1F9CE-1F3FD-200D-2640-200D-27A1",
    "1F9CE-1F3FE-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FE-200D-2640-200D-27A1-FE0F",
    "1F9CE-1F3FE-200D-2640-FE0F-200D-27A1",
    "1F9CE-1F3FE-200D-2640-200D-27A1",
    "1F9CE-1F3FF-200D-2640-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FF-200D-2640-200D-27A1-FE0F",
    "1F9CE-1F3FF-200D-2640-FE0F-200D-27A1",
    "1F9CE-1F3FF-200D-2640-200D-27A1",
    "1F9CE-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-200D-2642-200D-27A1-FE0F",
    "1F9CE-200D-2642-FE0F-200D-27A1",
    "1F9CE-200D-2642-200D-27A1",
    "1F9CE-1F3FB-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FB-200D-2642-200D-27A1-FE0F",
    "1F9CE-1F3FB-200D-2642-FE0F-200D-27A1",
    "1F9CE-1F3FB-200D-2642-200D-27A1",
    "1F9CE-1F3FC-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FC-200D-2642-200D-27A1-FE0F",
    "1F9CE-1F3FC-200D-2642-FE0F-200D-27A1",
    "1F9CE-1F3FC-200D-2642-200D-27A1",
    "1F9CE-1F3FD-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FD-200D-2642-200D-27A1-FE0F",
    "1F9CE-1F3FD-200D-2642-FE0F-200D-27A1",
    "1F9CE-1F3FD-200D-2642-200D-27A1",
    "1F9CE-1F3FE-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FE-200D-2642-200D-27A1-FE0F",
    "1F9CE-1F3FE-200D-2642-FE0F-200D-27A1",
    "1F9CE-1F3FE-200D-2642-200D-27A1",
    "1F9CE-1F3FF-200D-2642-FE0F-200D-27A1-FE0F",
    "1F9CE-1F3FF-200D-2642-200D-27A1-FE0F",
    "1F9CE-1F3FF-200D-2642-FE0F-200D-27A1",
    "1F9CE-1F3FF-200D-2642-200D-27A1",
    "1F9D1-200D-1F9AF",
    "1F9D1-1F3FB-200D-1F9AF",
    "1F9D1-1F3FC-200D-1F9AF",
    "1F9D1-1F3FD-200D-1F9AF",
    "1F9D1-1F3FE-200D-1F9AF",
    "1F9D1-1F3FF-200D-1F9AF",
    "1F9D1-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-200D-1F9AF-200D-27A1",
    "1F9D1-1F3FB-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-1F3FB-200D-1F9AF-200D-27A1",
    "1F9D1-1F3FC-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-1F3FC-200D-1F9AF-200D-27A1",
    "1F9D1-1F3FD-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-1F3FD-200D-1F9AF-200D-27A1",
    "1F9D1-1F3FE-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-1F3FE-200D-1F9AF-200D-27A1",
    "1F9D1-1F3FF-200D-1F9AF-200D-27A1-FE0F",
    "1F9D1-1F3FF-200D-1F9AF-200D-27A1",
    "1F468-200D-1F9AF",
    "1F468-1F3FB-200D-1F9AF",
    "1F468-1F3FC-200D-1F9AF",
    "1F468-1F3FD-200D-1F9AF",
    "1F468-1F3FE-200D-1F9AF",
    "1F468-1F3FF-200D-1F9AF",
    "1F468-200D-1F9AF-200D-27A1-FE0F",
    "1F468-200D-1F9AF-200D-27A1",
    "1F468-1F3FB-200D-1F9AF-200D-27A1-FE0F",
    "1F468-1F3FB-200D-1F9AF-200D-27A1",
    "1F468-1F3FC-200D-1F9AF-200D-27A1-FE0F",
    "1F468-1F3FC-200D-1F9AF-200D-27A1",
    "1F468-1F3FD-200D-1F9AF-200D-27A1-FE0F",
    "1F468-1F3FD-200D-1F9AF-200D-27A1",
    "1F468-1F3FE-200D-1F9AF-200D-27A1-FE0F",
    "1F468-1F3FE-200D-1F9AF-200D-27A1",
    "1F468-1F3FF-200D-1F9AF-200D-27A1-FE0F",
    "1F468-1F3FF-200D-1F9AF-200D-27A1",
    "1F469-200D-1F9AF",
    "1F469-1F3FB-200D-1F9AF",
    "1F469-1F3FC-200D-1F9AF",
    "1F469-1F3FD-200D-1F9AF",
    "1F469-1F3FE-200D-1F9AF",
    "1F469-1F3FF-200D-1F9AF",
    "1F469-200D-1F9AF-200D-27A1-FE0F",
    "1F469-200D-1F9AF-200D-27A1",
    "1F469-1F3FB-200D-1F9AF-200D-27A1-FE0F",
    "1F469-1F3FB-200D-1F9AF-200D-27A1",
    "1F469-1F3FC-200D-1F9AF-200D-27A1-FE0F",
    "1F469-1F3FC-200D-1F9AF-200D-27A1",
    "1F469-1F3FD-200D-1F9AF-200D-27A1-FE0F",
    "1F469-1F3FD-200D-1F9AF-200D-27A1",
    "1F469-1F3FE-200D-1F9AF-200D-27A1-FE0F",
    "1F469-1F3FE-200D-1F9AF-200D-27A1",
    "1F469-1F3FF-200D-1F9AF-200D-27A1-FE0F",
    "1F469-1F3FF-200D-1F9AF-200D-27A1",
    "1F9D1-200D-1F9BC",
    "1F9D1-1F3FB-200D-1F9BC",
    "1F9D1-1F3FC-200D-1F9BC",
    "1F9D1-1F3FD-200D-1F9BC",
    "1F9D1-1F3FE-200D-1F9BC",
    "1F9D1-1F3FF-200D-1F9BC",
    "1F9D1-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-200D-1F9BC-200D-27A1",
    "1F9D1-1F3FB-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-1F3FB-200D-1F9BC-200D-27A1",
    "1F9D1-1F3FC-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-1F3FC-200D-1F9BC-200D-27A1",
    "1F9D1-1F3FD-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-1F3FD-200D-1F9BC-200D-27A1",
    "1F9D1-1F3FE-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-1F3FE-200D-1F9BC-200D-27A1",
    "1F9D1-1F3FF-200D-1F9BC-200D-27A1-FE0F",
    "1F9D1-1F3FF-200D-1F9BC-200D-27A1",
    "1F468-200D-1F9BC",
    "1F468-1F3FB-200D-1F9BC",
    "1F468-1F3FC-200D-1F9BC",
    "1F468-1F3FD-200D-1F9BC",
    "1F468-1F3FE-200D-1F9BC",
    "1F468-1F3FF-200D-1F9BC",
    "1F468-200D-1F9BC-200D-27A1-FE0F",
    "1F468-200D-1F9BC-200D-27A1",
    "1F468-1F3FB-200D-1F9BC-200D-27A1-FE0F",
    "1F468-1F3FB-200D-1F9BC-200D-27A1",
    "1F468-1F3FC-200D-1F9BC-200D-27A1-FE0F",
    "1F468-1F3FC-200D-1F9BC-200D-27A1",
    "1F468-1F3FD-200D-1F9BC-200D-27A1-FE0F",
    "1F468-1F3FD-200D-1F9BC-200D-27A1",
    "1F468-1F3FE-200D-1F9BC-200D-27A1-FE0F",
    "1F468-1F3FE-200D-1F9BC-200D-27A1",
    "1F468-1F3FF-200D-1F9BC-200D-27A1-FE0F",
    "1F468-1F3FF-200D-1F9BC-200D-27A1",
    "1F469-200D-1F9BC",
    "1F469-1F3FB-200D-1F9BC",
    "1F469-1F3FC-200D-1F9BC",
    "1F469-1F3FD-200D-1F9BC",
    "1F469-1F3FE-200D-1F9BC",
    "1F469-1F3FF-200D-1F9BC",
    "1F469-200D-1F9BC-200D-27A1-FE0F",
    "1F469-200D-1F9BC-200D-27A1",
    "1F469-1F3FB-200D-1F9BC-200D-27A1-FE0F",
    "1F469-1F3FB-200D-1F9BC-200D-27A1",
    "1F469-1F3FC-200D-1F9BC-200D-27A1-FE0F",
    "1F469-1F3FC-200D-1F9BC-200D-27A1",
    "1F469-1F3FD-200D-1F9BC-200D-27A1-FE0F",
    "1F469-1F3FD-200D-1F9BC-200D-27A1",
    "1F469-1F3FE-200D-1F9BC-200D-27A1-FE0F",
    "1F469-1F3FE-200D-1F9BC-200D-27A1",
    "1F469-1F3FF-200D-1F9BC-200D-27A1-FE0F",
    "1F469-1F3FF-200D-1F9BC-200D-27A1",
    "1F9D1-200D-1F9BD",
    "1F9D1-1F3FB-200D-1F9BD",
    "1F9D1-1F3FC-200D-1F9BD",
    "1F9D1-1F3FD-200D-1F9BD",
    "1F9D1-1F3FE-200D-1F9BD",
    "1F9D1-1F3FF-200D-1F9BD",
    "1F9D1-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-200D-1F9BD-200D-27A1",
    "1F9D1-1F3FB-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-1F3FB-200D-1F9BD-200D-27A1",
    "1F9D1-1F3FC-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-1F3FC-200D-1F9BD-200D-27A1",
    "1F9D1-1F3FD-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-1F3FD-200D-1F9BD-200D-27A1",
    "1F9D1-1F3FE-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-1F3FE-200D-1F9BD-200D-27A1",
    "1F9D1-1F3FF-200D-1F9BD-200D-27A1-FE0F",
    "1F9D1-1F3FF-200D-1F9BD-200D-27A1",
    "1F468-200D-1F9BD",
    "1F468-1F3FB-200D-1F9BD",
    "1F468-1F3FC-200D-1F9BD",
    "1F468-1F3FD-200D-1F9BD",
    "1F468-1F3FE-200D-1F9BD",
    "1F468-1F3FF-200D-1F9BD",
    "1F468-200D-1F9BD-200D-27A1-FE0F",
    "1F468-200D-1F9BD-200D-27A1",
    "1F468-1F3FB-200D-1F9BD-200D-27A1-FE0F",
    "1F468-1F3FB-200D-1F9BD-200D-27A1",
    "1F468-1F3FC-200D-1F9BD-200D-27A1-FE0F",
    "1F468-1F3FC-200D-1F9BD-200D-27A1",
    "1F468-1F3FD-200D-1F9BD-200D-27A1-FE0F",
    "1F468-1F3FD-200D-1F9BD-200D-27A1",
    "1F468-1F3FE-200D-1F9BD-200D-27A1-FE0F",
    "1F468-1F3FE-200D-1F9BD-200D-27A1",
    "1F468-1F3FF-200D-1F9BD-200D-27A1-FE0F",
    "1F468-1F3FF-200D-1F9BD-200D-27A1",
    "1F469-200D-1F9BD",
    "1F469-1F3FB-200D-1F9BD",
    "1F469-1F3FC-200D-1F9BD",
    "1F469-1F3FD-200D-1F9BD",
    "1F469-1F3FE-200D-1F9BD",
    "1F469-1F3FF-200D-1F9BD",
    "1F469-200D-1F9BD-200D-27A1-FE0F",
    "1F469-200D-1F9BD-200D-27A1",
    "1F469-1F3FB-200D-1F9BD-200D-27A1-FE0F",
    "1F469-1F3FB-200D-1F9BD-200D-27A1",
    "1F469-1F3FC-200D-1F9BD-200D-27A1-FE0F",
    "1F469-1F3FC-200D-1F9BD-200D-27A1",
    "1F469-1F3FD-200D-1F9BD-200D-27A1-FE0F",
    "1F469-1F3FD-200D-1F9BD-200D-27A1",
    "1F469-1F3FE-200D-1F9BD-200D-27A1-FE0F",
    "1F469-1F3FE-200D-1F9BD-200D-27A1",
    "1F469-1F3FF-200D-1F9BD-200D-27A1-FE0F",
    "1F469-1F3FF-200D-1F9BD-200D-27A1",
    "1F3C3",
    "1F3C3-1F3FB",
    "1F3C3-1F3FC",
    "1F3C3-1F3FD",
    "1F3C3-1F3FE",
    "1F3C3-1F3FF",
    "1F3C3-200D-2642-FE0F",
    "1F3C3-200D-2642",
    "1F3C3-1F3FB-200D-2642-FE0F",
    "1F3C3-1F3FB-200D-2642",
    "1F3C3-1F3FC-200D-2642-FE0F",
    "1F3C3-1F3FC-200D-2642",
    "1F3C3-1F3FD-200D-2642-FE0F",
    "1F3C3-1F3FD-200D-2642",
    "1F3C3-1F3FE-200D-2642-FE0F",
    "1F3C3-1F3FE-200D-2642",
    "1F3C3-1F3FF-200D-2642-FE0F",
    "1F3C3-1F3FF-200D-2642",
    "1F3C3-200D-2640-FE0F",
    "1F3C3-200D-2640",
    "1F3C3-1F3FB-200D-2640-FE0F",
    "1F3C3-1F3FB-200D-2640",
    "1F3C3-1F3FC-200D-2640-FE0F",
    "1F3C3-1F3FC-200D-2640",
    "1F3C3-1F3FD-200D-2640-FE0F",
    "1F3C3-1F3FD-200D-2640",
    "1F3C3-1F3FE-200D-2640-FE0F",
    "1F3C3-1F3FE-200D-2640",
    "1F3C3-1F3FF-200D-2640-FE0F",
    "1F3C3-1F3FF-200D-2640",
    "1F3C3-200D-27A1-FE0F",
    "1F3C3-200D-27A1",
    "1F3C3-1F3FB-200D-27A1-FE0F",
    "1F3C3-1F3FB-200D-27A1",
    "1F3C3-1F3FC-200D-27A1-FE0F",
    "1F3C3-1F3FC-200D-27A1",
    "1F3C3-1F3FD-200D-27A1-FE0F",
    "1F3C3-1F3FD-200D-27A1",
    "1F3C3-1F3FE-200D-27A1-FE0F",
    "1F3C3-1F3FE-200D-27A1",
    "1F3C3-1F3FF-200D-27A1-FE0F",
    "1F3C3-1F3FF-200D-27A1",
    "1F3C3-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-200D-2640-200D-27A1-FE0F",
    "1F3C3-200D-2640-FE0F-200D-27A1",
    "1F3C3-200D-2640-200D-27A1",
    "1F3C3-1F3FB-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FB-200D-2640-200D-27A1-FE0F",
    "1F3C3-1F3FB-200D-2640-FE0F-200D-27A1",
    "1F3C3-1F3FB-200D-2640-200D-27A1",
    "1F3C3-1F3FC-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FC-200D-2640-200D-27A1-FE0F",
    "1F3C3-1F3FC-200D-2640-FE0F-200D-27A1",
    "1F3C3-1F3FC-200D-2640-200D-27A1",
    "1F3C3-1F3FD-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FD-200D-2640-200D-27A1-FE0F",
    "1F3C3-1F3FD-200D-2640-FE0F-200D-27A1",
    "1F3C3-1F3FD-200D-2640-200D-27A1",
    "1F3C3-1F3FE-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FE-200D-2640-200D-27A1-FE0F",
    "1F3C3-1F3FE-200D-2640-FE0F-200D-27A1",
    "1F3C3-1F3FE-200D-2640-200D-27A1",
    "1F3C3-1F3FF-200D-2640-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FF-200D-2640-200D-27A1-FE0F",
    "1F3C3-1F3FF-200D-2640-FE0F-200D-27A1",
    "1F3C3-1F3FF-200D-2640-200D-27A1",
    "1F3C3-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-200D-2642-200D-27A1-FE0F",
    "1F3C3-200D-2642-FE0F-200D-27A1",
    "1F3C3-200D-2642-200D-27A1",
    "1F3C3-1F3FB-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FB-200D-2642-200D-27A1-FE0F",
    "1F3C3-1F3FB-200D-2642-FE0F-200D-27A1",
    "1F3C3-1F3FB-200D-2642-200D-27A1",
    "1F3C3-1F3FC-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FC-200D-2642-200D-27A1-FE0F",
    "1F3C3-1F3FC-200D-2642-FE0F-200D-27A1",
    "1F3C3-1F3FC-200D-2642-200D-27A1",
    "1F3C3-1F3FD-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FD-200D-2642-200D-27A1-FE0F",
    "1F3C3-1F3FD-200D-2642-FE0F-200D-27A1",
    "1F3C3-1F3FD-200D-2642-200D-27A1",
    "1F3C3-1F3FE-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FE-200D-2642-200D-27A1-FE0F",
    "1F3C3-1F3FE-200D-2642-FE0F-200D-27A1",
    "1F3C3-1F3FE-200D-2642-200D-27A1",
    "1F3C3-1F3FF-200D-2642-FE0F-200D-27A1-FE0F",
    "1F3C3-1F3FF-200D-2642-200D-27A1-FE0F",
    "1F3C3-1F3FF-200D-2642-FE0F-200D-27A1",
    "1F3C3-1F3FF-200D-2642-200D-27A1",
    "1F483",
    "1F483-1F3FB",
    "1F483-1F3FC",
    "1F483-1F3FD",
    "1F483-1F3FE",
    "1F483-1F3FF",
    "1F57A",
    "1F57A-1F3FB",
    "1F57A-1F3FC",
    "1F57A-1F3FD",
    "1F57A-1F3FE",
    "1F57A-1F3FF",
    "1F574-FE0F",
    "1F574",
    "1F574-1F3FB",
    "1F574-1F3FC",
    "1F574-1F3FD",
    "1F574-1F3FE",
    "1F574-1F3FF",
    "1F46F",
    "1F46F-200D-2642-FE0F",
    "1F46F-200D-2642",
    "1F46F-200D-2640-FE0F",
    "1F46F-200D-2640",
    "1F9D6",
    "1F9D6-1F3FB",
    "1F9D6-1F3FC",
    "1F9D6-1F3FD",
    "1F9D6-1F3FE",
    "1F9D6-1F3FF",
    "1F9D6-200D-2642-FE0F",
    "1F9D6-200D-2642",
    "1F9D6-1F3FB-200D-2642-FE0F",
    "1F9D6-1F3FB-200D-2642",
    "1F9D6-1F3FC-200D-2642-FE0F",
    "1F9D6-1F3FC-200D-2642",
    "1F9D6-1F3FD-200D-2642-FE0F",
    "1F9D6-1F3FD-200D-2642",
    "1F9D6-1F3FE-200D-2642-FE0F",
    "1F9D6-1F3FE-200D-2642",
    "1F9D6-1F3FF-200D-2642-FE0F",
    "1F9D6-1F3FF-200D-2642",
    "1F9D6-200D-2640-FE0F",
    "1F9D6-200D-2640",
    "1F9D6-1F3FB-200D-2640-FE0F",
    "1F9D6-1F3FB-200D-2640",
    "1F9D6-1F3FC-200D-2640-FE0F",
    "1F9D6-1F3FC-200D-2640",
    "1F9D6-1F3FD-200D-2640-FE0F",
    "1F9D6-1F3FD-200D-2640",
    "1F9D6-1F3FE-200D-2640-FE0F",
    "1F9D6-1F3FE-200D-2640",
    "1F9D6-1F3FF-200D-2640-FE0F",
    "1F9D6-1F3FF-200D-2640",
    "1F9D7",
    "1F9D7-1F3FB",
    "1F9D7-1F3FC",
    "1F9D7-1F3FD",
    "1F9D7-1F3FE",
    "1F9D7-1F3FF",
    "1F9D7-200D-2642-FE0F",
    "1F9D7-200D-2642",
    "1F9D7-1F3FB-200D-2642-FE0F",
    "1F9D7-1F3FB-200D-2642",
    "1F9D7-1F3FC-200D-2642-FE0F",
    "1F9D7-1F3FC-200D-2642",
    "1F9D7-1F3FD-200D-2642-FE0F",
    "1F9D7-1F3FD-200D-2642",
    "1F9D7-1F3FE-200D-2642-FE0F",
    "1F9D7-1F3FE-200D-2642",
    "1F9D7-1F3FF-200D-2642-FE0F",
    "1F9D7-1F3FF-200D-2642",
    "1F9D7-200D-2640-FE0F",
    "1F9D7-200D-2640",
    "1F9D7-1F3FB-200D-2640-FE0F",
    "1F9D7-1F3FB-200D-2640",
    "1F9D7-1F3FC-200D-2640-FE0F",
    "1F9D7-1F3FC-200D-2640",
    "1F9D7-1F3FD-200D-2640-FE0F",
    "1F9D7-1F3FD-200D-2640",
    "1F9D7-1F3FE-200D-2640-FE0F",
    "1F9D7-1F3FE-200D-2640",
    "1F9D7-1F3FF-200D-2640-FE0F",
    "1F9D7-1F3FF-200D-2640",
    "1F93A",
    "1F3C7",
    "1F3C7-1F3FB",
    "1F3C7-1F3FC",
    "1F3C7-1F3FD",
    "1F3C7-1F3FE",
    "1F3C7-1F3FF",
    "26F7-FE0F",
    "26F7",
    "1F3C2",
    "1F3C2-1F3FB",
    "1F3C2-1F3FC",
    "1F3C2-1F3FD",
    "1F3C2-1F3FE",
    "1F3C2-1F3FF",
    "1F3CC-FE0F",
    "1F3CC",
    "1F3CC-1F3FB",
    "1F3CC-1F3FC",
    "1F3CC-1F3FD",
    "1F3CC-1F3FE",
    "1F3CC-1F3FF",
    "1F3CC-FE0F-200D-2642-FE0F",
    "1F3CC-200D-2642-FE0F",
    "1F3CC-FE0F-200D-2642",
    "1F3CC-200D-2642",
    "1F3CC-1F3FB-200D-2642-FE0F",
    "1F3CC-1F3FB-200D-2642",
    "1F3CC-1F3FC-200D-2642-FE0F",
    "1F3CC-1F3FC-200D-2642",
    "1F3CC-1F3FD-200D-2642-FE0F",
    "1F3CC-1F3FD-200D-2642",
    "1F3CC-1F3FE-200D-2642-FE0F",
    "1F3CC-1F3FE-200D-2642",
    "1F3CC-1F3FF-200D-2642-FE0F",
    "1F3CC-1F3FF-200D-2642",
    "1F3CC-FE0F-200D-2640-FE0F",
    "1F3CC-200D-2640-FE0F",
    "1F3CC-FE0F-200D-2640",
    "1F3CC-200D-2640",
    "1F3CC-1F3FB-200D-2640-FE0F",
    "1F3CC-1F3FB-200D-2640",
    "1F3CC-1F3FC-200D-2640-FE0F",
    "1F3CC-1F3FC-200D-2640",
    "1F3CC-1F3FD-200D-2640-FE0F",
    "1F3CC-1F3FD-200D-2640",
    "1F3CC-1F3FE-200D-2640-FE0F",
    "1F3CC-1F3FE-200D-2640",
    "1F3CC-1F3FF-200D-2640-FE0F",
    "1F3CC-1F3FF-200D-2640",
    "1F3C4",
    "1F3C4-1F3FB",
    "1F3C4-1F3FC",
    "1F3C4-1F3FD",
    "1F3C4-1F3FE",
    "1F3C4-1F3FF",
    "1F3C4-200D-2642-FE0F",
    "1F3C4-200D-2642",
    "1F3C4-1F3FB-200D-2642-FE0F",
    "1F3C4-1F3FB-200D-2642",
    "1F3C4-1F3FC-200D-2642-FE0F",
    "1F3C4-1F3FC-200D-2642",
    "1F3C4-1F3FD-200D-2642-FE0F",
    "1F3C4-1F3FD-200D-2642",
    "1F3C4-1F3FE-200D-2642-FE0F",
    "1F3C4-1F3FE-200D-2642",
    "1F3C4-1F3FF-200D-2642-FE0F",
    "1F3C4-1F3FF-200D-2642",
    "1F3C4-200D-2640-FE0F",
    "1F3C4-200D-2640",
    "1F3C4-1F3FB-200D-2640-FE0F",
    "1F3C4-1F3FB-200D-2640",
    "1F3C4-1F3FC-200D-2640-FE0F",
    "1F3C4-1F3FC-200D-2640",
    "1F3C4-1F3FD-200D-2640-FE0F",
    "1F3C4-1F3FD-200D-2640",
    "1F3C4-1F3FE-200D-2640-FE0F",
    "1F3C4-1F3FE-200D-2640",
    "1F3C4-1F3FF-200D-2640-FE0F",
    "1F3C4-1F3FF-200D-2640",
    "1F6A3",
    "1F6A3-1F3FB",
    "1F6A3-1F3FC",
    "1F6A3-1F3FD",
    "1F6A3-1F3FE",
    "1F6A3-1F3FF",
    "1F6A3-200D-2642-FE0F",
    "1F6A3-200D-2642",
    "1F6A3-1F3FB-200D-2642-FE0F",
    "1F6A3-1F3FB-200D-2642",
    "1F6A3-1F3FC-200D-2642-FE0F",
    "1F6A3-1F3FC-200D-2642",
    "1F6A3-1F3FD-200D-2642-FE0F",
    "1F6A3-1F3FD-200D-2642",
    "1F6A3-1F3FE-200D-2642-FE0F",
    "1F6A3-1F3FE-200D-2642",
    "1F6A3-1F3FF-200D-2642-FE0F",
    "1F6A3-1F3FF-200D-2642",
    "1F6A3-200D-2640-FE0F",
    "1F6A3-200D-2640",
    "1F6A3-1F3FB-200D-2640-FE0F",
    "1F6A3-1F3FB-200D-2640",
    "1F6A3-1F3FC-200D-2640-FE0F",
    "1F6A3-1F3FC-200D-2640",
    "1F6A3-1F3FD-200D-2640-FE0F",
    "1F6A3-1F3FD-200D-2640",
    "1F6A3-1F3FE-200D-2640-FE0F",
    "1F6A3-1F3FE-200D-2640",
    "1F6A3-1F3FF-200D-2640-FE0F",
    "1F6A3-1F3FF-200D-2640",
    "1F3CA",
    "1F3CA-1F3FB",
    "1F3CA-1F3FC",
    "1F3CA-1F3FD",
    "1F3CA-1F3FE",
    "1F3CA-1F3FF",
    "1F3CA-200D-2642-FE0F",
    "1F3CA-200D-2642",
    "1F3CA-1F3FB-200D-2642-FE0F",
    "1F3CA-1F3FB-200D-2642",
    "1F3CA-1F3FC-200D-2642-FE0F",
    "1F3CA-1F3FC-200D-2642",
    "1F3CA-1F3FD-200D-2642-FE0F",
    "1F3CA-1F3FD-200D-2642",
    "1F3CA-1F3FE-200D-2642-FE0F",
    "1F3CA-1F3FE-200D-2642",
    "1F3CA-1F3FF-200D-2642-FE0F",
    "1F3CA-1F3FF-200D-2642",
    "1F3CA-200D-2640-FE0F",
    "1F3CA-200D-2640",
    "1F3CA-1F3FB-200D-2640-FE0F",
    "1F3CA-1F3FB-200D-2640",
    "1F3CA-1F3FC-200D-2640-FE0F",
    "1F3CA-1F3FC-200D-2640",
    "1F3CA-1F3FD-200D-2640-FE0F",
    "1F3CA-1F3FD-200D-2640",
    "1F3CA-1F3FE-200D-2640-FE0F",
    "1F3CA-1F3FE-200D-2640",
    "1F3CA-1F3FF-200D-2640-FE0F",
    "1F3CA-1F3FF-200D-2640",
    "26F9-FE0F",
    "26F9",
    "26F9-1F3FB",
    "26F9-1F3FC",
    "26F9-1F3FD",
    "26F9-1F3FE",
    "26F9-1F3FF",
    "26F9-FE0F-200D-2642-FE0F",
    "26F9-200D-2642-FE0F",
    "26F9-FE0F-200D-2642",
    "26F9-200D-2642",
    "26F9-1F3FB-200D-2642-FE0F",
    "26F9-1F3FB-200D-2642",
    "26F9-1F3FC-200D-2642-FE0F",
    "26F9-1F3FC-200D-2642",
    "26F9-1F3FD-200D-2642-FE0F",
    "26F9-1F3FD-200D-2642",
    "26F9-1F3FE-200D-2642-FE0F",
    "26F9-1F3FE-200D-2642",
    "26F9-1F3FF-200D-2642-FE0F",
    "26F9-1F3FF-200D-2642",
    "26F9-FE0F-200D-2640-FE0F",
    "26F9-200D-2640-FE0F",
    "26F9-FE0F-200D-2640",
    "26F9-200D-2640",
    "26F9-1F3FB-200D-2640-FE0F",
    "26F9-1F3FB-200D-2640",
    "26F9-1F3FC-200D-2640-FE0F",
    "26F9-1F3FC-200D-2640",
    "26F9-1F3FD-200D-2640-FE0F",
    "26F9-1F3FD-200D-2640",
    "26F9-1F3FE-200D-2640-FE0F",
    "26F9-1F3FE-200D-2640",
    "26F9-1F3FF-200D-2640-FE0F",
    "26F9-1F3FF-200D-2640",
    "1F3CB-FE0F",
    "1F3CB",
    "1F3CB-1F3FB",
    "1F3CB-1F3FC",
    "1F3CB-1F3FD",
    "1F3CB-1F3FE",
    "1F3CB-1F3FF",
    "1F3CB-FE0F-200D-2642-FE0F",
    "1F3CB-200D-2642-FE0F",
    "1F3CB-FE0F-200D-2642",
    "1F3CB-200D-2642",
    "1F3CB-1F3FB-200D-2642-FE0F",
    "1F3CB-1F3FB-200D-2642",
    "1F3CB-1F3FC-200D-2642-FE0F",
    "1F3CB-1F3FC-200D-2642",
    "1F3CB-1F3FD-200D-2642-FE0F",
    "1F3CB-1F3FD-200D-2642",
    "1F3CB-1F3FE-200D-2642-FE0F",
    "1F3CB-1F3FE-200D-2642",
    "1F3CB-1F3FF-200D-2642-FE0F",
    "1F3CB-1F3FF-200D-2642",
    "1F3CB-FE0F-200D-2640-FE0F",
    "1F3CB-200D-2640-FE0F",
    "1F3CB-FE0F-200D-2640",
    "1F3CB-200D-2640",
    "1F3CB-1F3FB-200D-2640-FE0F",
    "1F3CB-1F3FB-200D-2640",
    "1F3CB-1F3FC-200D-2640-FE0F",
    "1F3CB-1F3FC-200D-2640",
    "1F3CB-1F3FD-200D-2640-FE0F",
    "1F3CB-1F3FD-200D-2640",
    "1F3CB-1F3FE-200D-2640-FE0F",
    "1F3CB-1F3FE-200D-2640",
    "1F3CB-1F3FF-200D-2640-FE0F",
    "1F3CB-1F3FF-200D-2640",
    "1F6B4",
    "1F6B4-1F3FB",
    "1F6B4-1F3FC",
    "1F6B4-1F3FD",
    "1F6B4-1F3FE",
    "1F6B4-1F3FF",
    "1F6B4-200D-2642-FE0F",
    "1F6B4-200D-2642",
    "1F6B4-1F3FB-200D-2642-FE0F",
    "1F6B4-1F3FB-200D-2642",
    "1F6B4-1F3FC-200D-2642-FE0F",
    "1F6B4-1F3FC-200D-2642",
    "1F6B4-1F3FD-200D-2642-FE0F",
    "1F6B4-1F3FD-200D-2642",
    "1F6B4-1F3FE-200D-2642-FE0F",
    "1F6B4-1F3FE-200D-2642",
    "1F6B4-1F3FF-200D-2642-FE0F",
    "1F6B4-1F3FF-200D-2642",
    "1F6B4-200D-2640-FE0F",
    "1F6B4-200D-2640",
    "1F6B4-1F3FB-200D-2640-FE0F",
    "1F6B4-1F3FB-200D-2640",
    "1F6B4-1F3FC-200D-2640-FE0F",
    "1F6B4-1F3FC-200D-2640",
    "1F6B4-1F3FD-200D-2640-FE0F",
    "1F6B4-1F3FD-200D-2640",
    "1F6B4-1F3FE-200D-2640-FE0F",
    "1F6B4-1F3FE-200D-2640",
    "1F6B4-1F3FF-200D-2640-FE0F",
    "1F6B4-1F3FF-200D-2640",
    "1F6B5",
    "1F6B5-1F3FB",
    "1F6B5-1F3FC",
    "1F6B5-1F3FD",
    "1F6B5-1F3FE",
    "1F6B5-1F3FF",
    "1F6B5-200D-2642-FE0F",
    "1F6B5-200D-2642",
    "1F6B5-1F3FB-200D-2642-FE0F",
    "1F6B5-1F3FB-200D-2642",
    "1F6B5-1F3FC-200D-2642-FE0F",
    "1F6B5-1F3FC-200D-2642",
    "1F6B5-1F3FD-200D-2642-FE0F",
    "1F6B5-1F3FD-200D-2642",
    "1F6B5-1F3FE-200D-2642-FE0F",
    "1F6B5-1F3FE-200D-2642",
    "1F6B5-1F3FF-200D-2642-FE0F",
    "1F6B5-1F3FF-200D-2642",
    "1F6B5-200D-2640-FE0F",
    "1F6B5-200D-2640",
    "1F6B5-1F3FB-200D-2640-FE0F",
    "1F6B5-1F3FB-200D-2640",
    "1F6B5-1F3FC-200D-2640-FE0F",
    "1F6B5-1F3FC-200D-2640",
    "1F6B5-1F3FD-200D-2640-FE0F",
    "1F6B5-1F3FD-200D-2640",
    "1F6B5-1F3FE-200D-2640-FE0F",
    "1F6B5-1F3FE-200D-2640",
    "1F6B5-1F3FF-200D-2640-FE0F",
    "1F6B5-1F3FF-200D-2640",
    "1F938",
    "1F938-1F3FB",
    "1F938-1F3FC",
    "1F938-1F3FD",
    "1F938-1F3FE",
    "1F938-1F3FF",
    "1F938-200D-2642-FE0F",
    "1F938-200D-2642",
    "1F938-1F3FB-200D-2642-FE0F",
    "1F938-1F3FB-200D-2642",
    "1F938-1F3FC-200D-2642-FE0F",
    "1F938-1F3FC-200D-2642",
    "1F938-1F3FD-200D-2642-FE0F",
    "1F938-1F3FD-200D-2642",
    "1F938-1F3FE-200D-2642-FE0F",
    "1F938-1F3FE-200D-2642",
    "1F938-1F3FF-200D-2642-FE0F",
    "1F938-1F3FF-200D-2642",
    "1F938-200D-2640-FE0F",
    "1F938-200D-2640",
    "1F938-1F3FB-200D-2640-FE0F",
    "1F938-1F3FB-200D-2640",
    "1F938-1F3FC-200D-2640-FE0F",
    "1F938-1F3FC-200D-2640",
    "1F938-1F3FD-200D-2640-FE0F",
    "1F938-1F3FD-200D-2640",
    "1F938-1F3FE-200D-2640-FE0F",
    "1F938-1F3FE-200D-2640",
    "1F938-1F3FF-200D-2640-FE0F",
    "1F938-1F3FF-200D-2640",
    "1F93C",
    "1F93C-200D-2642-FE0F",
    "1F93C-200D-2642",
    "1F93C-200D-2640-FE0F",
    "1F93C-200D-2640",
    "1F93D",
    "1F93D-1F3FB",
    "1F93D-1F3FC",
    "1F93D-1F3FD",
    "1F93D-1F3FE",
    "1F93D-1F3FF",
    "1F93D-200D-2642-FE0F",
    "1F93D-200D-2642",
    "1F93D-1F3FB-200D-2642-FE0F",
    "1F93D-1F3FB-200D-2642",
    "1F93D-1F3FC-200D-2642-FE0F",
    "1F93D-1F3FC-200D-2642",
    "1F93D-1F3FD-200D-2642-FE0F",
    "1F93D-1F3FD-200D-2642",
    "1F93D-1F3FE-200D-2642-FE0F",
    "1F93D-1F3FE-200D-2642",
    "1F93D-1F3FF-200D-2642-FE0F",
    "1F93D-1F3FF-200D-2642",
    "1F93D-200D-2640-FE0F",
    "1F93D-200D-2640",
    "1F93D-1F3FB-200D-2640-FE0F",
    "1F93D-1F3FB-200D-2640",
    "1F93D-1F3FC-200D-2640-FE0F",
    "1F93D-1F3FC-200D-2640",
    "1F93D-1F3FD-200D-2640-FE0F",
    "1F93D-1F3FD-200D-2640",
    "1F93D-1F3FE-200D-2640-FE0F",
    "1F93D-1F3FE-200D-2640",
    "1F93D-1F3FF-200D-2640-FE0F",
    "1F93D-1F3FF-200D-2640",
    "1F93E",
    "1F93E-1F3FB",
    "1F93E-1F3FC",
    "1F93E-1F3FD",
    "1F93E-1F3FE",
    "1F93E-1F3FF",
    "1F93E-200D-2642-FE0F",
    "1F93E-200D-2642",
    "1F93E-1F3FB-200D-2642-FE0F",
    "1F93E-1F3FB-200D-2642",
    "1F93E-1F3FC-200D-2642-FE0F",
    "1F93E-1F3FC-200D-2642",
    "1F93E-1F3FD-200D-2642-FE0F",
    "1F93E-1F3FD-200D-2642",
    "1F93E-1F3FE-200D-2642-FE0F",
    "1F93E-1F3FE-200D-2642",
    "1F93E-1F3FF-200D-2642-FE0F",
    "1F93E-1F3FF-200D-2642",
    "1F93E-200D-2640-FE0F",
    "1F93E-200D-2640",
    "1F93E-1F3FB-200D-2640-FE0F",
    "1F93E-1F3FB-200D-2640",
    "1F93E-1F3FC-200D-2640-FE0F",
    "1F93E-1F3FC-200D-2640",
    "1F93E-1F3FD-200D-2640-FE0F",
    "1F93E-1F3FD-200D-2640",
    "1F93E-1F3FE-200D-2640-FE0F",
    "1F93E-1F3FE-200D-2640",
    "1F93E-1F3FF-200D-2640-FE0F",
    "1F93E-1F3FF-200D-2640",
    "1F939",
    "1F939-1F3FB",
    "1F939-1F3FC",
    "1F939-1F3FD",
    "1F939-1F3FE",
    "1F939-1F3FF",
    "1F939-200D-2642-FE0F",
    "1F939-200D-2642",
    "1F939-1F3FB-200D-2642-FE0F",
    "1F939-1F3FB-200D-2642",
    "1F939-1F3FC-200D-2642-FE0F",
    "1F939-1F3FC-200D-2642",
    "1F939-1F3FD-200D-2642-FE0F",
    "1F939-1F3FD-200D-2642",
    "1F939-1F3FE-200D-2642-FE0F",
    "1F939-1F3FE-200D-2642",
    "1F939-1F3FF-200D-2642-FE0F",
    "1F939-1F3FF-200D-2642",
    "1F939-200D-2640-FE0F",
    "1F939-200D-2640",
    "1F939-1F3FB-200D-2640-FE0F",
    "1F939-1F3FB-200D-2640",
    "1F939-1F3FC-200D-2640-FE0F",
    "1F939-1F3FC-200D-2640",
    "1F939-1F3FD-200D-2640-FE0F",
    "1F939-1F3FD-200D-2640",
    "1F939-1F3FE-200D-2640-FE0F",
    "1F939-1F3FE-200D-2640",
    "1F939-1F3FF-200D-2640-FE0F",
    "1F939-1F3FF-200D-2640",
    "1F9D8",
    "1F9D8-1F3FB",
    "1F9D8-1F3FC",
    "1F9D8-1F3FD",
    "1F9D8-1F3FE",
    "1F9D8-1F3FF",
    "1F9D8-200D-2642-FE0F",
    "1F9D8-200D-2642",
    "1F9D8-1F3FB-200D-2642-FE0F",
    "1F9D8-1F3FB-200D-2642",
    "1F9D8-1F3FC-200D-2642-FE0F",
    "1F9D8-1F3FC-200D-2642",
    "1F9D8-1F3FD-200D-2642-FE0F",
    "1F9D8-1F3FD-200D-2642",
    "1F9D8-1F3FE-200D-2642-FE0F",
    "1F9D8-1F3FE-200D-2642",
    "1F9D8-1F3FF-200D-2642-FE0F",
    "1F9D8-1F3FF-200D-2642",
    "1F9D8-200D-2640-FE0F",
    "1F9D8-200D-2640",
    "1F9D8-1F3FB-200D-2640-FE0F",
    "1F9D8-1F3FB-200D-2640",
    "1F9D8-1F3FC-200D-2640-FE0F",
    "1F9D8-1F3FC-200D-2640",
    "1F9D8-1F3FD-200D-2640-FE0F",
    "1F9D8-1F3FD-200D-2640",
    "1F9D8-1F3FE-200D-2640-FE0F",
    "1F9D8-1F3FE-200D-2640",
    "1F9D8-1F3FF-200D-2640-FE0F",
    "1F9D8-1F3FF-200D-2640",
    "1F6C0",
    "1F6C0-1F3FB",
    "1F6C0-1F3FC",
    "1F6C0-1F3FD",
    "1F6C0-1F3FE",
    "1F6C0-1F3FF",
    "1F6CC",
    "1F6CC-1F3FB",
    "1F6CC-1F3FC",
    "1F6CC-1F3FD",
    "1F6CC-1F3FE",
    "1F6CC-1F3FF",
    "1F9D1-200D-1F91D-200D-1F9D1",
    "1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FB",
    "1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FC",
    "1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FD",
    "1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FE",
    "1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FF",
    "1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FB",
    "1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FC",
    "1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FD",
    "1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FE",
    "1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FF",
    "1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FB",
    "1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FC",
    "1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FD",
    "1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FE",
    "1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FF",
    "1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FB",
    "1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FC",
    "1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FD",
    "1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FE",
    "1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FF",
    "1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FB",
    "1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FC",
    "1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FD",
    "1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FE",
    "1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FF",
    "1F46D",
    "1F46D-1F3FB",
    "1F469-1F3FB-200D-1F91D-200D-1F469-1F3FC",
    "1F469-1F3FB-200D-1F91D-200D-1F469-1F3FD",
    "1F469-1F3FB-200D-1F91D-200D-1F469-1F3FE",
    "1F469-1F3FB-200D-1F91D-200D-1F469-1F3FF",
    "1F469-1F3FC-200D-1F91D-200D-1F469-1F3FB",
    "1F46D-1F3FC",
    "1F469-1F3FC-200D-1F91D-200D-1F469-1F3FD",
    "1F469-1F3FC-200D-1F91D-200D-1F469-1F3FE",
    "1F469-1F3FC-200D-1F91D-200D-1F469-1F3FF",
    "1F469-1F3FD-200D-1F91D-200D-1F469-1F3FB",
    "1F469-1F3FD-200D-1F91D-200D-1F469-1F3FC",
    "1F46D-1F3FD",
    "1F469-1F3FD-200D-1F91D-200D-1F469-1F3FE",
    "1F469-1F3FD-200D-1F91D-200D-1F469-1F3FF",
    "1F469-1F3FE-200D-1F91D-200D-1F469-1F3FB",
    "1F469-1F3FE-200D-1F91D-200D-1F469-1F3FC",
    "1F469-1F3FE-200D-1F91D-200D-1F469-1F3FD",
    "1F46D-1F3FE",
    "1F469-1F3FE-200D-1F91D-200D-1F469-1F3FF",
    "1F469-1F3FF-200D-1F91D-200D-1F469-1F3FB",
    "1F469-1F3FF-200D-1F91D-200D-1F469-1F3FC",
    "1F469-1F3FF-200D-1F91D-200D-1F469-1F3FD",
    "1F469-1F3FF-200D-1F91D-200D-1F469-1F3FE",
    "1F46D-1F3FF",
    "1F46B",
    "1F46B-1F3FB",
    "1F469-1F3FB-200D-1F91D-200D-1F468-1F3FC",
    "1F469-1F3FB-200D-1F91D-200D-1F468-1F3FD",
    "1F469-1F3FB-200D-1F91D-200D-1F468-1F3FE",
    "1F469-1F3FB-200D-1F91D-200D-1F468-1F3FF",
    "1F469-1F3FC-200D-1F91D-200D-1F468-1F3FB",
    "1F46B-1F3FC",
    "1F469-1F3FC-200D-1F91D-200D-1F468-1F3FD",
    "1F469-1F3FC-200D-1F91D-200D-1F468-1F3FE",
    "1F469-1F3FC-200D-1F91D-200D-1F468-1F3FF",
    "1F469-1F3FD-200D-1F91D-200D-1F468-1F3FB",
    "1F469-1F3FD-200D-1F91D-200D-1F468-1F3FC",
    "1F46B-1F3FD",
    "1F469-1F3FD-200D-1F91D-200D-1F468-1F3FE",
    "1F469-1F3FD-200D-1F91D-200D-1F468-1F3FF",
    "1F469-1F3FE-200D-1F91D-200D-1F468-1F3FB",
    "1F469-1F3FE-200D-1F91D-200D-1F468-1F3FC",
    "1F469-1F3FE-200D-1F91D-200D-1F468-1F3FD",
    "1F46B-1F3FE",
    "1F469-1F3FE-200D-1F91D-200D-1F468-1F3FF",
    "1F469-1F3FF-200D-1F91D-200D-1F468-1F3FB",
    "1F469-1F3FF-200D-1F91D-200D-1F468-1F3FC",
    "1F469-1F3FF-200D-1F91D-200D-1F468-1F3FD",
    "1F469-1F3FF-200D-1F91D-200D-1F468-1F3FE",
    "1F46B-1F3FF",
    "1F46C",
    "1F46C-1F3FB",
    "1F468-1F3FB-200D-1F91D-200D-1F468-1F3FC",
    "1F468-1F3FB-200D-1F91D-200D-1F468-1F3FD",
    "1F468-1F3FB-200D-1F91D-200D-1F468-1F3FE",
    "1F468-1F3FB-200D-1F91D-200D-1F468-1F3FF",
    "1F468-1F3FC-200D-1F91D-200D-1F468-1F3FB",
    "1F46C-1F3FC",
    "1F468-1F3FC-200D-1F91D-200D-1F468-1F3FD",
    "1F468-1F3FC-200D-1F91D-200D-1F468-1F3FE",
    "1F468-1F3FC-200D-1F91D-200D-1F468-1F3FF",
    "1F468-1F3FD-200D-1F91D-200D-1F468-1F3FB",
    "1F468-1F3FD-200D-1F91D-200D-1F468-1F3FC",
    "1F46C-1F3FD",
    "1F468-1F3FD-200D-1F91D-200D-1F468-1F3FE",
    "1F468-1F3FD-200D-1F91D-200D-1F468-1F3FF",
    "1F468-1F3FE-200D-1F91D-200D-1F468-1F3FB",
    "1F468-1F3FE-200D-1F91D-200D-1F468-1F3FC",
    "1F468-1F3FE-200D-1F91D-200D-1F468-1F3FD",
    "1F46C-1F3FE",
    "1F468-1F3FE-200D-1F91D-200D-1F468-1F3FF",
    "1F468-1F3FF-200D-1F91D-200D-1F468-1F3FB",
    "1F468-1F3FF-200D-1F91D-200D-1F468-1F3FC",
    "1F468-1F3FF-200D-1F91D-200D-1F468-1F3FD",
    "1F468-1F3FF-200D-1F91D-200D-1F468-1F3FE",
    "1F46C-1F3FF",
    "1F48F",
    "1F48F-1F3FB",
    "1F48F-1F3FC",
    "1F48F-1F3FD",
    "1F48F-1F3FE",
    "1F48F-1F3FF",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FB-200D-2764-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FB-200D-2764-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FB-200D-2764-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FB-200D-2764-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FC-200D-2764-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FC-200D-2764-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FC-200D-2764-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FC-200D-2764-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FD-200D-2764-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FD-200D-2764-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FD-200D-2764-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FD-200D-2764-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FE-200D-2764-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FE-200D-2764-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FE-200D-2764-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FE-200D-2764-200D-1F48B-200D-1F9D1-1F3FF",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FF-200D-2764-200D-1F48B-200D-1F9D1-1F3FB",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FF-200D-2764-200D-1F48B-200D-1F9D1-1F3FC",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FF-200D-2764-200D-1F48B-200D-1F9D1-1F3FD",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F9D1-1F3FE",
    "1F9D1-1F3FF-200D-2764-200D-1F48B-200D-1F9D1-1F3FE",
    "1F469-200D-2764-FE0F-200D-1F48B-200D-1F468",
    "1F469-200D-2764-200D-1F48B-200D-1F468",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F468-200D-2764-FE0F-200D-1F48B-200D-1F468",
    "1F468-200D-2764-200D-1F48B-200D-1F468",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FB-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FC-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FD-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FE-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FB",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FC",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FD",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FE",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F468-1F3FF",
    "1F468-1F3FF-200D-2764-200D-1F48B-200D-1F468-1F3FF",
    "1F469-200D-2764-FE0F-200D-1F48B-200D-1F469",
    "1F469-200D-2764-200D-1F48B-200D-1F469",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FB-200D-2764-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FC-200D-2764-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FD-200D-2764-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FE-200D-2764-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F469-1F3FB",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F469-1F3FC",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F469-1F3FD",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F469-1F3FE",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F48B-200D-1F469-1F3FF",
    "1F469-1F3FF-200D-2764-200D-1F48B-200D-1F469-1F3FF",
    "1F491",
    "1F491-1F3FB",
    "1F491-1F3FC",
    "1F491-1F3FD",
    "1F491-1F3FE",
    "1F491-1F3FF",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F9D1-1F3FC",
    "1F9D1-1F3FB-200D-2764-200D-1F9D1-1F3FC",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F9D1-1F3FD",
    "1F9D1-1F3FB-200D-2764-200D-1F9D1-1F3FD",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F9D1-1F3FE",
    "1F9D1-1F3FB-200D-2764-200D-1F9D1-1F3FE",
    "1F9D1-1F3FB-200D-2764-FE0F-200D-1F9D1-1F3FF",
    "1F9D1-1F3FB-200D-2764-200D-1F9D1-1F3FF",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F9D1-1F3FB",
    "1F9D1-1F3FC-200D-2764-200D-1F9D1-1F3FB",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F9D1-1F3FD",
    "1F9D1-1F3FC-200D-2764-200D-1F9D1-1F3FD",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F9D1-1F3FE",
    "1F9D1-1F3FC-200D-2764-200D-1F9D1-1F3FE",
    "1F9D1-1F3FC-200D-2764-FE0F-200D-1F9D1-1F3FF",
    "1F9D1-1F3FC-200D-2764-200D-1F9D1-1F3FF",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F9D1-1F3FB",
    "1F9D1-1F3FD-200D-2764-200D-1F9D1-1F3FB",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F9D1-1F3FC",
    "1F9D1-1F3FD-200D-2764-200D-1F9D1-1F3FC",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F9D1-1F3FE",
    "1F9D1-1F3FD-200D-2764-200D-1F9D1-1F3FE",
    "1F9D1-1F3FD-200D-2764-FE0F-200D-1F9D1-1F3FF",
    "1F9D1-1F3FD-200D-2764-200D-1F9D1-1F3FF",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F9D1-1F3FB",
    "1F9D1-1F3FE-200D-2764-200D-1F9D1-1F3FB",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F9D1-1F3FC",
    "1F9D1-1F3FE-200D-2764-200D-1F9D1-1F3FC",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F9D1-1F3FD",
    "1F9D1-1F3FE-200D-2764-200D-1F9D1-1F3FD",
    "1F9D1-1F3FE-200D-2764-FE0F-200D-1F9D1-1F3FF",
    "1F9D1-1F3FE-200D-2764-200D-1F9D1-1F3FF",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F9D1-1F3FB",
    "1F9D1-1F3FF-200D-2764-200D-1F9D1-1F3FB",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F9D1-1F3FC",
    "1F9D1-1F3FF-200D-2764-200D-1F9D1-1F3FC",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F9D1-1F3FD",
    "1F9D1-1F3FF-200D-2764-200D-1F9D1-1F3FD",
    "1F9D1-1F3FF-200D-2764-FE0F-200D-1F9D1-1F3FE",
    "1F9D1-1F3FF-200D-2764-200D-1F9D1-1F3FE",
    "1F469-200D-2764-FE0F-200D-1F468",
    "1F469-200D-2764-200D-1F468",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F469-1F3FB-200D-2764-200D-1F468-1F3FB",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F469-1F3FB-200D-2764-200D-1F468-1F3FC",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F469-1F3FB-200D-2764-200D-1F468-1F3FD",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F469-1F3FB-200D-2764-200D-1F468-1F3FE",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F469-1F3FB-200D-2764-200D-1F468-1F3FF",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F469-1F3FC-200D-2764-200D-1F468-1F3FB",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F469-1F3FC-200D-2764-200D-1F468-1F3FC",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F469-1F3FC-200D-2764-200D-1F468-1F3FD",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F469-1F3FC-200D-2764-200D-1F468-1F3FE",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F469-1F3FC-200D-2764-200D-1F468-1F3FF",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F469-1F3FD-200D-2764-200D-1F468-1F3FB",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F469-1F3FD-200D-2764-200D-1F468-1F3FC",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F469-1F3FD-200D-2764-200D-1F468-1F3FD",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F469-1F3FD-200D-2764-200D-1F468-1F3FE",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F469-1F3FD-200D-2764-200D-1F468-1F3FF",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F469-1F3FE-200D-2764-200D-1F468-1F3FB",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F469-1F3FE-200D-2764-200D-1F468-1F3FC",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F469-1F3FE-200D-2764-200D-1F468-1F3FD",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F469-1F3FE-200D-2764-200D-1F468-1F3FE",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F469-1F3FE-200D-2764-200D-1F468-1F3FF",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F469-1F3FF-200D-2764-200D-1F468-1F3FB",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F469-1F3FF-200D-2764-200D-1F468-1F3FC",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F469-1F3FF-200D-2764-200D-1F468-1F3FD",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F469-1F3FF-200D-2764-200D-1F468-1F3FE",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F469-1F3FF-200D-2764-200D-1F468-1F3FF",
    "1F468-200D-2764-FE0F-200D-1F468",
    "1F468-200D-2764-200D-1F468",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F468-1F3FB-200D-2764-200D-1F468-1F3FB",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F468-1F3FB-200D-2764-200D-1F468-1F3FC",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F468-1F3FB-200D-2764-200D-1F468-1F3FD",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F468-1F3FB-200D-2764-200D-1F468-1F3FE",
    "1F468-1F3FB-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F468-1F3FB-200D-2764-200D-1F468-1F3FF",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F468-1F3FC-200D-2764-200D-1F468-1F3FB",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F468-1F3FC-200D-2764-200D-1F468-1F3FC",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F468-1F3FC-200D-2764-200D-1F468-1F3FD",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F468-1F3FC-200D-2764-200D-1F468-1F3FE",
    "1F468-1F3FC-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F468-1F3FC-200D-2764-200D-1F468-1F3FF",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F468-1F3FD-200D-2764-200D-1F468-1F3FB",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F468-1F3FD-200D-2764-200D-1F468-1F3FC",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F468-1F3FD-200D-2764-200D-1F468-1F3FD",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F468-1F3FD-200D-2764-200D-1F468-1F3FE",
    "1F468-1F3FD-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F468-1F3FD-200D-2764-200D-1F468-1F3FF",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F468-1F3FE-200D-2764-200D-1F468-1F3FB",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F468-1F3FE-200D-2764-200D-1F468-1F3FC",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F468-1F3FE-200D-2764-200D-1F468-1F3FD",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F468-1F3FE-200D-2764-200D-1F468-1F3FE",
    "1F468-1F3FE-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F468-1F3FE-200D-2764-200D-1F468-1F3FF",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F468-1F3FB",
    "1F468-1F3FF-200D-2764-200D-1F468-1F3FB",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F468-1F3FC",
    "1F468-1F3FF-200D-2764-200D-1F468-1F3FC",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F468-1F3FD",
    "1F468-1F3FF-200D-2764-200D-1F468-1F3FD",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F468-1F3FE",
    "1F468-1F3FF-200D-2764-200D-1F468-1F3FE",
    "1F468-1F3FF-200D-2764-FE0F-200D-1F468-1F3FF",
    "1F468-1F3FF-200D-2764-200D-1F468-1F3FF",
    "1F469-200D-2764-FE0F-200D-1F469",
    "1F469-200D-2764-200D-1F469",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F469-1F3FB",
    "1F469-1F3FB-200D-2764-200D-1F469-1F3FB",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F469-1F3FC",
    "1F469-1F3FB-200D-2764-200D-1F469-1F3FC",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F469-1F3FD",
    "1F469-1F3FB-200D-2764-200D-1F469-1F3FD",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F469-1F3FE",
    "1F469-1F3FB-200D-2764-200D-1F469-1F3FE",
    "1F469-1F3FB-200D-2764-FE0F-200D-1F469-1F3FF",
    "1F469-1F3FB-200D-2764-200D-1F469-1F3FF",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F469-1F3FB",
    "1F469-1F3FC-200D-2764-200D-1F469-1F3FB",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F469-1F3FC",
    "1F469-1F3FC-200D-2764-200D-1F469-1F3FC",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F469-1F3FD",
    "1F469-1F3FC-200D-2764-200D-1F469-1F3FD",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F469-1F3FE",
    "1F469-1F3FC-200D-2764-200D-1F469-1F3FE",
    "1F469-1F3FC-200D-2764-FE0F-200D-1F469-1F3FF",
    "1F469-1F3FC-200D-2764-200D-1F469-1F3FF",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F469-1F3FB",
    "1F469-1F3FD-200D-2764-200D-1F469-1F3FB",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F469-1F3FC",
    "1F469-1F3FD-200D-2764-200D-1F469-1F3FC",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F469-1F3FD",
    "1F469-1F3FD-200D-2764-200D-1F469-1F3FD",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F469-1F3FE",
    "1F469-1F3FD-200D-2764-200D-1F469-1F3FE",
    "1F469-1F3FD-200D-2764-FE0F-200D-1F469-1F3FF",
    "1F469-1F3FD-200D-2764-200D-1F469-1F3FF",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F469-1F3FB",
    "1F469-1F3FE-200D-2764-200D-1F469-1F3FB",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F469-1F3FC",
    "1F469-1F3FE-200D-2764-200D-1F469-1F3FC",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F469-1F3FD",
    "1F469-1F3FE-200D-2764-200D-1F469-1F3FD",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F469-1F3FE",
    "1F469-1F3FE-200D-2764-200D-1F469-1F3FE",
    "1F469-1F3FE-200D-2764-FE0F-200D-1F469-1F3FF",
    "1F469-1F3FE-200D-2764-200D-1F469-1F3FF",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F469-1F3FB",
    "1F469-1F3FF-200D-2764-200D-1F469-1F3FB",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F469-1F3FC",
    "1F469-1F3FF-200D-2764-200D-1F469-1F3FC",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F469-1F3FD",
    "1F469-1F3FF-200D-2764-200D-1F469-1F3FD",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F469-1F3FE",
    "1F469-1F3FF-200D-2764-200D-1F469-1F3FE",
    "1F469-1F3FF-200D-2764-FE0F-200D-1F469-1F3FF",
    "1F469-1F3FF-200D-2764-200D-1F469-1F3FF",
    "1F468-200D-1F469-200D-1F466",
    "1F468-200D-1F469-200D-1F467",
    "1F468-200D-1F469-200D-1F467-200D-1F466",
    "1F468-200D-1F469-200D-1F466-200D-1F466",
    "1F468-200D-1F469-200D-1F467-200D-1F467",
    "1F468-200D-1F468-200D-1F466",
    "1F468-200D-1F468-200D-1F467",
    "1F468-200D-1F468-200D-1F467-200D-1F466",
    "1F468-200D-1F468-200D-1F466-200D-1F466",
    "1F468-200D-1F468-200D-1F467-200D-1F467",
    "1F469-200D-1F469-200D-1F466",
    "1F469-200D-1F469-200D-1F467",
    "1F469-200D-1F469-200D-1F467-200D-1F466",
    "1F469-200D-1F469-200D-1F466-200D-1F466",
    "1F469-200D-1F469-200D-1F467-200D-1F467",
    "1F468-200D-1F466",
    "1F468-200D-1F466-200D-1F466",
    "1F468-200D-1F467",
    "1F468-200D-1F467-200D-1F466",
    "1F468-200D-1F467-200D-1F467",
    "1F469-200D-1F466",
    "1F469-200D-1F466-200D-1F466",
    "1F469-200D-1F467",
    "1F469-200D-1F467-200D-1F466",
    "1F469-200D-1F467-200D-1F467",
    "1F5E3-FE0F",
    "1F5E3",
    "1F464",
    "1F465",
    "1FAC2",
    "1F46A",
    "1F9D1-200D-1F9D1-200D-1F9D2",
    "1F9D1-200D-1F9D1-200D-1F9D2-200D-1F9D2",
    "1F9D1-200D-1F9D2",
    "1F9D1-200D-1F9D2-200D-1F9D2",
    "1F463",
    "1FAC6"
  ],
  Component,
  "Animals & Nature": [
    "1F435",
    "1F412",
    "1F98D",
    "1F9A7",
    "1F436",
    "1F415",
    "1F9AE",
    "1F415-200D-1F9BA",
    "1F429",
    "1F43A",
    "1F98A",
    "1F99D",
    "1F431",
    "1F408",
    "1F408-200D-2B1B",
    "1F981",
    "1F42F",
    "1F405",
    "1F406",
    "1F434",
    "1FACE",
    "1FACF",
    "1F40E",
    "1F984",
    "1F993",
    "1F98C",
    "1F9AC",
    "1F42E",
    "1F402",
    "1F403",
    "1F404",
    "1F437",
    "1F416",
    "1F417",
    "1F43D",
    "1F40F",
    "1F411",
    "1F410",
    "1F42A",
    "1F42B",
    "1F999",
    "1F992",
    "1F418",
    "1F9A3",
    "1F98F",
    "1F99B",
    "1F42D",
    "1F401",
    "1F400",
    "1F439",
    "1F430",
    "1F407",
    "1F43F-FE0F",
    "1F43F",
    "1F9AB",
    "1F994",
    "1F987",
    "1F43B",
    "1F43B-200D-2744-FE0F",
    "1F43B-200D-2744",
    "1F428",
    "1F43C",
    "1F9A5",
    "1F9A6",
    "1F9A8",
    "1F998",
    "1F9A1",
    "1F43E",
    "1F983",
    "1F414",
    "1F413",
    "1F423",
    "1F424",
    "1F425",
    "1F426",
    "1F427",
    "1F54A-FE0F",
    "1F54A",
    "1F985",
    "1F986",
    "1F9A2",
    "1F989",
    "1F9A4",
    "1FAB6",
    "1F9A9",
    "1F99A",
    "1F99C",
    "1FABD",
    "1F426-200D-2B1B",
    "1FABF",
    "1F426-200D-1F525",
    "1F438",
    "1F40A",
    "1F422",
    "1F98E",
    "1F40D",
    "1F432",
    "1F409",
    "1F995",
    "1F996",
    "1F433",
    "1F40B",
    "1F42C",
    "1F9AD",
    "1F41F",
    "1F420",
    "1F421",
    "1F988",
    "1F419",
    "1F41A",
    "1FAB8",
    "1FABC",
    "1F980",
    "1F99E",
    "1F990",
    "1F991",
    "1F9AA",
    "1F40C",
    "1F98B",
    "1F41B",
    "1F41C",
    "1F41D",
    "1FAB2",
    "1F41E",
    "1F997",
    "1FAB3",
    "1F577-FE0F",
    "1F577",
    "1F578-FE0F",
    "1F578",
    "1F982",
    "1F99F",
    "1FAB0",
    "1FAB1",
    "1F9A0",
    "1F490",
    "1F338",
    "1F4AE",
    "1FAB7",
    "1F3F5-FE0F",
    "1F3F5",
    "1F339",
    "1F940",
    "1F33A",
    "1F33B",
    "1F33C",
    "1F337",
    "1FABB",
    "1F331",
    "1FAB4",
    "1F332",
    "1F333",
    "1F334",
    "1F335",
    "1F33E",
    "1F33F",
    "2618-FE0F",
    "2618",
    "1F340",
    "1F341",
    "1F342",
    "1F343",
    "1FAB9",
    "1FABA",
    "1F344",
    "1FABE"
  ],
  "Food & Drink": [
    "1F347",
    "1F348",
    "1F349",
    "1F34A",
    "1F34B",
    "1F34B-200D-1F7E9",
    "1F34C",
    "1F34D",
    "1F96D",
    "1F34E",
    "1F34F",
    "1F350",
    "1F351",
    "1F352",
    "1F353",
    "1FAD0",
    "1F95D",
    "1F345",
    "1FAD2",
    "1F965",
    "1F951",
    "1F346",
    "1F954",
    "1F955",
    "1F33D",
    "1F336-FE0F",
    "1F336",
    "1FAD1",
    "1F952",
    "1F96C",
    "1F966",
    "1F9C4",
    "1F9C5",
    "1F95C",
    "1FAD8",
    "1F330",
    "1FADA",
    "1FADB",
    "1F344-200D-1F7EB",
    "1FADC",
    "1F35E",
    "1F950",
    "1F956",
    "1FAD3",
    "1F968",
    "1F96F",
    "1F95E",
    "1F9C7",
    "1F9C0",
    "1F356",
    "1F357",
    "1F969",
    "1F953",
    "1F354",
    "1F35F",
    "1F355",
    "1F32D",
    "1F96A",
    "1F32E",
    "1F32F",
    "1FAD4",
    "1F959",
    "1F9C6",
    "1F95A",
    "1F373",
    "1F958",
    "1F372",
    "1FAD5",
    "1F963",
    "1F957",
    "1F37F",
    "1F9C8",
    "1F9C2",
    "1F96B",
    "1F371",
    "1F358",
    "1F359",
    "1F35A",
    "1F35B",
    "1F35C",
    "1F35D",
    "1F360",
    "1F362",
    "1F363",
    "1F364",
    "1F365",
    "1F96E",
    "1F361",
    "1F95F",
    "1F960",
    "1F961",
    "1F366",
    "1F367",
    "1F368",
    "1F369",
    "1F36A",
    "1F382",
    "1F370",
    "1F9C1",
    "1F967",
    "1F36B",
    "1F36C",
    "1F36D",
    "1F36E",
    "1F36F",
    "1F37C",
    "1F95B",
    "2615",
    "1FAD6",
    "1F375",
    "1F376",
    "1F37E",
    "1F377",
    "1F378",
    "1F379",
    "1F37A",
    "1F37B",
    "1F942",
    "1F943",
    "1FAD7",
    "1F964",
    "1F9CB",
    "1F9C3",
    "1F9C9",
    "1F9CA",
    "1F962",
    "1F37D-FE0F",
    "1F37D",
    "1F374",
    "1F944",
    "1F52A",
    "1FAD9",
    "1F3FA"
  ],
  "Travel & Places": [
    "1F30D",
    "1F30E",
    "1F30F",
    "1F310",
    "1F5FA-FE0F",
    "1F5FA",
    "1F5FE",
    "1F9ED",
    "1F3D4-FE0F",
    "1F3D4",
    "26F0-FE0F",
    "26F0",
    "1F30B",
    "1F5FB",
    "1F3D5-FE0F",
    "1F3D5",
    "1F3D6-FE0F",
    "1F3D6",
    "1F3DC-FE0F",
    "1F3DC",
    "1F3DD-FE0F",
    "1F3DD",
    "1F3DE-FE0F",
    "1F3DE",
    "1F3DF-FE0F",
    "1F3DF",
    "1F3DB-FE0F",
    "1F3DB",
    "1F3D7-FE0F",
    "1F3D7",
    "1F9F1",
    "1FAA8",
    "1FAB5",
    "1F6D6",
    "1F3D8-FE0F",
    "1F3D8",
    "1F3DA-FE0F",
    "1F3DA",
    "1F3E0",
    "1F3E1",
    "1F3E2",
    "1F3E3",
    "1F3E4",
    "1F3E5",
    "1F3E6",
    "1F3E8",
    "1F3E9",
    "1F3EA",
    "1F3EB",
    "1F3EC",
    "1F3ED",
    "1F3EF",
    "1F3F0",
    "1F492",
    "1F5FC",
    "1F5FD",
    "26EA",
    "1F54C",
    "1F6D5",
    "1F54D",
    "26E9-FE0F",
    "26E9",
    "1F54B",
    "26F2",
    "26FA",
    "1F301",
    "1F303",
    "1F3D9-FE0F",
    "1F3D9",
    "1F304",
    "1F305",
    "1F306",
    "1F307",
    "1F309",
    "2668-FE0F",
    "2668",
    "1F3A0",
    "1F6DD",
    "1F3A1",
    "1F3A2",
    "1F488",
    "1F3AA",
    "1F682",
    "1F683",
    "1F684",
    "1F685",
    "1F686",
    "1F687",
    "1F688",
    "1F689",
    "1F68A",
    "1F69D",
    "1F69E",
    "1F68B",
    "1F68C",
    "1F68D",
    "1F68E",
    "1F690",
    "1F691",
    "1F692",
    "1F693",
    "1F694",
    "1F695",
    "1F696",
    "1F697",
    "1F698",
    "1F699",
    "1F6FB",
    "1F69A",
    "1F69B",
    "1F69C",
    "1F3CE-FE0F",
    "1F3CE",
    "1F3CD-FE0F",
    "1F3CD",
    "1F6F5",
    "1F9BD",
    "1F9BC",
    "1F6FA",
    "1F6B2",
    "1F6F4",
    "1F6F9",
    "1F6FC",
    "1F68F",
    "1F6E3-FE0F",
    "1F6E3",
    "1F6E4-FE0F",
    "1F6E4",
    "1F6E2-FE0F",
    "1F6E2",
    "26FD",
    "1F6DE",
    "1F6A8",
    "1F6A5",
    "1F6A6",
    "1F6D1",
    "1F6A7",
    "2693",
    "1F6DF",
    "26F5",
    "1F6F6",
    "1F6A4",
    "1F6F3-FE0F",
    "1F6F3",
    "26F4-FE0F",
    "26F4",
    "1F6E5-FE0F",
    "1F6E5",
    "1F6A2",
    "2708-FE0F",
    "2708",
    "1F6E9-FE0F",
    "1F6E9",
    "1F6EB",
    "1F6EC",
    "1FA82",
    "1F4BA",
    "1F681",
    "1F69F",
    "1F6A0",
    "1F6A1",
    "1F6F0-FE0F",
    "1F6F0",
    "1F680",
    "1F6F8",
    "1F6CE-FE0F",
    "1F6CE",
    "1F9F3",
    "231B",
    "23F3",
    "231A",
    "23F0",
    "23F1-FE0F",
    "23F1",
    "23F2-FE0F",
    "23F2",
    "1F570-FE0F",
    "1F570",
    "1F55B",
    "1F567",
    "1F550",
    "1F55C",
    "1F551",
    "1F55D",
    "1F552",
    "1F55E",
    "1F553",
    "1F55F",
    "1F554",
    "1F560",
    "1F555",
    "1F561",
    "1F556",
    "1F562",
    "1F557",
    "1F563",
    "1F558",
    "1F564",
    "1F559",
    "1F565",
    "1F55A",
    "1F566",
    "1F311",
    "1F312",
    "1F313",
    "1F314",
    "1F315",
    "1F316",
    "1F317",
    "1F318",
    "1F319",
    "1F31A",
    "1F31B",
    "1F31C",
    "1F321-FE0F",
    "1F321",
    "2600-FE0F",
    "2600",
    "1F31D",
    "1F31E",
    "1FA90",
    "2B50",
    "1F31F",
    "1F320",
    "1F30C",
    "2601-FE0F",
    "2601",
    "26C5",
    "26C8-FE0F",
    "26C8",
    "1F324-FE0F",
    "1F324",
    "1F325-FE0F",
    "1F325",
    "1F326-FE0F",
    "1F326",
    "1F327-FE0F",
    "1F327",
    "1F328-FE0F",
    "1F328",
    "1F329-FE0F",
    "1F329",
    "1F32A-FE0F",
    "1F32A",
    "1F32B-FE0F",
    "1F32B",
    "1F32C-FE0F",
    "1F32C",
    "1F300",
    "1F308",
    "1F302",
    "2602-FE0F",
    "2602",
    "2614",
    "26F1-FE0F",
    "26F1",
    "26A1",
    "2744-FE0F",
    "2744",
    "2603-FE0F",
    "2603",
    "26C4",
    "2604-FE0F",
    "2604",
    "1F525",
    "1F4A7",
    "1F30A"
  ],
  Activities,
  Objects,
  Symbols,
  Flags
};
const css = {
  code: "svelte-virtual-list-viewport.svelte-1tqh76q{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-1tqh76q,svelte-virtual-list-row.svelte-1tqh76q{display:block}svelte-virtual-list-row.svelte-1tqh76q{overflow:hidden}",
  map: `{"version":3,"file":"VirtualList.svelte","sources":["VirtualList.svelte"],"sourcesContent":["<script>\\n\\timport { onMount, tick } from 'svelte';\\n\\n\\t// props\\n\\texport let items;\\n\\texport let height = '100%';\\n\\texport let itemHeight = undefined;\\n\\n\\tlet foo;\\n\\n\\t// read-only, but visible to consumers via bind:start\\n\\texport let start = 0;\\n\\texport let end = 0;\\n\\n\\t// local state\\n\\tlet height_map = [];\\n\\tlet rows;\\n\\tlet viewport;\\n\\tlet contents;\\n\\tlet viewport_height = 0;\\n\\tlet visible;\\n\\tlet mounted;\\n\\n\\tlet top = 0;\\n\\tlet bottom = 0;\\n\\tlet average_height;\\n\\n\\t$: visible = items.slice(start, end).map((data, i) => {\\n\\t\\treturn { index: i + start, data };\\n\\t});\\n\\n\\t// whenever \`items\` changes, invalidate the current heightmap\\n\\t$: if (mounted) refresh(items, viewport_height, itemHeight);\\n\\n\\tasync function refresh(items, viewport_height, itemHeight) {\\n\\t\\tconst { scrollTop } = viewport;\\n\\n\\t\\tawait tick(); // wait until the DOM is up to date\\n\\n\\t\\tlet content_height = top - scrollTop;\\n\\t\\tlet i = start;\\n\\n\\t\\twhile (content_height < viewport_height && i < items.length) {\\n\\t\\t\\tlet row = rows[i - start];\\n\\n\\t\\t\\tif (!row) {\\n\\t\\t\\t\\tend = i + 1;\\n\\t\\t\\t\\tawait tick(); // render the newly visible row\\n\\t\\t\\t\\trow = rows[i - start];\\n\\t\\t\\t}\\n\\n\\t\\t\\tconst row_height = height_map[i] = itemHeight || row.offsetHeight;\\n\\t\\t\\tcontent_height += row_height;\\n\\t\\t\\ti += 1;\\n\\t\\t}\\n\\n\\t\\tend = i;\\n\\n\\t\\tconst remaining = items.length - end;\\n\\t\\taverage_height = (top + content_height) / end;\\n\\n\\t\\tbottom = remaining * average_height;\\n\\t\\theight_map.length = items.length;\\n\\n\\t}\\n\\n\\tasync function handle_scroll() {\\n\\t\\tconst { scrollTop } = viewport;\\n\\n\\t\\tconst old_start = start;\\n\\n\\t\\tfor (let v = 0; v < rows.length; v += 1) {\\n\\t\\t\\theight_map[start + v] = itemHeight || rows[v].offsetHeight;\\n\\t\\t}\\n\\n\\t\\tlet i = 0;\\n\\t\\tlet y = 0;\\n\\n\\t\\twhile (i < items.length) {\\n\\t\\t\\tconst row_height = height_map[i] || average_height;\\n\\t\\t\\tif (y + row_height > scrollTop) {\\n\\t\\t\\t\\tstart = i;\\n\\t\\t\\t\\ttop = y;\\n\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\n\\t\\t\\ty += row_height;\\n\\t\\t\\ti += 1;\\n\\t\\t}\\n\\n\\t\\twhile (i < items.length) {\\n\\t\\t\\ty += height_map[i] || average_height;\\n\\t\\t\\ti += 1;\\n\\n\\t\\t\\tif (y > scrollTop + viewport_height) break;\\n\\t\\t}\\n\\n\\t\\tend = i;\\n\\n\\t\\tconst remaining = items.length - end;\\n\\t\\taverage_height = y / end;\\n\\n\\t\\twhile (i < items.length) height_map[i++] = average_height;\\n\\t\\tbottom = remaining * average_height;\\n\\n\\t\\t// prevent jumping if we scrolled up into unknown territory\\n\\t\\tif (start < old_start) {\\n\\t\\t\\tawait tick();\\n\\n\\t\\t\\tlet expected_height = 0;\\n\\t\\t\\tlet actual_height = 0;\\n\\n\\t\\t\\tfor (let i = start; i < old_start; i +=1) {\\n\\t\\t\\t\\tif (rows[i - start]) {\\n\\t\\t\\t\\t\\texpected_height += height_map[i];\\n\\t\\t\\t\\t\\tactual_height += itemHeight || rows[i - start].offsetHeight;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\tconst d = actual_height - expected_height;\\n\\t\\t\\tviewport.scrollTo(0, scrollTop + d);\\n\\t\\t}\\n\\n\\t\\t// TODO if we overestimated the space these\\n\\t\\t// rows would occupy we may need to add some\\n\\t\\t// more. maybe we can just call handle_scroll again?\\n\\t}\\n\\n\\t// trigger initial refresh\\n\\tonMount(() => {\\n\\t\\trows = contents.getElementsByTagName('svelte-virtual-list-row');\\n\\t\\tmounted = true;\\n\\t});\\n<\/script>\\n\\n<style>\\n\\tsvelte-virtual-list-viewport {\\n\\t\\tposition: relative;\\n\\t\\toverflow-y: auto;\\n\\t\\t-webkit-overflow-scrolling:touch;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tsvelte-virtual-list-contents, svelte-virtual-list-row {\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tsvelte-virtual-list-row {\\n\\t\\toverflow: hidden;\\n\\t}\\n</style>\\n\\n<svelte-virtual-list-viewport\\n\\tbind:this={viewport}\\n\\tbind:offsetHeight={viewport_height}\\n\\ton:scroll={handle_scroll}\\n\\tstyle=\\"height: {height};\\"\\n>\\n\\t<svelte-virtual-list-contents\\n\\t\\tbind:this={contents}\\n\\t\\tstyle=\\"padding-top: {top}px; padding-bottom: {bottom}px;\\"\\n\\t>\\n\\t\\t{#each visible as row (row.index)}\\n\\t\\t\\t<svelte-virtual-list-row>\\n\\t\\t\\t\\t<slot item={row.data}>Missing template</slot>\\n\\t\\t\\t</svelte-virtual-list-row>\\n\\t\\t{/each}\\n\\t</svelte-virtual-list-contents>\\n</svelte-virtual-list-viewport>\\n"],"names":[],"mappings":"AAyIC,2CAA6B,CAC5B,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,2BAA2B,KAAK,CAChC,OAAO,CAAE,KACV,CAEA,2CAA4B,CAAE,sCAAwB,CACrD,OAAO,CAAE,KACV,CAEA,sCAAwB,CACvB,QAAQ,CAAE,MACX"}`
};
const VirtualList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  let { height = "100%" } = $$props;
  let { itemHeight = void 0 } = $$props;
  let { start = 0 } = $$props;
  let { end = 0 } = $$props;
  let viewport;
  let contents;
  let visible;
  let top = 0;
  let bottom = 0;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0) $$bindings.itemHeight(itemHeight);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0) $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0) $$bindings.end(end);
  $$result.css.add(css);
  visible = items.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  });
  return `<svelte-virtual-list-viewport style="${"height: " + escape(height, true) + ";"}" class="svelte-1tqh76q"${add_attribute("this", viewport, 0)}><svelte-virtual-list-contents style="${"padding-top: " + escape(top, true) + "px; padding-bottom: " + escape(bottom, true) + "px;"}" class="svelte-1tqh76q"${add_attribute("this", contents, 0)}>${each(visible, (row) => {
    return `<svelte-virtual-list-row class="svelte-1tqh76q">${slots.default ? slots.default({ item: row.data }) : `Missing template`} </svelte-virtual-list-row>`;
  })}</svelte-virtual-list-contents></svelte-virtual-list-viewport>`;
});
const ROW_HEIGHT = 48;
const ReactionPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onClose = () => {
  } } = $$props;
  let { onSubmit = (name) => {
  } } = $$props;
  let { side = "top" } = $$props;
  let { align = "start" } = $$props;
  let { user: user2 = null } = $$props;
  let show = false;
  let emojis = emojiShortCodes;
  let search = "";
  let flattenedEmojis = [];
  let emojiRows = [];
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0) $$bindings.onSubmit(onSubmit);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.user === void 0 && $$bindings.user && user2 !== void 0) $$bindings.user(user2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (search) {
          emojis = Object.keys(emojiShortCodes).reduce(
            (acc, key) => {
              if (key.includes(search)) {
                acc[key] = emojiShortCodes[key];
              } else {
                if (Array.isArray(emojiShortCodes[key])) {
                  const filtered = emojiShortCodes[key].filter((emoji) => emoji.includes(search));
                  if (filtered.length) {
                    acc[key] = filtered;
                  }
                } else {
                  if (emojiShortCodes[key].includes(search)) {
                    acc[key] = emojiShortCodes[key];
                  }
                }
              }
              return acc;
            },
            {}
          );
        } else {
          emojis = emojiShortCodes;
        }
      }
    }
    {
      {
        flattenedEmojis = [];
        Object.keys(emojiGroups).forEach((group) => {
          const groupEmojis = emojiGroups[group].filter((emoji) => emojis[emoji]);
          if (groupEmojis.length > 0) {
            flattenedEmojis.push({ type: "group", label: group });
            flattenedEmojis.push(...groupEmojis.map((emoji) => ({
              type: "emoji",
              name: emoji,
              shortCodes: typeof emojiShortCodes[emoji] === "string" ? [emojiShortCodes[emoji]] : emojiShortCodes[emoji]
            })));
          }
        });
        emojiRows = [];
        let currentRow = [];
        flattenedEmojis.forEach((item) => {
          if (item.type === "emoji") {
            currentRow.push(item);
            if (currentRow.length === 8) {
              emojiRows.push(currentRow);
              currentRow = [];
            }
          } else if (item.type === "group") {
            if (currentRow.length > 0) {
              emojiRows.push(currentRow);
              currentRow = [];
            }
            emojiRows.push([item]);
          }
        });
        if (currentRow.length > 0) {
          emojiRows.push(currentRow);
        }
      }
    }
    $$rendered = `${validate_component(Menu, "DropdownMenu.Root").$$render(
      $$result,
      {
        closeFocus: false,
        onOpenChange: (state) => {
          if (!state) {
            search = "";
            onClose();
          }
        },
        typeahead: false,
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
          return `${validate_component(Menu_trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          })} ${validate_component(Menu_content, "DropdownMenu.Content").$$render(
            $$result,
            {
              class: "max-w-full w-80 bg-gray-50 dark:bg-gray-850 rounded-lg z-9999 shadow-lg dark:text-white",
              sideOffset: 8,
              side,
              align,
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `<div class="mb-1 px-3 pt-2 pb-2"><input type="text" class="w-full text-sm bg-transparent outline-hidden" placeholder="Search all emojis"${add_attribute("value", search, 0)}></div>  <div class="w-full flex justify-start h-96 overflow-y-auto px-3 pb-3 text-sm">${emojiRows.length === 0 ? `<div class="text-center text-xs text-gray-500 dark:text-gray-400" data-svelte-h="svelte-d5mw7h">No results</div>` : `<div class="w-full flex ml-0.5">${validate_component(VirtualList, "VirtualList").$$render(
                  $$result,
                  {
                    rowHeight: ROW_HEIGHT,
                    items: emojiRows,
                    height: 384
                  },
                  {},
                  {
                    default: ({ item }) => {
                      return `<div class="w-full">${item.length === 1 && item[0].type === "group" ? ` <div class="text-xs font-medium mb-2 text-gray-500 dark:text-gray-400">${escape(item[0].label)}</div>` : ` <div class="flex items-center gap-1.5 w-full">${each(item, (emojiItem) => {
                        return `${validate_component(Tooltip, "Tooltip").$$render(
                          $$result,
                          {
                            content: emojiItem.shortCodes.map((code) => `:${code}:`).join(", "),
                            placement: "top"
                          },
                          {},
                          {
                            default: () => {
                              return `<button class="p-1.5 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"><img src="${"/assets/emojis/" + escape(emojiItem.name.toLowerCase(), true) + ".svg"}"${add_attribute("alt", emojiItem.name, 0)} class="size-5" loading="lazy"></button> `;
                            }
                          }
                        )}`;
                      })}</div>`}</div>`;
                    }
                  }
                )}</div>`}</div>`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $settings, $$unsubscribe_settings;
  let $user, $$unsubscribe_user;
  let $shortCodesToEmojis, $$unsubscribe_shortCodesToEmojis;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_shortCodesToEmojis = subscribe(shortCodesToEmojis, (value) => $shortCodesToEmojis = value);
  dayjs.extend(relativeTime);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);
  dayjs.extend(localizedFormat);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { message } = $$props;
  let { showUserProfile = true } = $$props;
  let { thread = false } = $$props;
  let { onDelete = () => {
  } } = $$props;
  let { onEdit = () => {
  } } = $$props;
  let { onThread = () => {
  } } = $$props;
  let { onReaction = () => {
  } } = $$props;
  let showButtons = false;
  let showDeleteConfirmDialog = false;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.showUserProfile === void 0 && $$bindings.showUserProfile && showUserProfile !== void 0) $$bindings.showUserProfile(showUserProfile);
  if ($$props.thread === void 0 && $$bindings.thread && thread !== void 0) $$bindings.thread(thread);
  if ($$props.onDelete === void 0 && $$bindings.onDelete && onDelete !== void 0) $$bindings.onDelete(onDelete);
  if ($$props.onEdit === void 0 && $$bindings.onEdit && onEdit !== void 0) $$bindings.onEdit(onEdit);
  if ($$props.onThread === void 0 && $$bindings.onThread && onThread !== void 0) $$bindings.onThread(onThread);
  if ($$props.onReaction === void 0 && $$bindings.onReaction && onReaction !== void 0) $$bindings.onReaction(onReaction);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(ConfirmDialog, "ConfirmDialog").$$render(
      $$result,
      {
        title: $i18n.t("Delete Message"),
        message: $i18n.t("Are you sure you want to delete this message?"),
        onConfirm: async () => {
          await onDelete();
        },
        show: showDeleteConfirmDialog
      },
      {
        show: ($$value) => {
          showDeleteConfirmDialog = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${message ? `<div class="${"flex flex-col justify-between px-5 " + escape(showUserProfile ? "pt-1.5 pb-0.5" : "", true) + " w-full " + escape(
      $settings?.widescreenMode ?? null ? "max-w-full" : "max-w-5xl",
      true
    ) + " mx-auto group hover:bg-gray-300/5 dark:hover:bg-gray-700/5 transition relative"}">${`<div class="${"absolute " + escape(showButtons ? "" : "invisible group-hover:visible", true) + " right-1 -top-2 z-10"}"><div class="flex gap-1 rounded-lg bg-white dark:bg-gray-850 shadow-md p-0.5 border border-gray-100 dark:border-gray-850">${validate_component(ReactionPicker, "ReactionPicker").$$render(
      $$result,
      {
        onClose: () => showButtons = false,
        onSubmit: (name) => {
          showButtons = false;
          onReaction(name);
        }
      },
      {},
      {
        default: () => {
          return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Add Reaction") }, {}, {
            default: () => {
              return `<button class="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg p-1">${validate_component(FaceSmile, "FaceSmile").$$render($$result, {}, {}, {})}</button>`;
            }
          })}`;
        }
      }
    )} ${!thread ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Reply in Thread") }, {}, {
      default: () => {
        return `<button class="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg p-1">${validate_component(ChatBubbleOvalEllipsis, "ChatBubbleOvalEllipsis").$$render($$result, {}, {}, {})}</button>`;
      }
    })}` : ``} ${message.user_id === $user.id || $user.role === "admin" ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Edit") }, {}, {
      default: () => {
        return `<button class="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg p-1">${validate_component(Pencil, "Pencil").$$render($$result, {}, {}, {})}</button>`;
      }
    })} ${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Delete") }, {}, {
      default: () => {
        return `<button class="hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg p-1">${validate_component(GarbageBin, "GarbageBin").$$render($$result, {}, {}, {})}</button>`;
      }
    })}` : ``}</div></div>`} <div class="${"flex w-full message-" + escape(message.id, true)}" id="${"message-" + escape(message.id, true)}"${add_attribute("dir", $settings.chatDirection, 0)}><div${add_attribute(
      "class",
      `shrink-0 ${($settings?.chatDirection ?? "LTR") === "LTR" ? "mr-3" : "ml-3"} w-9`,
      0
    )}>${showUserProfile ? `${validate_component(ProfilePreview, "ProfilePreview").$$render($$result, { user: message.user }, {}, {
      default: () => {
        return `${validate_component(ProfileImage, "ProfileImage").$$render(
          $$result,
          {
            src: message.user?.profile_image_url ?? ($i18n.language === "dg-DG" ? `/doge.png` : `static/favicon.png`),
            className: "size-8 translate-y-1 ml-0.5"
          },
          {},
          {}
        )}`;
      }
    })}` : ` ${message.created_at ? `<div class="mt-1.5 flex shrink-0 items-center text-xs self-center invisible group-hover:visible text-gray-500 font-medium first-letter:capitalize">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: dayjs(message.created_at / 1e6).format("LLLL")
      },
      {},
      {
        default: () => {
          return `${escape(dayjs(message.created_at / 1e6).format("HH:mm"))}`;
        }
      }
    )}</div>` : ``}`}</div> <div class="flex-auto w-0 pl-1">${showUserProfile ? `${validate_component(Name, "Name").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="self-end text-base shrink-0 font-medium truncate">${escape(message?.user?.name)}</div> ${message.created_at ? `<div class="self-center text-xs invisible group-hover:visible text-gray-400 font-medium first-letter:capitalize ml-0.5 translate-y-[1px]">${validate_component(Tooltip, "Tooltip").$$render(
          $$result,
          {
            content: dayjs(message.created_at / 1e6).format("LLLL")
          },
          {},
          {
            default: () => {
              return `<span class="line-clamp-1">${escape(formatDate(message.created_at / 1e6))}</span>`;
            }
          }
        )}</div>` : ``}`;
      }
    })}` : ``} ${(message?.data?.files ?? []).length > 0 ? `<div class="my-2.5 w-full flex overflow-x-auto gap-2 flex-wrap">${each(message?.data?.files, (file) => {
      return `<div>${file.type === "image" ? `${validate_component(Image, "Image").$$render(
        $$result,
        {
          src: file.url,
          alt: file.name,
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
    })}</div>` : ``} ${`<div class="min-w-full markdown-prose">${validate_component(Markdown, "Markdown").$$render($$result, { id: message.id, content: message.content }, {}, {})}${message.created_at !== message.updated_at ? `<span class="text-gray-500 text-[10px]" data-svelte-h="svelte-112y13s">(edited)</span>` : ``}</div> ${(message?.reactions ?? []).length > 0 ? `<div><div class="flex items-center flex-wrap gap-y-1.5 gap-1 mt-1 mb-2">${each(message.reactions, (reaction) => {
      return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: `:${reaction.name}:` }, {}, {
        default: () => {
          return `<button class="${"flex items-center gap-1.5 transition rounded-xl px-2 py-1 cursor-pointer " + escape(
            reaction.user_ids.includes($user.id) ? " bg-blue-300/10 outline outline-blue-500/50 outline-1" : "bg-gray-300/10 dark:bg-gray-500/10 hover:outline hover:outline-gray-700/30 dark:hover:outline-gray-300/30 hover:outline-1",
            true
          )}">${$shortCodesToEmojis[reaction.name] ? `<img src="${"/assets/emojis/" + escape($shortCodesToEmojis[reaction.name].toLowerCase(), true) + ".svg"}"${add_attribute("alt", reaction.name, 0)} class="size-4" loading="lazy">` : `<div>${escape(reaction.name)} </div>`} ${reaction.user_ids.length > 0 ? `<div class="text-xs font-medium text-gray-500 dark:text-gray-400">${escape(reaction.user_ids?.length)} </div>` : ``}</button> `;
        }
      })}`;
    })} ${validate_component(ReactionPicker, "ReactionPicker").$$render(
      $$result,
      {
        onSubmit: (name) => {
          onReaction(name);
        }
      },
      {},
      {
        default: () => {
          return `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Add Reaction") }, {}, {
            default: () => {
              return `<div class="flex items-center gap-1.5 bg-gray-500/10 hover:outline hover:outline-gray-700/30 dark:hover:outline-gray-300/30 hover:outline-1 transition rounded-xl px-1 py-1 cursor-pointer text-gray-500 dark:text-gray-400">${validate_component(FaceSmile, "FaceSmile").$$render($$result, {}, {}, {})}</div>`;
            }
          })}`;
        }
      }
    )}</div></div>` : ``} ${!thread && message.reply_count > 0 ? `<div class="flex items-center gap-1.5 -mt-0.5 mb-1.5"><button class="flex items-center text-xs py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"><span class="font-medium mr-1">${escape($i18n.t("{{COUNT}} Replies", { COUNT: message.reply_count }))}</span><span>${escape(" - ")}${escape($i18n.t("Last reply"))} ${escape(dayjs.unix(message.latest_reply_at / 1e9).fromNow())}</span> <span class="ml-1">${validate_component(ChevronRight, "ChevronRight").$$render($$result, { className: "size-2.5", strokeWidth: "3" }, {}, {})}</span> </button></div>` : ``}`}</div></div></div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_user();
  $$unsubscribe_shortCodesToEmojis();
  return $$rendered;
});
const Messages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $user, $$unsubscribe_user;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  dayjs.extend(relativeTime);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);
  getContext("i18n");
  let { id = null } = $$props;
  let { channel = null } = $$props;
  let { messages = [] } = $$props;
  let { top = false } = $$props;
  let { thread = false } = $$props;
  let { onLoad = () => {
  } } = $$props;
  let { onThread = () => {
  } } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.channel === void 0 && $$bindings.channel && channel !== void 0) $$bindings.channel(channel);
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0) $$bindings.messages(messages);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0) $$bindings.top(top);
  if ($$props.thread === void 0 && $$bindings.thread && thread !== void 0) $$bindings.thread(thread);
  if ($$props.onLoad === void 0 && $$bindings.onLoad && onLoad !== void 0) $$bindings.onLoad(onLoad);
  if ($$props.onThread === void 0 && $$bindings.onThread && onThread !== void 0) $$bindings.onThread(onThread);
  $$unsubscribe_settings();
  $$unsubscribe_user();
  return `${messages ? (() => {
    let messageList = messages.slice().reverse();
    return ` <div>${!top ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="w-full flex justify-center py-1 text-xs animate-pulse items-center gap-2">${validate_component(Spinner, "Spinner").$$render($$result, { className: " size-4" }, {}, {})} <div class="" data-svelte-h="svelte-17uns3n">Loading...</div></div>`;
      }
    })}` : `${!thread ? `<div class="${"px-5 " + escape(
      $settings?.widescreenMode ?? null ? "max-w-full" : "max-w-5xl",
      true
    ) + " mx-auto"}">${channel ? `<div class="flex flex-col gap-1.5 pb-5 pt-10"><div class="text-2xl font-medium capitalize">${escape(channel.name)}</div> <div class="text-gray-500">This channel was created on ${escape(dayjs(channel.created_at / 1e6).format("MMMM D, YYYY"))}. This is the very beginning of the ${escape(channel.name)}
							channel.</div></div>` : `<div class="flex justify-center text-xs items-center gap-2 py-5" data-svelte-h="svelte-yiui51"><div class="">Start of the channel</div></div>`} ${messageList.length > 0 ? `<hr class="border-gray-50 dark:border-gray-700/20 py-2.5 w-full">` : ``}</div>` : ``}`} ${each(messageList, (message, messageIdx) => {
      return `${validate_component(Message, "Message").$$render(
        $$result,
        {
          message,
          thread,
          showUserProfile: messageIdx === 0 || messageList.at(messageIdx - 1)?.user_id !== message.user_id,
          onDelete: () => {
            messages = messages.filter((m) => m.id !== message.id);
            deleteMessage(localStorage.token, message.channel_id, message.id).catch((error) => {
              toast.error(`${error}`);
              return null;
            });
          },
          onEdit: (content) => {
            messages = messages.map((m) => {
              if (m.id === message.id) {
                m.content = content;
              }
              return m;
            });
            updateMessage(localStorage.token, message.channel_id, message.id, { content }).catch((error) => {
              toast.error(`${error}`);
              return null;
            });
          },
          onThread: (id2) => {
            onThread(id2);
          },
          onReaction: (name) => {
            if ((message?.reactions ?? []).find((reaction) => reaction.name === name)?.user_ids?.includes($user.id) ?? false) {
              messages = messages.map((m) => {
                if (m.id === message.id) {
                  const reaction = m.reactions.find((reaction2) => reaction2.name === name);
                  if (reaction) {
                    reaction.user_ids = reaction.user_ids.filter((id2) => id2 !== $user.id);
                    reaction.count = reaction.user_ids.length;
                    if (reaction.count === 0) {
                      m.reactions = m.reactions.filter((r) => r.name !== name);
                    }
                  }
                }
                return m;
              });
              removeReaction(localStorage.token, message.channel_id, message.id, name).catch((error) => {
                toast.error(`${error}`);
                return null;
              });
            } else {
              messages = messages.map((m) => {
                if (m.id === message.id) {
                  if (m.reactions) {
                    const reaction = m.reactions.find((reaction2) => reaction2.name === name);
                    if (reaction) {
                      reaction.user_ids.push($user.id);
                      reaction.count = reaction.user_ids.length;
                    } else {
                      m.reactions.push({ name, user_ids: [$user.id], count: 1 });
                    }
                  }
                }
                return m;
              });
              addReaction(localStorage.token, message.channel_id, message.id, name).catch((error) => {
                toast.error(`${error}`);
                return null;
              });
            }
          }
        },
        {},
        {}
      )}`;
    })} <div class="pb-6"></div></div>`;
  })() : ``}`;
});
const InputMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $mobile, $$unsubscribe_mobile;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_mobile = subscribe(mobile, (value) => $mobile = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { screenCaptureHandler } = $$props;
  let { uploadFilesHandler } = $$props;
  let { onClose = () => {
  } } = $$props;
  let show = false;
  const init = async () => {
  };
  if ($$props.screenCaptureHandler === void 0 && $$bindings.screenCaptureHandler && screenCaptureHandler !== void 0) $$bindings.screenCaptureHandler(screenCaptureHandler);
  if ($$props.uploadFilesHandler === void 0 && $$bindings.uploadFilesHandler && uploadFilesHandler !== void 0) $$bindings.uploadFilesHandler(uploadFilesHandler);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        init();
      }
    }
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
              class: "w-full max-w-[200px] rounded-xl px-1 py-1  border-gray-300/30 dark:border-gray-700/50 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-sm",
              sideOffset: 15,
              alignOffset: -8,
              side: "top",
              align: "start",
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `${!$mobile ? `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm  font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  rounded-xl"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(CameraSolid, "CameraSolid").$$render($$result, {}, {}, {})} <div class="line-clamp-1">${escape($i18n.t("Capture"))}</div>`;
                    }
                  }
                )}` : ``} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex gap-2 items-center px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(DocumentArrowUpSolid, "DocumentArrowUpSolid").$$render($$result, {}, {}, {})} <div class="line-clamp-1">${escape($i18n.t("Upload Files"))}</div>`;
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
  $$unsubscribe_mobile();
  $$unsubscribe_i18n();
  return $$rendered;
});
const MessageInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $mobile, $$unsubscribe_mobile;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_mobile = subscribe(mobile, (value) => $mobile = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { placeholder = $i18n.t("Send a Message") } = $$props;
  let { transparentBackground = false } = $$props;
  let { id = null } = $$props;
  let draggedOver = false;
  let content = "";
  let files = [];
  let filesInputElement;
  let { typingUsers = [] } = $$props;
  let { onSubmit } = $$props;
  let { onChange } = $$props;
  let { scrollEnd = true } = $$props;
  let { scrollToBottom = () => {
  } } = $$props;
  const screenCaptureHandler = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "never" }, audio: false });
      const video = document.createElement("video");
      video.srcObject = mediaStream;
      await video.play();
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      mediaStream.getTracks().forEach((track) => track.stop());
      window.focus();
      const imageUrl = canvas.toDataURL("image/png");
      files = [...files, { type: "image", url: imageUrl }];
      video.srcObject = null;
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };
  const inputFilesHandler = async (inputFiles2) => {
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
      if (["image/gif", "image/webp", "image/jpeg", "image/png", "image/avif"].includes(file["type"])) {
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
      } else {
        uploadFileHandler(file);
      }
    });
  };
  const uploadFileHandler = async (file) => {
    const tempItemId = v4();
    const fileItem = {
      type: "file",
      file: "",
      id: null,
      url: "",
      name: file.name,
      collection_name: "",
      status: "uploading",
      size: file.size,
      error: "",
      itemId: tempItemId
    };
    if (fileItem.size == 0) {
      toast.error($i18n.t("You cannot upload an empty file."));
      return null;
    }
    files = [...files, fileItem];
    try {
      const uploadedFile = await uploadFile(localStorage.token, file);
      if (uploadedFile) {
        console.log("File upload completed:", {
          id: uploadedFile.id,
          name: fileItem.name,
          collection: uploadedFile?.meta?.collection_name
        });
        if (uploadedFile.error) {
          console.warn("File upload warning:", uploadedFile.error);
          toast.warning(uploadedFile.error);
        }
        fileItem.status = "uploaded";
        fileItem.file = uploadedFile;
        fileItem.id = uploadedFile.id;
        fileItem.collection_name = uploadedFile?.meta?.collection_name || uploadedFile?.collection_name;
        fileItem.url = `${WEBUI_API_BASE_URL}/files/${uploadedFile.id}`;
        files = files;
      } else {
        files = files.filter((item) => item?.itemId !== tempItemId);
      }
    } catch (e) {
      toast.error(`${e}`);
      files = files.filter((item) => item?.itemId !== tempItemId);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      console.log("Escape");
      draggedOver = false;
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.types?.includes("Files")) {
      draggedOver = true;
    } else {
      draggedOver = false;
    }
  };
  const onDragLeave = () => {
    draggedOver = false;
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
    draggedOver = false;
  };
  onDestroy(() => {
    console.log("destroy");
    window.removeEventListener("keydown", handleKeyDown);
    const dropzoneElement = document.getElementById("channel-container");
    if (dropzoneElement) {
      dropzoneElement?.removeEventListener("dragover", onDragOver);
      dropzoneElement?.removeEventListener("drop", onDrop);
      dropzoneElement?.removeEventListener("dragleave", onDragLeave);
    }
  });
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.transparentBackground === void 0 && $$bindings.transparentBackground && transparentBackground !== void 0) $$bindings.transparentBackground(transparentBackground);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.typingUsers === void 0 && $$bindings.typingUsers && typingUsers !== void 0) $$bindings.typingUsers(typingUsers);
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0) $$bindings.onSubmit(onSubmit);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  if ($$props.scrollEnd === void 0 && $$bindings.scrollEnd && scrollEnd !== void 0) $$bindings.scrollEnd(scrollEnd);
  if ($$props.scrollToBottom === void 0 && $$bindings.scrollToBottom && scrollToBottom !== void 0) $$bindings.scrollToBottom(scrollToBottom);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (content) {
        onChange();
      }
    }
    $$rendered = `${validate_component(FilesOverlay, "FilesOverlay").$$render($$result, { show: draggedOver }, {}, {})} <input type="file" hidden multiple> <div class="bg-transparent"><div class="${escape(
      $settings?.widescreenMode ?? null ? "max-w-full" : "max-w-6xl",
      true
    ) + " px-2.5 mx-auto inset-x-0 relative"}"><div class="absolute top-0 left-0 right-0 mx-auto inset-x-0 bg-transparent flex justify-center"><div class="flex flex-col px-3 w-full"><div class="relative">${scrollEnd === false ? `<div class="absolute -top-12 left-0 right-0 flex justify-center z-30 pointer-events-none"><button class="bg-white border border-gray-100 dark:border-none dark:bg-white/20 p-1.5 rounded-full pointer-events-auto" data-svelte-h="svelte-atpoie"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"></path></svg></button></div>` : ``}</div> <div class="relative"><div class="-mt-5">${typingUsers.length > 0 ? `<div class="text-xs px-4 mb-1"><span class="font-normal text-black dark:text-white">${escape(typingUsers.map((user2) => user2.name).join(", "))}</span> ${escape($i18n.t("is typing..."))}</div>` : ``}</div></div></div></div> <div class="">${`<form class="w-full flex gap-1.5"><div class="flex-1 flex flex-col relative w-full rounded-3xl px-1 bg-gray-600/5 dark:bg-gray-400/5 dark:text-gray-100"${add_attribute("dir", $settings?.chatDirection ?? "LTR", 0)}>${files.length > 0 ? `<div class="mx-2 mt-2.5 -mb-1 flex flex-wrap gap-2">${each(files, (file, fileIdx) => {
      return `${file.type === "image" ? `<div class="relative group"><div class="relative">${validate_component(Image, "Image").$$render(
        $$result,
        {
          src: file.url,
          alt: "input",
          imageClassName: " h-16 w-16 rounded-xl object-cover"
        },
        {},
        {}
      )}</div> <div class="absolute -top-1 -right-1"><button class="bg-white text-black border border-white rounded-full group-hover:visible invisible transition" type="button" data-svelte-h="svelte-2tnkty"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg> </button></div> </div>` : `${validate_component(FileItem, "FileItem").$$render(
        $$result,
        {
          item: file,
          name: file.name,
          type: file.type,
          size: file?.size,
          loading: file.status === "uploading",
          dismissible: true,
          edit: true
        },
        {},
        {}
      )}`}`;
    })}</div>` : ``} <div class="px-2.5"><div class="scrollbar-hidden font-primary text-left bg-transparent dark:text-gray-100 outline-hidden w-full pt-3 px-1 rounded-xl resize-none h-fit max-h-80 overflow-auto">${validate_component(RichTextInput, "RichTextInput").$$render(
      $$result,
      {
        id: `chat-input-${id}`,
        messageInput: true,
        shiftEnter: !$mobile || !("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),
        placeholder,
        largeTextAsFile: $settings?.largeTextAsFile ?? false,
        value: content
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> <div class="flex justify-between mb-2.5 mt-1.5 mx-0.5"><div class="ml-1 self-end flex space-x-1">${validate_component(InputMenu, "InputMenu").$$render(
      $$result,
      {
        screenCaptureHandler,
        uploadFilesHandler: () => {
          filesInputElement.click();
        }
      },
      {},
      {
        default: () => {
          return `<button class="bg-transparent hover:bg-white/80 text-gray-800 dark:text-white dark:hover:bg-gray-800 transition rounded-full p-1.5 outline-hidden focus:outline-hidden" type="button" aria-label="More" data-svelte-h="svelte-1tjh4sf"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path></svg></button>`;
        }
      }
    )}</div> <div class="self-end flex space-x-1 mr-1">${content === "" ? `${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Record voice") }, {}, {
      default: () => {
        return `<button id="voice-input-button" class="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition rounded-full p-1.5 mr-0.5 self-center" type="button" aria-label="Voice Input" data-svelte-h="svelte-11bpfd6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 translate-y-[0.5px]"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path><path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path></svg></button>`;
      }
    })}` : ``} <div class="flex items-center"><div class="flex items-center">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Send message") }, {}, {
      default: () => {
        return `<button id="send-message-button" class="${escape(
          content !== "" || files.length !== 0 ? "bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 " : "text-white bg-gray-200 dark:text-gray-900 dark:bg-gray-700 disabled",
          true
        ) + " transition rounded-full p-1.5 self-center"}" type="submit" ${content === "" && files.length === 0 ? "disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clip-rule="evenodd"></path></svg></button>`;
      }
    })}</div></div></div></div></div></form>`}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_mobile();
  return $$rendered;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $showSidebar, $$unsubscribe_showSidebar;
  let $user, $$unsubscribe_user;
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  getContext("i18n");
  let { channel } = $$props;
  if ($$props.channel === void 0 && $$bindings.channel && channel !== void 0) $$bindings.channel(channel);
  $$unsubscribe_showSidebar();
  $$unsubscribe_user();
  return `<nav class="sticky top-0 z-30 w-full px-1.5 py-1.5 -mb-8 flex items-center drag-region"><div class="bg-linear-to-b via-50% from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pointer-events-none absolute inset-0 -bottom-7 z-[-1]"></div> <div class="flex max-w-full w-full mx-auto px-1 pt-0.5 bg-transparent"><div class="flex items-center w-full max-w-full"><div class="${escape($showSidebar ? "md:hidden" : "", true) + " mr-1 self-start flex flex-none items-center text-gray-600 dark:text-gray-400"}"><button id="sidebar-toggle-button" class="cursor-pointer px-2 py-2 flex rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition" aria-label="Toggle Sidebar"><div class="m-auto self-center">${validate_component(MenuLines, "MenuLines").$$render($$result, {}, {}, {})}</div></button></div> <div class="${"flex-1 overflow-hidden max-w-full py-0.5 " + escape($showSidebar ? "ml-1" : "", true)}">${channel ? `<div class="line-clamp-1 capitalize font-medium font-primary text-lg">${escape(channel.name)}</div>` : ``}</div> <div class="self-start flex flex-none items-center text-gray-600 dark:text-gray-400">${$user !== void 0 ? `${validate_component(UserMenu, "UserMenu").$$render(
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
});
const Thread = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $socket, $$unsubscribe_socket;
  let $user, $$unsubscribe_user;
  $$unsubscribe_socket = subscribe(socket, (value) => $socket = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { threadId = null } = $$props;
  let { channel = null } = $$props;
  let { onClose = () => {
  } } = $$props;
  let messages = null;
  let top = false;
  let typingUsers = [];
  let typingUsersTimeout = {};
  let messagesContainerElement = null;
  const scrollToBottom = () => {
    messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
  };
  const initHandler = async () => {
    messages = null;
    top = false;
    typingUsers = [];
    typingUsersTimeout = {};
    if (channel) {
      messages = await getChannelThreadMessages(localStorage.token, channel.id, threadId);
      if (messages.length < 50) {
        top = true;
      }
      await tick();
      scrollToBottom();
    } else {
      goto();
    }
  };
  const channelEventHandler = async (event) => {
    console.log(event);
    if (event.channel_id === channel.id) {
      const type = event?.data?.type ?? null;
      const data = event?.data?.data ?? null;
      if (type === "message") {
        if ((data?.parent_id ?? null) === threadId) {
          if (messages) {
            messages = [data, ...messages];
            if (typingUsers.find((user2) => user2.id === event.user.id)) {
              typingUsers = typingUsers.filter((user2) => user2.id !== event.user.id);
            }
          }
        }
      } else if (type === "message:update") {
        if (messages) {
          const idx = messages.findIndex((message) => message.id === data.id);
          if (idx !== -1) {
            messages[idx] = data;
          }
        }
      } else if (type === "message:delete") {
        if (messages) {
          messages = messages.filter((message) => message.id !== data.id);
        }
      } else if (type.includes("message:reaction")) {
        if (messages) {
          const idx = messages.findIndex((message) => message.id === data.id);
          if (idx !== -1) {
            messages[idx] = data;
          }
        }
      } else if (type === "typing" && event.message_id === threadId) {
        if (event.user.id === $user.id) {
          return;
        }
        typingUsers = data.typing ? [
          ...typingUsers,
          ...typingUsers.find((user2) => user2.id === event.user.id) ? [] : [{ id: event.user.id, name: event.user.name }]
        ] : typingUsers.filter((user2) => user2.id !== event.user.id);
        if (typingUsersTimeout[event.user.id]) {
          clearTimeout(typingUsersTimeout[event.user.id]);
        }
        typingUsersTimeout[event.user.id] = setTimeout(
          () => {
            typingUsers = typingUsers.filter((user2) => user2.id !== event.user.id);
          },
          5e3
        );
      }
    }
  };
  const submitHandler = async ({ content, data }) => {
    if (!content) {
      return;
    }
    await sendMessage(localStorage.token, channel.id, { parent_id: threadId, content, data }).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
  };
  const onChange = async () => {
    $socket?.emit("channel-events", {
      channel_id: channel.id,
      message_id: threadId,
      data: { type: "typing", data: { typing: true } }
    });
  };
  onDestroy(() => {
    $socket?.off("channel-events", channelEventHandler);
  });
  if ($$props.threadId === void 0 && $$bindings.threadId && threadId !== void 0) $$bindings.threadId(threadId);
  if ($$props.channel === void 0 && $$bindings.channel && channel !== void 0) $$bindings.channel(channel);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  {
    if (threadId) {
      initHandler();
    }
  }
  $$unsubscribe_socket();
  $$unsubscribe_user();
  return `${channel ? `<div class="flex flex-col w-full h-full bg-gray-50 dark:bg-gray-850"><div class="flex items-center justify-between px-3.5 pt-3"><div class="font-medium text-lg" data-svelte-h="svelte-2v1fpb">Thread</div> <div><button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2">${validate_component(XMark, "XMark").$$render($$result, {}, {}, {})}</button></div></div> <div class="max-h-full w-full overflow-y-auto pt-3"${add_attribute("this", messagesContainerElement, 0)}>${validate_component(Messages, "Messages").$$render(
    $$result,
    {
      id: threadId,
      channel,
      messages,
      top,
      thread: true,
      onLoad: async () => {
        const newMessages = await getChannelThreadMessages(localStorage.token, channel.id, threadId, messages.length);
        messages = [...messages, ...newMessages];
        if (newMessages.length < 50) {
          top = true;
          return;
        }
      }
    },
    {},
    {}
  )} <div class="pb-[1rem]">${validate_component(MessageInput, "MessageInput").$$render(
    $$result,
    {
      id: threadId,
      typingUsers,
      onChange,
      onSubmit: submitHandler
    },
    {},
    {}
  )}</div></div></div>` : ``}`;
});
const Channel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $socket, $$unsubscribe_socket;
  let $$unsubscribe_chatId;
  let $user, $$unsubscribe_user;
  let $showSidebar, $$unsubscribe_showSidebar;
  $$unsubscribe_socket = subscribe(socket, (value) => $socket = value);
  $$unsubscribe_chatId = subscribe(chatId, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  let { id = "" } = $$props;
  let scrollEnd = true;
  let messagesContainerElement = null;
  let top = false;
  let channel = null;
  let messages = null;
  let threadId = null;
  let typingUsers = [];
  let typingUsersTimeout = {};
  const scrollToBottom = () => {
  };
  const initHandler = async () => {
    top = false;
    messages = null;
    channel = null;
    threadId = null;
    typingUsers = [];
    typingUsersTimeout = {};
    channel = await getChannelById(localStorage.token, id).catch((error) => {
      return null;
    });
    if (channel) {
      messages = await getChannelMessages(localStorage.token, id, 0);
      if (messages) {
        if (messages.length < 50) {
          top = true;
        }
      }
    } else {
      goto();
    }
  };
  const channelEventHandler = async (event) => {
    if (event.channel_id === id) {
      const type = event?.data?.type ?? null;
      const data = event?.data?.data ?? null;
      if (type === "message") {
        if ((data?.parent_id ?? null) === null) {
          messages = [data, ...messages];
          if (typingUsers.find((user2) => user2.id === event.user.id)) {
            typingUsers = typingUsers.filter((user2) => user2.id !== event.user.id);
          }
          await tick();
        }
      } else if (type === "message:update") {
        const idx = messages.findIndex((message) => message.id === data.id);
        if (idx !== -1) {
          messages[idx] = data;
        }
      } else if (type === "message:delete") {
        messages = messages.filter((message) => message.id !== data.id);
      } else if (type === "message:reply") {
        const idx = messages.findIndex((message) => message.id === data.id);
        if (idx !== -1) {
          messages[idx] = data;
        }
      } else if (type.includes("message:reaction")) {
        const idx = messages.findIndex((message) => message.id === data.id);
        if (idx !== -1) {
          messages[idx] = data;
        }
      } else if (type === "typing" && event.message_id === null) {
        if (event.user.id === $user.id) {
          return;
        }
        typingUsers = data.typing ? [
          ...typingUsers,
          ...typingUsers.find((user2) => user2.id === event.user.id) ? [] : [{ id: event.user.id, name: event.user.name }]
        ] : typingUsers.filter((user2) => user2.id !== event.user.id);
        if (typingUsersTimeout[event.user.id]) {
          clearTimeout(typingUsersTimeout[event.user.id]);
        }
        typingUsersTimeout[event.user.id] = setTimeout(
          () => {
            typingUsers = typingUsers.filter((user2) => user2.id !== event.user.id);
          },
          5e3
        );
      }
    }
  };
  const submitHandler = async ({ content, data }) => {
    if (!content && (data?.files ?? []).length === 0) {
      return;
    }
    const res = await sendMessage(localStorage.token, id, { content, data }).catch((error) => {
      toast.error(`${error}`);
      return null;
    });
    if (res) {
      messagesContainerElement.scrollTop = messagesContainerElement.scrollHeight;
    }
  };
  const onChange = async () => {
    $socket?.emit("channel-events", {
      channel_id: id,
      message_id: null,
      data: { type: "typing", data: { typing: true } }
    });
  };
  onDestroy(() => {
    $socket?.off("channel-events", channelEventHandler);
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  {
    if (id) {
      initHandler();
    }
  }
  $$unsubscribe_socket();
  $$unsubscribe_chatId();
  $$unsubscribe_user();
  $$unsubscribe_showSidebar();
  return `${$$result.head += `<!-- HEAD_svelte-za35g3_START -->${$$result.title = `<title>#${escape(channel?.name ?? "Channel")} | Open WebUI</title>`, ""}<!-- HEAD_svelte-za35g3_END -->`, ""} <div class="${"h-screen max-h-[100dvh] transition-width duration-200 ease-in-out " + escape($showSidebar ? "md:max-w-[calc(100%-260px)]" : "", true) + " w-full max-w-full flex flex-col"}" id="channel-container">${validate_component(Pane_group, "PaneGroup").$$render(
    $$result,
    {
      direction: "horizontal",
      class: "w-full h-full"
    },
    {},
    {
      default: () => {
        return `${validate_component(Pane, "Pane").$$render(
          $$result,
          {
            defaultSize: 50,
            minSize: 50,
            class: "h-full flex flex-col w-full relative"
          },
          {},
          {
            default: () => {
              return `${validate_component(Navbar, "Navbar").$$render($$result, { channel }, {}, {})} <div class="flex-1 overflow-y-auto">${channel ? `<div class="pb-2.5 max-w-full z-10 scrollbar-hidden w-full h-full pt-6 flex-1 flex flex-col-reverse overflow-auto" id="messages-container"${add_attribute("this", messagesContainerElement, 0)}>${validate_component(Messages, "Messages").$$render(
                $$result,
                {
                  channel,
                  messages,
                  top,
                  onThread: (id2) => {
                    threadId = id2;
                  },
                  onLoad: async () => {
                    const newMessages = await getChannelMessages(localStorage.token, id, messages.length);
                    messages = [...messages, ...newMessages];
                    if (newMessages.length < 50) {
                      top = true;
                      return;
                    }
                  }
                },
                {},
                {}
              )}</div>` : ``}</div> <div class="pb-[1rem]">${validate_component(MessageInput, "MessageInput").$$render(
                $$result,
                {
                  id: "root",
                  typingUsers,
                  onChange,
                  onSubmit: submitHandler,
                  scrollToBottom,
                  scrollEnd
                },
                {},
                {}
              )}</div>`;
            }
          }
        )} ${`${threadId !== null ? `${validate_component(Drawer, "Drawer").$$render($$result, { show: threadId !== null }, {}, {
          default: () => {
            return `<div class="${"" + escape(threadId !== null ? " h-screen  w-full" : "px-6 py-4", true) + " h-full"}">${validate_component(Thread, "Thread").$$render(
              $$result,
              {
                threadId,
                channel,
                onClose: () => {
                  threadId = null;
                }
              },
              {},
              {}
            )}</div>`;
          }
        })}` : ``}`}`;
      }
    }
  )}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${validate_component(Channel, "Channel").$$render($$result, { id: $page.params.id }, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

import { c as create_ssr_component, b as subscribe, p as getContext, f as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { t as tick } from "../../../../chunks/scheduler.js";
import { g as goto } from "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/stores.js";
import dayjs from "dayjs";
import { d as chatId, a as settings, c as config, W as WEBUI_NAME, m as models } from "../../../../chunks/index3.js";
import { a as createMessagesList, d as convertMessagesToHistory } from "../../../../chunks/index5.js";
import { f as getChatByShareId } from "../../../../chunks/index8.js";
import { M as Messages } from "../../../../chunks/Messages.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
/* empty css                                                     */
import "dequal";
import "../../../../chunks/create.js";
import "marked";
import { g as getModels } from "../../../../chunks/index7.js";
import "dompurify";
import { c as getUserById } from "../../../../chunks/index6.js";
import "file-saver";
import "postcss";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
let processing = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $chatId, $$unsubscribe_chatId;
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_chatId = subscribe(chatId, (value) => $chatId = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  dayjs.extend(localizedFormat);
  let loaded = false;
  let autoScroll = true;
  let selectedModels = [""];
  let chat = null;
  let user = null;
  let title = "";
  let files = [];
  let messages = [];
  let history = { messages: {}, currentId: null };
  const loadSharedChat = async () => {
    await models.set(await getModels(localStorage.token, $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null)));
    await chatId.set($page.params.id);
    chat = await getChatByShareId(localStorage.token, $chatId).catch(async (error) => {
      await goto();
      return null;
    });
    if (chat) {
      user = await getUserById(localStorage.token, chat.user_id).catch((error) => {
        console.error(error);
        return null;
      });
      const chatContent = chat.chat;
      if (chatContent) {
        console.log(chatContent);
        selectedModels = (chatContent?.models ?? void 0) !== void 0 ? chatContent.models : [chatContent.models ?? ""];
        history = (chatContent?.history ?? void 0) !== void 0 ? chatContent.history : convertMessagesToHistory(chatContent.messages);
        title = chatContent.title;
        autoScroll = true;
        await tick();
        if (messages.length > 0) {
          history.messages[messages.at(-1).id].done = true;
        }
        await tick();
        return true;
      } else {
        return null;
      }
    }
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    messages = createMessagesList(history, history.currentId);
    {
      if ($page.params.id) {
        (async () => {
          if (await loadSharedChat()) {
            await tick();
            loaded = true;
          } else {
            await goto();
          }
        })();
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1123lr8_START -->${$$result.title = `<title> ${escape(title ? `${title.length > 30 ? `${title.slice(0, 30)}...` : title} | ${$WEBUI_NAME}` : `${$WEBUI_NAME}`)} </title>`, ""}<!-- HEAD_svelte-1123lr8_END -->`, ""} ${loaded ? `<div class="h-screen max-h-[100dvh] w-full flex flex-col text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900"><div class="flex flex-col flex-auto justify-center relative"><div class="flex flex-col w-full flex-auto overflow-auto h-0" id="messages-container"><div class="pt-5 px-2 w-full max-w-5xl mx-auto"><div class="px-3"><div class="text-2xl font-semibold line-clamp-1">${escape(title)}</div> <div class="flex text-sm justify-between items-center mt-1"><div class="text-gray-400">${escape(dayjs(chat.chat.timestamp).format("LLL"))}</div></div></div></div> <div class="h-full w-full flex flex-col py-2"><div class="">${validate_component(Messages, "Messages").$$render(
      $$result,
      {
        className: "h-full flex pt-4 pb-8",
        user,
        chatId: $chatId,
        readOnly: true,
        selectedModels,
        processing,
        bottomPadding: files.length > 0,
        sendPrompt: () => {
        },
        continueResponse: () => {
        },
        regenerateResponse: () => {
        },
        history,
        messages,
        autoScroll
      },
      {
        history: ($$value) => {
          history = $$value;
          $$settled = false;
        },
        messages: ($$value) => {
          messages = $$value;
          $$settled = false;
        },
        autoScroll: ($$value) => {
          autoScroll = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div></div> <div class="absolute bottom-0 right-0 left-0 flex justify-center w-full bg-linear-to-b from-transparent to-white dark:to-gray-900"><div class="pb-5"><button class="px-4 py-2 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full">${escape($i18n.t("Clone Chat"))}</button></div></div></div></div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_chatId();
  $$unsubscribe_page();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_WEBUI_NAME();
  $$unsubscribe_i18n();
  return $$rendered;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

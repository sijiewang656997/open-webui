import { c as create_ssr_component, p as getContext, b as subscribe, g as escape } from "./ssr.js";
import { l as WEBUI_API_BASE_URL } from "./index3.js";
const AddFilesPlaceholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let { title = "" } = $$props;
  let { content = "" } = $$props;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  $$unsubscribe_i18n();
  return `<div class="px-3"><div class="text-center text-6xl mb-3" data-svelte-h="svelte-1f01f7u">📄</div> <div class="text-center dark:text-white text-xl font-semibold z-50">${title ? `${escape(title)}` : `${escape($i18n.t("Add Files"))}`}</div> ${slots.default ? slots.default({}) : `<div class="px-2 mt-2 text-center text-sm dark:text-gray-200 w-full">${content ? `${escape(content)}` : `${escape($i18n.t("Drop any files here to add to the conversation"))}`}</div> `}</div>`;
});
const uploadFile = async (token, file) => {
  const data = new FormData();
  data.append("file", file);
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/files/`, {
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
export {
  AddFilesPlaceholder as A,
  uploadFile as u
};
//# sourceMappingURL=Drawer.svelte_svelte_type_style_lang.js.map

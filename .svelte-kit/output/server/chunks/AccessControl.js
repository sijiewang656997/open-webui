import { c as create_ssr_component, a as add_attribute, p as getContext, b as subscribe, g as escape, e as each, v as validate_component } from "./ssr.js";
import "dompurify";
import "marked";
import { X as XMark } from "./XMark.js";
import { B as Badge } from "./Badge.js";
const UserCircleSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clip-rule="evenodd"></path></svg>`;
});
const AccessControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { onChange = () => {
  } } = $$props;
  let { accessRoles = ["read"] } = $$props;
  let { accessControl = null } = $$props;
  let groups = [];
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  if ($$props.accessRoles === void 0 && $$bindings.accessRoles && accessRoles !== void 0) $$bindings.accessRoles(accessRoles);
  if ($$props.accessControl === void 0 && $$bindings.accessControl && accessControl !== void 0) $$bindings.accessControl(accessControl);
  {
    onChange(accessControl);
  }
  $$unsubscribe_i18n();
  return `<div class="rounded-lg flex flex-col gap-2"><div class=""><div class="text-sm font-semibold mb-1">${escape($i18n.t("Visibility"))}</div> <div class="flex gap-2.5 items-center mb-1"><div><div class="p-2 bg-black/5 dark:bg-white/5 rounded-full">${accessControl !== null ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"></path></svg>`}</div></div> <div><select id="models" class="outline-hidden bg-transparent text-sm font-medium rounded-lg block w-fit pr-10 max-w-full placeholder-gray-400"${add_attribute("value", accessControl !== null ? "private" : "public", 0)}><option class="text-gray-700" value="private" selected data-svelte-h="svelte-vsb5yp">Private</option><option class="text-gray-700" value="public" selected data-svelte-h="svelte-152o619">Public</option></select> <div class="text-xs text-gray-400 font-medium">${accessControl !== null ? `${escape($i18n.t("Only select users and groups with permission can access"))}` : `${escape($i18n.t("Accessible to all users"))}`}</div></div></div></div> ${accessControl !== null ? (() => {
    let accessGroups = groups.filter((group) => accessControl.read.group_ids.includes(group.id));
    return ` <div><div class=""><div class="flex justify-between mb-1.5"><div class="text-sm font-semibold">${escape($i18n.t("Groups"))}</div></div> <div class="mb-1"><div class="flex w-full"><div class="flex flex-1 items-center"><div class="w-full px-0.5"><select class="${"outline-hidden bg-transparent text-sm rounded-lg block w-full pr-10 max-w-full " + escape("text-gray-500", true) + " dark:placeholder-gray-500"}"><option class="text-gray-700" value="" disabled selected>${escape($i18n.t("Select a group"))}</option>${each(groups.filter((group) => !accessControl.read.group_ids.includes(group.id)), (group) => {
      return `<option class="text-gray-700"${add_attribute("value", group.id, 0)}>${escape(group.name)}</option>`;
    })}</select></div> </div></div></div> <hr class="border-gray-100 dark:border-gray-700/10 mt-1.5 mb-2.5 w-full"> <div class="flex flex-col gap-2 mb-1 px-0.5">${accessGroups.length > 0 ? `${each(accessGroups, (group) => {
      return `<div class="flex items-center gap-3 justify-between text-xs w-full transition"><div class="flex items-center gap-1.5 w-full font-medium"><div>${validate_component(UserCircleSolid, "UserCircleSolid").$$render($$result, { className: "size-4" }, {}, {})}</div> <div>${escape(group.name)} </div></div> <div class="w-full flex justify-end items-center gap-0.5"><button class="" type="button">${accessControl.write.group_ids.includes(group.id) ? `${validate_component(Badge, "Badge").$$render(
        $$result,
        {
          type: "success",
          content: $i18n.t("Write")
        },
        {},
        {}
      )}` : `${validate_component(Badge, "Badge").$$render($$result, { type: "info", content: $i18n.t("Read") }, {}, {})}`}</button> <button class="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-850 transition" type="button">${validate_component(XMark, "XMark").$$render($$result, {}, {}, {})} </button></div> </div>`;
    })}` : `<div class="flex items-center justify-center"><div class="text-gray-500 text-xs text-center py-2 px-10">${escape($i18n.t("No groups with access, add a group to grant access"))}</div></div>`}</div></div></div>`;
  })() : ``}</div>`;
});
export {
  AccessControl as A
};
//# sourceMappingURL=AccessControl.js.map

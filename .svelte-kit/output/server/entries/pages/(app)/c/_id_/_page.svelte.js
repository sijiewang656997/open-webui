import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { H as Help, C as Chat } from "../../../../../chunks/Help.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${validate_component(Help, "Help").$$render($$result, {}, {}, {})} ${validate_component(Chat, "Chat").$$render($$result, { chatIdProp: $page.params.id }, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

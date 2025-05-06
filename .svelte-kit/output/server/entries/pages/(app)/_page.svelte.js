import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { H as Help, C as Chat } from "../../../chunks/Help.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Help, "Help").$$render($$result, {}, {}, {})} ${validate_component(Chat, "Chat").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

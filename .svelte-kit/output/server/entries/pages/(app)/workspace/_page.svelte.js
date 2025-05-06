import { c as create_ssr_component, b as subscribe } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import { u as user } from "../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_user();
  return ``;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const Mic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${add_attribute("class", className, 0)}><path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z"></path><path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z"></path></svg>`;
});
export {
  Mic as M
};
//# sourceMappingURL=Mic.js.map

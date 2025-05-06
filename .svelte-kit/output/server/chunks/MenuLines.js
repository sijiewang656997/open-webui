import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const MenuLines = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-5" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path></svg>`;
});
export {
  MenuLines as M
};
//# sourceMappingURL=MenuLines.js.map

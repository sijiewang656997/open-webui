import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>`;
});
export {
  ChevronDown as C
};
//# sourceMappingURL=ChevronDown.js.map

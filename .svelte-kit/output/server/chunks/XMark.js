import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const XMark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-3.5" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>`;
});
export {
  XMark as X
};
//# sourceMappingURL=XMark.js.map

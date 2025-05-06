import { c as create_ssr_component, o as onDestroy, a as add_attribute } from "./ssr.js";
import DOMPurify from "dompurify";
import "marked";
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { placement = "top" } = $$props;
  let { content = `I'm a tooltip!` } = $$props;
  let { touch = true } = $$props;
  let { className = "flex" } = $$props;
  let { theme = "" } = $$props;
  let { offset = [0, 4] } = $$props;
  let { allowHTML = true } = $$props;
  let { tippyOptions = {} } = $$props;
  let tooltipElement;
  onDestroy(() => {
  });
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0) $$bindings.placement(placement);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.touch === void 0 && $$bindings.touch && touch !== void 0) $$bindings.touch(touch);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.allowHTML === void 0 && $$bindings.allowHTML && allowHTML !== void 0) $$bindings.allowHTML(allowHTML);
  if ($$props.tippyOptions === void 0 && $$bindings.tippyOptions && tippyOptions !== void 0) $$bindings.tippyOptions(tippyOptions);
  return `<div${add_attribute("aria-label", DOMPurify.sanitize(content), 0)}${add_attribute("class", className, 0)}${add_attribute("this", tooltipElement, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Tooltip as T
};
//# sourceMappingURL=Tooltip.js.map

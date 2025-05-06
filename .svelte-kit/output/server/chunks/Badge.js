import { c as create_ssr_component, g as escape } from "./ssr.js";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "info" } = $$props;
  let { content = "" } = $$props;
  const classNames = {
    info: "bg-blue-500/20 text-blue-700 dark:text-blue-200 ",
    success: "bg-green-500/20 text-green-700 dark:text-green-200",
    warning: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-200",
    error: "bg-red-500/20 text-red-700 dark:text-red-200",
    muted: "bg-gray-500/20 text-gray-700 dark:text-gray-200"
  };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  return `<div class="${"text-xs font-bold " + escape(classNames[type] ?? classNames["info"], true) + " w-fit px-2 rounded-sm uppercase line-clamp-1 mr-0.5"}">${escape(content)}</div>`;
});
export {
  Badge as B
};
//# sourceMappingURL=Badge.js.map

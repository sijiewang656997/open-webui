import { c as create_ssr_component, l as createEventDispatcher, o as onDestroy, a as add_attribute, f as escape } from "./ssr.js";
import "marked";
import TurndownService from "turndown";
import "./AutoCompletion.js";
import "@tiptap/extension-code-block-lowlight";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-highlight";
import "@tiptap/extension-typography";
import "@tiptap/starter-kit";
import { createLowlight, all } from "lowlight";
const RichTextInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const turndownService = new TurndownService({
    codeBlockStyle: "fenced",
    headingStyle: "atx"
  });
  turndownService.escape = (string) => string;
  createEventDispatcher();
  createLowlight(all);
  let { className = "input-prose" } = $$props;
  let { placeholder = "Type here..." } = $$props;
  let { value = "" } = $$props;
  let { id = "" } = $$props;
  let { raw = false } = $$props;
  let { preserveBreaks = false } = $$props;
  let { generateAutoCompletion = async () => null } = $$props;
  let { autocomplete = false } = $$props;
  let { messageInput = false } = $$props;
  let { shiftEnter = false } = $$props;
  let { largeTextAsFile = false } = $$props;
  let element;
  let editor;
  const setContent = (content) => {
    editor.commands.setContent(content);
  };
  onDestroy(() => {
  });
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.raw === void 0 && $$bindings.raw && raw !== void 0) $$bindings.raw(raw);
  if ($$props.preserveBreaks === void 0 && $$bindings.preserveBreaks && preserveBreaks !== void 0) $$bindings.preserveBreaks(preserveBreaks);
  if ($$props.generateAutoCompletion === void 0 && $$bindings.generateAutoCompletion && generateAutoCompletion !== void 0) $$bindings.generateAutoCompletion(generateAutoCompletion);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0) $$bindings.autocomplete(autocomplete);
  if ($$props.messageInput === void 0 && $$bindings.messageInput && messageInput !== void 0) $$bindings.messageInput(messageInput);
  if ($$props.shiftEnter === void 0 && $$bindings.shiftEnter && shiftEnter !== void 0) $$bindings.shiftEnter(shiftEnter);
  if ($$props.largeTextAsFile === void 0 && $$bindings.largeTextAsFile && largeTextAsFile !== void 0) $$bindings.largeTextAsFile(largeTextAsFile);
  if ($$props.setContent === void 0 && $$bindings.setContent && setContent !== void 0) $$bindings.setContent(setContent);
  return `<div class="${"relative w-full min-w-full h-full min-h-fit " + escape(className, true)}"${add_attribute("this", element, 0)}></div>`;
});
export {
  RichTextInput as R
};
//# sourceMappingURL=RichTextInput.js.map

import { c as create_ssr_component, p as getContext, b as subscribe, l as createEventDispatcher, a as add_attribute, v as validate_component, f as escape } from "./ssr.js";
import dayjs from "dayjs";
import "dayjs/locale/af.js";
import "dayjs/locale/am.js";
import "dayjs/locale/ar.js";
import "dayjs/locale/az.js";
import "dayjs/locale/be.js";
import "dayjs/locale/bg.js";
import "dayjs/locale/bi.js";
import "dayjs/locale/bm.js";
import "dayjs/locale/bn.js";
import "dayjs/locale/bo.js";
import "dayjs/locale/br.js";
import "dayjs/locale/bs.js";
import "dayjs/locale/ca.js";
import "dayjs/locale/cs.js";
import "dayjs/locale/cv.js";
import "dayjs/locale/cy.js";
import "dayjs/locale/da.js";
import "dayjs/locale/de.js";
import "dayjs/locale/dv.js";
import "dayjs/locale/el.js";
import "dayjs/locale/en.js";
import "dayjs/locale/eo.js";
import "dayjs/locale/es.js";
import "dayjs/locale/eu.js";
import "dayjs/locale/fa.js";
import "dayjs/locale/fi.js";
import "dayjs/locale/fo.js";
import "dayjs/locale/fr.js";
import "dayjs/locale/fy.js";
import "dayjs/locale/ga.js";
import "dayjs/locale/gd.js";
import "dayjs/locale/gl.js";
import "dayjs/locale/gu.js";
import "dayjs/locale/he.js";
import "dayjs/locale/hi.js";
import "dayjs/locale/hr.js";
import "dayjs/locale/ht.js";
import "dayjs/locale/hu.js";
import "dayjs/locale/id.js";
import "dayjs/locale/is.js";
import "dayjs/locale/it.js";
import "dayjs/locale/ja.js";
import "dayjs/locale/jv.js";
import "dayjs/locale/ka.js";
import "dayjs/locale/kk.js";
import "dayjs/locale/km.js";
import "dayjs/locale/kn.js";
import "dayjs/locale/ko.js";
import "dayjs/locale/ku.js";
import "dayjs/locale/ky.js";
import "dayjs/locale/lb.js";
import "dayjs/locale/lo.js";
import "dayjs/locale/lt.js";
import "dayjs/locale/lv.js";
import "dayjs/locale/me.js";
import "dayjs/locale/mi.js";
import "dayjs/locale/mk.js";
import "dayjs/locale/ml.js";
import "dayjs/locale/mn.js";
import "dayjs/locale/mr.js";
import "dayjs/locale/ms.js";
import "dayjs/locale/mt.js";
import "dayjs/locale/my.js";
import "dayjs/locale/nb.js";
import "dayjs/locale/ne.js";
import "dayjs/locale/nl.js";
import "dayjs/locale/nn.js";
import "dayjs/locale/pl.js";
import "dayjs/locale/pt.js";
import "dayjs/locale/ro.js";
import "dayjs/locale/ru.js";
import "dayjs/locale/rw.js";
import "dayjs/locale/sd.js";
import "dayjs/locale/se.js";
import "dayjs/locale/si.js";
import "dayjs/locale/sk.js";
import "dayjs/locale/sl.js";
import "dayjs/locale/sq.js";
import "dayjs/locale/sr.js";
import "dayjs/locale/ss.js";
import "dayjs/locale/sv.js";
import "dayjs/locale/sw.js";
import "dayjs/locale/ta.js";
import "dayjs/locale/te.js";
import "dayjs/locale/tet.js";
import "dayjs/locale/tg.js";
import "dayjs/locale/th.js";
import "dayjs/locale/tk.js";
import "dayjs/locale/tlh.js";
import "dayjs/locale/tr.js";
import "dayjs/locale/tzl.js";
import "dayjs/locale/tzm.js";
import "dayjs/locale/uk.js";
import "dayjs/locale/ur.js";
import "dayjs/locale/uz.js";
import "dayjs/locale/vi.js";
import "dayjs/locale/yo.js";
import "dayjs/locale/zh.js";
import "dayjs/locale/et.js";
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { C as ChevronUp } from "./ChevronUp.js";
import { C as ChevronDown } from "./ChevronDown.js";
import { S as Spinner } from "./Spinner.js";
const Collapsible = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  async function loadLocale(locales) {
    for (const locale of locales) {
      try {
        dayjs.locale(locale);
        break;
      } catch (error) {
        console.error(`Could not load locale '${locale}':`, error);
      }
    }
  }
  const dispatch = createEventDispatcher();
  let { open = false } = $$props;
  let { id = "" } = $$props;
  let { className = "" } = $$props;
  let { buttonClassName = "w-fit text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition" } = $$props;
  let { title = null } = $$props;
  let { attributes = null } = $$props;
  let { grow = false } = $$props;
  let { disabled = false } = $$props;
  let { hide = false } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.buttonClassName === void 0 && $$bindings.buttonClassName && buttonClassName !== void 0) $$bindings.buttonClassName(buttonClassName);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.attributes === void 0 && $$bindings.attributes && attributes !== void 0) $$bindings.attributes(attributes);
  if ($$props.grow === void 0 && $$bindings.grow && grow !== void 0) $$bindings.grow(grow);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0) $$bindings.hide(hide);
  {
    loadLocale($i18n.languages);
  }
  {
    dispatch("change", open);
  }
  $$unsubscribe_i18n();
  return `<div${add_attribute("id", id, 0)}${add_attribute("class", className, 0)}>${title !== null ? `  <div class="${escape(buttonClassName, true) + " cursor-pointer"}"><div class="${"w-full font-medium flex items-center justify-between gap-2 " + escape(
    attributes?.done && attributes?.done !== "true" ? "shimmer" : "",
    true
  )}">${attributes?.done && attributes?.done !== "true" ? `<div>${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}</div>` : ``} <div class="">${attributes?.type === "reasoning" ? `${attributes?.done === "true" && attributes?.duration ? `${attributes.duration < 60 ? `${escape($i18n.t("Thought for {{DURATION}} seconds", { DURATION: attributes.duration }))}` : `${escape($i18n.t("Thought for {{DURATION}}", {
    DURATION: dayjs.duration(attributes.duration, "seconds").humanize()
  }))}`}` : `${escape($i18n.t("Thinking..."))}`}` : `${attributes?.type === "code_interpreter" ? `${attributes?.done === "true" ? `${escape($i18n.t("Analyzed"))}` : `${escape($i18n.t("Analyzing..."))}`}` : `${escape(title)}`}`}</div> <div class="flex self-center translate-y-[1px]">${open ? `${validate_component(ChevronUp, "ChevronUp").$$render(
    $$result,
    {
      strokeWidth: "3.5",
      className: "size-3.5"
    },
    {},
    {}
  )}` : `${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      strokeWidth: "3.5",
      className: "size-3.5"
    },
    {},
    {}
  )}`}</div></div></div>` : `  <div class="${escape(buttonClassName, true) + " cursor-pointer"}"><div>${slots.default ? slots.default({}) : ``} ${grow ? `${open && !hide ? `<div>${slots.content ? slots.content({}) : ``}</div>` : ``}` : ``}</div></div>`} ${!grow ? `${open && !hide ? `<div>${slots.content ? slots.content({}) : ``}</div>` : ``}` : ``}</div>`;
});
export {
  Collapsible as C
};
//# sourceMappingURL=Collapsible.js.map

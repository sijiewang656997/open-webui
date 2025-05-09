import { c as create_ssr_component, h as compute_rest_props, b as subscribe, i as spread, a as add_attribute, j as escape_attribute_value, k as escape_object, l as createEventDispatcher, v as validate_component } from "./ssr.js";
import "dequal";
import "./create.js";
import { i as is_void } from "./ArrowDownTray.js";
import { a as createDispatcher, d as disabledAttrs } from "./updater.js";
import { d as getCtx, b as Menu, c as Menu_trigger, M as Menu_content, f as flyAndScale } from "./menu-trigger.js";
const Menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["href", "asChild", "disabled", "el"]);
  let $item, $$unsubscribe_item;
  let { href = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { disabled = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = getCtx();
  $$unsubscribe_item = subscribe(item, (value) => $item = value);
  createDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item;
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object(builder),
        escape_object($$restProps)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}`}`;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "start" } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Menu, "DropdownMenu.Root").$$render(
      $$result,
      {
        closeFocus: false,
        onOpenChange: (state) => {
          dispatch("change", state);
        },
        typeahead: false,
        open: show
      },
      {
        open: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Menu_trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
            default: () => {
              return `${slots.default ? slots.default({}) : ``}`;
            }
          })} ${slots.content ? slots.content({}) : ` ${validate_component(Menu_content, "DropdownMenu.Content").$$render(
            $$result,
            {
              class: "w-full max-w-[130px] rounded-lg px-1 py-1.5 border border-gray-900 z-50 bg-gray-850 text-white",
              sideOffset: 8,
              side,
              align,
              transition: flyAndScale
            },
            {},
            {
              default: () => {
                return `${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex items-center px-3 py-2 text-sm  font-medium"
                  },
                  {},
                  {
                    default: () => {
                      return `<div class="flex items-center" data-svelte-h="svelte-1jfjm7">Profile</div>`;
                    }
                  }
                )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex items-center px-3 py-2 text-sm  font-medium"
                  },
                  {},
                  {
                    default: () => {
                      return `<div class="flex items-center" data-svelte-h="svelte-1jfjm7">Profile</div>`;
                    }
                  }
                )} ${validate_component(Menu_item, "DropdownMenu.Item").$$render(
                  $$result,
                  {
                    class: "flex items-center px-3 py-2 text-sm  font-medium"
                  },
                  {},
                  {
                    default: () => {
                      return `<div class="flex items-center" data-svelte-h="svelte-1jfjm7">Profile</div>`;
                    }
                  }
                )}`;
              }
            }
          )} `}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Dropdown as D,
  Menu_item as M
};
//# sourceMappingURL=Dropdown.js.map

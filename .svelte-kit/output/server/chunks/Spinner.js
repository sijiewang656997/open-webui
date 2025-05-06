import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<div class="flex justify-center text-center"><svg${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><style>.spinner_ajPY {
				transform-origin: center;
				animation: spinner_AtaB 0.75s infinite linear;
			}
			@keyframes spinner_AtaB {
				100% {
					transform: rotate(360deg);
				}
			}
		</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"></path><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_ajPY"></path></svg></div>`;
});
export {
  Spinner as S
};
//# sourceMappingURL=Spinner.js.map

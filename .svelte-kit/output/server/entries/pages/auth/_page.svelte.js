import { c as create_ssr_component, a as add_attribute, f as escape, e as each, p as getContext, b as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
import { g as WEBUI_BASE_URL, c as config, u as user, s as socket, W as WEBUI_NAME } from "../../../chunks/index3.js";
import "../../../chunks/index5.js";
const Marquee = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let idx = 0;
  let { className = "" } = $$props;
  let { words = ["lorem", "ipsum"] } = $$props;
  let { duration = 4e3 } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.words === void 0 && $$bindings.words && words !== void 0) $$bindings.words(words);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  return `<div${add_attribute("class", className, 0)}><div><div class="marquee-item">${escape(words.at(idx))}</div></div></div>`;
});
const css = {
  code: ".image.svelte-ezqcnh{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center;transition:opacity 1s ease-in-out;opacity:0}",
  map: `{"version":3,"file":"SlideShow.svelte","sources":["SlideShow.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nexport let imageUrls = [\\n  \\"/assets/images/adam.jpg\\",\\n  \\"/assets/images/galaxy.jpg\\",\\n  \\"/assets/images/earth.jpg\\",\\n  \\"/assets/images/space.jpg\\"\\n];\\nexport let duration = 5e3;\\nlet selectedImageIdx = 0;\\nonMount(() => {\\n  setInterval(() => {\\n    selectedImageIdx = (selectedImageIdx + 1) % (imageUrls.length - 1);\\n  }, duration);\\n});\\n<\/script>\\n\\n{#each imageUrls as imageUrl, idx (idx)}\\n\\t<div\\n\\t\\tclass=\\"image w-full h-full absolute top-0 left-0 bg-cover bg-center transition-opacity duration-1000\\"\\n\\t\\tstyle=\\"opacity: {selectedImageIdx === idx ? 1 : 0}; background-image: url('{imageUrl}')\\"\\n\\t></div>\\n{/each}\\n\\n<style>\\n\\t.image {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tbackground-size: cover;\\n\\t\\tbackground-position: center; /* Center the background images */\\n\\t\\ttransition: opacity 1s ease-in-out; /* Smooth fade effect */\\n\\t\\topacity: 0; /* Make images initially not visible */\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwBC,oBAAO,CACN,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,KAAK,CACtB,mBAAmB,CAAE,MAAM,CAC3B,UAAU,CAAE,OAAO,CAAC,EAAE,CAAC,WAAW,CAClC,OAAO,CAAE,CACV"}`
};
const SlideShow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { imageUrls = [
    "/assets/images/adam.jpg",
    "/assets/images/galaxy.jpg",
    "/assets/images/earth.jpg",
    "/assets/images/space.jpg"
  ] } = $$props;
  let { duration = 5e3 } = $$props;
  let selectedImageIdx = 0;
  if ($$props.imageUrls === void 0 && $$bindings.imageUrls && imageUrls !== void 0) $$bindings.imageUrls(imageUrls);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  $$result.css.add(css);
  return `${each(imageUrls, (imageUrl, idx) => {
    return `<div class="image w-full h-full absolute top-0 left-0 bg-cover bg-center transition-opacity duration-1000 svelte-ezqcnh" style="${"opacity: " + escape(selectedImageIdx === idx ? 1 : 0, true) + "; background-image: url('" + escape(imageUrl, true) + "')"}"></div>`;
  })}`;
});
const ArrowRightCircle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>`;
});
const OnBoarding = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = true } = $$props;
  let { getStartedHandler = () => {
  } } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.getStartedHandler === void 0 && $$bindings.getStartedHandler && getStartedHandler !== void 0) $$bindings.getStartedHandler(getStartedHandler);
  $$unsubscribe_i18n();
  return `${show ? `<div class="w-full h-screen max-h-[100dvh] text-white relative"><div class="fixed m-10 z-50" data-svelte-h="svelte-1xenazw"><div class="flex space-x-2"><div class="self-center"><img crossorigin="anonymous" src="${escape(WEBUI_BASE_URL, true) + "/static/favicon-500x200.png"}" class="rounded-full" alt="logo"></div></div></div> ${validate_component(SlideShow, "SlideShow").$$render($$result, { duration: 5e3 }, {}, {})} <div class="w-full h-full absolute top-0 left-0 bg-linear-to-t from-20% from-black to-transparent"></div> <div class="w-full h-full absolute top-0 left-0 backdrop-blur-xs bg-black/50"></div> <div class="relative bg-transparent w-full min-h-screen flex z-10"><div class="flex flex-col justify-end w-full items-center pb-10 text-center"><div class="text-5xl lg:text-7xl font-secondary">${validate_component(Marquee, "Marquee").$$render(
    $$result,
    {
      duration: 5e3,
      words: [
        $i18n.t("Explore the cosmos"),
        $i18n.t("Unlock mysteries"),
        $i18n.t("Chart new frontiers"),
        $i18n.t("Dive into knowledge"),
        $i18n.t("Discover wonders"),
        $i18n.t("Ignite curiosity"),
        $i18n.t("Forge new paths"),
        $i18n.t("Unravel secrets"),
        $i18n.t("Pioneer insights"),
        $i18n.t("Embark on adventures")
      ]
    },
    {},
    {}
  )} <div class="mt-0.5">${escape($i18n.t(`wherever you are`))}</div></div> <div class="flex justify-center mt-8"><div class="flex flex-col justify-center items-center"><button class="relative z-20 flex p-1 rounded-full bg-white/5 hover:bg-white/10 transition font-medium text-sm">${validate_component(ArrowRightCircle, "ArrowRightCircle").$$render($$result, { className: "size-6" }, {}, {})}</button> <div class="mt-1.5 font-primary text-base font-medium">${escape($i18n.t(`Get started`))}</div></div></div></div> </div></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $config, $$unsubscribe_config;
  let $$unsubscribe_user;
  let $$unsubscribe_page;
  let $$unsubscribe_socket;
  let $$unsubscribe_i18n;
  let $WEBUI_NAME, $$unsubscribe_WEBUI_NAME;
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_socket = subscribe(socket, (value) => value);
  $$unsubscribe_WEBUI_NAME = subscribe(WEBUI_NAME, (value) => $WEBUI_NAME = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $config?.features.enable_ldap ? "ldap" : "signin";
  let onboarding = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-sdpf07_START -->${$$result.title = `<title> ${escape(`${$WEBUI_NAME}`)} </title>`, ""}<!-- HEAD_svelte-sdpf07_END -->`, ""} ${validate_component(OnBoarding, "OnBoarding").$$render(
      $$result,
      {
        getStartedHandler: () => {
          onboarding = false;
          $config?.features.enable_ldap ? "ldap" : "signup";
        },
        show: onboarding
      },
      {
        show: ($$value) => {
          onboarding = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="w-full h-screen max-h-[100dvh] text-white relative"><div class="w-full h-full absolute top-0 left-0 bg-white dark:bg-black"></div> <div class="w-full absolute top-0 left-0 right-0 h-8 drag-region"></div> ${``}</div>`;
  } while (!$$settled);
  $$unsubscribe_config();
  $$unsubscribe_user();
  $$unsubscribe_page();
  $$unsubscribe_socket();
  $$unsubscribe_i18n();
  $$unsubscribe_WEBUI_NAME();
  return $$rendered;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

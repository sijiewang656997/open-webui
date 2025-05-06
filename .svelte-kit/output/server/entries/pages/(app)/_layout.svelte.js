import { c as create_ssr_component, b as subscribe, l as createEventDispatcher, p as getContext, g as escape, e as each, a as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "idb";
import "file-saver";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
import "../../../chunks/index5.js";
import { a as settings, u as user, c as config, m as models, t as temporaryChatEnabled, h as showSettings } from "../../../chunks/index3.js";
import "dayjs";
import "dayjs/plugin/localizedFormat.js";
/* empty css                                                  */
import "dompurify";
import "marked";
/* empty css                                                          */
import "dequal";
import "../../../chunks/create.js";
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
import "dayjs/plugin/duration.js";
import "dayjs/plugin/relativeTime.js";
import "i18next";
/* empty css                                                        */
/* empty css                                                          */
import { t as tick } from "../../../chunks/scheduler.js";
import { u as updateUserSettings } from "../../../chunks/index6.js";
import { g as getModels } from "../../../chunks/index7.js";
import { M as Modal } from "../../../chunks/Modal.js";
import "../../../chunks/index4.js";
import "kokoro-js";
import "@huggingface/transformers";
import "../../../chunks/index.js";
import { S as Search } from "../../../chunks/Search.js";
const General = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_settings;
  let $i18n, $$unsubscribe_i18n;
  let $user, $$unsubscribe_user;
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { saveSettings } = $$props;
  let { getModels: getModels2 } = $$props;
  let languages = [];
  $i18n.language;
  if ($$props.saveSettings === void 0 && $$bindings.saveSettings && saveSettings !== void 0) $$bindings.saveSettings(saveSettings);
  if ($$props.getModels === void 0 && $$bindings.getModels && getModels2 !== void 0) $$bindings.getModels(getModels2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex flex-col h-full justify-between text-sm"><div class="overflow-y-scroll max-h-[28rem] lg:max-h-full"><div class=""><div class="mb-1 text-sm font-medium">${escape($i18n.t("WebUI Settings"))}</div> <div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Theme"))}</div> <div class="flex items-center relative"><select class="dark:bg-gray-900 w-fit pr-8 rounded-sm py-2 px-2 text-xs bg-transparent outline-hidden text-right" placeholder="Select a theme"><option value="system">⚙️ ${escape($i18n.t("System"))}</option><option value="dark">🌑 ${escape($i18n.t("Dark"))}</option><option value="oled-dark">🌃 ${escape($i18n.t("OLED Dark"))}</option><option value="light">☀️ ${escape($i18n.t("Light"))}</option><option value="her" data-svelte-h="svelte-188ouwx">🌷 Her</option></select></div></div> <div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Language"))}</div> <div class="flex items-center relative"><select class="dark:bg-gray-900 w-fit pr-8 rounded-sm py-2 px-2 text-xs bg-transparent outline-hidden text-right" placeholder="Select a language">${each(languages, (language) => {
      return `<option${add_attribute("value", language["code"], 0)}>${escape(language["title"])}</option>`;
    })}</select></div></div> ${$i18n.language === "en-US" ? `<div class="mb-2 text-xs text-gray-400 dark:text-gray-500" data-svelte-h="svelte-3hlwzt">Couldn&#39;t find your language?
					<a class="text-gray-300 font-medium underline" href="https://github.com/open-webui/open-webui/blob/main/docs/CONTRIBUTING.md#-translations-and-internationalization" target="_blank">Help us translate Open WebUI!</a></div>` : ``} <div><div class="py-0.5 flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Notifications"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition" type="button">${`<span class="ml-2 self-center">${escape($i18n.t("Off"))}</span>`}</button></div></div></div> ${$user.role === "admin" || $user?.permissions.chat?.controls ? `<hr class="border-gray-100 dark:border-gray-850 my-3">  <div class="mt-2 space-y-3 pr-1.5"> ${``}</div>` : ``}</div> <div class="flex justify-end pt-3 text-sm font-medium"><button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full">${escape($i18n.t("Save"))}</button></div></div>`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_i18n();
  $$unsubscribe_user();
  return $$rendered;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "w-4 h-4" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"></path></svg>`;
});
const css$1 = {
  code: "input.svelte-1vx7r9s::-webkit-outer-spin-button,input.svelte-1vx7r9s::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.tabs.svelte-1vx7r9s::-webkit-scrollbar{display:none}.tabs.svelte-1vx7r9s{-ms-overflow-style:none;scrollbar-width:none}",
  map: `{"version":3,"file":"SettingsModal.svelte","sources":["SettingsModal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { getContext, tick } from \\"svelte\\";\\nimport { toast } from \\"svelte-sonner\\";\\nimport { config, models, settings, user } from \\"$lib/stores\\";\\nimport { updateUserSettings } from \\"$lib/apis/users\\";\\nimport { getModels as _getModels } from \\"$lib/apis\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport Modal from \\"../common/Modal.svelte\\";\\nimport Account from \\"./Settings/Account.svelte\\";\\nimport About from \\"./Settings/About.svelte\\";\\nimport General from \\"./Settings/General.svelte\\";\\nimport Interface from \\"./Settings/Interface.svelte\\";\\nimport Audio from \\"./Settings/Audio.svelte\\";\\nimport Chats from \\"./Settings/Chats.svelte\\";\\nimport User from \\"../icons/User.svelte\\";\\nimport Personalization from \\"./Settings/Personalization.svelte\\";\\nimport SearchInput from \\"../layout/Sidebar/SearchInput.svelte\\";\\nimport Search from \\"../icons/Search.svelte\\";\\nimport Connections from \\"./Settings/Connections.svelte\\";\\nconst i18n = getContext(\\"i18n\\");\\nexport let show = false;\\nconst searchData = [\\n  {\\n    id: \\"general\\",\\n    title: \\"General\\",\\n    keywords: [\\n      \\"general\\",\\n      \\"theme\\",\\n      \\"language\\",\\n      \\"notifications\\",\\n      \\"system\\",\\n      \\"systemprompt\\",\\n      \\"prompt\\",\\n      \\"advanced\\",\\n      \\"settings\\",\\n      \\"defaultsettings\\",\\n      \\"configuration\\",\\n      \\"systemsettings\\",\\n      \\"notificationsettings\\",\\n      \\"systempromptconfig\\",\\n      \\"languageoptions\\",\\n      \\"defaultparameters\\",\\n      \\"systemparameters\\"\\n    ]\\n  },\\n  {\\n    id: \\"interface\\",\\n    title: \\"Interface\\",\\n    keywords: [\\n      \\"defaultmodel\\",\\n      \\"selectmodel\\",\\n      \\"ui\\",\\n      \\"userinterface\\",\\n      \\"display\\",\\n      \\"layout\\",\\n      \\"design\\",\\n      \\"landingpage\\",\\n      \\"landingpagemode\\",\\n      \\"default\\",\\n      \\"chat\\",\\n      \\"chatbubble\\",\\n      \\"chatui\\",\\n      \\"username\\",\\n      \\"showusername\\",\\n      \\"displayusername\\",\\n      \\"widescreen\\",\\n      \\"widescreenmode\\",\\n      \\"fullscreen\\",\\n      \\"expandmode\\",\\n      \\"chatdirection\\",\\n      \\"lefttoright\\",\\n      \\"ltr\\",\\n      \\"righttoleft\\",\\n      \\"rtl\\",\\n      \\"notifications\\",\\n      \\"toast\\",\\n      \\"toastnotifications\\",\\n      \\"largechunks\\",\\n      \\"streamlargechunks\\",\\n      \\"scroll\\",\\n      \\"scrollonbranchchange\\",\\n      \\"scrollbehavior\\",\\n      \\"richtext\\",\\n      \\"richtextinput\\",\\n      \\"background\\",\\n      \\"chatbackground\\",\\n      \\"chatbackgroundimage\\",\\n      \\"backgroundimage\\",\\n      \\"uploadbackground\\",\\n      \\"resetbackground\\",\\n      \\"titleautogen\\",\\n      \\"titleautogeneration\\",\\n      \\"autotitle\\",\\n      \\"chattags\\",\\n      \\"autochattags\\",\\n      \\"responseautocopy\\",\\n      \\"clipboard\\",\\n      \\"location\\",\\n      \\"userlocation\\",\\n      \\"userlocationaccess\\",\\n      \\"haptic\\",\\n      \\"hapticfeedback\\",\\n      \\"vibration\\",\\n      \\"voice\\",\\n      \\"voicecontrol\\",\\n      \\"voiceinterruption\\",\\n      \\"call\\",\\n      \\"emojis\\",\\n      \\"displayemoji\\",\\n      \\"save\\",\\n      \\"interfaceoptions\\",\\n      \\"interfacecustomization\\",\\n      \\"alwaysonwebsearch\\"\\n    ]\\n  },\\n  // {\\n  // \\tid: 'connections',\\n  // \\ttitle: 'Connections',\\n  // \\tkeywords: []\\n  // },\\n  {\\n    id: \\"personalization\\",\\n    title: \\"Personalization\\",\\n    keywords: [\\n      \\"personalization\\",\\n      \\"memory\\",\\n      \\"personalize\\",\\n      \\"preferences\\",\\n      \\"profile\\",\\n      \\"personalsettings\\",\\n      \\"customsettings\\",\\n      \\"userpreferences\\",\\n      \\"accountpreferences\\"\\n    ]\\n  },\\n  {\\n    id: \\"audio\\",\\n    title: \\"Audio\\",\\n    keywords: [\\n      \\"audio\\",\\n      \\"sound\\",\\n      \\"soundsettings\\",\\n      \\"audiocontrol\\",\\n      \\"volume\\",\\n      \\"speech\\",\\n      \\"speechrecognition\\",\\n      \\"stt\\",\\n      \\"speechtotext\\",\\n      \\"tts\\",\\n      \\"texttospeech\\",\\n      \\"playback\\",\\n      \\"playbackspeed\\",\\n      \\"voiceplayback\\",\\n      \\"speechplayback\\",\\n      \\"audiooutput\\",\\n      \\"speechengine\\",\\n      \\"voicecontrol\\",\\n      \\"audioplayback\\",\\n      \\"transcription\\",\\n      \\"autotranscribe\\",\\n      \\"autosend\\",\\n      \\"speechsettings\\",\\n      \\"audiovoice\\",\\n      \\"voiceoptions\\",\\n      \\"setvoice\\",\\n      \\"nonlocalvoices\\",\\n      \\"savesettings\\",\\n      \\"audioconfig\\",\\n      \\"speechconfig\\",\\n      \\"voicerecognition\\",\\n      \\"speechsynthesis\\",\\n      \\"speechmode\\",\\n      \\"voicespeed\\",\\n      \\"speechrate\\",\\n      \\"speechspeed\\",\\n      \\"audioinput\\",\\n      \\"audiofeatures\\",\\n      \\"voicemodes\\"\\n    ]\\n  },\\n  {\\n    id: \\"chats\\",\\n    title: \\"Chats\\",\\n    keywords: [\\n      \\"chat\\",\\n      \\"messages\\",\\n      \\"conversations\\",\\n      \\"chatsettings\\",\\n      \\"history\\",\\n      \\"chathistory\\",\\n      \\"messagehistory\\",\\n      \\"messagearchive\\",\\n      \\"convo\\",\\n      \\"chats\\",\\n      \\"conversationhistory\\",\\n      \\"exportmessages\\",\\n      \\"chatactivity\\"\\n    ]\\n  },\\n  {\\n    id: \\"account\\",\\n    title: \\"Account\\",\\n    keywords: [\\n      \\"account\\",\\n      \\"profile\\",\\n      \\"security\\",\\n      \\"privacy\\",\\n      \\"settings\\",\\n      \\"login\\",\\n      \\"useraccount\\",\\n      \\"userdata\\",\\n      \\"api\\",\\n      \\"apikey\\",\\n      \\"userprofile\\",\\n      \\"profiledetails\\",\\n      \\"accountsettings\\",\\n      \\"accountpreferences\\",\\n      \\"securitysettings\\",\\n      \\"privacysettings\\"\\n    ]\\n  },\\n  {\\n    id: \\"admin\\",\\n    title: \\"Admin\\",\\n    keywords: [\\n      \\"admin\\",\\n      \\"administrator\\",\\n      \\"adminsettings\\",\\n      \\"adminpanel\\",\\n      \\"systemadmin\\",\\n      \\"administratoraccess\\",\\n      \\"systemcontrol\\",\\n      \\"manage\\",\\n      \\"management\\",\\n      \\"admincontrols\\",\\n      \\"adminfeatures\\",\\n      \\"usercontrol\\",\\n      \\"arenamodel\\",\\n      \\"evaluations\\",\\n      \\"websearch\\",\\n      \\"database\\",\\n      \\"pipelines\\",\\n      \\"images\\",\\n      \\"audio\\",\\n      \\"documents\\",\\n      \\"rag\\",\\n      \\"models\\",\\n      \\"ollama\\",\\n      \\"openai\\",\\n      \\"users\\"\\n    ]\\n  }\\n  // {\\n  // \\tid: 'about',\\n  // \\ttitle: 'About',\\n  // \\tkeywords: [\\n  // \\t\\t'about',\\n  // \\t\\t'info',\\n  // \\t\\t'information',\\n  // \\t\\t'version',\\n  // \\t\\t'documentation',\\n  // \\t\\t'help',\\n  // \\t\\t'support',\\n  // \\t\\t'details',\\n  // \\t\\t'aboutus',\\n  // \\t\\t'softwareinfo',\\n  // \\t\\t'timothyjaeryangbaek',\\n  // \\t\\t'openwebui',\\n  // \\t\\t'release',\\n  // \\t\\t'updates',\\n  // \\t\\t'updateinfo',\\n  // \\t\\t'versioninfo',\\n  // \\t\\t'aboutapp',\\n  // \\t\\t'terms',\\n  // \\t\\t'termsandconditions',\\n  // \\t\\t'contact',\\n  // \\t\\t'aboutpage'\\n  // \\t]\\n  // }\\n];\\nlet search = \\"\\";\\nlet visibleTabs = searchData.map((tab) => tab.id);\\nlet searchDebounceTimeout;\\nconst searchSettings = (query) => {\\n  const lowerCaseQuery = query.toLowerCase().trim();\\n  return searchData.filter(\\n    (tab) => tab.title.toLowerCase().includes(lowerCaseQuery) || tab.keywords.some((keyword) => keyword.includes(lowerCaseQuery))\\n  ).map((tab) => tab.id);\\n};\\nconst searchDebounceHandler = () => {\\n  clearTimeout(searchDebounceTimeout);\\n  searchDebounceTimeout = setTimeout(() => {\\n    visibleTabs = searchSettings(search);\\n    if (visibleTabs.length > 0 && !visibleTabs.includes(selectedTab)) {\\n      selectedTab = visibleTabs[0];\\n    }\\n  }, 100);\\n};\\nconst saveSettings = async (updated) => {\\n  console.log(updated);\\n  await settings.set({ ...$settings, ...updated });\\n  await models.set(await getModels());\\n  await updateUserSettings(localStorage.token, { ui: $settings });\\n};\\nconst getModels = async () => {\\n  return await _getModels(\\n    localStorage.token,\\n    $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null)\\n  );\\n};\\nlet selectedTab = \\"general\\";\\nconst scrollHandler = (event) => {\\n  const settingsTabsContainer = document.getElementById(\\"settings-tabs-container\\");\\n  if (settingsTabsContainer) {\\n    event.preventDefault();\\n    settingsTabsContainer.scrollLeft += event.deltaY;\\n  }\\n};\\nconst addScrollListener = async () => {\\n  await tick();\\n  const settingsTabsContainer = document.getElementById(\\"settings-tabs-container\\");\\n  if (settingsTabsContainer) {\\n    settingsTabsContainer.addEventListener(\\"wheel\\", scrollHandler);\\n  }\\n};\\nconst removeScrollListener = async () => {\\n  await tick();\\n  const settingsTabsContainer = document.getElementById(\\"settings-tabs-container\\");\\n  if (settingsTabsContainer) {\\n    settingsTabsContainer.removeEventListener(\\"wheel\\", scrollHandler);\\n  }\\n};\\n$: if (show) {\\n  addScrollListener();\\n} else {\\n  removeScrollListener();\\n}\\n<\/script>\\n\\n<Modal size=\\"xl\\" bind:show>\\n\\t<div class=\\"text-gray-700 dark:text-gray-100\\">\\n\\t\\t<div class=\\" flex justify-between dark:text-gray-300 px-5 pt-4 pb-1\\">\\n\\t\\t\\t<div class=\\" text-lg font-medium self-center\\">{$i18n.t('Settings')}</div>\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"self-center\\"\\n\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\tshow = false;\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\tviewBox=\\"0 0 20 20\\"\\n\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\tclass=\\"w-5 h-5\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\td=\\"M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</svg>\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\n\\t\\t<div class=\\"flex flex-col md:flex-row w-full px-4 pt-1 pb-4 md:space-x-4\\">\\n\\t\\t\\t<div\\n\\t\\t\\t\\tid=\\"settings-tabs-container\\"\\n\\t\\t\\t\\tclass=\\"tabs flex flex-row overflow-x-auto gap-2.5 md:gap-1 md:flex-col flex-1 md:flex-none md:w-40 dark:text-gray-200 text-sm font-medium text-left mb-1 md:mb-0 -translate-y-1\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div class=\\"hidden md:flex w-full rounded-xl -mb-1 px-0.5 gap-2\\" id=\\"settings-search\\">\\n\\t\\t\\t\\t\\t<div class=\\"self-center rounded-l-xl bg-transparent\\">\\n\\t\\t\\t\\t\\t\\t<Search className=\\"size-3.5\\" />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\tclass=\\"w-full py-1.5 text-sm bg-transparent dark:text-gray-300 outline-hidden\\"\\n\\t\\t\\t\\t\\t\\tbind:value={search}\\n\\t\\t\\t\\t\\t\\ton:input={searchDebounceHandler}\\n\\t\\t\\t\\t\\t\\tplaceholder={$i18n.t('Search')}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t{#if visibleTabs.length > 0}\\n\\t\\t\\t\\t\\t{#each visibleTabs as tabId (tabId)}\\n\\t\\t\\t\\t\\t\\t{#if tabId === 'general'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'general'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'general';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 20 20\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('General')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'interface'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'interface'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'interface';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 16 16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Interface')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'connections'}\\n\\t\\t\\t\\t\\t\\t\\t{#if $user.role === 'admin' || ($user.role === 'user' && $config?.features?.enable_direct_connections)}\\n\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t'connections'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'connections';\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 16 16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M1 9.5A3.5 3.5 0 0 0 4.5 13H12a3 3 0 0 0 .917-5.857 2.503 2.503 0 0 0-3.198-3.019 3.5 3.5 0 0 0-6.628 2.171A3.5 3.5 0 0 0 1 9.5Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Connections')}</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'personalization'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'personalization'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'personalization';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<User />\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Personalization')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'audio'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'audio'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'audio';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 16 16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Audio')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'chats'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'chats'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'chats';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 16 16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M8 2C4.262 2 1 4.57 1 8c0 1.86.98 3.486 2.455 4.566a3.472 3.472 0 0 1-.469 1.26.75.75 0 0 0 .713 1.14 6.961 6.961 0 0 0 3.06-1.06c.403.062.818.094 1.241.094 3.738 0 7-2.57 7-6s-3.262-6-7-6ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Chats')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'account'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'account'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'account';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 16 16\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Account')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'about'}\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t'about'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tselectedTab = 'about';\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 20 20\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-4 h-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('About')}</div>\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t{:else if tabId === 'admin'}\\n\\t\\t\\t\\t\\t\\t\\t{#if $user.role === 'admin'}\\n\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition {selectedTab ===\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t'admin'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t? ''\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t: ' text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white'}\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait goto('/admin/settings');\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tshow = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center mr-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"size-4\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\td=\\"M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" self-center\\">{$i18n.t('Admin Settings')}</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<div class=\\"text-center text-gray-500 mt-4\\">\\n\\t\\t\\t\\t\\t\\t{$i18n.t('No results found')}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"flex-1 md:min-h-[32rem] max-h-[32rem]\\">\\n\\t\\t\\t\\t{#if selectedTab === 'general'}\\n\\t\\t\\t\\t\\t<General\\n\\t\\t\\t\\t\\t\\t{getModels}\\n\\t\\t\\t\\t\\t\\t{saveSettings}\\n\\t\\t\\t\\t\\t\\ton:save={() => {\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'interface'}\\n\\t\\t\\t\\t\\t<Interface\\n\\t\\t\\t\\t\\t\\t{saveSettings}\\n\\t\\t\\t\\t\\t\\ton:save={() => {\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'connections'}\\n\\t\\t\\t\\t\\t<Connections\\n\\t\\t\\t\\t\\t\\tsaveSettings={async (updated) => {\\n\\t\\t\\t\\t\\t\\t\\tawait saveSettings(updated);\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'personalization'}\\n\\t\\t\\t\\t\\t<Personalization\\n\\t\\t\\t\\t\\t\\t{saveSettings}\\n\\t\\t\\t\\t\\t\\ton:save={() => {\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'audio'}\\n\\t\\t\\t\\t\\t<Audio\\n\\t\\t\\t\\t\\t\\t{saveSettings}\\n\\t\\t\\t\\t\\t\\ton:save={() => {\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'chats'}\\n\\t\\t\\t\\t\\t<Chats {saveSettings} />\\n\\t\\t\\t\\t{:else if selectedTab === 'account'}\\n\\t\\t\\t\\t\\t<Account\\n\\t\\t\\t\\t\\t\\t{saveSettings}\\n\\t\\t\\t\\t\\t\\tsaveHandler={() => {\\n\\t\\t\\t\\t\\t\\t\\ttoast.success($i18n.t('Settings saved successfully!'));\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{:else if selectedTab === 'about'}\\n\\t\\t\\t\\t\\t<About />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</Modal>\\n\\n<style>\\n\\tinput::-webkit-outer-spin-button,\\n\\tinput::-webkit-inner-spin-button {\\n\\t\\t/* display: none; <- Crashes Chrome on hover */\\n\\t\\t-webkit-appearance: none;\\n\\t\\tmargin: 0; /* <-- Apparently some margin are still there even though it's hidden */\\n\\t}\\n\\n\\t.tabs::-webkit-scrollbar {\\n\\t\\tdisplay: none; /* for Chrome, Safari and Opera */\\n\\t}\\n\\n\\t.tabs {\\n\\t\\t-ms-overflow-style: none; /* IE and Edge */\\n\\t\\tscrollbar-width: none; /* Firefox */\\n\\t}\\n\\n\\tinput[type='number'] {\\n\\t\\t-moz-appearance: textfield; /* Firefox */\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA8pBC,oBAAK,2BAA2B,CAChC,oBAAK,2BAA4B,CAEhC,kBAAkB,CAAE,IAAI,CACxB,MAAM,CAAE,CACT,CAEA,oBAAK,mBAAoB,CACxB,OAAO,CAAE,IACV,CAEA,oBAAM,CACL,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAClB"}`
};
const SettingsModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $i18n, $$unsubscribe_i18n;
  let $user, $$unsubscribe_user;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  const searchData = [
    {
      id: "general",
      title: "General",
      keywords: [
        "general",
        "theme",
        "language",
        "notifications",
        "system",
        "systemprompt",
        "prompt",
        "advanced",
        "settings",
        "defaultsettings",
        "configuration",
        "systemsettings",
        "notificationsettings",
        "systempromptconfig",
        "languageoptions",
        "defaultparameters",
        "systemparameters"
      ]
    },
    {
      id: "interface",
      title: "Interface",
      keywords: [
        "defaultmodel",
        "selectmodel",
        "ui",
        "userinterface",
        "display",
        "layout",
        "design",
        "landingpage",
        "landingpagemode",
        "default",
        "chat",
        "chatbubble",
        "chatui",
        "username",
        "showusername",
        "displayusername",
        "widescreen",
        "widescreenmode",
        "fullscreen",
        "expandmode",
        "chatdirection",
        "lefttoright",
        "ltr",
        "righttoleft",
        "rtl",
        "notifications",
        "toast",
        "toastnotifications",
        "largechunks",
        "streamlargechunks",
        "scroll",
        "scrollonbranchchange",
        "scrollbehavior",
        "richtext",
        "richtextinput",
        "background",
        "chatbackground",
        "chatbackgroundimage",
        "backgroundimage",
        "uploadbackground",
        "resetbackground",
        "titleautogen",
        "titleautogeneration",
        "autotitle",
        "chattags",
        "autochattags",
        "responseautocopy",
        "clipboard",
        "location",
        "userlocation",
        "userlocationaccess",
        "haptic",
        "hapticfeedback",
        "vibration",
        "voice",
        "voicecontrol",
        "voiceinterruption",
        "call",
        "emojis",
        "displayemoji",
        "save",
        "interfaceoptions",
        "interfacecustomization",
        "alwaysonwebsearch"
      ]
    },
    // {
    // 	id: 'connections',
    // 	title: 'Connections',
    // 	keywords: []
    // },
    {
      id: "personalization",
      title: "Personalization",
      keywords: [
        "personalization",
        "memory",
        "personalize",
        "preferences",
        "profile",
        "personalsettings",
        "customsettings",
        "userpreferences",
        "accountpreferences"
      ]
    },
    {
      id: "audio",
      title: "Audio",
      keywords: [
        "audio",
        "sound",
        "soundsettings",
        "audiocontrol",
        "volume",
        "speech",
        "speechrecognition",
        "stt",
        "speechtotext",
        "tts",
        "texttospeech",
        "playback",
        "playbackspeed",
        "voiceplayback",
        "speechplayback",
        "audiooutput",
        "speechengine",
        "voicecontrol",
        "audioplayback",
        "transcription",
        "autotranscribe",
        "autosend",
        "speechsettings",
        "audiovoice",
        "voiceoptions",
        "setvoice",
        "nonlocalvoices",
        "savesettings",
        "audioconfig",
        "speechconfig",
        "voicerecognition",
        "speechsynthesis",
        "speechmode",
        "voicespeed",
        "speechrate",
        "speechspeed",
        "audioinput",
        "audiofeatures",
        "voicemodes"
      ]
    },
    {
      id: "chats",
      title: "Chats",
      keywords: [
        "chat",
        "messages",
        "conversations",
        "chatsettings",
        "history",
        "chathistory",
        "messagehistory",
        "messagearchive",
        "convo",
        "chats",
        "conversationhistory",
        "exportmessages",
        "chatactivity"
      ]
    },
    {
      id: "account",
      title: "Account",
      keywords: [
        "account",
        "profile",
        "security",
        "privacy",
        "settings",
        "login",
        "useraccount",
        "userdata",
        "api",
        "apikey",
        "userprofile",
        "profiledetails",
        "accountsettings",
        "accountpreferences",
        "securitysettings",
        "privacysettings"
      ]
    },
    {
      id: "admin",
      title: "Admin",
      keywords: [
        "admin",
        "administrator",
        "adminsettings",
        "adminpanel",
        "systemadmin",
        "administratoraccess",
        "systemcontrol",
        "manage",
        "management",
        "admincontrols",
        "adminfeatures",
        "usercontrol",
        "arenamodel",
        "evaluations",
        "websearch",
        "database",
        "pipelines",
        "images",
        "audio",
        "documents",
        "rag",
        "models",
        "ollama",
        "openai",
        "users"
      ]
    }
  ];
  let search = "";
  let visibleTabs = searchData.map((tab) => tab.id);
  const saveSettings = async (updated) => {
    console.log(updated);
    await settings.set({ ...$settings, ...updated });
    await models.set(await getModels$1());
    await updateUserSettings(localStorage.token, { ui: $settings });
  };
  const getModels$1 = async () => {
    return await getModels(localStorage.token, $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null));
  };
  const scrollHandler = (event) => {
    const settingsTabsContainer = document.getElementById("settings-tabs-container");
    if (settingsTabsContainer) {
      event.preventDefault();
      settingsTabsContainer.scrollLeft += event.deltaY;
    }
  };
  const addScrollListener = async () => {
    await tick();
    const settingsTabsContainer = document.getElementById("settings-tabs-container");
    if (settingsTabsContainer) {
      settingsTabsContainer.addEventListener("wheel", scrollHandler);
    }
  };
  const removeScrollListener = async () => {
    await tick();
    const settingsTabsContainer = document.getElementById("settings-tabs-container");
    if (settingsTabsContainer) {
      settingsTabsContainer.removeEventListener("wheel", scrollHandler);
    }
  };
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (show) {
        addScrollListener();
      } else {
        removeScrollListener();
      }
    }
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "xl", show },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="text-gray-700 dark:text-gray-100"><div class="flex justify-between dark:text-gray-300 px-5 pt-4 pb-1"><div class="text-lg font-medium self-center">${escape($i18n.t("Settings"))}</div> <button class="self-center" data-svelte-h="svelte-745w2y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div> <div class="flex flex-col md:flex-row w-full px-4 pt-1 pb-4 md:space-x-4"><div id="settings-tabs-container" class="tabs flex flex-row overflow-x-auto gap-2.5 md:gap-1 md:flex-col flex-1 md:flex-none md:w-40 dark:text-gray-200 text-sm font-medium text-left mb-1 md:mb-0 -translate-y-1 svelte-1vx7r9s"><div class="hidden md:flex w-full rounded-xl -mb-1 px-0.5 gap-2" id="settings-search"><div class="self-center rounded-l-xl bg-transparent">${validate_component(Search, "Search").$$render($$result, { className: "size-3.5" }, {}, {})}</div> <input class="w-full py-1.5 text-sm bg-transparent dark:text-gray-300 outline-hidden svelte-1vx7r9s"${add_attribute("placeholder", $i18n.t("Search"), 0)}${add_attribute("value", search, 0)}></div> ${visibleTabs.length > 0 ? `${each(visibleTabs, (tabId) => {
            return `${tabId === "general" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              "",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-d0uebp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("General"))}</div> </button>` : `${tabId === "interface" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-183k9gv"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("Interface"))}</div> </button>` : `${tabId === "connections" ? `${$user.role === "admin" || $user.role === "user" && $config?.features?.enable_direct_connections ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-right transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-zidmj0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path d="M1 9.5A3.5 3.5 0 0 0 4.5 13H12a3 3 0 0 0 .917-5.857 2.503 2.503 0 0 0-3.198-3.019 3.5 3.5 0 0 0-6.628 2.171A3.5 3.5 0 0 0 1 9.5Z"></path></svg></div> <div class="self-center">${escape($i18n.t("Connections"))}</div> </button>` : ``}` : `${tabId === "personalization" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2">${validate_component(User, "User").$$render($$result, {}, {}, {})}</div> <div class="self-center">${escape($i18n.t("Personalization"))}</div> </button>` : `${tabId === "audio" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-1bad48g"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path d="M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z"></path><path d="M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z"></path></svg></div> <div class="self-center">${escape($i18n.t("Audio"))}</div> </button>` : `${tabId === "chats" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-hp16vk"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M8 2C4.262 2 1 4.57 1 8c0 1.86.98 3.486 2.455 4.566a3.472 3.472 0 0 1-.469 1.26.75.75 0 0 0 .713 1.14 6.961 6.961 0 0 0 3.06-1.06c.403.062.818.094 1.241.094 3.738 0 7-2.57 7-6s-3.262-6-7-6ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("Chats"))}</div> </button>` : `${tabId === "account" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-uyxh8m"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("Account"))}</div> </button>` : `${tabId === "about" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-im5r31"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("About"))}</div> </button>` : `${tabId === "admin" ? `${$user.role === "admin" ? `<button class="${"px-0.5 py-1 min-w-fit rounded-lg flex-1 md:flex-none flex text-left transition " + escape(
              " text-gray-300 dark:text-gray-600 hover:text-gray-700 dark:hover:text-white",
              true
            )}"><div class="self-center mr-2" data-svelte-h="svelte-1rekzwz"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4"><path fill-rule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clip-rule="evenodd"></path></svg></div> <div class="self-center">${escape($i18n.t("Admin Settings"))}</div> </button>` : ``}` : ``}`}`}`}`}`}`}`}`}`;
          })}` : `<div class="text-center text-gray-500 mt-4">${escape($i18n.t("No results found"))}</div>`}</div> <div class="flex-1 md:min-h-[32rem] max-h-[32rem]">${`${validate_component(General, "General").$$render($$result, { getModels: getModels$1, saveSettings }, {}, {})}`}</div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  $$unsubscribe_user();
  return $$rendered;
});
const css = {
  code: "@keyframes svelte-19023qi-l{to{clip-path:inset(0 -1ch 0 0)}}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { toast } from \\"svelte-sonner\\";\\nimport { onMount, tick, getContext } from \\"svelte\\";\\nimport { openDB, deleteDB } from \\"idb\\";\\nimport fileSaver from \\"file-saver\\";\\nconst { saveAs } = fileSaver;\\nimport mermaid from \\"mermaid\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { page } from \\"$app/stores\\";\\nimport { fade } from \\"svelte/transition\\";\\nimport { getKnowledgeBases } from \\"$lib/apis/knowledge\\";\\nimport { getFunctions } from \\"$lib/apis/functions\\";\\nimport { getModels, getVersionUpdates } from \\"$lib/apis\\";\\nimport { getAllTags } from \\"$lib/apis/chats\\";\\nimport { getPrompts } from \\"$lib/apis/prompts\\";\\nimport { getTools } from \\"$lib/apis/tools\\";\\nimport { getBanners } from \\"$lib/apis/configs\\";\\nimport { getUserSettings } from \\"$lib/apis/users\\";\\nimport { WEBUI_VERSION } from \\"$lib/constants\\";\\nimport { compareVersion } from \\"$lib/utils\\";\\nimport {\\n  config,\\n  user,\\n  settings,\\n  models,\\n  prompts,\\n  knowledge,\\n  tools,\\n  functions,\\n  tags,\\n  banners,\\n  showSettings,\\n  showChangelog,\\n  temporaryChatEnabled\\n} from \\"$lib/stores\\";\\nimport Sidebar from \\"$lib/components/layout/Sidebar.svelte\\";\\nimport SettingsModal from \\"$lib/components/chat/SettingsModal.svelte\\";\\nimport ChangelogModal from \\"$lib/components/ChangelogModal.svelte\\";\\nimport AccountPending from \\"$lib/components/layout/Overlay/AccountPending.svelte\\";\\nimport UpdateInfoToast from \\"$lib/components/layout/UpdateInfoToast.svelte\\";\\nconst i18n = getContext(\\"i18n\\");\\nlet loaded = false;\\nlet DB = null;\\nlet localDBChats = [];\\nlet version;\\nonMount(async () => {\\n  if ($user === void 0) {\\n    await goto(\\"/auth\\");\\n  } else if ([\\"user\\", \\"admin\\"].includes($user.role)) {\\n    try {\\n      DB = await openDB(\\"Chats\\", 1);\\n      if (DB) {\\n        const chats = await DB.getAllFromIndex(\\"chats\\", \\"timestamp\\");\\n        localDBChats = chats.map((item, idx) => chats[chats.length - 1 - idx]);\\n        if (localDBChats.length === 0) {\\n          await deleteDB(\\"Chats\\");\\n        }\\n      }\\n      console.log(DB);\\n    } catch (error) {\\n    }\\n    const userSettings = await getUserSettings(localStorage.token).catch((error) => {\\n      console.error(error);\\n      return null;\\n    });\\n    if (userSettings) {\\n      settings.set(userSettings.ui);\\n    } else {\\n      let localStorageSettings = {};\\n      try {\\n        localStorageSettings = JSON.parse(localStorage.getItem(\\"settings\\") ?? \\"{}\\");\\n      } catch (e) {\\n        console.error(\\"Failed to parse settings from localStorage\\", e);\\n      }\\n      settings.set(localStorageSettings);\\n    }\\n    models.set(\\n      await getModels(\\n        localStorage.token,\\n        $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null)\\n      )\\n    );\\n    banners.set(await getBanners(localStorage.token));\\n    tools.set(await getTools(localStorage.token));\\n    document.addEventListener(\\"keydown\\", async function(event) {\\n      const isCtrlPressed = event.ctrlKey || event.metaKey;\\n      const isShiftPressed = event.shiftKey;\\n      if (isCtrlPressed && isShiftPressed && event.key.toLowerCase() === \\"o\\") {\\n        event.preventDefault();\\n        console.log(\\"newChat\\");\\n        document.getElementById(\\"sidebar-new-chat-button\\")?.click();\\n      }\\n      if (isShiftPressed && event.key === \\"Escape\\") {\\n        event.preventDefault();\\n        console.log(\\"focusInput\\");\\n        document.getElementById(\\"chat-input\\")?.focus();\\n      }\\n      if (isCtrlPressed && isShiftPressed && event.key === \\";\\") {\\n        event.preventDefault();\\n        console.log(\\"copyLastCodeBlock\\");\\n        const button = [...document.getElementsByClassName(\\"copy-code-button\\")]?.at(-1);\\n        button?.click();\\n      }\\n      if (isCtrlPressed && isShiftPressed && event.key.toLowerCase() === \\"c\\") {\\n        event.preventDefault();\\n        console.log(\\"copyLastResponse\\");\\n        const button = [...document.getElementsByClassName(\\"copy-response-button\\")]?.at(-1);\\n        console.log(button);\\n        button?.click();\\n      }\\n      if (isCtrlPressed && isShiftPressed && event.key.toLowerCase() === \\"s\\") {\\n        event.preventDefault();\\n        console.log(\\"toggleSidebar\\");\\n        document.getElementById(\\"sidebar-toggle-button\\")?.click();\\n      }\\n      if (isCtrlPressed && isShiftPressed && (event.key === \\"Backspace\\" || event.key === \\"Delete\\")) {\\n        event.preventDefault();\\n        console.log(\\"deleteChat\\");\\n        document.getElementById(\\"delete-chat-button\\")?.click();\\n      }\\n      if (isCtrlPressed && event.key === \\".\\") {\\n        event.preventDefault();\\n        console.log(\\"openSettings\\");\\n        showSettings.set(!$showSettings);\\n      }\\n      if (isCtrlPressed && event.key === \\"/\\") {\\n        event.preventDefault();\\n        console.log(\\"showShortcuts\\");\\n        document.getElementById(\\"show-shortcuts-button\\")?.click();\\n      }\\n      if (isCtrlPressed && isShiftPressed && event.key.toLowerCase() === \`'\`) {\\n        event.preventDefault();\\n        console.log(\\"temporaryChat\\");\\n        temporaryChatEnabled.set(!$temporaryChatEnabled);\\n        await goto(\\"/\\");\\n        const newChatButton = document.getElementById(\\"new-chat-button\\");\\n        setTimeout(() => {\\n          newChatButton?.click();\\n        }, 0);\\n      }\\n    });\\n    if ($user.role === \\"admin\\" && ($settings?.showChangelog ?? true)) {\\n      showChangelog.set($settings?.version !== $config.version);\\n    }\\n    if ($page.url.searchParams.get(\\"temporary-chat\\") === \\"true\\") {\\n      temporaryChatEnabled.set(true);\\n    }\\n    if ($user.role === \\"admin\\") {\\n      if (localStorage.dismissedUpdateToast) {\\n        const dismissedUpdateToast = new Date(Number(localStorage.dismissedUpdateToast));\\n        const now = /* @__PURE__ */ new Date();\\n        if (now - dismissedUpdateToast > 24 * 60 * 60 * 1e3) {\\n          checkForVersionUpdates();\\n        }\\n      } else {\\n        checkForVersionUpdates();\\n      }\\n    }\\n    await tick();\\n  }\\n  loaded = true;\\n});\\nconst checkForVersionUpdates = async () => {\\n  version = await getVersionUpdates(localStorage.token).catch((error) => {\\n    return {\\n      current: WEBUI_VERSION,\\n      latest: WEBUI_VERSION\\n    };\\n  });\\n};\\n<\/script>\\n\\n<SettingsModal bind:show={$showSettings} />\\n<!-- <ChangelogModal bind:show={$showChangelog} /> -->\\n\\n<div class=\\"app relative\\">\\n\\t<div\\n\\t\\tclass=\\" text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 h-screen max-h-[100dvh] overflow-auto flex flex-row justify-end\\"\\n\\t>\\n\\t\\t{#if loaded}\\n\\t\\t\\t{#if !['user', 'admin'].includes($user.role)}\\n\\t\\t\\t\\t<AccountPending />\\n\\t\\t\\t{:else if localDBChats.length > 0}\\n\\t\\t\\t\\t<div class=\\"fixed w-full h-full flex z-50\\">\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\"absolute w-full h-full backdrop-blur-md bg-white/20 dark:bg-gray-900/50 flex justify-center\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<div class=\\"m-auto pb-44 flex flex-col justify-center\\">\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"max-w-md\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"text-center dark:text-white text-2xl font-medium z-50\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tImportant Update<br /> Action Required for Chat Log Storage\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" mt-4 text-center text-sm dark:text-gray-200 w-full\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{$i18n.t(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\"Saving chat logs directly to your browser's storage is no longer supported. Please take a moment to download and delete your chat logs by clicking the button below. Don't worry, you can easily re-import your chat logs to the backend through\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t)}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-semibold dark:text-white\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t>{$i18n.t('Settings')} > {$i18n.t('Chats')} > {$i18n.t('Import Chats')}</span\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>. {$i18n.t(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t'This ensures that your valuable conversations are securely saved to your backend database. Thank you!'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t)}\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\" mt-6 mx-auto relative group w-fit\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"relative z-20 flex px-5 py-2 rounded-full bg-white border border-gray-100 dark:border-none hover:bg-gray-100 transition font-medium text-sm\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlet blob = new Blob([JSON.stringify(localDBChats)], {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype: 'application/json'\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tsaveAs(blob, \`chat-export-\${Date.now()}.json\`);\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst tx = DB.transaction('chats', 'readwrite');\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait Promise.all([tx.store.clear(), tx.done]);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tawait deleteDB('Chats');\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlocalDBChats = [];\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tDownload & Delete\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</button>\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"text-xs text-center w-full mt-2 text-gray-400 underline\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlocalDBChats = [];\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}>{$i18n.t('Close')}</button\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\n\\t\\t\\t<Sidebar />\\n\\t\\t\\t<slot />\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.loading {\\n\\t\\tdisplay: inline-block;\\n\\t\\tclip-path: inset(0 1ch 0 0);\\n\\t\\tanimation: l 1s steps(3) infinite;\\n\\t\\tletter-spacing: -0.5px;\\n\\t}\\n\\n\\t@keyframes l {\\n\\t\\tto {\\n\\t\\t\\tclip-path: inset(0 -1ch 0 0);\\n\\t\\t}\\n\\t}\\n\\n\\tpre[class*='language-'] {\\n\\t\\tposition: relative;\\n\\t\\toverflow: auto;\\n\\n\\t\\t/* make space  */\\n\\t\\tmargin: 5px 0;\\n\\t\\tpadding: 1.75rem 0 1.75rem 1rem;\\n\\t\\tborder-radius: 10px;\\n\\t}\\n\\n\\tpre[class*='language-'] button {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 5px;\\n\\t\\tright: 5px;\\n\\n\\t\\tfont-size: 0.9rem;\\n\\t\\tpadding: 0.15rem;\\n\\t\\tbackground-color: #828282;\\n\\n\\t\\tborder: ridge 1px #7b7b7c;\\n\\t\\tborder-radius: 5px;\\n\\t\\ttext-shadow: #c4c4c4 0 0 2px;\\n\\t}\\n\\n\\tpre[class*='language-'] button:hover {\\n\\t\\tcursor: pointer;\\n\\t\\tbackground-color: #bcbabb;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyPC,WAAW,gBAAE,CACZ,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAC5B,CACD"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  let $$unsubscribe_page;
  let $$unsubscribe_config;
  let $$unsubscribe_settings;
  let $$unsubscribe_temporaryChatEnabled;
  let $showSettings, $$unsubscribe_showSettings;
  let $$unsubscribe_i18n;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_config = subscribe(config, (value) => value);
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_temporaryChatEnabled = subscribe(temporaryChatEnabled, (value) => value);
  $$unsubscribe_showSettings = subscribe(showSettings, (value) => $showSettings = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(SettingsModal, "SettingsModal").$$render(
      $$result,
      { show: $showSettings },
      {
        show: ($$value) => {
          $showSettings = $$value;
          $$settled = false;
        }
      },
      {}
    )}  <div class="app relative"><div class="text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 h-screen max-h-[100dvh] overflow-auto flex flex-row justify-end">${``}</div> </div>`;
  } while (!$$settled);
  $$unsubscribe_user();
  $$unsubscribe_page();
  $$unsubscribe_config();
  $$unsubscribe_settings();
  $$unsubscribe_temporaryChatEnabled();
  $$unsubscribe_showSettings();
  $$unsubscribe_i18n();
  return $$rendered;
});
export {
  Layout as default
};
//# sourceMappingURL=_layout.svelte.js.map

import { c as create_ssr_component, b as subscribe, p as getContext, v as validate_component } from "../../../../../../chunks/ssr.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { p as WEBUI_API_BASE_URL, m as models, F as knowledge, n as tools, k as functions, a as settings, c as config } from "../../../../../../chunks/index3.js";
import { g as getModels } from "../../../../../../chunks/index7.js";
import "dequal";
import "../../../../../../chunks/create.js";
import "dompurify";
import "marked";
import "../../../../../../chunks/index5.js";
/* empty css                                                           */
/* empty css                                                                 */
/* empty css                                                                   */
import "postcss";
const createNewModel = async (token, model) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/models/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(model)
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).catch((err) => {
    error = err.detail;
    console.log(err);
    return null;
  });
  if (error) {
    throw error;
  }
  return res;
};
const ModelEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_models;
  let $$unsubscribe_i18n;
  let $$unsubscribe_knowledgeCollections;
  let $$unsubscribe_tools;
  let $$unsubscribe_functions;
  $$unsubscribe_models = subscribe(models, (value) => value);
  $$unsubscribe_knowledgeCollections = subscribe(knowledge, (value) => value);
  $$unsubscribe_tools = subscribe(tools, (value) => value);
  $$unsubscribe_functions = subscribe(functions, (value) => value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => value);
  let { onSubmit } = $$props;
  let { onBack = null } = $$props;
  let { model = null } = $$props;
  let { edit = false } = $$props;
  let { preset = true } = $$props;
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0) $$bindings.onSubmit(onSubmit);
  if ($$props.onBack === void 0 && $$bindings.onBack && onBack !== void 0) $$bindings.onBack(onBack);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0) $$bindings.model(model);
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0) $$bindings.edit(edit);
  if ($$props.preset === void 0 && $$bindings.preset && preset !== void 0) $$bindings.preset(preset);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${``}`;
  } while (!$$settled);
  $$unsubscribe_models();
  $$unsubscribe_i18n();
  $$unsubscribe_knowledgeCollections();
  $$unsubscribe_tools();
  $$unsubscribe_functions();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  let $settings, $$unsubscribe_settings;
  let $config, $$unsubscribe_config;
  let $models, $$unsubscribe_models;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  $$unsubscribe_config = subscribe(config, (value) => $config = value);
  $$unsubscribe_models = subscribe(models, (value) => $models = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  const onSubmit = async (modelInfo) => {
    if ($models.find((m) => m.id === modelInfo.id)) {
      toast.error(`Error: A model with the ID '${modelInfo.id}' already exists. Please select a different ID to proceed.`);
      return;
    }
    if (modelInfo.id === "") {
      toast.error("Error: Model ID cannot be empty. Please enter a valid ID to proceed.");
      return;
    }
    if (modelInfo) {
      const res = await createNewModel(localStorage.token, {
        ...modelInfo,
        meta: {
          ...modelInfo.meta,
          profile_image_url: modelInfo.meta.profile_image_url ?? "/static/favicon.png",
          suggestion_prompts: modelInfo.meta.suggestion_prompts ? modelInfo.meta.suggestion_prompts.filter((prompt) => prompt.content !== "") : null
        },
        params: { ...modelInfo.params }
      }).catch((error) => {
        toast.error(`${error}`);
        return null;
      });
      if (res) {
        await models.set(await getModels(localStorage.token, $config?.features?.enable_direct_connections && ($settings?.directConnections ?? null)));
        toast.success($i18n.t("Model created successfully!"));
        await goto();
      }
    }
  };
  let model = null;
  $$unsubscribe_i18n();
  $$unsubscribe_settings();
  $$unsubscribe_config();
  $$unsubscribe_models();
  return `${validate_component(ModelEditor, "ModelEditor").$$render($$result, { model, onSubmit }, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

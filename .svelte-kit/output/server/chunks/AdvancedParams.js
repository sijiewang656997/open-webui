import { c as create_ssr_component, l as createEventDispatcher, p as getContext, b as subscribe, v as validate_component, a as add_attribute, f as escape } from "./ssr.js";
import { S as Switch_1 } from "./Switch.js";
import { T as Tooltip } from "./Tooltip.js";
const AdvancedParams = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const dispatch = createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { admin = false } = $$props;
  let { params = {
    // Advanced
    stream_response: null,
    // Set stream responses for this model individually
    function_calling: null,
    seed: null,
    stop: null,
    temperature: null,
    reasoning_effort: null,
    frequency_penalty: null,
    repeat_last_n: null,
    mirostat: null,
    mirostat_eta: null,
    mirostat_tau: null,
    top_k: null,
    top_p: null,
    min_p: null,
    tfs_z: null,
    num_ctx: null,
    num_batch: null,
    num_keep: null,
    max_tokens: null,
    use_mmap: null,
    use_mlock: null,
    num_thread: null,
    num_gpu: null,
    template: null
  } } = $$props;
  if ($$props.admin === void 0 && $$bindings.admin && admin !== void 0) $$bindings.admin(admin);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (params) {
        dispatch("change", params);
      }
    }
    $$rendered = `<div class="space-y-1 text-xs pb-safe-bottom"><div>${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("When enabled, the model will respond to each chat message in real-time, generating a response as soon as the user sends a message. This mode is useful for live chat applications, but may impact performance on slower hardware."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="py-0.5 flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Stream Chat Response"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition" type="button">${params.stream_response === true ? `<span class="ml-2 self-center">${escape($i18n.t("On"))}</span>` : `${params.stream_response === false ? `<span class="ml-2 self-center">${escape($i18n.t("Off"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>`}`}</button></div>`;
        }
      }
    )}</div> <div>${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Default mode works with a wider range of models by calling tools once before execution. Native mode leverages the model’s built-in tool-calling capabilities, but requires the model to inherently support this feature."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="py-0.5 flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Function Calling"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition" type="button">${params.function_calling === "native" ? `<span class="ml-2 self-center">${escape($i18n.t("Native"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>`}</button></div>`;
        }
      }
    )}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets the random number seed to use for generation. Setting this to a specific number will make the model generate the same text for the same prompt. (Default: random)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Seed"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.seed ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.seed ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-hidden" type="number"${add_attribute("placeholder", $i18n.t("Enter Seed"), 0)} autocomplete="off" min="0"${add_attribute("value", params.seed, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets the stop sequences to use. When this pattern is encountered, the LLM will stop generating text and return. Multiple stop patterns may be set by specifying multiple separate stop parameters in a modelfile."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Stop Sequence"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.stop ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.stop ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input class="w-full rounded-lg py-2 px-1 text-sm dark:text-gray-300 dark:bg-gray-850 outline-hidden" type="text"${add_attribute("placeholder", $i18n.t("Enter stop sequence"), 0)} autocomplete="off"${add_attribute("value", params.stop, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("The temperature of the model. Increasing the temperature will make the model answer more creatively. (Default: 0.8)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Temperature"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.temperature ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.temperature ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="2" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.temperature, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="2" step="any"${add_attribute("value", params.temperature, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Constrains effort on reasoning for reasoning models. Only applicable to reasoning models from specific providers that support reasoning effort. (Default: medium)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Reasoning Effort"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.reasoning_effort ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.reasoning_effort ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input class="w-full rounded-lg py-2 px-1 text-sm dark:text-gray-300 dark:bg-gray-850 outline-hidden" type="text"${add_attribute("placeholder", $i18n.t("Enter reasoning effort"), 0)} autocomplete="off"${add_attribute("value", params.reasoning_effort, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Enable Mirostat sampling for controlling perplexity. (Default: 0, 0 = Disabled, 1 = Mirostat, 2 = Mirostat 2.0)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Mirostat"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.mirostat ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.mirostat ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="2" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.mirostat, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="2" step="1"${add_attribute("value", params.mirostat, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Influences how quickly the algorithm responds to feedback from the generated text. A lower learning rate will result in slower adjustments, while a higher learning rate will make the algorithm more responsive. (Default: 0.1)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Mirostat Eta"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.mirostat_eta ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.mirostat_eta ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="1" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.mirostat_eta, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="1" step="any"${add_attribute("value", params.mirostat_eta, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Controls the balance between coherence and diversity of the output. A lower value will result in more focused and coherent text. (Default: 5.0)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Mirostat Tau"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.mirostat_tau ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.mirostat_tau ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="10" step="0.5" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.mirostat_tau, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="10" step="any"${add_attribute("value", params.mirostat_tau, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative. (Default: 40)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Top K"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.top_k ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.top_k ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="1000" step="0.5" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.top_k, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="100" step="any"${add_attribute("value", params.top_k, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text. (Default: 0.9)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Top P"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.top_p ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.top_p ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="1" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.top_p, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="1" step="any"${add_attribute("value", params.top_p, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Alternative to the top_p, and aims to ensure a balance of quality and variety. The parameter p represents the minimum probability for a token to be considered, relative to the probability of the most likely token. For example, with p=0.05 and the most likely token having a probability of 0.9, logits with a value less than 0.045 are filtered out. (Default: 0.0)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Min P"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.min_p ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.min_p ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="1" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.min_p, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="1" step="any"${add_attribute("value", params.min_p, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets a scaling bias against tokens to penalize repetitions, based on how many times they have appeared. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient. At 0, it is disabled. (Default: 1.1)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Frequency Penalty"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.frequency_penalty ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.frequency_penalty ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-2" max="2" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.frequency_penalty, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="-2" max="2" step="any"${add_attribute("value", params.frequency_penalty, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets a flat bias against tokens that have appeared at least once. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient. At 0, it is disabled. (Default: 0)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Presence Penalty"))}</div> <button class="p-1 px-3 text-xs flex rounded transition flex-shrink-0 outline-none" type="button">${(params?.presence_penalty ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.presence_penalty ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-2" max="2" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.presence_penalty, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="-2" max="2" step="any"${add_attribute("value", params.presence_penalty, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Control the repetition of token sequences in the generated text. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 1.1) will be more lenient. At 1, it is disabled. (Default: 1.1)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Repeat Penalty (Ollama)"))}</div> <button class="p-1 px-3 text-xs flex rounded transition flex-shrink-0 outline-none" type="button">${(params?.repeat_penalty ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.repeat_penalty ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-2" max="2" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.repeat_penalty, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="-2" max="2" step="any"${add_attribute("value", params.repeat_penalty, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets how far back for the model to look back to prevent repetition. (Default: 64, 0 = disabled, -1 = num_ctx)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Repeat Last N"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.repeat_last_n ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.repeat_last_n ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-1" max="128" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.repeat_last_n, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="-1" max="128" step="1"${add_attribute("value", params.repeat_last_n, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Tail free sampling is used to reduce the impact of less probable tokens from the output. A higher value (e.g., 2.0) will reduce the impact more, while a value of 1.0 disables this setting. (default: 1)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Tfs Z"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.tfs_z ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.tfs_z ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="2" step="0.05" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.tfs_z, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="0" max="2" step="any"${add_attribute("value", params.tfs_z, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Sets the size of the context window used to generate the next token. (Default: 2048)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Context Length"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.num_ctx ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.num_ctx ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-1" max="10240000" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.num_ctx, 0)}></div> <div class=""><input type="number" class="bg-transparent text-center w-14" min="-1" step="1"${add_attribute("value", params.num_ctx, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("The batch size determines how many text requests are processed together at once. A higher batch size can increase the performance and speed of the model, but it also requires more memory.  (Default: 512)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Batch Size (num_batch)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.num_batch ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.num_batch ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="256" max="8192" step="256" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.num_batch, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="256" step="256"${add_attribute("value", params.num_batch, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("This option controls how many tokens are preserved when refreshing the context. For example, if set to 2, the last 2 tokens of the conversation context will be retained. Preserving context can help maintain the continuity of a conversation, but it may reduce the ability to respond to new topics. (Default: 24)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Tokens To Keep On Context Refresh (num_keep)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.num_keep ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.num_keep ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-1" max="10240000" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.num_keep, 0)}></div> <div class=""><input type="number" class="bg-transparent text-center w-14" min="-1" step="1"${add_attribute("value", params.num_keep, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("This option sets the maximum number of tokens the model can generate in its response. Increasing this limit allows the model to provide longer answers, but it may also increase the likelihood of unhelpful or irrelevant content being generated.  (Default: 128)"),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("Max Tokens (num_predict)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.max_tokens ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.max_tokens ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="-2" max="131072" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.max_tokens, 0)}></div> <div><input type="number" class="bg-transparent text-center w-14" min="-2" step="1"${add_attribute("value", params.max_tokens, 0)}></div></div>` : ``}</div> ${admin ? `<div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Enable Memory Mapping (mmap) to load model data. This option allows the system to use disk storage as an extension of RAM by treating disk files as if they were in RAM. This can improve model performance by allowing for faster data access. However, it may not work correctly with all systems and can consume a significant amount of disk space."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("use_mmap (Ollama)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.use_mmap ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.use_mmap ?? null) !== null ? `<div class="flex justify-between items-center mt-1"><div class="text-xs text-gray-500">${escape(params.use_mmap ? "Enabled" : "Disabled")}</div> <div class="pr-2">${validate_component(Switch_1, "Switch").$$render(
      $$result,
      { state: params.use_mmap },
      {
        state: ($$value) => {
          params.use_mmap = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Enable Memory Locking (mlock) to prevent model data from being swapped out of RAM. This option locks the model's working set of pages into RAM, ensuring that they will not be swapped out to disk. This can help maintain performance by avoiding page faults and ensuring fast data access."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("use_mlock (Ollama)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.use_mlock ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.use_mlock ?? null) !== null ? `<div class="flex justify-between items-center mt-1"><div class="text-xs text-gray-500">${escape(params.use_mlock ? "Enabled" : "Disabled")}</div> <div class="pr-2">${validate_component(Switch_1, "Switch").$$render(
      $$result,
      { state: params.use_mlock },
      {
        state: ($$value) => {
          params.use_mlock = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Set the number of worker threads used for computation. This option controls how many threads are used to process incoming requests concurrently. Increasing this value can improve performance under high concurrency workloads but may also consume more CPU resources."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("num_thread (Ollama)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.num_thread ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.num_thread ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="1" max="256" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.num_thread, 0)}></div> <div class=""><input type="number" class="bg-transparent text-center w-14" min="1" max="256" step="1"${add_attribute("value", params.num_thread, 0)}></div></div>` : ``}</div> <div class="py-0.5 w-full justify-between">${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: $i18n.t("Set the number of layers, which will be off-loaded to GPU. Increasing this value can significantly improve performance for models that are optimized for GPU acceleration but may also consume more power and GPU resources."),
        placement: "top-start",
        className: "inline-tooltip"
      },
      {},
      {
        default: () => {
          return `<div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape($i18n.t("num_gpu (Ollama)"))}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition shrink-0 outline-hidden" type="button">${(params?.num_gpu ?? null) === null ? `<span class="ml-2 self-center">${escape($i18n.t("Default"))}</span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))}</span>`}</button></div>`;
        }
      }
    )} ${(params?.num_gpu ?? null) !== null ? `<div class="flex mt-0.5 space-x-2"><div class="flex-1"><input id="steps-range" type="range" min="0" max="256" step="1" class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", params.num_gpu, 0)}></div> <div class=""><input type="number" class="bg-transparent text-center w-14" min="0" max="256" step="1"${add_attribute("value", params.num_gpu, 0)}></div></div>` : ``}</div> ` : ``}</div>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
export {
  AdvancedParams as A
};
//# sourceMappingURL=AdvancedParams.js.map

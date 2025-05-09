import { p as WEBUI_API_BASE_URL } from "./index3.js";
import { c as create_ssr_component, l as createEventDispatcher, p as getContext, b as subscribe, e as each, g as escape, a as add_attribute, v as validate_component } from "./ssr.js";
import { S as Switch_1 } from "./Switch.js";
const getFunctions = async (token = "") => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/functions/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getFunctionById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/functions/id/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const toggleGlobalById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/functions/id/${id}/toggle/global`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getFunctionValvesById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/functions/id/${id}/valves`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getFunctionValvesSpecById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/functions/id/${id}/valves/spec`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getTools = async (token = "") => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/tools/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getToolValvesById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/tools/id/${id}/valves`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getToolValvesSpecById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/tools/id/${id}/valves/spec`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getUserValvesById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/tools/id/${id}/valves/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const getUserValvesSpecById = async (token, id) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/tools/id/${id}/valves/user/spec`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then(async (res2) => {
    if (!res2.ok) throw await res2.json();
    return res2.json();
  }).then((json) => {
    return json;
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
const Valves = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { valvesSpec = null } = $$props;
  let { valves = {} } = $$props;
  if ($$props.valvesSpec === void 0 && $$bindings.valvesSpec && valvesSpec !== void 0) $$bindings.valvesSpec(valvesSpec);
  if ($$props.valves === void 0 && $$bindings.valves && valves !== void 0) $$bindings.valves(valves);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${valvesSpec && Object.keys(valvesSpec?.properties ?? {}).length ? `${each(Object.keys(valvesSpec.properties), (property, idx) => {
      return `<div class="py-0.5 w-full justify-between"><div class="flex w-full justify-between"><div class="self-center text-xs font-medium">${escape(valvesSpec.properties[property].title)} ${(valvesSpec?.required ?? []).includes(property) ? `<span class="text-gray-500" data-svelte-h="svelte-1pjo6rv">*required</span>` : ``}</div> <button class="p-1 px-3 text-xs flex rounded-sm transition" type="button">${(valves[property] ?? null) === null ? `<span class="ml-2 self-center">${(valvesSpec?.required ?? []).includes(property) ? `${escape($i18n.t("None"))}` : `${escape($i18n.t("Default"))}`} </span>` : `<span class="ml-2 self-center">${escape($i18n.t("Custom"))} </span>`} </button></div> ${(valves[property] ?? null) !== null ? ` <div class="flex mt-0.5 mb-1.5 space-x-2"><div class="flex-1">${valvesSpec.properties[property]?.enum ?? null ? `<select class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-hidden border border-gray-100 dark:border-gray-850">${each(valvesSpec.properties[property].enum, (option) => {
        return `<option${add_attribute("value", option, 0)} ${option === valves[property] ? "selected" : ""}>${escape(option)} </option>`;
      })}</select>` : `${(valvesSpec.properties[property]?.type ?? null) === "boolean" ? `<div class="flex justify-between items-center"><div class="text-xs text-gray-500">${escape(valves[property] ? "Enabled" : "Disabled")}</div> <div class="pr-2">${validate_component(Switch_1, "Switch").$$render(
        $$result,
        { state: valves[property] },
        {
          state: ($$value) => {
            valves[property] = $$value;
            $$settled = false;
          }
        },
        {}
      )}</div> </div>` : `<input class="w-full rounded-lg py-2 px-4 text-sm dark:text-gray-300 dark:bg-gray-850 outline-hidden border border-gray-100 dark:border-gray-850" type="text"${add_attribute("placeholder", valvesSpec.properties[property].title, 0)} autocomplete="off" required${add_attribute("value", valves[property], 0)}>`}`}</div> </div>` : ``} ${(valvesSpec.properties[property]?.description ?? null) !== null ? `<div class="text-xs text-gray-500">${escape(valvesSpec.properties[property].description)} </div>` : ``} </div>`;
    })}` : `<div class="text-xs" data-svelte-h="svelte-71tph4">No valves</div>`}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path></svg>`;
});
export {
  Heart as H,
  Valves as V,
  getToolValvesSpecById as a,
  getFunctionValvesById as b,
  getFunctionValvesSpecById as c,
  getFunctionById as d,
  getFunctions as e,
  getUserValvesById as f,
  getToolValvesById as g,
  getUserValvesSpecById as h,
  getTools as i,
  toggleGlobalById as t
};
//# sourceMappingURL=Heart.js.map

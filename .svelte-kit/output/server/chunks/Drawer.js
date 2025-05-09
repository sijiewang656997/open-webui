import { x as identity, c as create_ssr_component, a as add_attribute, b as subscribe, p as getContext, l as createEventDispatcher, v as validate_component, f as escape, o as onDestroy, r as get_store_value, s as setContext, t as hasContext, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object } from "./ssr.js";
import "dequal";
import "./create.js";
import { b as Menu, c as Menu_trigger, M as Menu_content } from "./menu-trigger.js";
import "./client.js";
import { o as mobile, C as activeUserIds, U as USAGE_POOL, j as showSidebar, e as isApp } from "./index3.js";
import { T as Tooltip } from "./Tooltip.js";
import { nanoid } from "nanoid/non-secure";
import { w as writable, d as derived } from "./index2.js";
import { A as AddFilesPlaceholder } from "./Drawer.svelte_svelte_type_style_lang.js";
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
const ArchiveBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-3.5" } = $$props;
  let { strokeWidth = "2.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"></path></svg>`;
});
const UserMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_mobile;
  let $i18n, $$unsubscribe_i18n;
  let $activeUserIds, $$unsubscribe_activeUserIds;
  let $USAGE_POOL, $$unsubscribe_USAGE_POOL;
  $$unsubscribe_mobile = subscribe(mobile, (value) => value);
  $$unsubscribe_activeUserIds = subscribe(activeUserIds, (value) => $activeUserIds = value);
  $$unsubscribe_USAGE_POOL = subscribe(USAGE_POOL, (value) => $USAGE_POOL = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let { show = false } = $$props;
  let { role = "" } = $$props;
  let { className = "max-w-[240px]" } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Menu, "DropdownMenu.Root").$$render(
      $$result,
      {
        onOpenChange: (state) => {
          dispatch("change", state);
        },
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
              class: "w-full " + className + " text-sm rounded-xl px-1 py-1.5 z-50 bg-white dark:bg-gray-850 dark:text-white shadow-lg font-primary",
              sideOffset: 8,
              side: "bottom",
              align: "start",
              transition: (e) => fade(e, { duration: 100 })
            },
            {},
            {
              default: () => {
                return `<button class="flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"><div class="self-center mr-3" data-svelte-h="svelte-1ew1v3e"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div> <div class="self-center truncate">${escape($i18n.t("Settings"))}</div></button> <button class="flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"><div class="self-center mr-3">${validate_component(ArchiveBox, "ArchiveBox").$$render($$result, { className: "size-5", strokeWidth: "1.5" }, {}, {})}</div> <div class="self-center truncate">${escape($i18n.t("Archived Chats"))}</div></button> ${role === "admin" ? ` <a class="flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition" href="/admin"><div class="self-center mr-3" data-svelte-h="svelte-1vodyax"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div> <div class="self-center truncate">${escape($i18n.t("Admin Panel"))}</div></a>` : ``} <hr class="border-gray-100 dark:border-gray-850 my-1 p-0"> <button class="flex rounded-md py-2 px-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"><div class="self-center mr-3" data-svelte-h="svelte-1svlfdm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clip-rule="evenodd"></path></svg></div> <div class="self-center truncate">${escape($i18n.t("Sign Out"))}</div></button> ${$activeUserIds?.length > 0 ? `<hr class="border-gray-100 dark:border-gray-850 my-1 p-0"> ${validate_component(Tooltip, "Tooltip").$$render(
                  $$result,
                  {
                    content: $USAGE_POOL && $USAGE_POOL.length > 0 ? `${$i18n.t("Running")}: ${$USAGE_POOL.join(", ")} ✨` : ""
                  },
                  {},
                  {
                    default: () => {
                      return `<div class="flex rounded-md py-1.5 px-3 text-xs gap-2.5 items-center"><div class="flex items-center" data-svelte-h="svelte-dl2p8d"><span class="relative flex size-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span> <span class="relative inline-flex rounded-full size-2 bg-green-500"></span></span></div> <div class=""><span class="">${escape($i18n.t("Active Users"))}:</span> <span class="font-semibold">${escape($activeUserIds?.length)}</span></div></div>`;
                    }
                  }
                )}` : ``} `;
              }
            }
          )} `}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_mobile();
  $$unsubscribe_i18n();
  $$unsubscribe_activeUserIds();
  $$unsubscribe_USAGE_POOL();
  return $$rendered;
});
function safeOnDestroy(fn) {
  try {
    onDestroy(fn);
  } catch {
    return fn();
  }
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  safeOnDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function clientEffect(stores, fn) {
  if (!isBrowser)
    return () => {
    };
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
let currentState = null;
let element = null;
function getCursorStyle(state) {
  switch (state) {
    case "horizontal":
      return "ew-resize";
    case "horizontal-max":
      return "w-resize";
    case "horizontal-min":
      return "e-resize";
    case "vertical":
      return "ns-resize";
    case "vertical-max":
      return "n-resize";
    case "vertical-min":
      return "s-resize";
  }
}
function resetGlobalCursorStyle() {
  if (element === null)
    return;
  document.head.removeChild(element);
  currentState = null;
  element = null;
}
function setGlobalCursorStyle(state) {
  if (currentState === state)
    return;
  currentState = state;
  const style = getCursorStyle(state);
  if (element === null) {
    element = document.createElement("style");
    document.head.appendChild(element);
  }
  element.innerHTML = `*{cursor: ${style}!important;}`;
}
function computePaneFlexBoxStyle({ defaultSize, dragState, layout, paneData, paneIndex, precision = 3 }) {
  const size = layout[paneIndex];
  let flexGrow;
  if (size == null) {
    flexGrow = defaultSize ?? "1";
  } else if (paneData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size.toPrecision(precision);
  }
  return styleToString({
    "flex-basis": 0,
    "flex-grow": flexGrow,
    "flex-shrink": 1,
    // Without this, pane sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a pane during resize
    // This avoid edge cases like nested iframes
    "pointer-events": dragState !== null ? "none" : void 0
  });
}
function calculateAriaValues({ layout, panesArray, pivotIndices }) {
  let currentMinSize = 0;
  let currentMaxSize = 100;
  let totalMinSize = 0;
  let totalMaxSize = 0;
  const firstIndex = pivotIndices[0];
  for (let i = 0; i < panesArray.length; i++) {
    const { constraints } = panesArray[i];
    const { maxSize = 100, minSize = 0 } = constraints;
    if (i === firstIndex) {
      currentMinSize = minSize;
      currentMaxSize = maxSize;
    } else {
      totalMinSize += minSize;
      totalMaxSize += maxSize;
    }
  }
  const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
  const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);
  const valueNow = layout[firstIndex];
  return {
    valueMax,
    valueMin,
    valueNow
  };
}
function generateId(idFromProps = null) {
  if (idFromProps == null)
    return nanoid(10);
  return idFromProps;
}
const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const PRECISION = 10;
function initializeStorage(storageObject) {
  try {
    if (typeof localStorage === "undefined") {
      throw new Error("localStorage is not supported in this environment");
    }
    storageObject.getItem = (name) => localStorage.getItem(name);
    storageObject.setItem = (name, value) => localStorage.setItem(name, value);
  } catch (err) {
    console.error(err);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {
    };
  }
}
function getPaneGroupKey(autoSaveId) {
  return `paneforge:${autoSaveId}`;
}
function getPaneKey(panes) {
  const sortedPaneIds = panes.map((pane) => {
    const { constraints, id, idIsFromProps, order } = pane;
    return idIsFromProps ? id : order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
  }).sort().join(",");
  return sortedPaneIds;
}
function loadSerializedPaneGroupState(autoSaveId, storage) {
  try {
    const paneGroupKey = getPaneGroupKey(autoSaveId);
    const serialized = storage.getItem(paneGroupKey);
    const parsed = JSON.parse(serialized || "");
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
  } catch {
  }
  return null;
}
function loadPaneGroupState(autoSaveId, panes, storage) {
  const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
  const paneKey = getPaneKey(panes);
  return state[paneKey] || null;
}
function savePaneGroupState(autoSaveId, panes, paneSizesBeforeCollapse, sizes, storage) {
  const paneGroupKey = getPaneGroupKey(autoSaveId);
  const paneKey = getPaneKey(panes);
  const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
  state[paneKey] = {
    expandToSizes: Object.fromEntries(paneSizesBeforeCollapse.entries()),
    layout: sizes
  };
  try {
    storage.setItem(paneGroupKey, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}
const debounceMap = {};
function debounce(callback, durationMs = 10) {
  let timeoutId = null;
  const callable = (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, durationMs);
  };
  return callable;
}
function updateStorageValues({ autoSaveId, layout, storage, paneDataArrayStore, paneSizeBeforeCollapseStore }) {
  const $paneDataArray = get_store_value(paneDataArrayStore);
  if (layout.length === 0 || layout.length !== $paneDataArray.length)
    return;
  let debouncedSave = debounceMap[autoSaveId];
  if (debouncedSave == null) {
    debouncedSave = debounce(savePaneGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
    debounceMap[autoSaveId] = debouncedSave;
  }
  const clonedPaneDataArray = [...$paneDataArray];
  const $paneSizeBeforeCollapse = get_store_value(paneSizeBeforeCollapseStore);
  const clonedPaneSizesBeforeCollapse = new Map($paneSizeBeforeCollapse);
  debouncedSave(autoSaveId, clonedPaneDataArray, clonedPaneSizesBeforeCollapse, layout, storage);
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function areNumbersAlmostEqual(actual, expected, fractionDigits = PRECISION) {
  return compareNumbersWithTolerance(actual, expected, fractionDigits) === 0;
}
function compareNumbersWithTolerance(actual, expected, fractionDigits = PRECISION) {
  const roundedActual = roundTo(actual, fractionDigits);
  const roundedExpected = roundTo(expected, fractionDigits);
  return Math.sign(roundedActual - roundedExpected);
}
function areArraysEqual(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return false;
  for (let index = 0; index < arrA.length; index++) {
    if (arrA[index] !== arrB[index])
      return false;
  }
  return true;
}
function roundTo(value, decimals) {
  return parseFloat(value.toFixed(decimals));
}
function assert(expectedCondition, message = "Assertion failed!") {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}
function resizePane({ paneConstraints: paneConstraintsArray, paneIndex, initialSize }) {
  const paneConstraints = paneConstraintsArray[paneIndex];
  assert(paneConstraints != null, "Pane constraints should not be null.");
  const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = paneConstraints;
  let newSize = initialSize;
  if (compareNumbersWithTolerance(newSize, minSize) < 0) {
    newSize = getAdjustedSizeForCollapsible(newSize, collapsible, collapsedSize, minSize);
  }
  newSize = Math.min(maxSize, newSize);
  return parseFloat(newSize.toFixed(PRECISION));
}
function getAdjustedSizeForCollapsible(size, collapsible, collapsedSize, minSize) {
  if (!collapsible)
    return minSize;
  const halfwayPoint = (collapsedSize + minSize) / 2;
  return compareNumbersWithTolerance(size, halfwayPoint) < 0 ? collapsedSize : minSize;
}
function adjustLayoutByDelta({ delta, layout: prevLayout, paneConstraints: paneConstraintsArray, pivotIndices, trigger }) {
  if (areNumbersAlmostEqual(delta, 0))
    return prevLayout;
  const nextLayout = [...prevLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        if (paneConstraints.collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        const { collapsible } = paneConstraints;
        if (collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const maxSafeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= paneConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < paneConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: unsafeSize
      });
      if (!areNumbersAlmostEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index--;
      } else {
        index++;
      }
    }
  }
  if (areNumbersAlmostEqual(deltaApplied, 0)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = prevLayout[pivotIndex];
    assert(prevSize != null);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePane({
      paneConstraints: paneConstraintsArray,
      paneIndex: pivotIndex,
      initialSize: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!areNumbersAlmostEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < paneConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        assert(prevSize2 != null);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePane({
          paneConstraints: paneConstraintsArray,
          paneIndex: index,
          initialSize: unsafeSize2
        });
        if (!areNumbersAlmostEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (areNumbersAlmostEqual(deltaRemaining, 0))
          break;
        delta > 0 ? index-- : index++;
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!areNumbersAlmostEqual(totalSize, 100))
    return prevLayout;
  return nextLayout;
}
const isBrowser = typeof document !== "undefined";
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isKeyDown(event) {
  return event.type === "keydown";
}
function isMouseEvent(event) {
  return event.type.startsWith("mouse");
}
function isTouchEvent(event) {
  return event.type.startsWith("touch");
}
const defaultStorage = {
  getItem: (name) => {
    initializeStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
const defaultProps = {
  id: null,
  onLayout: null,
  keyboardResizeBy: null,
  autoSaveId: null,
  direction: "horizontal",
  storage: defaultStorage
};
function createPaneForge(props) {
  const withDefaults = {
    ...defaultProps,
    ...removeUndefined(props)
  };
  const options = toWritableStores(withDefaults);
  const { autoSaveId, direction, keyboardResizeBy, storage, onLayout } = options;
  const groupId = writable(generateId());
  const dragState = writable(null);
  const layout = writable([]);
  const paneDataArray = writable([]);
  const paneDataArrayChanged = writable(false);
  const paneIdToLastNotifiedSizeMap = writable({});
  const paneSizeBeforeCollapseMap = writable(/* @__PURE__ */ new Map());
  const prevDelta = writable(0);
  clientEffect([groupId, layout, paneDataArray], ([$groupId, $layout, $paneDataArray]) => {
    const unsub = updateResizeHandleAriaValues({
      groupId: $groupId,
      layout: $layout,
      paneDataArray: $paneDataArray
    });
    return unsub;
  });
  clientEffect([autoSaveId, layout, storage], ([$autoSaveId, $layout, $storage]) => {
    if (!$autoSaveId)
      return;
    updateStorageValues({
      autoSaveId: $autoSaveId,
      layout: $layout,
      storage: $storage,
      paneDataArrayStore: paneDataArray,
      paneSizeBeforeCollapseStore: paneSizeBeforeCollapseMap
    });
  });
  function collapsePane(paneData) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    if (!paneData.constraints.collapsible)
      return;
    const paneConstraintsArray = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { collapsedSize = 0, paneSize, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    assert(paneSize != null);
    if (paneSize === collapsedSize)
      return;
    paneSizeBeforeCollapseMap.update((curr) => {
      curr.set(paneData.id, paneSize);
      return curr;
    });
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - collapsedSize : collapsedSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    if ($onLayout) {
      $onLayout(nextLayout);
    }
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  function getPaneSize(paneData) {
    const $layout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    const { paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return paneSize;
  }
  const getPaneStyle = derived([paneDataArray, layout, dragState], ([$paneDataArray, $layout, $dragState]) => {
    return (paneData, defaultSize) => {
      const paneIndex = findPaneDataIndex($paneDataArray, paneData);
      return computePaneFlexBoxStyle({
        defaultSize,
        dragState: $dragState,
        layout: $layout,
        paneData: $paneDataArray,
        paneIndex
      });
    };
  });
  function isPaneExpanded(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const $layout = get_store_value(layout);
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return !collapsible || paneSize > collapsedSize;
  }
  function registerPane(paneData) {
    paneDataArray.update((curr) => {
      const newArr = [...curr, paneData];
      newArr.sort((paneA, paneB) => {
        const orderA = paneA.order;
        const orderB = paneB.order;
        if (orderA == null && orderB == null) {
          return 0;
        } else if (orderA == null) {
          return -1;
        } else if (orderB == null) {
          return 1;
        } else {
          return orderA - orderB;
        }
      });
      return newArr;
    });
    paneDataArrayChanged.set(true);
  }
  clientEffect([paneDataArrayChanged], ([$paneDataArrayChanged]) => {
    if (!$paneDataArrayChanged)
      return;
    paneDataArrayChanged.set(false);
    const $autoSaveId = get_store_value(autoSaveId);
    const $storage = get_store_value(storage);
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    let unsafeLayout = null;
    if ($autoSaveId) {
      const state = loadPaneGroupState($autoSaveId, $paneDataArray, $storage);
      if (state) {
        paneSizeBeforeCollapseMap.set(new Map(Object.entries(state.expandToSizes)));
        unsafeLayout = state.layout;
      }
    }
    if (unsafeLayout == null) {
      unsafeLayout = getUnsafeDefaultLayout({
        paneDataArray: $paneDataArray
      });
    }
    const nextLayout = validatePaneGroupLayout({
      layout: unsafeLayout,
      paneConstraints: $paneDataArray.map((paneData) => paneData.constraints)
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    if ($onLayout) {
      $onLayout(nextLayout);
    }
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  });
  function registerResizeHandle(dragHandleId) {
    return function resizeHandler(event) {
      event.preventDefault();
      const $direction = get_store_value(direction);
      const $dragState = get_store_value(dragState);
      const $groupId = get_store_value(groupId);
      const $keyboardResizeBy = get_store_value(keyboardResizeBy);
      const $prevLayout = get_store_value(layout);
      const $paneDataArray = get_store_value(paneDataArray);
      const { initialLayout } = $dragState ?? {};
      const pivotIndices = getPivotIndices($groupId, dragHandleId);
      let delta = getDeltaPercentage(event, dragHandleId, $direction, $dragState, $keyboardResizeBy);
      if (delta === 0)
        return;
      const isHorizontal = $direction === "horizontal";
      if (document.dir === "rtl" && isHorizontal) {
        delta = -delta;
      }
      const paneConstraints = $paneDataArray.map((paneData) => paneData.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta,
        layout: initialLayout ?? $prevLayout,
        paneConstraints,
        pivotIndices,
        trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
      });
      const layoutChanged = !areArraysEqual($prevLayout, nextLayout);
      if (isMouseEvent(event) || isTouchEvent(event)) {
        const $prevDelta = get_store_value(prevDelta);
        if ($prevDelta != delta) {
          prevDelta.set(delta);
          if (!layoutChanged) {
            if (isHorizontal) {
              setGlobalCursorStyle(delta < 0 ? "horizontal-min" : "horizontal-max");
            } else {
              setGlobalCursorStyle(delta < 0 ? "vertical-min" : "vertical-max");
            }
          } else {
            setGlobalCursorStyle(isHorizontal ? "horizontal" : "vertical");
          }
        }
      }
      if (layoutChanged) {
        layout.set(nextLayout);
        const $onLayout = get_store_value(onLayout);
        if ($onLayout) {
          $onLayout(nextLayout);
        }
        callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
      }
    };
  }
  function resizePane2(paneData, unsafePaneSize) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    const paneConstraintsArr = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { paneSize, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    assert(paneSize != null);
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - unsafePaneSize : unsafePaneSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArr,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    $onLayout?.(nextLayout);
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  function startDragging(dragHandleId, event) {
    const $direction = get_store_value(direction);
    const $layout = get_store_value(layout);
    const handleElement = getResizeHandleElement(dragHandleId);
    assert(handleElement);
    const initialCursorPosition = getResizeEventCursorPosition($direction, event);
    dragState.set({
      dragHandleId,
      dragHandleRect: handleElement.getBoundingClientRect(),
      initialCursorPosition,
      initialLayout: $layout
    });
  }
  function stopDragging() {
    resetGlobalCursorStyle();
    dragState.set(null);
  }
  function unregisterPane(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const index = findPaneDataIndex($paneDataArray, paneData);
    if (index < 0)
      return;
    paneDataArray.update((curr) => {
      curr.splice(index, 1);
      paneIdToLastNotifiedSizeMap.update((curr2) => {
        delete curr2[paneData.id];
        return curr2;
      });
      paneDataArrayChanged.set(true);
      return curr;
    });
  }
  function isPaneCollapsed(paneData) {
    const $paneDataArray = get_store_value(paneDataArray);
    const $layout = get_store_value(layout);
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper($paneDataArray, paneData, $layout);
    return collapsible === true && paneSize === collapsedSize;
  }
  function expandPane(paneData) {
    const $prevLayout = get_store_value(layout);
    const $paneDataArray = get_store_value(paneDataArray);
    if (!paneData.constraints.collapsible)
      return;
    const paneConstraintsArray = $paneDataArray.map((paneData2) => paneData2.constraints);
    const { collapsedSize = 0, paneSize, minSize = 0, pivotIndices } = paneDataHelper($paneDataArray, paneData, $prevLayout);
    if (paneSize !== collapsedSize)
      return;
    const prevPaneSize = get_store_value(paneSizeBeforeCollapseMap).get(paneData.id);
    const baseSize = prevPaneSize != null && prevPaneSize >= minSize ? prevPaneSize : minSize;
    const isLastPane = findPaneDataIndex($paneDataArray, paneData) === $paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - baseSize : baseSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: $prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual($prevLayout, nextLayout))
      return;
    layout.set(nextLayout);
    const $onLayout = get_store_value(onLayout);
    $onLayout?.(nextLayout);
    callPaneCallbacks($paneDataArray, nextLayout, get_store_value(paneIdToLastNotifiedSizeMap));
  }
  const paneGroupStyle = derived([direction], ([$direction]) => {
    return styleToString({
      display: "flex",
      "flex-direction": $direction === "horizontal" ? "row" : "column",
      height: "100%",
      overflow: "hidden",
      width: "100%"
    });
  });
  const paneGroupSelectors = derived([direction, groupId], ([$direction, $groupId]) => {
    return {
      "data-pane-group": "",
      "data-direction": $direction,
      "data-pane-group-id": $groupId
    };
  });
  const paneGroupAttrs = derived([paneGroupStyle, paneGroupSelectors], ([$style, $selectors]) => {
    return {
      style: $style,
      ...$selectors
    };
  });
  function setLayout(newLayout) {
    layout.set(newLayout);
  }
  function getLayout() {
    return get_store_value(layout);
  }
  return {
    methods: {
      collapsePane,
      expandPane,
      getSize: getPaneSize,
      getPaneStyle,
      isCollapsed: isPaneCollapsed,
      isExpanded: isPaneExpanded,
      registerPane,
      registerResizeHandle,
      resizePane: resizePane2,
      startDragging,
      stopDragging,
      unregisterPane,
      setLayout,
      getLayout
    },
    states: {
      direction,
      dragState,
      groupId,
      paneGroupAttrs,
      paneGroupSelectors,
      paneGroupStyle,
      layout
    },
    options
  };
}
function updateResizeHandleAriaValues({ groupId, layout, paneDataArray }) {
  const resizeHandleElements = getResizeHandleElementsForGroup(groupId);
  for (let index = 0; index < paneDataArray.length - 1; index++) {
    const { valueMax, valueMin, valueNow } = calculateAriaValues({
      layout,
      panesArray: paneDataArray,
      pivotIndices: [index, index + 1]
    });
    const resizeHandleEl = resizeHandleElements[index];
    if (isHTMLElement(resizeHandleEl)) {
      const paneData = paneDataArray[index];
      resizeHandleEl.setAttribute("aria-controls", paneData.id);
      resizeHandleEl.setAttribute("aria-valuemax", "" + Math.round(valueMax));
      resizeHandleEl.setAttribute("aria-valuemin", "" + Math.round(valueMin));
      resizeHandleEl.setAttribute("aria-valuenow", valueNow != null ? "" + Math.round(valueNow) : "");
    }
  }
  return () => {
    resizeHandleElements.forEach((resizeHandleElement) => {
      resizeHandleElement.removeAttribute("aria-controls");
      resizeHandleElement.removeAttribute("aria-valuemax");
      resizeHandleElement.removeAttribute("aria-valuemin");
      resizeHandleElement.removeAttribute("aria-valuenow");
    });
  };
}
function getResizeHandleElementsForGroup(groupId) {
  if (!isBrowser)
    return [];
  return Array.from(document.querySelectorAll(`[data-pane-resizer-id][data-pane-group-id="${groupId}"]`));
}
function getPaneGroupElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-group][data-pane-group-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getResizeHandleElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-resizer-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getResizeHandleElementIndex(groupId, id) {
  if (!isBrowser)
    return null;
  const handles = getResizeHandleElementsForGroup(groupId);
  const index = handles.findIndex((handle) => handle.getAttribute("data-pane-resizer-id") === id);
  return index ?? null;
}
function getPivotIndices(groupId, dragHandleId) {
  const index = getResizeHandleElementIndex(groupId, dragHandleId);
  return index != null ? [index, index + 1] : [-1, -1];
}
function paneDataHelper(paneDataArray, paneData, layout) {
  const paneConstraintsArray = paneDataArray.map((paneData2) => paneData2.constraints);
  const paneIndex = findPaneDataIndex(paneDataArray, paneData);
  const paneConstraints = paneConstraintsArray[paneIndex];
  const isLastPane = paneIndex === paneDataArray.length - 1;
  const pivotIndices = isLastPane ? [paneIndex - 1, paneIndex] : [paneIndex, paneIndex + 1];
  const paneSize = layout[paneIndex];
  return {
    ...paneConstraints,
    paneSize,
    pivotIndices
  };
}
function findPaneDataIndex(paneDataArray, paneData) {
  return paneDataArray.findIndex((prevPaneData) => prevPaneData.id === paneData.id);
}
function callPaneCallbacks(paneArray, layout, paneIdToLastNotifiedSizeMap) {
  layout.forEach((size, index) => {
    const paneData = paneArray[index];
    assert(paneData);
    const { callbacks, constraints, id: paneId } = paneData;
    const { collapsedSize = 0, collapsible } = constraints;
    const lastNotifiedSize = paneIdToLastNotifiedSizeMap[paneId];
    if (!(lastNotifiedSize == null || size !== lastNotifiedSize))
      return;
    paneIdToLastNotifiedSizeMap[paneId] = size;
    const { onCollapse, onExpand, onResize } = callbacks;
    onResize?.(size, lastNotifiedSize);
    if (collapsible && (onCollapse || onExpand)) {
      if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) {
        onExpand();
      }
      if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) {
        onCollapse();
      }
    }
  });
}
function getUnsafeDefaultLayout({ paneDataArray }) {
  const layout = Array(paneDataArray.length);
  const paneConstraintsArray = paneDataArray.map((paneData) => paneData.constraints);
  let numPanesWithSizes = 0;
  let remainingSize = 100;
  for (let index = 0; index < paneDataArray.length; index++) {
    const paneConstraints = paneConstraintsArray[index];
    assert(paneConstraints);
    const { defaultSize } = paneConstraints;
    if (defaultSize != null) {
      numPanesWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }
  for (let index = 0; index < paneDataArray.length; index++) {
    const paneConstraints = paneConstraintsArray[index];
    assert(paneConstraints);
    const { defaultSize } = paneConstraints;
    if (defaultSize != null) {
      continue;
    }
    const numRemainingPanes = paneDataArray.length - numPanesWithSizes;
    const size = remainingSize / numRemainingPanes;
    numPanesWithSizes++;
    layout[index] = size;
    remainingSize -= size;
  }
  return layout;
}
function validatePaneGroupLayout({ layout: prevLayout, paneConstraints }) {
  const nextLayout = [...prevLayout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (nextLayout.length !== paneConstraints.length) {
    throw Error(`Invalid ${paneConstraints.length} pane layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
  } else if (!areNumbersAlmostEqual(nextLayoutTotalSize, 100)) {
    for (let index = 0; index < paneConstraints.length; index++) {
      const unsafeSize = nextLayout[index];
      assert(unsafeSize != null);
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  let remainingSize = 0;
  for (let index = 0; index < paneConstraints.length; index++) {
    const unsafeSize = nextLayout[index];
    assert(unsafeSize != null);
    const safeSize = resizePane({
      paneConstraints,
      paneIndex: index,
      initialSize: unsafeSize
    });
    if (unsafeSize != safeSize) {
      remainingSize += unsafeSize - safeSize;
      nextLayout[index] = safeSize;
    }
  }
  if (!areNumbersAlmostEqual(remainingSize, 0)) {
    for (let index = 0; index < paneConstraints.length; index++) {
      const prevSize = nextLayout[index];
      assert(prevSize != null);
      const unsafeSize = prevSize + remainingSize;
      const safeSize = resizePane({
        paneConstraints,
        paneIndex: index,
        initialSize: unsafeSize
      });
      if (prevSize !== safeSize) {
        remainingSize -= safeSize - prevSize;
        nextLayout[index] = safeSize;
        if (areNumbersAlmostEqual(remainingSize, 0)) {
          break;
        }
      }
    }
  }
  return nextLayout;
}
function getDeltaPercentage(e, dragHandleId, dir, initialDragState, keyboardResizeBy) {
  if (isKeyDown(e)) {
    const isHorizontal = dir === "horizontal";
    let delta = 0;
    if (e.shiftKey) {
      delta = 100;
    } else if (keyboardResizeBy != null) {
      delta = keyboardResizeBy;
    } else {
      delta = 10;
    }
    let movement = 0;
    switch (e.key) {
      case "ArrowDown":
        movement = isHorizontal ? 0 : delta;
        break;
      case "ArrowLeft":
        movement = isHorizontal ? -delta : 0;
        break;
      case "ArrowRight":
        movement = isHorizontal ? delta : 0;
        break;
      case "ArrowUp":
        movement = isHorizontal ? 0 : -delta;
        break;
      case "End":
        movement = 100;
        break;
      case "Home":
        movement = -100;
        break;
    }
    return movement;
  } else {
    if (initialDragState == null)
      return 0;
    return getDragOffsetPercentage(e, dragHandleId, dir, initialDragState);
  }
}
function getDragOffsetPercentage(e, dragHandleId, dir, initialDragState) {
  const isHorizontal = dir === "horizontal";
  const handleElement = getResizeHandleElement(dragHandleId);
  assert(handleElement);
  const groupId = handleElement.getAttribute("data-pane-group-id");
  assert(groupId);
  const { initialCursorPosition } = initialDragState;
  const cursorPosition = getResizeEventCursorPosition(dir, e);
  const groupElement = getPaneGroupElement(groupId);
  assert(groupElement);
  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
  return offsetPercentage;
}
function getResizeEventCursorPosition(dir, e) {
  const isHorizontal = dir === "horizontal";
  if (isMouseEvent(e)) {
    return isHorizontal ? e.clientX : e.clientY;
  } else if (isTouchEvent(e)) {
    const firstTouch = e.touches[0];
    assert(firstTouch);
    return isHorizontal ? firstTouch.screenX : firstTouch.screenY;
  } else {
    throw Error(`Unsupported event type "${e.type}"`);
  }
}
const PF_GROUP_CTX = Symbol("PF_GROUP_CTX");
function setCtx(props) {
  const paneForge = createPaneForge(removeUndefined(props));
  const updateOption = getOptionUpdater(paneForge.options);
  const ctxValue = { ...paneForge, updateOption };
  setContext(PF_GROUP_CTX, ctxValue);
  return ctxValue;
}
function getCtx(componentName) {
  if (!hasContext(PF_GROUP_CTX)) {
    throw new Error(`${componentName} components must be rendered with a <PaneGroup> container`);
  }
  return getContext(PF_GROUP_CTX);
}
const Pane_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let $$restProps = compute_rest_props($$props, [
    "autoSaveId",
    "direction",
    "id",
    "keyboardResizeBy",
    "onLayoutChange",
    "storage",
    "el",
    "paneGroup",
    "style"
  ]);
  let $paneGroupStyle, $$unsubscribe_paneGroupStyle;
  let $groupId, $$unsubscribe_groupId;
  let $paneGroupSelectors, $$unsubscribe_paneGroupSelectors;
  let { autoSaveId = null } = $$props;
  let { direction } = $$props;
  let { id = null } = $$props;
  let { keyboardResizeBy = null } = $$props;
  let { onLayoutChange = null } = $$props;
  let { storage = defaultStorage } = $$props;
  let { el = void 0 } = $$props;
  let { paneGroup = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { states: { paneGroupStyle, paneGroupSelectors, groupId }, methods: { setLayout, getLayout }, updateOption } = setCtx({
    autoSaveId,
    direction,
    id,
    keyboardResizeBy,
    onLayout: onLayoutChange,
    storage
  });
  $$unsubscribe_paneGroupStyle = subscribe(paneGroupStyle, (value) => $paneGroupStyle = value);
  $$unsubscribe_paneGroupSelectors = subscribe(paneGroupSelectors, (value) => $paneGroupSelectors = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  paneGroup = {
    getLayout,
    setLayout,
    getId: () => $groupId
  };
  if ($$props.autoSaveId === void 0 && $$bindings.autoSaveId && autoSaveId !== void 0) $$bindings.autoSaveId(autoSaveId);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.keyboardResizeBy === void 0 && $$bindings.keyboardResizeBy && keyboardResizeBy !== void 0) $$bindings.keyboardResizeBy(keyboardResizeBy);
  if ($$props.onLayoutChange === void 0 && $$bindings.onLayoutChange && onLayoutChange !== void 0) $$bindings.onLayoutChange(onLayoutChange);
  if ($$props.storage === void 0 && $$bindings.storage && storage !== void 0) $$bindings.storage(storage);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.paneGroup === void 0 && $$bindings.paneGroup && paneGroup !== void 0) $$bindings.paneGroup(paneGroup);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0) $$bindings.style(styleFromProps);
  {
    updateOption("autoSaveId", autoSaveId);
  }
  {
    updateOption("direction", direction);
  }
  {
    updateOption("id", id);
  }
  {
    updateOption("keyboardResizeBy", keyboardResizeBy);
  }
  {
    updateOption("onLayout", onLayoutChange);
  }
  {
    updateOption("storage", storage);
  }
  style = $paneGroupStyle + (styleFromProps ?? "");
  $$unsubscribe_paneGroupStyle();
  $$unsubscribe_groupId();
  $$unsubscribe_paneGroupSelectors();
  return `<div${spread(
    [
      { id: escape_attribute_value($groupId) },
      escape_object($paneGroupSelectors),
      { style: escape_attribute_value(style) },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Pane = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let attrs;
  let $$restProps = compute_rest_props($$props, [
    "collapsedSize",
    "collapsible",
    "defaultSize",
    "maxSize",
    "minSize",
    "onCollapse",
    "onExpand",
    "onResize",
    "order",
    "el",
    "pane",
    "id",
    "style"
  ]);
  let $groupId, $$unsubscribe_groupId;
  let $getPaneStyle, $$unsubscribe_getPaneStyle;
  let { collapsedSize = void 0 } = $$props;
  let { collapsible = void 0 } = $$props;
  let { defaultSize = void 0 } = $$props;
  let { maxSize = void 0 } = $$props;
  let { minSize = void 0 } = $$props;
  let { onCollapse = void 0 } = $$props;
  let { onExpand = void 0 } = $$props;
  let { onResize = void 0 } = $$props;
  let { order = void 0 } = $$props;
  let { el = void 0 } = $$props;
  let { pane = void 0 } = $$props;
  let { id: idFromProps = void 0 } = $$props;
  let { style: styleFromProps = void 0 } = $$props;
  const { methods: { getPaneStyle, registerPane, unregisterPane, collapsePane, expandPane, getSize, isCollapsed, isExpanded, resizePane: resizePane2 }, states: { groupId } } = getCtx("Pane");
  $$unsubscribe_getPaneStyle = subscribe(getPaneStyle, (value) => $getPaneStyle = value);
  $$unsubscribe_groupId = subscribe(groupId, (value) => $groupId = value);
  const paneId = generateId(idFromProps);
  let paneData;
  pane = {
    collapse: () => {
      collapsePane(paneData);
    },
    expand: () => expandPane(paneData),
    getSize: () => getSize(paneData),
    isCollapsed: () => isCollapsed(paneData),
    isExpanded: () => isExpanded(paneData),
    resize: (size) => resizePane2(paneData, size),
    getId: () => paneId
  };
  if ($$props.collapsedSize === void 0 && $$bindings.collapsedSize && collapsedSize !== void 0) $$bindings.collapsedSize(collapsedSize);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0) $$bindings.collapsible(collapsible);
  if ($$props.defaultSize === void 0 && $$bindings.defaultSize && defaultSize !== void 0) $$bindings.defaultSize(defaultSize);
  if ($$props.maxSize === void 0 && $$bindings.maxSize && maxSize !== void 0) $$bindings.maxSize(maxSize);
  if ($$props.minSize === void 0 && $$bindings.minSize && minSize !== void 0) $$bindings.minSize(minSize);
  if ($$props.onCollapse === void 0 && $$bindings.onCollapse && onCollapse !== void 0) $$bindings.onCollapse(onCollapse);
  if ($$props.onExpand === void 0 && $$bindings.onExpand && onExpand !== void 0) $$bindings.onExpand(onExpand);
  if ($$props.onResize === void 0 && $$bindings.onResize && onResize !== void 0) $$bindings.onResize(onResize);
  if ($$props.order === void 0 && $$bindings.order && order !== void 0) $$bindings.order(order);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.pane === void 0 && $$bindings.pane && pane !== void 0) $$bindings.pane(pane);
  if ($$props.id === void 0 && $$bindings.id && idFromProps !== void 0) $$bindings.id(idFromProps);
  if ($$props.style === void 0 && $$bindings.style && styleFromProps !== void 0) $$bindings.style(styleFromProps);
  paneData = {
    callbacks: { onCollapse, onExpand, onResize },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: paneId,
    idIsFromProps: idFromProps !== void 0,
    order
  };
  style = $getPaneStyle(paneData, defaultSize) + (styleFromProps ?? "");
  attrs = {
    "data-pane": "",
    "data-pane-id": paneId,
    "data-pane-group-id": $groupId
  };
  $$unsubscribe_groupId();
  $$unsubscribe_getPaneStyle();
  return `<div${spread(
    [
      { style: escape_attribute_value(style) },
      escape_object(attrs),
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const FilesOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $showSidebar, $$unsubscribe_showSidebar;
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  let { show = false } = $$props;
  let overlayElement = null;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$unsubscribe_showSidebar();
  return `${show ? `<div class="${"fixed " + escape(
    $showSidebar ? "left-0 md:left-[260px] md:w-[calc(100%-260px)]" : "left-0",
    true
  ) + " fixed top-0 right-0 bottom-0 w-full h-full flex z-9999 touch-none pointer-events-none"}" id="dropzone" role="region" aria-label="Drag and Drop Container"${add_attribute("this", overlayElement, 0)}><div class="absolute w-full h-full backdrop-blur-sm bg-gray-800/40 flex justify-center"><div class="m-auto pt-64 flex flex-col justify-center"><div class="max-w-md">${validate_component(AddFilesPlaceholder, "AddFilesPlaceholder").$$render($$result, {}, {}, {})}</div></div></div></div>` : ``}`;
});
const css = {
  code: ".modal-content.svelte-fq1rhy{animation:svelte-fq1rhy-scaleUp 0.1s ease-out forwards}@keyframes svelte-fq1rhy-scaleUp{from{transform:scale(0.985);opacity:0}to{transform:scale(1);opacity:1}}",
  map: `{"version":3,"file":"Drawer.svelte","sources":["Drawer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onDestroy, onMount, createEventDispatcher } from \\"svelte\\";\\nimport { flyAndScale } from \\"$lib/utils/transitions\\";\\nimport { fade, fly, slide } from \\"svelte/transition\\";\\nimport { isApp } from \\"$lib/stores\\";\\nconst dispatch = createEventDispatcher();\\nexport let show = false;\\nexport let className = \\"\\";\\nlet modalElement = null;\\nlet mounted = false;\\nconst handleKeyDown = (event) => {\\n  if (event.key === \\"Escape\\" && isTopModal()) {\\n    console.log(\\"Escape\\");\\n    show = false;\\n  }\\n};\\nconst isTopModal = () => {\\n  const modals = document.getElementsByClassName(\\"modal\\");\\n  return modals.length && modals[modals.length - 1] === modalElement;\\n};\\nonMount(() => {\\n  mounted = true;\\n});\\n$: if (show && modalElement) {\\n  document.body.appendChild(modalElement);\\n  window.addEventListener(\\"keydown\\", handleKeyDown);\\n  document.body.style.overflow = \\"hidden\\";\\n} else if (modalElement) {\\n  dispatch(\\"close\\");\\n  window.removeEventListener(\\"keydown\\", handleKeyDown);\\n  if (document.body.contains(modalElement)) {\\n    document.body.removeChild(modalElement);\\n    document.body.style.overflow = \\"unset\\";\\n  }\\n}\\nonDestroy(() => {\\n  show = false;\\n  if (modalElement) {\\n    if (document.body.contains(modalElement)) {\\n      document.body.removeChild(modalElement);\\n      document.body.style.overflow = \\"unset\\";\\n    }\\n  }\\n});\\n<\/script>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n\\n<div\\n\\tbind:this={modalElement}\\n\\tclass=\\"modal fixed right-0 {$isApp\\n\\t\\t? ' ml-[4.5rem] max-w-[calc(100%-4.5rem)]'\\n\\t\\t: ''} left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] flex justify-center z-999 overflow-hidden overscroll-contain\\"\\n\\tin:fly={{ y: 100, duration: 100 }}\\n\\ton:mousedown={() => {\\n\\t\\tshow = false;\\n\\t}}\\n>\\n\\t<div\\n\\t\\tclass=\\" mt-auto w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-100 {className} max-h-[100dvh] overflow-y-auto scrollbar-hidden\\"\\n\\t\\ton:mousedown={(e) => {\\n\\t\\t\\te.stopPropagation();\\n\\t\\t}}\\n\\t>\\n\\t\\t<slot />\\n\\t</div>\\n</div>\\n\\n<style>\\n\\t.modal-content {\\n\\t\\tanimation: scaleUp 0.1s ease-out forwards;\\n\\t}\\n\\n\\t@keyframes scaleUp {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: scale(0.985);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: scale(1);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAqEC,4BAAe,CACd,SAAS,CAAE,qBAAO,CAAC,IAAI,CAAC,QAAQ,CAAC,QAClC,CAEA,WAAW,qBAAQ,CAClB,IAAK,CACJ,SAAS,CAAE,MAAM,KAAK,CAAC,CACvB,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACV,CACD"}`
};
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isApp, $$unsubscribe_isApp;
  $$unsubscribe_isApp = subscribe(isApp, (value) => $isApp = value);
  createEventDispatcher();
  let { show = false } = $$props;
  let { className = "" } = $$props;
  let modalElement = null;
  onDestroy(() => {
    show = false;
  });
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  $$result.css.add(css);
  $$unsubscribe_isApp();
  return `  <div class="${"modal fixed right-0 " + escape($isApp ? " ml-[4.5rem] max-w-[calc(100%-4.5rem)]" : "", true) + " left-0 bottom-0 bg-black/60 w-full h-screen max-h-[100dvh] flex justify-center z-999 overflow-hidden overscroll-contain"}"${add_attribute("this", modalElement, 0)}><div class="${"mt-auto w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-100 " + escape(className, true) + " max-h-[100dvh] overflow-y-auto scrollbar-hidden svelte-fq1rhy"}">${slots.default ? slots.default({}) : ``}</div> </div>`;
});
export {
  Drawer as D,
  FilesOverlay as F,
  Pane as P,
  UserMenu as U,
  generateId as a,
  getCursorStyle as b,
  Pane_group as c,
  getCtx as g,
  styleToString as s
};
//# sourceMappingURL=Drawer.js.map

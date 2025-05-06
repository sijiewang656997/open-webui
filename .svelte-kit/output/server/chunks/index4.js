import i18next from "i18next";
import "i18next-resources-to-backend";
import "i18next-browser-languagedetector";
import { w as writable } from "./index2.js";
const createI18nStore = (i18n2) => {
  const i18nWritable = writable(i18n2);
  i18n2.on("initialized", () => {
    i18nWritable.set(i18n2);
  });
  i18n2.on("loaded", () => {
    i18nWritable.set(i18n2);
  });
  i18n2.on("added", () => i18nWritable.set(i18n2));
  i18n2.on("languageChanged", () => {
    i18nWritable.set(i18n2);
  });
  return i18nWritable;
};
const createIsLoadingStore = (i18n2) => {
  const isLoading2 = writable(false);
  i18n2.on("loaded", (resources) => {
    Object.keys(resources).length !== 0 && isLoading2.set(false);
  });
  i18n2.on("failedLoading", () => {
    isLoading2.set(true);
  });
  return isLoading2;
};
const i18n = createI18nStore(i18next);
createIsLoadingStore(i18next);
export {
  i18n as i
};
//# sourceMappingURL=index4.js.map

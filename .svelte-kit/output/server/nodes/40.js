

export const index = 40;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/excel-viewer/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/40.Bv9yBUed.js","_app/immutable/chunks/CgRTDwF2.js","_app/immutable/chunks/Bnxgdxyh.js","_app/immutable/chunks/CisIfe-u.js","_app/immutable/chunks/BT9ZK6lC.js","_app/immutable/chunks/C3QokUWv.js"];
export const stylesheets = ["_app/immutable/assets/ExcelViewer.CoDNKRNR.css"];
export const fonts = [];

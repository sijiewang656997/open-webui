

export const index = 40;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/excel-viewer/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/40.D5lv6Rgr.js","_app/immutable/chunks/Dc4_ziGv.js","_app/immutable/chunks/CAZSMy3J.js","_app/immutable/chunks/CisIfe-u.js","_app/immutable/chunks/DsszLngi.js","_app/immutable/chunks/C6kX8Nm-.js"];
export const stylesheets = ["_app/immutable/assets/ExcelViewer.CoDNKRNR.css"];
export const fonts = [];

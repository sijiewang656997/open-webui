

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/home/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.BDTUB532.js","_app/immutable/chunks/Dc4_ziGv.js","_app/immutable/chunks/CAZSMy3J.js"];
export const stylesheets = [];
export const fonts = [];

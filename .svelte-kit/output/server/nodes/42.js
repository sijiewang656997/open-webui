

export const index = 42;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sync/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/42.Bv0tQXrn.js","_app/immutable/chunks/Dc4_ziGv.js","_app/immutable/chunks/CAZSMy3J.js","_app/immutable/chunks/03rUxzUZ.js"];
export const stylesheets = ["_app/immutable/assets/42.kgdqiEf_.css"];
export const fonts = [];

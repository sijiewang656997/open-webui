

export const index = 42;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sync/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/42.D3rvIx18.js","_app/immutable/chunks/CgRTDwF2.js","_app/immutable/chunks/Bnxgdxyh.js","_app/immutable/chunks/-NlMIP-u.js"];
export const stylesheets = ["_app/immutable/assets/42.kgdqiEf_.css"];
export const fonts = [];

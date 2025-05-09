import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DfJ8vE6s.js","_app/immutable/chunks/CgRTDwF2.js","_app/immutable/chunks/Bnxgdxyh.js","_app/immutable/chunks/D0QH3NT1.js","_app/immutable/chunks/TjCxX7sJ.js","_app/immutable/chunks/-NlMIP-u.js","_app/immutable/chunks/BBKI4hO3.js","_app/immutable/chunks/D-bUEbUi.js","_app/immutable/chunks/CisIfe-u.js","_app/immutable/chunks/JmxR0F9R.js","_app/immutable/chunks/BPXmSl8_.js","_app/immutable/chunks/C3QokUWv.js","_app/immutable/chunks/CgU5AtxT.js","_app/immutable/chunks/Fny8-CkQ.js","_app/immutable/chunks/DJyIR_-r.js","_app/immutable/chunks/CgEzuEYe.js","_app/immutable/chunks/eiTzkm5x.js","_app/immutable/chunks/ClgBzXmw.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/B2185GOa.js","_app/immutable/chunks/B9ns8vb-.js","_app/immutable/chunks/BosuxZz1.js","_app/immutable/chunks/AoanbIlI.js","_app/immutable/chunks/ClYhvyZD.js","_app/immutable/chunks/DxEWDC6Z.js","_app/immutable/chunks/iHdIuxSF.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css","_app/immutable/assets/0.BJxUNA2p.css"];
export const fonts = [];

import { c as create_ssr_component, p as getContext, b as subscribe, l as createEventDispatcher, v as validate_component, a as add_attribute, f as escape, o as onDestroy } from "../../../../../../chunks/ssr.js";
import Fuse from "fuse.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { v4 } from "uuid";
import "../../../../../../chunks/client.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { p as WEBUI_API_BASE_URL, j as showSidebar } from "../../../../../../chunks/index3.js";
import { A as AddFilesPlaceholder, u as uploadFile } from "../../../../../../chunks/Drawer.svelte_svelte_type_style_lang.js";
import "../../../../../../chunks/index5.js";
import { S as Spinner } from "../../../../../../chunks/Spinner.js";
/* empty css                                                           */
import "dequal";
import "../../../../../../chunks/create.js";
import "dompurify";
import "marked";
/* empty css                                                                 */
/* empty css                                                                   */
import "dayjs";
import { M as Modal } from "../../../../../../chunks/Modal.js";
import { R as RichTextInput } from "../../../../../../chunks/RichTextInput.js";
import { X as XMark } from "../../../../../../chunks/XMark.js";
import { M as Mic } from "../../../../../../chunks/Mic.js";
import { T as Tooltip } from "../../../../../../chunks/Tooltip.js";
import "../../../../../../chunks/AutoCompletion.js";
import { C as ConfirmDialog } from "../../../../../../chunks/ConfirmDialog.js";
import "turndown";
import "@tiptap/extension-code-block-lowlight";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-highlight";
import "@tiptap/extension-typography";
import "@tiptap/starter-kit";
const addFileToKnowledgeById = async (token, id, fileId) => {
  let error = null;
  const res = await fetch(`${WEBUI_API_BASE_URL}/knowledge/${id}/file/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      file_id: fileId
    })
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
const css = {
  code: "input.svelte-1vx7r9s::-webkit-outer-spin-button,input.svelte-1vx7r9s::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}",
  map: `{"version":3,"file":"AddTextContentModal.svelte","sources":["AddTextContentModal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { toast } from \\"svelte-sonner\\";\\nimport dayjs from \\"dayjs\\";\\nimport { onMount, getContext, createEventDispatcher } from \\"svelte\\";\\nconst i18n = getContext(\\"i18n\\");\\nconst dispatch = createEventDispatcher();\\nimport Modal from \\"$lib/components/common/Modal.svelte\\";\\nimport RichTextInput from \\"$lib/components/common/RichTextInput.svelte\\";\\nimport XMark from \\"$lib/components/icons/XMark.svelte\\";\\nimport Mic from \\"$lib/components/icons/Mic.svelte\\";\\nimport Tooltip from \\"$lib/components/common/Tooltip.svelte\\";\\nimport VoiceRecording from \\"$lib/components/chat/MessageInput/VoiceRecording.svelte\\";\\nexport let show = false;\\nlet name = \\"Untitled\\";\\nlet content = \\"\\";\\nlet voiceInput = false;\\n<\/script>\\n\\n<Modal size=\\"full\\" containerClassName=\\"\\" className=\\"h-full bg-white dark:bg-gray-900\\" bind:show>\\n\\t<div class=\\"absolute top-0 right-0 p-5\\">\\n\\t\\t<button\\n\\t\\t\\tclass=\\"self-center dark:text-white\\"\\n\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tshow = false;\\n\\t\\t\\t}}\\n\\t\\t>\\n\\t\\t\\t<XMark className=\\"size-3.5\\" />\\n\\t\\t</button>\\n\\t</div>\\n\\t<div class=\\"flex flex-col md:flex-row w-full h-full md:space-x-4 dark:text-gray-200\\">\\n\\t\\t<form\\n\\t\\t\\tclass=\\"flex flex-col w-full h-full\\"\\n\\t\\t\\ton:submit|preventDefault={() => {\\n\\t\\t\\t\\tif (name.trim() === '' || content.trim() === '') {\\n\\t\\t\\t\\t\\ttoast.error($i18n.t('Please fill in all fields.'));\\n\\t\\t\\t\\t\\tname = name.trim();\\n\\t\\t\\t\\t\\tcontent = content.trim();\\n\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tdispatch('submit', {\\n\\t\\t\\t\\t\\tname,\\n\\t\\t\\t\\t\\tcontent\\n\\t\\t\\t\\t});\\n\\t\\t\\t\\tshow = false;\\n\\t\\t\\t\\tname = '';\\n\\t\\t\\t\\tcontent = '';\\n\\t\\t\\t}}\\n\\t\\t>\\n\\t\\t\\t<div class=\\" flex-1 w-full h-full flex justify-center overflow-auto px-5 py-4\\">\\n\\t\\t\\t\\t<div class=\\" max-w-3xl py-2 md:py-10 w-full flex flex-col gap-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"shrink-0 w-full flex justify-between items-center\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"w-full\\">\\n\\t\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full text-3xl font-semibold bg-transparent outline-hidden\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:value={name}\\n\\t\\t\\t\\t\\t\\t\\t\\tplaceholder={$i18n.t('Title')}\\n\\t\\t\\t\\t\\t\\t\\t\\trequired\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t\\t<div class=\\" flex-1 w-full h-full\\">\\n\\t\\t\\t\\t\\t\\t<RichTextInput\\n\\t\\t\\t\\t\\t\\t\\tbind:value={content}\\n\\t\\t\\t\\t\\t\\t\\tplaceholder={$i18n.t('Write something...')}\\n\\t\\t\\t\\t\\t\\t\\tpreserveBreaks={true}\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"flex flex-row items-center justify-end text-sm font-medium shrink-0 mt-1 p-4 gap-1.5\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div class=\\"\\">\\n\\t\\t\\t\\t\\t{#if voiceInput}\\n\\t\\t\\t\\t\\t\\t<div class=\\" max-w-full w-full\\">\\n\\t\\t\\t\\t\\t\\t\\t<VoiceRecording\\n\\t\\t\\t\\t\\t\\t\\t\\tbind:recording={voiceInput}\\n\\t\\t\\t\\t\\t\\t\\t\\tclassName=\\"p-1\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:cancel={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tvoiceInput = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\ton:confirm={(e) => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tconst { text, filename } = e.detail;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tcontent = \`\${content}\${text} \`;\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tvoiceInput = false;\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Voice Input')}>\\n\\t\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\" p-2 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white transition rounded-full\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\t\\t\\t\\t\\ton:click={async () => {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\ttry {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tlet stream = await navigator.mediaDevices\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.getUserMedia({ audio: true })\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t.catch(function (err) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttoast.error(\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t$i18n.t(\`Permission denied when accessing microphone: {{error}}\`, {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\terror: err\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t})\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t);\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\treturn null;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t});\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tif (stream) {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tvoiceInput = true;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tconst tracks = stream.getTracks();\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttracks.forEach((track) => track.stop());\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tstream = null;\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t} catch {\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttoast.error($i18n.t('Permission denied when accessing microphone'));\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<Mic className=\\"size-5\\" />\\n\\t\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div class=\\" shrink-0\\">\\n\\t\\t\\t\\t\\t<Tooltip content={$i18n.t('Save')}>\\n\\t\\t\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\t\\t\\tclass=\\" px-3.5 py-2 bg-black text-white dark:bg-white dark:text-black transition rounded-full\\"\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"submit\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t{$i18n.t('Save')}\\n\\t\\t\\t\\t\\t\\t</button>\\n\\t\\t\\t\\t\\t</Tooltip>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</form>\\n\\t</div>\\n</Modal>\\n\\n<style>\\n\\tinput::-webkit-outer-spin-button,\\n\\tinput::-webkit-inner-spin-button {\\n\\t\\t/* display: none; <- Crashes Chrome on hover */\\n\\t\\t-webkit-appearance: none;\\n\\t\\tmargin: 0; /* <-- Apparently some margin are still there even though it's hidden */\\n\\t}\\n\\n\\t.tabs::-webkit-scrollbar {\\n\\t\\tdisplay: none; /* for Chrome, Safari and Opera */\\n\\t}\\n\\n\\t.tabs {\\n\\t\\t-ms-overflow-style: none; /* IE and Edge */\\n\\t\\tscrollbar-width: none; /* Firefox */\\n\\t}\\n\\n\\tinput[type='number'] {\\n\\t\\t-moz-appearance: textfield; /* Firefox */\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgJC,oBAAK,2BAA2B,CAChC,oBAAK,2BAA4B,CAEhC,kBAAkB,CAAE,IAAI,CACxB,MAAM,CAAE,CACT"}`
};
const AddTextContentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  createEventDispatcher();
  let { show = false } = $$props;
  let name = "Untitled";
  let content = "";
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "full",
        containerClassName: "",
        className: "h-full bg-white dark:bg-gray-900",
        show
      },
      {
        show: ($$value) => {
          show = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="absolute top-0 right-0 p-5"><button class="self-center dark:text-white" type="button">${validate_component(XMark, "XMark").$$render($$result, { className: "size-3.5" }, {}, {})}</button></div> <div class="flex flex-col md:flex-row w-full h-full md:space-x-4 dark:text-gray-200"><form class="flex flex-col w-full h-full"><div class="flex-1 w-full h-full flex justify-center overflow-auto px-5 py-4"><div class="max-w-3xl py-2 md:py-10 w-full flex flex-col gap-2"><div class="shrink-0 w-full flex justify-between items-center"><div class="w-full"><input class="w-full text-3xl font-semibold bg-transparent outline-hidden svelte-1vx7r9s" type="text"${add_attribute("placeholder", $i18n.t("Title"), 0)} required${add_attribute("value", name, 0)}></div></div> <div class="flex-1 w-full h-full">${validate_component(RichTextInput, "RichTextInput").$$render(
            $$result,
            {
              placeholder: $i18n.t("Write something..."),
              preserveBreaks: true,
              value: content
            },
            {
              value: ($$value) => {
                content = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div></div> <div class="flex flex-row items-center justify-end text-sm font-medium shrink-0 mt-1 p-4 gap-1.5"><div class="">${`${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Voice Input") }, {}, {
            default: () => {
              return `<button class="p-2 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white transition rounded-full" type="button">${validate_component(Mic, "Mic").$$render($$result, { className: "size-5" }, {}, {})}</button>`;
            }
          })}`}</div> <div class="shrink-0">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Save") }, {}, {
            default: () => {
              return `<button class="px-3.5 py-2 bg-black text-white dark:bg-white dark:text-black transition rounded-full" type="submit">${escape($i18n.t("Save"))}</button>`;
            }
          })}</div></div></form></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const KnowledgeBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $i18n, $$unsubscribe_i18n;
  let $showSidebar, $$unsubscribe_showSidebar;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_showSidebar = subscribe(showSidebar, (value) => $showSidebar = value);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  let id = null;
  let knowledge$1 = null;
  let showAddTextContentModal = false;
  let showSyncConfirmModal = false;
  let fuse = null;
  let dragged = false;
  const uploadFileHandler = async (file) => {
    console.log(file);
    const tempItemId = v4();
    const fileItem = {
      type: "file",
      file: "",
      id: null,
      url: "",
      name: file.name,
      size: file.size,
      status: "uploading",
      error: "",
      itemId: tempItemId
    };
    if (fileItem.size == 0) {
      toast.error($i18n.t("You cannot upload an empty file."));
      return null;
    }
    knowledge$1.files = [...knowledge$1.files ?? [], fileItem];
    try {
      const uploadedFile = await uploadFile(localStorage.token, file).catch((e) => {
        toast.error(`${e}`);
        return null;
      });
      if (uploadedFile) {
        console.log(uploadedFile);
        knowledge$1.files = knowledge$1.files.map((item) => {
          if (item.itemId === tempItemId) {
            item.id = uploadedFile.id;
          }
          delete item.itemId;
          return item;
        });
        await addFileHandler(uploadedFile.id);
      } else {
        toast.error($i18n.t("Failed to upload file."));
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };
  const addFileHandler = async (fileId) => {
    const updatedKnowledge = await addFileToKnowledgeById(localStorage.token, id, fileId).catch((e) => {
      toast.error(`${e}`);
      return null;
    });
    if (updatedKnowledge) {
      knowledge$1 = updatedKnowledge;
      toast.success($i18n.t("File added successfully."));
    } else {
      toast.error($i18n.t("Failed to add file."));
      knowledge$1.files = knowledge$1.files.filter((file) => file.id !== fileId);
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.types?.includes("Files")) {
      dragged = true;
    } else {
      dragged = false;
    }
  };
  const onDragLeave = () => {
    dragged = false;
  };
  const onDrop = async (e) => {
    e.preventDefault();
    dragged = false;
    if (e.dataTransfer?.types?.includes("Files")) {
      if (e.dataTransfer?.files) {
        const inputFiles2 = e.dataTransfer?.files;
        if (inputFiles2 && inputFiles2.length > 0) {
          for (const file of inputFiles2) {
            await uploadFileHandler(file);
          }
        } else {
          toast.error($i18n.t(`File not found.`));
        }
      }
    }
  };
  onDestroy(() => {
    const dropZone = document.querySelector("body");
    dropZone?.removeEventListener("dragover", onDragOver);
    dropZone?.removeEventListener("drop", onDrop);
    dropZone?.removeEventListener("dragleave", onDragLeave);
  });
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (knowledge$1 && knowledge$1.files) {
        fuse = new Fuse(knowledge$1.files, { keys: ["meta.name", "meta.description"] });
      }
    }
    {
      if (fuse) {
        knowledge$1?.files ?? [];
      }
    }
    $$rendered = `${dragged ? `<div class="${"fixed " + escape(
      $showSidebar ? "left-0 md:left-[260px] md:w-[calc(100%-260px)]" : "left-0",
      true
    ) + " w-full h-full flex z-50 touch-none pointer-events-none"}" id="dropzone" role="region" aria-label="Drag and Drop Container"><div class="absolute w-full h-full backdrop-blur-sm bg-gray-800/40 flex justify-center"><div class="m-auto pt-64 flex flex-col justify-center"><div class="max-w-md">${validate_component(AddFilesPlaceholder, "AddFilesPlaceholder").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="mt-2 text-center text-sm dark:text-gray-200 w-full" data-svelte-h="svelte-19eg75t">Drop any files here to add to my documents</div>`;
      }
    })}</div></div></div></div>` : ``} ${validate_component(ConfirmDialog, "SyncConfirmDialog").$$render(
      $$result,
      {
        message: $i18n.t("This will reset the knowledge base and sync all files. Do you wish to continue?"),
        show: showSyncConfirmModal
      },
      {
        show: ($$value) => {
          showSyncConfirmModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(AddTextContentModal, "AddTextContentModal").$$render(
      $$result,
      { show: showAddTextContentModal },
      {
        show: ($$value) => {
          showAddTextContentModal = $$value;
          $$settled = false;
        }
      },
      {}
    )} <input id="files-input" type="file" multiple hidden> <div class="flex flex-col w-full translate-y-1" id="collection-container">${`${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}`}</div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_i18n();
  $$unsubscribe_showSidebar();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(KnowledgeBase, "KnowledgeBase").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

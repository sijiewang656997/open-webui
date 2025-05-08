import { c as create_ssr_component, l as createEventDispatcher, o as onDestroy, a as add_attribute, p as getContext, v as validate_component, g as escape, b as subscribe, e as each } from "./ssr.js";
import { i as formatFileSize, j as getLineCount, u as unescapeHtml, k as replaceTokens, l as processResponseContent } from "./index5.js";
import { p as WEBUI_API_BASE_URL, g as WEBUI_BASE_URL, c as config, u as user } from "./index3.js";
import { M as Modal } from "./Modal.js";
import { X as XMark } from "./XMark.js";
import { S as Switch_1 } from "./Switch.js";
import { T as Tooltip } from "./Tooltip.js";
/* empty css                                          */
/* empty css                                            */
import { S as Spinner } from "./Spinner.js";
import { marked } from "marked";
import katex from "katex";
import { A as ArrowDownTray, i as is_void } from "./ArrowDownTray.js";
import DOMPurify from "dompurify";
import "file-saver";
import mermaid from "mermaid";
import { v4 } from "uuid";
import { basicSetup, EditorView } from "codemirror";
import { keymap, placeholder } from "@codemirror/view";
import { Compartment } from "@codemirror/state";
import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import { LanguageDescription, indentUnit } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import "./Toaster.svelte_svelte_type_style_lang.js";
import "panzoom";
import "katex/contrib/mhchem";
import { C as Collapsible } from "./Collapsible.js";
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let loaderElement;
  let observer;
  onDestroy(() => {
    observer.disconnect();
  });
  return `<div${add_attribute("this", loaderElement, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Info = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "1.5" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path></svg>`;
});
const css$1 = {
  code: "table.svelte-y4iepm td.svelte-y4iepm{max-width:300px;overflow:hidden;text-overflow:ellipsis}input.svelte-y4iepm.svelte-y4iepm{font-size:inherit}",
  map: `{"version":3,"file":"ExcelViewer.svelte","sources":["ExcelViewer.svelte"],"sourcesContent":["<script>\\n    import { onMount, createEventDispatcher } from 'svelte';\\n    import * as XLSX from 'xlsx';\\n    \\n    export let src = \\"\\";\\n    export let fileName = \\"\\";\\n    export let editable = false; // 是否可编辑\\n    \\n    let sheets = [];\\n    let activeSheetIndex = 0;\\n    let isLoading = true;\\n    let error = null;\\n    let editingCell = null; // 当前正在编辑的单元格\\n    let editValue = \\"\\"; // 编辑框的值\\n    let originalWorkbook = null; // 保存原始workbook以便导出\\n    let isModified = false; // 新增：跟踪是否有修改\\n    let isSaving = false; // 新增：保存状态\\n    let saveSuccess = false; // 新增：保存成功状态\\n    \\n    const dispatch = createEventDispatcher(); // 用于触发数据变更事件\\n    \\n    function getColumnHeader(index) {\\n        let result = '';\\n        do {\\n            result = String.fromCharCode(65 + (index % 26)) + result;\\n            index = Math.floor(index / 26) - 1;\\n        } while (index >= 0);\\n        return result;\\n    }\\n\\n    function getAuthToken() {\\n        return localStorage.getItem('token') || '';\\n    }\\n    \\n    async function loadExcel() {\\n        try {\\n            isLoading = true;\\n            \\n            const token = getAuthToken();\\n            \\n            const response = await fetch(src, {\\n                headers: {\\n                    'Authorization': \`Bearer \${token}\`,\\n                    'Content-Type': 'application/json',\\n                    'Accept-Language': 'zh-CN'\\n                }\\n            });\\n            \\n            if (!response.ok) {\\n                throw new Error(\`Failed to fetch Excel file: \${response.status} \${response.statusText}\`);\\n            }\\n            \\n            const arrayBuffer = await response.arrayBuffer();\\n            \\n            originalWorkbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });\\n            \\n            sheets = originalWorkbook.SheetNames.map(name => {\\n                const sheet = originalWorkbook.Sheets[name];\\n                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });\\n                \\n                // 确保所有行具有相同的列数\\n                const maxCols = data.reduce((max, row) => Math.max(max, row?.length || 0), 0);\\n                const normalizedData = data.map(row => {\\n                    if (!row) return Array(maxCols).fill('');\\n                    return [...row, ...Array(maxCols - row.length).fill('')];\\n                });\\n                \\n                const MAX_ROWS = 1000;\\n                const rowCount = normalizedData.length;\\n                const truncated = rowCount > MAX_ROWS;\\n                \\n                return {\\n                    name,\\n                    data: normalizedData.slice(0, MAX_ROWS),\\n                    rowCount,\\n                    truncated\\n                };\\n            });\\n            \\n        } catch (err) {\\n            console.error(\\"Error loading Excel:\\", err);\\n            error = err.message;\\n        } finally {\\n            isLoading = false;\\n        }\\n    }\\n    \\n    function switchSheet(index) {\\n        // 取消当前编辑\\n        editingCell = null;\\n        activeSheetIndex = index;\\n    }\\n    \\n    // 开始编辑单元格\\n    function startEditing(rowIndex, colIndex, currentValue) {\\n        if (!editable) return;\\n        editingCell = { rowIndex, colIndex };\\n        editValue = currentValue !== undefined && currentValue !== null ? currentValue.toString() : '';\\n    }\\n    \\n    // 保存单元格编辑\\n    function saveEdit() {\\n        if (!editingCell) return;\\n        \\n        const { rowIndex, colIndex } = editingCell;\\n        \\n        // 更新数据\\n        if (!sheets[activeSheetIndex].data[rowIndex]) {\\n            sheets[activeSheetIndex].data[rowIndex] = [];\\n        }\\n        \\n        // 转换类型：尝试转换为数字，如果不是数字则保持为字符串\\n        let valueToSave = editValue;\\n        if (!isNaN(editValue) && editValue.trim() !== '') {\\n            const num = Number(editValue);\\n            if (String(num) === editValue.trim()) {\\n                valueToSave = num;\\n            }\\n        }\\n        \\n        // 检查值是否真的改变了，如果改变了才标记修改状态\\n        if (sheets[activeSheetIndex].data[rowIndex][colIndex] !== valueToSave) {\\n            sheets[activeSheetIndex].data[rowIndex][colIndex] = valueToSave;\\n            isModified = true; // 标记为已修改\\n            \\n            // 更新Excel工作表数据\\n            updateWorkbookData();\\n        }\\n        \\n        // 退出编辑模式\\n        editingCell = null;\\n    }\\n    \\n    // 取消编辑\\n    function cancelEdit() {\\n        editingCell = null;\\n    }\\n    \\n    // 处理键盘事件\\n    function handleKeydown(event) {\\n        if (event.key === 'Enter') {\\n            saveEdit();\\n            event.preventDefault();\\n        } else if (event.key === 'Escape') {\\n            cancelEdit();\\n            event.preventDefault();\\n        }\\n    }\\n    \\n    // 更新工作簿数据\\n    function updateWorkbookData() {\\n        if (!originalWorkbook) return;\\n        \\n        // 每个sheet的数据\\n        sheets.forEach((sheet, sheetIndex) => {\\n            // 创建一个新的工作表\\n            const ws = XLSX.utils.aoa_to_sheet(sheet.data);\\n            // 更新原始工作簿中的工作表\\n            originalWorkbook.Sheets[sheet.name] = ws;\\n        });\\n    }\\n    \\n    // 触发数据变更事件\\n    function dispatchChanges() {\\n        if (!originalWorkbook) return;\\n        \\n        // 转换为二进制\\n        const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });\\n        \\n        // 触发事件，传递二进制数据\\n        dispatch('datachange', {\\n            data: wbout\\n        });\\n    }\\n    \\n    // 下载Excel文件\\n    function downloadExcel() {\\n        if (!originalWorkbook) return;\\n        \\n        updateWorkbookData();\\n        \\n        // 生成二进制数据\\n        const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });\\n        \\n        // 创建Blob对象\\n        const blob = new Blob([new Uint8Array(wbout)], { type: 'application/octet-stream' });\\n        \\n        // 创建下载链接\\n        const url = URL.createObjectURL(blob);\\n        const a = document.createElement('a');\\n        a.href = url;\\n        a.download = fileName || 'download.xlsx';\\n        \\n        // 模拟点击下载\\n        document.body.appendChild(a);\\n        a.click();\\n        \\n        // 清理\\n        setTimeout(() => {\\n            document.body.removeChild(a);\\n            URL.revokeObjectURL(url);\\n        }, 0);\\n    }\\n    \\n    // 新增: 保存修改\\n    async function saveChanges() {\\n        if (!originalWorkbook || !isModified) return;\\n        \\n        try {\\n            isSaving = true;\\n            \\n            // 更新工作簿数据确保最新\\n            updateWorkbookData();\\n            \\n            // 生成二进制数据\\n            const wbout = XLSX.write(originalWorkbook, { bookType: 'xlsx', type: 'array' });\\n            \\n            // 触发事件将数据送到父组件处理\\n            dispatch('datachange', {\\n                data: wbout\\n            });\\n            \\n            // 如果有保存的逻辑，显示成功\\n            saveSuccess = true;\\n            isModified = false;\\n            \\n            // 3秒后隐藏成功信息\\n            setTimeout(() => {\\n                saveSuccess = false;\\n            }, 3000);\\n        } catch (err) {\\n            console.error(\\"Error saving Excel:\\", err);\\n            error = err.message;\\n        } finally {\\n            isSaving = false;\\n        }\\n    }\\n    \\n    // 处理单元格点击\\n    function handleCellClick(rowIndex, colIndex, currentValue) {\\n        if (editable) {\\n            startEditing(rowIndex, colIndex, currentValue);\\n        }\\n    }\\n    \\n    $: activeSheet = sheets[activeSheetIndex] || null;\\n    \\n    onMount(() => {\\n        loadExcel();\\n    });\\n<\/script>\\n\\n{#if isLoading}\\n    <div class=\\"flex justify-center items-center h-[50vh]\\">\\n        <div class=\\"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500\\"></div>\\n        <span class=\\"ml-3 text-sm text-gray-600 dark:text-gray-400\\">Loading Excel data...</span>\\n    </div>\\n{:else if error}\\n    <div class=\\"bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400\\">\\n        <p class=\\"font-medium\\">Error loading Excel file</p>\\n        <p class=\\"text-sm mt-1\\">{error}</p>\\n        <div class=\\"mt-4\\">\\n            <a \\n                href={src} \\n                download={fileName}\\n                class=\\"text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center\\"\\n            >\\n                Download file instead\\n            </a>\\n        </div>\\n    </div>\\n{:else if sheets.length}\\n    <div class=\\"mb-3 flex justify-between items-center\\">\\n        <div>\\n            {#if sheets.length > 1}\\n                <span class=\\"text-sm text-gray-600 dark:text-gray-400\\">Sheets: {sheets.length}</span>\\n            {/if}\\n        </div>\\n        <div class=\\"flex gap-2\\">\\n            {#if editable && isModified}\\n                <button \\n                    class=\\"px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 \\n                           disabled:bg-gray-400 disabled:cursor-not-allowed\\"\\n                    on:click={saveChanges}\\n                    disabled={isSaving}\\n                >\\n                    {#if isSaving}\\n                        <span class=\\"inline-block animate-pulse\\">Saving...</span>\\n                    {:else}\\n                        Save\\n                    {/if}\\n                </button>\\n            {/if}\\n            \\n            {#if editable}\\n                <button \\n                    class=\\"px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700\\"\\n                    on:click={downloadExcel}\\n                >\\n                    Download\\n                </button>\\n            {:else}\\n                <a \\n                    href={src} \\n                    download={fileName}\\n                    class=\\"px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 inline-block\\"\\n                >\\n                    Download\\n                </a>\\n            {/if}\\n        </div>\\n    </div>\\n\\n    {#if saveSuccess}\\n        <div class=\\"mb-3 px-3 py-2 bg-green-100 dark:bg-green-900/20 border border-green-300 \\n                  dark:border-green-800 rounded-md text-green-700 dark:text-green-400 text-sm\\">\\n            Changes saved successfully!\\n        </div>\\n    {/if}\\n\\n    {#if sheets.length > 1}\\n        <div class=\\"mb-2 border-b dark:border-gray-700 overflow-x-auto\\">\\n            <div class=\\"flex\\">\\n                {#each sheets as sheet, index}\\n                    <button \\n                        class=\\"px-3 py-2 text-sm whitespace-nowrap {index === activeSheetIndex \\n                            ? 'border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium' \\n                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}\\"\\n                        on:click={() => switchSheet(index)}\\n                    >\\n                        {sheet.name || \`Sheet \${index + 1}\`}\\n                    </button>\\n                {/each}\\n            </div>\\n        </div>\\n    {/if}\\n    \\n    {#if activeSheet?.data?.length}\\n        <div class=\\"overflow-x-auto border dark:border-gray-700 rounded-lg\\">\\n            <table class=\\"min-w-full divide-y divide-gray-200 dark:divide-gray-700\\">\\n                <thead class=\\"bg-gray-50 dark:bg-gray-800\\">\\n                    <tr>\\n                        <th class=\\"w-10 px-2 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center\\">\\n                            #\\n                        </th>\\n                        {#each Array(activeSheet.data[0]?.length || 0) as _, colIndex}\\n                            <th class=\\"px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider\\">\\n                                {getColumnHeader(colIndex)}\\n                            </th>\\n                        {/each}\\n                    </tr>\\n                </thead>\\n                <tbody class=\\"bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800\\">\\n                    {#each activeSheet.data as row, rowIndex}\\n                        <tr class=\\"hover:bg-gray-50 dark:hover:bg-gray-800/50\\">\\n                            <td class=\\"px-2 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 text-center\\">\\n                                {rowIndex + 1}\\n                            </td>\\n                            {#each Array(activeSheet.data[0]?.length || 0) as _, colIndex}\\n                                <td \\n                                    class=\\"px-4 py-2 whitespace-nowrap text-xs overflow-hidden text-ellipsis max-w-[200px] {editable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}\\"\\n                                    on:click={() => handleCellClick(rowIndex, colIndex, row[colIndex])}\\n                                >\\n                                    {#if editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex}\\n                                        <input \\n                                            type=\\"text\\"\\n                                            class=\\"w-full p-1 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100\\"\\n                                            bind:value={editValue}\\n                                            on:keydown={handleKeydown}\\n                                            on:blur={saveEdit}\\n                                            autofocus\\n                                        />\\n                                    {:else}\\n                                        {row[colIndex] !== undefined && row[colIndex] !== null ? row[colIndex] : ''}\\n                                    {/if}\\n                                </td>\\n                            {/each}\\n                        </tr>\\n                    {/each}\\n                </tbody>\\n            </table>\\n        </div>\\n        \\n        {#if activeSheet.truncated}\\n            <div class=\\"mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded\\">\\n                Showing first 1000 rows. Full file contains {activeSheet.rowCount} rows.\\n                <span class=\\"ml-1 text-yellow-500\\">Note: Only visible rows can be edited.</span>\\n            </div>\\n        {/if}\\n\\n        {#if editable}\\n            <div class=\\"mt-2 text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded\\">\\n                <p><strong>Editing mode enabled:</strong> Click on any cell to edit its content.</p>\\n                {#if isModified}\\n                    <p class=\\"mt-1 text-yellow-600 dark:text-yellow-400\\">\\n                        <strong>Unsaved changes:</strong> Remember to save your changes.\\n                    </p>\\n                {/if}\\n            </div>\\n        {/if}\\n    {:else}\\n        <div class=\\"text-center py-8 text-gray-500 dark:text-gray-400\\">\\n            No data available in this sheet\\n        </div>\\n    {/if}\\n{:else}\\n    <div class=\\"text-center py-8 text-gray-500 dark:text-gray-400\\">\\n        No data available in this Excel file\\n    </div>\\n{/if}\\n\\n<style>\\n    table td {\\n        max-width: 300px;\\n        overflow: hidden;\\n        text-overflow: ellipsis;\\n    }\\n    \\n    input {\\n        font-size: inherit;\\n    }\\n</style>"],"names":[],"mappings":"AA4ZI,mBAAK,CAAC,gBAAG,CACL,SAAS,CAAE,KAAK,CAChB,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QACnB,CAEA,iCAAM,CACF,SAAS,CAAE,OACf"}`
};
const ExcelViewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "" } = $$props;
  let { fileName = "" } = $$props;
  let { editable = false } = $$props;
  createEventDispatcher();
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.fileName === void 0 && $$bindings.fileName && fileName !== void 0) $$bindings.fileName(fileName);
  if ($$props.editable === void 0 && $$bindings.editable && editable !== void 0) $$bindings.editable(editable);
  $$result.css.add(css$1);
  return `${`<div class="flex justify-center items-center h-[50vh]" data-svelte-h="svelte-1hs82p"><div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div> <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading Excel data...</span></div>`}`;
});
const css = {
  code: ".scrollbar-hidden::-webkit-scrollbar{display:none}.scrollbar-hidden{-ms-overflow-style:none;scrollbar-width:none}",
  map: '{"version":3,"file":"FileItemModal.svelte","sources":["FileItemModal.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { getContext, onMount } from \\"svelte\\";\\nimport { formatFileSize, getLineCount } from \\"$lib/utils\\";\\nimport { WEBUI_API_BASE_URL } from \\"$lib/constants\\";\\nconst i18n = getContext(\\"i18n\\");\\nimport Modal from \\"./Modal.svelte\\";\\nimport XMark from \\"../icons/XMark.svelte\\";\\nimport Info from \\"../icons/Info.svelte\\";\\nimport Switch from \\"./Switch.svelte\\";\\nimport Tooltip from \\"./Tooltip.svelte\\";\\nimport ExcelViewer from \\"./ExcelViewer.svelte\\";\\nexport let item;\\nexport let show = false;\\nexport let edit = false;\\nlet enableFullContent = false;\\nlet excelData = null;\\nlet isExcelModified = false;\\n$: isPDF = item?.meta?.content_type === \\"application/pdf\\" || item?.name && item?.name.toLowerCase().endsWith(\\".pdf\\");\\n$: isExcel = item?.meta?.content_type?.includes(\\"spreadsheet\\") || item?.meta?.content_type?.includes(\\"excel\\") || item?.meta?.content_type?.includes(\\"ms-excel\\") || item?.name && /\\\\.(xlsx|xls|xlsm|xlsb|xltx|xlt|csv|ods)$/i.test(item?.name);\\nfunction handleExcelDataChange(event) {\\n  excelData = event.detail.data;\\n  isExcelModified = true;\\n}\\nasync function saveExcelFile() {\\n  if (!excelData || !item || !item.id) return;\\n  try {\\n    const isSaving = true;\\n    const formData = new FormData();\\n    const excelBlob = new Blob([excelData], {\\n      type: \\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\\"\\n    });\\n    formData.append(\\"file\\", excelBlob, item.name);\\n    const response = await fetch(`${WEBUI_API_BASE_URL}/files/${item.id}/update`, {\\n      method: \\"PUT\\",\\n      body: formData\\n    });\\n    if (!response.ok) {\\n      throw new Error(\\"Failed to save file\\");\\n    }\\n    isExcelModified = false;\\n    alert(\\"Excel file saved successfully!\\");\\n  } catch (error) {\\n    console.error(\\"Error saving Excel file:\\", error);\\n    alert(\\"Failed to save Excel file: \\" + error.message);\\n  }\\n}\\nonMount(() => {\\n  console.log(item);\\n  if (item?.context === \\"full\\") {\\n    enableFullContent = true;\\n  }\\n});\\n<\/script>\\n\\n<!-- 保持Modal可拖动功能 -->\\n<Modal bind:show size=\\"lg\\" draggable={true} className=\\"bg-gray-50 dark:bg-gray-900 rounded-2xl\\">\\n    <div class=\\"font-primary px-6 py-5 w-full flex flex-col justify-center dark:text-gray-400\\">\\n        <div class=\\"pb-2\\">\\n            <div class=\\"flex items-start justify-between\\">\\n                <div>\\n                    <div class=\\"font-medium text-lg dark:text-gray-100\\">\\n                        <a\\n                            href=\\"#\\"\\n                            class=\\"hover:underline line-clamp-1\\"\\n                            on:click|preventDefault={() => {\\n                                if (!isPDF && !isExcel && item.url) {\\n                                    window.open(\\n                                        item.type === \'file\' ? `${item.url}/content` : `${item.url}`,\\n                                        \'_blank\'\\n                                    );\\n                                }\\n                            }}\\n                        >\\n                            {item?.name ?? \'File\'}\\n                        </a>\\n                    </div>\\n                </div>\\n                \\n                <!-- 保留Excel保存按钮 -->\\n                {#if isExcel && isExcelModified}\\n                <div class=\\"ml-auto mr-2\\">\\n                    <button \\n                        class=\\"px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700\\"\\n                        on:click={saveExcelFile}\\n                    >\\n                        Save\\n                    </button>\\n                </div>\\n                {/if}\\n                \\n                <div>\\n                    <button\\n                        on:click={() => {\\n                            // 保留未保存提示\\n                            if (isExcel && isExcelModified) {\\n                                if (confirm(\'You have unsaved changes. Do you want to leave without saving?\')) {\\n                                    show = false;\\n                                }\\n                            } else {\\n                                show = false;\\n                            }\\n                        }}\\n                    >\\n                        <XMark />\\n                    </button>\\n                </div>\\n            </div>\\n            \\n            <div>\\n                <div class=\\"flex flex-col items-center md:flex-row gap-1 justify-between w-full\\">\\n                    <div class=\\"flex flex-wrap text-sm gap-1 text-gray-500\\">\\n                        {#if item.size}\\n                            <div class=\\"capitalize shrink-0\\">{formatFileSize(item.size)}</div>\\n                            •\\n                        {/if}\\n                        \\n                        {#if item?.file?.data?.content}\\n                            <div class=\\"capitalize shrink-0\\">\\n                                {getLineCount(item?.file?.data?.content ?? \'\')} extracted lines\\n                            </div>\\n                            \\n                            <div class=\\"flex items-center gap-1 shrink-0\\">\\n                                <Info />\\n                                Formatting may be inconsistent from source.\\n                            </div>\\n                        {/if}\\n                    </div>\\n                    \\n                    {#if edit}\\n                        <div>\\n                            <Tooltip\\n                                content={enableFullContent\\n                                    ? \'Inject the entire content as context for comprehensive processing, this is recommended for complex queries.\'\\n                                    : \'Default to segmented retrieval for focused and relevant content extraction, this is recommended for most cases.\'}\\n                            >\\n                                <div class=\\"flex items-center gap-1.5 text-xs\\">\\n                                    {#if enableFullContent}\\n                                        Using Entire Document\\n                                    {:else}\\n                                        Using Focused Retrieval\\n                                    {/if}\\n                                    <Switch\\n                                        bind:state={enableFullContent}\\n                                        on:change={(e) => {\\n                                            item.context = e.detail ? \'full\' : undefined;\\n                                        }}\\n                                    />\\n                                </div>\\n                            </Tooltip>\\n                        </div>\\n                    {/if}\\n                </div>\\n            </div>\\n        </div>\\n        \\n        <div class=\\"max-h-[75vh] overflow-auto\\">\\n            {#if isPDF}\\n                <iframe\\n                    title={item?.name}\\n                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}\\n                    class=\\"w-full h-[70vh] border-0 rounded-lg mt-4\\"\\n                />\\n            {:else if isExcel}\\n                <!-- 保留Excel编辑功能 -->\\n                <ExcelViewer \\n                    src={`${WEBUI_API_BASE_URL}/files/${item.id}/content`}\\n                    fileName={item.name}\\n                    editable={true}\\n                    on:datachange={handleExcelDataChange}\\n                />\\n            {:else}\\n                <div class=\\"max-h-96 overflow-scroll scrollbar-hidden text-xs whitespace-pre-wrap\\">\\n                    {item?.file?.data?.content ?? \'No content\'}\\n                </div>\\n            {/if}\\n        </div>\\n    </div>\\n</Modal>\\n\\n<style>\\n    :global(.scrollbar-hidden::-webkit-scrollbar) {\\n        display: none;\\n    }\\n    \\n    :global(.scrollbar-hidden) {\\n        -ms-overflow-style: none;\\n        scrollbar-width: none;\\n    }\\n</style>"],"names":[],"mappings":"AAmLY,oCAAsC,CAC1C,OAAO,CAAE,IACb,CAEQ,iBAAmB,CACvB,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IACrB"}'
};
const FileItemModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isPDF;
  let isExcel;
  getContext("i18n");
  let { item } = $$props;
  let { show = false } = $$props;
  let { edit = false } = $$props;
  let enableFullContent = false;
  let isExcelModified = false;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0) $$bindings.edit(edit);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    isPDF = item?.meta?.content_type === "application/pdf" || item?.name && item?.name.toLowerCase().endsWith(".pdf");
    isExcel = item?.meta?.content_type?.includes("spreadsheet") || item?.meta?.content_type?.includes("excel") || item?.meta?.content_type?.includes("ms-excel") || item?.name && /\.(xlsx|xls|xlsm|xlsb|xltx|xlt|csv|ods)$/i.test(item?.name);
    $$rendered = ` ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "lg",
        draggable: true,
        className: "bg-gray-50 dark:bg-gray-900 rounded-2xl",
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
          return `<div class="font-primary px-6 py-5 w-full flex flex-col justify-center dark:text-gray-400"><div class="pb-2"><div class="flex items-start justify-between"><div><div class="font-medium text-lg dark:text-gray-100"><a href="#" class="hover:underline line-clamp-1">${escape(item?.name ?? "File")}</a></div></div>  ${isExcel && isExcelModified ? `<div class="ml-auto mr-2"><button class="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700" data-svelte-h="svelte-bjbfma">Save</button></div>` : ``} <div><button>${validate_component(XMark, "XMark").$$render($$result, {}, {}, {})}</button></div></div> <div><div class="flex flex-col items-center md:flex-row gap-1 justify-between w-full"><div class="flex flex-wrap text-sm gap-1 text-gray-500">${item.size ? `<div class="capitalize shrink-0">${escape(formatFileSize(item.size))}</div>
                            •` : ``} ${item?.file?.data?.content ? `<div class="capitalize shrink-0">${escape(getLineCount(item?.file?.data?.content ?? ""))} extracted lines</div> <div class="flex items-center gap-1 shrink-0">${validate_component(Info, "Info").$$render($$result, {}, {}, {})}
                                Formatting may be inconsistent from source.</div>` : ``}</div> ${edit ? `<div>${validate_component(Tooltip, "Tooltip").$$render(
            $$result,
            {
              content: enableFullContent ? "Inject the entire content as context for comprehensive processing, this is recommended for complex queries." : "Default to segmented retrieval for focused and relevant content extraction, this is recommended for most cases."
            },
            {},
            {
              default: () => {
                return `<div class="flex items-center gap-1.5 text-xs">${enableFullContent ? `Using Entire Document` : `Using Focused Retrieval`} ${validate_component(Switch_1, "Switch").$$render(
                  $$result,
                  { state: enableFullContent },
                  {
                    state: ($$value) => {
                      enableFullContent = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}</div>`;
              }
            }
          )}</div>` : ``}</div></div></div> <div class="max-h-[75vh] overflow-auto">${isPDF ? `<iframe${add_attribute("title", item?.name, 0)}${add_attribute("src", `${WEBUI_API_BASE_URL}/files/${item.id}/content`, 0)} class="w-full h-[70vh] border-0 rounded-lg mt-4"></iframe>` : `${isExcel ? ` ${validate_component(ExcelViewer, "ExcelViewer").$$render(
            $$result,
            {
              src: `${WEBUI_API_BASE_URL}/files/${item.id}/content`,
              fileName: item.name,
              editable: true
            },
            {},
            {}
          )}` : `<div class="max-h-96 overflow-scroll scrollbar-hidden text-xs whitespace-pre-wrap">${escape(item?.file?.data?.content ?? "No content")}</div>`}`}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
function isExcelFile(fileName) {
  const excelExtensions = [".xls", ".xlsx", ".csv", ".ods"];
  return excelExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
}
const FileItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => $i18n = value2);
  createEventDispatcher();
  let { className = "w-60" } = $$props;
  let { colorClassName = "bg-white dark:bg-gray-850 border border-gray-50 dark:border-white/5" } = $$props;
  let { url = null } = $$props;
  let { dismissible = false } = $$props;
  let { loading = false } = $$props;
  let { item = null } = $$props;
  let { edit = false } = $$props;
  let { small = false } = $$props;
  let { name } = $$props;
  let { type } = $$props;
  let { size } = $$props;
  let showModal = false;
  isExcelFile(name) ? "excel" : type;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.colorClassName === void 0 && $$bindings.colorClassName && colorClassName !== void 0) $$bindings.colorClassName(colorClassName);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  if ($$props.dismissible === void 0 && $$bindings.dismissible && dismissible !== void 0) $$bindings.dismissible(dismissible);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  if ($$props.edit === void 0 && $$bindings.edit && edit !== void 0) $$bindings.edit(edit);
  if ($$props.small === void 0 && $$bindings.small && small !== void 0) $$bindings.small(small);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${item ? `${validate_component(FileItemModal, "FileItemModal").$$render(
      $$result,
      { edit, show: showModal, item },
      {
        show: ($$value) => {
          showModal = $$value;
          $$settled = false;
        },
        item: ($$value) => {
          item = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} <button class="${"relative group p-1.5 " + escape(className, true) + " flex items-center gap-1 " + escape(colorClassName, true) + " " + escape(small ? "rounded-xl" : "rounded-2xl", true) + " text-left"}" type="button">${!small ? `<div class="${"p-3 " + escape(
      isExcelFile(name) ? "bg-green-600/20 dark:bg-green-500/20 text-green-600 dark:text-green-500" : "bg-black/20 dark:bg-white/10 text-white",
      true
    ) + " rounded-xl"}">${!loading ? `${isExcelFile(name) ? ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd"></path><path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"></path></svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd"></path><path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"></path></svg>`}` : `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}`}</div>` : ``} ${!small ? `<div class="flex flex-col justify-center -space-y-0.5 px-2.5 w-full"><div class="dark:text-gray-100 text-sm font-medium line-clamp-1 mb-1">${escape(name)}</div> <div class="flex justify-between text-gray-500 text-xs line-clamp-1">${isExcelFile(name) ? `${escape($i18n.t("Excel"))}` : `${type === "file" ? `${escape($i18n.t("File"))}` : `${type === "doc" ? `${escape($i18n.t("Document"))}` : `${type === "collection" ? `${escape($i18n.t("Collection"))}` : `<span class="capitalize line-clamp-1">${escape(type)}</span>`}`}`}`} ${size ? `<span class="capitalize">${escape(formatFileSize(size))}</span>` : ``}</div></div>` : `${validate_component(Tooltip, "Tooltip").$$render(
      $$result,
      {
        content: name,
        className: "flex flex-col w-full",
        placement: "top-start"
      },
      {},
      {
        default: () => {
          return `<div class="flex flex-col justify-center -space-y-0.5 px-2.5 w-full"><div class="dark:text-gray-100 text-sm flex justify-between items-center">${loading ? `<div class="shrink-0 mr-2">${validate_component(Spinner, "Spinner").$$render($$result, { className: "size-4" }, {}, {})}</div>` : ``} <div class="font-medium line-clamp-1 flex-1">${escape(name)}</div> <div class="text-gray-500 text-xs capitalize shrink-0">${escape(formatFileSize(size))}</div></div></div>`;
        }
      }
    )}`} ${dismissible ? `<div class="absolute -top-1 -right-1"><button class="bg-white text-black border border-white rounded-full group-hover:visible invisible transition" type="button" data-svelte-h="svelte-6317wq"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg></button></div>` : ``}</button>`;
  } while (!$$settled);
  $$unsubscribe_i18n();
  return $$rendered;
});
const ImagePreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let { src = "" } = $$props;
  let { alt = "" } = $$props;
  let previewElement = null;
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      console.log("Escape");
      show = false;
    }
  };
  onDestroy(() => {
    show = false;
  });
  if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  {
    if (show && previewElement) {
      document.body.appendChild(previewElement);
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
  }
  return `${show ? `  <div class="modal fixed top-0 right-0 left-0 bottom-0 bg-black text-white w-full min-h-screen h-screen flex justify-center z-9999 overflow-hidden overscroll-contain"${add_attribute("this", previewElement, 0)}><div class="absolute left-0 w-full flex justify-between select-none"><div><button class="p-5" data-svelte-h="svelte-1klk9rz"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></button></div> <div><button class="p-5" data-svelte-h="svelte-658bhs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z"></path><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"></path></svg></button></div></div> <img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="mx-auto h-full object-scale-down select-none" draggable="false"></div>` : ``}`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "" } = $$props;
  let { alt = "" } = $$props;
  let { className = " w-full outline-hidden focus:outline-hidden" } = $$props;
  let { imageClassName = "rounded-lg" } = $$props;
  let _src = "";
  let showImagePreview = false;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.imageClassName === void 0 && $$bindings.imageClassName && imageClassName !== void 0) $$bindings.imageClassName(imageClassName);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    _src = src.startsWith("/") ? `${WEBUI_BASE_URL}${src}` : src;
    $$rendered = `<button${add_attribute("class", className, 0)} type="button"><img${add_attribute("src", _src, 0)}${add_attribute("alt", alt, 0)}${add_attribute("class", imageClassName, 0)} draggable="false" data-cy="image"></button> ${validate_component(ImagePreview, "ImagePreview").$$render(
      $$result,
      { src: _src, alt, show: showImagePreview },
      {
        show: ($$value) => {
          showImagePreview = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Name = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="self-center font-semibold line-clamp-1 flex gap-1 items-center">${slots.default ? slots.default({}) : ``}</div>`;
});
const ProfileImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-8" } = $$props;
  let { src = `${WEBUI_BASE_URL}/static/favicon.png` } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  return `<img crossorigin="anonymous"${add_attribute(
    "src",
    src === "" ? `${WEBUI_BASE_URL}/static/favicon.png` : src.startsWith(WEBUI_BASE_URL) || src.startsWith("https://www.gravatar.com/avatar/") || src.startsWith("data:") || src.startsWith("/") ? src : `/user.png`,
    0
  )} class="${"" + escape(className, true) + " object-cover rounded-full -translate-y-[1px]"}" alt="profile" draggable="false">`;
});
const CodeEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_i18n;
  createEventDispatcher();
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value3) => value3);
  let { boilerplate = "" } = $$props;
  let { value: value2 = "" } = $$props;
  let { onSave = () => {
  } } = $$props;
  let { onChange = () => {
  } } = $$props;
  let _value = "";
  const updateValue = () => {
    if (_value !== value2) {
      _value = value2;
    }
  };
  let { id = "" } = $$props;
  let { lang = "" } = $$props;
  let codeEditor;
  const focus = () => {
    codeEditor.focus();
  };
  let editorTheme = new Compartment();
  let editorLanguage = new Compartment();
  languages.push(LanguageDescription.of({
    name: "HCL",
    extensions: ["hcl", "tf"],
    load() {
      return import("codemirror-lang-hcl").then((m) => m.hcl());
    }
  }));
  const getLang = async () => {
    const language = languages.find((l) => l.alias.includes(lang));
    return await language?.load();
  };
  const formatPythonCodeHandler = async () => {
    return false;
  };
  [
    basicSetup,
    keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]),
    indentUnit.of("    "),
    placeholder("Enter your code here..."),
    EditorView.updateListener.of((e) => {
      if (e.docChanged) {
        _value = e.state.doc.toString();
        onChange(_value);
      }
    }),
    editorTheme.of([]),
    editorLanguage.of([])
  ];
  const setLanguage = async () => {
    const language = await getLang();
    if (language && codeEditor) {
      codeEditor.dispatch({
        effects: editorLanguage.reconfigure(language)
      });
    }
  };
  if ($$props.boilerplate === void 0 && $$bindings.boilerplate && boilerplate !== void 0) $$bindings.boilerplate(boilerplate);
  if ($$props.value === void 0 && $$bindings.value && value2 !== void 0) $$bindings.value(value2);
  if ($$props.onSave === void 0 && $$bindings.onSave && onSave !== void 0) $$bindings.onSave(onSave);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0) $$bindings.onChange(onChange);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0) $$bindings.focus(focus);
  if ($$props.formatPythonCodeHandler === void 0 && $$bindings.formatPythonCodeHandler && formatPythonCodeHandler !== void 0) $$bindings.formatPythonCodeHandler(formatPythonCodeHandler);
  {
    if (value2) {
      updateValue();
    }
  }
  {
    if (lang) {
      setLanguage();
    }
  }
  $$unsubscribe_i18n();
  return `<div id="${"code-textarea-" + escape(id, true)}" class="h-full w-full"></div>`;
});
const Clipboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"></path></svg>`;
});
const Reset = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "size-4" } = $$props;
  let { strokeWidth = "2" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${add_attribute("stroke-width", strokeWidth, 0)} stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path></svg>`;
});
const SVGPanZoom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => $i18n = value2);
  let { className = "" } = $$props;
  let { svg = "" } = $$props;
  let { content = "" } = $$props;
  let sceneParentElement;
  let sceneElement;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.svg === void 0 && $$bindings.svg && svg !== void 0) $$bindings.svg(svg);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  $$unsubscribe_i18n();
  return `<div class="${"relative " + escape(className, true)}"${add_attribute("this", sceneParentElement, 0)}><div class="flex h-full max-h-full justify-center items-center"${add_attribute("this", sceneElement, 0)}><!-- HTML_TAG_START -->${svg}<!-- HTML_TAG_END --></div> ${content ? `<div class="absolute top-1 right-1"><div class="flex gap-1">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Download as SVG") }, {}, {
    default: () => {
      return `<button class="p-1.5 rounded-lg border border-gray-100 dark:border-none dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800 transition">${validate_component(ArrowDownTray, "ArrowDownTray").$$render($$result, { className: " size-4" }, {}, {})}</button>`;
    }
  })} ${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Reset view") }, {}, {
    default: () => {
      return `<button class="p-1.5 rounded-lg border border-gray-100 dark:border-none dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800 transition">${validate_component(Reset, "Reset").$$render($$result, { className: " size-4" }, {}, {})}</button>`;
    }
  })} ${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Copy to clipboard") }, {}, {
    default: () => {
      return `<button class="p-1.5 rounded-lg border border-gray-100 dark:border-none dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800 transition">${validate_component(Clipboard, "Clipboard").$$render($$result, { className: " size-4", strokeWidth: "1.5" }, {}, {})}</button>`;
    }
  })}</div></div>` : ``}</div>`;
});
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_config;
  let $i18n, $$unsubscribe_i18n;
  $$unsubscribe_config = subscribe(config, (value2) => value2);
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => $i18n = value2);
  let { id = "" } = $$props;
  let { onSave = (e) => {
  } } = $$props;
  let { onCode = (e) => {
  } } = $$props;
  let { save = false } = $$props;
  let { run = true } = $$props;
  let { token } = $$props;
  let { lang = "" } = $$props;
  let { code = "" } = $$props;
  let { attributes = {} } = $$props;
  let { className = "my-2" } = $$props;
  let { editorClassName = "" } = $$props;
  let { stickyButtonsClassName = "top-8" } = $$props;
  let _code = "";
  const updateCode = () => {
    _code = code;
  };
  let _token = null;
  let mermaidHtml = null;
  let stdout = null;
  let stderr = null;
  let result = null;
  let files = null;
  let saved = false;
  const saveCode = () => {
    saved = true;
    code = _code;
    onSave(code);
    setTimeout(
      () => {
        saved = false;
      },
      1e3
    );
  };
  const checkPythonCode = (str) => {
    const pythonSyntax = [
      "def ",
      "else:",
      "elif ",
      "try:",
      "except:",
      "finally:",
      "yield ",
      "lambda ",
      "assert ",
      "nonlocal ",
      "del ",
      "True",
      "False",
      "None",
      " and ",
      " or ",
      " not ",
      " in ",
      " is ",
      " with "
    ];
    for (let syntax of pythonSyntax) {
      if (str.includes(syntax)) {
        return true;
      }
    }
    return false;
  };
  const drawMermaidDiagram = async () => {
    try {
      if (await mermaid.parse(code)) {
        const { svg } = await mermaid.render(`mermaid-${v4()}`, code);
        mermaidHtml = svg;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const render = async () => {
    if (lang === "mermaid" && (token?.raw ?? "").slice(-4).includes("```")) {
      (async () => {
        await drawMermaidDiagram();
      })();
    }
  };
  const onAttributesUpdate = () => {
    if (attributes?.output) {
      const unescapeHtml2 = (html) => {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = html;
        return textArea.value;
      };
      try {
        const unescapedOutput = unescapeHtml2(attributes.output);
        const output = JSON.parse(unescapedOutput);
        stdout = output.stdout;
        stderr = output.stderr;
        result = output.result;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  onDestroy(() => {
  });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.onSave === void 0 && $$bindings.onSave && onSave !== void 0) $$bindings.onSave(onSave);
  if ($$props.onCode === void 0 && $$bindings.onCode && onCode !== void 0) $$bindings.onCode(onCode);
  if ($$props.save === void 0 && $$bindings.save && save !== void 0) $$bindings.save(save);
  if ($$props.run === void 0 && $$bindings.run && run !== void 0) $$bindings.run(run);
  if ($$props.token === void 0 && $$bindings.token && token !== void 0) $$bindings.token(token);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0) $$bindings.lang(lang);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0) $$bindings.code(code);
  if ($$props.attributes === void 0 && $$bindings.attributes && attributes !== void 0) $$bindings.attributes(attributes);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  if ($$props.editorClassName === void 0 && $$bindings.editorClassName && editorClassName !== void 0) $$bindings.editorClassName(editorClassName);
  if ($$props.stickyButtonsClassName === void 0 && $$bindings.stickyButtonsClassName && stickyButtonsClassName !== void 0) $$bindings.stickyButtonsClassName(stickyButtonsClassName);
  {
    if (code) {
      updateCode();
    }
  }
  {
    if (token) {
      if (JSON.stringify(token) !== JSON.stringify(_token)) {
        _token = token;
      }
    }
  }
  {
    if (_token) {
      render();
    }
  }
  {
    onCode({ lang, code });
  }
  {
    if (attributes) {
      onAttributesUpdate();
    }
  }
  $$unsubscribe_config();
  $$unsubscribe_i18n();
  return `<div><div class="${"relative " + escape(className, true) + " flex flex-col rounded-lg"}" dir="ltr">${lang === "mermaid" ? `${mermaidHtml ? `${validate_component(SVGPanZoom, "SvgPanZoom").$$render(
    $$result,
    {
      className: " border border-gray-100 dark:border-gray-850 rounded-lg max-h-fit overflow-hidden",
      svg: mermaidHtml,
      content: _token.text
    },
    {},
    {}
  )}` : `<pre class="mermaid">${escape(code)}</pre>`}` : `<div class="text-text-300 absolute pl-4 py-1.5 text-xs font-medium dark:text-white">${escape(lang)}</div> <div class="${"sticky " + escape(stickyButtonsClassName, true) + " mb-1 py-1 pr-2.5 flex items-center justify-end z-10 text-xs text-black dark:text-white"}"><div class="flex items-center gap-0.5 translate-y-[1px]">${lang.toLowerCase() === "python" || lang.toLowerCase() === "py" || lang === "" && checkPythonCode(code) ? `${`${run ? `<button class="run-code-button bg-none border-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md px-1.5 py-0.5">${escape($i18n.t("Run"))}</button>` : ``}`}` : ``} ${save ? `<button class="save-code-button bg-none border-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md px-1.5 py-0.5">${escape(saved ? $i18n.t("Saved") : $i18n.t("Save"))}</button>` : ``} <button class="copy-code-button bg-none border-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 transition rounded-md px-1.5 py-0.5">${escape($i18n.t("Copy"))}</button></div></div> <div class="${"language-" + escape(lang, true) + " rounded-t-lg -mt-8 " + escape(
    editorClassName ? editorClassName : stdout || stderr || result ? "" : "rounded-b-lg",
    true
  ) + " overflow-hidden"}"><div class="pt-7 bg-gray-50 dark:bg-gray-850"></div> ${validate_component(CodeEditor, "CodeEditor").$$render(
    $$result,
    {
      value: code,
      id,
      lang,
      onSave: () => {
        saveCode();
      },
      onChange: (value2) => {
        _code = value2;
      }
    },
    {},
    {}
  )}</div> <div id="${"plt-canvas-" + escape(id, true)}" class="bg-gray-50 dark:bg-[#202123] dark:text-white max-w-full overflow-x-auto scrollbar-hidden"></div> ${stdout || stderr || result || files ? `<div class="bg-gray-50 dark:bg-[#202123] dark:text-white rounded-b-lg! py-4 px-4 flex flex-col gap-2">${`${stdout || stderr ? `<div class=""><div class="text-gray-500 text-xs mb-1" data-svelte-h="svelte-z7zagk">STDOUT/STDERR</div> <div class="${"text-sm " + escape(stdout?.split("\n")?.length > 100 ? `max-h-96` : "", true) + " overflow-y-auto"}">${escape(stdout || stderr)}</div></div>` : ``} ${result || files ? `<div class=""><div class="text-gray-500 text-xs mb-1" data-svelte-h="svelte-1fv78cd">RESULT</div> ${result ? `<div class="text-sm">${escape(`${JSON.stringify(result)}`)}</div>` : ``} ${``}</div>` : ``}`}</div>` : ``}`}</div></div>`;
});
function findMatchingClosingTag(src, openTag, closeTag) {
  let depth = 1;
  let index = openTag.length;
  while (depth > 0 && index < src.length) {
    if (src.startsWith(openTag, index)) {
      depth++;
    } else if (src.startsWith(closeTag, index)) {
      depth--;
    }
    if (depth > 0) {
      index++;
    }
  }
  return depth === 0 ? index + closeTag.length : -1;
}
function parseAttributes(tag) {
  const attributes = {};
  const attrRegex = /(\w+)="(.*?)"/g;
  let match;
  while ((match = attrRegex.exec(tag)) !== null) {
    attributes[match[1]] = match[2];
  }
  return attributes;
}
function detailsTokenizer(src) {
  const detailsRegex = /^<details(\s+[^>]*)?>\n/;
  const summaryRegex = /^<summary>(.*?)<\/summary>\n/;
  const detailsMatch = detailsRegex.exec(src);
  if (detailsMatch) {
    const endIndex = findMatchingClosingTag(src, "<details", "</details>");
    if (endIndex === -1) return;
    const fullMatch = src.slice(0, endIndex);
    const detailsTag = detailsMatch[0];
    const attributes = parseAttributes(detailsTag);
    let content = fullMatch.slice(detailsTag.length, -10).trim();
    let summary = "";
    const summaryMatch = summaryRegex.exec(content);
    if (summaryMatch) {
      summary = summaryMatch[1].trim();
      content = content.slice(summaryMatch[0].length).trim();
    }
    return {
      type: "details",
      raw: fullMatch,
      summary,
      text: content,
      attributes
      // Include extracted attributes from <details>
    };
  }
}
function detailsStart(src) {
  return src.match(/^<details>/) ? 0 : -1;
}
function detailsRenderer(token) {
  const attributesString = token.attributes ? Object.entries(token.attributes).map(([key, value2]) => `${key}="${value2}"`).join(" ") : "";
  return `<details ${attributesString}>
  ${token.summary ? `<summary>${token.summary}</summary>` : ""}
  ${token.text}
  </details>`;
}
function detailsExtension() {
  return {
    name: "details",
    level: "block",
    start: detailsStart,
    tokenizer: detailsTokenizer,
    renderer: detailsRenderer
  };
}
function markedExtension(options = {}) {
  return {
    extensions: [detailsExtension()]
  };
}
const DELIMITER_LIST = [
  { left: "$$", right: "$$", display: true },
  { left: "$", right: "$", display: false },
  { left: "\\pu{", right: "}", display: false },
  { left: "\\ce{", right: "}", display: false },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\[", right: "\\]", display: true },
  { left: "\\begin{equation}", right: "\\end{equation}", display: true }
];
let inlinePatterns = [];
let blockPatterns = [];
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function generateRegexRules(delimiters) {
  delimiters.forEach((delimiter) => {
    const { left, right, display } = delimiter;
    const escapedLeft = escapeRegex(left);
    const escapedRight = escapeRegex(right);
    if (!display) {
      inlinePatterns.push(`${escapedLeft}((?:\\\\[^]|[^\\\\])+?)${escapedRight}`);
    } else {
      inlinePatterns.push(`${escapedLeft}(?!\\n)((?:\\\\[^]|[^\\\\])+?)(?!\\n)${escapedRight}`);
      blockPatterns.push(`${escapedLeft}\\n((?:\\\\[^]|[^\\\\])+?)\\n${escapedRight}`);
    }
  });
  const inlineRule2 = new RegExp(
    `^(${inlinePatterns.join("|")})(?=[\\s?。，!-/:-@[-\`{-~]|$)`,
    "u"
  );
  const blockRule2 = new RegExp(`^(${blockPatterns.join("|")})(?=[\\s?。，!-/:-@[-\`{-~]|$)`, "u");
  return { inlineRule: inlineRule2, blockRule: blockRule2 };
}
const { inlineRule, blockRule } = generateRegexRules(DELIMITER_LIST);
function markedKatexExtension(options = {}) {
  return {
    extensions: [inlineKatex(), blockKatex()]
  };
}
function katexStart(src, displayMode) {
  let ruleReg = displayMode ? blockRule : inlineRule;
  let indexSrc = src;
  while (indexSrc) {
    let index = -1;
    let startIndex = -1;
    let startDelimiter = "";
    let endDelimiter = "";
    for (let delimiter of DELIMITER_LIST) {
      if (delimiter.display !== displayMode) {
        continue;
      }
      startIndex = indexSrc.indexOf(delimiter.left);
      if (startIndex === -1) {
        continue;
      }
      index = startIndex;
      startDelimiter = delimiter.left;
      endDelimiter = delimiter.right;
    }
    if (index === -1) {
      return;
    }
    const f = index === 0 || indexSrc.charAt(index - 1).match(/[\s?。，!-\/:-@[-`{-~]/);
    if (f) {
      const possibleKatex = indexSrc.substring(index);
      if (possibleKatex.match(ruleReg)) {
        return index;
      }
    }
    indexSrc = indexSrc.substring(index + startDelimiter.length).replace(endDelimiter, "");
  }
}
function katexTokenizer(src, tokens, displayMode) {
  let ruleReg = displayMode ? blockRule : inlineRule;
  let type = displayMode ? "blockKatex" : "inlineKatex";
  const match = src.match(ruleReg);
  if (match) {
    const text = match.slice(2).filter((item) => item).find((item) => item.trim());
    return {
      type,
      raw: match[0],
      text,
      displayMode
    };
  }
}
function inlineKatex(options) {
  return {
    name: "inlineKatex",
    level: "inline",
    start(src) {
      return katexStart(src, false);
    },
    tokenizer(src, tokens) {
      return katexTokenizer(src, tokens, false);
    },
    renderer(token) {
      return `${token?.text ?? ""}`;
    }
  };
}
function blockKatex(options) {
  return {
    name: "blockKatex",
    level: "block",
    start(src) {
      return katexStart(src, true);
    },
    tokenizer(src, tokens) {
      return katexTokenizer(src, tokens, true);
    },
    renderer(token) {
      return `${token?.text ?? ""}`;
    }
  };
}
const KatexRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  let { displayMode = false } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.displayMode === void 0 && $$bindings.displayMode && displayMode !== void 0) $$bindings.displayMode(displayMode);
  return `<!-- HTML_TAG_START -->${katex.renderToString(content, { displayMode, throwOnError: false })}<!-- HTML_TAG_END -->`;
});
function extractAttributes(input) {
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  let attrs = {};
  while ((match = regex.exec(input)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}
function getDomain(url) {
  const domain = url.replace("http://", "").replace("https://", "").split(/[/?#]/)[0];
  return domain;
}
function formattedTitle(title) {
  if (title.startsWith("http")) {
    return getDomain(title);
  }
  return title;
}
const Source = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { token } = $$props;
  let { onClick = () => {
  } } = $$props;
  let attributes = {};
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.token === void 0 && $$bindings.token && token !== void 0) $$bindings.token(token);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  attributes = extractAttributes(token.text);
  return `${attributes.title !== "N/A" ? `<button class="text-xs font-medium w-fit translate-y-[2px] px-2 py-0.5 dark:bg-white/5 dark:text-white/60 dark:hover:text-white bg-gray-50 text-black/60 hover:text-black transition rounded-lg"><span class="line-clamp-1">${escape(attributes.title ? formattedTitle(attributes.title) : "")}</span></button>` : ``}`;
});
const MarkdownInlineTokens = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => value2);
  let { id } = $$props;
  let { tokens } = $$props;
  let { onSourceClick = () => {
  } } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.tokens === void 0 && $$bindings.tokens && tokens !== void 0) $$bindings.tokens(tokens);
  if ($$props.onSourceClick === void 0 && $$bindings.onSourceClick && onSourceClick !== void 0) $$bindings.onSourceClick(onSourceClick);
  $$unsubscribe_i18n();
  return `${each(tokens, (token) => {
    return `${token.type === "escape" ? `${escape(unescapeHtml(token.text))}` : `${token.type === "html" ? (() => {
      let html = DOMPurify.sanitize(token.text);
      return ` ${html && html.includes("<video") ? `<!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END -->` : `${token.text.includes(`<iframe src="${WEBUI_BASE_URL}/api/v1/files/`) ? `<!-- HTML_TAG_START -->${`${token.text}`}<!-- HTML_TAG_END -->` : `${token.text.includes(`<source_id`) ? `${validate_component(Source, "Source").$$render($$result, { id, token, onClick: onSourceClick }, {}, {})}` : `${escape(token.text)}`}`}`}`;
    })() : `${token.type === "link" ? `${token.tokens ? `<a${add_attribute("href", token.href, 0)} target="_blank" rel="nofollow"${add_attribute("title", token.title, 0)}>${validate_component(MarkdownInlineTokens, "svelte:self").$$render(
      $$result,
      {
        id: `${id}-a`,
        tokens: token.tokens,
        onSourceClick
      },
      {},
      {}
    )} </a>` : `<a${add_attribute("href", token.href, 0)} target="_blank" rel="nofollow"${add_attribute("title", token.title, 0)}>${escape(token.text)}</a>`}` : `${token.type === "image" ? `${validate_component(Image, "Image").$$render($$result, { src: token.href, alt: token.text }, {}, {})}` : `${token.type === "strong" ? `<strong>${validate_component(MarkdownInlineTokens, "svelte:self").$$render(
      $$result,
      {
        id: `${id}-strong`,
        tokens: token.tokens,
        onSourceClick
      },
      {},
      {}
    )}</strong>` : `${token.type === "em" ? `<em>${validate_component(MarkdownInlineTokens, "svelte:self").$$render(
      $$result,
      {
        id: `${id}-em`,
        tokens: token.tokens,
        onSourceClick
      },
      {},
      {}
    )}</em>` : `${token.type === "codespan" ? `  <code class="codespan cursor-pointer">${escape(unescapeHtml(token.text))}</code>` : `${token.type === "br" ? `<br>` : `${token.type === "del" ? `<del>${validate_component(MarkdownInlineTokens, "svelte:self").$$render(
      $$result,
      {
        id: `${id}-del`,
        tokens: token.tokens,
        onSourceClick
      },
      {},
      {}
    )}</del>` : `${token.type === "inlineKatex" ? `${token.text ? `${validate_component(KatexRenderer, "KatexRenderer").$$render($$result, { content: token.text, displayMode: false }, {}, {})}` : ``}` : `${token.type === "iframe" ? `<iframe src="${escape(WEBUI_BASE_URL, true) + "/api/v1/files/" + escape(token.fileId, true) + "/content"}"${add_attribute("title", token.fileId, 0)} width="100%" frameborder="0" onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"></iframe>` : `${token.type === "text" ? `${escape(token.raw)}` : ``}`}`}`}`}`}`}`}`}`}`}`}`;
  })}`;
});
const MarkdownTokens = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $i18n, $$unsubscribe_i18n;
  const i18n = getContext("i18n");
  $$unsubscribe_i18n = subscribe(i18n, (value2) => $i18n = value2);
  const dispatch = createEventDispatcher();
  let { id } = $$props;
  let { tokens } = $$props;
  let { top = true } = $$props;
  let { attributes = {} } = $$props;
  let { save = false } = $$props;
  let { onTaskClick = () => {
  } } = $$props;
  let { onSourceClick = () => {
  } } = $$props;
  const headerComponent = (depth) => {
    return "h" + depth;
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.tokens === void 0 && $$bindings.tokens && tokens !== void 0) $$bindings.tokens(tokens);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0) $$bindings.top(top);
  if ($$props.attributes === void 0 && $$bindings.attributes && attributes !== void 0) $$bindings.attributes(attributes);
  if ($$props.save === void 0 && $$bindings.save && save !== void 0) $$bindings.save(save);
  if ($$props.onTaskClick === void 0 && $$bindings.onTaskClick && onTaskClick !== void 0) $$bindings.onTaskClick(onTaskClick);
  if ($$props.onSourceClick === void 0 && $$bindings.onSourceClick && onSourceClick !== void 0) $$bindings.onSourceClick(onSourceClick);
  $$unsubscribe_i18n();
  return ` ${each(tokens, (token, tokenIdx) => {
    return `${token.type === "hr" ? `<hr class="border-gray-100 dark:border-gray-850">` : `${token.type === "heading" ? `${((tag) => {
      return tag ? `<${headerComponent(token.depth)} dir="auto">${is_void(tag) ? "" : `${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
        $$result,
        {
          id: `${id}-${tokenIdx}-h`,
          tokens: token.tokens,
          onSourceClick
        },
        {},
        {}
      )} `}${is_void(tag) ? "" : `</${tag}>`}` : "";
    })(headerComponent(token.depth))}` : `${token.type === "code" ? `${token.raw.includes("```") ? `${validate_component(CodeBlock, "CodeBlock").$$render(
      $$result,
      {
        id: `${id}-${tokenIdx}`,
        token,
        lang: token?.lang ?? "",
        code: token?.text ?? "",
        attributes,
        save,
        onCode: (value2) => {
          dispatch("code", value2);
        },
        onSave: (e) => {
          dispatch("update", {
            raw: token.raw,
            oldContent: token.text,
            newContent: value
          });
        }
      },
      {},
      {}
    )}` : `${escape(token.text)}`}` : `${token.type === "table" ? `<div class="relative w-full group"><div class="scrollbar-hidden relative overflow-x-auto max-w-full rounded-lg"><table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-full rounded-xl"><thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-850 dark:text-gray-400 border-none"><tr class="">${each(token.header, (header, headerIdx) => {
      return `<th scope="col" class="px-3! py-1.5! cursor-pointer border border-gray-100 dark:border-gray-850"${add_attribute(
        "style",
        token.align[headerIdx] ? "" : `text-align: ${token.align[headerIdx]}`,
        0
      )}><div class="flex flex-col gap-1.5 text-left"><div class="shrink-0 break-normal">${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
        $$result,
        {
          id: `${id}-${tokenIdx}-header-${headerIdx}`,
          tokens: header.tokens,
          onSourceClick
        },
        {},
        {}
      )} </div></div> </th>`;
    })} </tr></thead> <tbody>${each(token.rows, (row, rowIdx) => {
      return `<tr class="bg-white dark:bg-gray-900 dark:border-gray-850 text-xs">${each(row ?? [], (cell, cellIdx) => {
        return `<td class="px-3! py-1.5! text-gray-900 dark:text-white w-max border border-gray-100 dark:border-gray-850"${add_attribute(
          "style",
          token.align[cellIdx] ? "" : `text-align: ${token.align[cellIdx]}`,
          0
        )}><div class="flex flex-col break-normal">${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
          $$result,
          {
            id: `${id}-${tokenIdx}-row-${rowIdx}-${cellIdx}`,
            tokens: cell.tokens,
            onSourceClick
          },
          {},
          {}
        )}</div> </td>`;
      })} </tr>`;
    })}</tbody> </table></div> <div class="absolute top-1 right-1.5 z-20 invisible group-hover:visible">${validate_component(Tooltip, "Tooltip").$$render($$result, { content: $i18n.t("Export to CSV") }, {}, {
      default: () => {
        return `<button class="p-1 rounded-lg bg-transparent transition">${validate_component(ArrowDownTray, "ArrowDownTray").$$render(
          $$result,
          {
            className: " size-3.5",
            strokeWidth: "1.5"
          },
          {},
          {}
        )}</button> `;
      }
    })}</div> </div>` : `${token.type === "blockquote" ? `<blockquote dir="auto">${validate_component(MarkdownTokens, "svelte:self").$$render(
      $$result,
      {
        id: `${id}-${tokenIdx}`,
        tokens: token.tokens,
        onTaskClick,
        onSourceClick
      },
      {},
      {}
    )} </blockquote>` : `${token.type === "list" ? `${token.ordered ? `<ol${add_attribute("start", token.start || 1, 0)}>${each(token.items, (item, itemIdx) => {
      return `<li dir="auto" class="text-start">${item?.task ? `<input class="translate-y-[1px] -translate-x-1" type="checkbox" ${item.checked ? "checked" : ""}>` : ``} ${validate_component(MarkdownTokens, "svelte:self").$$render(
        $$result,
        {
          id: `${id}-${tokenIdx}-${itemIdx}`,
          tokens: item.tokens,
          top: token.loose,
          onTaskClick,
          onSourceClick
        },
        {},
        {}
      )} </li>`;
    })} </ol>` : `<ul>${each(token.items, (item, itemIdx) => {
      return `<li dir="auto" class="text-start">${item?.task ? `<input class="translate-y-[1px] -translate-x-1" type="checkbox" ${item.checked ? "checked" : ""}>` : ``} ${validate_component(MarkdownTokens, "svelte:self").$$render(
        $$result,
        {
          id: `${id}-${tokenIdx}-${itemIdx}`,
          tokens: item.tokens,
          top: token.loose,
          onTaskClick,
          onSourceClick
        },
        {},
        {}
      )} </li>`;
    })} </ul>`}` : `${token.type === "details" ? `${validate_component(Collapsible, "Collapsible").$$render(
      $$result,
      {
        title: token.summary,
        attributes: token?.attributes,
        className: "w-full space-y-1",
        dir: "auto"
      },
      {},
      {
        content: () => {
          return `<div class="mb-1.5" slot="content">${validate_component(MarkdownTokens, "svelte:self").$$render(
            $$result,
            {
              id: `${id}-${tokenIdx}-d`,
              tokens: marked.lexer(token.text),
              attributes: token?.attributes,
              onTaskClick,
              onSourceClick
            },
            {},
            {}
          )} </div>`;
        }
      }
    )}` : `${token.type === "html" ? (() => {
      let html = DOMPurify.sanitize(token.text);
      return ` ${html && html.includes("<video") ? `<!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END -->` : `${token.text.includes(`<iframe src="${WEBUI_BASE_URL}/api/v1/files/`) ? `<!-- HTML_TAG_START -->${`${token.text}`}<!-- HTML_TAG_END -->` : `${escape(token.text)}`}`}`;
    })() : `${token.type === "iframe" ? `<iframe src="${escape(WEBUI_BASE_URL, true) + "/api/v1/files/" + escape(token.fileId, true) + "/content"}"${add_attribute("title", token.fileId, 0)} width="100%" frameborder="0" onload="this.style.height=(this.contentWindow.document.body.scrollHeight+20)+'px';"></iframe>` : `${token.type === "paragraph" ? `<p dir="auto">${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
      $$result,
      {
        id: `${id}-${tokenIdx}-p`,
        tokens: token.tokens ?? [],
        onSourceClick
      },
      {},
      {}
    )} </p>` : `${token.type === "text" ? `${top ? `<p dir="auto">${token.tokens ? `${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
      $$result,
      {
        id: `${id}-${tokenIdx}-t`,
        tokens: token.tokens,
        onSourceClick
      },
      {},
      {}
    )}` : `${escape(unescapeHtml(token.text))}`} </p>` : `${token.tokens ? `${validate_component(MarkdownInlineTokens, "MarkdownInlineTokens").$$render(
      $$result,
      {
        id: `${id}-${tokenIdx}-p`,
        tokens: token.tokens ?? [],
        onSourceClick
      },
      {},
      {}
    )}` : `${escape(unescapeHtml(token.text))}`}`}` : `${token.type === "inlineKatex" ? `${token.text ? `${validate_component(KatexRenderer, "KatexRenderer").$$render(
      $$result,
      {
        content: token.text,
        displayMode: token?.displayMode ?? false
      },
      {},
      {}
    )}` : ``}` : `${token.type === "blockKatex" ? `${token.text ? `${validate_component(KatexRenderer, "KatexRenderer").$$render(
      $$result,
      {
        content: token.text,
        displayMode: token?.displayMode ?? false
      },
      {},
      {}
    )}` : ``}` : `${token.type === "space" ? `<div class="my-2"></div>` : `${escape(console.log("Unknown token", token))}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`;
  })}`;
});
const Markdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value2) => $user = value2);
  createEventDispatcher();
  let { id } = $$props;
  let { content } = $$props;
  let { model = null } = $$props;
  let { save = false } = $$props;
  let { sourceIds = [] } = $$props;
  let { onSourceClick = () => {
  } } = $$props;
  let { onTaskClick = () => {
  } } = $$props;
  let tokens = [];
  const options = { throwOnError: false };
  marked.use(markedKatexExtension(options));
  marked.use(markedExtension(options));
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0) $$bindings.model(model);
  if ($$props.save === void 0 && $$bindings.save && save !== void 0) $$bindings.save(save);
  if ($$props.sourceIds === void 0 && $$bindings.sourceIds && sourceIds !== void 0) $$bindings.sourceIds(sourceIds);
  if ($$props.onSourceClick === void 0 && $$bindings.onSourceClick && onSourceClick !== void 0) $$bindings.onSourceClick(onSourceClick);
  if ($$props.onTaskClick === void 0 && $$bindings.onTaskClick && onTaskClick !== void 0) $$bindings.onTaskClick(onTaskClick);
  {
    (async () => {
      if (content) {
        tokens = marked.lexer(replaceTokens(processResponseContent(content), sourceIds, model?.name, $user?.name));
      }
    })();
  }
  $$unsubscribe_user();
  return `${validate_component(MarkdownTokens, "MarkdownTokens").$$render(
    $$result,
    {
      tokens,
      id,
      save,
      onTaskClick,
      onSourceClick
    },
    {},
    {}
  )}`;
});
export {
  Clipboard as C,
  FileItem as F,
  Image as I,
  Loader as L,
  Markdown as M,
  Name as N,
  ProfileImage as P,
  SVGPanZoom as S,
  Info as a,
  CodeBlock as b
};
//# sourceMappingURL=Markdown.js.map

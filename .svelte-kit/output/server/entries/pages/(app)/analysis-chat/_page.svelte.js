import { o as onDestroy, c as create_ssr_component, i as spread, k as escape_object, a as add_attribute, e as each, v as validate_component, q as is_promise, n as noop } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import "../../../../chunks/index3.js";
import "../../../../chunks/index4.js";
import { Chart as Chart$1, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from "chart.js";
import { T as Table } from "../../../../chunks/Table.js";
import "pizzip";
import "docxtemplater";
import "file-saver";
const eventPrefix = /^on/;
const events = [];
Object.keys(globalThis).forEach((key) => {
  if (eventPrefix.test(key)) {
    events.push(key.replace(eventPrefix, ""));
  }
});
function useForwardEvents(getRef) {
  const destructors = [];
  onDestroy(() => {
    while (destructors.length) {
      destructors.pop()();
    }
  });
}
function clean(props2) {
  let { data: data2, type: type2, options: options2, plugins: plugins2, children, $$scope, $$slots, ...rest } = props2;
  return rest;
}
const Chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { data = { datasets: [] } } = $$props;
  let { options = {} } = $$props;
  let { plugins = [] } = $$props;
  let { updateMode = void 0 } = $$props;
  let { chart = null } = $$props;
  let canvasRef;
  let props = clean($$props);
  onDestroy(() => {
    if (chart) chart.destroy();
    chart = null;
  });
  useForwardEvents();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0) $$bindings.plugins(plugins);
  if ($$props.updateMode === void 0 && $$bindings.updateMode && updateMode !== void 0) $$bindings.updateMode(updateMode);
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0) $$bindings.chart(chart);
  return `<canvas${spread([escape_object(props)], {})}${add_attribute("this", canvasRef, 0)}></canvas>`;
});
const css = {
  code: ".table-improved{width:calc(100% + 1rem) !important;max-width:none !important;margin-left:-0.5rem;margin-right:-0.5rem}.table-improved thead{background-color:#e8f4ff !important}.dark .table-improved thead{background-color:#1e3a5f !important}.table-improved th{font-weight:600;padding:0.75rem 1rem !important}.table-improved td{padding:0.625rem 1rem !important}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { get } from \\"svelte/store\\";\\nimport { user } from \\"$lib/stores\\";\\nimport i18n from \\"$lib/i18n\\";\\nimport { Chart } from \\"svelte-chartjs\\";\\nimport {\\n  Chart as ChartJS,\\n  LineController,\\n  LineElement,\\n  PointElement,\\n  LinearScale,\\n  Title,\\n  CategoryScale,\\n  Tooltip,\\n  Legend\\n} from \\"chart.js\\";\\nimport Table from \\"$lib/components/common/Table.svelte\\";\\nimport { createDocxTemplateReport, downloadDocxDocument } from \\"$lib/utils/docxTemplateUtils\\";\\nimport { WEBUI_BASE_URL } from \\"$lib/constants\\";\\nlet language_local = \\"\\";\\nif (localStorage.getItem(\\"locale\\") === \\"zh-CN\\") {\\n  language_local = \\"zh-cn\\";\\n} else {\\n  language_local = \\"en\\";\\n}\\nChartJS.register(\\n  LineController,\\n  LineElement,\\n  PointElement,\\n  LinearScale,\\n  Title,\\n  CategoryScale,\\n  Tooltip,\\n  Legend\\n);\\nlet messages = [];\\nlet input = \\"\\";\\nlet isLoading = false;\\nlet error = \\"\\";\\nlet isDownloading = false;\\nasync function handleSubmit() {\\n  if (!input.trim()) return;\\n  if (!input.startsWith(\\"@analysis\\")) {\\n    error = \\"Please start your message with @analysis\\";\\n    return;\\n  }\\n  console.log(\\"[DEBUG] Submitting input:\\", input);\\n  isLoading = true;\\n  error = \\"\\";\\n  messages = [];\\n  try {\\n    const token = localStorage.getItem(\\"token\\");\\n    if (!token) {\\n      throw new Error(\\"No authentication token found\\");\\n    }\\n    const requestBody = {\\n      conversation_id: \\"analysis_stream\\",\\n      message: input\\n    };\\n    const requestHeaders = {\\n      \\"Content-Type\\": \\"application/json\\",\\n      \\"Authorization\\": \\"Bearer token_59b8b43a_aiurmmm0_upload_long_demo\\",\\n      //`token_59b8b43a_aiurmmm0_upload_long_demoBearer ${token}`,\\n      \\"Accept-Language\\": language_local\\n    };\\n    console.log(\\"[DEBUG] Sending fetch to proxy/api/analysis/stream\\", requestBody, requestHeaders);\\n    const response = await fetch(`${WEBUI_BASE_URL}/proxy/api/analysis/stream`, {\\n      method: \\"POST\\",\\n      headers: requestHeaders,\\n      body: JSON.stringify(requestBody)\\n    });\\n    console.log(\\"[DEBUG] Response status:\\", response.status);\\n    if (!response.ok) {\\n      throw new Error(\\"Failed to fetch analysis\\");\\n    }\\n    const reader = response.body?.getReader();\\n    if (!reader) throw new Error(\\"No reader available\\");\\n    const decoder = new TextDecoder();\\n    let buffer = \\"\\";\\n    while (true) {\\n      const { done, value } = await reader.read();\\n      if (done) break;\\n      buffer += decoder.decode(value, { stream: true });\\n      const lines = buffer.split(\\"\\\\n\\");\\n      buffer = lines.pop() || \\"\\";\\n      for (const line of lines) {\\n        if (!line.trim()) continue;\\n        console.log(\\"[DEBUG] Received line:\\", line);\\n        try {\\n          const data = JSON.parse(line);\\n          if (data.type === \\"node\\") {\\n            const newMessage = {\\n              role: \\"assistant\\",\\n              content: data.content,\\n              metadata: data.metadata,\\n              results: data.results\\n            };\\n            console.log(\\"[DEBUG] Adding message:\\", newMessage);\\n            messages = [...messages, newMessage];\\n          }\\n        } catch (e) {\\n          console.error(\\"[DEBUG] Error parsing line:\\", e, line);\\n        }\\n      }\\n    }\\n  } catch (e) {\\n    console.error(\\"[DEBUG] Error in handleSubmit:\\", e);\\n    error = e instanceof Error ? e.message : \\"An error occurred\\";\\n  } finally {\\n    isLoading = false;\\n  }\\n}\\nfunction formatChartData(results) {\\n  if (!results || !results.records) return null;\\n  const chartData = {\\n    labels: results.records.map((r) => r[0]),\\n    datasets: [{\\n      label: \\"Value\\",\\n      data: results.records.map((r) => r[1]),\\n      borderColor: \\"rgb(75, 192, 192)\\",\\n      tension: 0.1\\n    }]\\n  };\\n  return chartData;\\n}\\nfunction toTableObjects(columns, records) {\\n  return records.map((row) => {\\n    const obj = {};\\n    columns.forEach((col, i) => {\\n      obj[col] = row[i];\\n    });\\n    return obj;\\n  });\\n}\\nasync function downloadWordReport() {\\n  try {\\n    console.log(\\"[DOCX DEBUG] Starting Word document download with Docxtemplater\\");\\n    isDownloading = true;\\n    const combinedContent = messages.map((message) => {\\n      return message.content.replace(/<[^>]+>/g, \\"\\");\\n    }).join(\\"\\\\n\\\\n\\");\\n    const tableData = messages.find((msg) => msg.results?.columns && msg.results.records)?.results;\\n    const blob = await createDocxTemplateReport(\\n      combinedContent,\\n      \\"Analysis Report\\",\\n      tableData\\n    );\\n    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:.]/g, \\"\\").substring(0, 14);\\n    const filename = `analysis_report_${timestamp}.docx`;\\n    downloadDocxDocument(blob, filename);\\n    console.log(\\"[DOCX DEBUG] Download complete\\");\\n  } catch (error2) {\\n    console.error(\\"[DOCX DEBUG] Error in downloadWordReport:\\", error2);\\n    alert(\\"Failed to download report. Please try again.\\");\\n  } finally {\\n    isDownloading = false;\\n  }\\n}\\n<\/script>\\n\\n<div class=\\"flex flex-row w-full h-full max-h-[100dvh]\\">\\n\\t<!-- Main content area -->\\n\\t<div class=\\"flex-1 flex flex-col h-full\\">\\n\\t\\t<div class=\\"flex items-center justify-between px-4 pt-4 pb-2\\">\\n\\t\\t\\t<h1 class=\\"text-2xl font-bold\\">Analysis Report</h1>\\n\\t\\t\\t<button \\n\\t\\t\\t\\ton:click={downloadWordReport} \\n\\t\\t\\t\\tclass=\\"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center\\"\\n\\t\\t\\t\\tdisabled={isDownloading || messages.length === 0}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if isDownloading}\\n\\t\\t\\t\\t\\t<svg class=\\"animate-spin -ml-1 mr-2 h-4 w-4 text-white\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\">\\n\\t\\t\\t\\t\\t\\t<circle class=\\"opacity-25\\" cx=\\"12\\" cy=\\"12\\" r=\\"10\\" stroke=\\"currentColor\\" stroke-width=\\"4\\"></circle>\\n\\t\\t\\t\\t\\t\\t<path class=\\"opacity-75\\" fill=\\"currentColor\\" d=\\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z\\"></path>\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\tDownloading...\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"h-5 w-5 mr-2\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"currentColor\\">\\n\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\\" />\\n\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\tDownload as Word\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</button>\\n\\t\\t</div>\\n\\t\\t<div class=\\"flex-1 overflow-y-auto p-4 space-y-4\\">\\n\\t\\t\\t{#each messages as message}\\n\\t\\t\\t\\t<div class=\\"bg-white dark:bg-gray-800 rounded-lg p-4 shadow\\">\\n\\t\\t\\t\\t\\t<div class=\\"prose dark:prose-invert max-w-none\\">\\n\\t\\t\\t\\t\\t\\t{@html message.content}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{#if message.results}\\n\\t\\t\\t\\t\\t\\t<div class=\\"mt-4\\">\\n\\t\\t\\t\\t\\t\\t\\t{#if message.results.records}\\n\\t\\t\\t\\t\\t\\t\\t\\t<!-- Table Section Header -->\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<svg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke-width=\\"2\\" stroke=\\"currentColor\\" class=\\"w-4 h-4\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" d=\\"M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\tData Table\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"overflow-x-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Table \\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata={toTableObjects(message.results.columns, message.results.records)}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tcolumns={message.results.columns}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tclassName=\\"border w-full table-improved\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"mt-4 h-64\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if message.results}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#await Promise.resolve(formatChartData(message.results)) then chartData}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{#if chartData}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<Chart\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\ttype=\\"line\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tdata={chartData}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\toptions={{\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tresponsive: true,\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tmaintainAspectRatio: false\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t{/await}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t\\t<div class=\\"p-4 border-t\\">\\n\\t\\t\\t<form on:submit|preventDefault={handleSubmit} class=\\"flex items-center gap-4\\">\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\tbind:value={input}\\n\\t\\t\\t\\t\\tplaceholder=\\"Send a message starting with @analysis\\"\\n\\t\\t\\t\\t\\tclass=\\"flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800\\"\\n\\t\\t\\t\\t\\tdisabled={isLoading}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\ttype=\\"submit\\"\\n\\t\\t\\t\\t\\tclass=\\"py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition\\"\\n\\t\\t\\t\\t\\tdisabled={isLoading}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{#if isLoading}\\n\\t\\t\\t\\t\\t\\t<span class=\\"flex items-center\\">\\n\\t\\t\\t\\t\\t\\t\\t<svg class=\\"animate-spin -ml-1 mr-2 h-4 w-4 text-white\\" xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<circle class=\\"opacity-25\\" cx=\\"12\\" cy=\\"12\\" r=\\"10\\" stroke=\\"currentColor\\" stroke-width=\\"4\\"></circle>\\n\\t\\t\\t\\t\\t\\t\\t\\t<path class=\\"opacity-75\\" fill=\\"currentColor\\" d=\\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z\\"></path>\\n\\t\\t\\t\\t\\t\\t\\t</svg>\\n\\t\\t\\t\\t\\t\\t\\tProcessing...\\n\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\tSend\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t</form>\\n\\t\\t\\t{#if error}\\n\\t\\t\\t\\t<p class=\\"mt-2 text-red-500\\">{error}</p>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>\\n:global(.table-improved) {\\n\\twidth: calc(100% + 1rem) !important;\\n\\tmax-width: none !important;\\n\\tmargin-left: -0.5rem;\\n\\tmargin-right: -0.5rem;\\n}\\n:global(.table-improved thead) {\\n\\tbackground-color: #e8f4ff !important;\\n}\\n:global(.dark .table-improved thead) {\\n\\tbackground-color: #1e3a5f !important;\\n}\\n:global(.table-improved th) {\\n\\tfont-weight: 600;\\n\\tpadding: 0.75rem 1rem !important;\\n}\\n:global(.table-improved td) {\\n\\tpadding: 0.625rem 1rem !important;\\n}\\n</style> "],"names":[],"mappings":"AAyQQ,eAAiB,CACxB,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,UAAU,CACnC,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,WAAW,CAAE,OAAO,CACpB,YAAY,CAAE,OACf,CACQ,qBAAuB,CAC9B,gBAAgB,CAAE,OAAO,CAAC,UAC3B,CACQ,2BAA6B,CACpC,gBAAgB,CAAE,OAAO,CAAC,UAC3B,CACQ,kBAAoB,CAC3B,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,OAAO,CAAC,IAAI,CAAC,UACvB,CACQ,kBAAoB,CAC3B,OAAO,CAAE,QAAQ,CAAC,IAAI,CAAC,UACxB"}'
};
function formatChartData(results) {
  if (!results || !results.records) return null;
  const chartData = {
    labels: results.records.map((r) => r[0]),
    datasets: [
      {
        label: "Value",
        data: results.records.map((r) => r[1]),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };
  return chartData;
}
function toTableObjects(columns, records) {
  return records.map((row) => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  if (localStorage.getItem("locale") === "zh-CN") ;
  Chart$1.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);
  let messages = [];
  let input = "";
  $$result.css.add(css);
  return `<div class="flex flex-row w-full h-full max-h-[100dvh]"> <div class="flex-1 flex flex-col h-full"><div class="flex items-center justify-between px-4 pt-4 pb-2"><h1 class="text-2xl font-bold" data-svelte-h="svelte-ct5dbq">Analysis Report</h1> <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center" ${messages.length === 0 ? "disabled" : ""}>${`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
					Download as Word`}</button></div> <div class="flex-1 overflow-y-auto p-4 space-y-4">${each(messages, (message) => {
    return `<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"><div class="prose dark:prose-invert max-w-none"><!-- HTML_TAG_START -->${message.content}<!-- HTML_TAG_END --></div> ${message.results ? `<div class="mt-4">${message.results.records ? ` <div class="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 mb-2" data-svelte-h="svelte-qt30ac"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.125-3.75h7.5c.621 0 1.125.504 1.125 1.125m-9.75 0h9.75"></path></svg>
									Data Table</div> <div class="overflow-x-auto">${validate_component(Table, "Table").$$render(
      $$result,
      {
        data: toTableObjects(message.results.columns, message.results.records),
        columns: message.results.columns,
        className: "border w-full table-improved"
      },
      {},
      {}
    )}</div> <div class="mt-4 h-64">${message.results ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return ``;
      }
      return function(chartData) {
        return ` ${chartData ? `${validate_component(Chart, "Chart").$$render(
          $$result,
          {
            type: "line",
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          },
          {},
          {}
        )}` : ``} `;
      }(__value);
    }(Promise.resolve(formatChartData(message.results)))}` : ``} </div>` : ``} </div>` : ``} </div>`;
  })}</div> <div class="p-4 border-t"><form class="flex items-center gap-4"><input type="text" placeholder="Send a message starting with @analysis" class="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800" ${""}${add_attribute("value", input, 0)}> <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" ${""}>${`Send`}</button></form> ${``}</div></div> </div>`;
});
export {
  Page as default
};
//# sourceMappingURL=_page.svelte.js.map

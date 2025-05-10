import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from "./ssr.js";
import { a as afterUpdate } from "./ssr2.js";
let base = "";
let assets = base;
const app_dir = "_app";
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  let { data_3 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0) $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  if ($$props.data_2 === void 0 && $$bindings.data_2 && data_2 !== void 0) $$bindings.data_2(data_2);
  if ($$props.data_3 === void 0 && $$bindings.data_3 && data_3 !== void 0) $$bindings.data_3(data_3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${constructors[2] ? `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {
              default: () => {
                return `${constructors[3] ? `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {
                    default: () => {
                      return `${validate_component(constructors[3] || missing_component, "svelte:component").$$render(
                        $$result,
                        { data: data_3, form, this: components[3] },
                        {
                          this: ($$value) => {
                            components[3] = $$value;
                            $$settled = false;
                          }
                        },
                        {}
                      )}`;
                    }
                  }
                )}` : `${validate_component(constructors[2] || missing_component, "svelte:component").$$render(
                  $$result,
                  { data: data_2, form, this: components[2] },
                  {
                    this: ($$value) => {
                      components[2] = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`}`;
              }
            }
          )}` : `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
const options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
		<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
		<link rel="shortcut icon" href="/favicon/favicon.ico" />
		<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
		<meta name="apple-mobile-web-app-title" content="Kneron Analytics Agent" />
		<link rel="manifest" href="/favicon/site.webmanifest" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
		/>
		<meta name="theme-color" content="#171717" />
		<meta name="robots" content="noindex,nofollow" />
		<meta name="description" content="Kneron Analytics Agent" />
		<link
			rel="search"
			type="application/opensearchdescription+xml"
			title="Kneron Analytics Agent"
			href="/opensearch.xml"
		/>
		<script src="/static/loader.js" defer><\/script>

		<script>
			function resizeIframe(obj) {
				obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
			}
		<\/script>

		<script>
			// On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
			(() => {
				const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
				const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

				if (!localStorage?.theme) {
					localStorage.theme = 'system';
				}

				if (localStorage.theme === 'system') {
					document.documentElement.classList.add(prefersDarkTheme ? 'dark' : 'light');
					metaThemeColorTag.setAttribute('content', prefersDarkTheme ? '#171717' : '#ffffff');
				} else if (localStorage.theme === 'oled-dark') {
					document.documentElement.style.setProperty('--color-gray-800', '#101010');
					document.documentElement.style.setProperty('--color-gray-850', '#050505');
					document.documentElement.style.setProperty('--color-gray-900', '#000000');
					document.documentElement.style.setProperty('--color-gray-950', '#000000');
					document.documentElement.classList.add('dark');
					metaThemeColorTag.setAttribute('content', '#000000');
				} else if (localStorage.theme === 'light') {
					document.documentElement.classList.add('light');
					metaThemeColorTag.setAttribute('content', '#ffffff');
				} else if (localStorage.theme === 'her') {
					document.documentElement.classList.add('dark');
					document.documentElement.classList.add('her');
					metaThemeColorTag.setAttribute('content', '#983724');
				} else {
					document.documentElement.classList.add('dark');
					metaThemeColorTag.setAttribute('content', '#171717');
				}

				window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
					if (localStorage.theme === 'system') {
						if (e.matches) {
							document.documentElement.classList.add('dark');
							document.documentElement.classList.remove('light');
							metaThemeColorTag.setAttribute('content', '#171717');
						} else {
							document.documentElement.classList.add('light');
							document.documentElement.classList.remove('dark');
							metaThemeColorTag.setAttribute('content', '#ffffff');
						}
					}
				});
			})();
		<\/script>

		<title>Kneron Analytics Agent</title>

		` + head + '\n	</head>\n\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + '</div>\n\n		<div\n			id="splash-screen"\n			style="position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 100%"\n		>\n			<style type="text/css" nonce="">\n				html {\n					overflow-y: scroll !important;\n				}\n			</style>\n\n			<img\n				id="logo"\n				style="\n					position: absolute;\n					width: auto;\n					height: 6rem;\n					top: 44%;\n					left: 50%;\n					transform: translateX(-50%);\n				"\n				src="/static/splash.png"\n			/>\n\n			<div\n				style="\n					position: absolute;\n					top: 33%;\n					left: 50%;\n\n					width: 24rem;\n					transform: translateX(-50%);\n\n					display: flex;\n					flex-direction: column;\n					align-items: center;\n				"\n			>\n				<img\n					id="logo-her"\n					style="width: auto; height: 13rem"\n					src="/static/splash.png"\n					class="animate-pulse-fast"\n				/>\n\n				<div style="position: relative; width: 24rem; margin-top: 0.5rem">\n					<div\n						id="progress-background"\n						style="\n							position: absolute;\n							width: 100%;\n							height: 0.75rem;\n\n							border-radius: 9999px;\n							background-color: #fafafa9a;\n						"\n					></div>\n\n					<div\n						id="progress-bar"\n						style="\n							position: absolute;\n							width: 0%;\n							height: 0.75rem;\n							border-radius: 9999px;\n							background-color: #fff;\n						"\n						class="bg-white"\n					></div>\n				</div>\n			</div>\n\n			<!-- <span style="position: absolute; bottom: 32px; left: 50%; margin: -36px 0 0 -36px">\n				Footer content\n			</span> -->\n		</div>\n	</body>\n</html>\n\n<style type="text/css" nonce="">\n	html {\n		overflow-y: hidden !important;\n	}\n\n	#splash-screen {\n		background: #fff;\n	}\n\n	html.dark #splash-screen {\n		background: #000;\n	}\n\n	html.dark #splash-screen img {\n		filter: invert(1);\n	}\n\n	html.her #splash-screen {\n		background: #983724;\n	}\n\n	#logo-her {\n		display: none;\n	}\n\n	#progress-background {\n		display: none;\n	}\n\n	#progress-bar {\n		display: none;\n	}\n\n	html.her #logo {\n		display: none;\n	}\n\n	html.her #logo-her {\n		display: block;\n		filter: invert(1);\n	}\n\n	html.her #progress-background {\n		display: block;\n	}\n\n	html.her #progress-bar {\n		display: block;\n	}\n\n	@media (max-width: 24rem) {\n		html.her #progress-background {\n			display: none;\n		}\n\n		html.her #progress-bar {\n			display: none;\n		}\n	}\n\n	@keyframes pulse {\n		50% {\n			opacity: 0.65;\n		}\n	}\n\n	.animate-pulse-fast {\n		animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n	}\n</style>\n',
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "dxijto"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    init,
    reroute,
    transport
  };
}
export {
  assets as a,
  base as b,
  app_dir as c,
  read_implementation as d,
  options as e,
  set_private_env as f,
  get_hooks as g,
  prerendering as h,
  set_public_env as i,
  set_safe_public_env as j,
  set_read_implementation as k,
  set_assets as l,
  set_building as m,
  set_manifest as n,
  override as o,
  public_env as p,
  set_prerendering as q,
  reset as r,
  safe_public_env as s
};
//# sourceMappingURL=internal.js.map

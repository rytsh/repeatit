import { minify } from "html-minifier";
import type { Options as minifyOptions } from "html-minifier";
const repeatitVersion = import.meta.env.VITE_REPEATIT_VERSION;
const analyticsDisabled = import.meta.env.VITE_ANALYTICS_DISABLED === "true";

const minificationOptions: minifyOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: false,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
};

const analytics = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DLDSWZ7265"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DLDSWZ7265');
</script>`;

const injectFn = (s: string) => {
  return s.replace(/<!-- <%- analytics %> -->/g, analytics);
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  if (process.env.npm_lifecycle_event != "build") {
    return response;
  }

  if (response.headers.get("content-type") === "text/html") {
    console.log("> Prerendering hook function called");
    let tx = await response.text();
    if (!analyticsDisabled && (repeatitVersion != "test")) {
      tx = injectFn(tx);
    }

    return new Response(
      minify(
        tx,
        minificationOptions
      ),
      {
        status: response.status,
        headers: response.headers,
      });
  }

  return response;
}

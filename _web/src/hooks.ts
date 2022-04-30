import { minify } from "html-minifier";
import { prerendering } from "$app/env";

const minificationOptions = {
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

  if (prerendering && response.headers.get("content-type") === "text/html") {
    console.log("> Prerendering hook function called");
    return new Response(
      minify(
        injectFn(await response.text()),
        minificationOptions
      ),
      {
        status: response.status,
        headers: response.headers,
      });
  }

  return response;
}

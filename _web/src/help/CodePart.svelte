<script lang="ts">
  import { saveHash } from "@/lib/helper/share";
  import { inputTypes, type configType } from "@/lib/store";

  let defaultConfig: configType = {
    template: "text",
    functions: "helm",
    options: ["live"],
    inputType: inputTypes.yaml,
  };

  let {
    title = "",
    description = "",
    template = "",
    output = "",
    input = "",
    config = defaultConfig,
  } = $props();

  let hash = $state("");

  const generateHash = () => {
    hash = saveHash({ template, input, config });
  };

  const handleClick = (e: Event) => {
    generateHash();
  };
</script>

<section class="relative">
  <h5 class="hover:bg-yellow-200 hover:text-black w-full">
    <a
      class="w-full block"
      href={`./#/share/${hash}`}
      target="_blank"
      onclick={handleClick}
    >
      {title}
    </a>
  </h5>
  <p class="text-gray-600 dark:text-gray-300">{@html description}</p>
  <pre><code>{template}</code></pre>
  {#if input!!}
    <pre class="pre-input"><code>{input}</code></pre>
  {/if}
  {#if output!!}
    <pre class="pre-output"><code>{output}</code></pre>
  {/if}
</section>

<style>
  a {
    text-decoration: underline;
  }
</style>

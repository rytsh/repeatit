<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";

  let show = "code";
  let sourceValue = "";

  const result = (v: any) => {
    sourceValue = v;
  };
</script>

<Code
  title="Output"
  watchCode="output"
  watchErr={true}
  {show}
  getResult={result}
>
  <button
    slot="title"
    class="h-full px-3 ml-2 border-l border-neutral-300 dark:border-slate-600 hover:text-black hover:bg-yellow-200"
    on:click|stopPropagation={() =>
      show == "code" ? (show = "show") : (show = "code")}
  >
    {#if show == "code"}
      <span>view HTML</span>
    {:else}
      <span>view TEXT</span>
    {/if}
  </button>
  <iframe
    slot="show"
    seamless
    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
    srcdoc={sourceValue}
    style="width:100%;height:100%"
    title="view html"
  />
</Code>

<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";
  import { fullScreenHTML, getConfig } from "@/lib/store";
  import { getLink } from "@/lib/helper/share";

  let show = $state("code");
</script>

<Code title="Output" watchCode="output" watchErr={true} {show}>
  <div slot="title" class="contents">
    <button
      class="h-full px-3 ml-2 border-l border-neutral-300 dark:border-slate-600 hover:text-black hover:bg-yellow-200"
      onclick={(e: Event) => {
        e.stopPropagation();
        show == "code" ? (show = "show") : (show = "code");
      }}
    >
      {#if show == "code"}
        <span>View HTML</span>
      {:else}
        <span>View TEXT</span>
      {/if}
    </button>
    {#if show == "show"}
      <button
        class="h-full pl-4 pr-3 border-l border-neutral-300 dark:border-slate-600 hover:text-black hover:bg-yellow-200"
        title="full screen view and generate link"
        onclick={(e: Event) => {
          e.stopPropagation();
          const config = getConfig();
          config.fullScreenHTML = true;

          const link = getLink(true, config, true);
          console.log(link);
          fullScreenHTML.set(true);
        }}
      >
        <span>Full Screen</span>
      </button>
    {/if}
  </div>
</Code>

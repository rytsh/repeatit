<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";
  import { codes } from "@/lib/store";

  let show = $state("code");
</script>

{#snippet slotAction()}
  <div slot="title" class="contents">
    {#if show == "show"}
      <button
        class="h-6 w-6 bg-[#525252] hover:bg-white icon-full"
        title="open new window with full screen"
        aria-label="open new window with full screen"
        onclick={(e: Event) => {
          e.stopPropagation();

          const blob = new Blob([$codes.output], { type: "text/html" });
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, "_blank");
          setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
        }}
      >
      </button>
    {/if}
    <button
      class={`h-6 w-6 bg-[#525252] hover:bg-white ${show == "code" ? "icon-html" : "icon-text"}
    `}
      aria-label={show == "code"
        ? "Switch to html mode"
        : "Switch to text mode"}
      title={show == "code" ? "Switch to html mode" : "Switch to text mode"}
      onclick={(e: Event) => {
        e.stopPropagation();
        show == "code" ? (show = "show") : (show = "code");
      }}
    >
    </button>
  </div>
{/snippet}

<Code title="Output" watchCode="output" watchErr={true} {show} {slotAction} />

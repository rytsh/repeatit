<script lang="ts">
  import { loading } from "@/lib/store";
  import Corner from "@/lib/ui/Corner.svelte";
  import { run } from "@/lib/helper/run";
  import Icon from "@/lib/ui/Icon.svelte";
  import Theme from "@/lib/ui/Theme.svelte";
  import Example from "@/lib/components/Example.svelte";
  import Share from "@/lib/components/Share.svelte";
  import "@/lib/helper/load";

  let { class: className } = $props();
</script>

<div class={`bg-yellow-200 flex items-center justify-between ${className}`}>
  <div class="flex-grow flex items-center self-stretch">
    <button
      class="flex items-center h-full text-lg font-semibold px-1 py-0.5 pr-5 bg-transparent text-black hover:bg-green-500 hover:text-gray-100 fill-gray-600 hover:fill-white"
      onclick={run}
      title="run repeatit"
    >
      <Icon icon="repeatit" class="pr-1" />
      <span class="pl-2">RUN</span>
    </button>
    <Example />
    <Share />
    {#if $loading}
      <span class="inline-block"> - Loading..</span>
    {/if}
  </div>

  <span class="hidden sm:inline-block mr-1">Go Template Playground</span>
  <Theme class="px-2" />
  <Corner
    href="https://github.com/rytsh/repeatit"
    class="h-10 hover:fill-red-500 fill-gray-400"
  />
</div>

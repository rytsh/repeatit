<script lang="ts">
  import { loading } from "@/lib/store";
  import Corner from "@/lib/ui/Corner.svelte";
  import { run } from "@/lib/helper/run";
  import Icon from "@/lib/ui/Icon.svelte";
  import Theme from "@/lib/ui/Theme.svelte";
  import Example from "@/lib/components/Example.svelte";

  let className = "";

  export { className as class };
</script>

<div class={`bg-yellow-200 flex items-center justify-between ${className}`}>
  <div class="flex-grow flex items-center self-stretch">
    <button
      class="flex items-center h-full text-lg font-semibold p-1 pr-5 bg-transparent text-black bg-green-300 hover:bg-green-500 hover:text-gray-100 fill-gray-600 hover:fill-white"
      on:click|stopPropagation={run}
    >
      <Icon icon="repeatit" class="pr-1" />
      <span>repeatit</span>
    </button>
    <Example />
    {#if $loading}
      <span class="inline-block"> - Loading..</span>
    {/if}
  </div>

  <h1 class="hidden sm:inline-block">Go Template Playground</h1>
  <Theme class="px-2" />
  <Corner
    href="https://github.com/rytsh/repeatit"
    class="h-10 hover:fill-red-500 fill-gray-400"
  />
</div>

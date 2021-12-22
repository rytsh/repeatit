<script>
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes, loading } from "@/store";
  import update from "immutability-helper";
  import examples from "@/examples";
  import Corner from "@/ui/Corner.svelte";
  import { run } from "@/helper/run";

  let className = "";

  export { className as class };

  const firstLocation = get(location);
  let selected = firstLocation == "/" ? "" : firstLocation.split("/")[1];

  const changeSelected = (v) => {
    if (!v) {
      window.history.pushState(null, null, "/");
      return;
    }

    const values = examples.get(v);
    codes.update((v) =>
      update(v, {
        template: { $set: values.template },
        input: { $set: values.input },
        output: { $set: "" },
        trigger: { $set: !v.trigger },
      })
    );

    push(`/${v}`);
  };

  $: changeSelected(selected);
</script>

<div class={`flex items-center h-9 justify-between ${className}`}>
  <div class="pl-1 flex-grow">
    <span class="text-lg font-semibold">repeatit</span>
    <span class="hidden sm:inline-block"> - Go Template Playground</span>
    {#if $loading}
      <span class="inline-block"> - Loading..</span>
    {/if}
  </div>
  <select
    class="appearance-none bg-gray-50 cursor-pointer hover:bg-gray-500 hover:text-gray-100 w-24 rounded-none truncate px-1 h-full"
    bind:value={selected}
  >
    <option value="">examples</option>
    {#each [...examples.keys()] as name}
      <option value={name}>{name}</option>
    {/each}
  </select>
  <button
    class="h-full p-1 px-5 bg-transparent text-red-400 text-lg hover:bg-red-400 hover:text-gray-100"
    on:click|stopPropagation={run}
  >
    Run
  </button>
  <Corner
    href="https://github.com/rytsh/repeatit"
    class="h-10 hover:fill-red-400 fill-gray-400"
  />
</div>

<script>
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes, loading } from "@/store";
  import update from "immutability-helper";
  import examples from "@/examples";
  import Corner from "@/ui/Corner.svelte";
  import { run } from "@/helper/run";
  import Icon from "@/ui/Icon.svelte";
  import Theme from "@/ui/Theme.svelte";

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

<div class={`bg-yellow-200 flex items-center justify-between ${className}`}>
  <div class="flex-grow flex items-center self-stretch">
    <button
      class="flex items-center h-full text-lg font-semibold p-1 pr-5 bg-transparent text-black hover:bg-green-500 hover:text-gray-100 fill-gray-600 hover:fill-white"
      on:click|stopPropagation={run}
    >
      <Icon icon="play" class="pr-1" />
      <span>repeatit</span>
    </button>
    <select
      class="appearance-none self-stretch bg-gray-50 cursor-pointer hover:bg-gray-500 hover:text-gray-100 w-24 rounded-none truncate px-1"
      bind:value={selected}
    >
      <option value="">examples</option>
      {#each [...examples.keys()] as name}
        <option value={name}>{name}</option>
      {/each}
    </select>
    {#if $loading}
      <span class="inline-block"> - Loading..</span>
    {/if}
  </div>

  <span class="hidden sm:inline-block">Go Template Playground</span>
  <Theme class="px-2" />
  <Corner
    href="https://github.com/rytsh/repeatit"
    class="h-10 hover:fill-red-400 fill-gray-400"
  />
</div>

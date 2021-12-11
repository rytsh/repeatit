<script>
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { uiConfig, codes, loading } from "@/store";
  import update from "immutability-helper";
  import examples from "@/examples";
  import Corner from "@/ui/Corner.svelte";
  import { run } from "@/helper/run";

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

  // Settings
  const toggleSettings = () => {
    uiConfig.update((v) =>
      update(v, {
        showSettings: { $set: !v.showSettings },
      })
    );
  };
</script>

<div class="flex flex-nowrap items-center h-full justify-between">
  <div class="pl-1">
    <span class="text-lg font-semibold">repeatit</span>
    <span class="hidden sm:inline-block"> - Go Template Playground</span>
    {#if $loading}
      <span class="inline-block"> - Loading..</span>
    {/if}
  </div>
  <div class="h-full flex">
    <select
      name="cars"
      id="cars"
      class="appearance-none bg-gray-50 cursor-pointer hover:bg-gray-500 hover:text-gray-100 w-24 rounded-none"
      bind:value={selected}
    >
      <option value="">examples</option>
      {#each [...examples.keys()] as name}
        <option value={name}>{name}</option>
      {/each}
    </select>
    <button
      class="h-full p-1 px-5 bg-transparent hover:bg-gray-500 hover:text-gray-100 relative"
      on:click|stopPropagation={toggleSettings}
    >
      Settings
      {#if $uiConfig.showSettings}
        <span class="h-1 bg-red-400 absolute bottom-0 w-full left-0" />
      {/if}
    </button>
    <button
      class="h-full p-1 px-5 bg-transparent text-red-400 text-lg hover:bg-red-400 hover:text-gray-100"
      on:click|stopPropagation={run}
    >
      Run
    </button>
    <Corner
      href="https://github.com/rytsh/repeatit"
      className="h-10 hover:fill-red-400 fill-gray-400 hidden sm:inline-block"
    />
  </div>
</div>

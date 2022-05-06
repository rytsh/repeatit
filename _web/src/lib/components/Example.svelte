<script lang="ts">
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes, convertConfig, loading } from "@/lib/store";
  import examples from "@/examples";
  import update from "immutability-helper";
  import { browser } from "$app/env";
  import { run } from "@/lib/helper/run";

  let firstLocation = "";
  let selected = "";

  if (browser) {
    firstLocation = get(location);
    selected = firstLocation == "/" ? "" : firstLocation.split("/")[1];
  }

  const changeSelected = (v) => {
    if (!v) {
      browser && window.history.pushState(null, null, "/");
      return;
    }

    push(`/${v}`);

    const values = examples.get(v);
    codes.update((v) =>
      update(v, {
        template: { $set: values.template },
        input: { $set: values.input },
        output: { $set: "" },
        trigger: { $set: !v.trigger },
        error: { $set: false },
        success: { $set: false },
      })
    );

    runIt();
  };

  const runIt = () => {
    // live update
    if ($convertConfig.options.has("live")) {
      run();
    }
  };

  const loadFinish = (l: boolean) => {
    if (l) {
      return;
    }

    runIt();
  };

  $: changeSelected(selected);

  $: loadFinish($loading);
</script>

<select
  class="self-stretch bg-gray-50 cursor-pointer w-28 rounded-none truncate px-1"
  bind:value={selected}
>
  <option value="">examples</option>
  {#each [...examples.keys()] as name}
    <option value={name}>{name}</option>
  {/each}
</select>

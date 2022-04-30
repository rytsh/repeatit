<script lang="ts">
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes } from "@/lib/store";
  import examples from "@/examples";
  import update from "immutability-helper";
  import { browser } from "$app/env";

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

<select
  class="self-stretch bg-gray-50 cursor-pointer w-28 rounded-none truncate px-1"
  bind:value={selected}
>
  <option value="">examples</option>
  {#each [...examples.keys()] as name}
    <option value={name}>{name}</option>
  {/each}
</select>

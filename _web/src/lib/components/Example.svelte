<script lang="ts">
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes } from "@/lib/store";
  import examples from "@/examples";
  import update from "immutability-helper";
  import { runIt } from "@/lib/helper/load";
  import { browser } from "$app/environment";

  const exampleURL = "/example/";

  let firstLocation = "";
  let selected = "";

  if (browser) {
    firstLocation = get(location);
    if (firstLocation.startsWith(exampleURL)) {
      selected = firstLocation.replace(exampleURL, "");
    }
  }

  const changeSelected = (vSelected: string) => {
    if (!vSelected) {
      return;
    }

    push(exampleURL + vSelected);

    const values = examples.get(vSelected);
    if (!values) return;

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

  $: changeSelected(selected);
</script>

<select
  class="self-stretch bg-gray-50 cursor-pointer w-32 rounded-none truncate px-1"
  bind:value={selected}
>
  <option value="">--examples--</option>
  {#each [...examples.keys()] as name}
    <option value={name}>{name}</option>
  {/each}
</select>

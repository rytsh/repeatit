<script lang="ts">
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes, setConfig } from "@/lib/store";
  import examples from "@/examples";
  import update from "immutability-helper";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Select from "../ui/Select.svelte";
  import { debounce } from "../helper/debounce";
  import { run } from "../helper/run";

  const exampleURL = "/example/";

  let firstLocation = "";
  let selected = "";

  let call = debounce(run, 50);

  const changeSelected = (vSelected: string) => {
    if (!vSelected) {
      return;
    }

    push(exampleURL + vSelected);

    const values = examples.get(vSelected);
    if (!values) return;

    if (values.config) {
      setConfig(values.config);
    }

    codes.update((v) =>
      update(v, {
        template: { $set: values.template },
        input: { $set: values.input },
        output: { $set: "" },
        trigger: { $set: !v.trigger },
        error: { $set: false },
        success: { $set: false },
        triggerError: { $set: false },
      })
    );

    call();
  };

  onMount(() => {
    if (browser) {
      firstLocation = get(location);
      if (firstLocation.startsWith(exampleURL)) {
        selected = firstLocation.replace(exampleURL, "");
      }

      selected = decodeURIComponent(selected);
      changeSelected(selected);
    }
  });
</script>

<Select>
  <select
    class="w-36 px-3 h-10 py-2 text-gray-800 bg-white border-l border-r cursor-pointer hover:bg-gray-50 rounded-none outline-none appearance-none focus:ring-offset-2 focus:ring-red-400 focus:ring-2"
    bind:value={selected}
    onchange={() => changeSelected(selected)}
  >
    <option value="">--examples--</option>
    {#each [...examples.keys()] as name, i}
      <option value={name}>{name}</option>
    {/each}
  </select>
</Select>

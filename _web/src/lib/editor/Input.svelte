<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";
  import { run } from "@/lib/helper/run";
  import { convertConfig, inputTypesValues } from "@/lib/store";

  let title = "";

  const updateTitle = (v: string) => {
    switch (v) {
      case "raw":
        title = "Input Raw";
        break;
      case "yaml":
        title = "Input [yaml/json]";
        break;
      case "toml":
        title = "Input [toml]";
        break;
      default:
        title = "Input";
        break;
    }
  };

  // input types change title
  $: updateTitle($convertConfig.inputType);
</script>

<Code
  {title}
  watchCode="input"
  placeholder={"null\n\n# F11 to toggle fullscreen"}
  liveFunc={run}
>
  <div slot="title" class="inline-flex mx-2 border-l border-neutral-400">
    <select
      bind:value={$convertConfig.inputType}
      data-type="template"
      class="px-2 rounded-none block w-full bg-neutral-100 dark:bg-neutral-700 cursor-pointer"
      on:change={run}
    >
      {#each inputTypesValues as inputType}
        <option value={inputType}>{inputType}</option>
      {/each}
    </select>
  </div>
</Code>

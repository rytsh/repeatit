<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";
  import { run } from "@/lib/helper/run";
  import { convertConfig, inputTypesValues } from "@/lib/store";
  import Select from "@/lib/ui/Select.svelte";

  let title = $state("");

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
  $effect(() => {
    updateTitle($convertConfig.inputType);
  });
</script>

{#snippet slotTitle()}
  <div slot="title" class="inline-flex mx-2 border-l border-neutral-400">
    <Select>
      <select
        bind:value={$convertConfig.inputType}
        data-type="template"
        class="px-2 w-20 h-full bg-neutral-100 dark:bg-neutral-700 hover:bg-yellow-200 hover:text-neutral-700 dark:hover:bg-yellow-200 hover:dark:text-neutral-700 cursor-pointer rounded-none outline-none appearance-none focus:ring-offset-2 focus:ring-red-400 focus:ring-2"
        onchange={run}
      >
        {#each inputTypesValues as inputType}
          <option value={inputType}>{inputType}</option>
        {/each}
      </select>
    </Select>
  </div>
{/snippet}

<Code
  {title}
  watchCode="input"
  placeholder={"null\n\n# F11 to toggle fullscreen"}
  liveFunc={run}
  {slotTitle}
></Code>

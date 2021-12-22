<script lang="ts">
  import {
    convertConfig,
    convertFunctions,
    convertTemplates,
    uiConfig,
  } from "@/store";
  import { onMount } from "svelte";
  import update from "immutability-helper";
  import versions from "@/store/versions";

  let htmlSettings: HTMLDivElement;

  onMount(() => {
    htmlSettings.addEventListener("change", (e: Event) => {
      const typeName = (e.target as HTMLElement).dataset["type"];
      if (!typeName) {
        return;
      }

      e.stopPropagation();
      switch (typeName) {
        case "function":
          {
            const funcName = (e.target as HTMLElement).dataset["function"];
            if (!funcName) {
              return;
            }
            const value = (e.target as HTMLInputElement).checked;
            if (value) {
              convertConfig.update((conf) =>
                update(conf, {
                  functions: { $add: [funcName] },
                })
              );
            } else {
              convertConfig.update((conf) =>
                update(conf, {
                  functions: { $remove: [funcName] },
                })
              );
            }
          }
          break;
        case "template":
          {
            const templateName = (e.target as HTMLSelectElement).value;
            convertConfig.update((conf) =>
              update(conf, {
                template: { $set: templateName },
              })
            );
          }
          break;

        default:
          break;
      }
    });
  });

  // Settings
  const toggleSettings = () => {
    uiConfig.update((v) =>
      update(v, {
        showSettings: { $set: !v.showSettings },
      })
    );
  };
</script>

<div
  class={`flex justify-between flex-wrap p-1 bg-yellow-50 border-b-4 border-red-400 ${
    $uiConfig.showSettings ? "" : "hidden"
  }`}
  bind:this={htmlSettings}
>
  <div class="">
    {#each versions as { name, version, link }}
      <a href={link} target="_blank" class="block hover:bg-red-400 px-1">
        <span class="w-14 inline-block">{name}</span>
        <span>{version}</span>
      </a>
    {/each}
  </div>
  <div class="flex justify-between flex-wrap pl-2">
    <fieldset class="border border-solid border-gray-300 p-2 ml-2">
      <legend class="bg-gray-50 px-1 text-sm">Choose functions</legend>

      {#each convertFunctions as funcName, i}
        <div class="flex items-center">
          <input
            id={`settings-ch-${i}`}
            aria-describedby={`"checkbox-${i}`}
            type="checkbox"
            data-type="function"
            data-function={funcName}
            checked={$convertConfig.functions.has(funcName)}
            class="bg-gray-100 focus:ring-blue-500 text-blue-600 border-gray-300 h-4 w-4  rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for={`settings-ch-${i}`}
            class="text-sm ml-3 font-medium text-gray-900 dark:text-gray-300"
            >{funcName}</label
          >
        </div>
      {/each}
    </fieldset>

    <fieldset class="border border-solid border-gray-300 p-2 ml-2">
      <legend class="bg-gray-50 px-1 text-sm">Choose renderer</legend>
      <select
        value={$convertConfig.template}
        data-type="template"
        class="appearance-none rounded-none text-sm block w-full bg-gray-50 cursor-pointer hover:bg-gray-500 hover:text-gray-100"
      >
        {#each convertTemplates as tempName}
          <option value={tempName}>{tempName}</option>
        {/each}
      </select>
    </fieldset>
  </div>
</div>

<button
  class="h-5 px-1 flex items-center bg-gray-200 text-sm pr-1 w-full justify-between hover:bg-gray-500 hover:text-gray-100 relative"
  on:click|stopPropagation={toggleSettings}
>
  <div>Settings</div>
  <div>
    {$convertConfig.template}
    {" | "}
    {[...$convertConfig.functions.keys()].join(",")}
  </div>
</button>

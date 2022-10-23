<script lang="ts">
  import {
    convertConfig,
    convertFunctions,
    convertTemplates,
    options,
    uiConfig,
  } from "@/lib/store";
  import { onMount } from "svelte";
  import update from "immutability-helper";
  import { versions } from "@/lib/store/versions";
  import { run } from "../helper/run";

  let htmlSettings: HTMLDivElement;

  onMount(() => {
    htmlSettings.addEventListener("change", (e: Event) => {
      const typeName = (e.target as HTMLElement).dataset["type"];
      if (!typeName) {
        return;
      }

      e.stopPropagation();
      switch (typeName) {
        case "option":
          {
            const optName = (e.target as HTMLElement).dataset["function"];
            if (!optName) {
              return;
            }
            const value = (e.target as HTMLInputElement).checked;
            if (value) {
              if (optName == "live") {
                run();
              }

              convertConfig.update((conf) =>
                update(conf, {
                  options: { $add: [optName] },
                })
              );
            } else {
              convertConfig.update((conf) =>
                update(conf, {
                  options: { $remove: [optName] },
                })
              );
            }
          }
          break;
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

            run();
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

            run();
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
  <div>
    {#each versions as { name, version, link }}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        class="block hover:bg-yellow-200 hover:underline px-1"
      >
        <span class="w-14 inline-block">{name}</span>
        <span>{version}</span>
      </a>
    {/each}
  </div>
  <div class="flex justify-between flex-wrap pl-2">
    <fieldset class="border border-solid border-neutral-300 p-2 ml-2">
      <legend class="px-1 text-sm">Options</legend>

      {#each options as optName, i}
        <div class="flex items-center">
          <input
            id={`settings-ch-${i}`}
            aria-describedby={`"checkbox-${i}`}
            type="checkbox"
            data-type="option"
            data-function={optName}
            checked={$convertConfig.options.has(optName)}
            class="bg-neutral-100 focus:ring-blue-500 text-blue-600 border-neutral-300 h-4 w-4 rounded dark:focus:ring-blue-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600"
          />
          <label for={`settings-ch-${i}`} class="text-sm ml-3 font-medium"
            >{optName}</label
          >
        </div>
      {/each}
    </fieldset>

    <fieldset class="border border-solid border-neutral-300 p-2 ml-2">
      <legend class="px-1 text-sm">Choose functions</legend>

      {#each convertFunctions as funcName, i}
        <div class="flex items-center">
          <input
            id={`settings-ch-${i}`}
            aria-describedby={`"checkbox-${i}`}
            type="checkbox"
            data-type="function"
            data-function={funcName}
            checked={$convertConfig.functions.has(funcName)}
            class="bg-neutral-100 focus:ring-blue-500 text-blue-600 border-neutral-300 h-4 w-4 rounded dark:focus:ring-blue-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600"
          />
          <label for={`settings-ch-${i}`} class="text-sm ml-3 font-medium"
            >{funcName}</label
          >
        </div>
      {/each}
    </fieldset>

    <fieldset class="border border-solid border-neutral-300 p-2 ml-2">
      <legend class="px-1 text-sm">Choose renderer</legend>
      <select
        value={$convertConfig.template}
        data-type="template"
        class="rounded-none text-sm font-medium block w-full bg-neutral-50 cursor-pointer"
      >
        {#each convertTemplates as tempName}
          <option value={tempName}>{tempName}</option>
        {/each}
      </select>
    </fieldset>
  </div>
</div>

<button
  class="px-1 flex items-center bg-neutral-200 text-sm pr-1 w-full justify-between hover:bg-neutral-400 relative"
  on:click|stopPropagation={toggleSettings}
>
  <div>Settings</div>
  <div>
    {$convertConfig.options.has("live") ? "live on" : "live off"}
    {" | "}
    {$convertConfig.template}
    {" | "}
    {[...$convertConfig.functions.keys()].join(",")}
  </div>
</button>

<script lang="ts">
  import { onMount } from "svelte";
  import { codes, codesKeys, editorConfig } from "@/store";
  import update from "immutability-helper";

  import CodeMirror from "codemirror";
  import Icon from "@/ui/Icon.svelte";
  import copyClip from "clipboard-copy";

  let code: HTMLElement;

  export let title = "title";
  let className = "";
  export { className as class };

  export let watchCode: codesKeys;
  let value = "";
  let trigger = undefined as boolean | undefined;
  let triggerError = undefined as boolean | undefined;

  export let watchErr = false;
  let err = false;
  let success = false;

  let editor: CodeMirror.Editor;
  let copied = false;

  const copy = () => {
    copyClip(editor.getValue()).then(
      () => {
        copied = true;
        setTimeout(() => (copied = false), 500);
      },
      () => {
        console.warn("failed copy");
      }
    );
  };

  onMount(() => {
    editor = CodeMirror(code, $editorConfig);
    editor.setSize("100%", "100%");

    codes.subscribe((v) => {
      if (
        watchErr &&
        (triggerError === undefined || triggerError != v.triggerError)
      ) {
        triggerError = v.triggerError;
        err = v.error;
        success = v.success;
      }

      if (trigger !== undefined && trigger == v.trigger) {
        return;
      }

      trigger = v.trigger;

      value = v[watchCode];
      editor.setValue(value);
    });

    editor.on("change", () => {
      const getValue = editor.getValue();
      if (getValue == value) {
        return;
      }

      codes.update((v) =>
        update(v, {
          [watchCode]: { $set: getValue },
          error: { $set: false },
          success: { $set: false },
          triggerError: { $set: !v.triggerError },
        })
      );
    });
  });
</script>

<div class={`h-full w-full divide2 ${className}`}>
  <div
    class={`px-1 bg-gray-100 border-b border-gray-200 flex flex-row items-center justify-between ${
      err ? "bg-red-300" : ""
    } ${success ? "bg-green-300" : ""}`}
  >
    <span class="truncate">{title}</span>
    <button
      class="text-white font-bold py-2 h-full flex items-center"
      on:click={copy}
      title={copied ? "copied" : "copy to clipboard"}
    >
      {#if copied}
        <Icon icon="tick" class="fill-gray-500 hover:fill-red-400" />
      {:else}
        <Icon icon="copy" class="fill-gray-500 hover:fill-red-400" />
      {/if}
    </button>
  </div>
  <code bind:this={code} class="overflow-y-auto" />
</div>

<style lang="scss">
  .divide2 {
    display: grid;
    grid-template-rows: 2rem minmax(0, 1fr);
  }
</style>

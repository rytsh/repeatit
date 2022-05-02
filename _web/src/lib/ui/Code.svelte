<script lang="ts">
  import { onMount } from "svelte";
  import { codes, codeTheme, convertConfig, editorConfig } from "@/lib/store";
  import type { codesKeys } from "@/lib/store";
  import update from "immutability-helper";

  import type { Editor } from "codemirror";
  import Icon from "@/lib/ui/Icon.svelte";
  import { copyClip } from "@/lib/helper/copy";

  let code: HTMLElement;

  export let title = "title";
  export let placeholder = "# F11 to toggle fullscreen";
  let className = "";
  export { className as class };

  export let watchCode: codesKeys;
  let value = "";
  let trigger = undefined as boolean | undefined;
  let triggerError = undefined as boolean | undefined;

  export let watchErr = false;
  let err = false;
  let success = false;

  let editor: Editor;
  let copied = false;

  export let liveFunc: () => void = null;

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

  const setTheme = (theme: string) => {
    editor.setOption("theme", theme);
  };

  $: {
    editor && setTheme($codeTheme);
  }

  onMount(async () => {
    const CodeMirror = (await import("codemirror")).default;
    editor = CodeMirror(code, {
      ...$editorConfig,
      placeholder: `${placeholder}`,
    });
    editor.setSize("100%", "100%");
    editor.setOption("theme", $codeTheme);

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
      const getValue = editor.getValue();
      if (getValue == value) {
        return;
      }
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

      // live update
      if (liveFunc && $convertConfig.options.has("live")) {
        liveFunc();
      }
    });
  });
</script>

<div class={`flex min-h-full h-full w-full ${className}`}>
  <div class="flex-1 grid h-full grid-rows-[auto_1fr]">
    <div
      class={`px-1 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-600 flex flex-row items-center justify-between ${
        err ? "!bg-red-400 !dark:bg-red-400 !text-neutral-800" : ""
      } ${success ? "!bg-green-300 !dark:bg-green-300 !text-neutral-800" : ""}`}
    >
      <span class="truncate">{title}</span>
      <button
        class={`text-white font-bold py-2 h-full flex items-center fill-neutral-600 ${
          err || success
            ? "dark:fill-neutral-600 dark:hover:fill-neutral-800"
            : "dark:fill-neutral-300 dark:hover:fill-neutral-100"
        } hover:fill-neutral-800`}
        on:click={copy}
        title={copied ? "copied" : "copy to clipboard"}
      >
        {#if copied}
          <Icon icon="tick" />
        {:else}
          <Icon icon="copy" />
        {/if}
      </button>
    </div>
    <code bind:this={code} class="overflow-auto" />
  </div>
</div>

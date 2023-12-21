<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { codes, codeTheme, convertConfig, editorConfig } from "@/lib/store";
  import type { codesKeys } from "@/lib/store";
  import update from "immutability-helper";

  import type { Editor } from "codemirror";
  import Icon from "@/lib/ui/Icon.svelte";
  import { copyClip } from "@/lib/helper/copy";

  let code: HTMLElement;

  export let title = "title";
  export let placeholder = "# F11 to toggle fullscreen";
  export let mode = undefined as string;
  export let show = "code";
  let className = "";
  export { className as class };

  export let watchCode: codesKeys;
  let value = "";
  let trigger = undefined as boolean | undefined;
  let triggerError = undefined as boolean | undefined;

  export let watchErr = false;
  let err = false;
  let errmsg = "";
  let success = false;

  let editor: Editor;
  let copied = false;

  export let liveFunc: () => void = null;
  export let getResult: (v: any) => void = null;

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

  afterUpdate(() => {
    editor && editor.refresh();
  });

  onMount(async () => {
    const CodeMirror = (await import("codemirror")).default;
    editor = CodeMirror(code, {
      ...$editorConfig,
      placeholder: `${placeholder}`,
      mode: mode ?? $editorConfig.mode,
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
      if (!err) {
        scroll = editor.getScrollInfo();
        editor.setValue(value);
        editor.scrollTo(scroll["left"],scroll["top"]);
      } else {
        errmsg = v[watchCode];
      }

      // get result
      if (getResult) {
        getResult(value);
      }
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
      <div class="h-full flex">
        <span class="truncate leading-10">{title}</span>
        <slot name="title" />
      </div>
      <div class="flex gap-2">
        <slot name="actions" />
        <button
          class={`text-white font-bold py-2 h-full flex items-center  ${
            err || success
              ? "fill-neutral-700 hover:fill-white"
              : "fill-neutral-500 hover:fill-neutral-900 dark:hover:fill-yellow-200"
          }`}
          on:click|stopPropagation={copy}
          title={copied ? "copied" : "copy to clipboard"}
        >
          {#if copied}
            <Icon icon="tick" />
          {:else}
            <Icon icon="copy" />
          {/if}
        </button>
      </div>
    </div>
    <code
      bind:this={code}
      class={`h-full overflow-auto ${show == "code" ? "" : "hidden"}`}
    />
    {#if title == "Output" && show == "show"}
      <iframe
        seamless
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        srcdoc={value}
        style="width:100%;height:100%"
        title="view html"
      />
    {/if}
    {#if err }
      <div
        class={`px-1 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-600 flex flex-row items-center justify-between !bg-red-400 !dark:bg-red-400 !text-neutral-800`}
      >
        <div class="leading-normal">{errmsg}</div>
      </div>
    {/if}
  </div>
</div>

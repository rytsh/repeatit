<script lang="ts">
  import type { Editor } from "codemirror";
  import { onDestroy, onMount } from "svelte";
  import type { codesKeys } from "@/lib/store";
  import update from "immutability-helper";
  import { copyClip } from "@/lib/helper/copy";
  import { codes, codeTheme, convertConfig, editorConfig } from "@/lib/store";
  import { debounce } from "@/lib/helper/debounce";

  let code: HTMLElement;

  let {
    title = "title",
    placeholder = "# F11 to toggle fullscreen",
    mode = undefined,
    show = "code",
    class: className = "",
    watchCode,
    watchErr = false,
    liveFunc = () => null,
    getResult = () => null,
    slotTitle = () => null,
    slotAction = () => null,
  }: {
    title?: string;
    placeholder?: string;
    mode?: string | undefined;
    show?: string;
    class?: string;
    watchCode?: codesKeys;
    watchErr?: boolean;
    liveFunc?: () => void;
    getResult?: (v: any) => void;
    slotTitle?: () => any;
    slotAction?: () => any;
  } = $props();

  let value = $state("");
  let trigger = undefined as boolean | undefined;
  let triggerError = undefined as boolean | undefined;

  let err = $state(false);
  let errmsg = $state("");
  let success = $state(false);

  let editor: Editor;
  let copied = $state(false);
  let themeSubscribe = () => null;

  const copy = () => {
    copyClip(editor.getValue()).then(
      () => {
        copied = true;
        setTimeout(() => (copied = false), 500);
      },
      () => {
        console.warn("failed copy");
      },
    );
  };

  $effect(() => {
    editor && editor.refresh();
  });

  onMount(async () => {
    const CodeMirror = (await import("codemirror")).default;
    await ((ms) => new Promise((f) => setTimeout(f, ms)))(40);

    editor = CodeMirror(code, {
      ...$editorConfig,
      placeholder: `${placeholder}`,
      mode: mode ?? $editorConfig.mode,
    });
    editor.setSize("100%", "100%");
    editor.setOption("theme", $codeTheme);
    themeSubscribe = codeTheme.subscribe((v) => {
      editor.setOption("theme", v);
    });

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
        let scroll = editor.getScrollInfo();
        editor.setValue(value);
        editor.scrollTo(scroll["left"], scroll["top"]);
      } else {
        errmsg = v[watchCode];
      }

      // get result
      if (getResult) {
        getResult(value);
      }
    });

    editor.on(
      "change",
      debounce(() => {
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
          }),
        );

        // live update
        if (liveFunc && $convertConfig.options.has("live")) {
          liveFunc();
        }
      }, 2),
    );
  });

  onDestroy(() => {
    themeSubscribe();
  });
</script>

<div class={`flex min-h-full h-full w-full ${className}`}>
  <div class="flex-1 grid h-full grid-rows-[auto_1fr]">
    <div
      class={`px-1 bg-neutral-100 dark:bg-custom-200 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-600 flex flex-row items-center justify-between ${
        err ? "!bg-red-400 !dark:bg-red-400 !text-neutral-800" : ""
      } ${success ? "!bg-emerald-300 dark:!bg-emerald-400 !text-neutral-800" : ""}`}
    >
      <div class="h-full flex">
        <span class="truncate py-0.5">{title}</span>
        {@render slotTitle()}
      </div>
      <div class="flex gap-2">
        {@render slotAction()}
        <button
          class={`text-white font-bold py-1 w-6 h-[1.4rem] flex items-center hover:bg-white
            ${copied ? "icon-copied" : "icon-copy"}
            ${err || success ? "bg-neutral-600" : "bg-custom-500"}
          `}
          onclick={copy}
          title={copied ? "copied" : "copy to clipboard"}
          aria-label={copied ? "copied" : "copy to clipboard"}
        ></button>
      </div>
    </div>
    <code
      bind:this={code}
      class={`h-full overflow-auto scroller ${show == "code" ? "" : "hidden"}`}
    ></code>
    {#if title == "Output" && show == "show"}
      <iframe
        seamless
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        srcdoc={value}
        style="width:100%;height:100%"
        title="view html"
      ></iframe>
    {/if}
    {#if err}
      <div
        class={`px-1 border-b border-neutral-200 dark:border-neutral-600 flex flex-row items-center justify-between bg-red-400 dark:bg-red-400 text-neutral-800`}
      >
        <div class="leading-normal">{errmsg}</div>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import { moveElement } from "@/lib/helper/drag";

  let inputHeight: string;

  let inOutGroup: HTMLElement;
  let inOutMaxHeight: number;

  let mGroup: HTMLElement;
  let templateWidth = 0;

  let moveLineWidth: HTMLElement;
  let templateTarget: HTMLElement;

  let templateTargetWidth: number;
  let templateTargetHeight: number;

  let mediaQuery: MediaQueryList;

  let moveLine: HTMLElement;
  let inputTarget: HTMLElement;

  let inputTargetHeight: number;

  let selected = "template";

  onMount(() => {
    // initialize values
    inOutMaxHeight = inOutGroup.getBoundingClientRect().height;
    inputHeight = `${inOutMaxHeight / 2}px`;

    const mGroupWidthInternal = mGroup.getBoundingClientRect().width;
    if (mGroupWidthInternal > 639) {
      templateWidth = mGroupWidthInternal / 2;
    }

    // template move part
    moveElement(
      moveLineWidth,
      false,
      (ch: number) => {
        templateTarget.style.width = `${
          parseInt(templateTarget.style.width) - ch
        }px`;
      },
      () => (templateTarget.style.width = `${templateTargetWidth}px`),
    );

    mediaQuery = window.matchMedia("(min-width: 640px)");
    mediaQuery.addEventListener("change", (m) => {
      if (!templateTarget || !templateTarget.style) return;

      if (m.matches) {
        templateTarget.style.height = null;
        templateTarget.style.width = `${templateTargetWidth}px`;
      } else {
        templateTarget.style.width = null;
        templateTarget.style.height = `${templateTargetHeight}px`;
      }
    });

    // input move part
    inputTarget.style.height = `${
      inputTarget.getBoundingClientRect().height
    }px`;
    moveElement(
      moveLine,
      true,
      (ch: number) => {
        const h = parseInt(inputTarget.style.height);
        if (h - ch > inOutMaxHeight - 41) {
          inputTarget.style.height = `${inOutMaxHeight - 41}px`;
          return;
        }

        inputTarget.style.height = `${h - ch}px`;
      },
      () => (inputTarget.style.height = `${inputTargetHeight}px`),
    );
  });
</script>

<div class="h-full min-h-full overflow-auto hidden sm:flex" bind:this={mGroup}>
  <div
    class={"min-w-min [min-height:2.75rem] pr-1"}
    style={`position: relative; width: ${templateWidth}px;`}
    bind:this={templateTarget}
    bind:clientWidth={templateTargetWidth}
    bind:clientHeight={templateTargetHeight}
  >
    <slot name="template" />
    <span bind:this={moveLineWidth} class="sm-max:hidden drag-line-right"
    ></span>
  </div>
  <div
    class="flex-1 grid grow! grid-rows-[auto_1fr] sm:flex-0"
    bind:this={inOutGroup}
    bind:clientHeight={inOutMaxHeight}
  >
    <div
      class={"min-w-min [min-height:2.75rem] pb-1"}
      style={`position: relative; height: ${inputHeight}`}
      bind:this={inputTarget}
      bind:clientHeight={inputTargetHeight}
    >
      <slot name="input" />
      <span bind:this={moveLine} class="drag-line-bottom"></span>
    </div>
    <div class="h-full min-h-full">
      <slot name="output" />
    </div>
  </div>
</div>

<div class="grid grid-rows-[auto_1fr] sm:hidden h-full">
  <div class="flex justify-between text-lg">
    <button
      class={`bg-slate-200 px-2 flex-1 border-r border-slate-400 hover:bg-yellow-200 ${
        selected === "template" ? "bg-slate-400" : ""
      }`}
      on:click={() => (selected = "template")}
    >
      template
    </button>
    <button
      class={`bg-slate-200 px-2 flex-1 border-r border-slate-400 hover:bg-yellow-200 ${
        selected === "input" ? "bg-slate-400" : ""
      }`}
      on:click={() => (selected = "input")}
    >
      input
    </button>
    <button
      class={`bg-slate-200 px-2 flex-1 border-slate-400 hover:bg-yellow-200 ${
        selected === "output" ? "bg-slate-400" : ""
      }`}
      on:click={() => (selected = "output")}
    >
      output
    </button>
  </div>
  <div class="h-full min-h-full overflow-auto relative">
    <span
      class={`absolute h-full w-full ${
        selected == "template" ? "" : "invisible"
      }`}
    >
      <slot name="template" />
    </span>
    <span
      class={`absolute h-full w-full ${selected == "input" ? "" : "invisible"}`}
    >
      <slot name="input" />
    </span>
    <span
      class={`absolute h-full w-full ${
        selected == "output" ? "" : "invisible"
      }`}
    >
      <slot name="output" />
    </span>
  </div>
</div>

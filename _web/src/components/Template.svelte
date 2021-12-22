<script lang="ts">
  import { moveElement } from "@/helper/drag";

  import Code from "@/ui/Code.svelte";
  import { onMount } from "svelte";

  let className = "";
  export { className as class };

  let moveLineWidth: HTMLElement;
  let moveLineHeight: HTMLElement;
  let moveTarget: HTMLElement;

  let moveTargetWidth: number;
  let moveTargetHeight: number;

  let mediaQuery: MediaQueryList;

  onMount(() => {
    moveElement(
      moveLineWidth,
      false,
      (ch: number) => {
        moveTarget.style.width = `${parseInt(moveTarget.style.width) - ch}px`;
      },
      () => (moveTarget.style.width = `${moveTargetWidth}px`)
    );

    moveElement(
      moveLineHeight,
      true,
      (ch: number) => {
        moveTarget.style.height = `${parseInt(moveTarget.style.height) - ch}px`;
      },
      () => (moveTarget.style.height = `${moveTargetHeight}px`)
    );

    mediaQuery = window.matchMedia("(min-width: 640px)");
    mediaQuery.addEventListener("change", (m) => {
      if (m.matches) {
        moveTarget.style.height = null;
        moveTarget.style.width = `${moveTargetWidth}px`;
      } else {
        moveTarget.style.width = null;
        moveTarget.style.height = `${moveTargetHeight}px`;
      }
    });
  });
</script>

<div
  class={`min-w-min [min-height:2.25rem] ${className}`}
  bind:this={moveTarget}
  bind:clientWidth={moveTargetWidth}
  bind:clientHeight={moveTargetHeight}
>
  <Code title="Template" class="sm-max:pb-1 sm:pr-1" watchCode="template" />
  <span bind:this={moveLineWidth} class="sm-max:hidden drag-line-right" />
  <span bind:this={moveLineHeight} class="sm:hidden drag-line-bottom" />
</div>

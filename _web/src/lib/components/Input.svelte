<script lang="ts">
  import { onMount } from "svelte";
  import Code from "@/lib/ui/Code.svelte";
  import { moveElement } from "@/lib/helper/drag";
  import { run } from "@/lib/helper/run";

  let className = "";
  let height = "";
  let maxHeight = 0;
  export { className as class, height, maxHeight };

  let moveLine: HTMLElement;
  let moveTarget: HTMLElement;

  let moveTargetHeight: number;

  onMount(() => {
    moveTarget.style.height = `${moveTarget.getBoundingClientRect().height}px`;
    moveElement(
      moveLine,
      true,
      (ch: number) => {
        const h = parseInt(moveTarget.style.height);
        if (h - ch > maxHeight - 41) {
          moveTarget.style.height = `${maxHeight - 41}px`;
          return;
        }

        moveTarget.style.height = `${h - ch}px`;
      },
      () => (moveTarget.style.height = `${moveTargetHeight}px`)
    );
  });
</script>

<div
  class={`min-w-min [min-height:2.75rem] ${className}`}
  style={`position: relative; height: ${height};`}
  bind:this={moveTarget}
  bind:clientHeight={moveTargetHeight}
>
  <Code
    title="Input [yaml/json]"
    class="pb-1"
    watchCode="input"
    placeholder={"null\n\n# F11 to toggle fullscreen"}
    liveFunc={run}
  />
  <span bind:this={moveLine} class="drag-line-bottom" />
</div>

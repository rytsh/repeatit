<script lang="ts">
  import { moveElement } from "@/lib/helper/drag";

  import Code from "@/lib/ui/Code.svelte";
  import { onMount } from "svelte";

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
  />
  <span bind:this={moveLine} class="drag-line-bottom" />
</div>

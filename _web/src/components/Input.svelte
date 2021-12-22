<script lang="ts">
  import { moveElement } from "@/helper/drag";

  import Code from "@/ui/Code.svelte";
  import { onMount } from "svelte";

  let className = "";
  export { className as class };

  let moveLine: HTMLElement;
  let moveTarget: HTMLElement;

  let moveTargetHeight: number;

  onMount(() => {
    moveElement(
      moveLine,
      true,
      (ch: number) => {
        moveTarget.style.height = `${parseInt(moveTarget.style.height) - ch}px`;
      },
      () => (moveTarget.style.height = `${moveTargetHeight}px`)
    );
  });
</script>

<div
  class={`min-w-min [min-height:2.25rem] ${className}`}
  bind:this={moveTarget}
  bind:clientHeight={moveTargetHeight}
>
  <Code title="Input [yaml/json]" class="pb-1" watchCode="input" />
  <span bind:this={moveLine} class="drag-line-bottom" />
</div>

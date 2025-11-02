<script lang="ts">
  import { IconTypes } from "@/lib/helper/icons";

  type IconTypesString = keyof typeof IconTypes;

  type PosTypes = "left" | "down" | "up" | undefined;

  export let icon: IconTypesString;

  export let height = "24";
  export let width = "24";

  let className: string = undefined;
  export { className as class };
  export let position: PosTypes = undefined;

  const totalClass = [className, position].join(" ");
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={totalClass ? totalClass : undefined}
  {width}
  {height}
  viewBox="0 0 24 24"
>
  <path d={IconTypes[icon]} />
</svg>

<style lang="css">
  .left {
    transform: rotate(180deg);
  }

  .down {
    transform: rotate(90deg);
  }

  .up {
    transform: rotate(-90deg);
  }
</style>

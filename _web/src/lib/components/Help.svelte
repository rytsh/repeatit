<script lang="ts">
    import { showHelp } from "../store";
</script>

<button
  class={["px-3 h-full hover:bg-green-500 hover:text-white",
    $showHelp ? "bg-green-500 text-white hover:bg-red-500" : ""]}
  on:click={() => (showHelp.update((v) => !v))}
  title="Help page"
>
  Help
</button>

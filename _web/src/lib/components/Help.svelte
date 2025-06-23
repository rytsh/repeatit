<script lang="ts">
  let showHelp = false;
</script>

<button
  class="px-3 h-full hover:bg-green-500 hover:text-white"
  on:click={() => (showHelp = !showHelp)}
  title="Help page"
>
  Help
</button>

{#if showHelp}
  <div class="absolute top-0 left-0 w-full h-full bg-white z-50 p-4">
    <h2 class="text-xl font-bold mb-4">Help</h2>
    <p>Here you can find help on how to use the repeatit tool.</p>
    <button
      class="mt-4 px-3 py-1 bg-blue-500 text-white rounded"
      on:click={() => (showHelp = false)}
    >
      Close
    </button>
  </div>
{/if}

<script lang="ts">
  let { children, class: className = "" } = $props();
</script>

<div class={`relative ${className}`}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute top-0 bottom-0 w-5 h-full my-auto text-gray-800 right-1 pointer-events-none"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clip="evenodd"
    />
  </svg>

  {@render children()}
</div>

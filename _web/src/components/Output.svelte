<script lang="ts">
  import Code from "@/ui/Code.svelte";

  export let className = "";
</script>

<div class={className}>
  <Code title="Output" watchCode="output" watchErr={true} />
</div>

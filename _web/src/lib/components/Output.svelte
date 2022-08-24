<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";

  let className = "";
  export { className as class };
</script>

<div class={className}>
  <Code title="Output" watchCode="output" watchErr={true} output={true} />
</div>

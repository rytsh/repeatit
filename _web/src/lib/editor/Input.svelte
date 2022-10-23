<script lang="ts">
  import Code from "@/lib/ui/Code.svelte";
  import { run } from "@/lib/helper/run";
</script>

<Code
  title="Input [yaml/json]"
  watchCode="input"
  placeholder={"null\n\n# F11 to toggle fullscreen"}
  liveFunc={run}
/>

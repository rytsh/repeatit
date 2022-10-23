<script lang="ts">
  import NavBar from "@/lib/components/NavBar.svelte";
  import Options from "@/lib/components/Options.svelte";
  import FootBar from "@/lib/components/FootBar.svelte";
  import { browser } from "$app/environment";
  import View from "@/lib/ui/View.svelte";

  import Template from "@/lib/editor/Template.svelte";
  import Input from "@/lib/editor/Input.svelte";
  import Output from "@/lib/editor/Output.svelte";

  if (browser) {
    import("@/lib/helper/init");
  }
</script>

<div class="h-full w-full grid grid-rows-[auto_1fr_auto]">
  <div>
    <NavBar class="border-b border-neutral-300 flex-shrink-0" />
    <div
      class="border-b border-neutral-300 dark:border-slate-600 flex-shrink-0"
    >
      <Options />
    </div>
  </div>

  <View>
    <span slot="template">
      <Template />
    </span>
    <span slot="input">
      <Input />
    </span>
    <span slot="output">
      <Output />
    </span>
  </View>

  <FootBar />
</div>

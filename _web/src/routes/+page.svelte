<script lang="ts">
  import NavBar from "@/lib/components/NavBar.svelte";
  import Options from "@/lib/components/Options.svelte";
  import FootBar from "@/lib/components/FootBar.svelte";
  import View from "@/lib/ui/View.svelte";

  import Template from "@/lib/editor/Template.svelte";
  import Input from "@/lib/editor/Input.svelte";
  import Output from "@/lib/editor/Output.svelte";

  import { browser } from "$app/environment";

  import { get } from "svelte/store";
  import { location } from "svelte-spa-router";
  import { codes, setConfig } from "@/lib/store";
  import update from "immutability-helper";
  import { runIt } from "@/lib/helper/load";
  import { loadHash, shareURL, shareViewURL } from "@/lib/helper/share";
  import Help from "@/help/Help.svelte";
  import { showHelp } from "@/lib/store";

  let firstLocation = "";
  let hashCode = "";

  const readShare = (vHash: string) => {
    if (!vHash) {
      return;
    }

    const values = loadHash(vHash);
    if (!values) return;

    if (values.config) {
      setConfig(values.config);
    }

    codes.update((v) =>
      update(v, {
        template: { $set: values.template },
        input: { $set: values.input },
        output: { $set: "" },
        trigger: { $set: !v.trigger },
        error: { $set: false },
        success: { $set: false },
      })
    );

    runIt();
  };

  if (browser) {
    import("@/lib/helper/init");

    firstLocation = get(location);
    if (firstLocation.startsWith(shareViewURL)) {
      hashCode = firstLocation.replace(shareViewURL, "");
      readShare(hashCode);
    } else if (firstLocation.startsWith(shareURL)) {
      hashCode = firstLocation.replace(shareURL, "");
      readShare(hashCode);
    }
  }
</script>

<div class="h-full w-full grid grid-rows-[auto_1fr_auto] overflow-auto">
  <div>
    <NavBar class="border-b border-neutral-300 flex-shrink-0" />
    <div
      class="border-b border-neutral-300 dark:border-slate-600 flex-shrink-0"
    >
      <Options />
    </div>
  </div>

  <div class="flex flex-col h-full relative min-h-0 overflow-x-auto">
    <span class={["h-full min-h-full overflow-auto", !$showHelp && "hidden"]}>
      <Help/>
    </span>
    <span class={["h-full", $showHelp && "hidden"]}>
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
    </span>
  </div>

  <FootBar />
</div>

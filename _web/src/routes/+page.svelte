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
  import { codes, setConfig, fullScreenHTML } from "@/lib/store";
  import update from "immutability-helper";
  import { runIt } from "@/lib/helper/load";
  import { loadHash, shareURL, shareViewURL } from "@/lib/helper/share";

  let firstLocation = "";
  let hashCode = "";

  const readShare = (vHash: string, view: boolean) => {
    if (!vHash) {
      return;
    }

    const values = loadHash(vHash);
    if (!values) return;

    if (values.config) {
      values.config.fullScreenHTML = view;

      setConfig(values.config);
    } else {
      fullScreenHTML.set(false);
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
      readShare(hashCode, true);
    } else if (firstLocation.startsWith(shareURL)) {
      hashCode = firstLocation.replace(shareURL, "");
      readShare(hashCode, false);
    } else {
      fullScreenHTML.set(false);
    }
  }
</script>

{#if $fullScreenHTML == true}
  <div class="fixed top-0 left-0 h-full w-full">
    <button
      class="block w-full bg-gray-200 text-right px-2 hover:bg-yellow-200 border-b border-gray-300"
      on:click|stopPropagation={() => ($fullScreenHTML = false)}
    >
      <span>
        <i>repeatit.io</i>
      </span>
    </button>
    <iframe
      seamless
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      srcdoc={$codes.output}
      style="width:100%;height:100%"
      title="view html"
    ></iframe>
  </div>
{:else if $fullScreenHTML == false}
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
{/if}

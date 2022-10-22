<script lang="ts">
  import { get } from "svelte/store";
  import { location, push } from "svelte-spa-router";
  import { codes } from "@/lib/store";
  import update from "immutability-helper";
  import { runIt } from "@/lib/helper/load";
  import { loadHash, saveHash } from "../helper/share";
  import { copyClip } from "../helper/copy";
  import { browser } from "$app/environment";

  const shareURL = "/share/";

  let firstLocation = "";
  let hashCode = "";

  if (browser) {
    firstLocation = get(location);
    if (firstLocation.startsWith(shareURL)) {
      hashCode = firstLocation.replace(shareURL, "");
    }
  }

  const readShare = (vHash: string) => {
    if (!vHash) {
      return;
    }

    const values = loadHash(vHash);
    if (!values) return;

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

  const share = () => {
    const { template, input } = get(codes);
    const hash = saveHash({ template, input });
    push(shareURL + hash);
    const shareLink =
      window.location.origin + window.location.pathname + "#" + shareURL + hash;
    console.log(shareLink);
    copyClip(shareLink);
  };

  $: readShare(hashCode);
</script>

<button
  class="px-2 h-full hover:bg-green-500 hover:text-white"
  on:click={share}
  title="copy share URL"
>
  Share
</button>

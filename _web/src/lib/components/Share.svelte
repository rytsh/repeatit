<script lang="ts">
  import { getLink, shareLink } from "@/lib/helper/share";

  const share = () => {
    const link = getLink(true);
    console.log(link);
    shareLink({
      title: "repeatit - go template playground",
      url: link,
    });
  };
</script>

<button
  class="px-3 h-full hover:bg-green-500 hover:text-white"
  on:click={share}
  title="copy share URL"
>
  Share
</button>

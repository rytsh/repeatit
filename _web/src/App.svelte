<script lang="ts">
  import { onMount } from "svelte";

  import Input from "./components/Input.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Options from "./components/Options.svelte";
  import Output from "./components/Output.svelte";
  import Template from "./components/Template.svelte";
  import FootBar from "./components/FootBar.svelte";

  import "@/helper/init";

  let inputHeight: string;

  let inOutGroup: HTMLElement;
  let inOutMaxHeight: number;

  let mGroup: HTMLElement;
  let mGroupWidth: number;
  let templateWidth = 0;

  onMount(() => {
    inOutMaxHeight = inOutGroup.getBoundingClientRect().height;
    inputHeight = `${inOutMaxHeight / 2}px`;

    mGroupWidth = mGroup.getBoundingClientRect().width;
    if (mGroupWidth > 639) {
      templateWidth = mGroupWidth / 2;
    }
  });
</script>

<div class="h-full w-full grid grid-rows-[auto_1fr_auto]">
  <div>
    <NavBar class="border-b border-gray-300 flex-shrink-0" />
    <div class="border-b border-gray-300 flex-shrink-0">
      <Options />
    </div>
  </div>

  <div
    class="h-full min-h-full overflow-auto flex sm-max:flex-col"
    bind:this={mGroup}
  >
    <Template class="h-full min-h-full overflow-auto" width={templateWidth} />
    <div
      class="flex-1 grid grid-rows-[auto_1fr] sm:flex-0"
      bind:this={inOutGroup}
      bind:clientHeight={inOutMaxHeight}
    >
      <Input
        class="h-full min-h-full"
        height={inputHeight}
        maxHeight={inOutMaxHeight}
      />
      <Output class="h-full min-h-full" />
    </div>
  </div>

  <FootBar />
</div>

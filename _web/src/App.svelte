<script lang="ts">
  import Input from "./components/Input.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Options from "./components/Options.svelte";
  import Output from "./components/Output.svelte";
  import Template from "./components/Template.svelte";
</script>

<div class="h-full w-full flex flex-col">
  <NavBar class="border-b border-gray-300 flex-shrink-0" />
  <div class="border-b border-gray-300 flex-shrink-0">
    <Options />
  </div>

  <div class="flex flex-1 flex-col sm:flex-row">
    <Template class="border-r border-gray-300 sm-max:h-1/2 sm:w-1/2 shrink" />
    <div class="flex flex-col flex-1">
      <Input class="border-r border-gray-300 h-1/2" />
      <Output class="flex-1" />
    </div>
  </div>
</div>

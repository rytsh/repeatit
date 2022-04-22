<script lang="ts">
  import { codeTheme } from "@/store";

  import Icon from "@/ui/Icon.svelte";
  import { onMount } from "svelte";

  let className = "";
  export { className as class };

  let darkMode = false;

  // get theme
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // initial theme
  const themeCheck = () => {
    if (userTheme === "dark" || (userTheme === null && systemTheme)) {
      document.documentElement.classList.add("dark");
      darkMode = true;

      return;
    }

    darkMode = false;
  };

  // set theme
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      darkMode = false;

      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    darkMode = true;
  };

  // set code theme
  const setTheme = (m: boolean) => {
    if (m) {
      codeTheme.set("monokai");
    } else {
      codeTheme.set("default");
    }
  };

  $: setTheme(darkMode);

  onMount(() => {
    themeCheck();
  });
</script>

<button
  on:click|stopPropagation={themeSwitch}
  class={`fill-gray-600 hover:fill-red-400 ${className}`}
>
  <Icon icon={darkMode ? "sun" : "moon"} />
</button>

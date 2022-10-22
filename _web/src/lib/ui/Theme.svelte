<script lang="ts">
  import { onMount } from "svelte";
  import { codeTheme } from "@/lib/store";
  import { browser } from "$app/environment";

  import Icon from "@/lib/ui/Icon.svelte";

  let className = "";
  export { className as class };

  let darkMode = false;

  // get theme
  let userTheme = "";
  let systemTheme = false;

  if (browser) {
    userTheme = localStorage.getItem("theme");
    systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

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
      codeTheme.set("dark");
    } else {
      codeTheme.set("light");
    }
  };

  $: setTheme(darkMode);

  onMount(() => {
    themeCheck();
  });
</script>

<button
  on:click|stopPropagation={themeSwitch}
  class={`fill-gray-600 hover:fill-gray-900 ${className}`}
  title={`${darkMode ? "Light" : "Dark"} mode`}
>
  <Icon icon={darkMode ? "sun" : "moon"} />
</button>

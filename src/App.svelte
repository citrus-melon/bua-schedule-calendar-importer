<script lang="ts">
  import { quadIn } from "svelte/easing";
  import { fly } from "svelte/transition";
  import GoogleLibraries from "./lib/googleLibraries.svelte";
  import PrivacyPage from "./pages/PrivacyPage.svelte";
  import UploadPage from "./pages/UploadPage.svelte";
  import { currentPage } from "./stores";
  
  const routeHash = () => {
    if (window.location.hash === "#privacy") $currentPage = PrivacyPage;
    else $currentPage = UploadPage;
  }
  routeHash();
  window.addEventListener("hashchange", routeHash);
</script>

<GoogleLibraries />

{#key $currentPage}
  <div
    class="wrapper"
    out:fly={{ x: -20, duration: 200, easing: quadIn }}
    in:fly={{ x: 32, delay: 200 }}
  >
    <svelte:component this={$currentPage} />
  </div>
{/key}

<style>
  .wrapper {
    position: absolute;
    overflow: auto;
    padding: 1rem;
    width: 100%;
    height: 100%;
  }
</style>
<script lang="ts">
  import GoogleLibraries from "./googleLibraries.svelte";
  import UploadPage from "./pages/UploadPage.svelte";
  import { currentPage } from "./stores";

  $currentPage = UploadPage;
</script>

<GoogleLibraries />

<svelte:component this={$currentPage} />
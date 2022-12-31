<script lang="ts">
  import { onMount } from "svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import StepDisplay from "../components/StepDisplay.svelte";
  import { gisReady, tokenClient } from "../googleLibraries.svelte";
  import { currentPage } from "../stores";
  import DateRangePage from "./DateRangePage.svelte";
  import SelectCalendarPage from "./SelectCalendarPage.svelte";

  const requestAccessToken = () => {
    //@ts-ignore
    tokenClient.callback = () => $currentPage = SelectCalendarPage;
    tokenClient.requestAccessToken();
  }

  onMount(requestAccessToken);
</script>

<main class="google-auth-page">
  {#if !$gisReady}<LoadingOverlay />{/if}
  <div>
    <StepDisplay currentStep={4} showBackButton={true} on:back={() => $currentPage = DateRangePage} />
    <h1>Grant Permission</h1>
    <p>We need permission to add events to your Google Calendar.</p>
    <p>Look for a Google popup and follow the instructions there!</p>
    <button type="button" on:click={requestAccessToken}>Try Again</button>
  </div>
</main>

<style>
  .google-auth-page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
</style>
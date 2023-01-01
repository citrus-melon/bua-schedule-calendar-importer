<script lang="ts">
  import { onDestroy, onMount } from "svelte";
    import ErrorPage from "../components/ErrorOverlay.svelte";
  import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import StepDisplay from "../components/StepDisplay.svelte";
  import { gisReady, tokenClient } from "../googleLibraries.svelte";
  import { currentPage } from "../stores";
  import DateRangePage from "./DateRangePage.svelte";
  import SelectCalendarPage from "./SelectCalendarPage.svelte";

  let error = false;

  const requestAccessToken = () => {
    //@ts-ignore
    tokenClient.callback = (response: google.accounts.oauth2.TokenResponse) => {
      if (response.error) {
        console.error(`${response.error}: ${response.error_description}`);
        error = true;
      } else {
        $currentPage = SelectCalendarPage;
      }
    }
    tokenClient.requestAccessToken();
  }

  onMount(requestAccessToken);
  
  onDestroy(() => {
    //@ts-ignore
    tokenClient.callback = null;
  });
</script>

{#if error}
  <ErrorPage buttonLabel="Try Again" on:back={() => {error = false; requestAccessToken() }} />
{:else}
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
{/if}

<style>
  .google-auth-page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
</style>
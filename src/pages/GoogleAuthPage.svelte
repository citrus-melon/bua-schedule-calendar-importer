<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
    import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import StepDisplay from "../components/StepDisplay.svelte";
  import { gapiReady, gisReady, tokenClient } from "../google";

  const dispatch = createEventDispatcher<{auth}>();

  onMount(() => {
    //@ts-ignore
    tokenClient.callback = () => dispatch("auth");
    tokenClient.requestAccessToken();
  });
</script>

<main class="google-auth-page">
  {#if !$gisReady}<LoadingOverlay />{/if}
  <div>
    <StepDisplay currentStep={3} showBackButton={true} on:back />
    <h1>Grant Permission</h1>
    <p>We need permission to add events to your Google Calendar.</p>
    <p>Look for a Google popup and follow the instructions there!</p>
    <button type="button" on:click={() => tokenClient.requestAccessToken()}>Try Again</button>
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
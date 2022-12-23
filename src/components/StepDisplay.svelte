<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let currentStep = 0;
  export let stepCount = 4;
  export let showBackButton = false;

  const dispatch = createEventDispatcher<{backButton}>();
</script>

<div class="step-display">
  {#if showBackButton}
    <button type="button" on:click={() => dispatch("backButton")} class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" aria-hidden="true" focusable="false"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      <span class="visually-hidden">Back</span>
    </button>
  {/if}
  <span>Step {currentStep} of {stepCount}</span>
</div>

<style>
  .step-display {
    color: var(--font-gray);
    font-size: 1.25em;
    display: inline-flex;
    align-items: center;
  }

  .back-button {
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    margin-right: 0.5em;
  }

  .back-button svg {
    display: block;
  }
</style>
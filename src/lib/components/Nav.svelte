<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let text = "Back";
  export let showBackButton = true;

  const dispatch = createEventDispatcher<{back}>();
</script>

<div class="nav">
  {#if showBackButton}
    <button type="button" on:click={() => dispatch("back")} class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left" aria-hidden="true" focusable="false"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      <span class="visually-hidden">Back</span>
    </button>
  {/if}
  <span>{text}</span>
</div>

<style>
  .nav {
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

  .back-button:hover {
    outline-color: transparent;
  }

  .back-button svg {
    display: block;
  }
</style>
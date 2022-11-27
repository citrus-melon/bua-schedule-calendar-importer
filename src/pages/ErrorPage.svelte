<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{backButton}>();

  export let title: string = "Something went wrong!";
  export let buttonLabel: string = "Back";
  
</script>

<main class="content">
  <div>
    <h1>{title}</h1>
    <slot></slot>
    <p>Let me know if you found a bug!</p>
    <button type="button" on:click={() => dispatch("backButton")}>{buttonLabel}</button>
  </div>
</main>

<style>
  main {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  button {
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1em;
    background: none;
  }
</style>
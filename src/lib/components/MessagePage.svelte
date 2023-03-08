<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{back}>();

  export let title: string;
  export let buttonLabel: string = "Back";
  
</script>

<main>
  <div>
    <h1>{title}</h1>
    <slot></slot>
    <button type="button" on:click={() => dispatch("back")}>{buttonLabel}</button>
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
</style>
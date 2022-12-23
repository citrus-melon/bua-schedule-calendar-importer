<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{back}>();

  export let title: string = "Something went wrong!";
  export let buttonLabel: string = "Back";
  
</script>

<main class="content">
  <div>
    <h1>{title}</h1>
    <slot></slot>
    <p>Let me know if you found a bug!</p>
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
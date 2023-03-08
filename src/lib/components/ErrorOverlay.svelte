<script lang="ts">
    import { scale } from "svelte/transition";
  import MessagePage from "./MessagePage.svelte";

  export let title: string = "Something went wrong!";
  export let buttonLabel: string = undefined;
</script>

<div class="error-overlay" transition:scale={{ start: 0.9 }}>
  <MessagePage {title} {buttonLabel} on:back>
    <slot></slot>
    <p>Let me know if you found a bug!</p>
  </MessagePage>
</div>

<style>
  .error-overlay {
    background: var(--background);
    position: absolute;
    inset: 0;
    padding: 1em;
    width: 100%;
    min-height: 100%;
  }
</style>
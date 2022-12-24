<script lang="ts">
  import MessagePage from "./MessagePage.svelte";

  export let title: string = "Something went wrong!";
  export let buttonLabel: string = undefined;
</script>

<MessagePage {title} {buttonLabel} on:back>
  <slot></slot>
  <p>Let me know if you found a bug!</p>
</MessagePage>
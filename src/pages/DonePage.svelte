<script>
  import MessageCallout from "../lib/components/MessageCallout.svelte";
  import MessagePage from "../lib/components/MessagePage.svelte";
  import { calendar, currentPage, failedEvents } from "../stores";
  import UploadPage from "./UploadPage.svelte";
</script>

<MessagePage title="All Done!" buttonLabel="Home" on:back={() => $currentPage = UploadPage}>
  <p>Your classes were added to calendar <strong>{$calendar.summary}</strong>.</p>
  {#if $failedEvents.length > 0}
    <p class="failed-events"><MessageCallout variant="error">
      Failed to import events:
      {$failedEvents.map(event => event.title).join(", ")}
    </MessageCallout></p>
  {/if}
</MessagePage>

<style>
  .failed-events {
    max-width: 30em;
    margin: auto;
  }
</style>
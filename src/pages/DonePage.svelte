<script>
  import ErrorMessage from "../components/ErrorMessage.svelte";
import MessagePage from "../components/MessagePage.svelte";
  import { calendar, currentPage, failedEvents } from "../stores";
  import UploadPage from "./UploadPage.svelte";
</script>

<MessagePage title="All Done!" buttonLabel="Home" on:back={() => $currentPage = UploadPage}>
  <p>Your classes were added to calendar <strong>{$calendar.summary}</strong>.</p>
  {#if $failedEvents.length > 0}
    <p class="failed-events"><ErrorMessage>
      Failed to import events:
      {$failedEvents.map(event => event.title).join(", ")}
    </ErrorMessage></p>
  {/if}
</MessagePage>

<style>
  .failed-events {
    max-width: 30em;
    margin: auto;
  }
</style>
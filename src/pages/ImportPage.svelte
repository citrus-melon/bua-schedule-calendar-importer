<script lang="ts">
  import MessageCallout from "../lib/components/MessageCallout.svelte";
  import formatEvent from "../lib/eventFormatter";
  import { calendar, courseEvents, currentPage, dateRange, failedEvents } from "../stores";
  import CancelledPage from "./CancelledPage.svelte";
  import DonePage from "./DonePage.svelte";

  let index = 0;
  $failedEvents = [];

  const loop = async () => {
    for (const event of $courseEvents) {
      try {
        const formattedEvent = formatEvent(event, $dateRange);
        await gapi.client.calendar.events.insert({
          calendarId: $calendar.id,
          resource: formattedEvent,
        });
      } catch (e) {
        console.error(e);
        $failedEvents.push(event);
        $failedEvents = $failedEvents;
      }
      index++;
    }
    $currentPage = DonePage;
  };

  loop();
</script>

<main class="content">
  <div>
    <h1>Importing</h1>
    <p>Adding your classes to calendar <strong>{$calendar.summary}</strong>...</p>
    <progress value={index} max={$courseEvents.length}></progress>
    <div class="below-progress">
      <span>{index}/{$courseEvents.length} ({Math.round(index/$courseEvents.length*100)}%)</span>
      <button on:click={() => $currentPage = CancelledPage}>Cancel</button>
    </div>
    {#if $failedEvents.length > 0}
      <p><MessageCallout variant="error">
        Failed to import events:
        {$failedEvents.map(event => event.title).join(", ")}
      </MessageCallout></p>
    {/if}
  </div>
</main>

<style>
  main {
    min-height: 100%;
    max-width: 60rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .below-progress {
    display: flex;
    justify-content: space-between;
  }

  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    width: 100%;
    height: 2em;
    padding: 0.2em;
  }

  progress {
    border: 1px solid var(--gray);
    margin: 1rem 0;
  }

  progress, progress::-webkit-progress-bar {
    border-radius: 10em;
    background: none;
    overflow: hidden;
  }

  progress::-webkit-progress-value {
    transition: width 1s;
    border-radius: 10em;
    background-color: var(--accent);
  }

  progress::-moz-progress-bar {
    transition: width 1s;
    border-radius: 10em;
    background-color:var(--accent);
  }
</style>
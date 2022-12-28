<script lang="ts">
  import type { Interval } from "luxon";
  import { createEventDispatcher } from "svelte";
  import formatEvent from "../eventFormatter";
  import type { CalendarLike, CourseEvent } from "../types";

  const dispatch = createEventDispatcher<{cancel, done}>();
  export let courseEvents: CourseEvent[];
  export let dateRange: Interval;
  export let calendar: CalendarLike;

  let index = 0;

  const loop = async () => {
    for (const event of courseEvents) {
      const formattedEvent = formatEvent(event, dateRange);
      console.log(formattedEvent);
      await gapi.client.calendar.events.insert({
        calendarId: calendar.id,
        resource: formattedEvent,
      });
      index++;
    }
    dispatch('done');
  };

  loop();
</script>

<main class="content">
  <div>
    <h1>Importing</h1>
    <p>Adding your classes to calendar <strong>{calendar.summary}</strong>...</p>
    <progress value={index} max={courseEvents.length}></progress>
    <div class="below-progress">
      <span>{Math.round(index/courseEvents.length*100)}% ({index}/{courseEvents.length})</span>
      <button on:click={() => dispatch('cancel')}>Cancel</button>
    </div>
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
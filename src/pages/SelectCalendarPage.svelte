<script lang="ts">
  import { createEventDispatcher } from "svelte";
    import LoadingOverlay from "../components/LoadingOverlay.svelte";
  import StepDisplay from "../components/StepDisplay.svelte";
  import { gapiReady } from "../googleLibraries.svelte";
    import type { CalendarLike } from "../types";

  const dispatch = createEventDispatcher<{select: CalendarLike}>();

  let loading = true;
  let calendars: gapi.client.calendar.CalendarListEntry[] = [];
  let selectedCalendar: gapi.client.calendar.CalendarListEntry = null;
  let newCalendarName = "Classes";

  $: if ($gapiReady) {
    gapi.client.calendar.calendarList.list().then((response) => {
      calendars = response.result.items.filter(
        (calendar) => calendar.accessRole === "writer" || calendar.accessRole === "owner"
      );
      loading = false;
    });
  }

  const confirm = () => {
    if (selectedCalendar === null) {
      loading = true;
      gapi.client.calendar.calendars.insert({
        summary: newCalendarName || "Classes",
        description: "Created with Maxwell Yu's BUA Schedule → Google Calendar Importer",
        timeZone: "America/New_York",
        location: "1 University Rd, Boston, MA 02215",
      }).then((response) => {
        dispatch("select", response.result);
      });
    } else {
      dispatch("select", selectedCalendar);
    }
  }
</script>

<main class="select-calendar-page">
  <StepDisplay currentStep={5} showBackButton={true} on:back />
  <h1>Select a Calendar</h1>
  <p>Which calendar would you like your classes added to?</p>
  <p>I recommend creating a new calendar so that you will be able to manage your classes (show/hide, change color) seperately from your other events.</p>
  
  <label class="option" class:selected={selectedCalendar === null}>
    <input type="radio" bind:group={selectedCalendar} value={null} name="calendar" checked>
    Create New
  </label>
  <div class="create-new-options">
    <label>
      Name:
      <input type="text" bind:value={newCalendarName} placeholder="Classes">
    </label>
  </div>

  {#each calendars as calendar}
    <label class="option" class:selected={selectedCalendar === calendar}>
      <input type="radio" bind:group={selectedCalendar} value={calendar}>
      {calendar.summary}
    </label>
  {/each}

  <div class="button-footer">
    <button class="primary" on:click={confirm}>Import!</button>
  </div>

  {#if loading}
    <LoadingOverlay />
  {/if}
</main>

<style>
  .select-calendar-page {
    margin: auto;
    max-width: 60em;
  }

  .create-new-options {
    margin-left: 2.5rem;
    margin-bottom: 1rem;
  }

  .option {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--gray);
    border-radius: 1rem;
    margin-bottom: 1rem;
    transition: 0.3s background-color, 0.3s border-color;
  }

  .option.selected {
    background-color: var(--accent-transparent);
    border-color: var(--accent);
    color: var(--accent);
    font-weight: bold;
  }

  input[type="radio"] {
    appearance: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    margin-right: 0.5em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    display: grid;
    place-content: center;
  }

  input[type="radio"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 0.3s transform;
    box-shadow: inset 1em 1em currentColor;
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  .button-footer {
    text-align: right;
  }
</style>
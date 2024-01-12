<script lang="ts">
  import ErrorOverlay from "../lib/components/ErrorOverlay.svelte";
  import LoadingOverlay from "../lib/components/LoadingOverlay.svelte";
  import StepCountNav from "../lib/components/StepCountNav.svelte";
  import { gapiReady } from "../lib/googleLibraries.svelte";
  import { calendar, currentPage } from "../stores";
  import GoogleAuthPage from "./GoogleAuthPage.svelte";
  import ImportPage from "./ImportPage.svelte";

  let loading = true;
  let error: "list" | "create" = null;
  let calendars: gapi.client.calendar.CalendarListEntry[] = [];
  let selectedCalendar: gapi.client.calendar.CalendarListEntry = null;
  let newCalendarName = "Classes";

  $: if ($gapiReady && error === null) {
    gapi.client.calendar.calendarList.list().then((response) => {
      calendars = response.result.items.filter(
        (calendar) => calendar.accessRole === "writer" || calendar.accessRole === "owner"
      );
      loading = false
    }).catch((e) => {
      console.error(e);
      error = "list";
      loading = false
    });
  }

  const confirm = () => {
    if (selectedCalendar === null) {
      loading = true;
      gapi.client.calendar.calendars.insert({
        summary: newCalendarName || "Classes",
        description: `Created with BUA Schedule → Google Calendar Importer by Maxwell Yu
${window.location.toString()}`,
        timeZone: "America/New_York",
        location: "1 University Rd, Boston, MA 02215",
      }).then((response) => {
        $calendar = response.result;
        $currentPage = ImportPage;
      }).catch((e) => {
        console.error(e);
        error = "create";
        loading = false;
      });
    } else {
      $calendar = selectedCalendar;
      $currentPage = ImportPage;
    }
  }
</script>

{#if error === "list"}
  <ErrorOverlay buttonLabel="Try Again" on:back={() => error = null}>
    <p>Failed to load calendars.</p>
  </ErrorOverlay>
{:else if error === "create"}
  <ErrorOverlay on:back={() => error = null}>
    <p>Failed to create calendar.</p>
  </ErrorOverlay>
{:else}
  <main class="select-calendar-page">
    <StepCountNav currentStep={5} on:back={() => $currentPage = GoogleAuthPage} />
    <h1>Select a Calendar</h1>
    <div class="instructions">
      <p>Which calendar would you like your classes added to?</p>
      <p>I recommend creating a new calendar so that you will be able to manage your classes (show/hide, change color) seperately from your other events.</p>
    </div>
    
    <form on:submit|preventDefault={confirm}>
      <label class="option" class:selected={selectedCalendar === null}>
        <input type="radio" name="calendar" bind:group={selectedCalendar} value={null} checked>
        Create New (Recommended)
      </label>
      <div class="create-new-options">
        <label>
          Name:
          <input type="text" bind:value={newCalendarName} placeholder="Classes">
        </label>
      </div>
  
      {#each calendars as calendar}
        <label class="option" class:selected={selectedCalendar === calendar}>
          <input type="radio" name="calendar" bind:group={selectedCalendar} value={calendar}>
          {calendar.summary}
        </label>
      {/each}

      <div class="button-footer">
        <button type="submit" class="primary">Import!</button>
      </div>
    </form>

    {#if loading}
      <LoadingOverlay />
    {/if}
  </main>
{/if}

<style>
  .select-calendar-page {
    margin: auto;
    max-width: 60em;
  }

  .instructions {
    margin-bottom: 2em;
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

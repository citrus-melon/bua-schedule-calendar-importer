<script lang="ts">
  import { DateTime, Interval } from "luxon";
  import { createEventDispatcher } from "svelte";
  import StepDisplay from "../components/StepDisplay.svelte";
  import validityMessage from "../customValidity";

  const dispatch = createEventDispatcher<{set: Interval}>();

  let startString = import.meta.env.VITE_DEFAULT_START_DATE;
  let endString = import.meta.env.VITE_DEFAULT_END_DATE;

  $: start = DateTime.fromISO(startString, { zone: "America/New_York" });
  $: end = DateTime.fromISO(endString, { zone: "America/New_York" });

  const getValidityMsg = (date: DateTime) => {
    if (!date.isValid) return "Please enter a valid date";
    else if (start > end) return "Start date must be before end date";
    else return "";
  }

  const onSubmit = () => {
    if (!start.isValid || !end.isValid) alert("Please enter valid dates");
    else if (start > end) alert("Start date must be before end date");
    else dispatch("set", Interval.fromDateTimes(start, end));
  }
</script>

<main>
  <div>
    <StepDisplay currentStep={3} showBackButton={true} on:back />
    <h1>Set a Date Range</h1>
    <p>Set a start and end date for your classes:</p>
    <form on:submit|preventDefault={onSubmit}>
      <label>
        From
        <input type="date" bind:value={startString} use:validityMessage={getValidityMsg(start)} />
        (inclusive)
      </label>
      <label>
        to
        <input type="date" bind:value={endString} use:validityMessage={getValidityMsg(end)} />
        (exclusive)
      </label>
      <button type="submit" class="primary">Set</button>
    </form>
  </div>
</main>

<style>
  main {
    min-height: 100%;
    display: grid;
    place-items: center;
  }

  button {
    display: block;
    margin-top: 1em;
    margin-left: auto;
  }


</style>
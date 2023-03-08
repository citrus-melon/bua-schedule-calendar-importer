<script lang="ts">
  import { Info } from "luxon";
  import StepDisplay from "../lib/components/StepDisplay.svelte";
  import { courseEvents, currentPage } from "../stores";
  import DateRangePage from "./DateRangePage.svelte";
  import UploadPage from "./UploadPage.svelte";
</script>

<div class="confirm-info-page">
  <div class="scrollable">
    <header>
      <StepDisplay currentStep={2} showBackButton={true} on:back={() => $currentPage = UploadPage} />
      <h1>Confirm Your Info</h1>
      <p>Make sure everything looks right!</p>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Day</th>
            <th>Block</th>
            <th>Time</th>
            <th>Room</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {#each $courseEvents as courseEvent}
          <tr>
            <td>{courseEvent.title}</td>
            <td>{Info.weekdays()[courseEvent.day - 1]}</td>
            <td>{courseEvent.block}</td>
            <td>{courseEvent.startTime.toString()} - {courseEvent.endTime.toString()}</td>
            <td>{courseEvent.room ?? "N/A"}</td>
            <td>{courseEvent.teacher ?? "N/A"}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </main>
  </div>
  <div class="next-footer">
    <button class="primary" on:click={() => $currentPage = DateRangePage}>Next</button>
  </div>
</div>

<style>
  .confirm-info-page {
    margin: auto;
    max-width: 70em;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .scrollable {
    flex: 1;
    overflow-y: auto;
    padding-right: 1em;
  }

  .next-footer {
    padding-top: 1em;
    text-align: right;
  }

  table {
    border-spacing: 0;
    position: relative;
    width: 100%;
    min-width: 40em;
  }

  td, th {
    padding: 1em;
    border-bottom: 1px solid var(--gray);
  }
  tr:last-child td {
    border-bottom: none;
  }

  th {
    text-align: left;
    background: var(--background);
    position: sticky;
    top: -0.5px;
  }
</style>
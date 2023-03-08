<script lang="ts">
import StepDisplay from "../components/StepDisplay.svelte";
import PdfUpload from "../components/PdfUpload.svelte";
import parsePDF from "../pdfParser";
import LoadingOverlay from "../components/LoadingOverlay.svelte";
import { courseEvents, currentPage } from "../stores";
import ConfirmInfoPage from "./ConfirmInfoPage.svelte";
import ErrorOverlay from "../components/ErrorOverlay.svelte";
import { scale } from "svelte/transition";

let loading = false;
let error: Error = null;

const onUpload = async (e: CustomEvent<File>) => {
  loading = true;
  const file = e.detail;
  try {
    const pdfCourseEvents = await parsePDF(file);
    if (pdfCourseEvents.length === 0) {
      throw new Error("No course events found in PDF");
    }
    $courseEvents = pdfCourseEvents;
    $currentPage = ConfirmInfoPage;
  } catch (e) {
    console.error(e);
    error = e;
  }
  loading = false;
};
</script>

{#if error}
  <ErrorOverlay on:back={() => error = null}>
    <p>Are you sure that's a BUA PDF schedule?</p>
  </ErrorOverlay>
{:else}
  <div class="welcome-page">
    <main class="content">
      <div>
        <StepDisplay currentStep={1} />
        <h1>Welcome</h1>
        <div class="instructions">
          <p>Upload your PDF schedule to get started!</p>
          <p>You can find it in the <a href="https://buacademyportal.goradius.com/buacademy#/documents" target="_blank">student portal</a>.</p>
        </div>
        <PdfUpload on:upload={onUpload} />
      </div>
    </main>
    <footer class="footer">
      <p>BUA Schedule → Google Calendar Importer by <a href="https://citrusmelon.dev">Maxwell Yu</a></p>
    </footer>
    {#if loading}<LoadingOverlay />{/if}
  </div>
{/if}

<style>
  .welcome-page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: auto;
    align-items: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .instructions {
    margin-bottom: 2em;
  }
</style>
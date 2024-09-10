<script lang="ts">
  import ErrorMessage from "../lib/components/ErrorMessage.svelte";
import ErrorOverlay from "../lib/components/ErrorOverlay.svelte";
  import LoadingOverlay from "../lib/components/LoadingOverlay.svelte";
  import PdfUpload from "../lib/components/PdfUpload.svelte";
  import StepCountNav from "../lib/components/StepCountNav.svelte";
  import parsePDF from "../lib/pdfParser";
  import { courseEvents, currentPage } from "../stores";
  import ConfirmInfoPage from "./ConfirmInfoPage.svelte";

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
    <pre>{error.message}</pre>
    <p>Are you sure that's a BUA schedule?</p>
    <p>Make sure you clicked the "Print to PDF" button in the top right of the page, not your browser's print function.</p>
  </ErrorOverlay>
{:else}
  <div class="welcome-page">
    <main class="content">
      <div>
        <StepCountNav currentStep={1} showBackButton={false} />
        <h1>Welcome</h1>
        <div class="instructions">
          <p>Open your schedule to get started!</p>
          <p>You can find it in the <a href="https://portals.veracross.com/buacademy/student/student/overview" target="_blank">student portal</a> under "Reports".</p>
          <p>Click on "PDF" in the top right of your schedule to download it, then open it here.</p>
        </div>
        <PdfUpload on:upload={onUpload} />
      </div>
    </main>
    <footer class="footer">
      <p>BUA Schedule → Google Calendar Importer by <a href="https://citrusmelon.dev">Maxwell Yu</a> | <a href="#privacy">Privacy</a></p>
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
    max-width: 25em;
  }
</style>
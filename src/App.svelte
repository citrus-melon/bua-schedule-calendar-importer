<script lang="ts">
  import ConfirmInfoPage from "./pages/ConfirmInfoPage.svelte";
import ErrorPage from "./pages/ErrorPage.svelte";
  import WelcomePage from "./pages/WelcomePage.svelte";
  import parsePDF from "./pdfParser";
  import type { CourseEvent } from "./types";

  enum Step {
    Welcome,
    PdfLoading,
    PdfError,
    ConfirmInfo,
  };

  let courseEvents: CourseEvent[] = [];
  let currentStep: Step = Step.Welcome;

  const handleUpload = async (e: CustomEvent<File>) => {
    const file = e.detail;
    try {
      courseEvents = await parsePDF(file);
      if (courseEvents.length === 0) {
        throw new Error("No course events found in PDF");
      }
      
      currentStep = Step.ConfirmInfo;
    } catch (error) {
      currentStep = Step.PdfError;
      console.error(error);
    }
  };
</script>

{#if currentStep === Step.Welcome}
<WelcomePage on:upload={handleUpload} />
{/if}

{#if currentStep === Step.PdfError}
<ErrorPage title="Something went wrong" on:back={() => currentStep = Step.Welcome}>
  <p>Are you sure that's a BUA PDF schedule?</p>
</ErrorPage>
{/if}

{#if currentStep === Step.ConfirmInfo}
<ConfirmInfoPage bind:courseEvents={courseEvents} on:back={() => currentStep = Step.Welcome} />
{/if}
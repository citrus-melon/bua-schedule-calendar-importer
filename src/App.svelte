<script lang="ts">
  import EditInfoPage from "./pages/EditInfoPage.svelte";
import ErrorPage from "./pages/ErrorPage.svelte";
  import WelcomePage from "./pages/WelcomePage.svelte";
  import parsePDF from "./pdfParser";
  import type { CourseEvent } from "./types";

  enum Step {
    Welcome,
    PdfLoading,
    PdfError,
    EditInfo,
  };

  let courseEvents: CourseEvent[] = [];
  let currentStep: Step = Step.EditInfo;

  const handleUpload = async (e: CustomEvent<File>) => {
    const file = e.detail;
    try {
      courseEvents = await parsePDF(file);
      if (courseEvents.length === 0) {
        throw new Error("No course events found in PDF");
      }
      
      currentStep = Step.EditInfo;
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
<ErrorPage title="Something went wrong" on:backButton={() => currentStep = Step.Welcome}>
  <p>Are you sure that's a BUA PDF schedule?</p>
</ErrorPage>
{/if}

{#if currentStep === Step.EditInfo}
<EditInfoPage on:backButton={() => currentStep = Step.Welcome} />
{/if}
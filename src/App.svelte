<script lang="ts">
  import ErrorPage from "./pages/ErrorPage.svelte";
  import WelcomePage from "./pages/WelcomePage.svelte";
  import parsePDF from "./pdfParser";
  import type { CourseEvent } from "./types";

  enum Step {
    Welcome,
    PdfLoading,
    PdfError,
    EditCourses,
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
      
      currentStep = Step.EditCourses;
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

{#if currentStep === Step.EditCourses}
<h1>Placeholder</h1>
<p>You would be able to manually edit your schedule info here!</p>
{/if}
<svelte:head>
  <script src="https://apis.google.com/js/api.js" on:load={onGapiLoaded}></script>
  <script src="https://accounts.google.com/gsi/client" on:load={onGisLoaded}></script>
</svelte:head>

<script lang="ts">
  import ConfirmInfoPage from "./pages/ConfirmInfoPage.svelte";
  import ErrorPage from "./pages/ErrorPage.svelte";
  import GoogleAuthPage from "./pages/GoogleAuthPage.svelte";
  import UploadPage from "./pages/UploadPage.svelte";
  import { onGisLoaded, onGapiLoaded } from "./google";
  import type { CourseEvent } from "./types";

  enum Step {
    Upload,
    PdfLoading,
    PdfError,
    ConfirmInfo,
    GoogleAuth,
    SelectCalendar,
  };

  let courseEvents: CourseEvent[] = [];
  let currentStep: Step = Step.Upload;
</script>

{#if currentStep === Step.Upload}
<UploadPage
  on:upload={(e) => courseEvents = e.detail}
  on:error={() => currentStep = Step.PdfError}
/>
{/if}

{#if currentStep === Step.PdfError}
<ErrorPage title="Something went wrong" on:back={() => currentStep = Step.Upload}>
  <p>Are you sure that's a BUA PDF schedule?</p>
</ErrorPage>
{/if}

{#if currentStep === Step.ConfirmInfo}
<ConfirmInfoPage
  bind:courseEvents={courseEvents}
  on:back={() => currentStep = Step.Upload}
  on:next={() => currentStep = Step.GoogleAuth}
/>
{/if}

{#if currentStep === Step.GoogleAuth}
<GoogleAuthPage
  on:back={() => currentStep = Step.ConfirmInfo}
  on:next={() => currentStep = Step.SelectCalendar}
/>
{/if}

{#if currentStep === Step.SelectCalendar}
<p>TODO: Select Calendar Page</p>
{/if}
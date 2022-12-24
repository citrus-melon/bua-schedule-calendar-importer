<GoogleLibraries />

<script lang="ts">
  import ConfirmInfoPage from "./pages/ConfirmInfoPage.svelte";
  import ErrorPage from "./pages/ErrorPage.svelte";
  import GoogleAuthPage from "./pages/GoogleAuthPage.svelte";
  import UploadPage from "./pages/UploadPage.svelte";
  import type { CalendarLike, CourseEvent } from "./types";
  import SelectCalendarPage from "./pages/SelectCalendarPage.svelte";
    import ImportPage from "./pages/ImportPage.svelte";
    import MessagePage from "./pages/MessagePage.svelte";
    import GoogleLibraries from "./googleLibraries.svelte";

  enum Step {
    Upload,
    PdfError,
    ConfirmInfo,
    GoogleAuth,
    SelectCalendar,
    Import,
    Cancelled,
    Done,
  };

  let courseEvents: CourseEvent[] = [];
  let currentStep: Step = Step.Upload;
  let calendar: CalendarLike;
</script>

{#if currentStep === Step.Upload}
<UploadPage
  on:parse={(e) => {courseEvents = e.detail; currentStep = Step.ConfirmInfo}}
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
  {courseEvents}
  on:back={() => currentStep = Step.Upload}
  on:confirm={() => currentStep = Step.GoogleAuth}
/>
{/if}

{#if currentStep === Step.GoogleAuth}
<GoogleAuthPage
  on:back={() => currentStep = Step.ConfirmInfo}
  on:auth={() => currentStep = Step.SelectCalendar}
/>
{/if}

{#if currentStep === Step.SelectCalendar}
<SelectCalendarPage
  on:back={() => currentStep = Step.GoogleAuth}
  on:select={(e) => {calendar = e.detail; currentStep = Step.Import}}
/>
{/if}

{#if currentStep === Step.Import}
<ImportPage
  {courseEvents}
  {calendar}
  on:cancel={() => currentStep = Step.Cancelled}
  on:done={() => currentStep = Step.Done}
/>
{/if}

{#if currentStep === Step.Cancelled}
<MessagePage title="Cancelled" on:back={() => currentStep = Step.ConfirmInfo}>
  <p>You can manually remove any added events in Google Calendar.</p>
</MessagePage>
{/if}

{#if currentStep === Step.Done}
<MessagePage title="All Done!" buttonLabel="Home" on:back={() => currentStep = Step.Upload}>
  <p>Your classes were added to calendar <strong>{calendar.summary}</strong>.</p>
</MessagePage>
{/if}
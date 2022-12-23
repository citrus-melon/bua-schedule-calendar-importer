<script lang="ts">
import StepDisplay from "../components/StepDisplay.svelte";
import PdfUpload from "../components/PdfUpload.svelte";
import { createEventDispatcher } from "svelte";
import parsePDF from "../pdfParser";
import type { CourseEvent } from "../types";

const dispatch = createEventDispatcher<{parse: CourseEvent[], error: Error}>();

const onUpload = async (e: CustomEvent<File>) => {
  const file = e.detail;
  try {
    const courseEvents = await parsePDF(file);
    if (courseEvents.length === 0) {
      throw new Error("No course events found in PDF");
    }
    dispatch("parse", courseEvents);
  } catch (error) {
    console.error(error);
    dispatch("error", error);
  }
};
</script>

<div class="welcome-page">
  <main class="content">
    <div>
      <StepDisplay currentStep={1} />
      <h1>Welcome</h1>
      <p>Upload your PDF schedule to get started!</p>
      <p>You can find it in the <a href="https://buacademyportal.goradius.com/buacademy#/documents" target="_blank">student portal</a>.</p>
      <PdfUpload on:upload={onUpload} />
    </div>
  </main>
  <footer class="footer">
    <p>BUA Schedule → Google Calendar Importer by <a href="https://citrusmelon.dev">Maxwell Yu</a></p>
  </footer>
</div>

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
</style>
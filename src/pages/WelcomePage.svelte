<script>
  import PdfUpload from "../PdfUpload.svelte";
</script>

<div class="welcome-page">
  <main class="content">
    <div>
      <span class="step-count">Step 1 of 4</span>
      <h1>Welcome</h1>
      <p>Upload your PDF schedule to get started!</p>
      <p>You can find it in the <a href="https://buacademyportal.goradius.com/buacademy#/documents" target="_blank">student portal</a>.</p>
      <PdfUpload />
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

  .step-count {
    color: var(--gray);
    font-size: 1.25em;
  }
</style>
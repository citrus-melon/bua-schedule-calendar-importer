<script lang="ts">
  import parsePdf, { getRelevantContent } from "./pdfParser";

  let files: FileList;

  const test = async () => {
    console.log(await getRelevantContent(files[0]));
    console.log(await parsePdf(files[0]));
  }
  $: if (files?.length === 1) test();
</script>

<main>
  <input type="file" accept=".pdf" bind:files>
  {files ? "yes" : "no"}
</main>

<style>

</style>
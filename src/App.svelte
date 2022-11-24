<script lang="ts">
  import parsePdf from "./pdfParser";

  let files: FileList;

  const test = async () => {
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
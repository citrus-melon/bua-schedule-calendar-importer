<script lang="ts">
  import parsePdf from "./pdfParser";
  
  let files: FileList;

  const test = async () => {
    console.log(await parsePdf(files[0]));
  }
  $: if (files?.length === 1) test();
</script>
  
<div class="box">
  <h2>Drop your PDF here!</h2>
  <label>
    <input type="file" accept=".pdf" class="visually-hidden" bind:files>
    Or Browse
  </label>
</div>

<style>
  .box {
    border: 2px dashed #ccc;
    border-radius: 1rem;
    text-align: center;
    padding: 3rem;
  }

  label {
    display: inline-block;
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>

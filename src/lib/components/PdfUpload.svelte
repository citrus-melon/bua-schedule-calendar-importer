<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { quadOut } from "svelte/easing";

  const dispatch = createEventDispatcher<{upload: File}>();
  
  let files: FileList;

  let dragging = false;
  let lastDropTarget = null;

  $: if (files) {
    dispatch("upload", files[0]);
  }

  const handleDragEnter = (e: DragEvent) => {
    if (e.dataTransfer.types.includes("Files")) {
      lastDropTarget = e.target;
      dragging = true;
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent) => {
    if (e.target === lastDropTarget || e.target === document) {
      dragging = false;
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    dragging = false;
    files = e.dataTransfer.files;
  };
</script>
  
<div class="box">
  <h2>Drop your PDF here!</h2>
  <input type="file" accept=".pdf" class="visually-hidden" id="file" bind:files>
  <label class="button" for="file">Or Browse</label>
</div>

<svelte:window
  on:dragenter={handleDragEnter}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
/>

{#if dragging}
  <div class="drop-overlay" transition:fade={{duration: 200, easing: quadOut}}>
    <h1>Drop anywhere!</h1>
  </div>
{/if}

<style>
  .box {
    border: 2px dashed var(--gray);
    border-radius: 1rem;
    text-align: center;
    padding: 3rem;
  }

  .drop-overlay {
    display: grid;
    place-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: var(--accent);
    color: white;
    opacity: 80%;
  }

  input:focus + label {
    outline-color: var(--accent);
    color: var(--accent);
  }
</style>

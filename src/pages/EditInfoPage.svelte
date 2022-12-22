<script lang="ts">
  import StepDisplay from "../components/StepDisplay.svelte";
</script>

<div class="edit-info-page">
  <StepDisplay currentStep={2} showBackButton={true} on:backButton />
  <h1>Edit Your Info</h1>
  <p>Make sure everything looks right!</p>
</div>

<style>
  .edit-info-page {
    margin: auto;
    max-width: 60em;
  }
</style>
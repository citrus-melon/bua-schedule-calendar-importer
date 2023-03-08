<script lang="ts">
  import Nav from "./Nav.svelte";

  export let currentStep = 0;
  export let totalSteps = 5;
  export let showBackButton = undefined;
</script>

<Nav text="Step {currentStep} of {totalSteps}" {showBackButton} on:back />
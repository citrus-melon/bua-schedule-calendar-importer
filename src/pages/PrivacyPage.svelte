<script lang="ts">
  import Nav from "../lib/components/Nav.svelte";
</script>
<main>
  <Nav on:back={() => window.location.hash="#"}/>
  <h1>Privacy Policy</h1>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto necessitatibus debitis libero modi facere voluptatum, quae est corporis autem pariatur possimus repellat minima harum, exercitationem distinctio molestiae velit, porro itaque.</p>
</main>

<style>
  main {
    margin: auto;
    max-width: 60em;
  }
</style>

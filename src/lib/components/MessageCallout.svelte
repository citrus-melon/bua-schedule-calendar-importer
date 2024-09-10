<script lang="ts">
  export let variant: null | 'error' = null;
</script>

<div class="box" class:error={variant === 'error'}>
  <slot>Something went wrong!</slot>
</div>

<style>
.box {
  border: 1px solid var(--gray);
  padding: 0.5rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
}

.error {
  border-color: red;
  color: red;
  background: #FF000022;
}
</style>
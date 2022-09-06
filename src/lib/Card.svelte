<script lang="ts">
  export let elevated: boolean = false;
  export let small: boolean = false;
</script>

<div class="card" class:elevated class:small>
  <slot />
</div>

<style>
  .card {
    @apply relative;
    @apply bg-surface text-on-surface;
    @apply shadow-lg;
    @apply rounded-xl;
    @apply p-8;
    @apply flex-1;
  }
  .small {
    @apply rounded-lg;
    @apply p-4;
  }
  .elevated {
    @apply shadow-2xl;
  }
</style>

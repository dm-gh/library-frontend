<script lang="ts">
  export let dummy: boolean = false;
</script>

{#if dummy}
  <div class="button">
    <slot />
  </div>
{:else}
  <button class="button" on:click>
    <slot />
  </button>
{/if}

<style>
  .button {
    @apply flex-1;
    @apply flex items-center;
    @apply bg-primary font-sans text-on-primary;
    @apply rounded-lg;
    @apply p-2;
  }
</style>

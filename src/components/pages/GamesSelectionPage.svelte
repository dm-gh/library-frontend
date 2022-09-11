<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let gameShortcuts: {
    Component: SvelteComponent;
    href: string;
  }[] = [];
</script>

<div class="flex flex-100 columns-3 items-center justify-center gap-12">
  {#each gameShortcuts as { Component, href }}
    <svelte:component this={Component} {href} />
  {/each}
</div>

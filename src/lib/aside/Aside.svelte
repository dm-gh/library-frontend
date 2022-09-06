<script lang="ts">
  import { fade } from 'svelte/transition';
  import Card from '../Card.svelte';
  import Button from '../Button.svelte';
  import ArrowLeftIcon from '../icons/ArrowLeftIcon.svelte';
  import AppsIcon from '../icons/AppsIcon.svelte';
  import AsideLink from './AsideLink.svelte';
  import WindowSectionIcon from '../icons/WindowSectionIcon.svelte';
  import AlignJustifyIcon from '../icons/AlignJustifyIcon.svelte';

  let collapsed: boolean = false;
</script>

<aside class="aside" class:collapsed>
  <Card small>
    <div class="flex h-full flex-col items-stretch">
      <div class="flex flex-100 flex-col items-stretch">
        <div class="mb-2">
          <AsideLink to="irregular" {collapsed} icon={WindowSectionIcon}>Irregular</AsideLink>
        </div>
        <div class="mb-2">
          <AsideLink to="individual" {collapsed} icon={AppsIcon}>Individual</AsideLink>
        </div>
        <div class="mb-2">
          <AsideLink to="normal" {collapsed} icon={AlignJustifyIcon}>Normal</AsideLink>
        </div>
      </div>
      <div class="flex flex-col items-stretch">
        <Button on:click={() => (collapsed = !collapsed)}>
          <div class="arrow-icon" class:collapsed>
            <ArrowLeftIcon />
          </div>
          {#if !collapsed}
            <span in:fade class="flex-1">Close</span>
          {/if}
        </Button>
      </div>
    </div>
  </Card>
</aside>

<style>
  .aside {
    @apply flex h-full;
  }
  .aside:not(.collapsed) {
    @apply w-64;
  }

  .arrow-icon {
    @apply rotate-0 transition-transform;
  }
  .arrow-icon.collapsed {
    @apply rotate-180;
  }
</style>

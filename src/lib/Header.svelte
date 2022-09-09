<script lang="ts">
  import ExternalLinkAltIcon from './icons/ExternalLinkAltIcon.svelte';
  import { interactive } from '../util/interactive';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import type { SvelteComponent } from 'svelte';
  import { navigate } from '../state/currentLocation.js';

  export let navLinks: {
    Icon: SvelteComponent;
    href: string;
    title: string;
  }[] = [];

  export let activeHref: string = '';

  const editHref = import.meta.env.PUBLIC_BACKEND_BASE_URL + '/admin';
</script>

<aside class="aside">
  <div class="flex">
    {#each navLinks as { Icon, href, title }}
      <div class="mr-2">
        <a
          {href}
          use:interactive
          on:interact={() => navigate(href)}
          class="btn-secondary"
          class:linkActive={activeHref === href}
        >
          <svelte:component this={Icon} />
          <span class="mx-2">{title}</span>
        </a>
      </div>
    {/each}
  </div>
  <div class="flex items-center">
    <div class="mr-2">
      <ThemeSwitch />
    </div>
    <a href={editHref} target="_blank" class="btn-primary">
      <ExternalLinkAltIcon />
      <span class="mx-2">Редактировать</span>
    </a>
  </div>
</aside>

<style>
  .linkActive {
    @apply text-primary;
  }
  .aside {
    @apply flex w-full justify-between;
  }
</style>

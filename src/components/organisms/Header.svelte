<script lang="ts">
  import ExternalLinkAltIcon from '../atoms/ExternalLinkAltIcon.svelte';
  import { interactive } from '../../util/interactive';
  import ThemeSwitch from './ThemeSwitch.svelte';
  import type { SvelteComponent } from 'svelte';
  import { navigate } from '../../state/currentLocation.js';
  import { clickOutside } from '../../util/clickOutside';

  export let navLinks: {
    Icon: SvelteComponent;
    href: string;
    title: string;
  }[] = [];

  export let activeHref: string = '';

  $: isActive = (href: string) =>
    activeHref.split('/').filter(Boolean)[0] === href.split('/').filter(Boolean)[0];

  $: activeNavLink = navLinks.find(link => isActive(link.href));

  let navLinksOpened = false;

  const editHref = import.meta.env.PUBLIC_BACKEND_BASE_URL + '/admin';
</script>

<header class="header">
  <div class="relative flex">
    <div class="btn-group">
      <button use:interactive on:interact={() => (navLinksOpened = true)} class="btn-secondary">
        <svelte:component this={activeNavLink.Icon} />
        <span class="mx-2">{activeNavLink.title}</span>
      </button>
    </div>
    {#if navLinksOpened}
      <div
        class="btn-group absolute top-0 left-0 z-50 flex-col"
        use:clickOutside
        on:clickOutside={() => (navLinksOpened = false)}
      >
        {#each navLinks as { Icon, href, title }}
          {@const active = isActive(href)}
          <div class:order-0={active} class:order-1={!active}>
            <a
              {href}
              use:interactive
              on:interact={() => {
                navLinksOpened = false;
                navigate(href);
              }}
              class="btn-secondary"
            >
              <svelte:component this={Icon} />
              <span class="mx-2">{title}</span>
            </a>
          </div>
        {/each}
      </div>
    {/if}
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
</header>

<style>
  .header {
    @apply flex w-full justify-between;
  }
</style>

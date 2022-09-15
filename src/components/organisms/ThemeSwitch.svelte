<script lang="ts">
  import MoonIcon from '../atoms/MoonIcon.svelte';
  import SunIcon from '../atoms/SunIcon.svelte';
  import { interactive } from '../../util/interactive';
  import { writable } from 'svelte/store';
  import type { Readable } from 'svelte/store';
  import { backInOut } from 'svelte/easing';
  import { tick } from 'svelte';

  const LOCAL_STORAGE_KEY = '__theme-dark-mode';
  const ANIMATION_DURATION = 600;

  let colorTransitionsEnabled = false;

  enum Theme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
  }

  const isTheme = (value: unknown): value is Theme => {
    if (typeof value !== 'string') return false;
    return Object.values(Theme).includes(value);
  };

  const currentTheme: Readable<Theme> & { next: () => void } = (() => {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    const currentTheme = isTheme(localStorageValue) ? localStorageValue : Theme.LIGHT;

    // Initialize if absent
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTheme);

    const themes = [Theme.LIGHT, Theme.DARK];
    let index = themes.indexOf(currentTheme);

    const { subscribe, set } = writable<Theme>(themes[index]);

    return {
      subscribe,
      next: () => {
        index = (index + 1) % themes.length;
        set(themes[index]);
        localStorage.setItem(LOCAL_STORAGE_KEY, themes[index]);
      },
    };
  })();

  const spinIn = () => ({
    duration: ANIMATION_DURATION,
    easing: backInOut,
    css: (_, u) => `transform: rotate(${u * 180}deg);`,
  });

  const spinOut = () => ({
    duration: ANIMATION_DURATION,
    easing: backInOut,
    css: t => `transform: rotate(${180 + t * 180}deg);`,
  });

  $: {
    if ($currentTheme === Theme.DARK) {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }
</script>

<svelte:head>
  {#if colorTransitionsEnabled}
    <style>
      * {
        transition: background-color, border-color, text-decoration-color, fill, stroke;
        transition-duration: 300ms; /* ANIMATION_DURATION / 2 */
      }
    </style>
  {/if}
</svelte:head>

<button
  class="btn container"
  use:interactive
  on:interact={async () => {
    colorTransitionsEnabled = true;
    await tick();
    currentTheme.next();
  }}
>
  {#key $currentTheme}
    <div in:spinIn out:spinOut on:outroend={() => (colorTransitionsEnabled = false)} class="icon">
      {#if $currentTheme === Theme.LIGHT}
        <MoonIcon />
      {/if}
      {#if $currentTheme === Theme.DARK}
        <SunIcon />
      {/if}
    </div>
  {/key}
</button>

<style>
  .container {
    @apply relative;
    @apply h-8 w-20;
    @apply grid place-items-center;
    @apply overflow-hidden;
  }

  .icon {
    @apply absolute;
    transform-origin: 50% 160%;
  }
</style>

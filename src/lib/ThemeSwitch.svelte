<script lang="ts">
  import MoonIcon from './icons/MoonIcon.svelte';
  import SunIcon from './icons/SunIcon.svelte';
  import { interactive } from '../util/interactive';
  import { currentTheme, Theme } from '../state/theme';

  function spinIn(node, { duration = 500 }) {
    return {
      duration,
      css: (_, u) => {
        console.log('in', u);
        return `
					transform: rotate(${u * 180}deg);
        `;
      },
    };
  }
  function spinOut(node, { duration = 500 }) {
    return {
      duration,
      css: t => {
        console.log('out', t);
        return `
					transform: rotate(${180 + t * 180}deg);
        `;
      },
    };
  }
</script>

<div class="relative flex w-16 justify-center">
  {#if $currentTheme === Theme.LIGHT}
    <div
      in:spinIn
      out:spinOut
      use:interactive
      class="icon"
      on:interact={() => currentTheme.set(Theme.DARK)}
    >
      <MoonIcon />
    </div>
  {/if}
  {#if $currentTheme === Theme.DARK}
    <div
      in:spinIn
      out:spinOut
      use:interactive
      class="icon"
      on:interact={() => currentTheme.set(Theme.LIGHT)}
    >
      <SunIcon />
    </div>
  {/if}
</div>

<style>
  .icon {
    position: absolute;
    transform-origin: 50% 150%;
  }
</style>

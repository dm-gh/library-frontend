<script lang="ts">
  import PopupInner from './PopupInner.svelte';

  export let target: HTMLElement | null = null;
  export let opened: boolean = false;
</script>

{#if opened}
  <PopupInner {target} on:outsideClick>
    <slot></slot>
  </PopupInner>
{/if}

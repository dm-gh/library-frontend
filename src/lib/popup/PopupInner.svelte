<script lang="ts">
  import { onMount } from 'svelte';

  export let target: HTMLElement | null = null;

  let outsideRef: HTMLElement;

  onMount(() => {
    const container = target ?? document.body;
    container.appendChild(outsideRef);

    return () => {
      container.removeChild(outsideRef);
    };
  });
</script>

<div class="hidden">
  <div bind:this={outsideRef} class="fixed inset-0 flex flex-col overflow-auto bg-black/40">
    <slot />
  </div>
</div>

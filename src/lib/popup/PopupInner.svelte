<script lang="ts">
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte';

  export let target: HTMLElement | null = null;

  const dispatch = createEventDispatcher();

  let outsideRef: HTMLElement;
  let insideRef: HTMLElement;

  onMount(() => {
    const container = target ?? document.body;
    container.appendChild(outsideRef);

    return () => {
      container.removeChild(outsideRef);
    }
  })

  function onOutsideClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    if (!insideRef.contains(target)) {
      dispatch('outsideClick');
    }
  }

</script>

<div class="hidden">
  <div
    bind:this={outsideRef}
    on:click={onOutsideClick}
    class="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-secondary/50"
  >
    <div bind:this={insideRef} class="absolute">
      <slot></slot>
    </div>
  </div>
</div>


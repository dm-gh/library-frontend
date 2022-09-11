<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let initialSeconds: number;
  export let increment: number;

  let remainingMilliseconds = initialSeconds * 1000;

  onMount(() => {
    let raf;
    let lastDate = Date.now();

    const doTick = () => {
      const date = Date.now();
      const timeElapsed = date - lastDate;
      lastDate = date;

      remainingMilliseconds -= timeElapsed;

      if (remainingMilliseconds <= 0) {
        dispatch('done');
      }

      raf = window.requestAnimationFrame(doTick);
    };

    raf = window.requestAnimationFrame(doTick);

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  });
</script>

<div class="flex max-w-full flex-col">
  <div class="overflow-hidden rounded-lg leading-[0]">
    <progress
      style="accent-color: #e8006f"
      class="progress h-2 w-screen"
      max={initialSeconds * 1000}
      value={remainingMilliseconds}
    />
  </div>
</div>

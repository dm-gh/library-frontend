<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  enum Stages {
    Three = '3',
    Two = '2',
    One = '1',
    Go = 'GO',
  }

  let timer = Stages.Three;

  const timeout = (ms: number) => new Promise(res => window.setTimeout(res, ms));

  onMount(async () => {
    let unmounted = false;

    await timeout(1000);
    if (unmounted) return;

    timer = Stages.Two;
    await timeout(1000);
    if (unmounted) return;

    timer = Stages.One;
    await timeout(1000);
    if (unmounted) return;

    timer = Stages.Go;
    await timeout(1000);
    if (unmounted) return;

    dispatch('done');

    return () => {
      unmounted = true;
    };
  });
</script>

{#key timer}
  <div class="p-16 text-8xl" in:fly={{ x: 100, duration: 200 }}>
    {timer}
  </div>
{/key}

<script lang="ts">
  import { Difficulty, difficultyOrdered, difficultyIcons } from './consts';
  import { createEventDispatcher } from 'svelte';
  import { interactive } from '../../../../util/interactive';
  import { fly } from 'svelte/transition';
  import AngleLeftIcon from '../../../atoms/AngleLeftIcon.svelte';
  import AngleRightIcon from '../../../atoms/AngleRightIcon.svelte';

  const dispatch = createEventDispatcher();

  export let value: Difficulty = Difficulty.Medium;
  $: valueIndex = difficultyOrdered.indexOf(value);

  const onSelect = (v: Difficulty) => {
    dispatch('submit', v);
  };
</script>

<div class="flex flex-col items-center">
  <div class="mb-12">
    <input
      class="input-range w-96 scale-[2]"
      type="range"
      value={valueIndex}
      on:input={event => (value = difficultyOrdered[Number(event.target.value)])}
      min={0}
      max={difficultyOrdered.length - 1}
      step="1"
    />
  </div>

  <div class="flex items-center justify-center gap-12">
    <div
      class="card card-xl flex"
      class:disabled={valueIndex === 0}
      use:interactive
      on:interact={() => (value = difficultyOrdered[valueIndex - 1])}
    >
      <AngleLeftIcon />
    </div>
    {#key value}
      <div
        class="card card-xl flex w-64 flex-col items-center"
        in:fly={{ y: 60 }}
        use:interactive
        on:interact={() => onSelect(value)}
      >
        <div class="mb-8 text-6xl">{difficultyIcons[value].icon}</div>
        <div class="text-3xl">{difficultyIcons[value].title}</div>
      </div>
    {/key}
    <div
      class="card card-xl flex"
      class:disabled={valueIndex === difficultyOrdered.length - 1}
      use:interactive
      on:interact={() => (value = difficultyOrdered[valueIndex + 1])}
    >
      <AngleRightIcon />
    </div>
  </div>
</div>

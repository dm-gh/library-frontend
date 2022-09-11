<script lang="ts">
  import { Difficulty, difficultyOrdered } from './consts';
  import { createEventDispatcher } from 'svelte';
  import { interactive } from '../../../../util/interactive';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let value: Difficulty = Difficulty.Medium;

  const difficultyIcons = {
    [Difficulty.Easy]: { icon: '👶', title: 'Easy' },
    [Difficulty.Medium]: { icon: '😊️', title: 'Medium' },
    [Difficulty.Hard]: { icon: '😤', title: 'Hard' },
    [Difficulty.Extreme]: { icon: '😱', title: 'Extreme' },
    [Difficulty.Death]: { icon: '☠️', title: 'Death' },
  };

  const onSelect = (v: Difficulty) => {
    dispatch('submit', v);
  };
</script>

<div class="flex flex-col items-center">
  <div class="mb-12">
    <input
      class="input-range w-96 scale-[2]"
      type="range"
      value={difficultyOrdered.indexOf(value)}
      on:input={event => (value = difficultyOrdered[Number(event.target.value)])}
      min={0}
      max={difficultyOrdered.length - 1}
      step="1"
    />
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
</div>

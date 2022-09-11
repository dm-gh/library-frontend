<script lang="ts">
  import DifficultyScreen from './DifficultyScreen.svelte';
  import RuntimeScreen from './RuntimeScreen.svelte';
  import ResultsScreen from './ResultsScreen.svelte';
  import ReadySetGoScreen from './ReadySetGoScreen.svelte';
  import { Difficulty } from './consts';

  enum Screens {
    Difficulty = 'Difficulty',
    ReadySetGo = 'ReadySetGo',
    Runtime = 'Runtime',
    Results = 'Results',
  }
  let currentScreen = Screens.Difficulty;

  let difficulty: Difficulty = Difficulty.Medium;
  let initialSeconds: number;
  let increment: number;

  const onDifficultySelected = (diff: Difficulty) => {
    initialSeconds = {
      [Difficulty.Easy]: 180,
      [Difficulty.Medium]: 120,
      [Difficulty.Hard]: 60,
      [Difficulty.Extreme]: 30,
      [Difficulty.Death]: 25,
    }[diff];

    increment = {
      [Difficulty.Easy]: 5,
      [Difficulty.Medium]: 4,
      [Difficulty.Hard]: 3,
      [Difficulty.Extreme]: 2,
      [Difficulty.Death]: 1,
    }[diff];
  };
</script>

<div class="relative flex flex-col">
  <div class="mb-12 flex flex-col items-center">
    <div class="mb-4 text-4xl">Перевод</div>

    <div class="txt-minor text-2xl">Выбери правильный перевод из вариантов</div>
  </div>

  <div class="flex justify-center">
    {#if currentScreen === Screens.Difficulty}
      <DifficultyScreen
        bind:value={difficulty}
        on:submit={({ detail: diff }) => {
          onDifficultySelected(diff);
          currentScreen = Screens.ReadySetGo;
        }}
      />
    {:else if currentScreen === Screens.ReadySetGo}
      <ReadySetGoScreen on:done={() => (currentScreen = Screens.Runtime)} />
    {:else if currentScreen === Screens.Runtime}
      <RuntimeScreen
        {initialSeconds}
        {increment}
        on:done={() => (currentScreen = Screens.Results)}
      />
    {:else if currentScreen === Screens.Results}
      <ResultsScreen />
    {/if}
  </div>
</div>

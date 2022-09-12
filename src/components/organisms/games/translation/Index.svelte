<script lang="ts">
  import DifficultyScreen from './DifficultyScreen.svelte';
  import RuntimeScreen from './RuntimeScreen.svelte';
  import ResultsScreen from './ResultsScreen.svelte';
  import ReadySetGoScreen from './ReadySetGoScreen.svelte';
  import {
    Difficulty,
    initialSecondsMap,
    incrementMap,
    amountOfVerbsPerRoundMap,
    amountOfRoundsMap,
  } from './consts';
  import type { Answer } from './consts';
  import { verbsData, verbsError, verbsLoading } from '../../../../state/verbs.js';
  import Error from '../../../molecules/Error.svelte';
  import Loader from '../../../molecules/Loader.svelte';
  import Empty from '../../../molecules/Empty.svelte';

  const MINIMUM_VERBS_TO_START = 10;

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
  let amountOfVerbsPerRound: number;
  let amountOfRounds: number;

  let answers: Answer[] = [];

  const onDifficultySelected = (diff: Difficulty) => {
    initialSeconds = initialSecondsMap[diff];
    increment = incrementMap[diff];
    amountOfVerbsPerRound = amountOfVerbsPerRoundMap[diff];
    amountOfRounds = amountOfRoundsMap[diff];
  };
</script>

{#if $verbsLoading}
  <Loader />
{:else if $verbsError}
  <Error message={$verbsError.message} />
{:else if $verbsData.length < MINIMUM_VERBS_TO_START}
  <Empty>
    <div>В базе данных не достаточно глаголов</div>
    <div class="mt-8">Чтобы добавить новую информацию <br /> нажмите "Редактировать"</div>
  </Empty>
{:else}
  <div class="relative flex flex-1 flex-col">
    <div class="mb-12 flex flex-col items-center">
      <div class="mb-4 text-4xl">Перевод</div>

      <div class="txt-minor text-2xl">Выбери правильный перевод из вариантов</div>
    </div>

    <div class="flex flex-1 justify-center">
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
          {amountOfVerbsPerRound}
          {amountOfRounds}
          verbs={$verbsData}
          on:done={event => {
            answers = event.detail;
            currentScreen = Screens.Results;
          }}
        />
      {:else if currentScreen === Screens.Results}
        <ResultsScreen
          {difficulty}
          {answers}
          {amountOfRounds}
          on:replay={() => (currentScreen = Screens.Difficulty)}
        />
      {/if}
    </div>
  </div>
{/if}

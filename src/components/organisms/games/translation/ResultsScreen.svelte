<script lang="ts">
  import type { Answer } from './consts';
  import { createEventDispatcher } from 'svelte';
  import { interactive } from '../../../../util/interactive';
  import SyncIcon from '../../../atoms/SyncIcon.svelte';
  import { Difficulty, difficultyIcons, getVerdict } from './consts';
  import CheckIcon from '../../../atoms/CheckIcon.svelte';
  import TimesIcon from '../../../atoms/TimesIcon.svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let answers: Answer[];
  export let difficulty: Difficulty;
  export let amountOfRounds: number;
  export let isInfinite: boolean;

  let isDetailsVisible = false;

  $: diffIcon = difficultyIcons[difficulty];
  $: amountOfCorrect = answers.filter(({ isCorrect }) => isCorrect).length;
  $: percentResult = Math.ceil((amountOfCorrect / amountOfRounds) * 100);
  $: verdict = getVerdict(percentResult);

  $: amountOfDoneRounds = isInfinite ? answers.length : amountOfRounds;

  const onReplay = () => {
    dispatch('replay');
  };
</script>

<div class="flex w-screen max-w-full flex-col items-center justify-between">
  <div class="flex w-full flex-col items-center">
    <div class="flex max-w-prose flex-col items-center">
      <div class="txt-minor text-2xl">Результат</div>
      {#if !isInfinite}
        <div class="mt-8 text-6xl">
          {percentResult} %
        </div>
        <div class="mt-4 text-3xl">{verdict}</div>
      {/if}

      <div class="mt-8 text-lg">
        <span class="txt-minor">Сложность: </span>
        {diffIcon.icon}
        {diffIcon.title}
      </div>
      <div class="txt-minor mt-2 text-lg">
        Раундов: {amountOfDoneRounds}. Правильно: {amountOfCorrect}
      </div>

      {#if answers.length > 0}
        <button
          class="text-md mt-4"
          use:interactive
          on:interact={() => (isDetailsVisible = !isDetailsVisible)}
        >
          {#if isDetailsVisible}
            Скрыть делали
          {:else}
            Показать делали
          {/if}
        </button>
      {/if}
    </div>
    {#if isDetailsVisible}
      <div class="mt-8 grid w-full grid-cols-3 gap-4">
        {#each answers as answer, i}
          <div class="card flex items-start" in:fade={{ delay: i * 20 }}>
            {#if answer.isCorrect}
              <span class="text-success">
                <CheckIcon />
              </span>
            {:else}
              <span class="text-error">
                <TimesIcon />
              </span>
            {/if}
            <div class="ml-2 flex flex-col">
              <span class="text-lg">{i + 1}. {answer.verb.name}</span>
              <div class="txt-minor">{answer.verb.trans}</div>
              {#if !answer.isCorrect}
                <div class="txt-minor">Ответ: {answer.answer.trans}</div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <button class="card mt-8" use:interactive on:interact={onReplay}>
    <span class="flex items-center text-lg">
      <SyncIcon width="2rem" height="2rem" />
      <span class="ml-2">Заново</span>
    </span>
  </button>
</div>

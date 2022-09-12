<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Verb } from '../../../../api/content-types';
  import { shuffle } from '../../../../util/arrayUtils';
  import { interactive } from '../../../../util/interactive';
  import { fade } from 'svelte/transition';
  import AngleRightIcon from '../../../atoms/AngleRightIcon.svelte';
  import CheckIcon from '../../../atoms/CheckIcon.svelte';
  import TimesIcon from '../../../atoms/TimesIcon.svelte';
  import type { Answer } from './consts';

  const dispatch = createEventDispatcher();

  const HOTKEYS: [title: string, code: string][] = [
    ['1', 'Digit1'],
    ['2', 'Digit2'],
    ['3', 'Digit3'],
    ['4', 'Digit4'],
    ['5', 'Digit5'],
    ['6', 'Digit6'],
    ['7', 'Digit7'],
    ['8', 'Digit8'],
    ['9', 'Digit9'],
    ['0', 'Digit0'],
  ];

  export let initialSeconds: number;
  export let increment: number;
  export let amountOfVerbsPerRound: number;
  export let amountOfRounds: number;
  export let verbs: Verb[];

  let remainingMilliseconds = initialSeconds * 1000;

  let roundNumber = 1;
  let currentVerbIndex = 0;
  let answerOptions: Verb[] = [];

  let answers: Answer[] = [];

  let lastResult: Answer;
  let isLastResultVisible: boolean;

  const addTimeToClock = time => {
    remainingMilliseconds = Math.min(remainingMilliseconds + time, initialSeconds * 1000);
  };

  const initClock = (onDone: () => void) => {
    let raf;
    let lastDate = Date.now();

    const doTick = () => {
      const date = Date.now();
      const timeElapsed = date - lastDate;
      lastDate = date;

      addTimeToClock(-timeElapsed);

      if (remainingMilliseconds <= 0) {
        onDone();
        return;
      }

      raf = window.requestAnimationFrame(doTick);
    };

    raf = window.requestAnimationFrame(doTick);

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  };

  const initHotkeys = () => {
    const hotKeyCodeToIndex = HOTKEYS.reduce((acc, [, code], i) => {
      if (i >= amountOfVerbsPerRound) {
        return acc;
      } else {
        acc[code] = i;
        return acc;
      }
    }, {});

    const onKeydown = (event: KeyboardEvent) => {
      const answerIndex = hotKeyCodeToIndex[event.code];
      if (answerIndex !== undefined) {
        onAnswer(answerOptions[answerIndex]);
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  };

  const lastResultPopup = (() => {
    let timeout;

    const show = () => {
      isLastResultVisible = true;

      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(() => {
        isLastResultVisible = false;
      }, 1000);
    };

    const destroy = () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };

    return {
      show,
      destroy,
    };
  })();

  const prepareRound = () => {
    const options = new Set();
    options.add(currentVerbIndex);
    while (options.size < amountOfVerbsPerRound) {
      options.add(Math.floor(Math.random() * verbs.length));
    }
    answerOptions = shuffle(Array.from(options, index => verbs[index]));
  };

  const onNextRound = () => {
    currentVerbIndex = (currentVerbIndex + 1) % verbs.length;
    prepareRound();
    roundNumber++;
  };

  const onAnswer = (answer: Verb) => {
    const isCorrect = answer.trans === verbs[currentVerbIndex].trans;

    if (isCorrect) {
      addTimeToClock(increment * 1000);
    }

    lastResult = {
      isCorrect: isCorrect,
      verb: verbs[currentVerbIndex],
      answer,
    };
    answers.push(lastResult);
    answers = answers; // svelte ref update
    lastResultPopup.show();

    if (roundNumber === amountOfRounds) {
      onDone();
      return;
    }

    onNextRound();
  };

  const onDone = () => {
    dispatch('done', answers);
  };

  onMount(() => {
    verbs = shuffle(verbs);
    prepareRound();
    const destroyClock = initClock(onDone);
    const destroyHotkeys = initHotkeys();

    return () => {
      destroyClock();
      destroyHotkeys();
      lastResultPopup.destroy();
    };
  });
</script>

<div class="flex w-screen max-w-full flex-col justify-between">
  <div class="flex flex-col items-center">
    <div class="txt-minor self-end">
      Раунд {roundNumber} / {amountOfRounds}
    </div>

    <div class="mt-1 w-full overflow-hidden rounded-lg leading-[0]">
      <progress
        style="accent-color: #e8006f"
        class="progress h-2 w-full"
        max={initialSeconds * 1000}
        value={remainingMilliseconds}
      />
    </div>

    <div class="flex min-h-[1.5rem] gap-1 self-end overflow-hidden">
      {#each answers as answer}
        {#if answer.isCorrect}
          <span class="text-success"><CheckIcon /></span>
        {:else}
          <span class="text-error"><TimesIcon /></span>
        {/if}
      {/each}
    </div>

    {#key roundNumber}
      <div class="card card-xl mt-8 text-2xl" in:fade|local={{ duration: 100 }}>
        {verbs[currentVerbIndex].name}
      </div>

      <div class="mt-8 flex items-start gap-4" in:fade|local={{ duration: 100 }}>
        {#each answerOptions as option, i}
          <div use:interactive on:interact={() => onAnswer(option)} class="card">
            <span class="txt-minor text-xl">
              {option.trans}
            </span>
            <div
              class="txt-minor absolute top-0 left-0 h-4 w-4 rounded-br-md bg-background text-center text-xs dark:bg-dark_background"
            >
              {HOTKEYS[i][0]}
            </div>
          </div>
        {/each}
      </div>
    {/key}

    {#if isLastResultVisible}
      <div
        transition:fade|local={{ duration: 100 }}
        class="mt-8 flex items-center"
        class:text-success={lastResult.isCorrect}
        class:text-error={!lastResult.isCorrect}
      >
        {#if lastResult.isCorrect}
          <CheckIcon width="3rem" height="3rem" />
          <span class="ml-2 text-xl">Верно</span>
        {:else}
          <TimesIcon width="3rem" height="3rem" />
          <span class="ml-2 text-xl">Неверно</span>
        {/if}
      </div>
    {/if}
  </div>

  <div class="self-end">
    <div class="card" use:interactive on:interact={onDone}>
      <span class="txt-minor flex items-center text-lg font-medium">
        <span class="mr-2"> Закончить </span>
        <AngleRightIcon width="2rem" height="2rem" />
      </span>
    </div>
  </div>
</div>

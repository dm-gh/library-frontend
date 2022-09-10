<script lang="ts">
  import { interactive } from '../../util/interactive';
  import type { Verb } from '../../api/content-types';
  import Popup from '../molecules/popup/Popup.svelte';
  import PopupCard from '../molecules/popup/PopupCard.svelte';
  import SvelteMarkdown from 'svelte-markdown';

  export let verb: Verb;

  let expanded = false;

  const onClose = () => (expanded = false);
  const onOpen = () => (expanded = true);
</script>

<div class="card text-center" use:interactive on:interact={onOpen}>
  <span>{verb.name}</span>
</div>

<Popup opened={expanded} on:outsideClick={onClose}>
  <PopupCard on:close={onClose}>
    <div slot="title" class="font-serif">
      <h1>{verb.name}</h1>
      <h3 class="subtitle txt-minor">
        {verb.trans}
      </h3>
    </div>
    <div class="prose min-w-[65ch] dark:prose-invert">
      <SvelteMarkdown source={verb.info ?? ''} />
    </div>
    {#if verb.tags.length !== 0}
      <div class="mt-2 flex gap-4">
        {#each verb.tags as tag}
          <div class="tag">{tag}</div>
        {/each}
      </div>
    {/if}
  </PopupCard>
</Popup>

<style>
  .subtitle {
    @apply text-2xl;
  }
</style>

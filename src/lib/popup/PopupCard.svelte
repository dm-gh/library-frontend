<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import TimesIcon from '../icons/TimesIcon.svelte';
  import { interactable } from '../../util/interactable';
  import { clickOutside } from '../../util/clickOutside';

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch('close');
  }
</script>

<div
  class="card card-xl mx-auto mt-40 mb-16"
  in:fly={{ y: 100, duration: 100 }}
  use:clickOutside
  on:clickOutside={onClose}
>
  <div class="mb-8 flex items-start justify-between">
    <span class="text-4xl">
      <slot name="title" />
    </span>

    <div use:interactable on:interact={onClose}>
      <TimesIcon width="2.5rem" height="2.5rem" />
    </div>
  </div>
  <div class="min-w-[65ch] max-w-prose">
    <slot />
  </div>
</div>

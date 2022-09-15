<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimesIcon from '../../atoms/TimesIcon.svelte';
  import { interactive } from '../../../util/interactive';
  import { clickOutside } from '../../../util/clickOutside';

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch('close');
  }
</script>

<div class="card card-xl mx-auto mt-40 mb-16" use:clickOutside on:clickOutside={onClose}>
  <div class="mb-8 flex items-start justify-between">
    <span class="text-4xl">
      <slot name="title" />
    </span>

    <button class="btn-icon" use:interactive on:interact={onClose}>
      <TimesIcon width="2.5rem" height="2.5rem" />
    </button>
  </div>

  <slot />
</div>

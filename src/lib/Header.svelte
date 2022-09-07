<script lang="ts">
  import AppsIcon from './icons/AppsIcon.svelte';
  import WindowSectionIcon from './icons/WindowSectionIcon.svelte';
  import AlignJustifyIcon from './icons/AlignJustifyIcon.svelte';
  import ExternalLinkAltIcon from './icons/ExternalLinkAltIcon.svelte';
  import { navigate } from 'svelte-routing';
  import { interactable } from '../util/interactable';

  const editHref = import.meta.env.PUBLIC_BACKEND_BASE_URL + '/admin';
</script>

<aside class="aside">
  <div class="flex">
    <div class="mr-2">
      <a
        href="irregular"
        use:interactable
        on:interact={() => navigate('irregular')}
        class="btn-secondary"
      >
        <WindowSectionIcon />
        <span class="mx-2">Отклоняющиеся</span>
      </a>
    </div>
    <div class="mr-2">
      <a
        href="individual"
        use:interactable
        on:interact={() => navigate('individual')}
        class="btn-secondary"
      >
        <AppsIcon />
        <span class="mx-2">Индивидуальные</span>
      </a>
    </div>
    <div class="mr-2">
      <a
        href="normal"
        use:interactable
        on:interact={() => navigate('normal')}
        class="btn-secondary"
      >
        <AlignJustifyIcon />
        <span class="mx-2">Обычные</span>
      </a>
    </div>
  </div>
  <div class="flex">
    <a href={editHref} target="_blank" class="btn-primary">
      <ExternalLinkAltIcon />
      <span class="mx-2">Редактировать</span>
    </a>
  </div>
</aside>

<style>
  .aside {
    @apply flex w-full justify-between;
  }
</style>

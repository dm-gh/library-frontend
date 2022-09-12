<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { interactive } from '../../../../util/interactive';
  import EnglishToChineseIcon from '../../../atoms/EnglishToChineseIcon.svelte';

  export let href: string;
</script>

<a
  {href}
  use:interactive
  on:interact={() => navigate(href)}
  class="card card-xl flex flex-col items-center"
>
  <EnglishToChineseIcon width="4rem" height="4rem" />
  <div class="txt-minor mt-4 text-xl">Перевод</div>
</a>

<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { interactive } from '../../../../util/interactive';

  export let href: string;
</script>

<a {href} use:interactive on:interact={() => navigate(href)} class="card card-xl">
  <div class="text-2xl">Перевод</div>
</a>

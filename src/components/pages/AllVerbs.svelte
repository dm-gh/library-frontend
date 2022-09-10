<script lang="ts">
  import Error from '../molecules/Error.svelte';
  import { verbsData, verbsLoading, verbsError } from '../../state/verbs';
  import Loader from '../molecules/Loader.svelte';
  import Empty from '../molecules/Empty.svelte';
  import VerbTile from '../organisms/VerbTile.svelte';
</script>

{#if $verbsLoading}
  <Loader />
{:else if $verbsError}
  <Error message={$verbsError.message} />
{:else if $verbsData.length === 0}
  <Empty />
{:else}
  <ul class="columns-4">
    {#each $verbsData as verb}
      <li class="mb-2">
        <VerbTile {verb} />
      </li>
    {/each}
  </ul>
{/if}

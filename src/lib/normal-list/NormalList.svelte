<script lang="ts">
  import Error from '../Error.svelte';
  import { normalVerbs, verbsLoading, verbsError } from '../../state/verbs';
  import NormalVerb from './NormalVerb.svelte';
  import Loader from '../Loader.svelte';
  import Empty from '../Empty.svelte';
</script>

{#if $verbsLoading}
  <Loader />
{:else if $verbsError}
  <Error>{$verbsError.message}</Error>
{:else if $normalVerbs.length === 0}
  <Empty />
{:else}
  <ul>
    {#each $normalVerbs as verb}
      <li class="mb-2">
        <NormalVerb {verb} />
      </li>
    {/each}
  </ul>
{/if}

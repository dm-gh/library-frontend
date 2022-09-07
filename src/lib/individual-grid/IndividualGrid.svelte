<script lang="ts">
  import Error from '../Error.svelte';
  import { individualVerbs, verbsLoading, verbsError } from '../../state/verbs';
  import IndividualVerb from './IndividualVerb.svelte';
  import Loader from '../Loader.svelte';
  import Empty from '../Empty.svelte';
</script>

{#if $verbsLoading}
  <Loader />
{:else if $verbsError}
  <Error message={$verbsError.message} />
{:else if $individualVerbs.length === 0}
  <Empty />
{:else}
  <div class="container">
    {#each $individualVerbs as verb}
      <IndividualVerb {verb} />
    {/each}
  </div>
{/if}

<style>
  .container {
    @apply grid;
  }
</style>

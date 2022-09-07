<script lang="ts">
  import VerbTile from './IrregularVerbTile.svelte';
  import Error from '../Error.svelte';
  import HeaderTile from './IrregularHeaderTile.svelte';
  import { VerbGroup } from '../../api/content-types.js';
  import { irregularVerbs, verbsLoading, verbsError } from '../../state/verbs';
  import Loader from '../Loader.svelte';
  import Empty from '../Empty.svelte';
</script>

{#if $verbsLoading}
  <Loader />
{:else if $verbsError}
  <Error message={$verbsError.message} />
{:else if $irregularVerbs.length === 0}
  <Empty />
{:else}
  <div class="table">
    <div class="cell header-cell col-span-2 col-start-[Ia] row-start-1">
      <HeaderTile group={VerbGroup.I} />
    </div>
    <div class="cell header-cell col-start-[Ia]">
      <HeaderTile group={VerbGroup.Ia} />
    </div>
    <div class="cell header-cell col-start-[Ib]">
      <HeaderTile group={VerbGroup.Ib} />
    </div>

    <div class="cell header-cell col-start-[II] row-start-2">
      <HeaderTile group={VerbGroup.II} />
    </div>
    <div class="cell header-cell col-start-[III] row-start-2">
      <HeaderTile group={VerbGroup.III} />
    </div>
    <div class="cell header-cell col-start-[IV]  row-start-2">
      <HeaderTile group={VerbGroup.IV} />
    </div>

    <div class="cell header-cell col-span-2 col-start-[Va] row-start-1">
      <HeaderTile group={VerbGroup.V} />
    </div>
    <div class="cell header-cell col-start-[Va]">
      <HeaderTile group={VerbGroup.Va} />
    </div>
    <div class="cell header-cell col-start-[Vb]">
      <HeaderTile group={VerbGroup.Vb} />
    </div>

    <div class="cell header-cell col-start-[VI] row-start-2">
      <HeaderTile group={VerbGroup.VI} />
    </div>

    <div class="col-span-8 my-1" />

    {#each $irregularVerbs as verb}
      <div class="cell col-start-[{verb.group}]">
        <VerbTile {verb} />
      </div>
    {/each}
  </div>
{/if}

<style>
  .table {
    @apply grid grid-cols-[[Ia]_1fr_[Ib]_1fr_[II]_1fr_[III]_1fr_[IV]_1fr_[Va]_1fr_[Vb]_1fr_[VI]_1fr];
    @apply place-items-stretch;
    @apply gap-2;
  }
  .cell {
    @apply flex flex-col items-stretch text-xl;
  }
  .cell.header-cell {
    @apply font-medium tracking-wider;
  }
</style>

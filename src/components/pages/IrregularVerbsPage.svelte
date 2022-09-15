<script lang="ts">
  import VerbTile from '../organisms/VerbTile.svelte';
  import Error from '../molecules/Error.svelte';
  import HeaderTile from '../organisms/VerbGroupTile.svelte';
  import { VerbGroup } from '../../api/content-types.js';
  import { verbsLoading, verbsError, verbsData } from '../../state/verbs';
  import Loader from '../molecules/Loader.svelte';
  import Empty from '../molecules/Empty.svelte';
  import { derived } from 'svelte/store';

  const irregularVerbs = derived(verbsData, verbs =>
    verbs.filter(v => v.group !== VerbGroup.individual && v.group !== VerbGroup.normal),
  );
</script>

{#if $verbsLoading}
  <Loader>Загружаем глаголы</Loader>
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

    <div class="col-start-[II]" />
    <div class="cell header-cell col-start-[II]">
      <HeaderTile group={VerbGroup.II} />
    </div>
    <div class="col-start-[III]" />
    <div class="cell header-cell col-start-[III] row-start-2">
      <HeaderTile group={VerbGroup.III} />
    </div>
    <div class="col-start-[IV]" />
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

    <div class="col-start-[VI]" />
    <div class="cell header-cell col-start-[VI] row-start-2">
      <HeaderTile group={VerbGroup.VI} />
    </div>

    <div class="col-span-8 col-start-1 my-1" />

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
    @apply grid-flow-col place-items-stretch;
    @apply gap-2;
  }
  .cell {
    @apply flex flex-col items-stretch text-xl;
  }
  .cell.header-cell {
    @apply font-medium tracking-wider;
  }
</style>

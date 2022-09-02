<script lang="ts">
  import Table from './lib/Table.svelte';
  import { verbsApi } from './api';
  import { unwrapStrapiArray } from './api/util';

  verbsApi.find().then(unwrapStrapiArray).then(console.log);
</script>

<main>
  <Table/>
</main>

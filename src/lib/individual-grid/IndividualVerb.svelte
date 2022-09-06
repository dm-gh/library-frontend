<script lang="ts">
  import type { Verb } from '../../api/content-types';
  import Card from '../Card.svelte';

  export let verb: Verb;
</script>

<Card small>
  {verb.name} - {verb.trans}
</Card>

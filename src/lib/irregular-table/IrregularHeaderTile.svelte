<script lang="ts">
  import Card from '../Card.svelte';
  import {VerbGroup} from '../../api/content-types';

  export let group: VerbGroup;
</script>

<Card small>
  <div class="w-full h-full flex flex-col justify-center text-center capitalize">
    {group}
  </div>
</Card>

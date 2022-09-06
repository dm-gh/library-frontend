<script lang="ts">
  import type {Verb} from '../../api/content-types';
  import Popup from '../popup/Popup.svelte';
  import Card from '../Card.svelte';
  import Clickable from '../Clickable.svelte';

  export let verb: Verb;

  let expanded = false;
</script>

<Clickable on:click={() => expanded = true}>
  <Card small>
    {verb.name}
  </Card>
</Clickable>

<Popup opened={expanded} on:outsideClick={() => expanded = false}>
  <Card>{verb.trans}</Card>
</Popup>
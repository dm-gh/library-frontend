<script lang="ts">
  import { interactable } from '../../util/interactable';
  import type { Verb } from '../../api/content-types';
  import Popup from '../popup/Popup.svelte';
  import PopupCard from '../popup/PopupCard.svelte';
  import Markdown from '../Markdown.svelte';

  export let verb: Verb;

  let expanded = false;

  const onClose = () => (expanded = false);
  const onOpen = () => (expanded = true);
</script>

<div class="card text-center" use:interactable on:interact={onOpen}>
  {verb.name}
</div>

<Popup opened={expanded} on:outsideClick={onClose}>
  <PopupCard on:close={onClose} title={verb.name}>
    <div slot="title">
      <div>{verb.name}</div>
      <div class="text-2xl text-on-surface-light">
        {verb.trans}
      </div>
    </div>
    <Markdown source={verb.info} />
  </PopupCard>
</Popup>

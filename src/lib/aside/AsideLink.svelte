<script lang="ts">
  import Button from '../Button.svelte';
  import { fade } from 'svelte/transition';
  import { Link } from 'svelte-routing';
  import { SvelteComponent } from 'svelte';

  export let icon: SvelteComponent;
  export let to: string;

  export let collapsed: boolean;
</script>

<Link {to}>
  <Button dummy>
    <svelte:component this={icon} />
    {#if !collapsed}
      <span in:fade class="flex-1 text-center">
        <slot />
      </span>
    {/if}
  </Button>
</Link>

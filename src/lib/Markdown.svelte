<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';

  export let source: string | undefined | null;
</script>

<div class="prose">
  <SvelteMarkdown source={source ?? ''} />
</div>

<script lang="ts">
  import type { Verb } from '../../api/content-types';

  export let verb: Verb;
</script>

<div class="card">
  {verb.name} - {verb.trans}
</div>

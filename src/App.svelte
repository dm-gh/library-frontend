<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Header from './lib/Header.svelte';
  import IrregularVerbs from './pages/IrregularVerbs.svelte';
  import IndividualVerbs from './pages/IndividualVerbs.svelte';
  import NormalVerbs from './pages/NormalVerbs.svelte';
</script>

<Router>
  <div class="flex flex-1 flex-col p-4">
    <Header />

    <main class="mt-10 flex-1">
      <Route path="irregular">
        <IrregularVerbs />
      </Route>
      <Route path="individual">
        <IndividualVerbs />
      </Route>
      <Route path="normal">
        <NormalVerbs />
      </Route>
    </main>
  </div>
</Router>

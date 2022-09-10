<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Header from './components/organisms/Header.svelte';
  import IrregularVerbs from './components/pages/IrregularVerbs.svelte';
  import AllVerbs from './components/pages/AllVerbs.svelte';
  import AppsIcon from './components/atoms/AppsIcon.svelte';
  import WindowSectionIcon from './components/atoms/WindowSectionIcon.svelte';
  import { currentLocation } from './state/currentLocation';

  $: activeHref = $currentLocation ?? '/';
</script>

<Router>
  <div class="flex flex-1 flex-col p-4">
    <Header
      navLinks={[
        { Icon: WindowSectionIcon, href: '/irregular', title: 'Отклоняющиеся' },
        { Icon: AppsIcon, href: '/', title: 'Бибилиотека' },
      ]}
      {activeHref}
    />

    <main class="mt-10 flex-1">
      <Route path="/irregular">
        <IrregularVerbs />
      </Route>
      <Route path="/">
        <AllVerbs />
      </Route>
    </main>
  </div>
</Router>

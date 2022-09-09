<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Header from './lib/Header.svelte';
  import IrregularVerbs from './pages/IrregularVerbs.svelte';
  import IndividualVerbs from './pages/IndividualVerbs.svelte';
  import NormalVerbs from './pages/NormalVerbs.svelte';
  import AppsIcon from './lib/icons/AppsIcon.svelte';
  import WindowSectionIcon from './lib/icons/WindowSectionIcon.svelte';
  import AlignJustifyIcon from './lib/icons/AlignJustifyIcon.svelte';
  import { currentLocation } from './state/currentLocation';

  $: activeHref = $currentLocation?.split('/')?.[1] ?? '';
</script>

<Router>
  <div class="flex flex-1 flex-col p-4">
    <Header
      navLinks={[
        { Icon: WindowSectionIcon, href: 'irregular', title: 'Отклоняющиеся' },
        { Icon: AppsIcon, href: 'individual', title: 'Индивидуальные' },
        { Icon: AlignJustifyIcon, href: 'normal', title: 'Обычные' },
      ]}
      {activeHref}
    />

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

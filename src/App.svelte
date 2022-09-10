<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import Header from './components/organisms/Header.svelte';
  import IrregularVerbsPage from './components/pages/IrregularVerbsPage.svelte';
  import AllVerbsPage from './components/pages/AllVerbsPage.svelte';
  import GamesPage from './components/pages/GamesPage.svelte';
  import AppsIcon from './components/atoms/AppsIcon.svelte';
  import WindowSectionIcon from './components/atoms/WindowSectionIcon.svelte';
  import TrophyIcon from './components/atoms/TrophyIcon.svelte';
  import { currentLocation } from './state/currentLocation';

  $: activeHref = $currentLocation ?? '/';
</script>

<Router>
  <div class="flex flex-1 flex-col p-4">
    <Header
      navLinks={[
        { Icon: WindowSectionIcon, href: '/irregular', title: 'Отклоняющиеся' },
        { Icon: AppsIcon, href: '/', title: 'Бибилиотека' },
        { Icon: TrophyIcon, href: '/games', title: 'Тесты' },
      ]}
      {activeHref}
    />

    <main class="mt-10 flex-1">
      <Route path="/irregular">
        <IrregularVerbsPage />
      </Route>
      <Route path="/games">
        <GamesPage />
      </Route>
      <Route path="/">
        <AllVerbsPage />
      </Route>
    </main>
  </div>
</Router>

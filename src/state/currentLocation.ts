import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { navigate as svelteRoutingNavigate } from 'svelte-routing';
import { tick } from 'svelte';

export const currentLocation: Readable<string> & { update: () => void } = (() => {
  const { subscribe, set } = writable<string>(window.location.pathname);

  return {
    subscribe,
    update: () => set(window.location.pathname),
  };
})();

export const navigate: typeof svelteRoutingNavigate = (...args) => {
  svelteRoutingNavigate(...args);
  tick().then(() => {
    currentLocation.update();
  });
};

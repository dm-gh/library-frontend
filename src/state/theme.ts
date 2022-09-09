import { writable } from 'svelte/store';

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const currentTheme = writable<Theme>(Theme.LIGHT);

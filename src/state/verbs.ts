import { verbsApi } from '../api';
import { unwrapStrapiArray } from '../api/util';
import { derived, writable } from 'svelte/store';
import type { Verb } from '../api/content-types';
import { VerbGroup } from '../api/content-types';

function createStore() {
  const { subscribe, set } = writable<{
    data: Verb[];
    loading: boolean;
    error: unknown | null;
  }>({
    data: [],
    loading: false,
    error: null,
  });

  const getData = async () => {
    set({
      data: [],
      loading: true,
      error: null,
    });

    try {
      const response = await verbsApi.find();
      set({
        data: unwrapStrapiArray(response),
        loading: false,
        error: null,
      });
    } catch (error: unknown) {
      set({
        data: [],
        loading: false,
        error: error,
      });
    }
  };

  void getData();

  return {
    subscribe,
    reset: getData,
  };
}

export const verbsStore = createStore();
export const verbsData = derived(verbsStore, $verbs => $verbs.data);
export const verbsLoading = derived(verbsStore, $verbs => $verbs.loading);
export const verbsError = derived(verbsStore, $verbs => $verbs.error);

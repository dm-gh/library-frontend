import { createCollectionApi } from './util';
import type { Verb } from './content-types';

export const verbsApi = createCollectionApi<Verb>('api/verbs');

export const helpTipsApi = createCollectionApi<Verb>('api/help-tips');

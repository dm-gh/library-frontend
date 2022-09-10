import { createCollectionApi } from './util';
import type { HelpTip, Verb, Verb_Raw } from './content-types';

export const verbsApi = createCollectionApi<Verb, Verb_Raw>('api/verbs', {
  fromRaw: verb => ({ ...verb, tags: (verb.tags ?? '').split('\n').filter(Boolean) }),
  toRaw: verb => ({ ...verb, tags: verb.tags.join('\n') }),
  toPartialRaw: partialVerb => {
    const { tags, ...rest } = partialVerb;
    return {
      ...rest,
      ...(tags ? { tags: tags.join('\n') } : {}),
    };
  },
});

export const helpTipsApi = createCollectionApi<HelpTip>('api/help-tips');

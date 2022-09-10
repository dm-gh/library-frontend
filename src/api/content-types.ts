import type { RichText } from './util';

export enum VerbGroup {
  I = 'I',
  Ia = 'Ia',
  Ib = 'Ib',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V',
  Va = 'Va',
  Vb = 'Vb',
  VI = 'VI',
  individual = 'individual',
  normal = 'normal',
}

export type Verb = {
  name: string;
  trans: string;
  slug: string;
  group: VerbGroup;
  info: RichText | null;
  tags: string[];
};
// _Raw is what server sends. It should be converted to normal variant
export type Verb_Raw = Omit<Verb, 'tags'> & {
  tags: string | null;
};

export type HelpTip = {
  text: RichText;
  slug: string;
};

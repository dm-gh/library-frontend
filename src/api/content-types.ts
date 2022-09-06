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
  info: RichText;
};

export type HelpTip = {
  text: RichText;
  slug: string;
};

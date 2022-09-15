import type { Verb } from '../../../../api/content-types';

export enum Difficulty {
  Zen,
  Easy,
  Medium,
  Hard,
  Extreme,
  Death,
}
export const difficultyOrdered = [
  Difficulty.Zen,
  Difficulty.Easy,
  Difficulty.Medium,
  Difficulty.Hard,
  Difficulty.Extreme,
  Difficulty.Death,
];

export type Answer = { isCorrect: boolean; verb: Verb; answer: Verb };

export const difficultyIcons = {
  [Difficulty.Zen]: { icon: '🧘', title: 'Zen' },
  [Difficulty.Easy]: { icon: '👶', title: 'Easy' },
  [Difficulty.Medium]: { icon: '😊️', title: 'Medium' },
  [Difficulty.Hard]: { icon: '😤', title: 'Hard' },
  [Difficulty.Extreme]: { icon: '😱', title: 'Extreme' },
  [Difficulty.Death]: { icon: '☠️', title: 'Death' },
};

export const initialSecondsMap = {
  [Difficulty.Zen]: 1,
  [Difficulty.Easy]: 180,
  [Difficulty.Medium]: 120,
  [Difficulty.Hard]: 60,
  [Difficulty.Extreme]: 30,
  [Difficulty.Death]: 30,
};

export const incrementMap = {
  [Difficulty.Zen]: 0,
  [Difficulty.Easy]: 3,
  [Difficulty.Medium]: 3,
  [Difficulty.Hard]: 2,
  [Difficulty.Extreme]: 2,
  [Difficulty.Death]: 1,
};

export const amountOfVerbsPerRoundMap = {
  [Difficulty.Zen]: 4,
  [Difficulty.Easy]: 3,
  [Difficulty.Medium]: 4,
  [Difficulty.Hard]: 4,
  [Difficulty.Extreme]: 5,
  [Difficulty.Death]: 6,
};

export const amountOfRoundsMap = {
  [Difficulty.Zen]: -1,
  [Difficulty.Easy]: 30,
  [Difficulty.Medium]: 35,
  [Difficulty.Hard]: 40,
  [Difficulty.Extreme]: 40,
  [Difficulty.Death]: 30,
};

export const shouldShowCorrect = {
  [Difficulty.Zen]: true,
  [Difficulty.Easy]: true,
  [Difficulty.Medium]: true,
  [Difficulty.Hard]: false,
  [Difficulty.Extreme]: false,
  [Difficulty.Death]: false,
};

export const getVerdict = (percentage: number) => {
  if (percentage === 0) return 'По твоему это смешно? 😡';
  if (percentage < 10) return 'Хуже быть не может! 🤮';
  if (percentage < 25) return 'Разочарование 😫️';
  if (percentage < 50) return 'Стоит ещё поучиться 😕';
  if (percentage < 70) return 'Неплохо, но можно и лучше 😒';
  if (percentage < 90) return 'Очень хорошо! Продолжай в том же духе! 😌';
  if (percentage < 100) return 'Умничка!!! 😍';
  if (percentage === 100) return '✨ PERFECTION ✨';
};

export const shouldBeInfinite = (diff: Difficulty) => {
  return diff === Difficulty.Zen;
};

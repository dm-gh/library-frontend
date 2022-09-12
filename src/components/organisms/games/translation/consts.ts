import type { Verb } from '../../../../api/content-types';

export enum Difficulty {
  Easy,
  Medium,
  Hard,
  Extreme,
  Death,
}
export const difficultyOrdered = [
  Difficulty.Easy,
  Difficulty.Medium,
  Difficulty.Hard,
  Difficulty.Extreme,
  Difficulty.Death,
];

export type Answer = { isCorrect: boolean; verb: Verb; answer: Verb };

export const difficultyIcons = {
  [Difficulty.Easy]: { icon: '👶', title: 'Easy' },
  [Difficulty.Medium]: { icon: '😊️', title: 'Medium' },
  [Difficulty.Hard]: { icon: '😤', title: 'Hard' },
  [Difficulty.Extreme]: { icon: '😱', title: 'Extreme' },
  [Difficulty.Death]: { icon: '☠️', title: 'Death' },
};

export const initialSecondsMap = {
  [Difficulty.Easy]: 180,
  [Difficulty.Medium]: 120,
  [Difficulty.Hard]: 60,
  [Difficulty.Extreme]: 30,
  [Difficulty.Death]: 25,
};

export const incrementMap = {
  [Difficulty.Easy]: 3,
  [Difficulty.Medium]: 3,
  [Difficulty.Hard]: 2,
  [Difficulty.Extreme]: 2,
  [Difficulty.Death]: 1,
};

export const amountOfVerbsPerRoundMap = {
  [Difficulty.Easy]: 3,
  [Difficulty.Medium]: 4,
  [Difficulty.Hard]: 4,
  [Difficulty.Extreme]: 5,
  [Difficulty.Death]: 6,
};

export const amountOfRoundsMap = {
  [Difficulty.Easy]: 30,
  [Difficulty.Medium]: 35,
  [Difficulty.Hard]: 40,
  [Difficulty.Extreme]: 45,
  [Difficulty.Death]: 50,
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

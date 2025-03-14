import { ProgressScreenName } from './onboardingScreens';

export type ProgressScreenConfig = {
  next: ProgressScreenName | undefined;
  progress: number;
};

export const progressScreensConfig: Record<
  ProgressScreenName,
  ProgressScreenConfig
> = {
  name: { next: 'goal', progress: 2 },
  goal: { next: 'weight', progress: 10 },
  weight: { next: 'knowledge', progress: 20 },
  knowledge: { next: 'phone', progress: 30 },
  phone: { next: 'physical', progress: 40 },
  physical: { next: 'age', progress: 50 },
  age: { next: 'restrictions', progress: 60 },
  restrictions: { next: 'diseaze', progress: 70 },
  diseaze: { next: 'challenge', progress: 80 },
  challenge: { next: undefined, progress: 100 },
} as const;

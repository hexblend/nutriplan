import { ProgressScreenName } from './onboardingScreens';

export type ProgressScreenConfig = {
  next: ProgressScreenName | undefined;
  progress: number;
};

export const progressScreensConfig: Record<
  ProgressScreenName,
  ProgressScreenConfig
> = {
  questionsFiller: { next: 'name', progress: 1 },
  name: { next: 'goal', progress: 2 },
  goal: { next: 'height', progress: 6 },
  height: { next: 'weight', progress: 14 },
  weight: { next: 'age', progress: 18 },
  age: { next: 'activity', progress: 22 },
  activity: { next: 'accountFiller', progress: 26 },
  accountFiller: { next: 'phone', progress: 30 },
  phone: { next: 'otp', progress: 34 },
  otp: { next: 'password', progress: 38 },
  password: { next: 'goalsFiller', progress: 42 },
  goalsFiller: { next: 'targetWeight', progress: 46 },
  targetWeight: { next: 'targetActivity', progress: 50 },
  targetActivity: { next: 'targetMaintenance', progress: 50 },
  targetMaintenance: { next: 'targetCondition', progress: 50 },
  targetCondition: { next: 'targetSport', progress: 50 },
  targetSport: { next: 'restrictions', progress: 50 },
  restrictions: { next: 'learningFiller', progress: 54 },
  learningFiller: { next: 'triedBefore', progress: 58 },
  triedBefore: { next: 'challenge', progress: 62 },
  challenge: { next: 'time', progress: 70 },
  time: { next: 'recap', progress: 78 },
  recap: { next: 'paywall', progress: 94 },
  paywall: { next: undefined, progress: 100 },
};

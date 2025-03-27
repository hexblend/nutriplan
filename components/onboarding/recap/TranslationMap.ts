import { t } from '@/i18n/translations';

export const translateValue = (
  key: string,
  value: string | undefined
): string => {
  if (!value) return '';
  const translationMap: Record<string, string> = {
    // Activity
    Sedentary: 'auth.activitySedentary',
    'Lightly active': 'auth.activityLightly',
    'Moderately active': 'auth.activityModerate',
    'Very active': 'auth.activityVery',
    'Extremely active': 'auth.activityExtreme',
    // Time
    'Less than 30 minutes': 'auth.timeLessThan30',
    '30-45 minutes': 'auth.time30To45',
    '45-60 minutes': 'auth.time45To60',
    'I prefer meal prepping once or twice a week': 'auth.timeWeeklyPrep',
    // Challenge
    'Lack of time to prepare meals': 'auth.challengeLackOfTime',
    'Not knowing what to eat': 'auth.challengeNotKnowing',
    'Cravings and temptations': 'auth.challengeCravings',
    'Complicated recipes': 'auth.challengeComplicated',
    'Meal repetition / boredom': 'auth.challengeRepetition',
    // Target Activity
    '1-2 times': 'auth.targetActivityRarely',
    '3-4 times': 'auth.targetActivitySometimes',
    '5+ times': 'auth.targetActivityOften',
    'Not currently, but planning to start': 'auth.targetActivityNotYet',
    // Target Maintenance
    'Overall wellbeing': 'auth.targetMaintenanceOverall',
    'Current weight': 'auth.targetMaintenanceWeight',
    'Energy levels': 'auth.targetMaintenanceEnergy',
    'Athletic performance': 'auth.targetMaintenancePerformance',
    'Mental clarity and focus': 'auth.targetMaintenanceMental',
    // Target Sport
    'Endurance sports (running, cycling)': 'auth.targetSportEndurance',
    'Team sports': 'auth.targetSportTeam',
    'Strength training': 'auth.targetSportStrength',
    'High intensity interval training': 'auth.targetSportHIIT',
    'CrossFit/functional fitness': 'auth.targetSportCrossFit',
    'Yoga/flexibility-focused training': 'auth.targetSportYoga',
    // Goal
    'Lose weight': 'auth.goalLooseWeight',
    'Increase muscle mass': 'auth.goalIncreaseMass',
    'Maintain weight in a healthy way': 'auth.goalStable',
    'Diet for a health condition': 'auth.goalHealthCondition',
    'Performance for athletes': 'auth.goalPerformance',
  };
  const translationKey = translationMap[value];
  return translationKey ? t.t(translationKey) : value;
};

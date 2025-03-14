import AgeScreen from '@/app/auth/(no-account)/age';
import ChallengeScreen from '@/app/auth/(no-account)/challenge';
import DiseazeScreen from '@/app/auth/(no-account)/diseaze';
import GoalScreen from '@/app/auth/(no-account)/goal';
import KnowledgeScreen from '@/app/auth/(no-account)/knowledge';
import NameScreen from '@/app/auth/(no-account)/name';
import PhoneScreen from '@/app/auth/(no-account)/phone';
import PhysicalScreen from '@/app/auth/(no-account)/physical';
import RestrictionsScreen from '@/app/auth/(no-account)/restrictions';
import WeightScreen from '@/app/auth/(no-account)/weight';
import React from 'react';

export const onboardingProgressScreens: Record<string, React.ComponentType> = {
  name: NameScreen,
  goal: GoalScreen,
  weight: WeightScreen,
  knowledge: KnowledgeScreen,
  phone: PhoneScreen,
  physical: PhysicalScreen,
  age: AgeScreen,
  restrictions: RestrictionsScreen,
  diseaze: DiseazeScreen,
  challenge: ChallengeScreen,
};
export type ProgressScreenName = keyof typeof onboardingProgressScreens;

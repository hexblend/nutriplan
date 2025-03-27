import NewPasswordScreen from '@/app/(app)/auth/(common)/new-password';
import OtpScreen from '@/app/(app)/auth/(common)/otp';
import PhoneScreen from '@/app/(app)/auth/(common)/phone';
import {
  AccountFillerScreen,
  GoalsFillerScreen,
  LearningFillerScreen,
  QuestionsFillerScreen,
} from '@/app/(app)/auth/(onboarding)/(fillers)/filler-screens';
import TargetScreen from '@/app/(app)/auth/(onboarding)/(target-conditional)/target-screen';
import ActivityScreen from '@/app/(app)/auth/(onboarding)/activity';
import AgeScreen from '@/app/(app)/auth/(onboarding)/age';
import ChallengeScreen from '@/app/(app)/auth/(onboarding)/challenge';
import GoalScreen from '@/app/(app)/auth/(onboarding)/goal';
import HeightScreen from '@/app/(app)/auth/(onboarding)/height';
import NameScreen from '@/app/(app)/auth/(onboarding)/name';
import PaywallScreen from '@/app/(app)/auth/(onboarding)/paywall';
import RecapScreen from '@/app/(app)/auth/(onboarding)/recap';
import RestrictionsScreen from '@/app/(app)/auth/(onboarding)/restrictions';
import TimeScreen from '@/app/(app)/auth/(onboarding)/time';
import TriedBeforeScreen from '@/app/(app)/auth/(onboarding)/tried-before';
import WeightScreen from '@/app/(app)/auth/(onboarding)/weight';
import React from 'react';

export const onboardingProgressScreens: Record<string, React.ComponentType> = {
  questionsFiller: QuestionsFillerScreen,
  name: NameScreen,
  goal: GoalScreen,
  height: HeightScreen,
  weight: WeightScreen,
  age: AgeScreen,
  activity: ActivityScreen,
  accountFiller: AccountFillerScreen,
  phone: PhoneScreen,
  otp: OtpScreen,
  password: NewPasswordScreen,
  goalsFiller: GoalsFillerScreen,
  target: TargetScreen,
  restrictions: RestrictionsScreen,
  learningFiller: LearningFillerScreen,
  triedBefore: TriedBeforeScreen,
  challenge: ChallengeScreen,
  time: TimeScreen,
  recap: RecapScreen,
  paywall: PaywallScreen,
};
export type ProgressScreenName = keyof typeof onboardingProgressScreens;

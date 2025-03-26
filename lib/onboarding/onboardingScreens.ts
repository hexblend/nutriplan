import NewPasswordScreen from '@/app/auth/(common)/new-password';
import OtpScreen from '@/app/auth/(common)/otp';
import PhoneScreen from '@/app/auth/(common)/phone';
import {
  AccountFillerScreen,
  GoalsFillerScreen,
  LearningFillerScreen,
  QuestionsFillerScreen,
} from '@/app/auth/(onboarding)/(fillers)/filler-screens';
import TargetScreen from '@/app/auth/(onboarding)/(target-conditional)/target-screen';
import ActivityScreen from '@/app/auth/(onboarding)/activity';
import AgeScreen from '@/app/auth/(onboarding)/age';
import ChallengeScreen from '@/app/auth/(onboarding)/challenge';
import GoalScreen from '@/app/auth/(onboarding)/goal';
import HeightScreen from '@/app/auth/(onboarding)/height';
import NameScreen from '@/app/auth/(onboarding)/name';
import PaywallScreen from '@/app/auth/(onboarding)/paywall';
import RecapScreen from '@/app/auth/(onboarding)/recap';
import RestrictionsScreen from '@/app/auth/(onboarding)/restrictions';
import TimeScreen from '@/app/auth/(onboarding)/time';
import TriedBeforeScreen from '@/app/auth/(onboarding)/tried-before';
import WeightScreen from '@/app/auth/(onboarding)/weight';
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

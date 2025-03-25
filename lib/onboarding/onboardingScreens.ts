import NewPasswordScreen from '@/app/auth/(common)/new-password';
import OtpScreen from '@/app/auth/(common)/otp';
import PhoneScreen from '@/app/auth/(common)/phone';
import {
  AccountFillerScreen,
  GoalsFillerScreen,
  LearningFillerScreen,
  QuestionsFillerScreen,
  UnderstandingFillerScreen,
} from '@/app/auth/(onboarding)/(fillers)/filler-screens';
import TargetActivityScreen from '@/app/auth/(onboarding)/(target-conditional)/target-activity';
import TargetConditionScreen from '@/app/auth/(onboarding)/(target-conditional)/target-condition';
import TargetMaintenanceScreen from '@/app/auth/(onboarding)/(target-conditional)/target-maintenance';
import TargetSportScreen from '@/app/auth/(onboarding)/(target-conditional)/target-sport';
import TargetWeightScreen from '@/app/auth/(onboarding)/(target-conditional)/target-weight';
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
  understandingFiller: UnderstandingFillerScreen,
  height: HeightScreen,
  weight: WeightScreen,
  age: AgeScreen,
  activity: ActivityScreen,
  accountFiller: AccountFillerScreen,
  phone: PhoneScreen,
  otp: OtpScreen,
  password: NewPasswordScreen,
  goalsFiller: GoalsFillerScreen,
  targetWeight: TargetWeightScreen,
  targetActivity: TargetActivityScreen,
  targetMaintenance: TargetMaintenanceScreen,
  targetCondition: TargetConditionScreen,
  targetSport: TargetSportScreen,
  restrictions: RestrictionsScreen,
  learningFiller: LearningFillerScreen,
  triedBefore: TriedBeforeScreen,
  challenge: ChallengeScreen,
  time: TimeScreen,
  recap: RecapScreen,
  paywall: PaywallScreen,
};
export type ProgressScreenName = keyof typeof onboardingProgressScreens;

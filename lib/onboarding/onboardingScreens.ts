import NewPasswordScreen from '@/app/auth/(common)/new-password';
import OtpScreen from '@/app/auth/(common)/otp';
import PhoneScreen from '@/app/auth/(common)/phone';
import AccountFillerScreen from '@/app/auth/(onboarding)/(fillers)/account-filler';
import DoneFillerScreen from '@/app/auth/(onboarding)/(fillers)/done-filler';
import GoalsFillerScreen from '@/app/auth/(onboarding)/(fillers)/goals-filler';
import LearningFillerScreen from '@/app/auth/(onboarding)/(fillers)/learning-filler';
import UnderstandingFillerScreen from '@/app/auth/(onboarding)/(fillers)/understanding-filler';
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
  doneFiller: DoneFillerScreen,
  recap: RecapScreen,
  paywall: PaywallScreen,
};
export type ProgressScreenName = keyof typeof onboardingProgressScreens;

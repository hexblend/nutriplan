import { OnboardingTargetActivity } from '@/app/auth/(onboarding)/(target-conditional)/target-activity';
import { OnboardingTargetSport } from '@/app/auth/(onboarding)/(target-conditional)/target-sport';
import { OnboardingChallenge } from '@/app/auth/(onboarding)/challenge';
import { OnboardingGoal } from '@/app/auth/(onboarding)/goal';
import { OnboardingDietaryRestriction } from '@/app/auth/(onboarding)/restrictions';
import { OnboardingTime } from '@/app/auth/(onboarding)/time';
import { OnboardingTriedBefore } from '@/app/auth/(onboarding)/tried-before';
import { ProgressScreenName } from '@/lib/onboarding/onboardingScreens';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface OnboardingContextType {
  // Navigation
  currentScreenName: ProgressScreenName;
  setCurrentScreenName: Dispatch<SetStateAction<ProgressScreenName>>;
  isForward: boolean;
  setIsForward: Dispatch<SetStateAction<boolean>>;
  // Name
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  // Goal
  goal: OnboardingGoal | undefined;
  setGoal: Dispatch<SetStateAction<OnboardingGoal | undefined>>;
  // Height
  height: string;
  setHeight: Dispatch<SetStateAction<string>>;
  heightUnit: 'metric' | 'imperial';
  setHeightUnit: Dispatch<SetStateAction<'metric' | 'imperial'>>;
  // Weight
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  weightUnit: 'metric' | 'imperial';
  setWeightUnit: Dispatch<SetStateAction<'metric' | 'imperial'>>;
  // Target Weight
  targetWeightKg: number | undefined;
  setTargetWeightKg: Dispatch<SetStateAction<number | undefined>>;
  // Age & Sex
  age: string;
  setAge: Dispatch<SetStateAction<string>>;
  sex: 'male' | 'female';
  setSex: Dispatch<SetStateAction<'male' | 'female'>>;
  // Activity
  activity: string;
  setActivity: Dispatch<SetStateAction<string>>;
  // Phone
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  // Client ID
  clientId: string | undefined;
  setClientId: Dispatch<SetStateAction<string | undefined>>;
  // Target Activity
  targetActivity: OnboardingTargetActivity | undefined;
  setTargetActivity: Dispatch<
    SetStateAction<OnboardingTargetActivity | undefined>
  >;
  // Target Maintenance
  targetMaintenance: string;
  setTargetMaintenance: Dispatch<SetStateAction<string>>;
  // Target Condition
  targetCondition: string;
  setTargetCondition: Dispatch<SetStateAction<string>>;
  // Target Sport
  targetSport: OnboardingTargetSport | undefined;
  setTargetSport: Dispatch<SetStateAction<OnboardingTargetSport | undefined>>;
  // Dietary Restrictions
  dietaryRestrictions: OnboardingDietaryRestriction[];
  setDietaryRestrictions: Dispatch<
    SetStateAction<OnboardingDietaryRestriction[]>
  >;
  // Tried Before
  triedBefore: OnboardingTriedBefore | undefined;
  setTriedBefore: Dispatch<SetStateAction<OnboardingTriedBefore | undefined>>;
  // Challenge
  challenge: OnboardingChallenge | undefined;
  setChallenge: Dispatch<SetStateAction<OnboardingChallenge | undefined>>;
  // Time
  time: OnboardingTime | undefined;
  setTime: Dispatch<SetStateAction<OnboardingTime | undefined>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

interface OnboardingProviderProps {
  children: ReactNode;
}
export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  // Navigation
  const [currentScreenName, setCurrentScreenName] =
    useState<OnboardingContextType['currentScreenName']>('questionsFiller');
  const [isForward, setIsForward] =
    useState<OnboardingContextType['isForward']>(true);
  // Name
  const [firstName, setFirstName] =
    useState<OnboardingContextType['firstName']>('');
  const [lastName, setLastName] =
    useState<OnboardingContextType['lastName']>('');
  // Goal
  const [goal, setGoal] = useState<OnboardingContextType['goal']>(undefined);
  // Height
  const [height, setHeight] =
    useState<OnboardingContextType['height']>('170 cm');
  const [heightUnit, setHeightUnit] =
    useState<OnboardingContextType['heightUnit']>('metric');
  // Weight
  const [weight, setWeight] =
    useState<OnboardingContextType['weight']>('80 kg');
  const [weightUnit, setWeightUnit] =
    useState<OnboardingContextType['weightUnit']>('metric');
  // Target Weight
  const [targetWeightKg, setTargetWeightKg] =
    useState<OnboardingContextType['targetWeightKg']>(undefined);
  // Age & Sex
  const [age, setAge] = useState<OnboardingContextType['age']>('30');
  const [sex, setSex] = useState<OnboardingContextType['sex']>('female');
  // Activity
  const [activity, setActivity] =
    useState<OnboardingContextType['activity']>('');
  // Phone
  const [phoneNumber, setPhoneNumber] =
    useState<OnboardingContextType['phoneNumber']>('');
  // Client ID
  const [clientId, setClientId] =
    useState<OnboardingContextType['clientId']>(undefined);
  // Target Activity
  const [targetActivity, setTargetActivity] =
    useState<OnboardingContextType['targetActivity']>(undefined);
  // Target Maintenance
  const [targetMaintenance, setTargetMaintenance] =
    useState<OnboardingContextType['targetMaintenance']>('');
  // Target Condition
  const [targetCondition, setTargetCondition] =
    useState<OnboardingContextType['targetCondition']>('');
  // Target Sport
  const [targetSport, setTargetSport] =
    useState<OnboardingContextType['targetSport']>(undefined);
  // Dietary Restrictions
  const [dietaryRestrictions, setDietaryRestrictions] = useState<
    OnboardingContextType['dietaryRestrictions']
  >([]);
  // Tried Before
  const [triedBefore, setTriedBefore] =
    useState<OnboardingContextType['triedBefore']>(undefined);
  // Challenge
  const [challenge, setChallenge] =
    useState<OnboardingContextType['challenge']>(undefined);
  // Time
  const [time, setTime] = useState<OnboardingContextType['time']>(undefined);

  return (
    <OnboardingContext.Provider
      value={{
        // Navigation
        currentScreenName,
        setCurrentScreenName,
        isForward,
        setIsForward,
        // Name
        firstName,
        setFirstName,
        lastName,
        setLastName,
        // Goal
        goal,
        setGoal,
        // Height
        height,
        setHeight,
        heightUnit,
        setHeightUnit,
        // Weight
        weight,
        setWeight,
        weightUnit,
        setWeightUnit,
        // Target Weight
        targetWeightKg,
        setTargetWeightKg,
        // Age & Sex
        age,
        setAge,
        sex,
        setSex,
        // Activity
        activity,
        setActivity,
        // Phone
        phoneNumber,
        setPhoneNumber,
        // Client ID
        clientId,
        setClientId,
        // Target Activity
        targetActivity,
        setTargetActivity,
        // Target Maintenance
        targetMaintenance,
        setTargetMaintenance,
        // Target Condition
        targetCondition,
        setTargetCondition,
        // Target Sport
        targetSport,
        setTargetSport,
        // Dietary Restrictions
        dietaryRestrictions,
        setDietaryRestrictions,
        // Tried Before
        triedBefore,
        setTriedBefore,
        // Challenge
        challenge,
        setChallenge,
        // Time
        time,
        setTime,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      'useOnboardingProvider must be used within an OnboardingProvider'
    );
  }
  return context;
};

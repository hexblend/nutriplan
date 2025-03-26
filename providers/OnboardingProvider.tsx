import { OnboardingTargetActivity } from '@/app/auth/(onboarding)/(target-conditional)/target-activity';
import { OnboardingGoal } from '@/app/auth/(onboarding)/goal';
import { ProgressScreenName } from '@/lib/onboarding/onboardingScreens';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type OnboardingTargetSport =
  | 'Endurance sports (running, cycling)'
  | 'Team sports'
  | 'Strength training'
  | 'High intensity interval training'
  | 'CrossFit/functional fitness'
  | 'Yoga/flexibility-focused training';

export type OnboardingDietaryRestriction =
  | 'No restrictions'
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-free'
  | 'Dairy-free'
  | 'Keto'
  | 'Pescatarian';

export type OnboardingTriedBefore =
  | 'Yes, but it was too complicated'
  | "Yes, but I couldn't stick with it"
  | 'Yes, and it worked for a while'
  | 'No, this is my first time';

export type OnboardingChallenge =
  | 'Lack of time to prepare meals'
  | 'Not knowing what to eat'
  | 'Cravings and temptations'
  | 'Complicated recipes'
  | 'Meal repetition / boredom';

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
  // Weight
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  // Target Weight
  targetWeight: string;
  setTargetWeight: Dispatch<SetStateAction<string>>;
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
    useState<OnboardingContextType['currentScreenName']>('challenge');
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
  // Weight
  const [weight, setWeight] =
    useState<OnboardingContextType['weight']>('80 kg');
  // Target Weight
  const [targetWeight, setTargetWeight] =
    useState<OnboardingContextType['targetWeight']>('');
  // Age & Sex
  const [age, setAge] = useState<OnboardingContextType['age']>('30');
  const [sex, setSex] = useState<OnboardingContextType['sex']>('female');
  // Activity
  const [activity, setActivity] =
    useState<OnboardingContextType['activity']>('');
  // Phone
  const [phoneNumber, setPhoneNumber] =
    useState<OnboardingContextType['phoneNumber']>('');
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
        // Weight
        weight,
        setWeight,
        // Target Weight
        targetWeight,
        setTargetWeight,
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

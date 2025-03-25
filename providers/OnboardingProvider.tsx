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
  goal: string;
  setGoal: Dispatch<SetStateAction<string>>;
  // Height
  height: string;
  setHeight: Dispatch<SetStateAction<string>>;
  // Weight
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  // Age & Sex
  age: string;
  setAge: Dispatch<SetStateAction<string>>;
  sex: 'male' | 'female';
  setSex: Dispatch<SetStateAction<'male' | 'female'>>;
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
    useState<OnboardingContextType['currentScreenName']>('age');
  const [isForward, setIsForward] =
    useState<OnboardingContextType['isForward']>(true);
  // Name
  const [firstName, setFirstName] =
    useState<OnboardingContextType['firstName']>('');
  const [lastName, setLastName] =
    useState<OnboardingContextType['lastName']>('');
  // Goal
  const [goal, setGoal] = useState<OnboardingContextType['goal']>('');
  // Height
  const [height, setHeight] =
    useState<OnboardingContextType['height']>('170 cm');
  // Weight
  const [weight, setWeight] =
    useState<OnboardingContextType['weight']>('80 kg');
  // Age & Sex
  const [age, setAge] = useState<OnboardingContextType['age']>('25');
  const [sex, setSex] = useState<OnboardingContextType['sex']>('male');

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
        // Age & Sex
        age,
        setAge,
        sex,
        setSex,
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

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
  // Weight
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
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
    useState<OnboardingContextType['currentScreenName']>('name');
  const [isForward, setIsForward] =
    useState<OnboardingContextType['isForward']>(true);
  // Name
  const [firstName, setFirstName] =
    useState<OnboardingContextType['firstName']>('');
  const [lastName, setLastName] =
    useState<OnboardingContextType['lastName']>('');
  // Goal
  const [goal, setGoal] = useState<OnboardingContextType['goal']>('');
  // Weight
  const [weight, setWeight] = useState<OnboardingContextType['weight']>('');

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
        // Weight
        weight,
        setWeight,
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

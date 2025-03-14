import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface OnboardingContextType {
  firstName: string | undefined;
  setFirstName: Dispatch<SetStateAction<string | undefined>>;
  lastName: string | undefined;
  setLastName: Dispatch<SetStateAction<string | undefined>>;
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
  const [firstName, setFirstName] =
    useState<OnboardingContextType['firstName']>(undefined);
  const [lastName, setLastName] =
    useState<OnboardingContextType['lastName']>(undefined);

  return (
    <OnboardingContext.Provider
      value={{ firstName, setFirstName, lastName, setLastName }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

import React, { ReactNode, createContext, useContext } from 'react';

interface CreateMealPlanContextType {}

const CreateMealPlanContext = createContext<
  CreateMealPlanContextType | undefined
>(undefined);

interface CreateMealPlanProviderProps {
  children: ReactNode;
}
export const CreateMealPlanProvider: React.FC<CreateMealPlanProviderProps> = ({
  children,
}) => {
  return (
    <CreateMealPlanContext.Provider value={{}}>
      {children}
    </CreateMealPlanContext.Provider>
  );
};

export const useCreateMealPlanContext = (): CreateMealPlanContextType => {
  const context = useContext(CreateMealPlanContext);
  if (context === undefined) {
    throw new Error(
      'useCreateMealPlanContext must be used within a CreateMealPlanProvider'
    );
  }
  return context;
};

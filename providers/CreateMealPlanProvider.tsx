import React, { ReactNode, createContext, useContext, useState } from 'react';

interface CreateMealPlanContextType {
  dailyCalories: number | null;
  setDailyCalories: React.Dispatch<React.SetStateAction<number | null>>;
}

const CreateMealPlanContext = createContext<
  CreateMealPlanContextType | undefined
>(undefined);

interface CreateMealPlanProviderProps {
  children: ReactNode;
}
export const CreateMealPlanProvider: React.FC<CreateMealPlanProviderProps> = ({
  children,
}) => {
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);

  return (
    <CreateMealPlanContext.Provider value={{ dailyCalories, setDailyCalories }}>
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

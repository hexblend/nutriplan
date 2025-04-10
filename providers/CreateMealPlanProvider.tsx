import React, { ReactNode, createContext, useContext, useState } from 'react';

interface CreateMealPlanContextType {
  // Calories
  dailyCalories: number | null;
  setDailyCalories: React.Dispatch<React.SetStateAction<number | null>>;
  isCustomCalories: boolean;
  setIsCustomCalories: React.Dispatch<React.SetStateAction<boolean>>;
  // Macronutrients
  proteins: number;
  setProteins: React.Dispatch<React.SetStateAction<number>>;
  carbs: number;
  setCarbs: React.Dispatch<React.SetStateAction<number>>;
  lipids: number;
  setLipids: React.Dispatch<React.SetStateAction<number>>;
  // Meals
  meals: string[];
  setMeals: React.Dispatch<React.SetStateAction<string[]>>;
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
  // Calories
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const [isCustomCalories, setIsCustomCalories] = useState<boolean>(false);
  // Macronutrients
  const [proteins, setProteins] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(50);
  const [lipids, setLipids] = useState<number>(20);
  // Meals
  const [meals, setMeals] = useState<string[]>([]);

  return (
    <CreateMealPlanContext.Provider
      value={{
        // Calories
        dailyCalories,
        setDailyCalories,
        isCustomCalories,
        setIsCustomCalories,
        // Macronutrients
        proteins,
        setProteins,
        carbs,
        setCarbs,
        lipids,
        setLipids,
        // Meals
        meals,
        setMeals,
      }}
    >
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

import { OnboardingDietaryRestriction } from '@/app/auth/(onboarding)/restrictions';
import { DailyMeal } from '@/app/plans/meals';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ContextType {
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
  meals: DailyMeal[];
  setMeals: React.Dispatch<React.SetStateAction<DailyMeal[]>>;
  // Restrictions
  restrictions: OnboardingDietaryRestriction[];
  setRestrictions: React.Dispatch<
    React.SetStateAction<OnboardingDietaryRestriction[]>
  >;
  // Equipment
  equipment: string[];
  setEquipment: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateMealPlanContext = createContext<ContextType | undefined>(undefined);

interface CreateMealPlanProviderProps {
  children: ReactNode;
}
export const CreateMealPlanProvider: React.FC<CreateMealPlanProviderProps> = ({
  children,
}) => {
  // Calories
  const [dailyCalories, setDailyCalories] =
    useState<ContextType['dailyCalories']>(null);
  const [isCustomCalories, setIsCustomCalories] =
    useState<ContextType['isCustomCalories']>(false);
  // Macronutrients
  const [proteins, setProteins] = useState<ContextType['proteins']>(30);
  const [carbs, setCarbs] = useState<ContextType['carbs']>(50);
  const [lipids, setLipids] = useState<ContextType['lipids']>(20);
  // Meals
  const [meals, setMeals] = useState<ContextType['meals']>([]);
  // Restrictions
  const [restrictions, setRestrictions] = useState<ContextType['restrictions']>(
    []
  );
  // Equipment
  const [equipment, setEquipment] = useState<ContextType['equipment']>([
    'aragaz',
  ]);

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
        // Restrictions
        restrictions,
        setRestrictions,
        // Equipment
        equipment,
        setEquipment,
      }}
    >
      {children}
    </CreateMealPlanContext.Provider>
  );
};

export const useCreateMealPlanContext = (): ContextType => {
  const context = useContext(CreateMealPlanContext);
  if (context === undefined) {
    throw new Error(
      'useCreateMealPlanContext must be used within a CreateMealPlanProvider'
    );
  }
  return context;
};

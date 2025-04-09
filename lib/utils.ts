import { Tables } from '@/supabase/database.types';
import { clsx, type ClassValue } from 'clsx';
import { Alert } from 'react-native';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line
export const bucketUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/app/`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throwError = (message: string, error?: any) => {
  console.error(message, error);
  return Alert.alert('Error', message, [{ text: 'OK' }]);
};

/**
 * Convertors
 */
export const kgToLbs = (kg: number) => Math.round(kg * 2.20462);

export const lbsToKg = (lbs: number) => parseFloat((lbs / 2.20462).toFixed(1));

export const cmToFeetAndInches = (cm: number): string => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12); // 1 foot = 12 inches
  const inches = Math.round(totalInches % 12); // Remaining inches
  // If inches is 12, add 1 to feet and set inches to 0
  if (inches === 12) {
    return `${feet + 1}'0"`;
  }
  return `${feet}'${inches}"`;
};

export const feetAndInchesToCm = (feet: number, inches: number): number => {
  const totalInches = feet * 12 + inches;
  const cm = totalInches * 2.54;
  return Math.round(cm * 10) / 10;
};

export const parseFeetAndInches = (
  value: string
): { feet: number; inches: number } => {
  const regex = /(\d+)'(\d+)"?/;
  const match = value.match(regex);

  if (match) {
    return {
      feet: parseInt(match[1], 10),
      inches: parseInt(match[2], 10),
    };
  }

  return { feet: 0, inches: 0 };
};

export const displayHeight = (
  height_cm: number | null,
  unit: 'metric' | 'imperial'
): string => {
  if (!height_cm) return 'N/A';

  if (unit === 'imperial') {
    return cmToFeetAndInches(height_cm);
  }
  return `${height_cm} cm`;
};

export const displayWeight = (
  weight_kg: number | null,
  unit: 'metric' | 'imperial'
): string => {
  if (!weight_kg) return 'N/A';

  if (unit === 'imperial') {
    return `${kgToLbs(weight_kg)} lbs`;
  }
  return `${weight_kg} kg`;
};

/**
 * PROFILE CALCULATORS
 */
/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 */
export const calculateBMR = (client: Tables<'clients'> | null): number => {
  if (!client) return 0;

  const weight = client.weight_kg ?? 0;
  const height = client.height_cm ?? 0;
  const age = client.age ?? 0;
  const sex = client.sex ?? 'masculin';

  const formula = 10 * weight + 6.25 * height - 5 * age;
  return sex === 'masculin' ? formula + 5 : formula - 161;
};

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on BMR and activity level
 */
export const calculateTDEE = (
  bmr: number,
  client: Tables<'clients'> | null
): number => {
  if (!client) return 0;

  const activity = client.activity_level;

  let activityFactor;
  if (activity === 'Sedentary') activityFactor = 1.2;
  else if (activity === 'Lightly active') activityFactor = 1.375;
  else if (activity === 'Moderately active') activityFactor = 1.55;
  else if (activity === 'Very active') activityFactor = 1.725;
  else if (activity === 'Extremely active') activityFactor = 1.9;
  else activityFactor = 1.2; // Default to sedentary if unknown

  return Math.ceil(bmr * activityFactor);
};

export const calculateWeeksToGoal = (
  currentClient: Tables<'clients'> | null,
  dailyCalories: number
) => {
  if (!currentClient?.target_weight_kg || !currentClient?.weight_kg)
    return null;

  const minCalories = currentClient.sex === 'feminin' ? 1200 : 1500;
  if (dailyCalories < minCalories || dailyCalories > 5000) return null;

  const weightDiff = Math.abs(
    currentClient.target_weight_kg - currentClient.weight_kg
  );

  const bmr = calculateBMR(currentClient);
  const tdee = calculateTDEE(bmr, currentClient);

  // Determine if we're in a deficit or surplus
  const calorieDifference = dailyCalories - tdee;

  const goal = currentClient.goal;
  // Calories should be below TDEE
  if (goal === 'Lose weight' && calorieDifference > 0) {
    return null;
  }
  // Calories should be above TDEE
  if (goal === 'Increase muscle mass' && calorieDifference < 0) {
    return null;
  }
  // Calories should be close to TDEE (within 200 calories in either direction)
  if (
    goal === 'Maintain weight in a healthy way' &&
    Math.abs(calorieDifference) > 200
  ) {
    return null;
  }

  // Calculate weight change per week
  // 7700 calories = 1kg of fat (approximate)
  const weeklyWeightChange = (calorieDifference * 7) / 7700;

  // If the calorie difference is too small, return null
  if (Math.abs(weeklyWeightChange) < 0.1) {
    return null;
  }

  // Calculate weeks to goal based on the actual weight change rate
  return Math.ceil(weightDiff / Math.abs(weeklyWeightChange));
};

export const calculateDailyCalories = (
  client: Tables<'clients'> | null
): number | null => {
  if (!client) return null;

  const goal = client.goal;
  const targetActivity = client.target_activity;
  const targetSport = client.target_sport;
  const targetMaintenance = client.target_maintenance;

  // Calculate BMR using Mifflin-St Jeor Equation
  const bmr = calculateBMR(client);

  // Calculate TDEE based on activity level
  const tdee = calculateTDEE(bmr, client);

  // Variables for different goal calculations
  let deficitFactor = 300;
  let surplusFactor = 300;
  let maintenanceAdjustment = 0;
  let conditionAdjustment = -100;
  let performanceAdjustment = 0;

  // Calculate target calories based on goal and other factors
  switch (goal) {
    case 'Lose weight':
      deficitFactor = 300;
      if (targetActivity) {
        if (targetActivity === 'sedentary') deficitFactor = 200;
        else if (targetActivity === '1-2 times') deficitFactor = 300;
        else if (targetActivity === '3-4 times') deficitFactor = 400;
        else if (targetActivity === '5+ times') deficitFactor = 600;
      }
      return Math.max(tdee - deficitFactor, 1200); // Minimum 1200 kcal

    case 'Increase muscle mass':
      surplusFactor = 300;
      if (targetActivity) {
        if (targetActivity === 'sedentary') surplusFactor = 200;
        else if (targetActivity === '1-2 times') surplusFactor = 300;
        else if (targetActivity === '3-4 times') surplusFactor = 400;
        else if (targetActivity === '5+ times') surplusFactor = 600; // More aggressive surplus
      }
      return tdee + surplusFactor;

    case 'Maintain weight in a healthy way':
      maintenanceAdjustment = 0;
      // Only adjust if target maintenance exists
      if (targetMaintenance) {
        if (targetMaintenance === 'Overall wellbeing') {
          maintenanceAdjustment = 0; // Standard maintenance
        } else if (targetMaintenance === 'Current weight') {
          maintenanceAdjustment = 0; // Standard maintenance
        } else if (targetMaintenance === 'Energy levels') {
          maintenanceAdjustment = 100; // Slightly higher for energy
        } else if (targetMaintenance === 'Athletic performance') {
          maintenanceAdjustment = 200; // Higher for performance
        } else if (targetMaintenance === 'Mental clarity and focus') {
          maintenanceAdjustment = 50; // Slightly higher for mental clarity
        }
      }
      return tdee + maintenanceAdjustment;

    case 'Diet for a health condition':
      // For health conditions, use TDEE as base with slight reduction
      conditionAdjustment = -100;
      return Math.max(tdee + conditionAdjustment, 1200); // Minimum 1200 kcal

    case 'Performance for athletes':
      // For athletes, use TDEE as base with increase based on sport
      performanceAdjustment = 0;
      // Only adjust if target sport exists
      if (targetSport) {
        if (targetSport === 'Endurance sports (running, cycling)') {
          performanceAdjustment = 300; // Higher for endurance
        } else if (targetSport === 'Team sports') {
          performanceAdjustment = 250; // Moderate increase
        } else if (targetSport === 'Strength training') {
          performanceAdjustment = 200; // Moderate increase
        } else if (targetSport === 'High intensity interval training') {
          performanceAdjustment = 250; // Moderate increase
        } else if (targetSport === 'CrossFit/functional fitness') {
          performanceAdjustment = 300; // Higher for functional fitness
        } else if (targetSport === 'Yoga/flexibility-focused training') {
          performanceAdjustment = 100; // Lower for yoga
        }
      }
      return tdee + performanceAdjustment;

    default:
      // For any other case, use TDEE
      return tdee;
  }
};

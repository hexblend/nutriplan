import { Tables } from '@/supabase/database.types';
import { clsx, type ClassValue } from 'clsx';
import { Alert } from 'react-native';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line
export const bucketUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/app/`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const throwError = (message: string, error?: any) => {
  console.error(message, error);
  return Alert.alert('Error', message, [{ text: 'OK' }]);
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
export const calculateWeeksToGoal = (
  currentClient: Tables<'clients'> | null
) => {
  if (!currentClient?.target_weight_kg || !currentClient?.weight_kg)
    return null;

  const weightDiff = Math.abs(
    currentClient.target_weight_kg - currentClient.weight_kg
  );
  // Assuming 1kg per month = 4 weeks
  return Math.ceil(weightDiff * 4);
};

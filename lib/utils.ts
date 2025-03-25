import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

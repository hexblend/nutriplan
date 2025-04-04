import { translateValue } from '@/components/features/onboarding/recap/TranslationMap';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

interface ProfileActivityLevelProps {
  className?: string;
}

export default function ProfileActivityLevel({
  className,
}: ProfileActivityLevelProps) {
  const { currentClient } = useSession();
  const [targetCalories, setTargetCalories] = useState<number | null>(null);

  useEffect(() => {
    if (!currentClient) return;
    const weight = currentClient.weight_kg ?? 0;
    const height = currentClient.height_cm ?? 0;
    const age = currentClient.age ?? 0;
    const sex = currentClient.sex ?? 'masculin';
    const goal = currentClient.goal;
    const activity = currentClient.activity_level;
    const targetActivity = currentClient.target_activity;
    const targetSport = currentClient.target_sport;
    const targetMaintenance = currentClient.target_maintenance;

    // Calculate BMR using Mifflin-St Jeor Equation
    const formula = 10 * weight + 6.25 * height - 5 * age;
    const baseRMB = sex === 'masculin' ? formula + 5 : formula - 161;

    // Calculate TDEE based on activity level - using values from activity.tsx
    let activityFactor;
    if (activity === 'Sedentary') activityFactor = 1.2;
    else if (activity === 'Lightly active') activityFactor = 1.375;
    else if (activity === 'Moderately active') activityFactor = 1.55;
    else if (activity === 'Very active') activityFactor = 1.725;
    else if (activity === 'Extremely active') activityFactor = 1.9;
    else activityFactor = 1.2; // Default to sedentary if unknown

    const calculatedTdee = Math.ceil(baseRMB * activityFactor);

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
        setTargetCalories(Math.max(calculatedTdee - deficitFactor, 1200)); // Minimum 1200 kcal
        break;

      case 'Increase muscle mass':
        surplusFactor = 300;
        if (targetActivity) {
          if (targetActivity === 'sedentary') surplusFactor = 200;
          else if (targetActivity === '1-2 times') surplusFactor = 300;
          else if (targetActivity === '3-4 times') surplusFactor = 400;
          else if (targetActivity === '5+ times') surplusFactor = 600; // More aggressive surplus
        }
        setTargetCalories(calculatedTdee + surplusFactor);
        break;

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

        setTargetCalories(calculatedTdee + maintenanceAdjustment);
        break;

      case 'Diet for a health condition':
        // For health conditions, use TDEE as base with slight reduction
        conditionAdjustment = -100;
        setTargetCalories(Math.max(calculatedTdee + conditionAdjustment, 1200)); // Minimum 1200 kcal
        break;

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

        setTargetCalories(calculatedTdee + performanceAdjustment);
        break;

      default:
        // For any other case, use TDEE
        setTargetCalories(calculatedTdee);
        break;
    }
  }, [currentClient]);

  return (
    <View className={cn(className)}>
      {/*  Calories */}
      <View className="mb-2 flex-row items-center justify-center gap-2">
        <Octicons name="flame" size={18} color="#ea580c" />
        <Text className="text-center text-3xl font-bold">
          {targetCalories ? `${targetCalories} Kcal` : '--- Kcal'}
        </Text>
      </View>

      {/*  Daily intake for Goal */}
      <Text className="mt-1 w-2/3 self-center text-center text-xl">
        {t.t('profile.dailyIntake')}{' '}
        <Text className="lowercase">
          {translateValue('goal', currentClient?.goal ?? '')}
        </Text>
      </Text>

      {/*  Set Activity Level */}
      <Button variant="tertiary" className="mt-4 flex-row items-center gap-2">
        <FontAwesome name="edit" size={16} color="white" />
        <Text>
          {currentClient?.activity_level
            ? translateValue('activity', currentClient.activity_level)
            : t.t('profile.setActivityLevel')}
        </Text>
      </Button>
    </View>
  );
}

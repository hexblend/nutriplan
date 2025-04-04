import { BmiRange } from '@/components/blocks/BmiRange';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Animated } from 'react-native';

interface ProfileBmiRangeProps {
  className?: string;
}
export default function ProfileBmiRange({ className }: ProfileBmiRangeProps) {
  const [opacity] = useState(new Animated.Value(0));
  const { currentClient } = useSession();

  const calculateBmi = () => {
    if (!currentClient?.height_cm || !currentClient?.weight_kg) {
      return 0;
    }
    const heightInMeters = currentClient.height_cm / 100;
    // Calculate BMI: weight (kg) / (height (m))²
    const bmi = currentClient.weight_kg / (heightInMeters * heightInMeters);
    return bmi;
  };

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      return () => {
        opacity.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View style={{ opacity }}>
      <BmiRange bmi={calculateBmi()} className={cn(className)} />
    </Animated.View>
  );
}

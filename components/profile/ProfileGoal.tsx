import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { Button } from '../ui/button';
import Frame from '../ui/frame';

interface ProfileGoalProps {
  className?: string;
}

export default function ProfileGoal({ className }: ProfileGoalProps) {
  const [opacity] = useState(new Animated.Value(0));

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
      <Frame className={cn('mb-10', className)}>
        <Text className="text-center text-2xl font-bold">
          Goal:{' '}
          <Text className="text-2xl font-bold text-green-500">-12 kg</Text>
        </Text>
        <Text className="mt-2 text-center font-bold">
          Achievable in:{' '}
          <Text className="font-bold text-green-500">48 weeks</Text>
        </Text>
      </Frame>
      <Button variant="secondary" className="mt-2 flex-row items-center gap-2">
        <FontAwesome name="edit" size={16} color="white" />
        <Text>Change goal</Text>
      </Button>
    </Animated.View>
  );
}

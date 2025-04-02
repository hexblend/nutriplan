import { Text } from '@/components/ui/text';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import Frame from '../ui/frame';

export default function ProfileGoal() {
  const [opacity] = useState(new Animated.Value(0));

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      return () => {
        opacity.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View style={{ opacity }}>
      <Frame className="mb-10 mt-8">
        <Text className="text-center text-2xl font-bold">
          Goal:{' '}
          <Text className="text-2xl font-bold text-green-500">-12 kg</Text>
        </Text>
        <Text className="mt-2 text-center font-bold">
          Achievable in:{' '}
          <Text className="font-bold text-green-500">48 weeks</Text>
        </Text>
      </Frame>
    </Animated.View>
  );
}

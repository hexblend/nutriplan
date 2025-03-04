import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/ui/Text';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Tab One</Text>
      <Text className="text-xl">Tab One</Text>
      <View className="h-1 w-[80%] bg-gray-200 my-4" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

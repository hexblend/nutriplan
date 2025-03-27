import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-background p-4">
      <Text className="mb-6 text-2xl font-bold text-foreground">Welcome</Text>
    </View>
  );
}

import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View className="flex-1 p-4 bg-background">
      <Text className="text-2xl font-bold mb-6 text-foreground">Welcome</Text>
    </View>
  );
}

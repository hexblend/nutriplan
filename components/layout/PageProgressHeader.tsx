import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Progress } from '../ui/progress';

interface PageProgressHeaderProps {
  progress?: number;
  onBackPress?: () => void;
}

export default function PageProgressHeader({
  progress = 10,
  onBackPress,
}: PageProgressHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="mb-2 bg-transparent"
      style={{ paddingTop: insets.top - 5 }}
    >
      <View className="min-h-[52px] flex-row items-center pl-0 pr-4">
        <Pressable
          onPress={onBackPress}
          className="flex-row items-center pl-4 active:opacity-50"
          hitSlop={8}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <FontAwesome6 name="arrow-left" size={27} color="#FFF" />
        </Pressable>

        <Progress value={progress} className="ml-4 flex-1" />
      </View>
    </View>
  );
}

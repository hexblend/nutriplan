import { Ionicons } from '@expo/vector-icons';
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
    <View className="bg-transparent" style={{ paddingTop: insets.top - 5 }}>
      <View className="min-h-[52px] flex-row items-center pl-0 pr-4">
        <Pressable
          onPress={onBackPress}
          className="mr-2 flex-row items-center active:opacity-50"
          hitSlop={8}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Ionicons name="chevron-back" size={32} color="#FFF" />
        </Pressable>

        <Progress value={progress} className="flex-1" />
      </View>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Progress } from '../ui/progress';

interface PageProgressHeaderProps {
  progress?: number;
}

export default function PageProgressHeader({
  progress = 10,
}: PageProgressHeaderProps) {
  const navigation = useNavigation();

  const canGoBack = navigation?.canGoBack();

  const handleBack = () => {
    if (canGoBack) {
      navigation?.goBack();
    }
  };

  return (
    <View className="bg-transparent pt-12">
      <View className="min-h-[52px] flex-row items-center px-2 py-3">
        <Pressable
          onPress={handleBack}
          className="mr-2 flex-row items-center active:opacity-50"
          hitSlop={8}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </Pressable>

        <Progress value={progress} className="mr-8" />
      </View>
    </View>
  );
}

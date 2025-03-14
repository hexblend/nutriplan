import Logo from '@/assets/images/svg/logo.svg';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

interface QuestionHeaderProps {
  children: string;
}

export default function QuestionHeader({ children }: QuestionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pb-2">
      <Logo width={60} height={60} />
      <Text className="ml-6 flex-1 font-bold">{children}</Text>
    </View>
  );
}

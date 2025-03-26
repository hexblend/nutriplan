import Logo from '@/assets/images/svg/logo.svg';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';

interface QuestionHeaderProps {
  children: string;
  className?: string;
}

export default function QuestionHeader({
  children,
  className,
}: QuestionHeaderProps) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-between px-4 pb-2',
        className
      )}
    >
      <Logo width={60} height={60} />
      <Text className="ml-6 flex-1 font-bold">{children}</Text>
    </View>
  );
}

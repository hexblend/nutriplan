import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

interface PageWrapperProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  footer?: JSX.Element;
}

export default function PageWrapper({
  className,
  children,
  footer,
}: PageWrapperProps) {
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className={cn('px-4', className)}>{children}</ScrollView>
      </SafeAreaView>
      {footer && footer}
    </View>
  );
}

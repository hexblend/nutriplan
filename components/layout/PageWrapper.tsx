import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

interface PageWrapperProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  footer?: JSX.Element;
  header?: JSX.Element;
}

export default function PageWrapper({
  className,
  children,
  footer,
  header,
}: PageWrapperProps) {
  return (
    <>
      {header && header}
      <View className="flex-1">
        <SafeAreaView className="flex-1">
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            className={cn('px-4', className)}
          >
            <View className="mb-24">{children}</View>
          </ScrollView>
        </SafeAreaView>
        {footer && footer}
      </View>
    </>
  );
}

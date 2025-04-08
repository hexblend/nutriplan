import { cn } from '@/lib/utils';
import React, { JSX } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

interface PageWrapperProps {
  className?: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element | JSX.Element[];
  footer?: JSX.Element;
  header?: JSX.Element;
}

export default function PageWrapper({
  className,
  containerStyle,
  children,
  footer,
  header,
}: PageWrapperProps) {
  return (
    <React.Fragment>
      {header && header}
      <View className={cn('flex-1')} style={containerStyle}>
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
    </React.Fragment>
  );
}

import { cn } from '@/lib/utils';
import React, { JSX } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PageFooterProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function PageFooter({ className, children }: PageFooterProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={cn(
        'mx-0.5 rounded-t-2xl border-t border-transparent px-4 pt-4',
        className
      )}
    >
      <View style={{ paddingBottom: insets.bottom + 10 }}>{children}</View>
    </KeyboardAvoidingView>
  );
}

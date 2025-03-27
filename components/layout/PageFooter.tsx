import { cn } from '@/lib/utils';
import React, { JSX } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PageFooterProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  withBorder?: boolean;
}

export default function PageFooter({
  className,
  children,
  withBorder,
}: PageFooterProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={cn(
        '-mx-3 rounded-t-2xl border-t border-transparent px-7',
        withBorder && 'border-t border-border',
        className
      )}
    >
      <View style={{ paddingBottom: insets.bottom + 10 }}>{children}</View>
    </KeyboardAvoidingView>
  );
}

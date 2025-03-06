import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface PageFooterProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function PageFooter({ className, children }: PageFooterProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={cn(
        'rounded-t-lg border-t border-white bg-white px-8 pt-2',
        className
      )}
      style={{ paddingBottom: insets.bottom }}
    >
      {children}
    </View>
  );
}

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
        'mx-0.5 rounded-t-2xl border-t border-transparent px-4 pt-4',
        className
      )}
      style={{ paddingBottom: insets.bottom + 10 }}
    >
      {children}
    </View>
  );
}

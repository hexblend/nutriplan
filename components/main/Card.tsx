import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}
export default function Card({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        'border-1 rounded-lg border-muted bg-accent p-4',
        className
      )}
      style={{ borderWidth: 1, borderBottomWidth: 4 }}
    >
      {children}
    </View>
  );
}

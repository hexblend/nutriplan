import { cn } from '@/lib/utils';
import { Link, LinkProps } from 'expo-router';
import { JSX } from 'react';
import { Pressable, View, ViewProps } from 'react-native';

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  asLink?: boolean;
  href?: LinkProps['href'];
}

function CardContent({ children, className }: ViewProps) {
  return (
    <View
      className={cn(
        'border-1 flex-1 rounded-lg border-muted bg-accent p-4',
        className
      )}
      style={{ borderWidth: 1, borderBottomWidth: 3 }}
    >
      {children}
    </View>
  );
}

export default function Card({
  children,
  className,
  asLink = false,
  href = '/',
}: CardProps) {
  if (asLink) {
    return (
      <Link href={href} asChild>
        <Pressable>
          <CardContent className={className}>{children}</CardContent>
        </Pressable>
      </Link>
    );
  }
  return <CardContent className={className}>{children}</CardContent>;
}

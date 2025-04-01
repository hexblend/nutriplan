import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { Link, LinkProps } from 'expo-router';
import { JSX, useRef } from 'react';
import { Animated, Easing, Pressable, View, ViewProps } from 'react-native';

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  asLink?: boolean;
  href?: LinkProps['href'];
}

function CardContent({ children, className }: ViewProps) {
  return (
    <View
      className={cn('flex-1 rounded-xl border-muted bg-accent p-4', className)}
      style={{ borderWidth: 1 }}
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
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 4,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (asLink) {
    return (
      <Animated.View
        style={{
          transform: [{ translateY }, { scale }],
          opacity,
        }}
      >
        <View className="relative">
          <View className="absolute -bottom-1 left-0 right-0 h-3 rounded-xl rounded-tl-none rounded-tr-none bg-muted opacity-70" />
          <Link href={href} asChild>
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
              <CardContent className={className}>{children}</CardContent>
            </Pressable>
          </Link>
        </View>
      </Animated.View>
    );
  }
  return <CardContent className={className}>{children}</CardContent>;
}

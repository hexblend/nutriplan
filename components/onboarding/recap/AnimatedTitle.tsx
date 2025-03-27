import { Text } from '@/components/ui/text';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface AnimatedTitleProps {
  title: string;
  delay: number;
  centered?: boolean;
}

export default function AnimatedTitle({
  title,
  delay,
  centered = false,
}: AnimatedTitleProps) {
  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, title, opacityAnim, translateXAnim]);

  if (!visible) return null;
  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: translateXAnim }],
      }}
      className={centered ? 'items-center' : ''}
    >
      <Text
        className={`mb-4 text-xl font-bold text-foreground ${centered ? 'text-center' : ''}`}
      >
        {title}
      </Text>
    </Animated.View>
  );
}

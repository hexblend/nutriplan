import { Text } from '@/components/ui/text';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface RecapItemProps {
  text: string;
  delay: number;
  icon?: keyof typeof FontAwesome.glyphMap;
  iconColor?: string;
  iconSize?: number;
}

export default function RecapItem({
  text,
  delay,
  icon = 'check-square',
  iconColor = '#22c55e',
  iconSize = 24,
}: RecapItemProps) {
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
  }, [delay, text, opacityAnim, translateXAnim]);

  if (!visible) return null;
  return (
    <Animated.View
      className="relative flex-row items-center gap-4 rounded-md bg-card px-3 py-3"
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: translateXAnim }],
      }}
    >
      <FontAwesome name={icon} size={iconSize} color={iconColor} />
      <Text className="flex-1 text-lg text-foreground">{text}</Text>
    </Animated.View>
  );
}

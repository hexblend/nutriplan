import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function TabBarLabel({
  focused,
  children,
}: {
  focused: boolean;
  children: string;
}) {
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: focused ? 3.5 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: focused ? 1.1 : 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.Text
      style={{
        fontSize: 10,
        color: focused ? '#FFFFFF' : '#9CA3AF',
        transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
      }}
    >
      {children}
    </Animated.Text>
  );
}

import { colors } from '@/lib/constants';
import { usePathname } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

interface TabBarBackgroundProps {
  textWidths: number[];
}

export default function TabBarBackground({
  textWidths,
}: TabBarBackgroundProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pathname = usePathname();
  const tabBarWidth = Dimensions.get('window').width - 24;
  const tabWidth = tabBarWidth / 3;

  useEffect(() => {
    const getIndex = () => {
      if (pathname === '/') return 0;
      if (pathname === '/profile') return 1;
      if (pathname === '/feedback') return 2;
      return 0;
    };

    Animated.spring(animatedValue, {
      toValue: getIndex(),
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [pathname]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: '11%',
        right: 12,
        height: 2,
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          bottom: -3,
          height: 2,
          backgroundColor: colors.primary[300],
          borderRadius: 1,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, tabWidth, tabWidth * 2],
              }),
            },
            {
              scaleX: animatedValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: textWidths.map((width) => width / 40),
              }),
            },
          ],
          width: 40,
        }}
      />
    </View>
  );
}

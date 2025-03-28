import TabBarIcon from '@/components/layout/TabBar/TabBarIcon';
import TabBarLabel from '@/components/layout/TabBar/TabBarLabel';
import { colors } from '@/lib/constants';
import { Tabs, usePathname } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
  const instets = useSafeAreaInsets();
  const tabBarWidth = Dimensions.get('window').width - 24; // Accounting for left/right margins
  const tabWidth = tabBarWidth / 3; // Since we have 3 tabs
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pathname = usePathname();

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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginBottom: instets.bottom,
          marginLeft: 12,
          marginRight: 12,
          borderRadius: 12,
          alignItems: 'center',
          height: 70,
          paddingBottom: 0,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderTopWidth: 1,
          position: 'relative',
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarIconStyle: {
          marginTop: 6,
          marginBottom: 1.5,
        },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
        tabBarBackground: () => (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              width: tabWidth,
              height: 2,
              backgroundColor: colors.primary[400],
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, tabWidth, tabWidth * 2],
                  }),
                },
              ],
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plans',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="logo" color="#FFFFFF" focused={focused} />
          ),
          //   headerRight: () => (
          //     <Link href="/modal">
          //       <Pressable>
          //         {({ pressed }) => (
          //           <MaterialCommunityIcons
          //             name="info-circle"
          //             size={25}
          //             color={'#FFF'}
          //             style={{
          //               marginRight: 15,
          //               opacity: pressed ? 0.5 : 1,
          //             }}
          //           />
          //         )}
          //       </Pressable>
          //     </Link>
          //   ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="clipboard-account-outline"
              color="#FFFFFF"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="comment-text-outline"
              color="#FFFFFF"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

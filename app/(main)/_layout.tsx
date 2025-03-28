import { colors } from '@/lib/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoIcon from '../../assets/images/svg/logo-icon.svg';

type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

function TabBarIcon(props: {
  name: MaterialIconName | 'logo';
  color: string;
  focused: boolean;
}) {
  const size = 30;
  const color = props.focused ? colors.secondary[200] : '#9CA3AF';

  if (props.name === 'logo') {
    return (
      <View className="-mt-0.5">
        <LogoIcon width={size - 2} height={size - 2} color={color} />
      </View>
    );
  }
  return <MaterialCommunityIcons name={props.name} color={color} size={size} />;
}

function TabBarLabel({
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

export default function MainLayout() {
  const instets = useSafeAreaInsets();
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

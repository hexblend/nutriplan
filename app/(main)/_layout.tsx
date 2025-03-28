import { TabBar } from '@/components/layout/TabBar';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={20} className="mb-0.5" {...props} />;
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={
        {
          tabBarActiveTintColor: 'white',
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerBackground: () => <View className="h-[100px] bg-transparent" />,
          tabBar: (props: BottomTabBarProps) => <TabBar {...props} />,
        } as BottomTabNavigationOptions
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plans',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bowl-mix" color={color} />
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
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="lead-pencil" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

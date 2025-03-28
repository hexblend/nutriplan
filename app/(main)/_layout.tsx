import TabBarIcon from '@/components/layout/TabBar/TabBarIcon';
import TabBarLabel from '@/components/layout/TabBar/TabBarLabel';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

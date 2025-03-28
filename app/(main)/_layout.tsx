import TabBarBackground from '@/components/layout/TabBar/TabBarBackground';
import TabBarIcon from '@/components/layout/TabBar/TabBarIcon';
import TabBarLabel from '@/components/layout/TabBar/TabBarLabel';
import { colors } from '@/lib/constants';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
  const instets = useSafeAreaInsets();
  const [textWidths, setTextWidths] = useState<number[]>([
    'Meal Plans'.length * 8,
    'Profile'.length * 8,
    'Feedback'.length * 8,
  ]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary[700],
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
          borderColor: colors.primary[800],
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
        tabBarBackground: () => <TabBarBackground textWidths={textWidths} />,
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
        }}
        listeners={{
          tabPress: () => {
            const text = 'Meal Plans';
            const width = text.length * 8;
            setTextWidths((prev) => [width, prev[1], prev[2]]);
          },
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
        listeners={{
          tabPress: () => {
            const text = 'Profile';
            const width = text.length * 8;
            setTextWidths((prev) => [prev[0], width, prev[2]]);
          },
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
        listeners={{
          tabPress: () => {
            const text = 'Feedback';
            const width = text.length * 8;
            setTextWidths((prev) => [prev[0], prev[1], width]);
          },
        }}
      />
    </Tabs>
  );
}

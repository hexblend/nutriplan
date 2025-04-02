import TabBarBackground from '@/components/layout/TabBar/TabBarBackground';
import TabBarIcon from '@/components/layout/TabBar/TabBarIcon';
import TabBarLabel from '@/components/layout/TabBar/TabBarLabel';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
  const instets = useSafeAreaInsets();
  const [textWidths, setTextWidths] = useState<number[]>([
    t.t('common.mealPlans').length * 8,
    t.t('common.profile').length * 8,
    t.t('common.feedback').length * 8,
  ]);

  return (
    <Tabs
      initialRouteName="profile"
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
          borderBottomWidth: 4,
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
          title: t.t('common.mealPlans'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="logo" color="#FFFFFF" focused={focused} />
          ),
        }}
        listeners={{
          tabPress: () => {
            const text = t.t('common.mealPlans');
            const width = text.length * 8;
            setTextWidths((prev) => [width, prev[1], prev[2]]);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.t('common.profile'),
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
            const text = t.t('common.profile');
            const width = text.length * 8;
            setTextWidths((prev) => [prev[0], width, prev[2]]);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: t.t('common.feedback'),
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
            const text = t.t('common.feedback');
            const width = text.length * 8;
            setTextWidths((prev) => [prev[0], prev[1], width]);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        }}
      />
    </Tabs>
  );
}

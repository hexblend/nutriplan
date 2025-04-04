import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { t } from '@/i18n/translations';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const headerRight = options.headerRight as ReactNode;
          return (
            <SecondaryHeader
              title={options.title || route.name}
              showBackButton={navigation.canGoBack()}
              backButtonText={options.headerBackTitle}
              rightComponent={headerRight}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="edit-units"
        options={{ title: t.t('common.units') }}
      />
      <Stack.Screen
        name="edit-language"
        options={{ title: t.t('common.language') }}
      />
      <Stack.Screen
        name="add-weight"
        options={{ title: t.t('profile.addTodayWeight') }}
      />
      <Stack.Screen
        name="edit-target-weight"
        options={{ title: t.t('profile.changeGoal') }}
      />
      <Stack.Screen
        name="edit-goal"
        options={{ title: t.t('profile.yourGoal') }}
      />
      <Stack.Screen name="edit-activity" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-basic-info"
        options={{ title: t.t('profile.yourProfile') }}
      />
      <Stack.Screen
        name="edit-name"
        options={{ title: t.t('common.editName') }}
      />
      <Stack.Screen
        name="edit-height"
        options={{ title: t.t('common.editHeight') }}
      />
      <Stack.Screen
        name="edit-age"
        options={{ title: t.t('common.editAge') }}
      />
    </Stack>
  );
}

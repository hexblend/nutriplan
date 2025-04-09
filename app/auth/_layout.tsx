import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { t } from '@/i18n/translations';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';

export default function OnboardingLayout() {
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
              style={options.headerStyle}
            />
          );
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="(onboarding)/progress"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(account)/login"
        options={{ title: t.t('auth.enterYourDetails') }}
      />
      <Stack.Screen name="(account)/forgot-password" />

      <Stack.Screen name="(common)/new-password" />
      <Stack.Screen name="(common)/otp" />
    </Stack>
  );
}

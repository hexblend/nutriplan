import SecondaryHeader from '@/components/layout/SecondaryHeader';
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

      <Stack.Screen name="(account)/login" />
      <Stack.Screen name="(account)/forgot-password" />

      <Stack.Screen name="(common)/new-password" />
      <Stack.Screen name="(common)/otp" />
    </Stack>
  );
}

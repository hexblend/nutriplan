import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';

export default function FeedbackLayout() {
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
      <Stack.Screen name="start" options={{ title: 'Your meal plan' }} />
    </Stack>
  );
}

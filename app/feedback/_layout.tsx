import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { t } from '@/i18n/translations';
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
      <Stack.Screen name="start" options={{ title: t.t('common.start') }} />
    </Stack>
  );
}

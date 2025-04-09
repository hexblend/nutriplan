import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { CreateMealPlanProvider } from '@/providers/CreateMealPlanProvider';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';

export default function PlansLayout() {
  return (
    <CreateMealPlanProvider>
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
        <Stack.Screen
          name="create"
          options={{
            title: ' ',
            headerStyle: {
              // @ts-ignore-next-line
              borderBottomWidth: 0,
              backgroundColor: colors.primary[700],
            },
          }}
        />
        <Stack.Screen
          name="edit-calories"
          options={{
            title: t.t('plans.editCalories'),
            headerStyle: {
              // @ts-ignore-next-line
              backgroundColor: colors.primary[700],
            },
          }}
        />
      </Stack>
    </CreateMealPlanProvider>
  );
}

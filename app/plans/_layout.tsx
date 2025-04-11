import SecondaryHeader from '@/components/layout/SecondaryHeader';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { CreateMealPlanProvider } from '@/providers/CreateMealPlanProvider';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';

export default function PlansLayout() {
  const transparentHeader = { backgroundColor: colors.primary[700] };
  const noBorderHeader = { ...transparentHeader, borderBottomWidth: 0 };
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
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="edit-calories"
          options={{
            title: t.t('plans.editCalories'),
            headerStyle: { ...transparentHeader },
          }}
        />

        <Stack.Screen
          name="macronutrients"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="meals"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="restrictions"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="equipment"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="workout-days"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="mentions"
          options={{
            title: ' ',
            headerStyle: { ...noBorderHeader },
          }}
        />
        <Stack.Screen
          name="generation-loading"
          options={{
            title: 'Plan pe 1 Saptamana',
            headerStyle: { ...noBorderHeader },
          }}
        />
      </Stack>
    </CreateMealPlanProvider>
  );
}

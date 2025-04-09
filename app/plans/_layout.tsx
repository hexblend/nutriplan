import SecondaryHeader from '@/components/layout/SecondaryHeader';
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
          name="start"
          options={{
            title: ' ',
            headerStyle: {
              // @ts-ignore-next-line
              borderBottomWidth: 0,
              backgroundColor: colors.primary[700],
            },
          }}
        />
      </Stack>
    </CreateMealPlanProvider>
  );
}

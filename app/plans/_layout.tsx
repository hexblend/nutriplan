import SecondaryHeader from '@/components/layout/SecondaryHeader';
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
            // @ts-ignore-next-line
            headerStyle: { borderBottomWidth: 0 },
          }}
        />
      </Stack>
    </CreateMealPlanProvider>
  );
}

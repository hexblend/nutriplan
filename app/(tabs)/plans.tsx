import NutritionEmptyState from '@/components/features/nutrition/NutritionEmptyState';
import PageWrapper from '@/components/layout/PageWrapper';
import CalendarBar from '@/components/ui/calendar-bar';
import { Text } from '@/components/ui/text';
import React from 'react';

export default function TabOneScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="mb-4 text-center text-2xl font-bold">Meal Plans</Text>
      <CalendarBar />

      <NutritionEmptyState />
    </PageWrapper>
  );
}

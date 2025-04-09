import PlansEmptyState from '@/components/features/plans/PlansEmptyState';
import PageWrapper from '@/components/layout/PageWrapper';
import CalendarBar from '@/components/ui/calendar-bar';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import React from 'react';

export default function TabOneScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="mb-4 text-center text-2xl font-bold">
        {t.t('common.mealPlans')}
      </Text>
      <CalendarBar />

      <PlansEmptyState />
    </PageWrapper>
  );
}

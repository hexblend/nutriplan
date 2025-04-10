import LinkField from '@/components/blocks/LinkField';
import Card from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { Octicons } from '@expo/vector-icons';
import React from 'react';

export default function PlansEmptyState() {
  return (
    <Card className="mt-8 items-center justify-center p-6">
      <Text className="mb-2 text-center text-lg font-medium">
        {t.t('plans.noMealPlan')}
      </Text>
      <Text className="mb-4 text-center text-lg text-gray-500">
        {t.t('plans.createMealPlanPrompt')}
      </Text>
      <LinkField
        href="/plans/equipment"
        className="w-full"
        value={t.t('plans.createMealPlan')}
        icon={<Octicons name="plus" size={20} color="white" />}
        variant="default"
        centered
      />
    </Card>
  );
}

import LinkField from '@/components/blocks/LinkField';
import Card from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Octicons } from '@expo/vector-icons';
import React from 'react';

export default function NutritionEmptyState() {
  return (
    <Card className="mt-8 items-center justify-center p-6">
      <Text className="mb-2 text-center text-lg font-medium">
        No meal plan this week
      </Text>
      <Text className="mb-4 text-center text-lg text-muted-foreground">
        Create a meal plan to continue your nutrition journey
      </Text>
      <LinkField
        href="/nutrition"
        className="w-full"
        value="Create Meal Plan"
        icon={<Octicons name="plus" size={20} color="white" />}
        variant="default"
        centered
      />
    </Card>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import CalendarBar from '@/components/ui/calendar-bar';
import { Text } from '@/components/ui/text';
import { useSession } from '@/providers/SessionProvider';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  const { signOut } = useSession();

  return (
    <PageWrapper className="pt-2">
      <Text className="mb-4 text-center text-2xl font-bold">Meal Plans</Text>

      <CalendarBar />

      <View className="mt-24 flex-1">
        <Button variant="ghost" onPress={signOut} className="mt-4">
          <Text>Sign Out</Text>
        </Button>
      </View>
    </PageWrapper>
  );
}

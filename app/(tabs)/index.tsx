import Agenda from '@/components/blocks/Agenda';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/providers/SessionProvider';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  const { signOut } = useSession();

  return (
    <PageWrapper>
      <Agenda />
      <View className="flex-1">
        <Button variant="ghost" onPress={signOut} className="mt-4">
          <Text>Sign Out</Text>
        </Button>
      </View>
    </PageWrapper>
  );
}

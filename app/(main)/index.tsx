import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/providers/SessionProvider';
import React from 'react';
import { View } from 'react-native';

export default function TabOneScreen() {
  const { signOut } = useSession();

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="mb-6 text-2xl font-bold text-foreground">Welcome</Text>
      <Button variant="ghost" onPress={signOut} className="mt-4">
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
}

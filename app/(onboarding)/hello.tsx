import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function OnboardingTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Second screen</Text>

      <Link href="/(main)" asChild className="mt-8">
        <Button>
          <Text>Login</Text>
        </Button>
      </Link>
    </View>
  );
}

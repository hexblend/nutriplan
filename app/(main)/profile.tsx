import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/main/Card';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function ProfileScreen() {
  return (
    <PageWrapper>
      <View className="flex-1 bg-background">
        <Text className="mb-6 text-2xl font-bold text-foreground">Profile</Text>
        <Card>
          <Text>Hello</Text>
        </Card>
      </View>
    </PageWrapper>
  );
}

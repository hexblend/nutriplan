import PageWrapper from '@/components/layout/PageWrapper';
import Card from '@/components/main/Card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function ProfileScreen() {
  return (
    <PageWrapper>
      <Text className="mb-6 text-2xl font-bold text-foreground">Profile</Text>

      <Card className="flex-row items-start justify-between">
        <View>
          <Text>Hello</Text>
        </View>
        <Avatar alt="Avatar" className="h-20 w-20">
          <AvatarFallback>
            <Text className="text-2xl font-bold">ZN</Text>
          </AvatarFallback>
        </Avatar>
      </Card>
    </PageWrapper>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function FeedbackScreen() {
  return (
    <PageWrapper>
      <View className="flex-1 bg-background">
        <Text className="mb-6 text-2xl font-bold text-foreground">
          Feedback
        </Text>
      </View>
    </PageWrapper>
  );
}

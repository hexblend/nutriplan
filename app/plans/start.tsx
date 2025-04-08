import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';

export default function StartScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="text-center text-2xl font-bold">
        Create your meal plan
      </Text>
    </PageWrapper>
  );
}

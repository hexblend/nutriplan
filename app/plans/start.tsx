import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';

export default function StartScreen() {
  return (
    <PageWrapper className="pt-4">
      <Text className="w-[200px] text-left text-4xl font-bold">
        Create your meal plan
      </Text>
    </PageWrapper>
  );
}

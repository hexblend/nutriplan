import { Text } from '@/components/ui/text';
import Frame from '../ui/frame';

export default function ProfileGoal() {
  return (
    <Frame className="mt-6">
      <Text className="text-center text-2xl font-bold">
        Goal:{' '}
        <Text className="text-2xl font-bold text-secondary-200">58 kg</Text>
      </Text>
      <Text className="mt-2 text-center text-2xl font-bold">
        Achievable in:{' '}
        <Text className="text-xl font-bold text-secondary-200">12 weeks</Text>
      </Text>
    </Frame>
  );
}

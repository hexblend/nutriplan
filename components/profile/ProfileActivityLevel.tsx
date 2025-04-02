import { cn } from '@/lib/utils';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

interface ProfileActivityLevelProps {
  className?: string;
}
export default function ProfileActivityLevel({
  className,
}: ProfileActivityLevelProps) {
  return (
    <View className={cn(className)}>
      <View className="mb-2 flex-row items-center justify-center gap-2">
        <Octicons name="flame" size={18} color="#ea580c" />
        <Text className="text-center text-3xl font-bold">1605 Kcal</Text>
      </View>
      <Text className="text-center text-xl font-semibold">
        Daily intake (BMR)
      </Text>
      <Button variant="secondary" className="mt-2 flex-row items-center gap-2">
        <FontAwesome name="edit" size={16} color="white" />
        <Text>Sedentary Activity</Text>
      </Button>
    </View>
  );
}

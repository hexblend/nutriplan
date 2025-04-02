import { cn } from '@/lib/utils';
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from '../ui/text';
import ValueField from '../ui/value-field';

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
      <ValueField editHref="/profile" value="Sedentary" className="mt-6" />
    </View>
  );
}

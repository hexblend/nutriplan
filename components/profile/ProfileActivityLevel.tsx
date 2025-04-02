import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from '../ui/text';
import ValueField from '../ui/value-field';

export default function ProfileActivityLevel() {
  return (
    <View className="mb-24 mt-10">
      <View className="mb-2 mt-2 flex-row items-center justify-center gap-2">
        <Octicons name="flame" size={18} color="#ea580c" />
        <Text className="text-center text-2xl font-bold">1605 kcal</Text>
      </View>
      <Text className="text-center text-xl font-semibold">
        Daily intake (BMR)
      </Text>
      <ValueField editHref="/profile" value="Sedentary" className="mt-6" />
    </View>
  );
}

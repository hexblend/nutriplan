import { Text } from '@/components/ui/text';
import ValueField from '@/components/ui/value-field';
import { useSession } from '@/providers/SessionProvider';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

interface ProfileSettingsProps {
  className?: string;
}

export default function ProfileSettings({ className }: ProfileSettingsProps) {
  const { currentClient } = useSession();
  const { height_unit, weight_unit } = currentClient ?? {};
  return (
    <View className={className}>
      <View className="flex-row items-center justify-center gap-1">
        <Ionicons name="cog" size={24} color="#777" />
        <Text className="text-gray-400">Settings</Text>
      </View>
      <ValueField
        editHref="/profile/edit-units"
        labelLeft="Units"
        valueRight={`${height_unit === 'metric' ? 'CM' : 'FT'}/${weight_unit === 'metric' ? 'KG' : 'LBS'}`}
        hideEditIcon
        className="mt-4"
      />
    </View>
  );
}

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Card from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { useSession } from '@/providers/SessionProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ProfileAvatarCard() {
  const { currentClient } = useSession();
  if (!currentClient) return null;

  const { first_name, last_name, sex, height, age } = currentClient;

  const firstLetter = first_name.charAt(0);
  const lastLetter = last_name.charAt(0);

  return (
    <Card className="flex-row items-start justify-between py-5">
      <View className="flex-col gap-4">
        {/* Name */}
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name={sex === 'male' ? 'face-man' : 'face-woman'}
            size={24}
            color={colors.primary[350]}
          />
          <Text className="text-lg">
            {first_name} {last_name}
          </Text>
        </View>
        {/* Height */}
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="human-male-height"
            size={24}
            color="#16a34a" // green-500
          />
          <Text className="text-lg">{height}</Text>
        </View>
        {/* Age */}
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="timer-sand-complete"
            size={24}
            color="#f59e0b" // yellow-500
          />
          <Text className="text-lg">
            {age} {t.t('common.yearsOld')}
          </Text>
        </View>
      </View>
      <Avatar alt="Avatar" className="h-20 w-20">
        <AvatarFallback>
          <Text className="text-2xl font-bold">
            {firstLetter}
            {lastLetter}
          </Text>
        </AvatarFallback>
      </Avatar>
    </Card>
  );
}

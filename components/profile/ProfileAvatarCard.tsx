import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Card from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { useSession } from '@/providers/SessionProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ProfileAvatarCard() {
  const { currentClient } = useSession();
  if (!currentClient) return null;

  const { first_name, last_name, sex } = currentClient;

  const firstLetter = first_name.charAt(0);
  const lastLetter = last_name.charAt(0);

  return (
    <Card className="flex-row items-start justify-between">
      <View>
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name={sex === 'male' ? 'face-man' : 'face-woman'}
            size={24}
            color={colors.primary[350]}
          />
          <Text>
            {first_name} {last_name}
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

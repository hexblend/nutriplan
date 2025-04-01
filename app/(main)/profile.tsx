import Frame from '@/assets/images/svg/frame.svg';
import PageWrapper from '@/components/layout/PageWrapper';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import { Text } from '@/components/ui/text';
import { useWindowDimensions, View } from 'react-native';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();

  return (
    <PageWrapper>
      <Text className="mb-6 text-2xl font-bold text-foreground">Profile</Text>
      <ProfileAvatarCard />

      <View className="relative mt-8 flex-1">
        <Frame
          width={width - 14}
          style={{ marginLeft: -6, position: 'absolute' }}
        />
        <View className="mt-11">
          <Text className="text-center text-2xl font-bold">
            Goal:{' '}
            <Text className="text-2xl font-bold text-secondary-200">58 kg</Text>
          </Text>
          <Text className="mt-2 text-center text-2xl font-bold">
            Achievable in:{' '}
            <Text className="text-xl font-bold text-secondary-200">
              12 weeks
            </Text>
          </Text>
        </View>
      </View>
    </PageWrapper>
  );
}

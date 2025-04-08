import ProfileActivityLevel from '@/components/features/profile/ProfileActivityLevel';
import ProfileAvatarCard from '@/components/features/profile/ProfileAvatarCard';
import ProfileBmiRange from '@/components/features/profile/ProfileBmiRange';
import ProfileGoal from '@/components/features/profile/ProfileGoal';
import ProfileSettings from '@/components/features/profile/ProfileSettings';
import ProfileWeightChart from '@/components/features/profile/ProfileWeightChart';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { signOut } = useSession();
  return (
    <PageWrapper className="pt-2">
      <Text className="text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard className="mt-6" />
      <ProfileWeightChart className="mt-10" />
      <ProfileGoal className="mt-8" />
      <ProfileBmiRange className="mt-14" />
      <ProfileActivityLevel className="mt-16" />
      <ProfileSettings className="mt-24" />

      <View className="mt-24 flex-1">
        <Button variant="ghost" onPress={signOut} className="mt-4">
          <Text>Sign Out</Text>
        </Button>
      </View>
    </PageWrapper>
  );
}

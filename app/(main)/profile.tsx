import PageWrapper from '@/components/layout/PageWrapper';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import ProfileBmiRange from '@/components/profile/ProfileBmiRange';
import ProfileGoal from '@/components/profile/ProfileGoal';
import ProfileWeightChart from '@/components/profile/ProfileWeightChart';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="mb-6 text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard />
      <ProfileGoal />
      <ProfileWeightChart />
      <ProfileBmiRange />
    </PageWrapper>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import ProfileGoal from '@/components/profile/ProfileGoal';
import ProfileWeightChart from '@/components/profile/ProfileWeightChart';
import { BmiRange } from '@/components/ui/bmi-range';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="mb-6 text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard />
      <BmiRange bmi={28.3} className="mt-8" />
      <ProfileWeightChart />
      <ProfileGoal />
    </PageWrapper>
  );
}

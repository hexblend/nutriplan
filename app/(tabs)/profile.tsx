import ProfileActivityLevel from '@/components/features/profile/ProfileActivityLevel';
import ProfileAvatarCard from '@/components/features/profile/ProfileAvatarCard';
import ProfileBmiRange from '@/components/features/profile/ProfileBmiRange';
import ProfileGoal from '@/components/features/profile/ProfileGoal';
import ProfileSettings from '@/components/features/profile/ProfileSettings';
import ProfileWeightChart from '@/components/features/profile/ProfileWeightChart';
import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard className="mt-6" />
      <ProfileWeightChart className="mt-10" />
      <ProfileGoal className="mt-10" />
      <ProfileBmiRange className="mt-18" />
      <ProfileActivityLevel className="mt-16" />
      <ProfileSettings className="mt-20" />
    </PageWrapper>
  );
}

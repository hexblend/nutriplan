import PageWrapper from '@/components/layout/PageWrapper';
import ProfileActivityLevel from '@/components/profile/ProfileActivityLevel';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import ProfileBmiRange from '@/components/profile/ProfileBmiRange';
import ProfileGoal from '@/components/profile/ProfileGoal';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ProfileWeightChart from '@/components/profile/ProfileWeightChart';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <PageWrapper className="pt-2">
      <Text className="text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard className="mt-6" />

      <ProfileWeightChart className="mt-10" />
      <ProfileGoal className="mt-12" />
      <ProfileActivityLevel className="mt-16" />
      <ProfileBmiRange className="mt-16" />
      <ProfileSettings className="mt-24" />
    </PageWrapper>
  );
}

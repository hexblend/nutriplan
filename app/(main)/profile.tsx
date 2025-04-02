import PageWrapper from '@/components/layout/PageWrapper';
import ProfileActivityLevel from '@/components/profile/ProfileActivityLevel';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import ProfileBmiRange from '@/components/profile/ProfileBmiRange';
import ProfileGoal from '@/components/profile/ProfileGoal';
import ProfileWeightChart from '@/components/profile/ProfileWeightChart';
import { Text } from '@/components/ui/text';
import ValueField from '@/components/ui/value-field';
import { useSession } from '@/providers/SessionProvider';

export default function ProfileScreen() {
  const { currentClient } = useSession();
  const { height_unit, weight_unit } = currentClient;

  return (
    <PageWrapper className="pt-2">
      <Text className="text-center text-2xl font-bold">Profile</Text>
      <ProfileAvatarCard className="mt-6" />
      <ProfileWeightChart className="mt-6" />
      <ProfileGoal className="mt-10" />
      <ProfileActivityLevel className="mt-16" />
      <ProfileBmiRange className="mt-16" />

      <ValueField
        editHref="/profile"
        labelLeft="Units"
        valueRight={`${height_unit === 'metric' ? 'CM' : 'FT'}/${weight_unit === 'metric' ? 'KG' : 'LBS'}`}
        className="mt-16"
      />
    </PageWrapper>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import ProfileAvatarCard from '@/components/profile/ProfileAvatarCard';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <PageWrapper>
      <Text className="mb-6 text-2xl font-bold text-foreground">Profile</Text>
      <ProfileAvatarCard />
    </PageWrapper>
  );
}

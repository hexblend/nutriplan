import LinkField from '@/components/blocks/LinkField';
import Loading from '@/components/ui/loading';
import { t } from '@/i18n/translations';
import { displayHeight } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function EditBasicInfoScreen() {
  const { currentClient, currentProfile } = useSession();
  if (!currentClient || !currentProfile) return <Loading />;

  const { first_name, last_name, height_cm, age } = currentClient;
  const { height_unit } = currentProfile;

  return (
    <View className="flex-col gap-4 px-4 pt-6">
      <LinkField
        href="/profile/edit-name"
        labelLeft={t.t('common.name')}
        valueRight={`${first_name} ${last_name}`}
      />
      <LinkField
        href="/profile/edit-height"
        labelLeft={t.t('common.height')}
        valueRight={displayHeight(height_cm, height_unit || 'metric')}
      />
      <LinkField
        href="/profile/edit-age"
        labelLeft={t.t('common.age')}
        valueRight={`${age} ${t.t('common.yearsOld')}`}
      />
    </View>
  );
}

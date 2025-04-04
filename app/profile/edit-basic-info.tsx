import LinkField from '@/components/blocks/LinkField';
import Loading from '@/components/ui/loading';
import { t } from '@/i18n/translations';
import { displayHeight, displayWeight } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function EditBasicInfoScreen() {
  const { currentClient, currentProfile } = useSession();
  if (!currentClient || !currentProfile) return <Loading />;

  const { first_name, last_name, height_cm, age, weight_kg } = currentClient;
  const { height_unit, weight_unit } = currentProfile;

  return (
    <View className="flex-col gap-1 px-4">
      <LinkField
        href="/profile/edit-target-weight"
        labelLeft={t.t('common.name')}
        className="mt-4"
        valueRight={`${first_name} ${last_name}`}
      />
      <LinkField
        href="/profile/edit-target-weight"
        labelLeft={t.t('common.height')}
        className="mt-4"
        valueRight={displayHeight(height_cm, height_unit || 'metric')}
      />
      <LinkField
        href="/profile/edit-target-weight"
        labelLeft={t.t('common.age')}
        className="mt-4"
        valueRight={`${age} ${t.t('common.yearsOld')}`}
      />
      <LinkField
        href="/profile/edit-target-weight"
        labelLeft={t.t('common.weight')}
        className="mt-4"
        valueRight={displayWeight(weight_kg, weight_unit || 'metric')}
      />
    </View>
  );
}

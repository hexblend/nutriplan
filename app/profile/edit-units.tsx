import { ValueSwitchRow } from '@/components/blocks/ValueSwitchRow';
import PageWrapper from '@/components/layout/PageWrapper';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function EditUnitsScreen() {
  const { currentProfile, setCurrentProfile } = useSession();
  if (!currentProfile) return null;

  const handleHeightUnitChange = async (value: string) => {
    const newUnit = value === 'cm' ? 'metric' : 'imperial';
    // Optimistically update UI
    setCurrentProfile({
      ...currentProfile,
      height_unit: newUnit,
    });
    // Update database in the background
    const { error } = await supabase
      .from('profiles')
      .update({ height_unit: newUnit })
      .eq('id', currentProfile.id);

    if (error) {
      // Revert optimistic update
      setCurrentProfile({
        ...currentProfile,
        height_unit: currentProfile.height_unit,
      });
      return throwError('[profile] Error updating height unit', error);
    }
  };

  const handleWeightUnitChange = async (value: string) => {
    const newUnit = value === 'kg' ? 'metric' : 'imperial';
    // Optimistically update UI
    setCurrentProfile({
      ...currentProfile,
      weight_unit: newUnit,
    });
    // Update database in the background
    const { error } = await supabase
      .from('profiles')
      .update({ weight_unit: newUnit })
      .eq('id', currentProfile.id);

    if (error) {
      // Revert optimistic update
      setCurrentProfile({
        ...currentProfile,
        weight_unit: currentProfile.weight_unit,
      });
      return throwError('[profile] Error updating weight unit', error);
    }
  };

  return (
    <PageWrapper className="pt-6">
      <View className="flex-col gap-4">
        <ValueSwitchRow
          label={t.t('common.height')}
          value={currentProfile.height_unit === 'metric' ? 'cm' : 'ft'}
          onValueChange={handleHeightUnitChange}
          options={[
            { value: 'cm', label: 'CM' },
            { value: 'ft', label: 'FT' },
          ]}
        />
        <ValueSwitchRow
          label={t.t('common.weight')}
          value={currentProfile.weight_unit === 'metric' ? 'kg' : 'lbs'}
          onValueChange={handleWeightUnitChange}
          options={[
            { value: 'kg', label: 'KG' },
            { value: 'lbs', label: 'LBS' },
          ]}
          hideBorder
        />
      </View>
    </PageWrapper>
  );
}

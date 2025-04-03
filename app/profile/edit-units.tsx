import { ValueSwitchRow } from '@/components/blocks/ValueSwitchRow';
import PageWrapper from '@/components/layout/PageWrapper';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function EditUnitsScreen() {
  const { currentClient, setCurrentClient } = useSession();
  if (!currentClient) return null;

  const handleHeightUnitChange = async (value: string) => {
    const newUnit = value === 'cm' ? 'metric' : 'imperial';
    // Optimistically update UI
    setCurrentClient({
      ...currentClient,
      height_unit: newUnit,
    });
    // Update database in the background
    const { error } = await supabase
      .from('clients')
      .update({ height_unit: newUnit })
      .eq('id', currentClient.id);

    if (error) {
      // Revert optimistic update
      setCurrentClient({
        ...currentClient,
        height_unit: currentClient.height_unit,
      });
      return throwError('[profile] Error updating height unit', error);
    }
  };

  const handleWeightUnitChange = async (value: string) => {
    const newUnit = value === 'kg' ? 'metric' : 'imperial';
    // Optimistically update UI
    setCurrentClient({
      ...currentClient,
      weight_unit: newUnit,
    });
    // Update database in the background
    const { error } = await supabase
      .from('clients')
      .update({ weight_unit: newUnit })
      .eq('id', currentClient.id);

    if (error) {
      // Revert optimistic update
      setCurrentClient({
        ...currentClient,
        weight_unit: currentClient.weight_unit,
      });
      return throwError('[profile] Error updating weight unit', error);
    }
  };

  return (
    <PageWrapper className="pt-5">
      <View className="flex-col gap-8">
        <ValueSwitchRow
          label={t.t('common.height')}
          value={currentClient.height_unit === 'metric' ? 'cm' : 'ft'}
          onValueChange={handleHeightUnitChange}
          options={[
            { value: 'cm', label: 'CM' },
            { value: 'ft', label: 'FT' },
          ]}
        />
        <ValueSwitchRow
          label={t.t('common.weight')}
          value={currentClient.weight_unit === 'metric' ? 'kg' : 'lbs'}
          onValueChange={handleWeightUnitChange}
          options={[
            { value: 'kg', label: 'KG' },
            { value: 'lbs', label: 'LBS' },
          ]}
        />
      </View>
    </PageWrapper>
  );
}

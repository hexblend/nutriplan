import PageWrapper from '@/components/layout/PageWrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
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
    const { error } = await supabase
      .from('clients')
      .update({ height_unit: newUnit })
      .eq('id', currentClient.id);
    if (error) {
      return throwError('[profile] Error updating height unit', error);
    }
    // Update local state
    setCurrentClient({
      ...currentClient,
      height_unit: newUnit,
    });
  };

  return (
    <PageWrapper className="pt-5">
      <View className="flex-col gap-6">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold">{t.t('common.height')}</Text>
          <Tabs
            value={currentClient.height_unit === 'metric' ? 'cm' : 'ft'}
            onValueChange={handleHeightUnitChange}
            className="w-1/2"
          >
            <TabsList className="w-full flex-row">
              <TabsTrigger value="cm" className="flex-1">
                <Text className="font-bold">CM</Text>
              </TabsTrigger>
              <TabsTrigger value="ft" className="flex-1">
                <Text className="font-bold">FT</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </View>
      </View>
    </PageWrapper>
  );
}

import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  equipment: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function EquipmentScreen() {
  const router = useRouter();
  const { equipment, setEquipment } = useCreateMealPlanContext();
  const { currentClient } = useSession();

  const defaultEquipment = currentClient?.cooking_equipment
    ? (JSON.parse(currentClient.cooking_equipment) as string[])
    : ['stove'];

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipment: defaultEquipment,
    },
  });

  const readyToSubmit =
    (isDirty && isValid) || equipment.length > 0 || defaultEquipment.length > 0;

  const onSubmit = async (data: FormValues) => {
    // Optimistic update
    setEquipment(data.equipment);
    router.push('/plans/restrictions');

    const { error } = await supabase
      .from('clients')
      .update({ cooking_equipment: JSON.stringify(data.equipment) })
      .eq('id', currentClient?.id);
    if (error) {
      setEquipment(defaultEquipment);
      return throwError(
        '[create-meal] Error updating client cooking equipment',
        error
      );
    }
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter withBorder className="pt-4">
          <Button
            variant="default"
            onPress={handleSubmit(onSubmit)}
            disabled={!readyToSubmit}
          >
            <Text disabled={!readyToSubmit}>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        {t.t('plans.selectEquipment')}
      </Text>

      <Text className="mt-4 max-w-[260px] self-center text-center text-base text-gray-400">
        {t.t('plans.recommendedEquipment')}
      </Text>

      <View className="mt-10">
        <ControlledSelect
          control={control}
          name="equipment"
          options={[
            {
              label: t.t('common.stove'),
              value: 'stove',
              icon: 'stove',
            },
            {
              label: t.t('common.oven'),
              value: 'oven',
              icon: 'stove',
            },
            {
              label: t.t('common.microwave'),
              value: 'microwave',
              icon: 'microwave',
            },
            {
              label: t.t('common.airFryer'),
              value: 'air-fryer',
              icon: 'fan',
            },
            {
              label: t.t('common.blender'),
              value: 'blender',
              icon: 'blender',
            },
            {
              label: t.t('common.sandwichMaker'),
              value: 'sandwich-maker',
              icon: 'bread-slice',
            },
            {
              label: t.t('common.grill'),
              value: 'grill',
              icon: 'grill',
            },
          ]}
          multiple={true}
        />
      </View>
    </PageWrapper>
  );
}

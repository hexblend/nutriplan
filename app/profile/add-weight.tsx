import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { kgToLbs, lbsToKg, throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  weight: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddWeightScreen() {
  const { currentProfile, currentClient, setCurrentClient } = useSession();
  if (!currentProfile || !currentClient) return null;
  const navigation = useNavigation();

  const defaultWeight = currentClient.weight_kg
    ? currentProfile.weight_unit === 'imperial'
      ? kgToLbs(currentClient.weight_kg).toString()
      : currentClient.weight_kg.toString()
    : '';
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: defaultWeight,
    },
  });

  /*
   * DB Operations
   */
  const getWeightUpdatesNumber = async () => {
    const { data, error } = await supabase
      .from('client_updates')
      .select('*')
      .eq('client_id', currentClient.id)
      .eq('field', 'weight_kg')
      .limit(1);
    return {
      error,
      weightUpdatesNumber: data?.length === 0 ? 0 : data?.length,
    };
  };
  const updateClientWeight = async (weightInKg: number) => {
    // Optimistic update
    setCurrentClient({ ...currentClient, weight_kg: weightInKg });
    // DB Update
    const { error } = await supabase
      .from('clients')
      .update({ weight_kg: weightInKg })
      .eq('id', currentClient.id);
    return { error };
  };
  const addWeightUpdate = async (
    weightInKg: number,
    date: string | undefined
  ) => {
    const { error } = await supabase.from('client_updates').insert({
      client_id: currentClient.id,
      field: 'weight_kg',
      value: weightInKg,
      date,
    });
    return { error };
  };

  /*
   * Form Submission
   */
  const onSubmit = async (data: FormValues) => {
    if (!currentClient.weight_kg) return;
    const weightValue = parseFloat(data.weight);

    let weightInKg: number;
    if (currentProfile.weight_unit === 'imperial') {
      weightInKg = lbsToKg(weightValue);
    } else {
      weightInKg = weightValue;
    }

    const { error: getWeightUpdatesNumberError, weightUpdatesNumber } =
      await getWeightUpdatesNumber();
    if (getWeightUpdatesNumberError) {
      return throwError(
        '[profile] Error getting weight updates number',
        getWeightUpdatesNumberError
      );
    }

    if (weightUpdatesNumber === 0) {
      // Add initial weight as weight update
      const { error: initialWeightUpdateError } = await addWeightUpdate(
        currentClient.weight_kg,
        currentClient.created_at
      );
      if (initialWeightUpdateError) {
        return throwError(
          '[profile] Error adding initial weight update',
          initialWeightUpdateError
        );
      }
      // Add new weight update
      const { error } = await addWeightUpdate(weightInKg, undefined); // default to now
      if (error) {
        return throwError('[profile] Error adding new weight update', error);
      }
    } else {
      // Just add new weight update
      const { error } = await addWeightUpdate(weightInKg, undefined); // default to now
      if (error) {
        return throwError('[profile] Error adding new weight update', error);
      }
    }

    // Update client weight
    const { error: updateClientWeightError } =
      await updateClientWeight(weightInKg);
    if (updateClientWeightError) {
      // Revert optimistic update
      setCurrentClient({
        ...currentClient,
        weight_kg: currentClient.weight_kg,
      });
      return throwError(
        '[profile] Error updating weight',
        updateClientWeightError
      );
    }

    return navigation.goBack();
  };

  const unit = currentProfile.weight_unit === 'metric' ? 'kg' : 'lbs';

  return (
    <PageWrapper className="pt-6">
      <View className="flex-col items-center">
        <View className="w-[120px] flex-1 self-center">
          <ControlledInput
            control={control}
            name="weight"
            error={errors.weight}
            keyboardType="numeric"
            autoFocus
            rightIcon={<Text className="mr-1 mt-4 text-gray-200">{unit}</Text>}
            className="mt-4"
          />
        </View>
        <View>
          <Button
            variant="default"
            onPress={handleSubmit(onSubmit)}
            className="mt-6 w-[120px]"
            disabled={!isDirty || !isValid}
          >
            <Text className="uppercase" disabled={!isDirty || !isValid}>
              {t.t('common.add')}
            </Text>
          </Button>
        </View>
      </View>
    </PageWrapper>
  );
}

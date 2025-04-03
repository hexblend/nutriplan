import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { kgToLbs, lbsToKg, throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  weight: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddWeightScreen() {
  const { currentProfile, currentClient } = useSession();
  if (!currentProfile || !currentClient) return null;

  // Convert default value to imperial if needed
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

  const onSubmit = async (data: FormValues) => {
    const weightValue = parseFloat(data.weight);
    let weightInKg: number;

    if (currentProfile.weight_unit === 'imperial') {
      weightInKg = lbsToKg(weightValue);
    } else {
      weightInKg = weightValue;
    }

    const { error } = await supabase
      .from('clients')
      .update({ weight_kg: weightInKg })
      .eq('id', currentClient.id);

    if (error) {
      return throwError('[profile] Error updating weight', error);
    }

    // Update local state
    currentClient.weight_kg = weightInKg;
  };

  const unit = currentProfile.weight_unit === 'metric' ? 'kg' : 'lbs';

  return (
    <PageWrapper className="pt-6">
      <View className="flex-1">
        <ControlledInput
          control={control}
          name="weight"
          error={errors.weight}
          keyboardType="numeric"
          autoFocus
          rightIcon={<Text className="mr-1 mt-4 text-gray-200">{unit}</Text>}
          className="mt-4"
        />
        <Button
          variant="default"
          onPress={handleSubmit(onSubmit)}
          className="mt-6"
          disabled={!isDirty || !isValid}
        >
          <Text className="uppercase" disabled={!isDirty || !isValid}>
            {t.t('common.continue')}
          </Text>
        </Button>
      </View>
    </PageWrapper>
  );
}

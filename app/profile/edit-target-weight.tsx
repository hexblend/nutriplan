import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { kgToLbs, lbsToKg, throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  targetWeight: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditTargetWeightScreen() {
  const { currentProfile, currentClient, setCurrentClient } = useSession();
  if (!currentProfile || !currentClient) return null;
  const router = useRouter();

  const defaultTargetWeight = currentClient.target_weight_kg
    ? currentProfile.weight_unit === 'imperial'
      ? kgToLbs(currentClient.target_weight_kg).toString()
      : currentClient.target_weight_kg.toFixed(1)
    : '';
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetWeight: defaultTargetWeight,
    },
  });

  /*
   * Form Submission
   */
  const onSubmit = async (data: FormValues) => {
    const targetWeightValue = parseFloat(data.targetWeight);

    let targetWeightInKg: number;
    if (currentProfile.weight_unit === 'imperial') {
      targetWeightInKg = lbsToKg(targetWeightValue);
    } else {
      targetWeightInKg = targetWeightValue;
    }

    // Optimistic update
    setCurrentClient({ ...currentClient, target_weight_kg: targetWeightInKg });
    // DB Update
    const { error } = await supabase
      .from('clients')
      .update({ target_weight_kg: targetWeightInKg })
      .eq('id', currentClient.id);
    if (error) {
      // Revert optimistic update
      setCurrentClient({
        ...currentClient,
        target_weight_kg: currentClient.target_weight_kg,
      });
      return throwError('[profile] Error updating target weight', error);
    }

    // Refresh the app to apply language changes
    router.replace('/(tabs)/profile');
  };

  const unit = currentProfile.weight_unit === 'metric' ? 'kg' : 'lbs';

  return (
    <PageWrapper className="pt-6">
      <View className="flex-col items-center">
        <View className="w-[120px] flex-1 self-center">
          <ControlledInput
            control={control}
            name="targetWeight"
            error={errors.targetWeight}
            keyboardType={
              currentProfile.weight_unit === 'metric'
                ? 'decimal-pad'
                : 'numeric'
            }
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
              {t.t('common.save')}
            </Text>
          </Button>
        </View>
      </View>
    </PageWrapper>
  );
}

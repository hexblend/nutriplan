import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import ControlledRulerPicker from '@/components/ui/form/ControlledRulerPicker';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import {
  displayHeight,
  feetAndInchesToCm,
  parseFeetAndInches,
  throwError,
} from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  height: z.string().min(2, 'Required'),
});

type FormData = z.infer<typeof formSchema>;

export default function EditHeightScreen() {
  const { currentClient, setCurrentClient, currentProfile } = useSession();
  if (!currentClient || !currentProfile) return null;

  // Get the initial value in the user's preferred unit
  const initialValue =
    currentProfile.height_unit === 'imperial'
      ? parseFeetAndInches(
          displayHeight(currentClient.height_cm, 'imperial')
        ).feet.toString()
      : (currentClient.height_cm || 170).toString();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: initialValue,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!currentClient?.id) return;
    let heightInCm: number;
    if (currentProfile.height_unit === 'metric') {
      heightInCm = parseFloat(data.height);
    } else {
      const heightStr = data.height;
      const feet = parseFloat(heightStr);
      heightInCm = feetAndInchesToCm(feet, 0);
    }

    // Optimistic update
    setCurrentClient({ ...currentClient, height_cm: heightInCm });

    // DB Update
    const { error } = await supabase
      .from('clients')
      .update({ height_cm: heightInCm })
      .eq('id', currentClient.id);

    if (error) {
      // Revert optimistic update
      setCurrentClient({
        ...currentClient,
        height_cm: currentClient.height_cm,
      });
      return throwError('[profile] Error updating height', error);
    }

    return router.back();
  };

  return (
    <PageWrapper className="pt-6">
      <View className="mt-4 flex-1 justify-center">
        <ControlledRulerPicker
          control={control}
          name="height"
          error={errors.height}
          initialValue={parseFloat(initialValue)}
          min={currentProfile.height_unit === 'metric' ? 100 : 3.3}
          max={currentProfile.height_unit === 'metric' ? 220 : 7.2}
          step={currentProfile.height_unit === 'metric' ? 1 : 0.1}
          unit={currentProfile.height_unit === 'metric' ? 'cm' : 'ft'}
          className="mb-2"
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty || !isValid}
        className="mt-6"
      >
        <Text className="font-bold">{t.t('common.save')}</Text>
      </Button>
    </PageWrapper>
  );
}

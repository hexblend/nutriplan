import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import ControlledRulerPicker from '@/components/ui/form/ControlledRulerPicker';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  age: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof formSchema>;

export default function EditAgeScreen() {
  const { currentClient, setCurrentClient } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: currentClient?.age?.toString() || '30',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!currentClient?.id) return;
    setIsLoading(true);

    // Update client
    const { error: clientError } = await supabase
      .from('clients')
      .update({
        age: parseInt(data.age),
      })
      .eq('id', currentClient.id);
    if (clientError) throwError('Error updating age', clientError);

    // Update local state
    setCurrentClient({
      ...currentClient,
      age: parseInt(data.age),
    });

    setIsLoading(false);
    router.back();
  };

  return (
    <PageWrapper className="pt-6">
      <View className="mt-4 flex-1 justify-center">
        <ControlledRulerPicker
          control={control}
          name="age"
          error={errors.age}
          initialValue={parseInt(currentClient?.age?.toString() || '30')}
          min={16}
          max={100}
          step={1}
          unit={t.t('common.yearsOld')}
          fractionDigits={0}
          className="mb-2"
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="mt-6"
      >
        <Text className="font-bold">{t.t('common.save')}</Text>
      </Button>
    </PageWrapper>
  );
}

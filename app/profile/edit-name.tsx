import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  first_name: string;
  last_name: string;
};

export default function EditNameScreen() {
  const { currentProfile, setCurrentProfile, currentClient, setCurrentClient } =
    useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      first_name: currentProfile?.first_name || '',
      last_name: currentProfile?.last_name || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!currentProfile?.id) return;
    setIsLoading(true);

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      .eq('id', currentProfile.id);
    if (profileError) throwError('Error updating name', profileError);

    // Update client if exists
    if (currentClient?.id) {
      const { error: clientError } = await supabase
        .from('clients')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
        })
        .eq('id', currentClient.id);
      if (clientError) throwError('Error updating client name', clientError);
    }

    // Update auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });
    if (authError) throwError('Error updating authentication name', authError);

    // Update local state
    setCurrentProfile({
      ...currentProfile,
      first_name: data.first_name,
      last_name: data.last_name,
    });
    if (currentClient) {
      setCurrentClient({
        ...currentClient,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }

    setIsLoading(false);
    router.back();
  };

  return (
    <PageWrapper className="pt-6">
      <ControlledInput
        control={control}
        name="first_name"
        label={t.t('common.firstName')}
        placeholder={t.t('common.firstName')}
        error={errors.first_name}
      />
      <ControlledInput
        control={control}
        name="last_name"
        label={t.t('common.lastName')}
        placeholder={t.t('common.lastName')}
        error={errors.last_name}
        containerClassName="mt-4"
      />
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

import PageWrapper from '@/components/layout/PageWrapper';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  activity_level: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function EditActivityScreen() {
  const router = useRouter();
  const { currentClient, setCurrentClient } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { activity_level: currentClient?.activity_level || '' },
  });

  const onSubmit = async (data: FormValues) => {
    if (!currentClient?.id) return;
    // Optimistic update
    setCurrentClient({
      ...currentClient,
      activity_level: data.activity_level,
    });
    router.back();

    // DB Update
    const { error } = await supabase
      .from('clients')
      .update({ activity_level: data.activity_level })
      .eq('id', currentClient.id);
    if (error) {
      // Revert optimistic update on error
      setCurrentClient({
        ...currentClient,
        activity_level: currentClient.activity_level,
      });
      console.error('Error updating activity level:', error);
      return;
    }
  };

  return (
    <PageWrapper className="pt-6">
      <ControlledSelect
        control={control}
        name="activity_level"
        // @ts-ignore-next-line
        onValueChange={handleSubmit(onSubmit)}
        options={[
          {
            label: t.t('auth.activitySedentary'),
            value: 'Sedentary',
            icon: 'sofa',
          },
          {
            label: t.t('auth.activityLightly'),
            value: 'Lightly active',
            icon: 'human-handsup',
          },
          {
            label: t.t('auth.activityModerate'),
            value: 'Moderately active',
            icon: 'walk',
          },
          {
            label: t.t('auth.activityVery'),
            value: 'Very active',
            icon: 'run',
          },
          {
            label: t.t('auth.activityExtreme'),
            value: 'Extremely active',
            icon: 'run-fast',
          },
        ]}
        multiple={false}
        error={errors.activity_level}
      />
    </PageWrapper>
  );
}

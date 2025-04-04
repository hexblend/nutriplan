import PageWrapper from '@/components/layout/PageWrapper';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OnboardingGoal } from '../auth/(onboarding)/goal';

const formSchema = z.object({
  goal: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function EditGoalScreen() {
  const { currentClient, setCurrentClient } = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { goal: currentClient?.goal || '' },
  });

  const onSubmit = async (data: FormValues) => {
    if (!currentClient?.id) return;
    // Optimistic update
    setCurrentClient({
      ...currentClient,
      goal: data.goal as OnboardingGoal,
    });
    router.back();
    // DB Update
    const { error } = await supabase
      .from('clients')
      .update({ goal: data.goal })
      .eq('id', currentClient.id);
    if (error) {
      // Revert optimistic update on error
      setCurrentClient({
        ...currentClient,
        goal: currentClient.goal as OnboardingGoal,
      });
      console.error('Error updating goal:', error);
      return;
    }
  };

  return (
    <PageWrapper className="pt-6">
      <ControlledSelect
        control={control}
        name="goal"
        // @ts-ignore-next-line
        onValueChange={handleSubmit(onSubmit)}
        options={[
          {
            label: t.t('auth.goalLooseWeight'),
            value: 'Lose weight',
            icon: 'camera-timer',
          },
          {
            label: t.t('auth.goalStable'),
            value: 'Maintain weight in a healthy way',
            icon: 'scale-balance',
          },
          {
            label: t.t('auth.goalIncreaseMass'),
            value: 'Increase muscle mass',
            icon: 'weight-lifter',
          },
          {
            label: t.t('auth.goalHealthCondition'),
            value: 'Diet for a condition',
            icon: 'heart-pulse',
          },
          {
            label: t.t('auth.goalPerformance'),
            value: 'Performance for athletes',
            icon: 'run-fast',
          },
        ]}
        multiple={false}
        error={errors.goal}
      />
    </PageWrapper>
  );
}

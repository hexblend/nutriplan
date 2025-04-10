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

export type WorkoutDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'notWorkingOut';

const formSchema = z.object({
  workoutDays: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function WorkoutDaysScreen() {
  const router = useRouter();
  const { workoutDays, setWorkoutDays } = useCreateMealPlanContext();
  const { currentClient } = useSession();

  const defaultWorkoutDays = currentClient?.workout_days
    ? (JSON.parse(currentClient.workout_days) as string[])
    : currentClient?.activity_level === 'Sedentary'
      ? ['notWorkingOut']
      : [];

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutDays: defaultWorkoutDays,
    },
  });

  const readyToSubmit =
    (isDirty && isValid) ||
    workoutDays.length > 0 ||
    defaultWorkoutDays.length > 0;

  const onSubmit = async (data: FormValues) => {
    // Optimistic update
    setWorkoutDays(data.workoutDays as WorkoutDay[]);
    router.push('/plans/mentions');

    const { error } = await supabase
      .from('clients')
      .update({ workout_days: JSON.stringify(data.workoutDays) })
      .eq('id', currentClient?.id);
    if (error) {
      setWorkoutDays(defaultWorkoutDays as WorkoutDay[]);
      return throwError(
        '[create-meal] Error updating client workout days',
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
        {t.t('plans.selectWorkoutDays')}
      </Text>

      <Text className="mt-4 max-w-[300px] self-center text-center text-base text-gray-400">
        {t.t('plans.selectWorkoutDaysDescription')}
      </Text>

      <View className="mt-10">
        <ControlledSelect
          control={control}
          name="workoutDays"
          options={[
            {
              label: t.t('common.notWorkingOut'),
              value: 'notWorkingOut',
            },
            {
              label: t.t('common.monday'),
              value: 'monday',
            },
            {
              label: t.t('common.tuesday'),
              value: 'tuesday',
            },
            {
              label: t.t('common.wednesday'),
              value: 'wednesday',
            },
            {
              label: t.t('common.thursday'),
              value: 'thursday',
            },
            {
              label: t.t('common.friday'),
              value: 'friday',
            },
            {
              label: t.t('common.saturday'),
              value: 'saturday',
            },
            {
              label: t.t('common.sunday'),
              value: 'sunday',
            },
          ]}
          multiple={true}
          onValueChange={(newValue) => {
            const lastAddedElement = newValue[newValue.length - 1];
            if (lastAddedElement === 'notWorkingOut') {
              return setValue('workoutDays', ['notWorkingOut']);
            }
            if (
              lastAddedElement !== 'notWorkingOut' &&
              newValue.includes('notWorkingOut') &&
              typeof newValue !== 'string'
            ) {
              return setValue(
                'workoutDays',
                newValue.filter((value) => value !== 'notWorkingOut')
              );
            }
          }}
        />
      </View>
    </PageWrapper>
  );
}

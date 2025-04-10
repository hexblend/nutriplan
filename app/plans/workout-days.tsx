import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
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

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutDays:
        currentClient?.activity_level === 'sedentary' ? ['notWorkingOut'] : [],
    },
  });

  const readyToSubmit = (isDirty && isValid) || workoutDays.length > 0;

  const onSubmit = (data: FormValues) => {
    setWorkoutDays(data.workoutDays as WorkoutDay[]);
    router.push('/plans/equipment');
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
        />
      </View>
    </PageWrapper>
  );
}

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

export type DailyMeal = 'breakfast' | 'snack' | 'lunch' | 'snack-2' | 'dinner';

const formSchema = z.object({
  selectedMeals: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function MealsScreen() {
  const router = useRouter();
  const { meals, setMeals } = useCreateMealPlanContext();
  const { currentClient } = useSession();

  const defaultMeals = currentClient?.daily_meals
    ? (JSON.parse(currentClient.daily_meals) as string[])
    : ['breakfast', 'lunch', 'dinner', 'snack', 'snack-2'];

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { selectedMeals: defaultMeals },
  });

  const readyToSubmit =
    (isDirty && isValid) || meals.length > 0 || defaultMeals.length > 0;

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase
      .from('clients')
      .update({ daily_meals: JSON.stringify(data.selectedMeals) })
      .eq('id', currentClient?.id);
    if (error) {
      return throwError(
        '[create-meal] Error updating client daily meals',
        error
      );
    }
    setMeals(data.selectedMeals as DailyMeal[]);
    router.push('/plans/macronutrients');
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
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
        {t.t('plans.selectMeals')}
      </Text>

      <Text className="mt-4 max-w-[260px] self-center text-center text-base text-gray-400">
        {t.t('plans.recommendedMeals')}
      </Text>

      <View className="mt-12">
        <ControlledSelect
          control={control}
          name="selectedMeals"
          options={[
            {
              label: t.t('common.breakfast'),
              value: 'breakfast',
              icon: 'silverware-fork-knife',
            },
            {
              label: t.t('common.snack'),
              value: 'snack',
              icon: 'food-apple',
            },
            {
              label: t.t('common.lunch'),
              value: 'lunch',
              icon: 'silverware-fork-knife',
            },
            {
              label: t.t('common.snack2'),
              value: 'snack-2',
              icon: 'food-apple',
            },
            {
              label: t.t('common.dinner'),
              value: 'dinner',
              icon: 'silverware-fork-knife',
            },
          ]}
          multiple={true}
        />
      </View>
    </PageWrapper>
  );
}

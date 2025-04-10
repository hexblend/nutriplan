import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

export type DailyMeal = 'Breakfast' | 'Snack' | 'Lunch' | 'Snack 2' | 'Dinner';

const formSchema = z.object({
  selectedMeals: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function MealsScreen() {
  const router = useRouter();
  const { meals, setMeals } = useCreateMealPlanContext();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { selectedMeals: ['Breakfast', 'Lunch', 'Dinner'] },
  });

  const readyToSubmit = (isDirty && isValid) || meals.length > 0;

  const onSubmit = (data: FormValues) => {
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
              value: 'Breakfast',
              icon: 'silverware-fork-knife',
            },
            {
              label: t.t('common.snack'),
              value: 'Snack',
              icon: 'food-apple',
            },
            {
              label: t.t('common.lunch'),
              value: 'Lunch',
              icon: 'silverware-fork-knife',
            },
            {
              label: t.t('common.snack2'),
              value: 'Snack 2',
              icon: 'food-apple',
            },
            {
              label: t.t('common.dinner'),
              value: 'Dinner',
              icon: 'silverware-fork-knife',
            },
          ]}
          multiple={true}
        />
      </View>
    </PageWrapper>
  );
}

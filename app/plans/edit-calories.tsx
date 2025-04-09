import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import {
  calculateBMR,
  calculateDailyCalories,
  calculateTDEE,
} from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  calories: z
    .string()
    .min(1, 'Required')
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 1200 && num <= 5000;
    }, 'Calories must be between 1200 and 5000 kcal/day')
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num);
    }, 'Please enter a valid number'),
});
type FormValues = z.infer<typeof formSchema>;

export default function EditCaloriesScreen() {
  const { currentClient } = useSession();
  const { setDailyCalories, setIsCustomCalories } = useCreateMealPlanContext();
  const defaultCalories = calculateDailyCalories(currentClient) ?? 2000;

  const bmr = calculateBMR(currentClient);
  const tdee = calculateTDEE(bmr, currentClient);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { calories: defaultCalories.toString() },
  });

  const onSubmit = (data: FormValues) => {
    setDailyCalories(parseInt(data.calories, 10));
    if (parseInt(data.calories, 10) !== defaultCalories) {
      setIsCustomCalories(true);
    }
    router.back();
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
    >
      <View className="flex-col items-center">
        <Text className="text-lg">
          {t.t('plans.yourBMR')}
          <Text className="font-bold">{Math.round(bmr)} kcal</Text>
        </Text>
        <Text className="text-lg">
          {t.t('plans.yourTDEE')}
          <Text className="font-bold">{tdee} kcal</Text>
        </Text>
      </View>

      <ControlledInput
        name="calories"
        control={control}
        keyboardType="numeric"
        placeholder="Calories"
        error={errors?.calories}
        rightIcon={
          <Text className="text-gray-300">Kcal / {t.t('common.day')}</Text>
        }
        label={t.t('plans.recommendedCalories')}
        containerClassName="mt-6"
        infoText={
          t.t('plans.caloriesRange') +
          defaultCalories +
          ' kcal/' +
          t.t('common.day')
        }
        autoFocus
      />
      <Button
        variant="default"
        onPress={handleSubmit(onSubmit)}
        className="mt-6"
        disabled={!isValid}
      >
        <Text className="uppercase" disabled={!isValid}>
          {t.t('common.save')}
        </Text>
      </Button>
    </PageWrapper>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { calculateDailyCalories } from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  calories: z.string().min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function EditCaloriesScreen() {
  const { currentClient } = useSession();
  const { setDailyCalories } = useCreateMealPlanContext();
  const defaultCalories = calculateDailyCalories(currentClient) ?? 2000;

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
    router.back();
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
    >
      <View className="mt-6">
        <ControlledInput
          name="calories"
          control={control}
          keyboardType="numeric"
          placeholder="Calories"
          error={errors?.calories}
          rightIcon={<Text className="text-gray-300">Kcal / day</Text>}
          autoFocus
        />
        <Button
          variant="default"
          onPress={handleSubmit(onSubmit)}
          className="mt-6"
          disabled={!isValid}
        >
          <Text className="uppercase" disabled={!isValid}>
            Save
          </Text>
        </Button>
      </View>
    </PageWrapper>
  );
}

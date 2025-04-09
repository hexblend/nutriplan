import PageWrapper from '@/components/layout/PageWrapper';
import { colors } from '@/lib/constants';
import { calculateDailyCalories } from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { useRouter } from 'expo-router';

export default function EditCaloriesScreen() {
  const { currentClient } = useSession();
  const { setDailyCalories } = useCreateMealPlanContext();

  const router = useRouter();

  const onSubmit = () => {
    setDailyCalories(calculateDailyCalories(currentClient));
    router.back();
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
    ></PageWrapper>
  );
}

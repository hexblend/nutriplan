import LinkField from '@/components/blocks/LinkField';
import ProfileActivityLevel from '@/components/features/profile/ProfileActivityLevel';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import {
  calculateDailyCalories,
  calculateWeeksToGoal,
  displayWeight,
} from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function CreateScreen() {
  const { currentClient, currentProfile } = useSession();
  const { setDailyCalories, isCustomCalories, dailyCalories } =
    useCreateMealPlanContext();

  const defaultDailyCalories = calculateDailyCalories(currentClient);

  const caloriesForCalculation = isCustomCalories
    ? dailyCalories
    : defaultDailyCalories;

  const weeksToGoal = caloriesForCalculation
    ? calculateWeeksToGoal(currentClient, caloriesForCalculation)
    : null;

  const weightGoal = displayWeight(
    currentClient?.target_weight_kg ?? null,
    currentProfile?.weight_unit || 'metric'
  );

  const router = useRouter();

  const onSubmit = () => {
    if (!isCustomCalories) {
      setDailyCalories(defaultDailyCalories);
    }
    router.push('/plans/meals');
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <Button onPress={onSubmit} disabled={weeksToGoal === null}>
            <Text>{t.t('common.continue')}</Text>
          </Button>
          <LinkField
            href="/plans/edit-calories"
            centered
            value={t.t('plans.changeCalories')}
            variant={weeksToGoal === null ? 'default' : 'tertiary'}
            className="mt-3"
          />
        </PageFooter>
      }
    >
      <View>
        <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
          {t.t('plans.createTitle')}
        </Text>

        <View className="mt-16 flex-1">
          <ProfileActivityLevel
            hideChangeActivity
            hideGoal
            className="mt-6"
            customCalories={caloriesForCalculation}
          />
          {weeksToGoal ? (
            <View className="mt-4">
              <Text className="text-center">{t.t('profile.toGetTo')}</Text>
              <View className="mt-6 flex-row items-center justify-center gap-2">
                <Text className="text-center text-2xl font-bold text-green-500">
                  {weightGoal}
                </Text>

                <Text className="text-center">in</Text>

                <Text className="text-center text-2xl font-bold text-green-500">
                  {weeksToGoal} {t.t('common.weeks')}
                </Text>
              </View>
            </View>
          ) : (
            <View className="mt-6 rounded-lg bg-red-100 p-2">
              <Text className="text-center text-lg text-red-600">
                {t.t('plans.goalCannotBeReached')}
              </Text>
            </View>
          )}
        </View>

        <View />
      </View>
    </PageWrapper>
  );
}

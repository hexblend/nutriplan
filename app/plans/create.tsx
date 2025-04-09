import LinkField from '@/components/blocks/LinkField';
import ProfileActivityLevel from '@/components/features/profile/ProfileActivityLevel';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { calculateWeeksToGoal, displayWeight } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function CreateScreen() {
  const { currentClient, currentProfile } = useSession();
  const weeksToGoal = calculateWeeksToGoal(currentClient);
  const weightGoal = displayWeight(
    currentClient?.target_weight_kg ?? null,
    currentProfile?.weight_unit || 'metric'
  );

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <LinkField
            href="/plans/create"
            centered
            value={t.t('common.continue')}
            variant="default"
          />
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        {t.t('plans.createTitle')}
      </Text>

      <View className="mt-14">
        <ProfileActivityLevel hideChangeActivity className="mt-6" />
        <Text className="mt-6 text-center">{t.t('profile.toGetTo')}</Text>

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
    </PageWrapper>
  );
}

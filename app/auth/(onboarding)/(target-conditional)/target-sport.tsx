import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

export type OnboardingTargetSport =
  | 'Endurance sports (running, cycling)'
  | 'Team sports'
  | 'Strength training'
  | 'High intensity interval training'
  | 'CrossFit/functional fitness'
  | 'Yoga/flexibility-focused training';

const formSchema = z.object({
  targetSport: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function TargetSportScreen() {
  const {
    targetSport,
    setTargetSport,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    clientId,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetSport },
  });
  const readyToSubmit = (isDirty && isValid) || targetSport;

  const onSubmit = async (data: FormValues) => {
    setTargetSport(data.targetSport as OnboardingTargetSport);
    const { error } = await supabase
      .from('clients')
      .update({ target_sport: data.targetSport })
      .eq('id', clientId);
    if (error) {
      return throwError(
        '[onboarding] Error updating client target sport',
        error
      );
    }
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{`${t.t('auth.targetSportQuestion')}`}</QuestionHeader>
      <PageWrapper
        footer={
          <PageFooter>
            <Button
              variant="default"
              onPress={handleSubmit(onSubmit)}
              className="mt-6"
              disabled={!readyToSubmit}
            >
              <Text className="uppercase" disabled={!readyToSubmit}>
                {t.t('common.continue')}
              </Text>
            </Button>
          </PageFooter>
        }
      >
        <View className="mt-6">
          <ControlledSelect
            control={control}
            name="targetSport"
            options={[
              {
                label: t.t('auth.targetSportEndurance'),
                value: 'Endurance sports (running, cycling)',
                icon: 'run-fast',
              },
              {
                label: t.t('auth.targetSportTeam'),
                value: 'Team sports',
                icon: 'account-group',
              },
              {
                label: t.t('auth.targetSportStrength'),
                value: 'Strength training',
                icon: 'weight-lifter',
              },
              {
                label: t.t('auth.targetSportHIIT'),
                value: 'High intensity interval training',
                icon: 'lightning-bolt',
              },
              {
                label: t.t('auth.targetSportCrossFit'),
                value: 'CrossFit/functional fitness',
                icon: 'dumbbell',
              },
              {
                label: t.t('auth.targetSportYoga'),
                value: 'Yoga/flexibility-focused training',
                icon: 'human-handsup',
              },
            ]}
            multiple={false}
            error={errors.targetSport}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

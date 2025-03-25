import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  goal: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function GoalScreen() {
  const {
    firstName,
    goal,
    setGoal,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { goal },
  });
  const readyToSubmit = (isDirty && isValid) || goal;

  const onSubmit = (data: FormValues) => {
    setGoal(data.goal);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{`Hey ${firstName}! ${t.t('auth.goalQuestion')}`}</QuestionHeader>
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
            name="goal"
            options={[
              {
                label: t.t('auth.goalLooseWeight'),
                value: 'Lose weigth',
                icon: 'gauge-low',
              },
              {
                label: t.t('auth.goalStable'),
                value: 'Maintain weight in a healthy way',
                icon: 'scale-balance',
              },
              {
                label: t.t('auth.goalIncreaseMass'),
                value: 'Increase muscle mass',
                icon: 'weight-lifter',
              },
              {
                label: t.t('auth.goalHealthCondition'),
                value: 'Diet for a condition',
                icon: 'heart-pulse',
              },
              {
                label: t.t('auth.goalPerformance'),
                value: 'Performance for athletes',
                icon: 'run-fast',
              },
            ]}
            multiple={false}
            error={errors.goal}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

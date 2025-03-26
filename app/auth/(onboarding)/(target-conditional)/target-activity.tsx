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
  targetActivity: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;
export type OnboardingTargetActivity =
  | '1-2 times'
  | '3-4 times'
  | '5+ times'
  | 'Not currently, but planning to start';

export default function TargetActivityScreen() {
  const {
    firstName,
    targetActivity,
    setTargetActivity,
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
    defaultValues: { targetActivity },
  });
  const readyToSubmit = (isDirty && isValid) || targetActivity;

  const onSubmit = (data: FormValues) => {
    setTargetActivity(data.targetActivity as OnboardingTargetActivity);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{`Hey ${firstName}! ${t.t('auth.targetActivityQuestion')}`}</QuestionHeader>
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
            name="targetActivity"
            options={[
              {
                label: t.t('auth.targetActivityRarely'),
                value: '1-2 times',
                icon: 'dumbbell',
              },
              {
                label: t.t('auth.targetActivitySometimes'),
                value: '3-4 times',
                icon: 'dumbbell',
              },
              {
                label: t.t('auth.targetActivityOften'),
                value: '5+ times',
                icon: 'dumbbell',
              },
              {
                label: t.t('auth.targetActivityNotYet'),
                value: 'Not currently, but planning to start',
                icon: 'dumbbell',
              },
            ]}
            multiple={false}
            error={errors.targetActivity}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

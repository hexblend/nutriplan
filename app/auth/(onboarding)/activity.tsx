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
  activity: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function ActivityScreen() {
  const {
    activity,
    setActivity,
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
    defaultValues: { activity },
  });
  const readyToSubmit = (isDirty && isValid) || activity;

  const onSubmit = (data: FormValues) => {
    setActivity(data.activity);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{`${t.t('common.thankYou')}! ${t.t('auth.activityQuestion')}`}</QuestionHeader>
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
            name="activity"
            options={[
              {
                label: t.t('auth.activitySedentary'),
                value: 'Sedentary',
                icon: 'sofa',
              },
              {
                label: t.t('auth.activityLightly'),
                value: 'Lightly active',
                icon: 'human',
              },
              {
                label: t.t('auth.activityModerate'),
                value: 'Moderately active',
                icon: 'walk',
              },
              {
                label: t.t('auth.activityVery'),
                value: 'Very active',
                icon: 'run',
              },
              {
                label: t.t('auth.activityExtreme'),
                value: 'Extremely active',
                icon: 'run-fast',
              },
            ]}
            multiple={false}
            error={errors.activity}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

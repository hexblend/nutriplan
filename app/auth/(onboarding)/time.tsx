import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import {
  OnboardingTime,
  useOnboardingContext,
} from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  time: z.string().min(2, 'Required') as z.ZodType<OnboardingTime>,
});
type FormValues = z.infer<typeof formSchema>;

export default function TimeScreen() {
  const {
    time,
    setTime,
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
    defaultValues: { time },
  });
  const readyToSubmit = (isDirty && isValid) || time;

  const onSubmit = (data: FormValues) => {
    setTime(data.time);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.timeQuestion')}</QuestionHeader>
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
            name="time"
            options={[
              {
                label: t.t('auth.timeLessThan30'),
                value: 'Less than 30 minutes',
                icon: 'clock-outline',
              },
              {
                label: t.t('auth.time30To45'),
                value: '30-45 minutes',
                icon: 'clock-time-seven-outline',
              },
              {
                label: t.t('auth.time45To60'),
                value: '45-60 minutes',
                icon: 'clock-time-ten-outline',
              },
              {
                label: t.t('auth.timeWeeklyPrep'),
                value: 'I prefer meal prepping once or twice a week',
                icon: 'calendar-clock',
              },
            ]}
            multiple={false}
            error={errors.time}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

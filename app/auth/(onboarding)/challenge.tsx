import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import {
  OnboardingChallenge,
  useOnboardingContext,
} from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  challenge: z.string().min(2, 'Required') as z.ZodType<OnboardingChallenge>,
});
type FormValues = z.infer<typeof formSchema>;

export default function ChallengeScreen() {
  const {
    challenge,
    setChallenge,
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
    defaultValues: { challenge },
  });
  const readyToSubmit = (isDirty && isValid) || challenge;

  const onSubmit = (data: FormValues) => {
    setChallenge(data.challenge);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.challengeQuestion')}</QuestionHeader>
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
            name="challenge"
            options={[
              {
                label: t.t('auth.challengeLackOfTime'),
                value: 'Lack of time to prepare meals',
                icon: 'clock-outline',
              },
              {
                label: t.t('auth.challengeNotKnowing'),
                value: 'Not knowing what to eat',
                icon: 'help-circle-outline',
              },
              {
                label: t.t('auth.challengeCravings'),
                value: 'Cravings and temptations',
                icon: 'cookie',
              },
              {
                label: t.t('auth.challengeComplicated'),
                value: 'Complicated recipes',
                icon: 'book-open-variant',
              },
              {
                label: t.t('auth.challengeRepetition'),
                value: 'Meal repetition / boredom',
                icon: 'repeat',
              },
            ]}
            multiple={false}
            error={errors.challenge}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

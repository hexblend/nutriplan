import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  targetCondition: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function TargetConditionScreen() {
  const {
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    targetCondition,
    setTargetCondition,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetCondition },
  });
  const readyToSubmit = (isDirty && isValid) || targetCondition;

  const onSubmit = (data: FormValues) => {
    const { targetCondition } = data;
    setTargetCondition(targetCondition);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.targetConditionQuestion')}</QuestionHeader>
      <PageWrapper>
        <View className="mt-6">
          <ControlledInput
            name="targetCondition"
            autoFocus
            autoCorrect={false}
            control={control}
            placeholder={t.t('auth.targetConditionPlaceholder')}
            error={errors?.targetCondition}
          />
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
        </View>
      </PageWrapper>
    </View>
  );
}

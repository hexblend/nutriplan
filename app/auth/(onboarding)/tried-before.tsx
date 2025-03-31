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

export type OnboardingTriedBefore =
  | 'Yes, but it was too complicated'
  | "Yes, but I couldn't stick with it"
  | 'Yes, and it worked for a while'
  | 'No, this is my first time';

const formSchema = z.object({
  triedBefore: z
    .string()
    .min(2, 'Required') as z.ZodType<OnboardingTriedBefore>,
});
type FormValues = z.infer<typeof formSchema>;

export default function TriedBeforeScreen() {
  const {
    triedBefore,
    setTriedBefore,
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
    defaultValues: { triedBefore },
  });
  const readyToSubmit = (isDirty && isValid) || triedBefore;

  const onSubmit = async (data: FormValues) => {
    setTriedBefore(data.triedBefore);
    const { error } = await supabase
      .from('clients')
      .update({ tried_before: data.triedBefore })
      .eq('id', clientId);
    if (error) {
      return throwError(
        '[onboarding] Error updating client tried before',
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
      <QuestionHeader>{t.t('auth.triedBeforeQuestion')}</QuestionHeader>
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
            name="triedBefore"
            options={[
              {
                label: t.t('auth.triedBeforeTooComplicated'),
                value: 'Yes, but it was too complicated',
              },
              {
                label: t.t('auth.triedBeforeCouldntStick'),
                value: "Yes, but I couldn't stick with it",
              },
              {
                label: t.t('auth.triedBeforeWorkedForWhile'),
                value: 'Yes, and it worked for a while',
              },
              {
                label: t.t('auth.triedBeforeFirstTime'),
                value: 'No, this is my first time',
              },
            ]}
            multiple={false}
            error={errors.triedBefore}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

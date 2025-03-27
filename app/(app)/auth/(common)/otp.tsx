import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledOTP } from '@/components/ui/form/ControlledOTP';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { supabase } from '@/lib/supabase/client';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  otp: z.string().length(6, 'Must be 6 digits'),
});
type FormValues = z.infer<typeof formSchema>;

export default function OtpScreen() {
  const { phoneNumber, setIsForward, currentScreenName, setCurrentScreenName } =
    useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { otp } = data;
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    if (error) {
      console.error('OTP Verify ERROR', error);
      return Alert.alert(
        'Error',
        'The code could not be verified. Try again.',
        [{ text: 'OK' }]
      );
    }
    if (session) {
      // Go to next screen
      setIsForward(true);
      const nextScreen = progressScreensConfig[currentScreenName].next;
      if (nextScreen) setCurrentScreenName(nextScreen);
    }
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.otpQuestion')}</QuestionHeader>
      <PageWrapper>
        <View className="mt-6">
          <ControlledOTP
            control={control}
            name="otp"
            error={errors?.otp}
            onFilled={(code) => onSubmit({ otp: code })}
          />
          <Button
            variant="default"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
            className="mt-8"
          >
            <Text className="uppercase" disabled={!isDirty || !isValid}>
              {t.t('common.continue')}
            </Text>
          </Button>
        </View>
      </PageWrapper>
    </View>
  );
}

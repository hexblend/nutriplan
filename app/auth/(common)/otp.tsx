import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledOTP } from '@/components/ui/form/ControlledOTP';
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

const formSchema = z.object({
  otp: z.string().length(6, 'Must be 6 digits'),
});
type FormValues = z.infer<typeof formSchema>;

export default function OtpScreen() {
  const {
    phoneNumber,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    firstName,
    lastName,
    goal,
    height,
    weight,
    age,
    activity,
    heightUnit,
    weightUnit,
    setClientId,
  } = useOnboardingContext();

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
      return throwError('Error! The code could not be verified. Try again.');
    }
    if (session) {
      const userId = session.user.id;
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          height_unit: heightUnit,
          weight_unit: weightUnit,
        })
        .eq('id', userId);
      if (profileError) {
        return throwError(
          '[onboarding] Error updating profile height_unit and weight_unit',
          profileError
        );
      }
      // Create a client from the user
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .insert([
          {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            goal,
            height_cm: parseFloat(height.split(' ')[0]),
            weight_kg: parseFloat(weight.split(' ')[0]),
            age,
            activity_level: activity,
          },
        ])
        .select();
      if (clientError) {
        return throwError('[onboarding] Error creating client', clientError);
      }

      if (clientData) {
        setClientId(clientData[0].id);
        // Go to next screen
        setIsForward(true);
        const nextScreen = progressScreensConfig[currentScreenName].next;
        if (nextScreen) setCurrentScreenName(nextScreen);
      }
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

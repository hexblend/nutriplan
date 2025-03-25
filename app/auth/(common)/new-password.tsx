import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { supabase } from '@/lib/supabase/client';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(9, 'Password must be at least 9 characters'),
});
type FormValues = z.infer<typeof formSchema>;

export default function NewPasswordScreen() {
  const {
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    phoneNumber: phone,
    firstName: first_name,
    lastName: last_name,
  } = useOnboardingContext();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const { password } = data;
    const { data: supabaseData, error } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: { first_name, last_name },
      },
    });
    if (error)
      return Alert.alert('Error', 'Could not send the verification code.', [
        { text: 'OK' },
      ]);
    if (supabaseData) {
      // Go to next screen
      setIsForward(true);
      const nextScreen = progressScreensConfig[currentScreenName].next;
      if (nextScreen) setCurrentScreenName(nextScreen);
    }
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.passwordQuestion')}</QuestionHeader>
      <PageWrapper>
        <View className="mt-6">
          <ControlledInput
            control={control}
            name="password"
            autoFocus
            error={errors?.password}
            secureTextEntry={!showPassword}
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
            infoText={t.t('auth.passwordRequirements')}
          />
          <Button
            variant="default"
            onPress={handleSubmit(onSubmit)}
            className="mt-6"
            disabled={!isDirty || !isValid}
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

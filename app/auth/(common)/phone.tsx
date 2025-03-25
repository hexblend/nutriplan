import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import ControlledPhoneInput from '@/components/ui/form/ControlledPhoneInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ICountry } from 'react-native-international-phone-number';
import { z } from 'zod';

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function PhoneScreen() {
  const {
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    phoneNumber,
    setPhoneNumber,
  } = useOnboardingContext();

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber },
  });
  const readyToSubmit = (isDirty && isValid) || phoneNumber;

  const onSubmit = (data: FormValues) => {
    const { phoneNumber } = data;
    setPhoneNumber(phoneNumber);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.phoneQuestion')}</QuestionHeader>
      <PageWrapper>
        <View className="mt-6">
          <ControlledPhoneInput
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            control={control}
            name="phoneNumber"
            error={errors?.phoneNumber?.message}
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

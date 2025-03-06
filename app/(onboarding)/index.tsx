import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import ControlledPhoneInput from '@/components/ui/form/ControlledPhoneInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import {
  ICountry,
  isValidPhoneNumber,
} from 'react-native-international-phone-number';
import * as z from 'zod';

const formSchema = z.object({
  phone: z.string(),
});
type FormValues = z.infer<typeof formSchema>;

export default function OnboardingMainScreen() {
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(
    undefined
  );
  const router = useRouter();

  const [, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { phone } = data;
    const phoneNumber = `${selectedCountry?.callingCode} ${phone}`;
    const isValid = isValidPhoneNumber(phone, selectedCountry as ICountry);
    if (!isValid) {
      return Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid phone number.'
      );
    }
    console.log(phoneNumber);
    setLoading(true);
    // let { data: userData, error } = await supabase.auth.signInWithOtp({
    //   phone: '+40799156290',
    // });
    // let { data: userData, error } = await supabase.auth.verifyOtp({
    //   phone: '+40799156290',
    //   token: '137717',
    //   type: 'sms',
    // });
    // if (error) {
    //   console.log('ERROR', error);
    //   return setLoading(false);
    // }
    // console.log('SUCCESS', userData);
    setLoading(false);
    router.push('/(onboarding)/otp');
  };

  return (
    <PageWrapper
      footer={
        <PageFooter className="bg-accent">
          <ControlledPhoneInput
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            control={control}
            name="phone"
            className="mb-6"
          />
          <Button onPress={handleSubmit(onSubmit)} variant="default">
            <Text className="uppercase">{t.t('common.submit')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text>{t.t('common.welcome')}</Text>
    </PageWrapper>
  );
}

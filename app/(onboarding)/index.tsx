import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import PhoneInput, {
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
        <PageFooter>
          <Button onPress={handleSubmit(onSubmit)} variant="default">
            <Text>Submit</Text>
          </Button>
        </PageFooter>
      }
    >
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={(country) => setSelectedCountry(country)}
            theme="dark"
            modalHeight="80%"
            popularCountries={['RO', 'US', 'GB']}
            allowZeroAfterCallingCode={false}
            defaultCountry="RO"
            language="en"
            phoneInputStyles={{
              container: {
                backgroundColor: colors.primary[500],
                borderColor: colors.primary[400],
              },
              flagContainer: {
                backgroundColor: colors.primary[700],
              },
            }}
            modalStyles={{
              modal: {
                backgroundColor: colors.primary[900],
              },
              searchInput: {
                borderColor: colors.primary[400],
                backgroundColor: colors.primary[500],
              },
              countryButton: {
                borderColor: colors.primary[400],
                backgroundColor: colors.primary[500],
              },
            }}
          />
        )}
      />

      {/* <Link asChild href="/(onboarding)/otp">
        <Button
          variant="secondary"
          size="full"
          model="classic"
          className="mt-12"
        >
          <Text>OTP</Text>
        </Button>
      </Link> */}
    </PageWrapper>
  );
}

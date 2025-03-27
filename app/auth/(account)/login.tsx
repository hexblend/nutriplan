import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import ControlledPhoneInput from '@/components/ui/form/ControlledPhoneInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { useSession } from '@/providers/SessionProvider';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { ICountry } from 'react-native-international-phone-number';
import { z } from 'zod';

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Required'),
  password: z.string().min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function LoginScreen() {
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const { phoneNumber, password } = data;
    const phone = `${selectedCountry?.callingCode}${phoneNumber}`;
    try {
      await signIn(phone, password);
    } catch (error) {
      Alert.alert(t.t('auth.loginError'));
      return console.error('LOGIN ERROR', error);
    }
  };

  return (
    <View className="flex-1">
      <PageWrapper className="pt-8">
        <ControlledPhoneInput
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          control={control}
          name="phoneNumber"
          error={errors?.phoneNumber?.message}
        />
        <View className="mt-4">
          <ControlledInput
            control={control}
            name="password"
            error={errors?.password}
            secureTextEntry={!showPassword}
            placeholder={t.t('auth.passwordPlaceholder')}
            rightIcon={
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <Button
          variant="default"
          onPress={handleSubmit(onSubmit)}
          className="mt-6"
          disabled={!isDirty || !isValid}
        >
          <Text className="uppercase" disabled={!isDirty || !isValid}>
            {t.t('auth.signIn')}
          </Text>
        </Button>
        <Button
          variant="ghost"
          onPress={() => {
            /* Handle forgot password */
          }}
          className="mt-4"
        >
          <Text>{t.t('auth.forgotPassword')}</Text>
        </Button>
      </PageWrapper>
    </View>
  );
}

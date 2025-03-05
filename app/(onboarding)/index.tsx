import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { supabase } from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function OnboardingMainScreen() {
  const router = useRouter();

  const [, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: 'asdasdasd',
    });
    if (error) {
      console.log(error);
      return setLoading(false);
    }
    setLoading(false);
    router.push('/(onboarding)/otp');
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <ControlledInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.email?.message}
      />

      <Button
        className="mt-6"
        onPress={handleSubmit(onSubmit)}
        variant="default"
      >
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ControlledInput } from '@/components/ui/form/ControlledInput';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function OnboardingMainScreen() {
  const router = useRouter();
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    router.push('/(onboarding)/hello');
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-xl font-bold">Onboarding</Text>

      <ControlledInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email?.message}
      />

      <Button className="mt-6" onPress={handleSubmit(onSubmit)} variant="default">
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

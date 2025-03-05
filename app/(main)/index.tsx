import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Link } from 'expo-router';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TabOneScreen() {
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
  };

  return (
    <View className="flex-1 p-4 bg-background">
      <Text className="text-2xl font-bold mb-6 text-foreground">Enter Your Name</Text>

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

      <Link href="/(onboarding)" asChild className="mt-8">
        <Button>
          <Text>Go to onboarding</Text>
        </Button>
      </Link>
    </View>
  );
}

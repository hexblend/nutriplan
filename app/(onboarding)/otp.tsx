import { Text } from '@/components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { z } from 'zod';

const formSchema = z.object({
  otp: z.string().length(6, 'Must be 6 digits'),
});
type FormValues = z.infer<typeof formSchema>;

export default function OnboardingTwoScreen() {
  const [error] = useState<string | null>(null);

  const { control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="mb-8 text-xl font-bold">Your Code</Text>
      <Controller
        name="otp"
        control={control}
        render={({ field: { onChange } }) => (
          <OtpInput
            numberOfDigits={6}
            onTextChange={onChange}
            onFilled={(code) => onSubmit({ otp: code })}
            autoFocus
            blurOnFilled
            type="numeric"
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: {
                marginBottom: 64,
              },
              pinCodeContainerStyle: { height: 48 },
              pinCodeTextStyle: { color: 'white' },
            }}
          />
        )}
      />
      {error && <Text className="mt-2 text-red-500">{error}</Text>}
    </View>
  );
}

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
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
      name: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <View className="flex-1 p-4 bg-background">
      <Text className="text-2xl font-bold mb-6 text-foreground">Enter Your Name</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <View className="space-y-2">
            <Label>Name</Label>
            <Input placeholder="Enter your name" onChangeText={onChange} value={value} />
            {errors.name && <Text className="text-destructive text-sm">{errors.name.message}</Text>}
          </View>
        )}
      />

      <Button className="mt-6" onPress={handleSubmit(onSubmit)} variant="default">
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

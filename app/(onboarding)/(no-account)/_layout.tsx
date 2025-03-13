import { Stack } from 'expo-router';
import { defaultStackProps } from '../_layout';

export default function OnboardingNoAccountLayout() {
  return (
    <Stack {...(defaultStackProps as any)}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="name" />
      <Stack.Screen name="goal" />
      <Stack.Screen name="weight" />
      <Stack.Screen name="knowledge" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="password" />
      <Stack.Screen name="physical" />
      <Stack.Screen name="age" />
      <Stack.Screen name="restrictions" />
      <Stack.Screen name="challenge" />
    </Stack>
  );
}

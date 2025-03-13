import { Stack } from 'expo-router';
import { defaultStackProps } from '../_layout';

export default function OnboardingAccountLayout() {
  return (
    <Stack {...(defaultStackProps as any)}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="new-password" />
    </Stack>
  );
}

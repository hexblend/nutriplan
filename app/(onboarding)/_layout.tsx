import { Stack } from 'expo-router';

export const defaultStackProps = {
  screenOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};

export default function OnboardingLayout() {
  return (
    <Stack {...(defaultStackProps as any)}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(no-account)" options={{ headerShown: false }} />
      <Stack.Screen name="(account)" options={{ headerShown: false }} />
    </Stack>
  );
}

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
      <Stack.Screen
        name="(onboarding)/progress"
        options={{ headerShown: false }}
      />

      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="(onboarding)/questions"
        options={{
          headerTitle: '',
          headerBackTitle: '‎',
          headerShadowVisible: false,
        }}
      />

      {/* <Stack.Screen
        name="(onboarding)/progress"
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen name="(account)/login" />
      <Stack.Screen name="(account)/forgot-password" />

      <Stack.Screen name="(common)/new-password" />
      <Stack.Screen name="(common)/otp" />
    </Stack>
  );
}

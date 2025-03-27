import { t } from '@/i18n/translations';
import { Stack } from 'expo-router';

export const defaultStackProps = {
  screenOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: '‎',
  },
};

export default function OnboardingLayout() {
  return (
    <Stack {...(defaultStackProps as any)}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="(onboarding)/progress"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(account)/login"
        options={{ headerTitle: t.t('auth.enterYourDetails') }}
      />
      <Stack.Screen name="(account)/forgot-password" />

      <Stack.Screen name="(common)/new-password" />
      <Stack.Screen name="(common)/otp" />
    </Stack>
  );
}

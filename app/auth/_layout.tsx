import { t } from '@/i18n/translations';
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

      <Stack.Screen
        name="(no-account)/questions"
        options={{ headerTitle: '', headerBackTitle: t.t('common.back') }}
      />
      <Stack.Screen name="(no-account)/name" />
      <Stack.Screen name="(no-account)/goal" />
      <Stack.Screen name="(no-account)/weight" />
      <Stack.Screen name="(no-account)/knowledge" />
      <Stack.Screen name="(no-account)/phone" />
      <Stack.Screen name="(no-account)/physical" />
      <Stack.Screen name="(no-account)/age" />
      <Stack.Screen name="(no-account)/restrictions" />
      <Stack.Screen name="(no-account)/diseaze" />
      <Stack.Screen name="(no-account)/challenge" />

      <Stack.Screen name="(account)/login" />
      <Stack.Screen name="(account)/forgot-password" />

      <Stack.Screen name="(common)/new-password" />
      <Stack.Screen name="(common)/otp" />
    </Stack>
  );
}

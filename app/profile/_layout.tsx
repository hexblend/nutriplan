import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="edit-units"
        options={{
          title: 'Edit Units',
          headerBackTitle: 'Profile',
        }}
      />
    </Stack>
  );
}

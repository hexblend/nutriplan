import { useColorScheme } from '@/components/ui/useColorScheme';
import { NAV_THEME } from '@/lib/constants';
import { SessionProvider, useSession } from '@/providers/SessionProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import '../assets/styles/global.css';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [isAppReady, setIsAppReady] = React.useState(false);
  const { session, sessionLoading } = useSession();

  const [loaded, error] = useFonts({
    /* eslint-disable */
    Silka: require('../assets/fonts/silka-regular.ttf'),
    SilkaMedium: require('../assets/fonts/silka-medium.ttf'),
    SilkaBold: require('../assets/fonts/silka-bold.ttf'),
    /* eslint-enable */
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !sessionLoading) {
      setIsAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [loaded, sessionLoading]);

  if (!isAppReady) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style="light" />
      <Stack initialRouteName={session ? '(tabs)' : 'auth'}>
        <Stack.Screen redirect name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="plans" options={{ headerShown: false }} />
        <Stack.Screen name="feedback" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <AppLayout />
    </SessionProvider>
  );
}

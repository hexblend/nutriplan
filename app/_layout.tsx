import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../assets/styles/global.css';
import { NAV_THEME } from '@/lib/constants';
import React from 'react';
import { useColorScheme } from '@/components/ui/useColorScheme';

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

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const [isAppReady, setIsAppReady] = React.useState(false);

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
    if (loaded) {
      setIsAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!isAppReady) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

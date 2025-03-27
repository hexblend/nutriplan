import PageProgressHeader from '@/components/layout/PageProgressHeader';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import {
  ProgressScreenName,
  onboardingProgressScreens,
} from '@/lib/onboarding/onboardingScreens';
import {
  OnboardingProvider,
  useOnboardingContext,
} from '@/providers/OnboardingProvider';
import { useNavigation } from 'expo-router';
import Animated, {
  Layout,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from 'react-native-reanimated';

function ProgressContent() {
  const navigation = useNavigation();
  const { currentScreenName, setCurrentScreenName, isForward, setIsForward } =
    useOnboardingContext();

  const currentScreen = progressScreensConfig[currentScreenName];
  const CurrentScreenComponent = onboardingProgressScreens[currentScreenName];

  const handleBackPress = () => {
    setIsForward(false);
    if (currentScreenName === 'questionsFiller') return navigation.goBack();

    const previousScreen = Object.entries(progressScreensConfig).find(
      ([, screen]) => screen.next === currentScreenName
    )?.[0] as ProgressScreenName;
    setCurrentScreenName(previousScreen);
  };

  return (
    <>
      <PageProgressHeader
        progress={currentScreen.progress}
        onBackPress={handleBackPress}
      />
      <Animated.View
        key={currentScreenName}
        style={{ flex: 1, width: '100%' }}
        entering={
          currentScreenName === 'name'
            ? undefined
            : isForward
              ? SlideInRight
              : SlideInLeft
        }
        exiting={isForward ? SlideOutLeft : SlideOutRight}
        layout={Layout.springify()}
      >
        <CurrentScreenComponent />
      </Animated.View>
    </>
  );
}

export default function ProgressScreen() {
  return (
    <OnboardingProvider>
      <ProgressContent />
    </OnboardingProvider>
  );
}

import PageProgressHeader from '@/components/layout/PageProgressHeader';
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
import AgeScreen from './age';
import ChallengeScreen from './challenge';
import DiseazeScreen from './diseaze';
import GoalScreen from './goal';
import KnowledgeScreen from './knowledge';
import NameScreen from './name';
import PhoneScreen from './phone';
import PhysicalScreen from './physical';
import RestrictionsScreen from './restrictions';
import WeightScreen from './weight';

export const progressScreens = {
  name: { next: 'goal', progress: 2, component: NameScreen },
  goal: { next: 'weight', progress: 10, component: GoalScreen },
  weight: { next: 'knowledge', progress: 20, component: WeightScreen },
  knowledge: { next: 'phone', progress: 30, component: KnowledgeScreen },
  phone: { next: 'physical', progress: 40, component: PhoneScreen },
  physical: { next: 'age', progress: 50, component: PhysicalScreen },
  age: { next: 'restrictions', progress: 60, component: AgeScreen },
  restrictions: {
    next: 'diseaze',
    progress: 70,
    component: RestrictionsScreen,
  },
  diseaze: { next: 'challenge', progress: 80, component: DiseazeScreen },
  challenge: { next: undefined, progress: 100, component: ChallengeScreen },
} as const;
export type ProgressScreenName = keyof typeof progressScreens;

function ProgressContent() {
  const navigation = useNavigation();
  const { currentScreenName, setCurrentScreenName, isForward, setIsForward } =
    useOnboardingContext();

  const currentScreen = progressScreens[currentScreenName];
  const { component: CurrentScreenComponent, progress: currentProgress } =
    currentScreen;

  const handleBackPress = () => {
    setIsForward(false);
    if (currentScreenName === 'name') return navigation.goBack();

    const previousScreen = Object.entries(progressScreens).find(
      ([, config]) => config.next === currentScreenName
    )?.[0] as ProgressScreenName;
    setCurrentScreenName(previousScreen);
  };

  return (
    <>
      <PageProgressHeader
        progress={currentProgress}
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

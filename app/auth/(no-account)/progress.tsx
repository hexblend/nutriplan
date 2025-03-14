import PageFooter from '@/components/layout/PageFooter';
import PageProgressHeader from '@/components/layout/PageProgressHeader';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { OnboardingProvider } from '@/providers/OnboardingProvider';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
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

export const screens = {
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
type ScreenName = keyof typeof screens;

export default function ProgressScreen() {
  const navigation = useNavigation();

  const [currentScreen, setCurrentScreen] = useState<ScreenName>('name');
  const [isForward, setIsForward] = useState(true);

  const currentScreenFlow = screens[currentScreen];
  const { component: CurrentScreenComponent, progress: currentProgress } =
    currentScreenFlow;

  const handleContinuePress = () => {
    setIsForward(true);
    const nextScreen = currentScreenFlow.next;
    if (nextScreen) setCurrentScreen(nextScreen);
  };

  const handleBackPress = () => {
    setIsForward(false);
    if (currentProgress === screens.name.progress) {
      return navigation.goBack();
    }
    const previousScreen = Object.entries(screens).find(
      ([, config]) => config.next === currentScreen
    )?.[0] as ScreenName;
    setCurrentScreen(previousScreen);
  };

  return (
    <OnboardingProvider>
      <PageWrapper
        header={
          <PageProgressHeader
            progress={currentProgress}
            onBackPress={handleBackPress}
          />
        }
        footer={
          <PageFooter className="bg-transparent">
            <Button
              variant="default"
              onPress={handleContinuePress}
              disabled={!currentScreenFlow.next}
            >
              <Text className="uppercase" disabled={!currentScreenFlow.next}>
                {t.t('common.continue')}
              </Text>
            </Button>
          </PageFooter>
        }
      >
        <Animated.View
          key={currentScreen}
          style={{ flex: 1, width: '100%' }}
          entering={
            currentScreen === 'name'
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
      </PageWrapper>
    </OnboardingProvider>
  );
}

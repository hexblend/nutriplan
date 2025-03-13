import PageFooter from '@/components/layout/PageFooter';
import PageProgressHeader from '@/components/layout/PageProgressHeader';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
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

export const screenFlow = {
  name: { next: 'goal', progress: 10 },
  goal: { next: 'weight', progress: 20 },
  weight: { next: 'knowledge', progress: 30 },
  knowledge: { next: 'phone', progress: 40 },
  phone: { next: 'physical', progress: 50 },
  physical: { next: 'age', progress: 60 },
  age: { next: 'restrictions', progress: 70 },
  restrictions: { next: 'diseaze', progress: 80 },
  diseaze: { next: 'challenge', progress: 90 },
  challenge: { next: undefined, progress: 100 },
} as const;
type ScreenName = keyof typeof screenFlow;

const screens = {
  name: NameScreen,
  goal: GoalScreen,
  weight: WeightScreen,
  knowledge: KnowledgeScreen,
  phone: PhoneScreen,
  physical: PhysicalScreen,
  age: AgeScreen,
  restrictions: RestrictionsScreen,
  diseaze: DiseazeScreen,
  challenge: ChallengeScreen,
};

export default function ProgressScreen() {
  const navigation = useNavigation();
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('name');
  const [isForward, setIsForward] = useState(true);

  const CurrentScreenComponent = screens[currentScreen];
  const currentProgress = screenFlow[currentScreen].progress;

  const handleContinuePress = () => {
    setIsForward(true);
    const nextScreen = screenFlow[currentScreen].next as ScreenName;
    if (nextScreen) {
      setCurrentScreen(screenFlow[currentScreen].next as ScreenName);
    }
  };

  const handleBackPress = () => {
    setIsForward(false);
    if (currentProgress === 10) {
      return navigation.goBack();
    }
    const previousScreen = Object.entries(screenFlow).find(
      ([, config]) => config.next === currentScreen
    )?.[0] as ScreenName;
    setCurrentScreen(previousScreen);
  };

  return (
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
            disabled={!screenFlow[currentScreen].next}
          >
            <Text
              className="uppercase"
              disabled={!screenFlow[currentScreen].next}
            >
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
  );
}

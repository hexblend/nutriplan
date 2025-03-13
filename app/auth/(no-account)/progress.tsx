import PageFooter from '@/components/layout/PageFooter';
import PageProgressHeader from '@/components/layout/PageProgressHeader';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { useState } from 'react';
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

const screenFlow = {
  name: 'goal',
  goal: 'weight',
  weight: 'knowledge',
  knowledge: 'phone',
  phone: 'physical',
  physical: 'age',
  age: 'restrictions',
  restrictions: 'diseaze',
  diseaze: 'challenge',
  challenge: 'login',
} as const;
type ScreenName = keyof typeof screenFlow;

export default function ProgressScreen() {
  const [currentScreenContent, setCurrentScreenContent] =
    useState<ScreenName>('name');
  const [currentProgress, setCurrentProgress] = useState(10);

  // Continue to next screen
  const handleContinuePress = () => {
    const nextScreen = screenFlow[currentScreenContent] as ScreenName;
    setCurrentScreenContent(nextScreen);
    setCurrentProgress(currentProgress + 10);
  };

  return (
    <PageWrapper
      header={<PageProgressHeader progress={currentProgress} />}
      footer={
        <PageFooter className="bg-transparent">
          <Button variant="default" onPress={handleContinuePress}>
            <Text className="uppercase">{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <NameScreen />
      <GoalScreen />
      <WeightScreen />
      <KnowledgeScreen />
      <PhoneScreen />
      <PhysicalScreen />
      <AgeScreen />
      <RestrictionsScreen />
      <DiseazeScreen />
      <ChallengeScreen />
    </PageWrapper>
  );
}

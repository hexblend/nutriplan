import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

interface RecapItemProps {
  text: string;
  delay: number;
}

function RecapItem({ text, delay }: RecapItemProps) {
  const [visible, setVisible] = useState(false);
  const opacityAnim = new Animated.Value(0);
  const translateXAnim = new Animated.Value(-20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, text]);

  if (!visible) return null;
  return (
    <Animated.View
      className="relative flex-row items-center gap-4 rounded-md bg-card px-3 py-3"
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: translateXAnim }],
      }}
    >
      <FontAwesome name="check-square" size={24} color="#22c55e" />
      <Text className="flex-1 text-lg text-foreground">{text}</Text>
    </Animated.View>
  );
}

export default function RecapScreen() {
  const {
    firstName,
    goal,
    dietaryRestrictions,
    time,
    challenge,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
  } = useOnboardingContext();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToNextScreen = () => {
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  // Default values for when data is missing
  const displayName = firstName || 'there';
  const displayGoal = goal
    ? `Help you ${goal.toLowerCase()}`
    : 'Help you achieve your goals';
  const displayRestrictions = dietaryRestrictions?.length
    ? `Work with your ${dietaryRestrictions.join(', ').toLowerCase()} preferences`
    : 'Work with your dietary preferences';
  const displayTime = time
    ? `Require only ${time.toLowerCase()} for daily preparation`
    : 'Require minimal time for preparation';
  const displayChallenge = challenge
    ? `Address your challenge with ${challenge.toLowerCase()}`
    : 'Address your meal planning challenges';

  return (
    <View className="flex-1">
      <QuestionHeader>{`All set up ${displayName}!`}</QuestionHeader>
      <PageWrapper
        footer={
          <PageFooter>
            <Button
              variant="default"
              onPress={handleGoToNextScreen}
              className="mt-6"
              disabled={!ready}
            >
              <Text className="uppercase" disabled={!ready}>
                {t.t('common.continue')}
              </Text>
            </Button>
          </PageFooter>
        }
      >
        <View className="mt-8">
          <Text className="text-center text-lg font-bold text-foreground">
            Our meal plans will:
          </Text>
          <View className="mt-8 gap-6">
            <RecapItem text={displayGoal} delay={500} />
            {!dietaryRestrictions.includes('No restrictions') && (
              <RecapItem text={displayRestrictions} delay={1000} />
            )}
            <RecapItem text={displayTime} delay={1500} />
            <RecapItem text={displayChallenge} delay={2000} />
          </View>
        </View>
      </PageWrapper>
    </View>
  );
}

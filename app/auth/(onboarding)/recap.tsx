import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

interface RecapItemProps {
  text: string;
  delay: number;
}

function RecapItem({ text, delay }: RecapItemProps) {
  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(-20)).current;

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
  }, [delay, text, opacityAnim, translateXAnim]);

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

interface AnimatedTitleProps {
  title: string;
  delay: number;
}

function AnimatedTitle({ title, delay }: AnimatedTitleProps) {
  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(-20)).current;

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
  }, [delay, title, opacityAnim, translateXAnim]);

  if (!visible) return null;
  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: translateXAnim }],
      }}
    >
      <Text className="mb-4 text-xl font-bold text-foreground">{title}</Text>
    </Animated.View>
  );
}

function RecapSection({
  title,
  children,
  titleDelay,
}: {
  title: string;
  children: React.ReactNode;
  titleDelay: number;
}) {
  return (
    <View className="mb-8">
      <AnimatedTitle title={title} delay={titleDelay} />
      <View className="gap-3">{children}</View>
    </View>
  );
}

export default function RecapScreen() {
  const {
    firstName,
    lastName,
    age,
    height,
    weight,
    targetWeight,
    goal,
    dietaryRestrictions,
    time,
    challenge,
    activity,
    targetActivity,
    targetMaintenance,
    targetCondition,
    targetSport,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
  } = useOnboardingContext();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 4000);
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

  const noRestrictions = dietaryRestrictions.includes('No restrictions');

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
        <View className="mt-6">
          <RecapSection title="You are" titleDelay={200}>
            <RecapItem
              text={`${firstName} ${lastName}, ${age} years old`}
              delay={800}
            />
            <RecapItem text={`Height: ${height}`} delay={1500} />
            <RecapItem text={`Current weight: ${weight}`} delay={2000} />
            {targetWeight && (
              <RecapItem text={`Target weight: ${targetWeight}`} delay={2500} />
            )}
          </RecapSection>

          <RecapSection title="Your Goals" titleDelay={3000}>
            <RecapItem text={displayGoal} delay={3500} />
            {goal === 'Lose weight' && targetWeight && (
              <RecapItem text={`Target weight: ${targetWeight}`} delay={4000} />
            )}
            {goal === 'Maintain weight in a healthy way' &&
              targetMaintenance && (
                <RecapItem
                  text={`Focus on: ${targetMaintenance.toLowerCase()}`}
                  delay={4000}
                />
              )}
            {goal === 'Increase muscle mass' && targetActivity && (
              <RecapItem
                text={`Activity focus: ${targetActivity.toLowerCase()}`}
                delay={4000}
              />
            )}
            {goal === 'Diet for a condition' && targetCondition && (
              <RecapItem text={`Condition: ${targetCondition}`} delay={4000} />
            )}
            {goal === 'Performance for athletes' && targetSport && (
              <RecapItem
                text={`Sport focus: ${targetSport.toLowerCase()}`}
                delay={4000}
              />
            )}
          </RecapSection>

          <RecapSection title="Activity & Lifestyle" titleDelay={4500}>
            {activity && (
              <RecapItem text={`Activity level: ${activity}`} delay={5000} />
            )}
            <RecapItem text={displayTime} delay={5500} />
            <RecapItem text={displayChallenge} delay={6000} />
          </RecapSection>

          <RecapSection title="Dietary Preferences" titleDelay={6500}>
            <RecapItem
              text={
                noRestrictions ? 'No dietary restrictions' : displayRestrictions
              }
              delay={7000}
            />
          </RecapSection>
        </View>
      </PageWrapper>
    </View>
  );
}

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
  icon?: keyof typeof FontAwesome.glyphMap;
  iconColor?: string;
  iconSize?: number;
}

function RecapItem({
  text,
  delay,
  icon = 'check-square',
  iconColor = '#22c55e',
  iconSize = 24,
}: RecapItemProps) {
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
      <FontAwesome name={icon} size={iconSize} color={iconColor} />
      <Text className="flex-1 text-lg text-foreground">{text}</Text>
    </Animated.View>
  );
}

interface AnimatedTitleProps {
  title: string;
  delay: number;
  centered?: boolean;
}

function AnimatedTitle({ title, delay, centered = false }: AnimatedTitleProps) {
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
      className={centered ? 'items-center' : ''}
    >
      <Text
        className={`mb-4 text-xl font-bold text-foreground ${centered ? 'text-center' : ''}`}
      >
        {title}
      </Text>
    </Animated.View>
  );
}

function RecapSection({
  title,
  children,
  titleDelay,
  centered = false,
}: {
  title: string;
  children: React.ReactNode;
  titleDelay: number;
  centered?: boolean;
}) {
  return (
    <View className="mb-8">
      <AnimatedTitle title={title} delay={titleDelay} centered={centered} />
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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToNextScreen = () => {
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  // Default values for when data is missing
  const displayName = firstName || 'there';
  const noRestrictions = dietaryRestrictions.includes('No restrictions');

  return (
    <View className="flex-1">
      <QuestionHeader>
        {t.t('auth.recapTitle', { name: displayName })}
      </QuestionHeader>
      <PageWrapper
        footer={
          <PageFooter className="-mx-3 border-t border-t-border !px-6">
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
          <RecapSection title={t.t('auth.recapYouAre')} titleDelay={200}>
            <RecapItem
              text={t.t('auth.recapPersonInfo', { firstName, lastName, age })}
              delay={800}
              icon="circle"
              iconColor="#ffffff"
              iconSize={12}
            />
            <RecapItem
              text={t.t('auth.recapHeight', { height })}
              delay={1500}
              icon="circle"
              iconColor="#ffffff"
              iconSize={12}
            />
            <RecapItem
              text={t.t('auth.recapCurrentWeight', { weight })}
              delay={2000}
              icon="circle"
              iconColor="#ffffff"
              iconSize={12}
            />
            {targetWeight && (
              <RecapItem
                text={t.t('auth.recapTargetWeight', { targetWeight })}
                delay={2500}
                icon="circle"
                iconColor="#ffffff"
                iconSize={12}
              />
            )}
          </RecapSection>

          <RecapSection title={t.t('auth.recapHelpTitle')} titleDelay={3000}>
            {goal === 'Lose weight' && targetWeight && (
              <RecapItem
                text={t.t('auth.recapGoalLoseWeight', { targetWeight })}
                delay={4000}
              />
            )}
            {goal === 'Maintain weight in a healthy way' &&
              targetMaintenance && (
                <RecapItem
                  text={t.t('auth.recapGoalMaintain', { targetMaintenance })}
                  delay={4000}
                />
              )}
            {goal === 'Increase muscle mass' && targetActivity && (
              <RecapItem
                text={t.t('auth.recapGoalMuscle', { targetActivity })}
                delay={4000}
              />
            )}
            {goal === 'Diet for a condition' && targetCondition && (
              <RecapItem
                text={t.t('auth.recapGoalCondition', { targetCondition })}
                delay={4000}
              />
            )}
            {goal === 'Performance for athletes' && targetSport && (
              <RecapItem
                text={t.t('auth.recapGoalSport', { targetSport })}
                delay={4000}
              />
            )}
            {activity && (
              <RecapItem
                text={t.t('auth.recapActivity', { activity })}
                delay={4500}
              />
            )}
            <RecapItem
              text={t.t('auth.recapTime', {
                time: time?.toLowerCase() || 'busy',
              })}
              delay={5000}
            />
            <RecapItem
              text={t.t('auth.recapChallenge', {
                challenge: challenge?.toLowerCase() || 'meal planning',
              })}
              delay={5500}
            />
            <RecapItem
              text={
                noRestrictions
                  ? t.t('auth.recapRestrictions')
                  : t.t('auth.recapRestrictionsWith', {
                      restrictions: dietaryRestrictions
                        .join(', ')
                        .toLowerCase(),
                    })
              }
              delay={6000}
            />
          </RecapSection>

          <Animated.View
            style={{
              opacity: new Animated.Value(0),
              transform: [{ translateY: 20 }],
            }}
            className="mt-8 items-center"
          >
            <Text className="text-center text-sm text-muted-foreground">
              {t.t('auth.recapChangeDetails')}
            </Text>
          </Animated.View>
        </View>
      </PageWrapper>
    </View>
  );
}

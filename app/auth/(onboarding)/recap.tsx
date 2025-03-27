import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import RecapItem from '@/components/onboarding/recap/RecapItem';
import RecapSection from '@/components/onboarding/recap/RecapSection';
import { translateValue } from '@/components/onboarding/recap/TranslationMap';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

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
    sex,
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
              icon={sex === 'male' ? 'male' : 'female'}
              iconColor="#3b82f6"
              iconSize={20}
            />
            <RecapItem
              text={t.t('auth.recapHeight', { height })}
              delay={1500}
              icon="arrows-v"
              iconColor="#3b82f6"
              iconSize={20}
            />
            <RecapItem
              text={t.t('auth.recapCurrentWeight', { weight })}
              delay={2000}
              icon="tachometer"
              iconColor="#3b82f6"
              iconSize={20}
            />
            {targetWeight && (
              <RecapItem
                text={t.t('auth.recapTargetWeight', { targetWeight })}
                delay={2500}
                icon="flag-checkered"
                iconColor="#3b82f6"
                iconSize={20}
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
                  text={t.t('auth.recapGoalMaintain', {
                    targetMaintenance: translateValue(
                      'targetMaintenance',
                      targetMaintenance
                    ),
                  })}
                  delay={4000}
                />
              )}
            {goal === 'Increase muscle mass' && targetActivity && (
              <RecapItem
                text={t.t('auth.recapGoalMuscle', {
                  targetActivity: translateValue(
                    'targetActivity',
                    targetActivity
                  ),
                })}
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
                text={t.t('auth.recapGoalSport', {
                  targetSport: translateValue('targetSport', targetSport),
                })}
                delay={4000}
              />
            )}
            {activity && (
              <RecapItem
                text={t.t('auth.recapActivity', {
                  activity: translateValue('activity', activity),
                })}
                delay={4500}
              />
            )}
            <RecapItem
              text={t.t('auth.recapTime', {
                time: translateValue('time', time) || 'busy',
              })}
              delay={5000}
            />
            <RecapItem
              text={t.t('auth.recapChallenge', {
                challenge:
                  translateValue('challenge', challenge) || 'meal planning',
              })}
              delay={5500}
            />
            <RecapItem
              text={
                noRestrictions
                  ? t.t('auth.recapRestrictions')
                  : t.t('auth.recapRestrictionsWith', {
                      restrictions: dietaryRestrictions
                        .map((r) => translateValue('dietaryRestrictions', r))
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

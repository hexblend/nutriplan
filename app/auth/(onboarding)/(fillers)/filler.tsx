import Logo from '@/assets/images/svg/logo.svg';
import SpeechCaret from '@/assets/images/svg/speech-caret.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { useEffect, useState } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';

interface FillerScreenProps {
  text: string;
}

export default function FillerScreen({ text }: FillerScreenProps) {
  const { setIsForward, currentScreenName, setCurrentScreenName } =
    useOnboardingContext();
  const { height } = useWindowDimensions();
  const [ready, setReady] = useState(false);

  const scaleAnim = new Animated.Value(0);
  const logoBumpAnim = new Animated.Value(1);

  useEffect(() => {
    // Speech animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      delay: 1000,
      friction: 7,
    }).start();

    // Logo bump
    Animated.sequence([
      Animated.timing(logoBumpAnim, {
        toValue: 1.3,
        duration: 250,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoBumpAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setReady(true);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToNextScreen = () => {
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
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
      className="px-4"
    >
      <View
        className="items-center justify-center"
        style={{ height: height - 250 }}
      >
        {/* Speech Bubble */}
        <Animated.View
          className="mb-6 items-center"
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text className="rounded-md border border-border p-4">{text}</Text>
          <SpeechCaret width={30} height={30} style={{ marginTop: -9 }} />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ scale: logoBumpAnim }],
          }}
        >
          <Logo width={80} height={80} />
        </Animated.View>
      </View>
    </PageWrapper>
  );
}

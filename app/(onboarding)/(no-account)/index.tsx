import Logo from '@/assets/images/svg/logo.svg';
import SpeechCaret from '@/assets/images/svg/speech-caret.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';

export default function QuickQuestionsScreen() {
  const { height } = useWindowDimensions();
  const [ready, setReady] = useState(false);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      delay: 400,
      friction: 7,
    }).start();

    const timer = setTimeout(() => {
      setReady(true);
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper
      footer={
        <PageFooter>
          <Link href="/(onboarding)/(no-account)/name" asChild>
            <Button variant="default" className="mt-4" disabled={!ready}>
              <Text
                className={cn(
                  'uppercase',
                  ready ? 'text-white' : 'text-gray-500'
                )}
              >
                {t.t('common.continue')}
              </Text>
            </Button>
          </Link>
        </PageFooter>
      }
      className="px-8"
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
          <Text className="rounded-md border border-border p-4">
            Just 7 quick questions before we start your first meal plan!
          </Text>
          <SpeechCaret width={30} height={30} style={{ marginTop: -9 }} />
        </Animated.View>

        <Logo width={80} height={80} />
      </View>
    </PageWrapper>
  );
}

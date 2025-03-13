import backgroundImage from '@/assets/images/bgOverlay.jpg';
import LogoText from '@/assets/images/svg/logo-text.svg';
import Logo from '@/assets/images/svg/logo.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, View, useWindowDimensions } from 'react-native';

export default function OnboardingMainScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  return (
    <PageWrapper
      footer={
        <PageFooter className="bg-transparent">
          <Button
            onPress={() => router.push('/(onboarding)/otp')}
            variant="default"
          >
            <Text className="uppercase">{t.t('common.getStarted')}</Text>
          </Button>
          <Button
            onPress={() => router.push('/(onboarding)/otp')}
            variant="secondary"
            className="mt-4"
          >
            <Text className="uppercase">
              {t.t('common.alreadyHaveAccount')}
            </Text>
          </Button>
        </PageFooter>
      }
      className="px-0"
    >
      <ImageBackground
        source={backgroundImage}
        style={{ width: '100%', height }}
      >
        <View className="-mt-64 flex-1 items-center justify-center">
          <View className="mb-8">
            <Logo width={120} height={120} />
          </View>
          <LogoText width={264} height={30} />
          <Text className="mt-3 font-light">{t.t('common.motto')}</Text>
        </View>
      </ImageBackground>
    </PageWrapper>
  );
}

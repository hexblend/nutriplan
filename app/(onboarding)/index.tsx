import backgroundImage from '@/assets/images/bgOverlay.jpg';
import LogoText from '@/assets/images/svg/logo-text.svg';
import Logo from '@/assets/images/svg/logo.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, View, useWindowDimensions } from 'react-native';

export default function OnboardingMainScreen() {
  const { height } = useWindowDimensions();

  return (
    <PageWrapper
      footer={
        <PageFooter className="bg-transparent">
          <Link href="/(onboarding)/(no-account)" asChild>
            <Button variant="default">
              <Text className="uppercase">{t.t('common.getStarted')}</Text>
            </Button>
          </Link>
          <Link href="/(onboarding)/(account)" asChild>
            <Button variant="secondary" className="mt-4">
              <Text className="uppercase">
                {t.t('common.alreadyHaveAccount')}
              </Text>
            </Button>
          </Link>
        </PageFooter>
      }
      className="px-0"
    >
      <ImageBackground
        source={backgroundImage}
        style={{ width: '100%', height: height - 250 }}
      >
        <View className="-mt-8 flex-1 items-center justify-center">
          <View className="mb-10">
            <Logo width={100} height={100} />
          </View>
          <LogoText width={264} height={30} />
          <Text className="mt-3 font-light">{t.t('common.motto')}</Text>
        </View>
      </ImageBackground>
    </PageWrapper>
  );
}

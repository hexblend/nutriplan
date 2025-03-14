import Logo from '@/assets/images/svg/logo.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { useOnboardingContext } from '@/providers/OnboardingProvider';

import { View } from 'react-native';

export default function NameScreen() {
  const { setIsForward, currentScreenName, setCurrentScreenName } =
    useOnboardingContext();

  const handleContinuePress = () => {
    const currentScreen = progressScreensConfig[currentScreenName];
    setIsForward(true);
    const nextScreen = currentScreen.next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <PageWrapper
      footer={
        <PageFooter className="bg-transparent px-0">
          <Button variant="default" onPress={handleContinuePress}>
            <Text className="uppercase">{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
      className="flex-1"
    >
      <View className="flex-row items-center justify-between">
        <Logo width={60} height={60} />
        <Text className="ml-6 flex-1 font-bold">
          {t.t('auth.nameQuestion')}
        </Text>
      </View>
    </PageWrapper>
  );
}

import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import PaywallBenefit from '@/components/onboarding/paywall/PaywallBenefit';
import AnimatedTitle from '@/components/onboarding/recap/AnimatedTitle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { appLanguage, t } from '@/i18n/translations';
import { bucketUrl } from '@/lib/utils';
import { Image, View } from 'react-native';

export default function PaywallScreen() {
  const onSubmit = () => {};
  const boldWords =
    appLanguage === 'en' ? ['goals', 'YOUR'] : ['obiectivele', 'tău'];

  return (
    <PageWrapper
      footer={
        <PageFooter>
          <Button variant="default" onPress={onSubmit} className="mt-6">
            <Text className="uppercase">{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <View className="mt-2 items-center">
        <Image
          source={{ uri: `${bucketUrl}/paywall.png` }}
          style={{ width: 195.5, height: 166.5 }} // Original size: 391 x 333 / 2
        />
        <AnimatedTitle
          title={t.t('auth.paywallTitle')}
          delay={100}
          centered
          className="mt-6"
        />

        <PaywallBenefit
          className="mt-4"
          text={t.t('auth.paywallBenefit')}
          boldWords={boldWords}
        />
      </View>
    </PageWrapper>
  );
}

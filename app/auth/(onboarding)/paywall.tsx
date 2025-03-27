import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedTitle from '@/components/onboarding/recap/AnimatedTitle';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { bucketUrl } from '@/lib/utils';
import { Image, View } from 'react-native';

export default function PaywallScreen() {
  const onSubmit = () => {};
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
          title="Say hello to your personalized weekly meal plans"
          delay={1000}
          centered
          className="mt-6"
        />
      </View>
    </PageWrapper>
  );
}

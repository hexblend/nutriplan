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
      <View className="items-center">
        <Image
          source={{ uri: `${bucketUrl}/paywall.png` }}
          style={{ width: 195.5, height: 166.5 }} // Original size: 391 x 333 / 2
        />
        <AnimatedTitle
          title={
            appLanguage === 'en'
              ? 'Say hello to your personalized weekly meal plans'
              : 'Salută planul tău alimentar personalizat săptămlânal'
          }
          delay={100}
          centered
          className="mt-6"
        />
        <PaywallBenefit
          className="mt-4"
          text={
            appLanguage === 'en'
              ? 'Reach your goals based on YOUR lifestyle'
              : 'Atinge-ți obiectivele bazate pe stilul tău de viață'
          }
          boldWords={
            appLanguage === 'en' ? ['goals', 'YOUR'] : ['obiectivele', 'tău']
          }
        />
        <PaywallBenefit
          className="mt-4"
          text={
            appLanguage === 'en'
              ? 'You get weekly meal plans, shopping lists and cooking instructions'
              : 'Primești planuri alimentare, liste de cumpărături și instrucțiuni de gătire'
          }
          boldWords={
            appLanguage === 'en'
              ? ['weekly meal plans,', 'shopping lists', 'cooking instructions']
              : [
                  'planuri alimentare',
                  'liste de cumpărături',
                  'instrucțiuni de gătire',
                ]
          }
        />
        <PaywallBenefit
          className="mt-4"
          text={
            appLanguage === 'en'
              ? "You don't worry about calories, we calculate each portion for you."
              : 'Nu te preocupi de calorii, calculăm fiecare porție pentru tine.'
          }
          boldWords={
            appLanguage === 'en' ? ["don't worry"] : ['Nu te preocupi']
          }
        />
        <AnimatedTitle
          title={
            appLanguage === 'en'
              ? 'Join hundreds of users who maintain a healthy lifestyle'
              : 'Alătură-te sutelor de utilizatori ce mențin o viață sănătoasă'
          }
          delay={1500}
          centered
          className="mt-8"
        />
      </View>
    </PageWrapper>
  );
}

import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';

export default function MacronutrientsScreen() {
  const onSubmit = () => {
    console.log('Submitted');
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <Button onPress={onSubmit}>
            <Text>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        Macronutrients ratio
      </Text>
    </PageWrapper>
  );
}

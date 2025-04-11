import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';

export default function GenerationLoadingScreen() {
  const onSubmit = () => {};

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <Button variant="default" onPress={onSubmit}>
            <Text>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text>Generation Loading</Text>
    </PageWrapper>
  );
}

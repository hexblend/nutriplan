import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { Link } from 'expo-router';

export default function NameScreen() {
  return (
    <PageWrapper
      footer={
        <PageFooter className="bg-transparent">
          <Link href="/auth/goal" asChild>
            <Button variant="default">
              <Text className="uppercase">{t.t('common.continue')}</Text>
            </Button>
          </Link>
        </PageFooter>
      }
    >
      <Text>NameScreen</Text>
    </PageWrapper>
  );
}

import { ValueSwitchRow } from '@/components/blocks/ValueSwitchRow';
import PageWrapper from '@/components/layout/PageWrapper';
import { setAppLanguage, t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { View } from 'react-native';

export default function EditLanguageScreen() {
  const { currentProfile, setCurrentProfile } = useSession();
  if (!currentProfile) return null;

  const handleLanguageChange = async (value: string) => {
    const newLanguage = value === 'RO' ? 'ro' : 'en';
    // Optimistically update UI
    setCurrentProfile({
      ...currentProfile,
      updated_app_language: newLanguage,
    });
    // Update database in the background
    const { error } = await supabase
      .from('profiles')
      .update({ updated_app_language: newLanguage })
      .eq('id', currentProfile.id);

    if (error) {
      // Revert optimistic update
      setCurrentProfile({
        ...currentProfile,
        updated_app_language: currentProfile.updated_app_language,
      });
      return throwError('[profile] Error updating language', error);
    }

    // Update the app language
    setAppLanguage(newLanguage);
  };

  return (
    <PageWrapper className="pt-6">
      <View className="flex-col gap-4">
        <ValueSwitchRow
          label={t.t('common.language')}
          value={t.locale === 'ro' ? 'ro' : 'en'}
          onValueChange={handleLanguageChange}
          options={[
            { value: 'en', label: 'ENGLISH' },
            { value: 'ro', label: 'ROMANA' },
          ]}
          hideBorder
        />
      </View>
    </PageWrapper>
  );
}

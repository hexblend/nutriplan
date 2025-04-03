import { ValueSwitchRow } from '@/components/blocks/ValueSwitchRow';
import PageWrapper from '@/components/layout/PageWrapper';
import { setAppLanguage, t } from '@/i18n/translations';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function EditLanguageScreen() {
  const { currentProfile, setCurrentProfile } = useSession();
  if (!currentProfile) return null;

  const handleLanguageChange = async (newLanguage: string) => {
    // Optimistic update
    setAppLanguage(newLanguage);
    setCurrentProfile({
      ...currentProfile,
      updated_app_language: newLanguage,
    });
    // Update db in the background
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
      setAppLanguage(currentProfile.updated_app_language || 'en');
      return throwError('[profile] Error updating language', error);
    }
    // Refresh the app to apply language changes
    router.replace('/(tabs)/profile');
  };

  return (
    <PageWrapper className="pt-6">
      <View className="flex-col gap-4">
        <ValueSwitchRow
          label={t.t('common.language')}
          value={t.locale === 'ro' ? 'ro' : 'en'}
          onValueChange={handleLanguageChange}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'ro', label: 'RO' },
          ]}
          hideBorder
        />
      </View>
    </PageWrapper>
  );
}

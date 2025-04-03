import ValueField from '@/components/blocks/ValueField';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { useSession } from '@/providers/SessionProvider';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

interface ProfileSettingsProps {
  className?: string;
}

export default function ProfileSettings({ className }: ProfileSettingsProps) {
  const { currentProfile } = useSession();
  const { height_unit, weight_unit } = currentProfile ?? {};
  const appLanguage = t.locale;

  return (
    <View className={className}>
      <View className="mb-5 flex-row items-center justify-center gap-1">
        <Ionicons name="cog" size={24} color="#777" />
        <Text className="text-gray-400">{t.t('common.settings')}</Text>
      </View>

      <View className="flex-col gap-4">
        <ValueField
          editHref="/profile/edit-units"
          labelLeft={t.t('common.units')}
          valueRight={`${height_unit === 'metric' ? 'CM' : 'FT'}/${weight_unit === 'metric' ? 'KG' : 'LBS'}`}
          hideEditIcon
        />
        <ValueField
          editHref="/profile/edit-language"
          labelLeft={t.t('common.language')}
          valueRight={appLanguage === 'en' ? 'ENGLISH' : 'ROMANA'}
          hideEditIcon
        />
      </View>
    </View>
  );
}

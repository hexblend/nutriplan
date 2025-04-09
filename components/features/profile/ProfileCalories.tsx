import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { cn } from '@/lib/utils';
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';

interface ProfileCaloriesProps {
  calories: number;
  className?: string;
}
export default function ProfileCalories({
  calories,
  className,
}: ProfileCaloriesProps) {
  return (
    <View
      className={cn(
        'mb-2 flex-row items-center justify-center gap-2',
        className
      )}
    >
      <Octicons name="flame" size={18} color="#ea580c" />
      <Text className="text-center text-3xl font-bold">
        {`${calories} Kcal`} / {t.t('common.day')}
      </Text>
    </View>
  );
}

import LinkField from '@/components/blocks/LinkField';
import { translateValue } from '@/components/features/onboarding/recap/TranslationMap';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { calculateDailyCalories, cn } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

interface ProfileActivityLevelProps {
  className?: string;
}

export default function ProfileActivityLevel({
  className,
}: ProfileActivityLevelProps) {
  const [opacity] = useState(new Animated.Value(0));
  const { currentClient } = useSession();
  const [targetCalories, setTargetCalories] = useState<number | null>(null);

  useEffect(() => {
    if (!currentClient) return;
    setTargetCalories(calculateDailyCalories(currentClient));
  }, [currentClient]);

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      return () => {
        opacity.setValue(0);
      };
    }, [])
  );

  return (
    <Animated.View style={{ opacity }}>
      <View className={cn(className)}>
        {/*  Calories */}
        <View className="mb-2 flex-row items-center justify-center gap-2">
          <Octicons name="flame" size={18} color="#ea580c" />
          <Text className="text-center text-3xl font-bold">
            {targetCalories ? `${targetCalories} Kcal` : '--- Kcal'}
          </Text>
        </View>

        {/*  Daily intake for Goal */}
        <Text className="mt-1 w-2/3 self-center text-center text-xl">
          {t.t('profile.dailyIntake')}{' '}
          <Text className="lowercase">
            {translateValue('goal', currentClient?.goal ?? '')}
          </Text>
        </Text>

        {/*  Set Activity Level */}
        <LinkField
          href="/profile/edit-activity"
          labelLeft={t.t('profile.activity')}
          valueRight={translateValue(
            'activity',
            currentClient?.activity_level ?? ''
          )}
          hideEditIcon
          className="mt-4"
        />
      </View>
    </Animated.View>
  );
}

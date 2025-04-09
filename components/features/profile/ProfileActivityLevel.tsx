import LinkField from '@/components/blocks/LinkField';
import { translateValue } from '@/components/features/onboarding/recap/TranslationMap';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { calculateDailyCalories, cn } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import ProfileCalories from './ProfileCalories';

interface ProfileActivityLevelProps {
  className?: string;
  hideChangeActivity?: boolean;
  customCalories?: number | null;
}

export default function ProfileActivityLevel({
  className,
  hideChangeActivity = false,
  customCalories,
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
        <ProfileCalories calories={customCalories ?? targetCalories ?? 0} />

        {/*  Daily intake for Goal */}
        <Text className="mt-1 w-2/3 self-center text-center text-xl">
          {t.t('profile.dailyIntake')}{' '}
          <Text className="lowercase">
            {translateValue('goal', currentClient?.goal ?? '')}{' '}
          </Text>
        </Text>

        {/*  Set Activity Level */}
        {!hideChangeActivity && (
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
        )}
      </View>
    </Animated.View>
  );
}

import LinkField from '@/components/blocks/LinkField';
import Frame from '@/components/ui/frame';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { calculateWeeksToGoal, cn, displayWeight } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Animated, View } from 'react-native';

interface ProfileGoalProps {
  className?: string;
}

export default function ProfileGoal({ className }: ProfileGoalProps) {
  const [opacity] = useState(new Animated.Value(0));
  const { currentClient, currentProfile } = useSession();

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

  const weeksToGoal = calculateWeeksToGoal(currentClient);

  return (
    <Animated.View style={{ opacity }}>
      <Frame className={cn('mb-10', className)}>
        <Text className="text-center text-2xl font-bold">
          {t.t('profile.goal')}:{' '}
          <Text className="text-2xl font-bold text-green-500">
            {displayWeight(
              currentClient?.target_weight_kg ?? null,
              currentProfile?.weight_unit || 'metric'
            )}
          </Text>
        </Text>
        <View>
          {typeof weeksToGoal === 'number' ? (
            <Text className="mt-2 text-center font-bold">
              {t.t('profile.achievableIn')}:{' '}
              <Text className="font-bold text-green-500">
                {weeksToGoal} weeks
              </Text>
            </Text>
          ) : null}
        </View>
      </Frame>
      <LinkField
        href="/profile/edit-target-weight"
        icon={<FontAwesome name="edit" size={16} color="white" />}
        value={t.t('profile.changeGoal')}
        centered
        className="mt-4"
        variant="secondary"
      />
    </Animated.View>
  );
}

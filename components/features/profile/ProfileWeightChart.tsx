import LinkField from '@/components/blocks/LinkField';
import Loading from '@/components/ui/loading';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { cn, displayWeight, kgToLbs } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { useGetClientUpdates } from '@/supabase/hooks/useClientUpdates';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Animated, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface ProfileWeightChartProps {
  className?: string;
}

export default function ProfileWeightChart({
  className,
}: ProfileWeightChartProps) {
  const { clientUpdates, loading } = useGetClientUpdates();
  const { currentProfile, currentClient } = useSession();

  const [key, setKey] = useState(0);
  const [opacity] = useState(new Animated.Value(0));

  useFocusEffect(
    useCallback(() => {
      setKey((prev) => prev + 1); // Force re-render
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

  const weightUpdates = useMemo(() => {
    if (!clientUpdates) return [];
    return clientUpdates.filter((update) => update.field === 'weight_kg');
  }, [clientUpdates]);

  const lineData = useMemo(() => {
    if (!currentProfile?.weight_unit) return [];
    // If there are weight updates, use those
    if (weightUpdates?.length > 0) {
      return weightUpdates.map((update) => {
        const weightInKg = parseFloat(update.value);
        const displayValue =
          currentProfile.weight_unit === 'imperial'
            ? kgToLbs(weightInKg)
            : weightInKg;

        return {
          value: displayValue,
          label: format(new Date(update.date), 'd MMM'),
          dataPointText: displayWeight(
            weightInKg,
            currentProfile.weight_unit as 'metric' | 'imperial'
          ),
        };
      });
    }
    // If no updates but we have a current weight, show it as a single point
    if (currentClient?.weight_kg) {
      const weightInKg = currentClient.weight_kg;
      const displayValue =
        currentProfile.weight_unit === 'imperial'
          ? kgToLbs(weightInKg)
          : weightInKg;
      const date = format(new Date(currentClient.created_at), 'd MMM');
      const dataPointText = displayWeight(
        weightInKg,
        currentProfile.weight_unit as 'metric' | 'imperial'
      );
      // Return two identical points to create a visible line, but only show label and value on second point
      return [
        { value: displayValue, hideDataPoints: true },
        { value: displayValue, label: date, dataPointText },
      ];
    }
    return [];
  }, [weightUpdates, currentProfile, currentClient]);

  const isLatestWeightFromToday = useMemo(() => {
    if (!weightUpdates?.length) return false;
    const latestUpdate = weightUpdates[weightUpdates.length - 1];
    const today = new Date();
    const updateDate = new Date(latestUpdate.date);
    return (
      today.getFullYear() === updateDate.getFullYear() &&
      today.getMonth() === updateDate.getMonth() &&
      today.getDate() === updateDate.getDate()
    );
  }, [weightUpdates]);

  if (loading) return <Loading />;
  return (
    <View className={cn(className)}>
      <View className="flex-row items-center justify-center gap-3">
        <FontAwesome6
          name="weight-scale"
          size={20}
          color="#ea580c" // orange-600
        />
        <Text className="text-center font-bold">
          {t.t('profile.weightProgress')}
        </Text>
      </View>
      <View className="-ml-2 mt-2 w-full">
        <LineChart
          key={key}
          data={lineData}
          maxValue={Math.max(...lineData.map((d) => d.value)) * 1.2}
          initialSpacing={24}
          textColor1={colors.primary[350]}
          textShiftY={-8}
          textShiftX={-10}
          textFontSize={13}
          thickness={2}
          spacing={
            weightUpdates?.length === 0
              ? 180
              : lineData.length <= 3
                ? 120
                : lineData.length <= 6
                  ? 100
                  : 90
          }
          verticalLinesColor={colors.primary[800]}
          hideRules
          xAxisColor={colors.primary[700]}
          yAxisColor={colors.primary[900]}
          hideYAxisText
          xAxisLabelTextStyle={{ color: 'lightgray' }}
          color={colors.primary[350]}
          dataPointsColor="skyblue"
          showVerticalLines
          isAnimated
          animationDuration={500}
          areaChart
          endFillColor={'rgb(84,219,234)'}
          startFillColor={colors.primary[350]}
          startOpacity={0.4}
          endOpacity={0.1}
        />
      </View>
      <Animated.View style={{ opacity }}>
        <LinkField
          href="/profile/add-weight"
          icon={<FontAwesome name="plus" size={16} color="white" />}
          value={t.t('profile.addTodayWeight')}
          centered
          className="mt-4"
          disabled={isLatestWeightFromToday}
        />
      </Animated.View>
    </View>
  );
}

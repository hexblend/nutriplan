import LinkField from '@/components/blocks/LinkField';
import Loading from '@/components/ui/loading';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { cn, displayWeight, kgToLbs } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { useGetClientUpdates } from '@/supabase/hooks/useClientUpdates';
import { FontAwesome } from '@expo/vector-icons';
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
  const { currentProfile } = useSession();

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

  const lineData = useMemo(() => {
    if (!clientUpdates || !currentProfile?.weight_unit) return [];
    return clientUpdates.map((update) => {
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
  }, [clientUpdates, currentProfile]);

  if (loading) return <Loading />;
  return (
    <View className={cn(className)}>
      <Text className="text-center font-bold">
        {t.t('profile.weightProgress')}
      </Text>
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
          spacing={60}
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
          value={t.t('profile.addCurrentWeight')}
          centered
          className="mt-4"
        />
      </Animated.View>
    </View>
  );
}

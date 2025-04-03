import ValueField from '@/components/blocks/ValueField';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Animated, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface ProfileWeightChartProps {
  className?: string;
}

export default function ProfileWeightChart({
  className,
}: ProfileWeightChartProps) {
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

  const lineData = [
    { value: 73, label: '22 Aug', dataPointText: '73 kg' },
    { value: 72.5, label: '3 Sep', dataPointText: '72.5 kg' },
    { value: 71, label: '6 Oct', dataPointText: '71 kg' },
    { value: 70, label: '8 Nov', dataPointText: '70 kg' },
    { value: 69, label: '10 Dec', dataPointText: '69 kg' },
    { value: 68, label: '23 Ian', dataPointText: '68 kg' },
  ];

  return (
    <View className={cn(className)}>
      <Text className="text-center font-bold">Weight Progress</Text>
      <View className="-ml-2 mt-2 w-full">
        <LineChart
          key={key}
          data={lineData}
          maxValue={73 * 1.2}
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
        <ValueField
          editHref="/profile"
          icon={<FontAwesome name="plus" size={16} color="white" />}
          value="Add current weight"
          centered
          className="mt-4"
        />
      </Animated.View>
    </View>
  );
}

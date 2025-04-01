import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function ProfileWeightChart() {
  const lineData = [
    { value: 73, label: '22 Aug', dataPointText: '73 kg' },
    { value: 72.5, label: '3 Sep', dataPointText: '72.5 kg' },
    { value: 71, label: '6 Oct', dataPointText: '71 kg' },
    { value: 70, label: '8 Nov', dataPointText: '70 kg' },
    { value: 69, label: '10 Dec', dataPointText: '69 kg' },
    { value: 68, label: '23 Ian', dataPointText: '68 kg' },
  ];

  return (
    <View>
      <Text className="mt-6 text-center font-bold">Weight Pogress</Text>
      <View className="-ml-2 mt-8 w-full">
        <LineChart
          data={lineData}
          maxValue={73 * 1.8}
          initialSpacing={16}
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
          areaChart
          endFillColor={'rgb(84,219,234)'}
          startFillColor={colors.primary[350]}
          startOpacity={0.4}
          endOpacity={0.1}
        />
      </View>
    </View>
  );
}

import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface BmiRangeProps {
  bmi: number;
  className?: string;
}

const BMI_RANGES = [
  { min: 0, max: 16, color: 'bg-sky-400', label: 'Severe Underweight' },
  { min: 16, max: 18.5, color: 'bg-green-400', label: 'Underweight' },
  { min: 18.5, max: 25, color: 'bg-yellow-300', label: 'Normal' },
  { min: 25, max: 30, color: 'bg-orange-400', label: 'Overweight' },
  { min: 30, max: 35, color: 'bg-pink-400', label: 'Obese' },
  { min: 35, max: 40, color: 'bg-blue-500', label: 'Severely Obese' },
];

const SCALE_MIN = 15;
const SCALE_MAX = 40;

export function BmiRange({ bmi, className }: BmiRangeProps) {
  const clampedBmi = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX);

  const percentage = ((clampedBmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

  const currentRange = BMI_RANGES.find(
    (range) => clampedBmi >= range.min && clampedBmi < range.max
  );

  const caretStyle = useAnimatedStyle(() => {
    return {
      left: withSpring(`${percentage}%`),
    };
  });

  return (
    <View className={`w-full space-y-4 ${className || ''}`}>
      <View className="items-center space-y-1">
        <Text className="text-4xl font-bold">{bmi.toFixed(1)}</Text>
        <Text className="text-xl font-semibold">Current BMI</Text>
      </View>

      <View className="relative h-4 overflow-hidden rounded-full">
        <View className="flex-1 flex-row">
          {BMI_RANGES.map((range, index) => (
            <View key={index} className={`h-full flex-1 ${range.color}`} />
          ))}
        </View>
        <Animated.View
          className="absolute top-0 h-full w-1 bg-black"
          style={caretStyle}
        />
      </View>

      <View className="flex-row justify-between">
        <Text className="text-lg text-gray-500">15</Text>
        <Text className="text-lg text-gray-500">16</Text>
        <Text className="text-lg text-gray-500">18.5</Text>
        <Text className="text-lg text-gray-500">25</Text>
        <Text className="text-lg text-gray-500">30</Text>
        <Text className="text-lg text-gray-500">35</Text>
        <Text className="text-lg text-gray-500">40</Text>
      </View>

      {currentRange && (
        <Text className="mt-4 text-center text-xl text-gray-600">
          {currentRange.label === 'Normal'
            ? "You're in a healthy range!"
            : 'You only need a bit more sweat exercises to see a fitter you!'}
        </Text>
      )}
    </View>
  );
}

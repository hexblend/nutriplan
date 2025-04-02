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

const SCALE_MIN = 15;
const SCALE_MAX = 40;
const TOTAL_RANGE = SCALE_MAX - SCALE_MIN;

const BMI_RANGES = [
  { min: SCALE_MIN, max: 16, color: 'bg-sky-400', label: 'Severe Underweight' },
  { min: 16, max: 18.5, color: 'bg-green-400', label: 'Underweight' },
  { min: 18.5, max: 25, color: 'bg-yellow-300', label: 'Normal' },
  { min: 25, max: 30, color: 'bg-orange-400', label: 'Overweight' },
  { min: 30, max: 35, color: 'bg-pink-400', label: 'Obese' },
  { min: 35, max: SCALE_MAX, color: 'bg-blue-500', label: 'Severely Obese' },
];

const getBoundaryPosition = (value: number) => {
  return ((value - SCALE_MIN) / TOTAL_RANGE) * 100;
};

export function BmiRange({ bmi, className }: BmiRangeProps) {
  const clampedBmi = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX);
  const percentage = ((clampedBmi - SCALE_MIN) / TOTAL_RANGE) * 100;

  const currentRange = BMI_RANGES.find(
    (range) => clampedBmi >= range.min && clampedBmi < range.max
  );

  const caretStyle = useAnimatedStyle(() => {
    return {
      left: withSpring(`${percentage}%`),
    };
  });

  // Get all unique boundary values
  const boundaries = [
    ...new Set([SCALE_MIN, ...BMI_RANGES.map((range) => range.max)]),
  ].sort((a, b) => a - b);

  return (
    <View className={`w-full space-y-4 ${className || ''}`}>
      <View className="items-center space-y-1">
        <Text className="text-4xl font-bold">{bmi.toFixed(1)}</Text>
        <Text className="text-xl font-semibold">Current BMI</Text>
      </View>

      <View className="px-2">
        <View className="relative h-4 overflow-hidden rounded-full">
          <View className="flex-1 flex-row">
            {BMI_RANGES.map((range, index) => {
              const rangeWidth = ((range.max - range.min) / TOTAL_RANGE) * 100;
              return (
                <View
                  key={index}
                  className={`h-full ${range.color}`}
                  style={{ width: `${rangeWidth}%` }}
                />
              );
            })}
          </View>
          <Animated.View
            className="absolute top-0 h-full w-1 bg-black"
            style={caretStyle}
          />
        </View>

        <View className="relative mt-1 h-8">
          {boundaries.map((value, index) => {
            const position = getBoundaryPosition(value);
            let textAlign: 'left' | 'center' | 'right' = 'center';
            let xOffset = -50; // Default center alignment (-50%)

            // Handle edge cases and cramped numbers
            if (value === SCALE_MIN) {
              textAlign = 'left';
              xOffset = 0;
            } else if (value === SCALE_MAX) {
              textAlign = 'right';
              xOffset = -100;
            } else if (value === 16) {
              // Slightly offset 16 to prevent overlap with 15
              xOffset = -25;
            }

            return (
              <Text
                key={index}
                className="absolute text-sm text-gray-500"
                style={{
                  left: `${position}%`,
                  transform: [{ translateX: `${xOffset}%` }],
                  textAlign,
                }}
              >
                {value}
              </Text>
            );
          })}
        </View>
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

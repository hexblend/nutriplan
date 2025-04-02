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
  {
    min: SCALE_MIN,
    max: 16,
    color: 'bg-blue-800',
    label: 'Severely Underweight',
    recommendation:
      'Consider consulting with a healthcare provider for personalized guidance. Focus on nutrient-dense foods and gentle strength exercises.',
  },
  {
    min: 16,
    max: 18.5,
    color: 'bg-blue-600',
    label: 'Underweight',
    recommendation:
      'Try eating more nutrient-rich foods like nuts, avocados, and whole grains. Small, frequent meals can help increase your energy and strength.',
  },
  {
    min: 18.5,
    max: 25,
    color: 'bg-green-600',
    label: 'Normal',
    recommendation:
      "You're in a healthy range! Continue enjoying varied foods and activities you love.",
  },
  {
    min: 25,
    max: 30,
    color: 'bg-yellow-500',
    label: 'Overweight',
    recommendation:
      'Add colorful vegetables to meals and find movement that brings you joy. Small daily changes can make a meaningful difference.',
  },
  {
    min: 30,
    max: 35,
    color: 'bg-orange-500',
    label: 'Obese',
    recommendation:
      'Focus on progress, not perfection. Start with whole foods and movement that feels good. Set small, achievable weekly goals.',
  },
  {
    min: 35,
    max: SCALE_MAX,
    color: 'bg-secondary-200',
    label: 'Severely Obese',
    recommendation:
      'Consider partnering with healthcare providers for personalized guidance. Celebrate small daily victories in nutrition and gentle movement.',
  },
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
      left: withSpring(`${percentage}%`, {
        damping: 22,
        stiffness: 300,
      }),
    };
  });

  return (
    <View className={`w-full space-y-4 ${className || ''}`}>
      <View className="items-center space-y-1">
        <Text className="text-3xl font-bold">{bmi.toFixed(1)}</Text>
        <Text className="text-xl font-semibold">Current BMI</Text>
      </View>

      <View className="mt-3 px-4">
        <View className="relative">
          <View className="h-4 overflow-hidden rounded-full bg-gray-100">
            {BMI_RANGES.map((range, index) => {
              const rangeWidth = ((range.max - range.min) / TOTAL_RANGE) * 100;
              const position = getBoundaryPosition(range.min);
              return (
                <View
                  key={index}
                  className={`absolute h-full ${range.color}`}
                  style={{
                    left: `${position}%`,
                    width: `${rangeWidth}%`,
                  }}
                />
              );
            })}
          </View>
          <Animated.View
            className="absolute top-0 -mt-1 h-6 w-1 rounded-lg bg-white"
            style={caretStyle}
          />
        </View>

        <View className="relative h-6">
          {/* Starting value */}
          <Text className="absolute text-sm text-gray-500" style={{ left: 0 }}>
            {SCALE_MIN}
          </Text>
          {/* Middle values */}
          {BMI_RANGES.map((range, index) => {
            const position = getBoundaryPosition(range.min);
            if (range.min !== SCALE_MIN) {
              return (
                <Text
                  key={index}
                  className="absolute ml-1 text-sm text-gray-500"
                  style={{
                    left: `${position}%`,
                    transform: [{ translateX: '-50%' }],
                  }}
                >
                  {range.min}
                </Text>
              );
            }
          })}
          {/* Final value */}
          <Text className="absolute text-sm text-gray-500" style={{ right: 0 }}>
            {SCALE_MAX}
          </Text>
        </View>
      </View>

      {currentRange && (
        <View className="mt-2 space-y-1">
          <Text className="text-center text-base text-gray-500">
            {currentRange.recommendation}
          </Text>
        </View>
      )}
    </View>
  );
}

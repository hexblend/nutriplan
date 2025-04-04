import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { FontAwesome } from '@expo/vector-icons';
import { useMemo } from 'react';
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

const getBoundaryPosition = (value: number) => {
  return ((value - SCALE_MIN) / TOTAL_RANGE) * 100;
};

export function BmiRange({ bmi, className }: BmiRangeProps) {
  const clampedBmi = Math.min(Math.max(bmi, SCALE_MIN), SCALE_MAX);
  const percentage = ((clampedBmi - SCALE_MIN) / TOTAL_RANGE) * 100;

  const BMI_RANGES = useMemo(
    () => [
      {
        min: SCALE_MIN,
        max: 16,
        color: 'bg-blue-800',
        label: t.t('profile.severelyUnderweight'),
        recommendation: t.t('profile.bmiRecommendationSeverelyUnderweight'),
      },
      {
        min: 16,
        max: 18.5,
        color: 'bg-blue-600',
        label: t.t('profile.underweight'),
        recommendation: t.t('profile.bmiRecommendationUnderweight'),
      },
      {
        min: 18.5,
        max: 25,
        color: 'bg-green-600',
        label: t.t('profile.normal'),
        recommendation: t.t('profile.bmiRecommendationNormal'),
      },
      {
        min: 25,
        max: 30,
        color: 'bg-yellow-500',
        label: t.t('profile.overweight'),
        recommendation: t.t('profile.bmiRecommendationOverweight'),
      },
      {
        min: 30,
        max: 35,
        color: 'bg-orange-500',
        label: t.t('profile.obese'),
        recommendation: t.t('profile.bmiRecommendationObese'),
      },
      {
        min: 35,
        max: SCALE_MAX,
        color: 'bg-secondary-200',
        label: t.t('profile.severelyObese'),
        recommendation: t.t('profile.bmiRecommendationSeverelyObese'),
      },
    ],
    [t.locale] // Re-create when language changes
  );

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
        <View className="flex-row items-center gap-2">
          <FontAwesome
            name="balance-scale"
            size={20}
            color={colors.primary[350]}
          />
          <Text className="text-3xl font-bold">
            {t.t('profile.bmi')} {bmi.toFixed(1)}
          </Text>
        </View>

        <View className="mb-1 mt-0.5 flex-row items-center gap-2">
          {currentRange && (
            <Text className="text-xl font-semibold text-gray-500">
              {currentRange.label}
            </Text>
          )}
        </View>
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
            className="absolute top-0 h-4 w-1 rounded-lg bg-white"
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

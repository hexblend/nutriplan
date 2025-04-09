import { cn } from '@/lib/utils';
import RNCSlider from '@react-native-community/slider';
import * as React from 'react';
import { View } from 'react-native';
import { Text } from './text';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  // eslint-disable-next-line
  onChange: (value: number) => void;
  className?: string;
  color?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  className,
  color = '#3B82F6',
}: SliderProps) {
  return (
    <View className={cn('space-y-2', className)}>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold">{label}</Text>
        <Text className="text-lg">{Math.round(value)}%</Text>
      </View>
      <RNCSlider
        style={{ width: '100%', height: 40 }}
        minimumValue={min}
        maximumValue={max}
        value={value}
        step={step}
        onValueChange={onChange}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#374151"
        thumbTintColor={color}
      />
    </View>
  );
}

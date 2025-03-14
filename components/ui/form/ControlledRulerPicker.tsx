import { cn } from '@/lib/utils';
import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import { View } from 'react-native';
import { RulerPicker, RulerPickerProps } from 'react-native-ruler-picker';
import { Error } from '../error';

interface ControlledRulerPickerProps<T extends FieldValues>
  extends Omit<RulerPickerProps, 'onValueChange' | 'onValueChangeEnd'> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
}

export function ControlledRulerPicker<T extends FieldValues>({
  control,
  name,
  error,
  className,
  initialValue = 80,
  ...rulerPickerProps
}: ControlledRulerPickerProps<T>) {
  return (
    <View className={cn('w-full space-y-2', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const currentValue = typeof value === 'number' ? value : initialValue;
          return (
            <RulerPicker
              valueTextStyle={{ color: 'white' }}
              unitTextStyle={{ color: 'white' }}
              indicatorColor="white"
              height={200}
              {...rulerPickerProps}
              initialValue={currentValue}
              onValueChange={onChange}
              onValueChangeEnd={onChange}
            />
          );
        }}
      />
      {error && <Error>{error.message ?? ''}</Error>}
    </View>
  );
}

export default ControlledRulerPicker;

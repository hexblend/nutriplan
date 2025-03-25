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
import { OtpInput } from 'react-native-otp-entry';
import { Error } from '../error';

interface ControlledOTPProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  numberOfDigits?: number;
  /* eslint-disable-next-line */
  onFilled?: (code: string) => void;
}

export function ControlledOTP<T extends FieldValues>({
  control,
  name,
  error,
  className,
  numberOfDigits = 6,
  onFilled,
}: ControlledOTPProps<T>) {
  return (
    <View className={cn('w-full space-y-2', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <OtpInput
            numberOfDigits={numberOfDigits}
            onTextChange={onChange}
            onFilled={onFilled}
            autoFocus
            blurOnFilled
            type="numeric"
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              pinCodeContainerStyle: { height: 48, borderRadius: 8 },
              pinCodeTextStyle: { color: 'white' },
            }}
          />
        )}
      />
      {error && <Error>{error.message ?? ''}</Error>}
    </View>
  );
}

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
import { Error } from '../error';
import { Input } from '../input';
import { Label } from '../label';

interface ControlledInputProps<T extends FieldValues>
  extends Omit<
    React.ComponentPropsWithRef<typeof Input>,
    'value' | 'onChangeText'
  > {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: FieldError;
  className?: string;
  containerClassName?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  infoText?: string;
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  className,
  containerClassName,
  rightIcon,
  onRightIconPress,
  infoText,
  ...props
}: ControlledInputProps<T>) {
  return (
    <View className={cn('w-full space-y-2', containerClassName)}>
      {label && (
        <Label className={cn('mb-2 !text-lg font-bold')}>{label}</Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            className={cn(error ? 'border-destructive' : '', className)}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            rightIcon={rightIcon}
            onRightIconPress={onRightIconPress}
            infoText={infoText}
            {...props}
          />
        )}
      />
      {error && <Error>{error.message ?? ''}</Error>}
    </View>
  );
}

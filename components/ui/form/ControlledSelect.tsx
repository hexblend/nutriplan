import { cn } from '@/lib/utils';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { Label } from '../label';
import { Select } from '../select';

interface ControlledSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: FieldError;
  className?: string;
  options: Array<{
    label: string;
    value: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  }>;
  multiple?: boolean;
}

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  label,
  error,
  className,
  options,
  multiple = false,
}: ControlledSelectProps<T>) {
  return (
    <View className="w-full space-y-2">
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            className={cn(error ? 'border-destructive' : '', className)}
            options={options}
            value={value}
            onChange={onChange}
            multiple={multiple}
          />
        )}
      />
      {error && <Error>{error.message ?? ''}</Error>}
    </View>
  );
}

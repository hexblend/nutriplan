import { cn } from '@/lib/utils';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import SelectOption from './select-option';

type SelectProps = {
  options: Array<{
    label: string;
    value: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  }>;
  value: string | string[];
  // eslint-disable-next-line
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  className?: string;
};

const Select = ({
  options,
  value,
  onChange,
  multiple = false,
  className,
}: SelectProps) => {
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const values = Array.isArray(value) ? value : [value].filter(Boolean);
      if (values.includes(optionValue)) {
        onChange(values.filter((v) => v !== optionValue));
      } else {
        onChange([...values, optionValue]);
      }
    } else {
      onChange(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <View className={cn('w-full', className)}>
      {options.map((option) => (
        <SelectOption
          key={option.value}
          label={option.label}
          value={option.value}
          selected={isSelected(option.value)}
          onSelect={handleSelect}
          icon={option.icon}
        />
      ))}
    </View>
  );
};

Select.displayName = 'Select';

export { Select, SelectOption };
export type { SelectProps };

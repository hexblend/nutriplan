import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { Link, LinkProps } from 'expo-router';
import React, { JSX } from 'react';
import { View } from 'react-native';
import { Button, ButtonProps } from '../ui/button';
import { Label } from '../ui/label';
import { Text } from '../ui/text';

interface LinkFieldProps {
  href: LinkProps['href'];
  value?: string;
  valueRight?: string;
  className?: string;
  label?: string;
  labelLeft?: string;
  labelClassName?: string;
  icon?: JSX.Element;
  hideEditIcon?: boolean;
  buttonVariant?: ButtonProps['variant'];
  centered?: boolean;
  valueClassName?: string;
  disabled?: boolean;
}

export default function LinkField({
  href,
  value,
  valueRight,
  className,
  label,
  labelLeft,
  labelClassName,
  icon,
  hideEditIcon,
  buttonVariant = 'tertiary',
  centered = false,
  valueClassName,
  disabled = false,
}: LinkFieldProps) {
  return (
    <View className={className}>
      {label && (
        <Label className={cn('mb-3 !text-lg font-bold', labelClassName)}>
          {label}
        </Label>
      )}
      <Link href={href} asChild>
        <Button
          variant={buttonVariant}
          disabled={disabled}
          className={cn(
            'flex-row items-center',
            centered ? 'justify-center gap-2' : 'justify-between px-4',
            disabled && 'opacity-25'
          )}
        >
          {centered ? (
            <View className="flex-row items-center gap-2">
              {icon}
              <Text className={cn(valueClassName)}>{labelLeft ?? value}</Text>
            </View>
          ) : (
            <>
              <View className="flex-row items-center gap-2">
                {icon}
                <Text className={cn(valueClassName)}>{labelLeft ?? value}</Text>
              </View>
              <View className="flex-row items-center gap-4">
                {valueRight && (
                  <Text className={cn(valueClassName)}>{valueRight}</Text>
                )}
                {!hideEditIcon && (
                  <FontAwesome name="edit" size={18} color="white" />
                )}
              </View>
            </>
          )}
        </Button>
      </Link>
    </View>
  );
}

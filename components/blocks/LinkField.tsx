import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { Link, LinkProps } from 'expo-router';
import React, { JSX } from 'react';
import { View } from 'react-native';
import { Button, ButtonProps } from '../ui/button';
import { Label } from '../ui/label';
import { Text } from '../ui/text';

interface LinkFieldProps {
  editHref: LinkProps['href'];
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
}

export default function LinkField({
  editHref,
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
}: LinkFieldProps) {
  return (
    <View className={className}>
      {label && (
        <Label className={cn('mb-3 !text-lg font-bold', labelClassName)}>
          {label}
        </Label>
      )}
      <Link href={editHref} asChild>
        <Button
          variant={buttonVariant}
          className={cn(
            'flex-row items-center',
            centered ? 'justify-center gap-2' : 'justify-between px-4'
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

import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { Link, LinkProps } from 'expo-router';
import { JSX } from 'react';
import { View } from 'react-native';
import { Button, ButtonProps } from '../ui/button';
import { Label } from '../ui/label';
import { Text } from '../ui/text';

interface ValueFieldProps {
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
}

export default function ValueField({
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
}: ValueFieldProps) {
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
          className="flex-row items-center justify-between px-4"
        >
          <View className="flex-row items-center gap-2">
            {icon}
            <Text className="uppercase">{labelLeft ?? value}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            {valueRight && <Text className="uppercase">{valueRight}</Text>}
            {!hideEditIcon && (
              <FontAwesome name="edit" size={18} color="white" />
            )}
          </View>
        </Button>
      </Link>
    </View>
  );
}

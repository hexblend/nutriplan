import { cn } from '@/lib/utils';
import { FontAwesome } from '@expo/vector-icons';
import { Link, LinkProps } from 'expo-router';
import { JSX } from 'react';
import { View } from 'react-native';
import { Button } from './button';
import { Label } from './label';
import { Text } from './text';

interface ValueFieldProps {
  editHref: LinkProps['href'];
  value: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  icon?: JSX.Element;
}

export default function ValueField({
  editHref,
  value,
  className,
  label,
  labelClassName,
  icon,
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
          variant="tertiary"
          className="flex-row items-center justify-between px-4"
        >
          <View className="flex-row items-center gap-2">
            {icon}
            <Text className="text-left uppercase">{value}</Text>
          </View>
          <FontAwesome name="edit" size={18} color="white" />
        </Button>
      </Link>
    </View>
  );
}

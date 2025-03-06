import { cn } from '@/lib/utils';
import { Feather } from '@expo/vector-icons';
import type React from 'react';

interface IconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className,
}) => {
  return (
    <Feather
      name={name}
      size={size}
      color={color}
      className={cn('', className)}
    />
  );
};

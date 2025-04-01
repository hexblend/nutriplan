import FrameSvg from '@/assets/images/svg/frame.svg';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { useWindowDimensions, View } from 'react-native';

interface FrameProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function Frame({ children, className }: FrameProps) {
  const { width } = useWindowDimensions();
  return (
    <View className={cn('relative', className)}>
      <FrameSvg
        width={width - 14}
        style={{ marginLeft: -6, position: 'absolute' }}
      />
      <View className="mt-11">{children}</View>
    </View>
  );
}

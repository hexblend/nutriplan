import FrameSvg from '@/assets/images/svg/frame.svg';
import { JSX } from 'react';
import { View } from 'react-native';

interface FrameProps {
  children: JSX.Element | JSX.Element[];
  screenWidth: number;
}

export default function Frame({ children, screenWidth }: FrameProps) {
  return (
    <View className="relative">
      <FrameSvg
        width={screenWidth - 14}
        style={{ marginLeft: -6, position: 'absolute' }}
      />
      <View className="mt-11">{children}</View>
    </View>
  );
}

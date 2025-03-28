import LogoIcon from '@/assets/images/svg/logo-icon.svg';
import { colors } from '@/lib/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

export default function TabBarIcon(props: {
  name: MaterialIconName | 'logo';
  color: string;
  focused: boolean;
}) {
  const size = 30;
  const color = props.focused ? colors.secondary[200] : '#9CA3AF';

  if (props.name === 'logo') {
    return (
      <View className="-mt-0.5">
        <LogoIcon width={size - 2} height={size - 2} color={color} />
      </View>
    );
  }
  return <MaterialCommunityIcons name={props.name} color={color} size={size} />;
}

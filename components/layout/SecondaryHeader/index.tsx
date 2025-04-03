import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SecondaryHeaderBackButton from './SecondaryHeaderBackButton';

interface SecondaryHeaderProps {
  title: string;
  showBackButton?: boolean;
  backButtonText?: string;
  rightComponent?: React.ReactNode;
}

export default function SecondaryHeader({
  title,
  showBackButton = true,
  backButtonText,
  rightComponent,
}: SecondaryHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="border-b border-muted bg-transparent"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-11 flex-row items-center px-4">
        {showBackButton && (
          <SecondaryHeaderBackButton backButtonText={backButtonText} />
        )}
        <View className="mx-10 flex-1 items-center justify-center">
          <Text
            className="text-center text-xl font-bold text-gray-100"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        {rightComponent && (
          <View className="absolute right-4 z-10">{rightComponent}</View>
        )}
      </View>
    </View>
  );
}

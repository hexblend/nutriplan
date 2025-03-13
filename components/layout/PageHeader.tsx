import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, View } from 'react-native';

interface PageHeaderProps extends NativeStackHeaderProps {
  children?: React.ReactNode;
}

export default function PageHeader({
  navigation,
  route,
  options,
  back,
  children,
}: PageHeaderProps) {
  const canGoBack = navigation?.canGoBack();

  const handleBack = () => {
    if (canGoBack) {
      navigation?.goBack();
    }
  };
  const headerTitle = options?.title || route.name;

  return (
    <View className="bg-transparent pt-12">
      <View className="min-h-[52px] flex-row items-center px-2 py-3">
        {(canGoBack || back) && (
          <Pressable
            onPress={handleBack}
            className="mr-2 flex-row items-center active:opacity-50"
            hitSlop={8}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
            <Text className="text-lg text-white">
              {options.headerBackTitle || t.t('common.back')}
            </Text>
          </Pressable>
        )}

        <View className="flex-1 items-center">
          {headerTitle && (
            <Text className="text-lg font-semibold" numberOfLines={1}>
              {headerTitle}
            </Text>
          )}
        </View>

        {/* Add an empty View with the same width as the back button to center the title */}
        {(canGoBack || back) && (
          <View className="invisible mr-2 flex-row items-center">
            <Ionicons name="chevron-back" size={24} />
            <Text>Back</Text>
          </View>
        )}
      </View>

      {children && <View className="px-4 pb-3">{children}</View>}
    </View>
  );
}

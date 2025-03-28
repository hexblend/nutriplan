import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface TabBarItemProps {
  isActive: boolean;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  onPress: () => void;
}

const TabBarItem = ({ isActive, icon, label, onPress }: TabBarItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center py-2"
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className={`items-center ${isActive ? 'opacity-100' : 'opacity-50'}`}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={isActive ? 'white' : '#9CA3AF'}
        />
        <Animated.Text
          className={`mt-1 text-xs font-medium ${
            isActive ? 'text-white' : 'text-gray-400'
          }`}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export const TabBar = ({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-black/80">
      <View className="flex-row items-center justify-around">
        {state.routes.map((route) => {
          const { options } = descriptors[route.key];
          const isActive = pathname === `/(main)/${route.name}`;
          const iconElement = options.tabBarIcon?.({
            focused: isActive,
            color: isActive ? 'white' : '#9CA3AF',
            size: 24,
          });
          const iconName =
            React.isValidElement(iconElement) && 'props' in iconElement
              ? iconElement.props.name
              : 'circle';

          return (
            <TabBarItem
              key={route.key}
              isActive={isActive}
              icon={iconName}
              label={options.title || route.name}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isActive && !event.defaultPrevented) {
                  router.push(`/(main)/${route.name}` as any);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

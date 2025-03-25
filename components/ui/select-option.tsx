import { cn } from '@/lib/utils';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

const selectOptionVariants = cva(
  'group flex flex-row items-center justify-between rounded-md relative',
  {
    variants: {
      variant: {
        default: 'bg-background border border-border',
        selected: 'bg-background border border-blue-500',
      },
      size: {
        default: 'h-14 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const selectOptionTextVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-gray-300 font-bold',
      selected: 'text-white font-bold',
    },
    size: {
      default: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const selectOptionBottomVariants = cva(
  'absolute left-0 right-0 bottom-[-3px] h-[10px] rounded-b-md',
  {
    variants: {
      variant: {
        default: '!bg-border',
        selected: '!bg-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type SelectOptionProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof selectOptionVariants> & {
    label: string;
    value: string;
    selected?: boolean;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    // eslint-disable-next-line
    onSelect: (value: string) => void;
  };

const SelectOption = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SelectOptionProps
>(
  (
    {
      className,
      size = 'default',
      label,
      value,
      selected = false,
      onSelect,
      icon,
      ...props
    },
    ref
  ) => {
    const translateY = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.timing(translateY, {
        toValue: 4,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }).start();
    };

    const activeVariant = selected ? 'selected' : 'default';

    return (
      <View className="relative mb-5 w-full">
        <View
          className={cn(selectOptionBottomVariants({ variant: activeVariant }))}
        />
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          <Pressable
            className={cn(
              selectOptionVariants({ variant: activeVariant, size, className })
            )}
            ref={ref}
            role="button"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => onSelect(value)}
            {...props}
          >
            <View className="w-full flex-row items-center">
              {icon && (
                <Icon
                  name={icon}
                  size={24}
                  color={selected ? '#ffffff' : '#9ca3af'}
                  style={{ marginRight: 12 }}
                />
              )}
              <Text
                className={selectOptionTextVariants({
                  variant: activeVariant,
                  size,
                })}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    );
  }
);

export default SelectOption;

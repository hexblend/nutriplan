import { Icon } from '@/components/ui/icon';
import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { Feather } from '@expo/vector-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useRef } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-blue-500',
        secondary: 'bg-white',
        tertiary: 'bg-accent',
        ghost: 'bg-transparent',
        success: 'bg-green-500',
        warning: 'bg-amber-600',
        danger: 'bg-destructive',
      },
      model: {
        classic: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none',
        minimal: 'rounded',
      },
      size: {
        default: 'h-12 px-5 py-3',
        sm: 'h-9 px-3 py-2',
        lg: 'h-14 px-8 py-4',
        full: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      model: 'classic',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-bold text-foreground', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-blue-500',
      tertiary: 'text-accent-foreground',
      ghost: 'text-blue-500',
      success: 'text-white',
      warning: 'text-white',
      danger: 'text-destructive-foreground',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      full: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const buttonBottomVariants = cva('absolute left-0 right-0 -bottom-1 h-1', {
  variants: {
    variant: {
      default: 'bg-blue-700',
      secondary: 'bg-blue-500',
      ghost: 'bg-transparent',
      tertiary: 'bg-purple-700',
      success: 'bg-green-700',
      warning: 'bg-yellow-700',
      danger: 'bg-red-700',
    },
    model: {
      classic: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none',
      minimal: 'rounded',
    },
  },
  defaultVariants: {
    variant: 'default',
    model: 'classic',
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    icon?: keyof typeof Feather.glyphMap;
    iconPosition?: 'left' | 'right';
    children: React.ReactNode;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      model,
      size = 'full',
      icon,
      iconPosition = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 4,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.98,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 150,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();
    };

    return (
      <View className={cn('relative', size === 'full' && 'w-full')}>
        <View
          className={cn(
            buttonBottomVariants({ variant, model }),
            buttonVariants({ variant, model, size, className }),
            'opacity-70'
          )}
        />
        <TextClassContext.Provider
          value={buttonTextVariants({ variant, size })}
        >
          <Animated.View
            style={{
              transform: [{ translateY }, { scale }],
            }}
          >
            <Pressable
              className={cn(
                props.disabled && 'opacity-50',
                buttonVariants({ variant, model, size, className })
              )}
              ref={ref}
              role="button"
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              {...props}
            >
              {icon && iconPosition === 'left' && (
                <Icon
                  name={icon}
                  className="mr-2"
                  size={size === 'lg' ? 24 : size === 'sm' ? 16 : 20}
                />
              )}
              {children}
              {icon && iconPosition === 'right' && (
                <Icon
                  name={icon}
                  className="ml-2"
                  size={size === 'lg' ? 24 : size === 'sm' ? 16 : 20}
                />
              )}
            </Pressable>
          </Animated.View>
        </TextClassContext.Provider>
      </View>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

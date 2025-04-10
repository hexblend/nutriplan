import { cn } from '@/lib/utils';
import * as React from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  infoText?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      placeholderClassName,
      rightIcon,
      onRightIconPress,
      infoText,
      ...props
    },
    ref
  ) => {
    return (
      <View className="space-y-1">
        <View className="relative flex-row items-center">
          <TextInput
            ref={ref}
            className={cn(
              'native:text-lg native:leading-[1.25] w-full rounded-lg border border-input bg-accent px-3 text-white file:border-0 file:bg-transparent file:font-medium placeholder:font-normal placeholder:text-gray-300 web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
              props.editable === false && 'opacity-50 web:cursor-not-allowed',
              props.multiline ? 'h-[80px]' : 'h-[54px]',
              rightIcon && 'pr-12',
              className
            )}
            style={{ fontSize: 16 }}
            placeholderClassName={cn('!text-gray-200', placeholderClassName)}
            {...props}
          />
          {rightIcon && (
            <View className="absolute right-3" onTouchEnd={onRightIconPress}>
              {rightIcon}
            </View>
          )}
        </View>
        {infoText && !props.error && (
          <Text className="text-sm text-muted-foreground">{infoText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };

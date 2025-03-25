import { cn } from '@/lib/utils';
import * as React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    { className, placeholderClassName, rightIcon, onRightIconPress, ...props },
    ref
  ) => {
    return (
      <View className="relative flex-row items-center">
        <TextInput
          ref={ref}
          className={cn(
            'native:h-16 native:text-lg native:leading-[1.25] h-16 w-full rounded-md border border-input bg-accent px-3 text-white file:border-0 file:bg-transparent file:font-medium placeholder:font-normal placeholder:text-gray-500 web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
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
    );
  }
);

Input.displayName = 'Input';

export { Input };

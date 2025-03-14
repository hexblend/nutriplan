import { cn } from '@/lib/utils';
import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'native:h-14 native:text-lg native:leading-[1.25] h-14 rounded-md border border-input bg-background px-3 text-white file:border-0 file:bg-transparent file:font-medium placeholder:font-normal placeholder:text-gray-500 web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className
      )}
      style={{ fontSize: 16 }}
      placeholderClassName={cn('!text-gray-200', placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };

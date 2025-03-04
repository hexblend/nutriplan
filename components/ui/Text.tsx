import { Text as DefaultText } from 'react-native';
import { cn } from '~/lib/utils';

export type TextProps = DefaultText['props'];

export function Text(props: TextProps) {
  const { style, className, ...otherProps } = props;
  const fontFamily = { fontFamily: 'Silka' };

  return (
    <DefaultText
      style={[{ ...fontFamily }, style]}
      className={cn('text-white', className)}
      {...otherProps}
    />
  );
}

import { Text as DefaultText } from 'react-native';

export type TextProps = DefaultText['props'];

export function Text(props: TextProps) {
	const { style, ...otherProps } = props;
	const fontFamily = { fontFamily: 'Silka' };

	return <DefaultText style={[{ ...fontFamily }, style]} {...otherProps} />;
}

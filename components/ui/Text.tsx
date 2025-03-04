import { Text as DefaultText } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

export type TextProps = ThemeProps & DefaultText['props'];

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const fontFamily = { fontFamily: 'Silka' };

	return (
		<DefaultText
			style={[{ color, ...fontFamily }, style]}
			{...otherProps}
		/>
	);
}

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';

export default function TabTwoScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-xl font-bold">Tab Two</Text>
			<View className="h-[1px] w-[80%] my-8 bg-gray-200" />
			<EditScreenInfo path="app/(tabs)/two.tsx" />
		</View>
	);
}

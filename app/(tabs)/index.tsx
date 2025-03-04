import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { verifyInstallation } from 'nativewind';

export default function TabOneScreen() {
	verifyInstallation();
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-xl font-bold">Tab One</Text>
			<View
				className="h-1 w-[80%] bg-gray-200 my-4"
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/(tabs)/index.tsx" />
		</View>
	);
}

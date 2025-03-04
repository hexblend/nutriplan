import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/ui/Themed';

export default function ModalScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-xl font-bold">Modal</Text>
			<View
				className="h-[1px] w-[80%] my-8 bg-gray-200"
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/modal.tsx" />

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
		</View>
	);
}

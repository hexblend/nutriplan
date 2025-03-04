import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/ui/View';
import { Text } from '@/components/ui/Text';
import { verifyInstallation } from 'nativewind';
import React from 'react';

export default function TabOneScreen() {
	verifyInstallation();
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-xl">Tab One</Text>
			<Text className="font-bold text-xl">Tab One</Text>
			<View
				className="h-1 w-[80%] bg-gray-200 my-4"
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/(tabs)/index.tsx" />
		</View>
	);
}

import React from 'react';
import { ExternalLink } from './ExternalLink';
import { Text } from '@/components/ui/Text';
import { View } from 'react-native';

export default function EditScreenInfo({ path }: { path: string }) {
	return (
		<View>
			<View className="items-center mx-12">
				<Text className="text-base leading-6 text-center">
					Open up the code for this screen:
				</Text>

				<View className="rounded px-1 my-2">
					<Text>{path}</Text>
				</View>

				<Text className="text-base leading-6 text-center">
					Change any of the text, save the file, and your app will
					automatically update.
				</Text>
			</View>

			<View className="mt-4 mx-5 items-center">
				<ExternalLink
					className="py-4"
					href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
				>
					<Text className="text-center">
						Tap here if your app doesn't automatically update after
						making changes
					</Text>
				</ExternalLink>
			</View>
		</View>
	);
}

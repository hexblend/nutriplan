import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { Text } from '~/components/ui/Text';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Modal</Text>
      <View className="h-[1px] w-[80%] my-8 bg-gray-200" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

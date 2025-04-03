import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className="mb-10 mt-10 flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#ccc" />
    </View>
  );
}

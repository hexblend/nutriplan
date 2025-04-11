import { Image, View } from 'react-native';

export default function Loading() {
  return (
    <View className="mb-10 mt-10 flex-1 items-center justify-center">
      <Image
        // eslint-disable-next-line
        source={require('../../assets/images/gif/loading.gif')}
        style={{ width: 50, height: 50 }}
        className="my-10"
      />
    </View>
  );
}

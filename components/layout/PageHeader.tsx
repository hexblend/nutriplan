import { Text } from '@/components/ui/text';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

export default function PageHeader(props: NativeStackHeaderProps) {
  console.log(props);
  return (
    <View>
      <Text>PageHeader</Text>
    </View>
  );
}

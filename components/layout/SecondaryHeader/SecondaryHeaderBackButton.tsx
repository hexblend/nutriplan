import { Text } from '@/components/ui/text';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface SecondaryHeaderBackButtonProps {
  backButtonText?: string;
  onPress?: () => void;
}
export default function SecondaryHeaderBackButton({
  backButtonText,
  onPress,
}: SecondaryHeaderBackButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="absolute bottom-0 left-0 z-10 flex-row items-center pb-2 pl-4 pr-12 pt-4"
      onPress={() => {
        router.back();
        onPress && onPress();
      }}
    >
      <FontAwesome6 name="arrow-left" size={25} color="#ccc" />
      {backButtonText && (
        <Text className="ml-1 text-xl text-blue-500">{backButtonText}</Text>
      )}
    </TouchableOpacity>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { View } from 'react-native';

export default function StartScreen() {
  //   const { updateThemeColor, resetTheme } = useThemeCustomizer();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       updateThemeColor('background', colors.primary[500]);
  //     }, 130);
  //     return () => {
  //       resetTheme();
  //     };
  //   }, []);

  return (
    <PageWrapper
      className="pt-4"
      containerStyle={{ backgroundColor: colors.primary[500] }}
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        Create this weeks' meal plan
      </Text>

      <View className="mt-16">
        <Text className="text-center">Recommended calories</Text>
      </View>
    </PageWrapper>
  );
}

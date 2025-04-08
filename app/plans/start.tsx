import PageWrapper from '@/components/layout/PageWrapper';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { useThemeCustomizer } from '@/providers/ThemeCustomizerProvider';
import { useEffect } from 'react';

export default function StartScreen() {
  const { updateThemeColor, resetTheme } = useThemeCustomizer();

  useEffect(() => {
    setTimeout(() => {
      updateThemeColor('background', colors.primary[500]);
    }, 130);
    return () => {
      resetTheme();
    };
  }, []);

  return (
    <PageWrapper className="pt-4">
      <Text className="w-[200px] text-left text-4xl font-bold">
        Create your meal plan
      </Text>
    </PageWrapper>
  );
}

import LinkField from '@/components/blocks/LinkField';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { NutrientIcon } from '@/components/ui/NutrientIcon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors, nutrientsColors } from '@/lib/constants';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { View } from 'react-native';

export default function MacronutrientsScreen() {
  const { proteins, setProteins, carbs, setCarbs, lipids, setLipids } =
    useCreateMealPlanContext();

  const isUsingRecommendedValues = useMemo(() => {
    return proteins === 30 && carbs === 50 && lipids === 20;
  }, [proteins, carbs, lipids]);

  /**
   * Proteins Change
   */
  const handleProteinsChange = (value: number) => {
    // Round to nearest 5%
    const roundedValue = Math.round(value / 5) * 5;
    const proteinDiff = roundedValue - proteins;
    // If proteins increased, decrease both carbs and lipids proportionally
    if (proteinDiff > 0) {
      const totalOther = carbs + lipids;
      const newCarbs = Math.max(
        0,
        Math.round((carbs - (proteinDiff * carbs) / totalOther) / 5) * 5
      );
      const newLipids = Math.max(
        0,
        Math.round((lipids - (proteinDiff * lipids) / totalOther) / 5) * 5
      );
      setProteins(roundedValue);
      setCarbs(newCarbs);
      setLipids(newLipids);
    }
    // If proteins decreased, increase both carbs and lipids proportionally
    else {
      const totalOther = carbs + lipids;
      const newCarbs =
        Math.round((carbs - (proteinDiff * carbs) / totalOther) / 5) * 5;
      const newLipids =
        Math.round((lipids - (proteinDiff * lipids) / totalOther) / 5) * 5;
      setProteins(roundedValue);
      setCarbs(newCarbs);
      setLipids(newLipids);
    }
  };

  /**
   * Carbs Change
   */
  const handleCarbsChange = (value: number) => {
    // Round to nearest 5%
    const roundedValue = Math.round(value / 5) * 5;
    const carbsDiff = roundedValue - carbs;
    // Adjust lipids inversely to carbs
    const newLipids = Math.max(0, Math.round((lipids - carbsDiff) / 5) * 5);
    setCarbs(roundedValue);
    setLipids(newLipids);
  };

  /**
   * Lipids Change
   */
  const handleLipidsChange = (value: number) => {
    // Round to nearest 5%
    const roundedValue = Math.round(value / 5) * 5;
    const newTotal = proteins + carbs + roundedValue;
    // If total exceeds 100%, adjust proteins and carbs
    if (newTotal > 100) {
      const excess = newTotal - 100;
      const totalOther = proteins + carbs;
      // Adjust proteins and carbs proportionally
      const newProteins = Math.max(
        0,
        Math.round((proteins - (excess * proteins) / totalOther) / 5) * 5
      );
      const newCarbs = Math.max(
        0,
        Math.round((carbs - (excess * carbs) / totalOther) / 5) * 5
      );
      setProteins(newProteins);
      setCarbs(newCarbs);
    }
    setLipids(roundedValue);
  };

  const resetToRecommendedValues = () => {
    setProteins(30);
    setCarbs(50);
    setLipids(20);
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <LinkField
            href="/plans/equipment"
            value={t.t('common.continue')}
            centered
            variant="default"
          />
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        {t.t('plans.macronutrientsRatio')}
      </Text>

      <View className="mt-16 flex-col gap-6 px-4">
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="proteins" size={20} />
              <Text className="ml-2 text-lg font-bold">
                {t.t('plans.proteins')}
              </Text>
            </View>
          }
          value={proteins}
          min={0}
          max={100}
          step={5}
          onChange={handleProteinsChange}
          color={nutrientsColors.proteins}
        />
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="carbohydrates" size={20} />
              <Text className="ml-2 text-lg font-bold">
                {t.t('plans.carbohydrates')}
              </Text>
            </View>
          }
          value={carbs}
          min={0}
          max={100}
          step={5}
          onChange={handleCarbsChange}
          color={nutrientsColors.carbohydrates}
        />
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="lipids" size={20} />
              <Text className="ml-2 text-lg font-bold">
                {t.t('plans.lipids')}
              </Text>
            </View>
          }
          value={lipids}
          min={0}
          max={100}
          step={5}
          onChange={handleLipidsChange}
          color={nutrientsColors.lipids}
        />

        <View>
          {isUsingRecommendedValues ? (
            <View className="mt-2 flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#22c55e"
              />
              <Text className="ml-1 text-base text-green-500">
                {t.t('plans.usingRecommendedValues')}
              </Text>
            </View>
          ) : (
            <View>
              <View className="flex-row items-center justify-center">
                <MaterialCommunityIcons
                  name="information-outline"
                  size={16}
                  color="#eab308"
                />
                <Text className="ml-1 text-base text-yellow-500">
                  {t.t('plans.customValues')}
                </Text>
              </View>
              <Text className="mt-4 text-center text-sm text-gray-400">
                {t.t('plans.recommendedValues')}
              </Text>
              <Button
                onPress={resetToRecommendedValues}
                variant="ghost"
                className="mt-2"
              >
                <Text>{t.t('plans.useRecommendedValues')}</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </PageWrapper>
  );
}

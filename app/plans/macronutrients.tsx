import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { NutrientIcon } from '@/components/ui/NutrientIcon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors, nutrientsColors } from '@/lib/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';

export default function MacronutrientsScreen() {
  const [proteins, setProteins] = useState(30);
  const [carbs, setCarbs] = useState(50);
  const [lipids, setLipids] = useState(20);

  // Check if current values match recommended values
  const isUsingRecommendedValues =
    proteins === 30 && carbs === 50 && lipids === 20;

  const handleProteinsChange = (value: number) => {
    // Calculate how much proteins increased/decreased
    const proteinDiff = value - proteins;
    // If proteins increased, decrease both carbs and lipids proportionally
    if (proteinDiff > 0) {
      const totalOther = carbs + lipids;
      const newCarbs = Math.max(0, carbs - (proteinDiff * carbs) / totalOther);
      const newLipids = Math.max(
        0,
        lipids - (proteinDiff * lipids) / totalOther
      );
      setProteins(value);
      setCarbs(newCarbs);
      setLipids(newLipids);
    }
    // If proteins decreased, increase both carbs and lipids proportionally
    else {
      const totalOther = carbs + lipids;
      const newCarbs = carbs - (proteinDiff * carbs) / totalOther;
      const newLipids = lipids - (proteinDiff * lipids) / totalOther;
      setProteins(value);
      setCarbs(newCarbs);
      setLipids(newLipids);
    }
  };

  const handleCarbsChange = (value: number) => {
    // Calculate how much carbs increased/decreased
    const carbsDiff = value - carbs;
    // Adjust lipids inversely to carbs
    const newLipids = Math.max(0, lipids - carbsDiff);
    setCarbs(value);
    setLipids(newLipids);
  };

  const handleLipidsChange = (value: number) => {
    // Calculate the new total
    const newTotal = proteins + carbs + value;
    // If total exceeds 100%, adjust proteins and carbs
    if (newTotal > 100) {
      const excess = newTotal - 100;
      const totalOther = proteins + carbs;
      // Adjust proteins and carbs proportionally
      const newProteins = Math.max(
        0,
        proteins - (excess * proteins) / totalOther
      );
      const newCarbs = Math.max(0, carbs - (excess * carbs) / totalOther);
      setProteins(newProteins);
      setCarbs(newCarbs);
    }
    setLipids(value);
  };

  const resetToRecommendedValues = () => {
    setProteins(30);
    setCarbs(50);
    setLipids(20);
  };

  const onSubmit = () => {
    console.log('Submitted', { proteins, carbs, lipids });
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <Button onPress={onSubmit}>
            <Text>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text className="mb-8 max-w-[300px] self-center text-center text-4xl font-bold">
        Macronutrients ratio
      </Text>

      <View className="space-y-6 px-4">
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="proteins" size={20} />
              <Text className="ml-2 text-lg font-bold">Proteins</Text>
            </View>
          }
          value={proteins}
          min={0}
          max={100}
          step={1}
          onChange={handleProteinsChange}
          color={nutrientsColors.proteins}
        />
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="carbohydrates" size={20} />
              <Text className="ml-2 text-lg font-bold">Carbohydrates</Text>
            </View>
          }
          value={carbs}
          min={0}
          max={100}
          step={1}
          onChange={handleCarbsChange}
          color={nutrientsColors.carbohydrates}
        />
        <Slider
          label={
            <View className="flex-row items-center">
              <NutrientIcon type="lipids" size={20} />
              <Text className="ml-2 text-lg font-bold">Lipids</Text>
            </View>
          }
          value={lipids}
          min={0}
          max={100}
          step={1}
          onChange={handleLipidsChange}
          color={nutrientsColors.lipids}
        />
        {/* Recommended values */}
        <View className="mt-6">
          {isUsingRecommendedValues ? (
            <View className="flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color="#22c55e"
              />
              <Text className="ml-1 text-sm text-green-500">
                Using recommended values
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
                <Text className="ml-1 text-sm text-yellow-500">
                  Custom values - adjust with care
                </Text>
              </View>
              <Text className="mt-2 text-center text-sm text-gray-400">
                Recommended: Proteins 30%, Carbs 50%, Fats 20%
              </Text>
              <Button
                onPress={resetToRecommendedValues}
                variant="ghost"
                className="mt-4"
              >
                <Text>Use recommended values</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </PageWrapper>
  );
}

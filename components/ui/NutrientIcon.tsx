import BeefSvg from '@/assets/images/svg/beef.svg';
import BreadSvg from '@/assets/images/svg/bread.svg';
import PeanutSvg from '@/assets/images/svg/peanut.svg';
import { nutrientsColors } from '@/lib/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

type NutrientType = keyof typeof nutrientsColors;

interface NutrientIconProps {
  type: NutrientType;
  size?: number;
}

export const NutrientIcon: React.FC<NutrientIconProps> = ({
  type,
  size = 16,
}) => {
  switch (type) {
    case 'quantity':
      return (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={size}
          color={nutrientsColors.quantity}
        />
      );
    case 'calories':
      return (
        <MaterialCommunityIcons
          name="fire"
          size={size}
          color={nutrientsColors.calories}
        />
      );
    case 'proteins':
      return <BeefSvg width={size + 2} height={size + 2} />;
    case 'carbohydrates':
      return <BreadSvg width={size} height={size} />;
    case 'lipids':
      return <PeanutSvg width={size - 2} height={size - 2} />;
    default:
      return null;
  }
};

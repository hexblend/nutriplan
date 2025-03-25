import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import ControlledRulerPicker from '@/components/ui/form/ControlledRulerPicker';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import {
  feetAndInchesToCm,
  kgToLbs,
  lbsToKg,
  parseFeetAndInches,
} from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  weight: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function WeigthScreen() {
  const {
    height,
    weight,
    setWeight,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: weight.split(' ')[0] },
  });
  const currentWeight = watch('weight');
  const readyToSubmit = (isDirty && isValid) || !!currentWeight;

  const [unit, setUnit] = useState('kg');

  const handleUnitChange = (value: string) => {
    setUnit(value);
    if (value === 'lbs') {
      const weightNum = parseFloat(currentWeight);
      setValue('weight', kgToLbs(weightNum).toString());
    }
    if (value === 'kg') {
      const weightNum = parseFloat(currentWeight);
      setValue('weight', lbsToKg(weightNum).toString());
    }
  };

  const onSubmit = (data: FormValues) => {
    setWeight(`${data.weight} ${unit}`);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  const calculateInitialWeight = () => {
    let heightValue = 170; // default height in cm if no height is available
    if (height) {
      const parts = height.split(' ');
      if (parts.length >= 1) {
        if (parts[1] === 'cm') {
          heightValue = parseFloat(parts[0]);
        } else if (parts[1] === 'ft') {
          // Convert feet/inches to cm first
          const { feet, inches } = parseFeetAndInches(parts[0]);
          heightValue = feetAndInchesToCm(feet, inches);
        }
      }
    }
    // Set initial weight slightly higher than ideal BMI weight (BMI ~25)
    // Formula: weight (kg) = BMI × height (m) × height (m)
    const weightInKg = Math.round(
      26 * (heightValue / 100) * (heightValue / 100)
    );
    return {
      kg: weightInKg,
      lbs: kgToLbs(weightInKg),
    };
  };

  const initialWeights = calculateInitialWeight();

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.weightQuestion')}</QuestionHeader>
      <PageWrapper
        footer={
          <PageFooter>
            <Button
              variant="default"
              onPress={handleSubmit(onSubmit)}
              className="mt-6"
              disabled={!readyToSubmit}
            >
              <Text className="uppercase" disabled={!readyToSubmit}>
                {t.t('common.continue')}
              </Text>
            </Button>
          </PageFooter>
        }
        className="px-0"
      >
        <View className="mt-8 flex-1 justify-center">
          <Tabs
            value={unit}
            onValueChange={handleUnitChange}
            className="mx-auto w-1/2"
          >
            <TabsList className="w-full flex-row">
              <TabsTrigger value="kg" className="flex-1">
                <Text>Kg</Text>
              </TabsTrigger>
              <TabsTrigger value="lbs" className="flex-1">
                <Text>Lbs</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ControlledRulerPicker
            control={control}
            name="weight"
            error={errors.weight}
            initialValue={
              unit === 'kg' ? initialWeights.kg : initialWeights.lbs
            }
            min={unit === 'kg' ? 30 : 66} // 30kg = 66lbs
            max={unit === 'kg' ? 200 : 440} // 200kg = 440lbs
            step={unit === 'kg' ? 0.5 : 1}
            unit={unit}
            className="mt-10"
          />
        </View>
      </PageWrapper>
    </View>
  );
}

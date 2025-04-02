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
  cmToFeetAndInches,
  feetAndInchesToCm,
  parseFeetAndInches,
} from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  height: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function HeightScreen() {
  const {
    height,
    setHeight,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    setHeightUnit,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { height: height.split(' ')[0] },
  });

  const currentHeight = watch('height');
  const readyToSubmit = (isDirty && isValid) || !!currentHeight;

  const [unit, setUnit] = useState('cm');

  const handleUnitChange = (value: string) => {
    setUnit(value);
    if (value === 'ft') {
      // Convert from cm to feet/inches
      const heightInCm = parseFloat(currentHeight);
      setValue('height', cmToFeetAndInches(heightInCm));
    }
    if (value === 'cm') {
      // Convert from feet/inches to cm
      const { feet, inches } = parseFeetAndInches(currentHeight);
      setValue('height', feetAndInchesToCm(feet, inches).toString());
    }
  };

  const onSubmit = (data: FormValues) => {
    const finalValue = `${data.height} ${unit}`;
    setHeight(finalValue);
    setHeightUnit(unit === 'cm' ? 'metric' : 'imperial');
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.heightQuestion')}</QuestionHeader>
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
              <TabsTrigger value="cm" className="flex-1">
                <Text className="font-bold">CM</Text>
              </TabsTrigger>
              <TabsTrigger value="ft" className="flex-1">
                <Text className="font-bold">FT</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ControlledRulerPicker
            control={control}
            name="height"
            error={errors.height}
            initialValue={unit === 'cm' ? 170 : 5.7} // Average adult height (170cm or 5'7")
            min={unit === 'cm' ? 100 : 3.3} // Minimum height (100cm or 3'3")
            max={unit === 'cm' ? 220 : 7.2} // Maximum height (220cm or 7'2")
            step={unit === 'cm' ? 1 : 0.1} // Step by 1cm or 0.1ft (about 1.2 inches)
            unit={unit}
            className="mt-10"
          />
        </View>
      </PageWrapper>
    </View>
  );
}

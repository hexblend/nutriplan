import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import ControlledRulerPicker from '@/components/ui/form/ControlledRulerPicker';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { supabase } from '@/lib/supabase/client';
import { kgToLbs, lbsToKg, throwError } from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  targetWeight: z
    .string()
    .min(1, 'Weight is required')
    .refine((val) => !isNaN(parseFloat(val)), 'Invalid number'),
});

type FormValues = z.infer<typeof formSchema>;

export default function TargetWeightScreen() {
  const {
    weight,
    targetWeightKg,
    setTargetWeightKg,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    clientId,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetWeight: targetWeightKg?.toString() || '',
    },
  });
  const currentTargetWeight = watch('targetWeight');
  const readyToSubmit = (isDirty && isValid) || !!currentTargetWeight;

  const [unit, setUnit] = useState('kg');

  const handleUnitChange = (value: string) => {
    setUnit(value);
    if (value === 'lbs') {
      const weightNum = parseFloat(currentTargetWeight || '0');
      setValue('targetWeight', kgToLbs(weightNum).toString());
    }
    if (value === 'kg') {
      const weightNum = parseFloat(currentTargetWeight || '0');
      setValue('targetWeight', lbsToKg(weightNum).toString());
    }
  };

  const onSubmit = async (data: FormValues) => {
    const weightInKg =
      unit === 'kg'
        ? parseFloat(data.targetWeight)
        : lbsToKg(parseFloat(data.targetWeight));
    setTargetWeightKg(weightInKg);
    const { error } = await supabase
      .from('clients')
      .update({ target_weight_kg: weightInKg })
      .eq('id', clientId);
    if (error) {
      return throwError('[onboarding] Error updating client weight', error);
    }
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  // Initial target weight based on current weight
  const calculateInitialTargetWeight = () => {
    const currentWeightNum = parseFloat(weight.split(' ')[0]);
    const currentUnit = weight.split(' ')[1];
    const currentWeightInKg =
      currentUnit === 'kg' ? currentWeightNum : lbsToKg(currentWeightNum);
    // Set initial target weight slightly lower than current weight
    const targetWeightInKg = currentWeightInKg - 5;
    return {
      kg: Math.round(targetWeightInKg),
      lbs: Math.round(kgToLbs(targetWeightInKg)),
    };
  };

  const initialWeights = calculateInitialTargetWeight();

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.targetWeightQuestion')}</QuestionHeader>
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
                <Text className="font-bold">KG</Text>
              </TabsTrigger>
              <TabsTrigger value="lbs" className="flex-1">
                <Text className="font-bold">LBS</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ControlledRulerPicker
            control={control}
            name="targetWeight"
            error={errors.targetWeight}
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

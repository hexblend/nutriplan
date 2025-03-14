import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import ControlledRulerPicker from '@/components/ui/form/ControlledRulerPicker';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
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
  const [tab, setTab] = useState('kg');

  const {
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
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: weight.toString() },
  });
  const readyToSubmit = (isDirty && isValid) || weight;

  const onSubmit = (data: FormValues) => {
    setWeight(Number(data.weight));
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

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
          <Tabs value={tab} onValueChange={setTab} className="mx-auto w-1/2">
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
            min={30}
            max={200}
            step={0.5}
            unit={tab}
            className="mt-10"
          />
        </View>
      </PageWrapper>
    </View>
  );
}

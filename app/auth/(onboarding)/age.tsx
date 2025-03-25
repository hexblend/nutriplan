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
import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  age: z.string().min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function AgeScreen() {
  const {
    age,
    setAge,
    sex,
    setSex,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { age },
  });

  const currentAge = watch('age');
  const readyToSubmit = (isDirty && isValid) || !!currentAge;

  const onSubmit = (data: FormValues) => {
    setAge(data.age);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.ageAndSexQuestion')}</QuestionHeader>
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
        <View className="mt-14 flex-1 justify-center">
          <ControlledRulerPicker
            control={control}
            name="age"
            error={errors.age}
            initialValue={30}
            min={16}
            max={100}
            step={1}
            unit={t.t('auth.years')}
            fractionDigits={0}
            className="mb-2"
          />
          {/* @ts-ignore */}
          <Tabs value={sex} onValueChange={setSex} className="mx-auto w-1/2">
            <TabsList className="w-full flex-row">
              <TabsTrigger value="male" className="flex-1">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="male"
                    size={20}
                    color="#fff"
                    className="mr-2"
                  />
                  <Text>{t.t('auth.male')}</Text>
                </View>
              </TabsTrigger>
              <TabsTrigger value="female" className="flex-1">
                <View className="flex-row items-center">
                  <FontAwesome
                    name="female"
                    size={20}
                    color="#fff"
                    className="mr-2"
                  />
                  <Text>{t.t('auth.female')}</Text>
                </View>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </View>
      </PageWrapper>
    </View>
  );
}

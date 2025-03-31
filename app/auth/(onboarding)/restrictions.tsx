import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

export type OnboardingDietaryRestriction =
  | 'No restrictions'
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-free'
  | 'Dairy-free'
  | 'Keto'
  | 'Pescatarian';

const formSchema = z.object({
  dietaryRestrictions: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function RestrictionsScreen() {
  const {
    dietaryRestrictions,
    setDietaryRestrictions,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    clientId,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { dietaryRestrictions },
  });
  const readyToSubmit = (isDirty && isValid) || dietaryRestrictions.length > 0;

  const onSubmit = async (data: FormValues) => {
    setDietaryRestrictions(
      data.dietaryRestrictions as OnboardingDietaryRestriction[]
    );
    const { error } = await supabase
      .from('clients')
      .update({ food_restrictions: data.dietaryRestrictions })
      .eq('id', clientId);
    if (error) {
      return throwError(
        '[onboarding] Error updating client food restrictions',
        error
      );
    }
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{`${t.t('auth.dietaryRestrictionsQuestion')}`}</QuestionHeader>
      <PageWrapper
        footer={
          <PageFooter withBorder>
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
      >
        <View className="mt-6">
          <ControlledSelect
            control={control}
            name="dietaryRestrictions"
            options={[
              {
                label: t.t('auth.dietaryRestrictionsNone'),
                value: 'No restrictions',
                icon: 'check-circle',
              },
              {
                label: t.t('auth.dietaryRestrictionsVegetarian'),
                value: 'Vegetarian',
                icon: 'leaf',
              },
              {
                label: t.t('auth.dietaryRestrictionsVegan'),
                value: 'Vegan',
                icon: 'leaf',
              },
              {
                label: t.t('auth.dietaryRestrictionsGlutenFree'),
                value: 'Gluten-free',
                icon: 'barley-off',
              },
              {
                label: t.t('auth.dietaryRestrictionsDairyFree'),
                value: 'Dairy-free',
                icon: 'cup-off',
              },
              {
                label: t.t('auth.dietaryRestrictionsKeto'),
                value: 'Keto',
                icon: 'star',
              },
              {
                label: t.t('auth.dietaryRestrictionsPescatarian'),
                value: 'Pescatarian',
                icon: 'fish',
              },
              {
                label: t.t('auth.dietaryRestrictionsFasting'),
                value: 'Fasting/Post',
                icon: 'clock',
              },
            ]}
            multiple={true}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

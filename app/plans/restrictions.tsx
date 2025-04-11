import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledSelect } from '@/components/ui/form/ControlledSelect';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { OnboardingDietaryRestriction } from '../auth/(onboarding)/restrictions';

const formSchema = z.object({
  dietaryRestrictions: z.array(z.string()).min(1, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function RestrictionsScreen() {
  const router = useRouter();
  const { restrictions, setRestrictions } = useCreateMealPlanContext();
  const { currentClient } = useSession();

  const defaultRestrictions = currentClient?.food_restrictions
    ? (JSON.parse(currentClient.food_restrictions) as string[])
    : ['No restrictions'];

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryRestrictions: defaultRestrictions,
    },
  });

  const readyToSubmit =
    (isDirty && isValid) ||
    defaultRestrictions.length > 0 ||
    restrictions.length > 0;

  const onSubmit = async (data: FormValues) => {
    // Optimistic update
    setRestrictions(data.dietaryRestrictions as OnboardingDietaryRestriction[]);
    router.push('/plans/workout-days');

    const { error } = await supabase
      .from('clients')
      .update({ food_restrictions: JSON.stringify(data.dietaryRestrictions) })
      .eq('id', currentClient?.id);
    if (error) {
      setRestrictions(defaultRestrictions as OnboardingDietaryRestriction[]);
      return throwError(
        '[create-meal] Error updating client food restrictions',
        error
      );
    }
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter withBorder className="pt-4">
          <Button
            variant="default"
            onPress={handleSubmit(onSubmit)}
            disabled={!readyToSubmit}
          >
            <Text disabled={!readyToSubmit}>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        {t.t('plans.selectRestrictions')}
      </Text>

      <Text className="mt-4 max-w-[260px] self-center text-center text-base text-gray-400">
        {t.t('plans.recommendedRestrictions')}
      </Text>

      <View className="mt-10">
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
          onValueChange={(newValue) => {
            const lastAddedElement = newValue[newValue.length - 1];
            if (lastAddedElement === 'No restrictions') {
              return setValue('dietaryRestrictions', ['No restrictions']);
            }
            if (
              lastAddedElement !== 'No restrictions' &&
              newValue.includes('No restrictions') &&
              typeof newValue !== 'string'
            ) {
              return setValue(
                'dietaryRestrictions',
                newValue.filter((value) => value !== 'No restrictions')
              );
            }
          }}
        />
      </View>
    </PageWrapper>
  );
}

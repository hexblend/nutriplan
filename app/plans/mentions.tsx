import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { colors } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useCreateMealPlanContext } from '@/providers/CreateMealPlanProvider';
import { useSession } from '@/providers/SessionProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  dislikedFoods: z.string(),
  favoriteFoods: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MentionsScreen() {
  const router = useRouter();
  const { dislikedFoods, setDislikedFoods, favoriteFoods, setFavoriteFoods } =
    useCreateMealPlanContext();
  const { currentClient } = useSession();

  useEffect(() => {
    if (currentClient) {
      setDislikedFoods(currentClient?.disliked_food || '');
      setFavoriteFoods(currentClient?.favourite_food || '');
    }
  }, [currentClient]);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { dislikedFoods, favoriteFoods },
  });

  const onSubmit = async (data: FormValues) => {
    // Optimistic update
    setDislikedFoods(data.dislikedFoods);
    setFavoriteFoods(data.favoriteFoods);
    router.push('/plans/equipment');

    const { error } = await supabase
      .from('clients')
      .update({
        disliked_food: data.dislikedFoods,
        favourite_food: data.favoriteFoods,
      })
      .eq('id', currentClient?.id);
    if (error) {
      setDislikedFoods(currentClient?.disliked_food || '');
      setFavoriteFoods(currentClient?.favourite_food || '');
      return throwError(
        '[create-meal] Error updating client food mentions',
        error
      );
    }
  };

  return (
    <PageWrapper
      className="pt-6"
      containerStyle={{ backgroundColor: colors.primary[700] }}
      footer={
        <PageFooter>
          <Button variant="default" onPress={handleSubmit(onSubmit)}>
            <Text>{t.t('common.continue')}</Text>
          </Button>
        </PageFooter>
      }
    >
      <Text className="max-w-[300px] self-center text-center text-4xl font-bold">
        {t.t('plans.mentions')}
      </Text>

      <Text className="mt-4 max-w-[300px] self-center text-center text-base text-gray-400">
        {t.t('plans.mentionsDescription')}
      </Text>

      <View className="mt-12 space-y-6">
        <ControlledInput
          control={control}
          name="dislikedFoods"
          label={t.t('plans.dontIncludeFood')}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <ControlledInput
          control={control}
          name="favoriteFoods"
          label={t.t('plans.includeFood')}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          containerClassName="mt-8"
        />

        <Text className="mt-4 max-w-[260px] self-center text-center text-base text-gray-400">
          {t.t('common.optional')}
        </Text>
      </View>
    </PageWrapper>
  );
}

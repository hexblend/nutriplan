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

const formSchema = z.object({
  targetMaintenance: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function TargetMaintenanceScreen() {
  const {
    targetMaintenance,
    setTargetMaintenance,
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    clientId,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetMaintenance },
  });
  const readyToSubmit = (isDirty && isValid) || targetMaintenance;

  const onSubmit = async (data: FormValues) => {
    setTargetMaintenance(data.targetMaintenance);
    const { error } = await supabase
      .from('clients')
      .update({ target_maintenance: data.targetMaintenance })
      .eq('id', clientId);
    if (error) {
      return throwError(
        '[onboarding] Error updating client target maintenance',
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
      <QuestionHeader>{`${t.t('auth.targetMaintenanceQuestion')}`}</QuestionHeader>
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
      >
        <View className="mt-6">
          <ControlledSelect
            control={control}
            name="targetMaintenance"
            options={[
              {
                label: t.t('auth.targetMaintenanceOverall'),
                value: 'Overall wellbeing',
                icon: 'heart-pulse',
              },
              {
                label: t.t('auth.targetMaintenanceWeight'),
                value: 'Current weight',
                icon: 'scale-balance',
              },
              {
                label: t.t('auth.targetMaintenanceEnergy'),
                value: 'Energy levels',
                icon: 'lightning-bolt',
              },
              {
                label: t.t('auth.targetMaintenancePerformance'),
                value: 'Athletic performance',
                icon: 'run-fast',
              },
              {
                label: t.t('auth.targetMaintenanceMental'),
                value: 'Mental clarity and focus',
                icon: 'brain',
              },
            ]}
            multiple={false}
            error={errors.targetMaintenance}
          />
        </View>
      </PageWrapper>
    </View>
  );
}

import PageWrapper from '@/components/layout/PageWrapper';
import QuestionHeader from '@/components/layout/QuestionHeader';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/form/ControlledInput';
import { Text } from '@/components/ui/text';
import { t } from '@/i18n/translations';
import { progressScreensConfig } from '@/lib/onboarding/onboardingConfig';
import { cn } from '@/lib/utils';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
});
type FormValues = z.infer<typeof formSchema>;

export default function NameScreen() {
  const {
    setIsForward,
    currentScreenName,
    setCurrentScreenName,
    firstName,
    lastName,
    setFirstName,
    setLastName,
  } = useOnboardingContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName, lastName },
  });
  const readyToSubmit = (isDirty && isValid) || (firstName && lastName);

  const onSubmit = (data: FormValues) => {
    const { firstName, lastName } = data;
    setFirstName(firstName);
    setLastName(lastName);
    // Go to next screen
    setIsForward(true);
    const nextScreen = progressScreensConfig[currentScreenName].next;
    if (nextScreen) setCurrentScreenName(nextScreen);
  };

  return (
    <View className="flex-1">
      <QuestionHeader>{t.t('auth.nameQuestion')}</QuestionHeader>
      <PageWrapper>
        <View className="mt-6">
          <ControlledInput
            name="firstName"
            autoFocus
            autoCorrect={false}
            control={control}
            placeholder={t.t('common.firstName')}
            className={cn(
              !errors.firstName && 'rounded-bl-none rounded-br-none'
            )}
            error={errors?.firstName}
          />
          <ControlledInput
            name="lastName"
            autoCorrect={false}
            control={control}
            placeholder={t.t('common.lastName')}
            error={errors?.lastName}
            className={cn(
              !errors.lastName && 'rounded-tl-none rounded-tr-none border-t-0'
            )}
          />
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
        </View>
      </PageWrapper>
    </View>
  );
}

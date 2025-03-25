import { t } from '@/i18n/translations';
import { useOnboardingContext } from '@/providers/OnboardingProvider';
import FillerScreen from './filler';

export function QuestionsFillerScreen() {
  return <FillerScreen text={t.t('auth.quickQuestionsFiller')} />;
}

export function AccountFillerScreen() {
  const { firstName } = useOnboardingContext();
  return <FillerScreen text={`${firstName}, ${t.t('auth.accountFiller')}`} />;
}

export function GoalsFillerScreen() {
  return <FillerScreen text={t.t('auth.goalsFiller')} />;
}

export function LearningFillerScreen() {
  return <FillerScreen text={t.t('auth.learningFiller')} />;
}

export default {
  QuestionsFillerScreen,
  AccountFillerScreen,
  GoalsFillerScreen,
  LearningFillerScreen,
};

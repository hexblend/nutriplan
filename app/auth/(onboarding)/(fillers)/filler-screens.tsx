import { t } from '@/i18n/translations';
import FillerScreen from './filler';

export function QuestionsFillerScreen() {
  return <FillerScreen text={t.t('auth.quickQuestionsFiller')} />;
}

export function UnderstandingFillerScreen() {
  return <FillerScreen text={t.t('auth.understandingFiller')} />;
}

export function AccountFillerScreen() {
  return <FillerScreen text={t.t('auth.accountFiller')} />;
}

export function GoalsFillerScreen() {
  return <FillerScreen text={t.t('auth.goalsFiller')} />;
}

export function LearningFillerScreen() {
  return <FillerScreen text={t.t('auth.learningFiller')} />;
}

export default {
  QuestionsFillerScreen,
  UnderstandingFillerScreen,
  AccountFillerScreen,
  GoalsFillerScreen,
  LearningFillerScreen,
};

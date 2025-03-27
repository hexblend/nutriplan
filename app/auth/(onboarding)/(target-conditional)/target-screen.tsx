import { useOnboardingContext } from '@/providers/OnboardingProvider';
import TargetActivityScreen from './target-activity';
import TargetConditionScreen from './target-condition';
import TargetMaintenanceScreen from './target-maintenance';
import TargetSportScreen from './target-sport';
import TargetWeightScreen from './target-weight';

export default function TargetScreen() {
  const { goal } = useOnboardingContext();
  switch (goal) {
    case 'Lose weight':
      return <TargetWeightScreen />;
    case 'Maintain weight in a healthy way':
      return <TargetMaintenanceScreen />;
    case 'Increase muscle mass':
      return <TargetActivityScreen />;
    case 'Diet for a condition':
      return <TargetConditionScreen />;
    case 'Performance for athletes':
      return <TargetSportScreen />;
    default:
      return <TargetWeightScreen />;
  }
}

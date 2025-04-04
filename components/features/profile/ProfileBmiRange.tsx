import { BmiRange } from '@/components/blocks/BmiRange';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';

interface ProfileBmiRangeProps {
  className?: string;
}
export default function ProfileBmiRange({ className }: ProfileBmiRangeProps) {
  const { currentClient } = useSession();

  const calculateBmi = () => {
    if (!currentClient?.height_cm || !currentClient?.weight_kg) {
      return 0;
    }
    const heightInMeters = currentClient.height_cm / 100;
    // Calculate BMI: weight (kg) / (height (m))²
    const bmi = currentClient.weight_kg / (heightInMeters * heightInMeters);
    return bmi;
  };

  return <BmiRange bmi={calculateBmi()} className={cn(className)} />;
}

import { BmiRange } from '@/components/ui/bmi-range';
import { cn } from '@/lib/utils';

interface ProfileBmiRangeProps {
  className?: string;
}
export default function ProfileBmiRange({ className }: ProfileBmiRangeProps) {
  return <BmiRange bmi={26} className={cn(className)} />;
}

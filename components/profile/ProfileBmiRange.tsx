import { BmiRange } from '@/components/blocks/BmiRange';
import { cn } from '@/lib/utils';

interface ProfileBmiRangeProps {
  className?: string;
}
export default function ProfileBmiRange({ className }: ProfileBmiRangeProps) {
  return <BmiRange bmi={32} className={cn(className)} />;
}

import { Text } from '@/components/ui/text';

interface ErrorProps {
  children: string;
}

export function Error({ children }: ErrorProps) {
  return <Text className="text-sm text-destructive">{children}</Text>;
}

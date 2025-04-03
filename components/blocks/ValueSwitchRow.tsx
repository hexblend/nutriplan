import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { View } from 'react-native';

interface ValueSwitchRowProps {
  label: string;
  value: string;
  // eslint-disable-next-line
  onValueChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  hideBorder?: boolean;
}

export function ValueSwitchRow({
  label,
  value,
  onValueChange,
  options,
  className,
  hideBorder,
}: ValueSwitchRowProps) {
  const handleValueChange = async (newValue: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange(newValue);
  };

  return (
    <View className={className}>
      <View
        className={cn(
          'flex-row items-center justify-between',
          !hideBorder && 'border-b border-muted pb-4'
        )}
      >
        <Text className="font-bold">{label}</Text>
        <Tabs value={value} onValueChange={handleValueChange} className="w-1/2">
          <TabsList className="w-full flex-row">
            {options.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="flex-1"
              >
                <Text className="font-bold">{option.label}</Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </View>
    </View>
  );
}

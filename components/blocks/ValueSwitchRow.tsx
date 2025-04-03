import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
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
}

export function ValueSwitchRow({
  label,
  value,
  onValueChange,
  options,
  className,
}: ValueSwitchRowProps) {
  return (
    <View className={className}>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold">{label}</Text>
        <Tabs value={value} onValueChange={onValueChange} className="w-1/2">
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

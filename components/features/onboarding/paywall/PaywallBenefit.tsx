import { Text } from '@/components/ui/text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { JSX } from 'react';
import { View } from 'react-native';

interface PaywallBenefitProps {
  className?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  text: string;
  boldWords?: string[];
}

export default function PaywallBenefit({
  className,
  icon = 'medal',
  iconColor = '#2CEE62',
  text,
  boldWords = [],
}: PaywallBenefitProps) {
  const renderText = () => {
    if (boldWords.length === 0) return text;

    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Sort bold words by length (longest first) to handle overlapping matches
    const sortedBoldWords = [...boldWords].sort((a, b) => b.length - a.length);

    // Find all matches for all bold words
    const matches: { index: number; length: number; word: string }[] = [];
    sortedBoldWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          word: match[0],
        });
      }
    });

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Process matches and create parts array
    matches.forEach((match, i) => {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the bold word
      parts.push(
        <Text key={`bold-${i}`} className="text-lg font-bold">
          {match.word}
        </Text>
      );

      lastIndex = match.index + match.length;
    });

    // Add remaining text after last match
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <View
      className={`-mx-2 flex-1 flex-row items-center justify-between gap-3 rounded-lg border border-border px-2 py-3 ${className || ''}`}
    >
      <MaterialCommunityIcons name={icon} size={32} color={iconColor} />
      <View className="flex-1">
        <Text className="text-lg">{renderText()}</Text>
      </View>
    </View>
  );
}

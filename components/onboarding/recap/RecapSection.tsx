import React from 'react';
import { View } from 'react-native';
import AnimatedTitle from './AnimatedTitle';

export default function RecapSection({
  title,
  children,
  titleDelay,
  centered = false,
}: {
  title: string;
  children: React.ReactNode;
  titleDelay: number;
  centered?: boolean;
}) {
  return (
    <View className="mb-8">
      <AnimatedTitle title={title} delay={titleDelay} centered={centered} />
      <View className="gap-3">{children}</View>
    </View>
  );
}

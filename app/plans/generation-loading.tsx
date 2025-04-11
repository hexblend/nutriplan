import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';

const LOADING_STEPS = [
  'Inițiere...',
  'Analizam datele introduse...',
  'Se genereaza ingredientele...',
  'Se calculeaza necesarul caloric...',
  'Se adapteaza conform restricțiilor...',
  'Se personalizeaza meniurile...',
  'Se calculeaza portiile...',
  'Se ajusteaza programul zilnic...',
  'Se adauga nutrientii pentru mese...',
  'Se adauga alternative pentru mese...',
  'Se ajusteaza procentele meselor...',
  'Finalizare plan alimentar...',
];

const TOTAL_TIME = 90; // 1:30 in seconds
const STEP_INTERVAL = TOTAL_TIME / LOADING_STEPS.length;

export default function GenerationLoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(true);
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (!loading) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Countdown timer and step progression
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          setLoading(false);
          return 0;
        }

        // Update step based on elapsed time
        const elapsedTime = TOTAL_TIME - (prev - 1);
        const newStep = Math.min(
          Math.floor(elapsedTime / STEP_INTERVAL),
          LOADING_STEPS.length - 1
        );
        setCurrentStep(newStep);

        return prev - 1;
      });
    }, 1000);

    return () => {
      pulse.stop();
      clearInterval(timerInterval);
    };
  }, [loading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressValue = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;

  const screenHeight = useWindowDimensions().height;

  return (
    <PageWrapper
      className="-mb-24 pt-6"
      containerStyle={{
        backgroundColor: colors.primary[700],
        paddingTop: screenHeight / 8,
      }}
      footer={
        <PageFooter>
          {/* <Button variant="default" onPress={onSubmit}>
            <Text>{t.t('common.continue')}</Text>
          </Button> */}
          <View className="mb-8 w-full px-4">
            <Progress
              value={progressValue}
              className="mt-3 h-3"
              indicatorClassName="bg-primary-350"
            />
          </View>
        </PageFooter>
      }
    >
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          <Ionicons name="sparkles" size={80} color={colors.primary[350]} />
        </Animated.View>
        <Text className="mt-14 text-center text-2xl font-bold text-white">
          {formatTime(timeLeft)}
        </Text>
        <Text className="mt-8 max-w-[300px] text-center text-white">
          {LOADING_STEPS[currentStep]}
        </Text>
      </View>
    </PageWrapper>
  );
}

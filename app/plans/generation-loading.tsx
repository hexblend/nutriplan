import Logo from '@/assets/images/svg/logo-icon.svg';
import PageFooter from '@/components/layout/PageFooter';
import PageWrapper from '@/components/layout/PageWrapper';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { colors } from '@/lib/constants';
import { formatTime } from '@/lib/utils';
import LottieView from 'lottie-react-native';
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
          duration: 1500,
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

  const progressValue = ((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100;
  const screenHeight = useWindowDimensions().height;

  return (
    <PageWrapper
      className="-mb-24 pt-6"
      containerStyle={{
        backgroundColor: colors.primary[700],
      }}
      footer={
        <PageFooter>
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
      <View
        className="flex-1 items-center justify-center"
        style={{ marginTop: screenHeight / 10 }}
      >
        {/* Lottie + Logo */}
        <View className="relative">
          <Animated.View
            className="absolute left-1/2 top-1/2 -ml-[100px] -mt-[22px] flex items-center justify-center"
            style={{
              zIndex: 10,
              transform: [{ scale: pulseAnim }],
            }}
          >
            <Logo width={40} height={40} color={colors.primary[700]} />
          </Animated.View>
          <LottieView
            autoPlay
            style={{
              width: 200,
              height: 200,
            }}
            // eslint-disable-next-line
            source={require('../../assets/images/lottie/ai-loading.json')}
          />
        </View>
        {/* Step */}
        <Text className="mt-8 max-w-[300px] text-center text-white">
          {LOADING_STEPS[currentStep]}
        </Text>
        {/* Time */}
        <Text className="mt-14 text-center text-2xl font-bold text-white">
          {formatTime(timeLeft)}
        </Text>
      </View>
    </PageWrapper>
  );
}

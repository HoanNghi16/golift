import Animated from 'react-native-reanimated';
import { typography } from '@/constants/design';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: typography.titleLarge,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}

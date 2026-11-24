import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ColorProvider } from '@/providers/colorProvider';
import { TitleProvider } from '@/providers/titleProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColor } from '@/providers/colorProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppStatusBar() {
  const { colors } = useColor();
  return <StatusBar style="auto" backgroundColor={colors.background} />;
}

export default function RootLayout() {
  return (
    <TitleProvider>
      <SafeAreaProvider>
        <ColorProvider>
          <AppStatusBar />
          <Stack>
            <Stack.Screen name="onboarding" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </ColorProvider>
      </SafeAreaProvider>
    </TitleProvider>
  );
}

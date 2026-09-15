import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ColorProvider } from '@/providers/colorProvider';
import { TitleProvider } from '@/providers/titleProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <TitleProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor='#000'/>
        <ColorProvider>
          <Stack>
            <Stack.Screen name="onboarding" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style='light' backgroundColor='#000' hideTransitionAnimation='fade'/>
        </ColorProvider>
      </SafeAreaProvider>
    </TitleProvider>
  );
}

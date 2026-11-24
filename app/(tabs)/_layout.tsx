import { Stack } from 'expo-router';
import React from 'react';

import PrimaryHeader from '@/components/layout/header';
import PrimaryTabBar from '@/components/layout/primaryTabBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useColor } from '@/providers/colorProvider';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

export default function TabLayout() {
  const { colors } = useColor();
  const { contentWidth, scale } = useResponsiveLayout();
  return (
    <View style={{ flex: 1, width: contentWidth, alignSelf: 'center', backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ marginBottom: 12 * scale }}>
        <PrimaryHeader variant='main'/>
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <PrimaryTabBar/>
    </View>
  );
}

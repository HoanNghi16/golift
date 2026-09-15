import { Stack } from 'expo-router';
import React from 'react';

import PrimaryHeader from '@/components/layout/header';
import PrimaryTabBar from '@/components/layout/primaryTabBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <>
      <SafeAreaView edges={['top']}>
        <PrimaryHeader variant='main'/>
      </SafeAreaView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
      </Stack>
      <PrimaryTabBar/>
    </>
  );
}

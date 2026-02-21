import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initDatabase } from '../services/database';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/static/Inter_24pt-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/static/Inter_24pt-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/static/Inter_24pt-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/static/Inter_24pt-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/static/Inter_24pt-ExtraBold.ttf'),
  });

  useEffect(() => {
    void initDatabase().catch((error) => {
      console.error('Database initialization failed:', error);
    });
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

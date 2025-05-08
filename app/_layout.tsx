import { Slot } from 'expo-router';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '@/global.css';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const InitialLayout = () => {
  return <Slot />;
};

export default function RootLayout() {
  const colorsScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorsScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <InitialLayout />

        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

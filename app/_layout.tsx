import { ActivityIndicator, useColorScheme, View } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '@/global.css';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';

const InitialLayout = () => {
  const { initialized } = useAuth();

  if (!initialized) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  const colorsScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorsScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <InitialLayout />
        </AuthProvider>

        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

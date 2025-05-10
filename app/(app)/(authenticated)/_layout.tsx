import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

const Layout = () => {
  const { authState } = useAuth();

  if (!authState.authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modal)/create-chat"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
};

export default Layout;

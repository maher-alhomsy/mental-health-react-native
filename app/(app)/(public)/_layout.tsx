import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

const Layout = () => {
  const { authState } = useAuth();

  if (authState.authenticated) {
    return <Redirect href="/(app)/(authenticated)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: 'Login' }}
      />
      <Stack.Screen name="register" options={{ title: 'Create Account' }} />
    </Stack>
  );
};

export default Layout;

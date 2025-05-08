import { Stack } from 'expo-router';

const Layout = () => {
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

import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';
import ChatProvider from '@/providers/ChatProvider';

const Layout = () => {
  const { authState } = useAuth();

  if (!authState.authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <ChatProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modal)/create-chat"
          options={{
            headerShown: true,
            presentation: 'modal',
            headerTitle: 'Create Chat',
          }}
        />

        <Stack.Screen
          name="consultation/schedule"
          options={{ title: 'Schedule Consultation', headerShown: true }}
        />

        <Stack.Screen name="chat/[id]/index" options={{ title: '' }} />

        <Stack.Screen
          name="chat/[id]/manage"
          options={{ title: 'Manage Chat' }}
        />
      </Stack>
    </ChatProvider>
  );
};

export default Layout;

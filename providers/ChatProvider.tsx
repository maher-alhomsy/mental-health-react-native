import { ActivityIndicator, View } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';

import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

import { useAuth } from './AuthProvider';

const key = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const client = StreamChat.getInstance(key!);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const { authState } = useAuth();

  const [isReady, setIsReady] = useState(false);
  const [chatClient, setChatClient] = useState(client);

  useEffect(() => {
    if (!authState.authenticated) return;

    const connect = async () => {
      await client.connectUser(
        { id: authState.user_id!, name: authState.email! },
        authState.token
      );

      setIsReady(true);
    };

    connect();

    return () => {
      if (isReady) client.disconnectUser();
      setIsReady(false);
    };
  }, [authState.authenticated]);

  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;

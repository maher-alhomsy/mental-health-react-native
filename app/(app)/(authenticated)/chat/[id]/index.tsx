import { View, Text, TouchableOpacity } from 'react-native';

import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-expo';
import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

const Page = () => {
  const { isTherapist } = useAuth();
  const { client } = useChatContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const channel = client.channel('messaging', id);

  if (!channel) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold text-xl dark:text-white">
          Chanel not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 pb-safe">
      <Stack.Screen
        options={{
          title: (channel.data as any).name || 'Chat',
          headerRight: () => (
            <>
              {!isTherapist && (
                <Link href={`/chat/${id}/manage`} asChild>
                  <TouchableOpacity className="mr-4">
                    <Text className="text-cyan-600 text-xl">Manage</Text>
                  </TouchableOpacity>
                </Link>
              )}
            </>
          ),
        }}
      />

      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  );
};

export default Page;

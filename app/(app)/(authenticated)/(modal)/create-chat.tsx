import {
  View,
  Text,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';

import { router } from 'expo-router';
import { UserResponse } from 'stream-chat';
import { useChatContext } from 'stream-chat-expo';

const Page = () => {
  const { client } = useChatContext();

  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [channelDescription, setChannelDescription] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await client.queryUsers({ role: 'user' });

      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleCreateChannel = async () => {
    if (!channelName) {
      Alert.alert('Please enter a channel name');
      return;
    }

    const randomId = Math.random().toString(36).substring(2, 15);

    const channel = await client.channel('messaging', randomId, {
      name: channelName.trim(),
      description: channelDescription.trim(),
      image:
        'https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      members: [
        {
          user_id: client.user!.id,
          channel_role: 'admin',
        },
      ],
    } as any);

    channel.create();
    router.dismiss();
  };

  const handleDirectConversation = async (id: string) => {
    const channel = client.channel('messaging', `${client.user!.id}-${id}`, {
      members: [
        { user_id: client.user!.id, channel_role: 'admin' },
        { user_id: id, channel_role: 'member' },
      ],
      name: client.user!.name,
    } as any);

    await channel.create();
    router.dismiss();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-gray-700 mb-2">Channel Name</Text>

      <TextInput
        value={channelName}
        onChangeText={setChannelName}
        placeholder="Enter Channel Name"
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      <Text className="text-gray-700 mb-2">Description</Text>
      <TextInput
        multiline
        numberOfLines={3}
        value={channelDescription}
        onChangeText={setChannelDescription}
        placeholder="Enter channel description"
        className="border border-gray-300 rounded-lg p-3 mb-6 min-h-[80px]"
      />

      <TouchableOpacity
        onPress={handleCreateChannel}
        className={`rounded-lg p-4 ${
          channelName.trim() ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        disabled={!channelName.trim() || !channelDescription.trim()}
      >
        <Text className="text-white text-center font-semibold">
          Create Channel
        </Text>
      </TouchableOpacity>

      <View className="my-8 flex-row items-center">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-gray-500">or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <Text className="text-gray-700 mb-4">Start a direct conversation</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleDirectConversation(item.id)}
            className="flex-row items-center p-4 border-b border-gray-200"
          >
            <Text className="text-gray-800 text-lg">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Page;

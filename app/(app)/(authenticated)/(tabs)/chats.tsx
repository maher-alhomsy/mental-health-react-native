import { View, TouchableOpacity } from 'react-native';

import {
  ChannelList,
  useChatContext,
  ChannelPreviewMessenger,
} from 'stream-chat-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

const Page = () => {
  const { isTherapist } = useAuth();
  const { client } = useChatContext();

  // all chats where I part of it
  const filter = {
    members: {
      $in: [client.user!.id],
    },
  };

  const options = {
    presence: true,
    state: true,
    watch: true,
  };

  const CustomListItem = (props: any) => {
    const { unread } = props;
    const backgroundColor = unread ? 'bg-blue-100' : 'bg-white';

    return (
      <View className={`${backgroundColor}`}>
        <ChannelPreviewMessenger {...props} />
      </View>
    );
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              {!isTherapist && (
                <Link href="/(app)/(authenticated)/(modal)/create-chat" asChild>
                  <TouchableOpacity className="mr-4">
                    <Ionicons
                      size={24}
                      color="cyan"
                      name="add-circle-outline"
                    />
                  </TouchableOpacity>
                </Link>
              )}
            </>
          ),
        }}
      />

      <ChannelList
        filters={filter}
        options={options}
        onSelect={(channel) =>
          router.push(`/(app)/(authenticated)/chat/${channel.id}`)
        }
        Preview={CustomListItem}
      />
    </View>
  );
};

export default Page;

import { View, Text, Pressable } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';

const Page = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Page</Text>

      <Pressable className="bg-red-500 p-4 rounded-lg" onPress={handleSignOut}>
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default Page;

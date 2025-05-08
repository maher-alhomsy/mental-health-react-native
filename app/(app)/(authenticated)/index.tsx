import { View, Text } from 'react-native';

import { Redirect } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

const Page = () => {
  const { authState } = useAuth();

  if (!authState.authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-blue-500">Page</Text>
    </View>
  );
};

export default Page;

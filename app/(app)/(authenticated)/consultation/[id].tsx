import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>consultation {id}</Text>
    </View>
  );
};

export default Page;

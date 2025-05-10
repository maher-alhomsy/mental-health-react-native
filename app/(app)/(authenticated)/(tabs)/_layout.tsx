import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { useAuth } from '@/providers/AuthProvider';
import BlurTabBarBackground from '@/components/TabBarBackground.ios';

const TabsLayout = () => {
  const { isTherapist } = useAuth();

  return (
    <Tabs
      screenOptions={
        process.env.EXPO_OS === 'ios'
          ? {
              tabBarActiveTintColor: '#0d6c9a',
              tabBarInactiveTintColor: '#8E8E93',
              headerShown: true,
              tabBarButton: HapticTab,
              tabBarBackground: BlurTabBarBackground,
              tabBarStyle: {
                position: 'absolute',
              },
            }
          : {
              tabBarActiveTintColor: '#0d6c9a',
              tabBarInactiveTintColor: '#8E8E93',
              headerShown: true,
            }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarLabel: 'Chats',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="recordings"
        options={{
          title: 'Recordings',
          tabBarLabel: 'Recordings',
          href: isTherapist ? '/recordings' : null,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="recording-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

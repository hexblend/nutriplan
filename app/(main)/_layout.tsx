import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={20} className="mb-0.5" {...props} />;
}

export default function MainLayout() {
  const instets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          marginBottom: instets.bottom,
          marginLeft: 12,
          marginRight: 12,
          borderRadius: 12,
          alignItems: 'center',
          height: 70,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plans',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bowl-mix" color={color} />
          ),
          //   headerRight: () => (
          //     <Link href="/modal">
          //       <Pressable>
          //         {({ pressed }) => (
          //           <MaterialCommunityIcons
          //             name="info-circle"
          //             size={25}
          //             color={'#FFF'}
          //             style={{
          //               marginRight: 15,
          //               opacity: pressed ? 0.5 : 1,
          //             }}
          //           />
          //         )}
          //       </Pressable>
          //     </Link>
          //   ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clipboard-account-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comment-text-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

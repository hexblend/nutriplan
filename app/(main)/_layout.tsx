import { colors } from '@/lib/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoIcon from '../../assets/images/svg/logo-icon.svg';

type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

function TabBarIcon(props: {
  name: MaterialIconName | 'logo';
  color: string;
  focused: boolean;
}) {
  const size = 20;
  const color = props.focused ? colors.secondary[200] : '#9CA3AF';
  if (props.name === 'logo') {
    return (
      <LogoIcon width={size} height={size} className="mb-0.5" color={color} />
    );
  }
  return (
    <MaterialCommunityIcons
      name={props.name}
      color={color}
      size={size}
      className="mb-0.5"
    />
  );
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
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meal Plans',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="logo" color="#FFFFFF" focused={focused} />
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="clipboard-account-outline"
              color="#FFFFFF"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Feedback',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="comment-text-outline"
              color="#FFFFFF"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

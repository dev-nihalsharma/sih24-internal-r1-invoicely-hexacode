import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors, GlobalColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Icon } from '@rneui/themed';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: GlobalColors.primary,
        tabBarInactiveTintColor: GlobalColors.grayLight,
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Dashboard',
          tabBarShowLabel: true,
          tabBarIcon: ({ color, focused }) => <Icon name='dashboard' type='material' color={color} />,
        }}
      />
      <Tabs.Screen
        name='invoices'
        options={{
          title: 'Invoices',
          tabBarIcon: ({ color, focused }) => <Icon name='checklist' type='material' color={color} />,
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, focused }) => <Icon name='equalizer' type='material' color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <Icon name='person' type='material' color={color} />,
        }}
      />
    </Tabs>
  );
}

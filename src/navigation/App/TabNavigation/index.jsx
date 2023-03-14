import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import TabTestScreen from '../../../screens/tabs/TabTestScreen';
import { configApp } from '../../../utils/helpers/platform';
import { ProfileScreen } from '../../../screens';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: configApp.brandColor,
        tabBarInactiveTintColor: configApp.tabBarInactiveColor,
        headerShown: false,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Документы"
        component={TabTestScreen}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Ionicons name="documents" size={20} color={color} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Сотрудники"
        component={TabTestScreen}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Awesome5 name="people-arrows" size={22} color={color} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Поддержка"
        component={TabTestScreen}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Entypo name="chat" size={22} color={color} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="user" size={20} color={color} />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

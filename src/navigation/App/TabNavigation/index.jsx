import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import TabTestScreen from '../../../screens/tabs/TabTestScreen';
import { configApp } from '../../../utils/helpers/platform';
import { ProfileScreen } from '../../../screens';
import Documentation from '../../../components/svg/tabBar/Documentation';
import Employees from '../../../components/svg/tabBar/Employees';
import Support from '../../../components/svg/tabBar/Support';
import Profile from '../../../components/svg/tabBar/Profile';

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
        options={{
          tabBarIcon: color => (
            <Documentation color={color.focused ? '#4169e1' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="Сотрудники"
        component={TabTestScreen}
        options={{
          tabBarIcon: color => (
            <Employees color={color.focused ? '#4169e1' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="Поддержка"
        component={TabTestScreen}
        options={{
          tabBarIcon: color => (
            <Support color={color.focused ? '#4169e1' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: color => (
            <Profile
              color={
                color.focused
                  ? configApp.brandColor
                  : configApp.tabBarInactiveColor
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import Employees from '../../../assets/icons/svg/tabBar/Employees';
import Profile from '../../../assets/icons/svg/tabBar/Profile';
import TaskSearch from '../../../assets/icons/svg/tabBar/TaskSearch';
import MyTasksNavigation from './MyTasksNavigation';
import ProfileNavigation from './ProfileNavigation';
import TaskSearchNavigation from './TaskSearchNavigation';

export type TabNavigationParamList = {
  TaskSearchNavigation: undefined;
  MyTasksNavigation: undefined;
  ProfileNavigation: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3F51B5',
        tabBarInactiveTintColor: '#707070',
        headerShown: false,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="TaskSearchNavigation"
        component={TaskSearchNavigation}
        options={{
          title: 'Поиск задач',
          tabBarIcon: color => (
            <TaskSearch color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTasksNavigation"
        component={MyTasksNavigation}
        options={{
          title: 'Поиск задач',
          tabBarIcon: color => (
            <Employees color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={{
          title: 'Профиль',
          tabBarIcon: color => (
            <Profile color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

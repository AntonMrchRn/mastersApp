import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Employees from '@/assets/icons/svg/tabBar/Employees';
import Profile from '@/assets/icons/svg/tabBar/Profile';
import TaskSearch from '@/assets/icons/svg/tabBar/TaskSearch';
import { BottomTab, TabNavigationParamList } from '@/types/navigation';

import MyTasksNavigation from './MyTasksNavigation';
import ProfileNavigation from './ProfileNavigation';
import TaskSearchNavigation from './TaskSearchNavigation';

import styles from './style';

const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#3F51B5',
  tabBarInactiveTintColor: '#707070',
  tabBarLabelStyle: styles.label,
};
const Tab = createBottomTabNavigator<TabNavigationParamList>();

function AppNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={BottomTab.TaskSearchNavigation}
        component={TaskSearchNavigation}
        options={{
          title: 'Поиск задач',
          tabBarIcon: color => (
            <TaskSearch fill={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTab.MyTasksNavigation}
        component={MyTasksNavigation}
        options={{
          title: 'Мои задачи',
          tabBarIcon: color => (
            <Employees fill={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTab.ProfileNavigation}
        component={ProfileNavigation}
        options={{
          title: 'Профиль',
          tabBarIcon: color => (
            <Profile fill={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

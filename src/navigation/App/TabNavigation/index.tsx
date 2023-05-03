import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import Employees from '../../../components/svg/tabBar/Employees';
import Profile from '../../../components/svg/tabBar/Profile';
import TaskSearch from '../../../components/svg/tabBar/TaskSearch';
import MyTasksNavigation from './MyTasksNavigation';
import ProfileNavigation from './ProfileNavigation';
import TaskSearchNavigation from './TaskSearchNavigation';

const Tab = createBottomTabNavigator();

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
        name="Поиск задач"
        component={TaskSearchNavigation}
        options={{
          tabBarIcon: color => (
            <TaskSearch color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name="Мои задачи"
        component={MyTasksNavigation}
        options={{
          tabBarIcon: color => (
            <Employees color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileNavigation}
        options={{
          tabBarIcon: color => (
            <Profile color={color.focused ? '#3F51B5' : '#707070'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

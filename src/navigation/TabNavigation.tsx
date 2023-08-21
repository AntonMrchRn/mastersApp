import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

import Employees from '@/assets/icons/svg/tabBar/Employees';
import Profile from '@/assets/icons/svg/tabBar/Profile';
import TaskSearch from '@/assets/icons/svg/tabBar/TaskSearch';
import { fonts } from '@/constants/fonts';
import MyTasksScreen from '@/screens/tabs/MyTasksScreen';
import TaskSearchScreen from '@/screens/tabs/TaskSearchScreen';

import { ProfileNavigation, ProfileStackParamList } from './ProfileNavigation';

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    fontFamily: fonts.main_600,
    paddingBottom: 4,
    fontSize: 10,
  },
});
const screenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#3F51B5',
  tabBarInactiveTintColor: '#707070',
  tabBarLabelStyle: styles.label,
};

export enum BottomTabName {
  TaskSearch = 'TaskSearch',
  MyTasks = 'MyTasks',
  ProfileNavigation = 'ProfileNavigation',
}
export type BottomTabParamList = {
  [BottomTabName.TaskSearch]: undefined;
  [BottomTabName.MyTasks]: undefined;
  [BottomTabName.ProfileNavigation]: NavigatorScreenParams<ProfileStackParamList>;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
export const TabNavigation = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name={BottomTabName.TaskSearch}
      component={TaskSearchScreen}
      options={{
        title: 'Поиск задач',
        tabBarIcon: color => (
          <TaskSearch fill={color.focused ? '#3F51B5' : '#707070'} />
        ),
      }}
    />
    <Tab.Screen
      name={BottomTabName.MyTasks}
      component={MyTasksScreen}
      options={{
        title: 'Мои задачи',
        tabBarIcon: color => (
          <Employees fill={color.focused ? '#3F51B5' : '#707070'} />
        ),
      }}
    />
    <Tab.Screen
      name={BottomTabName.ProfileNavigation}
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

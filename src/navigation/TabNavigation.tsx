import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Tooltip } from 'rn-ui-kit';

import Employees from '@/assets/icons/svg/tabBar/Employees';
import Profile from '@/assets/icons/svg/tabBar/Profile';
import TaskSearch from '@/assets/icons/svg/tabBar/TaskSearch';
import { fonts } from '@/constants/fonts';
import { configApp } from '@/constants/platform';
import { LoggerScreen } from '@/screens/tabs/LoggerScreen';
import MyTasksScreen from '@/screens/tabs/MyTasksScreen';
import TaskSearchScreen from '@/screens/tabs/TaskSearchScreen';
import { pushPermission } from '@/services/notifications/pushPermission';
import { useAppDispatch, useAppSelector } from '@/store';
import { unActiveToolTip } from '@/store/slices/onboarding/actions';
import { selectOnboarding } from '@/store/slices/onboarding/selectors';

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

const payerTooltipCoords = configApp.ios
  ? { x: -227, y: 95 }
  : { x: -265, y: 95 };

export enum BottomTabName {
  TaskSearch = 'TaskSearch',
  MyTasks = 'MyTasks',
  ProfileNavigation = 'ProfileNavigation',
  Logger = 'Logger',
}
export type BottomTabParamList = {
  [BottomTabName.TaskSearch]: { tab?: string } | undefined;
  [BottomTabName.MyTasks]: undefined;
  [BottomTabName.ProfileNavigation]: NavigatorScreenParams<ProfileStackParamList>;
  [BottomTabName.Logger]: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();
export const TabNavigation = () => {
  const dispatch = useAppDispatch();

  const { visitToolTip } = useAppSelector(selectOnboarding);

  const onTooltipClose = () => dispatch(unActiveToolTip());

  useEffect(() => {
    if (visitToolTip) {
      setTimeout(() => {
        onTooltipClose();
      }, 3000);
    }
    setTimeout(() => {
      pushPermission();
    }, 300);
  }, []);

  const taskSearchIcon = (color: {
    focused: boolean;
    color: string;
    size: number;
  }) => <TaskSearch fill={color.focused ? '#3F51B5' : '#707070'} />;
  const myTasksIcon = (color: {
    focused: boolean;
    color: string;
    size: number;
  }) => <Employees fill={color.focused ? '#3F51B5' : '#707070'} />;
  const profileIcon = (color: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <Tooltip
        triangleEdge="bottom"
        triagnleAlign="end"
        coords={payerTooltipCoords}
        isVisible={visitToolTip}
        onClose={onTooltipClose}
        text={`Для выполнения задач заполните\nданные профиля`}
      >
        <Profile fill={color.focused ? '#3F51B5' : '#707070'} />
      </Tooltip>
    );
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={BottomTabName.TaskSearch}
        component={TaskSearchScreen}
        options={{
          title: 'Поиск задач',
          tabBarIcon: taskSearchIcon,
        }}
      />
      <Tab.Screen
        name={BottomTabName.MyTasks}
        component={MyTasksScreen}
        options={{
          title: 'Мои задачи',
          tabBarIcon: myTasksIcon,
        }}
      />
      <Tab.Screen
        name={BottomTabName.ProfileNavigation}
        component={ProfileNavigation}
        options={{
          title: 'Профиль',
          tabBarIcon: profileIcon,
        }}
      />
      <Tab.Screen
        name={BottomTabName.Logger}
        component={LoggerScreen}
        options={{
          title: 'Logger',
        }}
      />
    </Tab.Navigator>
  );
};

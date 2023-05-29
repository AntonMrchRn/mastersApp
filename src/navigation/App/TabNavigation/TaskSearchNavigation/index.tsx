import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import TaskCardScreen from '@/screens/tabs/TaskCardScreen';
import TaskSearchScreen from '@/screens/tabs/TaskSearchScreen';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

const options = { headerShown: false };
const screenOptions = { header: Header };
const Stack = createStackNavigator<TaskSearchNavigationParamList>();

function TaskSearchNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskSearch}
        component={TaskSearchScreen}
        options={options}
      />
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskCard}
        component={TaskCardScreen}
      />
    </Stack.Navigator>
  );
}

export default TaskSearchNavigation;

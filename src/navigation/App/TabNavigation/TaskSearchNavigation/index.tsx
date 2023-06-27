import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { EstimateEditScreen } from '@/screens/tabs/EstimateEditScreen';
import { TaskCardScreen } from '@/screens/tabs/TaskCardScreen';
import TaskSearchScreen from '@/screens/tabs/TaskSearchScreen';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

const screenOptions = { headerShown: false };

const Stack = createStackNavigator<TaskSearchNavigationParamList>();

function TaskSearchNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskSearch}
        component={TaskSearchScreen}
      />
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskCard}
        component={TaskCardScreen}
      />
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.EstimateEdit}
        component={EstimateEditScreen}
      />
    </Stack.Navigator>
  );
}

export default TaskSearchNavigation;

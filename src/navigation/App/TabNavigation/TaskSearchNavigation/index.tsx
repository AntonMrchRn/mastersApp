import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import { EstimateAddMaterialScreen } from '@/screens/tabs/EstimateAddMaterialScreen';
import { EstimateEditScreen } from '@/screens/tabs/EstimateEditScreen';
import { TaskCardScreen } from '@/screens/tabs/TaskCardScreen';
import TaskSearchScreen from '@/screens/tabs/TaskSearchScreen';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

const screenOptions = { headerShown: false };

const Stack = createStackNavigator<TaskSearchNavigationParamList>();

const TaskSearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskSearch}
        component={TaskSearchScreen}
      />
    </Stack.Navigator>
  );
};

export default TaskSearchNavigation;

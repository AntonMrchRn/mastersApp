import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskCardScreen from '../../../../screens/tabs/TaskCardScreen';
import TaskSearchScreen from '../../../../screens/tabs/TaskSearchScreen';

export type TaskSearchNavigationParamList = {
  TaskSearch: undefined;
  TaskCard: undefined;
};

const Stack = createStackNavigator<TaskSearchNavigationParamList>();

function TaskSearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskSearch"
        component={TaskSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskCard"
        component={TaskCardScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default TaskSearchNavigation;

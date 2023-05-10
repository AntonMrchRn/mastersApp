import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskCardScreen from '../../../../screens/tabs/TaskCardScreen';
import TaskSearchScreen from '../../../../screens/tabs/TaskSearchScreen';
import Header from '../../../../components/Header/Header';

export type TaskSearchNavigationParamList = {
  TaskSearch: undefined;
  TaskCard: undefined;
};

const Stack = createStackNavigator<TaskSearchNavigationParamList>();

function TaskSearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: Header,
      }}
    >
      <Stack.Screen
        name="TaskSearch"
        component={TaskSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="TaskCard" component={TaskCardScreen} />
    </Stack.Navigator>
  );
}

export default TaskSearchNavigation;

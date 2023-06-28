import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MyTasksScreen from '@/screens/tabs/MyTasksScreen';
import {
  MyTasksNavigationParamList,
  MyTasksNavigatorScreenName,
} from '@/types/navigation';

const options = { headerShown: false };
const Stack = createStackNavigator<MyTasksNavigationParamList>();

const MyTasksNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={MyTasksNavigatorScreenName.MyTasks}
      component={MyTasksScreen}
      options={options}
    />
  </Stack.Navigator>
);

export default MyTasksNavigation;

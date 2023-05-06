import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTasksScreen from '../../../../screens/tabs/MyTasksScreen';

export type MyTasksNavigationParamList = {
  MyTasks: undefined;
};

const Stack = createStackNavigator<MyTasksNavigationParamList>();

function MyTasksNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTasks"
        component={MyTasksScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyTasksNavigation;

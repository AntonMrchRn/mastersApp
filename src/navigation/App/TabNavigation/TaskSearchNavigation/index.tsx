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
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.TaskCard}
        component={TaskCardScreen}
      />
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.EstimateEdit}
        component={EstimateEditScreen}
        options={{
          headerShown: true,
          header: props => <Header {...props} title={'Редактирование сметы'} />,
        }}
      />
      <Stack.Screen
        name={TaskSearchNavigatorScreenName.EstimateAddMaterial}
        component={EstimateAddMaterialScreen}
        options={{
          headerShown: true,
          header: props => <Header {...props} title={'Новый материал'} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default TaskSearchNavigation;

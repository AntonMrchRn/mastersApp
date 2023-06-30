import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import { EstimateAddMaterialScreen } from '@/screens/tabs/EstimateAddMaterialScreen';
import { EstimateEditScreen } from '@/screens/tabs/EstimateEditScreen';
import { TaskCardScreen } from '@/screens/tabs/TaskCardScreen';
import {
  TaskNavigationParamList,
  TaskNavigatorScreenName,
} from '@/types/navigation';

const screenOptions = {
  headerShown: false,
};
const Stack = createStackNavigator<TaskNavigationParamList>();

const TaskNavigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name={TaskNavigatorScreenName.TaskCard}
      component={TaskCardScreen}
    />
    <Stack.Screen
      name={TaskNavigatorScreenName.EstimateEdit}
      component={EstimateEditScreen}
      options={{
        headerShown: true,
        header: props => <Header {...props} title={'Редактирование сметы'} />,
      }}
    />
    <Stack.Screen
      name={TaskNavigatorScreenName.EstimateAddMaterial}
      component={EstimateAddMaterialScreen}
      options={{
        headerShown: true,
        header: props => <Header {...props} title={'Новый материал'} />,
      }}
    />
  </Stack.Navigator>
);

export default TaskNavigation;

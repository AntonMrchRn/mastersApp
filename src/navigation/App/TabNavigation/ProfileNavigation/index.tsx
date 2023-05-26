import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '../../../../screens';
import {
  ProfileNavigationParamList,
  ProfileNavigatorScreenName,
} from '../../../../types/navigation';

const options = { headerShown: false };
const Stack = createStackNavigator<ProfileNavigationParamList>();

function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ProfileNavigatorScreenName.Profile}
        component={ProfileScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;

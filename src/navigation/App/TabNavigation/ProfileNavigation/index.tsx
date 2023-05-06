import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../../../screens';

export type ProfileNavigationParamList = {
  Profile: undefined;
};

const Stack = createStackNavigator<ProfileNavigationParamList>();

function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;

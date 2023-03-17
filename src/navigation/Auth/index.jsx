import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  RecoveryConfirmationScreen,
  RecoveryScreen,
  SignUpScreen,
} from '../../screens';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="RecoveryScreen" component={RecoveryScreen} />
      <Stack.Screen
        name="RecoveryConfirmScreen"
        component={RecoveryConfirmationScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

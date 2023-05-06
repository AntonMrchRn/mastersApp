import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  RecoveryConfirmationScreen,
  RecoveryScreen,
  SignUpScreen,
} from '../../screens';
import { EmailScreen } from '../../screens/auth/EmailScreen/EmailScreen';
import { PasswordScreen } from '../../screens/auth/PasswordScreen/PasswordScreen';
import { ErrorScreen } from '../../screens/auth/ErrorScreen/ErrorScreen';

export type AuthNavigationParamList = {
  SignUp: undefined;
  Recovery: undefined;
  Email: undefined;
  RecoveryConfirm: undefined;
  Password: undefined;
  Error: undefined;
};

const Stack = createStackNavigator<AuthNavigationParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen
        name="RecoveryConfirm"
        component={RecoveryConfirmationScreen}
      />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

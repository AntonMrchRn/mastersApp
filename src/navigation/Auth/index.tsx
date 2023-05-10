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
import Header from '../../components/Header/Header';

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
        header: Header,
      }}
    >
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen
        name="RecoveryConfirm"
        component={RecoveryConfirmationScreen}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

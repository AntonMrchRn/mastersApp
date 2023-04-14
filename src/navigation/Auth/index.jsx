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

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="RecoveryScreen" component={RecoveryScreen} />
      <Stack.Screen name="EmailScreen" component={EmailScreen} />
      <Stack.Screen
        name="RecoveryConfirmScreen"
        component={RecoveryConfirmationScreen}
      />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

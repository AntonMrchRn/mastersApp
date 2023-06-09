import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EmailScreen from '@/screens/auth/EmailScreen';
import ErrorScreen from '@/screens/auth/ErrorScreen';
import PasswordScreen from '@/screens/auth/PasswordScreen';
import RecoveryConfirmationScreen from '@/screens/auth/RecoveryConfirmScreen';
import RecoveryScreen from '@/screens/auth/RecoveryScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import { AuthNavigationParamList, AuthScreenName } from '@/types/navigation';

const options = {
  headerShown: false,
};
const Stack = createStackNavigator<AuthNavigationParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AuthScreenName.SignIn}
        component={SignInScreen}
        options={options}
      />
      <Stack.Screen name={AuthScreenName.Recovery} component={RecoveryScreen} />
      <Stack.Screen name={AuthScreenName.Email} component={EmailScreen} />
      <Stack.Screen
        name={AuthScreenName.RecoveryConfirm}
        component={RecoveryConfirmationScreen}
      />
      <Stack.Screen
        name={AuthScreenName.Password}
        component={PasswordScreen}
        options={options}
      />
      <Stack.Screen name={AuthScreenName.Error} component={ErrorScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;

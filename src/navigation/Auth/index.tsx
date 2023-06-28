import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EmailScreen from '@/screens/auth/EmailScreen';
import ErrorScreen from '@/screens/auth/ErrorScreen';
import PasswordScreen from '@/screens/auth/PasswordScreen';
import RecoveryConfirmationScreen from '@/screens/auth/RecoveryConfirmationScreen';
import RecoveryScreen from '@/screens/auth/RecoveryScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import { AuthNavigationParamList, AuthScreenName } from '@/types/navigation';

const screenOptions = {
  headerShown: false,
};
const Stack = createStackNavigator<AuthNavigationParamList>();

const AuthNavigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={AuthScreenName.SignIn} component={SignInScreen} />
    <Stack.Screen name={AuthScreenName.Recovery} component={RecoveryScreen} />
    <Stack.Screen name={AuthScreenName.Email} component={EmailScreen} />
    <Stack.Screen
      name={AuthScreenName.RecoveryConfirmation}
      component={RecoveryConfirmationScreen}
    />
    <Stack.Screen name={AuthScreenName.Password} component={PasswordScreen} />
    <Stack.Screen name={AuthScreenName.Error} component={ErrorScreen} />
  </Stack.Navigator>
);

export default AuthNavigation;

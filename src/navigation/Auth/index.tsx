import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/Header/Header';

import {
  RecoveryConfirmationScreen,
  RecoveryScreen,
  SignInScreen,
} from '../../screens';
import { EmailScreen } from '../../screens/auth/EmailScreen/EmailScreen';
import { ErrorScreen } from '../../screens/auth/ErrorScreen/ErrorScreen';
import { PasswordScreen } from '../../screens/auth/PasswordScreen/PasswordScreen';
import {
  AuthNavigationParamList,
  AuthScreenName,
} from '../../types/navigation';

const screenOptions = {
  header: Header,
};
const options = {
  headerShown: false,
};
const Stack = createStackNavigator<AuthNavigationParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
